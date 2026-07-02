import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Notion 파일은 만료되는 S3 서명 URL로 제공된다. ISR 재생성 시 fresh URL을 받는다.
    remotePatterns: [
      // 미러링된 영구 이미지(주 경로)
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      // Blob 미러링 실패 시 폴백으로 쓰이는 노션 원본
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.notion.so' },
      { protocol: 'https', hostname: '**.notion-static.com' },
    ],
  },
};

export default nextConfig;
