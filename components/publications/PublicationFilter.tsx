'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Publication, PublicationCategory } from '@/lib/types';
import Badge from '@/components/common/Badge';

type TypeFilter = 'all' | PublicationCategory;

const TYPE_DEFS: { key: TypeFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'intl', label: '국제' },
  { key: 'domestic', label: '국내' },
];

export default function PublicationFilter({ publications }: { publications: Publication[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [publications],
  );

  const rawType = params.get('type');
  const type: TypeFilter =
    rawType === 'intl' || rawType === 'domestic' ? rawType : 'all';
  const rawYear = params.get('year');
  const year: 'all' | number =
    rawYear && years.includes(Number(rawYear)) ? Number(rawYear) : 'all';

  function setParam(next: { type?: TypeFilter; year?: 'all' | number }) {
    const sp = new URLSearchParams(params.toString());
    if (next.type !== undefined) {
      next.type === 'all' ? sp.delete('type') : sp.set('type', next.type);
    }
    if (next.year !== undefined) {
      next.year === 'all' ? sp.delete('year') : sp.set('year', String(next.year));
    }
    const qs = sp.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  const typeCount = (key: TypeFilter) =>
    key === 'all' ? publications.length : publications.filter((p) => p.category === key).length;

  const filtered = publications.filter(
    (p) => (type === 'all' || p.category === type) && (year === 'all' || p.year === year),
  );

  const groups = useMemo(() => {
    const gy = [...new Set(filtered.map((p) => p.year))].sort((a, b) => b - a);
    return gy.map((y) => ({ year: y, papers: filtered.filter((p) => p.year === y) }));
  }, [filtered]);

  return (
    <>
      <div className="pub-filters">
        <div className="pub-filter-row">
          <span className="pub-filter-row__label">유형</span>
          <div className="pub-filter-row__pills">
            {TYPE_DEFS.map((d) => (
              <button
                key={d.key}
                type="button"
                className={`pill${d.key === type ? ' is-active' : ''}`}
                onClick={() => setParam({ type: d.key })}
              >
                {d.label}
                <span className="pill__count">{typeCount(d.key)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="pub-filter-row">
          <span className="pub-filter-row__label">연도</span>
          <div className="pub-filter-row__pills">
            <button
              type="button"
              className={`pill${year === 'all' ? ' is-active' : ''}`}
              onClick={() => setParam({ year: 'all' })}
            >
              전체
            </button>
            {years.map((y) => (
              <button
                key={y}
                type="button"
                className={`pill${year === y ? ' is-active' : ''}`}
                onClick={() => setParam({ year: y })}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section style={{ paddingTop: 'clamp(40px,5vw,56px)', paddingBottom: 'clamp(64px,9vw,104px)' }}>
        <p className="pub-count">
          총 <strong>{publications.length}</strong>편 중 <strong>{filtered.length}</strong>편 표시.
        </p>

        {groups.length === 0 ? (
          <div className="empty-state">조건에 맞는 논문이 없습니다.</div>
        ) : (
          <div className="pub-groups">
            {groups.map((g) => (
              <div key={g.year}>
                <div className="pub-group__head">
                  <h2 className="pub-group__year">{g.year}</h2>
                  <span className="pub-group__count">{g.papers.length} papers</span>
                </div>
                {g.papers.map((p) => (
                  <article key={p.id} className="pub">
                    <div>
                      <div className="pub__meta">
                        <Badge solid={p.category === 'intl'}>
                          {p.category === 'intl' ? 'International' : '국내'}
                        </Badge>
                        <span className="pub__venue">{p.venue}</span>
                      </div>
                      <h3 className="pub__title">{p.title}</h3>
                      <div className="pub__authors">{p.authors}</div>
                    </div>
                    <a href={p.pdfUrl ?? '#'} className="pdf-link">PDF</a>
                  </article>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
