import Link from "next/link";
import { getNews, getPublications } from "@/lib/notion";
import GridBackground from "@/components/common/GridBackground";
import NewsCard from "@/components/news/NewsCard";

// 홈 카드용 영문 태그 라벨 (소식 페이지의 한글 라벨과 구분되는 기존 디자인)
const HOME_NEWS_LABEL: Record<string, string> = {
  award: "Award",
  notice: "Notice",
  talk: "Talk",
  paper: "Paper",
};

const STATS = [
  { value: "32+", label: "발표 논문" },
  { value: "11", label: "연구 구성원" },
  { value: "2018", label: "설립 연도" },
];

export default async function HomePage() {
  const [news, publications] = await Promise.all([
    getNews(),
    getPublications(),
  ]);
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
          <p className="hero__lede">
            Trustworthy AI를 중심으로
            <br />
            인간의 언어·지식·인지에 기반한 인공지능을 연구합니다.
          </p>
          <div className="hero__actions">
            <Link href="/research" className="btn btn--solid">
              연구 보기
            </Link>
            <Link href="/publications" className="btn btn--ghost">
              논문 살펴보기
            </Link>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section className="section">
        <div className="about__grid">
          <div>
            <div className="section__eyebrow">About us</div>
            <h2 className="section__title">
              인간이 이해하고 통제하며,
              <br />더 나은 세상을 만드는 AI
            </h2>
          </div>
          <div>
            <p className="about__body">
              TAILAB은 자연어처리와 의미론을 기반으로 신뢰할 수 있는 인공지능을
              연구합니다. 높은 성능만을 추구하는 것이 아니라, 인공지능의 판단
              근거와 작동 범위를 사람이 이해하고 필요한 순간에 개입할 수 있도록
              설계합니다.
            </p>
            <p className="about__body">
              이를 통해 의료, 교육, 디지털인문학, 공공·사회 문제 등 사람들의
              실제 환경에 안전하고 유익하게 적용되는 올바른 인공지능을 만드는
              것을 목표로 합니다.
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
          <Link href="/news" className="link-underline">
            전체 보기
          </Link>
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
          <Link href="/publications" className="link-underline">
            전체 보기
          </Link>
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
              {p.linkUrl ? (
                <a href={p.linkUrl} target="_blank" rel="noreferrer" className="pdf-link">
                  Link
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
