import { Sk, SkLines } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container container--top sk-page">
      <Sk w={260} h={12} style={{ marginBottom: 40 }} />
      <div className="cv-grid">
        <aside className="cv-aside">
          <Sk w="100%" h={300} r={12} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Sk w={120} h={30} />
            <Sk w={160} h={15} />
            <Sk w={200} h={14} />
          </div>
          <SkLines n={2} w="85%" />
        </aside>
        <main className="cv-main" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <SkLines n={6} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Array.from({ length: 5 }, (_, i) => (
              <Sk key={i} w={110} h={32} r={16} />
            ))}
          </div>
          <SkLines n={4} w="80%" />
        </main>
      </div>
    </div>
  );
}
