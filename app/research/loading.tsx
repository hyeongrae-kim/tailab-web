import { Sk, SkLines, SkPageHeader } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container container--top sk-page">
      <SkPageHeader />
      <section className="subsection">
        <div className="about__grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Sk w={90} h={12} />
            <Sk w={240} h={40} />
            <Sk w={140} h={40} />
          </div>
          <SkLines n={5} />
        </div>
      </section>
      <section className="subsection">
        <div className="area-grid area-grid--three">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="area-card" style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 300 }}>
              <Sk w={32} h={3} r={2} />
              <Sk w={120} h={12} style={{ marginTop: 40 }} />
              <Sk w="75%" h={24} />
              <SkLines n={4} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
