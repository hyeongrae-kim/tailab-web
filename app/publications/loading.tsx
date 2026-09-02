import { Sk, SkPageHeader, SkPills } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="container container--top sk-page">
      <SkPageHeader />
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
