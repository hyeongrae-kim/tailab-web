'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { News, NewsCategory } from '@/lib/types';
import { NEWS_CATEGORY_LABEL, NEWS_FILTER_ORDER } from '@/lib/format';
import NewsCard from './NewsCard';

type Filter = 'all' | NewsCategory;

export default function NewsFilter({ news }: { news: News[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const raw = params.get('cat');
  const active: Filter =
    raw && (raw === 'all' || NEWS_FILTER_ORDER.includes(raw as NewsCategory))
      ? (raw as Filter)
      : 'all';

  function setFilter(key: Filter) {
    const qs = key === 'all' ? '' : `?cat=${key}`;
    router.replace(`${pathname}${qs}`, { scroll: false });
  }

  const items = news.filter((n) => active === 'all' || n.category === active);
  const tabs: Filter[] = ['all', ...NEWS_FILTER_ORDER];

  return (
    <>
      <div className="filter-bar" style={{ marginBottom: 'clamp(32px,4vw,48px)' }}>
        {tabs.map((key) => (
          <button
            key={key}
            type="button"
            className={`pill${key === active ? ' is-active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {key === 'all' ? '전체' : NEWS_CATEGORY_LABEL[key]}
          </button>
        ))}
      </div>

      <section style={{ paddingBottom: 'clamp(64px,9vw,104px)' }}>
        {items.length === 0 ? (
          <div className="empty-state">해당 카테고리의 소식이 없습니다.</div>
        ) : (
          <div className="news-grid news-grid--wide">
            {items.map((n) => (
              <NewsCard key={n.id} item={n} titleTag="h2" />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
