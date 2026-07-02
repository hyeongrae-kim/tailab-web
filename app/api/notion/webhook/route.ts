// Notion 웹훅 수신 → 영향받는 태그 revalidate.
// 흐름: ① 최초 구독 verification_token 처리 ② X-Notion-Signature(HMAC) 검증 ③ revalidateTag
import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { env } from '@/lib/env';
import { ALL_TAGS } from '@/lib/notion';

export const runtime = 'nodejs';

function verifySignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header || !secret) return false;
  // Notion: X-Notion-Signature = "sha256=" + HMAC-SHA256(rawBody, secret)
  const expected = 'sha256=' + createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  // ① 최초 구독 검증: Notion이 verification_token을 1회 보낸다.
  //    이 값을 확인해 Notion UI에 입력하고, NOTION_WEBHOOK_SECRET 으로 저장한다.
  if (typeof payload.verification_token === 'string') {
    console.log('[notion-webhook] verification_token =', payload.verification_token);
    return NextResponse.json({ ok: true });
  }

  // ② 서명 검증
  const signature = req.headers.get('x-notion-signature');
  if (!verifySignature(rawBody, signature, env.webhookSecret)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
  }

  // ③ revalidate. (정밀 매핑 전: 안전하게 전체 태그 무효화 — 비용 낮음)
  //    추후 payload의 data_source/parent ID를 env.db.* 와 대조해 해당 태그만 무효화 가능.
  for (const tag of ALL_TAGS) {
    revalidateTag(tag);
  }

  return NextResponse.json({ ok: true, revalidated: ALL_TAGS });
}
