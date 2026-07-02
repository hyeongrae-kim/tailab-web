'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Member, MemberCategory } from '@/lib/types';
import { MEMBER_CATEGORY_LABEL, MEMBER_CATEGORY_ORDER } from '@/lib/format';
import Thumb from '@/components/common/Thumb';

type Filter = 'all' | MemberCategory;

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
                      <Thumb className="member__photo" url={m.photoUrl} label="portrait" sizes="170px" />
                      <div>
                        <div className="member__name">{m.name}</div>
                        <div className="member__role">{m.role}</div>
                        <div className="member__note">{m.note}</div>
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
