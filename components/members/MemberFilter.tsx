'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Member, MemberCategory } from '@/lib/types';
import { MEMBER_CATEGORY_LABEL, MEMBER_CATEGORY_ORDER } from '@/lib/format';
import Thumb from '@/components/common/Thumb';

type Filter = 'all' | MemberCategory;

// 모노톤 인라인 아이콘 (stroke/fill: currentColor)
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const IconMail = (
  <svg width="14" height="14" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);
const IconWeb = (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconGithub = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);
const IconLinkedin = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export default function MemberFilter({ members }: { members: Member[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const raw = params.get('cat');
  const active: Filter =
    raw && (raw === 'all' || MEMBER_CATEGORY_ORDER.includes(raw as MemberCategory))
      ? (raw as Filter)
      : 'all';

  function setFilter(key: Filter) {
    const qs = key === 'all' ? '' : `?cat=${key}`;
    router.replace(`${pathname}${qs}`, { scroll: false });
  }

  const countFor = (key: Filter) =>
    key === 'all' ? members.length : members.filter((m) => m.category === key).length;

  const groups = useMemo(() => {
    const visible =
      active === 'all' ? MEMBER_CATEGORY_ORDER : MEMBER_CATEGORY_ORDER.filter((k) => k === active);
    return visible
      .map((key) => ({ key, members: members.filter((m) => m.category === key) }))
      .filter((g) => g.members.length > 0);
  }, [active, members]);

  const tabs: Filter[] = ['all', ...MEMBER_CATEGORY_ORDER];

  return (
    <>
      <div className="filter-bar" style={{ marginBottom: 'clamp(40px,5vw,56px)' }}>
        {tabs.map((key) => (
          <button
            key={key}
            type="button"
            className={`pill${key === active ? ' is-active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {key === 'all' ? '전체' : MEMBER_CATEGORY_LABEL[key]}
            <span className="pill__count">{countFor(key)}</span>
          </button>
        ))}
      </div>

      <section style={{ paddingBottom: 'clamp(64px,9vw,104px)' }}>
        {groups.length === 0 ? (
          <div className="empty-state">해당 카테고리의 구성원이 없습니다.</div>
        ) : (
          <div className="member-groups">
            {groups.map((g) => (
              <div key={g.key}>
                <div className="member-group__head">
                  <h2 className="member-group__title">{MEMBER_CATEGORY_LABEL[g.key]}</h2>
                  <span className="member-group__count">{g.members.length}</span>
                </div>
                <div className="member-grid">
                  {g.members.map((m) => (
                    <div key={m.id} className="member">
                      <Thumb className="member__photo" url={m.photoUrl} label="portrait" sizes="210px" />
                      <div>
                        <div className="member__name">
                          {m.name}
                          {m.nameEn ? <span className="member__name-en">{m.nameEn}</span> : null}
                        </div>
                        <div className="member__role">{m.role ?? MEMBER_CATEGORY_LABEL[m.category]}</div>
                        {m.email ? (
                          <a href={`mailto:${m.email}`} className="member__email">
                            {IconMail}
                            {m.email}
                          </a>
                        ) : null}
                        {m.interests ? <div className="member__note">{m.interests}</div> : null}
                        <div className="member__links">
                          {m.homepage ? <a href={m.homepage} target="_blank" rel="noreferrer" aria-label="Website" title="Website">{IconWeb}</a> : null}
                          {m.github ? <a href={m.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">{IconGithub}</a> : null}
                          {m.linkedin ? <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">{IconLinkedin}</a> : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
