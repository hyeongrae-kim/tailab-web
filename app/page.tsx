import Link from 'next/link';
import { getNews, getPublications } from '@/lib/notion';
import GridBackground from '@/components/common/GridBackground';
import NewsCard from '@/components/news/NewsCard';

// 홈 카드용 영문 태그 라벨 (소식 페이지의 한글 라벨과 구분되는 기존 디자인)
const HOME_NEWS_LABEL: Record<string, string> = {
  award: 'Award',
  notice: 'Notice',
  talk: 'Talk',
  paper: 'Paper',
};

const STATS = [
  { value: '32+', label: '발표 논문' },
  { value: '11', label: '연구 구성원' },
  { value: '2018', label: '설립 연도' },
];

export default async function HomePage() {
  const [news, publications] = await Promise.all([getNews(), getPublications()]);
  const latestNews = news.slice(0, 4);
  const latestPapers = publications.slice(0, 3);

  return (
    <div className="container">
      {/* HERO */}
      <header className="hero">
        <GridBackground />
        <div className="hero__inner">
          <div className="eyebrow">Trustworthy AI Lab</div>
          <h1 className="hero__title">TAILAB</h1>
          <p className="hero__lede">신뢰할 수 있고 인간과 협력하는 인공지능을 연구합니다.</p>
          <div className="hero__actions">
            <Link href="/research" className="btn btn--solid">연구 보기</Link>
            <Link href="/publications" className="btn btn--ghost">논문 살펴보기</Link>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section className="section">
        <div className="about__grid">
          <div>
            <div className="section__eyebrow">About us</div>
            <h2 className="section__title">
              사람을 위한
              <br />
              인공지능을 만듭니다
            </h2>
          </div>
          <div>
            <p className="about__lead">
              TAILAB(Trustworthy AI Lab)은 기계학습과 인지과학의 접점에서, 인간이 신뢰하고 함께 협력할 수 있는 지능형 시스템을 연구합니다.
            </p>
            <p className="about__body">
              대규모 언어모델의 추론 능력 평가, 불확실성 추정, 인간-AI 협력적 의사결정을 주요 주제로 다루며, 국제 학회에 꾸준히 연구 성과를 발표하고 있습니다.
            </p>
            <div className="stats">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="stat__value">{s.value}</div>
                  <div className="stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="section">
        <div className="section__head">
          <div>
            <div className="section__eyebrow">News</div>
            <h2 className="section__title">최신 소식</h2>
          </div>
          <Link href="/news" className="link-underline">전체 보기</Link>
        </div>
        <div className="news-grid">
          {latestNews.map((n) => (
            <NewsCard key={n.id} item={n} label={HOME_NEWS_LABEL[n.category]} />
          ))}
        </div>
      </section>

      {/* PAPERS */}
      <section className="section section--last">
        <div className="section__head">
          <div>
            <div className="section__eyebrow">Publications</div>
            <h2 className="section__title">최신 논문</h2>
          </div>
          <Link href="/publications" className="link-underline">전체 보기</Link>
        </div>
        <div className="papers">
          {latestPapers.map((p) => (
            <article key={p.id} className="paper">
              <div className="paper__year">{p.year}</div>
              <div>
                <h3 className="paper__title">{p.title}</h3>
                <div className="paper__authors">{p.authors}</div>
                <div className="paper__venue">{p.venue}</div>
              </div>
              <a href={p.pdfUrl ?? '#'} className="pdf-link">PDF</a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
