import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPublications } from '@/lib/notion';
import PageHeader from '@/components/common/PageHeader';
import PublicationFilter from '@/components/publications/PublicationFilter';

export const metadata: Metadata = { title: '논문' };

export default async function PublicationsPage() {
  const publications = await getPublications();
  return (
    <div className="container container--top">
      <PageHeader eyebrow="Publications" title="논문">
        국제 및 국내 학회·학술지에 발표한 연구 성과.
      </PageHeader>

      <Suspense fallback={null}>
        <PublicationFilter publications={publications} />
      </Suspense>
    </div>
  );
}
