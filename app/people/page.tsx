import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getMembers } from '@/lib/notion';
import PageHeader from '@/components/common/PageHeader';
import MemberFilter from '@/components/members/MemberFilter';
import { SkMemberGrid } from '@/components/common/Skeleton';

export const metadata: Metadata = { title: 'People' };

export default async function PeoplePage() {
  const members = await getMembers();
  const currentCount = members.filter((m) => m.category !== 'alumni').length;

  return (
    <div className="container container--top">
      <PageHeader eyebrow="People" title="구성원">
        TAILAB과 함께 연구하는 사람들. 총 <strong>{currentCount}</strong>명이 함께하고 있습니다.
      </PageHeader>

      <Suspense fallback={<SkMemberGrid />}>
        <MemberFilter members={members} />
      </Suspense>
    </div>
  );
}
