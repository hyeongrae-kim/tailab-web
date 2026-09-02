import { Sk, SkLines } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container sk-page">
      <header className="hero">
        <div className="hero__inner" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Sk w={150} h={13} />
          <Sk w="min(520px, 90%)" h={96} r={12} />
          <SkLines n={2} w="min(560px, 95%)" />
          <div style={{ display: 'flex', gap: 14 }}>
            <Sk w={120} h={48} r={7} />
            <Sk w={140} h={48} r={7} />
          </div>
        </div>
      </header>
      <section className="section">
        <div className="news-grid">
          {Array.from({ length: 4 }, (_, i) => (
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
