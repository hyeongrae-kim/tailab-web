'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Publication } from '@/lib/types';
import Badge from '@/components/common/Badge';

export default function PublicationFilter({ publications }: { publications: Publication[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [publications],
  );

  const rawYear = params.get('year');
  const year: 'all' | number =
    rawYear && years.includes(Number(rawYear)) ? Number(rawYear) : 'all';

  function setParam(next: { year: 'all' | number }) {
    const sp = new URLSearchParams(params.toString());
    next.year === 'all' ? sp.delete('year') : sp.set('year', String(next.year));
    const qs = sp.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  const filtered = publications.filter((p) => year === 'all' || p.year === year);

  const groups = useMemo(() => {
    const gy = [...new Set(filtered.map((p) => p.year))].sort((a, b) => b - a);
    return gy.map((y) => ({ year: y, papers: filtered.filter((p) => p.year === y) }));
  }, [filtered]);

  return (
    <>
      <div className="pub-filters">
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
                        <Badge solid={false}>{p.venue}</Badge>
                      </div>
                      <h3 className="pub__title">{p.title}</h3>
                      <div className="pub__authors">{p.authors}</div>
                    </div>
                    {p.linkUrl ? (
                      <a href={p.linkUrl} target="_blank" rel="noreferrer" className="pdf-link">Link</a>
                    ) : null}
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
