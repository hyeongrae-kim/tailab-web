'use client';

import type { SyntheticEvent } from 'react';
import Image from 'next/image';

interface ThumbProps {
  className: string; // .news-card__thumb | .member__photo | .cv-portrait
  url?: string;
  label: string; // 플레이스홀더 라벨 (thumbnail / portrait)
  sizes?: string;
}

// 개발 모드에서 이미지가 완전히 로드된 시점의 소요 시간·전송량을 브라우저 콘솔에 찍는다.
// transferSize가 0이면 브라우저 캐시에서 나온 것(=네트워크 안 탐).
function logLoad(label: string, e: SyntheticEvent<HTMLImageElement>) {
  if (process.env.NODE_ENV !== 'development') return;
  const src = e.currentTarget.currentSrc;
  const entry = performance.getEntriesByName(src).pop() as PerformanceResourceTiming | undefined;
  if (entry) {
    const ms = Math.round(entry.duration);
    const via =
      entry.transferSize === 0 ? '브라우저 캐시(미전송)' : `${Math.round(entry.transferSize / 1024)}KB 전송`;
    console.log(`[img] ${label} 로드 완료 · ${ms}ms · ${via}`);
  } else {
    console.log(`[img] ${label} 로드 완료`);
  }
}

// 이미지가 있으면 next/image(fill), 없으면 줄무늬 플레이스홀더.
export default function Thumb({ className, url, label, sizes = '300px' }: ThumbProps) {
  return (
    <div className={`${className} thumb`}>
      {url ? (
        <Image
          src={url}
          alt=""
          fill
          sizes={sizes}
          style={{ objectFit: 'cover' }}
          onLoad={(e) => logLoad(label, e)}
        />
      ) : (
        <span className="placeholder-label">{label}</span>
      )}
    </div>
  );
}
