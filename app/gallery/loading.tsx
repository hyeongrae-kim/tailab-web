import { Sk, SkPageHeader, SkPills } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container container--top sk-page">
      <SkPageHeader />
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
