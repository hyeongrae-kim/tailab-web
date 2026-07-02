import type { News } from '@/lib/types';
import { NEWS_CATEGORY_LABEL, formatDate } from '@/lib/format';
import Badge from '@/components/common/Badge';
import Thumb from '@/components/common/Thumb';

interface NewsCardProps {
  item: News;
  // 홈은 영문 태그(Award 등), 소식 페이지는 한글 라벨을 쓰던 기존 차이를 흡수한다.
  label?: string;
  titleTag?: 'h2' | 'h3';
}

export default function NewsCard({ item, label, titleTag = 'h3' }: NewsCardProps) {
  const Title = titleTag;
  const badgeLabel = label ?? NEWS_CATEGORY_LABEL[item.category];
  return (
    <article className="news-card">
      <Thumb className="news-card__thumb" url={item.thumbnailUrl} label="thumbnail" sizes="(max-width: 600px) 100vw, 280px" />
      <div className="news-card__body">
        <div className="news-card__meta">
          <Badge solid={item.category === 'award'}>{badgeLabel}</Badge>
          <span className="news-card__date">{formatDate(item.date)}</span>
        </div>
        <Title className="news-card__title">{item.title}</Title>
        <p className="news-card__desc">{item.description}</p>
      </div>
    </article>
  );
}
