import { Sk, SkPageHeader, SkPills } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container container--top sk-page">
      <SkPageHeader />
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
