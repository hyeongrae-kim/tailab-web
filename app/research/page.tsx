import type { Metadata } from 'next';
import { getSiteCopy, getResearchAreas, getProjects } from '@/lib/notion';
import { PROJECT_ROLE_LABEL } from '@/lib/format';
import PageHeader from '@/components/common/PageHeader';
import Badge from '@/components/common/Badge';

export const metadata: Metadata = { title: 'Research' };

export default async function ResearchPage() {
  const [t, areas, projects] = await Promise.all([
    getSiteCopy(),
    getResearchAreas(),
    getProjects(),
  ]);
  const phil = t('about.philosophy');

  return (
    <div className="container container--top">
      <PageHeader eyebrow="Research" title="연구">
        {phil.en}
      </PageHeader>

      {/* PHILOSOPHY — 제목 왼쪽 · 본문 오른쪽 2단 */}
      <section className="subsection">
        <div className="about__grid">
          <div>
            <div className="section__eyebrow">Philosophy</div>
            <h2 className="section__title">
              {phil.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div>
            {phil.body.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className="about__body">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH AREAS — 3열 고정 카드 */}
      <section className="subsection">
        <div className="subsection__head">
          <div className="eyebrow eyebrow--label">Research Areas</div>
          <h2 className="subsection__title">연구 영역</h2>
        </div>
        <div className="area-grid area-grid--three">
          {areas.map((a) => {
            // "Human-Governed · 인간이 통제하는 AI" → 영문 소제목 + 한글 제목
            const [en, ko] = a.title.includes(' · ') ? a.title.split(' · ') : [null, a.title];
            return (
            <article key={a.id} className="area-card">
              <div className="area-card__no">{a.no}</div>
              <div className="area-card__inner">
                <div className="area-card__bar" />
                {en ? <div className="area-card__eyebrow">{en}</div> : null}
                <h3 className="area-card__title">
                  {ko.split('\n').map((line, i) => (
                    <span key={i}>
                      {i > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="area-card__desc">{a.description}</p>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="subsection subsection--last">
        <div className="subsection__head">
          <div className="eyebrow eyebrow--label">Projects</div>
          <h2 className="subsection__title">수행 연구 과제</h2>
        </div>
        <div className="project-list">
          {projects.map((p) => (
            <article key={p.id} className="project project--single">
              <div>
                <div className="project__meta">
                  <Badge solid={p.role === 'pi'}>{PROJECT_ROLE_LABEL[p.role]}</Badge>
                  <span className="project__funder">{p.funder}</span>
                  {p.field ? <span className="project__funder">· {p.field}</span> : null}
                </div>
                <h3 className="project__title">{p.title}</h3>
                <div className="project__role">{p.description}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
