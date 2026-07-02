import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getNews } from '@/lib/notion';
import PageHeader from '@/components/common/PageHeader';
import NewsFilter from '@/components/news/NewsFilter';

export const metadata: Metadata = { title: '소식' };

export default async function NewsPage() {
  const news = await getNews();
  return (
    <div className="container container--top">
      <PageHeader eyebrow="News" title="소식">
        연구실의 수상, 발표, 공지 등 최신 소식을 전합니다.
      </PageHeader>

      <Suspense fallback={null}>
        <NewsFilter news={news} />
      </Suspense>
    </div>
  );
}
