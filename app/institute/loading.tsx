import { Sk, SkLines, SkPageHeader } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container container--top sk-page">
      <SkPageHeader />
      <section className="subsection">
        <div className="inst-grid">
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="inst-card" style={{ gap: 14 }}>
              <Sk w={150} h={13} />
              <Sk w={140} h={24} />
              <SkLines n={4} />
            </div>
          ))}
        </div>
      </section>
      <section className="subsection subsection--last">
        <Sk w="100%" h={130} r={12} />
      </section>
    </div>
  );
}
