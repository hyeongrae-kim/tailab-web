// 스켈레톤 프리미티브 — 각 라우트 loading.tsx 가 실제 페이지 레이아웃 클래스와 조합해 쓴다.
import type { CSSProperties } from 'react';

export function Sk({
  w,
  h = 16,
  r = 8,
  style,
}: {
  w: number | string;
  h?: number;
  r?: number;
  style?: CSSProperties;
}) {
  return <div className="sk" style={{ width: w, height: h, borderRadius: r, ...style }} />;
}

// 서브페이지 공통 헤더(eyebrow + 제목 + 설명) 모양
export function SkPageHeader() {
  return (
    <header className="page-header">
      <div className="page-header__inner" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Sk w={140} h={13} />
        <Sk w={260} h={48} />
        <Sk w="min(460px, 85%)" h={16} />
      </div>
    </header>
  );
}

// 필터 pill 줄 모양
export function SkPills({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '16px 0' }}>
      {Array.from({ length: n }, (_, i) => (
        <Sk key={i} w={i === 0 ? 64 : 76} h={36} r={20} />
      ))}
    </div>
  );
}

// 텍스트 여러 줄
export function SkLines({ n, w = '100%' }: { n: number; w?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: n }, (_, i) => (
        <Sk key={i} w={i === n - 1 ? '70%' : w} h={14} />
      ))}
    </div>
  );
}

// ── Suspense fallback 용 합성 스켈레톤 (필터형 목록 페이지) ──

export function SkPubList() {
  return (
    <div className="sk-page">
      <SkPills n={7} />
      <section style={{ paddingTop: 40, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Sk w={80} h={34} />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Sk w={130} h={20} r={4} />
            <Sk w="85%" h={18} />
            <Sk w="60%" h={13} />
          </div>
        ))}
      </section>
    </div>
  );
}

export function SkNewsGrid() {
  return (
    <div className="sk-page">
      <SkPills n={5} />
      <section style={{ paddingTop: 40 }}>
        <div className="news-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Sk w="100%" h={150} r={10} />
              <Sk w="80%" h={18} />
              <Sk w="55%" h={13} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function SkMemberGrid() {
  return (
    <div className="sk-page">
      <SkPills n={6} />
      <section style={{ paddingTop: 40 }}>
        <div className="member-grid">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Sk w="100%" h={210} r={10} style={{ aspectRatio: '1 / 1', height: 'auto' }} />
              <Sk w="65%" h={17} />
              <Sk w="45%" h={13} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
