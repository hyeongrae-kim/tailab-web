// 서버 전용. 노션의 만료되는 서명 URL을 받아 → 리사이즈/압축 → Vercel Blob에 올리고
// 만료되지 않는 영구 URL을 돌려준다. 같은 파일이면 재업로드하지 않는다(멱등).
import { createHash } from 'crypto';
import { put, list } from '@vercel/blob';
import sharp from 'sharp';

const token = process.env.BLOB_READ_WRITE_TOKEN;

const MAX_DIM = 1200; // 긴 변 최대 px (인물/썸네일엔 충분)
const WEBP_QUALITY = 82;

/**
 * @param notionUrl 노션이 준 서명 URL(있을 때만)
 * @returns 영구 Blob URL. Blob 토큰이 없거나 실패하면 원본 URL로 폴백(기능은 유지).
 */
export async function mirrorImage(notionUrl: string | undefined): Promise<string | undefined> {
  if (!notionUrl) return undefined;
  // 로컬에 Blob 토큰이 없으면 미러링을 건너뛰고 원본을 그대로 쓴다(개발 편의).
  if (!token) return notionUrl;

  try {
    // 쿼리스트링(서명)을 뗀 S3 오브젝트 경로가 파일 고유 식별자다.
    // → 같은 사진이면 경로 동일 → 같은 Blob 키 → 재업로드 안 함.
    //   사진을 교체하면 경로가 바뀌어 새로 미러링된다.
    const objectPath = new URL(notionUrl).pathname;
    const hash = createHash('sha1').update(objectPath).digest('hex').slice(0, 16);
    const pathname = `notion-images/${hash}.webp`;

    // 이미 미러링돼 있으면 다운로드/업로드 없이 그 URL 재사용
    const found = await list({ prefix: pathname, limit: 1, token });
    const hit = found.blobs.find((b) => b.pathname === pathname);
    if (hit) return hit.url;

    // 없으면: 원본 다운로드 → sharp 리사이즈/압축 → Blob 업로드
    const res = await fetch(notionUrl);
    if (!res.ok) return notionUrl; // 원본을 못 받으면 원본 URL로 폴백
    const input = Buffer.from(await res.arrayBuffer());
    const output = await sharp(input)
      .rotate() // EXIF 방향 보정
      .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    const { url } = await put(pathname, output, {
      access: 'public',
      contentType: 'image/webp',
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    console.log(
      `[mirror] ${objectPath.split('/').pop()} → Blob (${Math.round(input.length / 1024)}KB → ${Math.round(output.length / 1024)}KB)`,
    );
    return url;
  } catch (err) {
    console.warn('[mirror] 실패 → 원본 URL로 폴백:', (err as Error).message);
    return notionUrl;
  }
}
