import type { Metadata } from 'next';
import { getResearchAreas, getPartners, getProjects } from '@/lib/notion';
import PageHeader from '@/components/common/PageHeader';
import Badge from '@/components/common/Badge';

export const metadata: Metadata = { title: '연구' };

export default async function ResearchPage() {
  const [areas, partners, projects] = await Promise.all([
    getResearchAreas(),
    getPartners(),
    getProjects(),
  ]);

  return (
    <div className="container container--top">
      <PageHeader eyebrow="Research" title="연구">
        신뢰할 수 있고 인간과 협력하는 인공지능을 위해, 기초 연구부터 산업·국가 과제까지 폭넓게 수행합니다.
      </PageHeader>

      {/* RESEARCH AREAS */}
      <section className="subsection">
        <div className="subsection__head" style={{ maxWidth: '42em' }}>
          <div className="eyebrow eyebrow--label">Research Areas</div>
          <h2 className="subsection__title">신뢰할 수 있는 AI를 향한 네 가지 연구 축</h2>
          <p className="subsection__desc">언어모델의 추론부터 인간과의 협력까지, 서로 맞닿은 네 주제를 깊이 있게 다룹니다.</p>
        </div>
        <div className="area-grid">
          {areas.map((a) => (
            <article key={a.id} className="area-card">
              <div className="area-card__no">{a.no}</div>
              <div className="area-card__inner">
                <div className="area-card__bar" />
                <h3 className="area-card__title">{a.title}</h3>
                <p className="area-card__desc">{a.description}</p>
                <div className="area-card__tags">
                  {a.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="subsection">
        <div className="subsection__head">
          <div className="eyebrow eyebrow--label">Partners</div>
          <h2 className="subsection__title">연구를 함께 만드는 파트너들</h2>
          <p className="subsection__desc">국내외 기업 및 연구기관과 공동 연구, 기술 자문, 인턴십을 통해 협력하고 있습니다.</p>
        </div>
        <div className="partner-grid">
          {partners.map((p) => (
            <div key={p} className="partner"><span>{p}</span></div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="subsection subsection--last">
        <div className="subsection__head">
          <div className="eyebrow eyebrow--label">Projects</div>
          <h2 className="subsection__title">수행 중인 연구 과제</h2>
          <p className="subsection__desc">국가 연구개발 사업과 기업 산학협력 과제를 통해 연구를 실증합니다.</p>
        </div>
        <div className="project-list">
          {projects.map((p) => (
            <article key={p.id} className="project">
              <div>
                <div className="project__meta">
                  <Badge solid={p.type === 'national'}>{p.type === 'national' ? '국가과제' : '기업과제'}</Badge>
                  <span className="project__funder">{p.funder}</span>
                </div>
                <h3 className="project__title">{p.title}</h3>
                <div className="project__role">{p.role}</div>
              </div>
              <div className="project__period">{p.period}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
