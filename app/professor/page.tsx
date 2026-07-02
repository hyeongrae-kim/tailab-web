import type { Metadata } from 'next';
import Link from 'next/link';
import { getProfessor, getCvEntries, getPublications } from '@/lib/notion';
import Thumb from '@/components/common/Thumb';

export const metadata: Metadata = { title: '교수' };

export default async function ProfessorPage() {
  const [prof, cv, publications] = await Promise.all([
    getProfessor(),
    getCvEntries(),
    getPublications(),
  ]);

  const education = cv.filter((e) => e.kind === 'education');
  const experience = cv.filter((e) => e.kind === 'experience');
  const awards = cv.filter((e) => e.kind === 'award');
  const selected = publications.filter((p) => p.featured).slice(0, 5);

  return (
    <div className="container container--top">
      <div className="breadcrumb">Faculty / Principal Investigator</div>

      <div className="cv-grid">
        {/* LEFT: PROFILE */}
        <aside className="cv-aside">
          <Thumb className="cv-portrait" url={prof.photoUrl} label="portrait" sizes="300px" />
          <div>
            <h1 className="cv-name">{prof.name}</h1>
            <div className="cv-name-en">{prof.nameEn}</div>
            <div className="cv-title">{prof.position}</div>
            <div className="cv-dept">{prof.dept}</div>
          </div>
          <div className="cv-contact">
            <div className="cv-contact__row"><span>Email</span><span>{prof.email}</span></div>
            <div className="cv-contact__row"><span>Office</span><span>{prof.office}</span></div>
            <div className="cv-contact__row"><span>Phone</span><span>{prof.phone}</span></div>
          </div>
          <div className="cv-links">
            <a href={prof.scholarUrl ?? '#'} className="cv-link">Google Scholar</a>
            <a href={prof.cvUrl ?? '#'} className="cv-link">CV (PDF)</a>
          </div>
        </aside>

        {/* RIGHT: CONTENT */}
        <main className="cv-main">
          <section className="cv-section cv-section--first">
            <p className="cv-bio-lead">{prof.bioLead}</p>
            <p className="cv-bio-body">{prof.bio}</p>
          </section>

          <section className="cv-section">
            <h2 className="cv-heading">Research Interests</h2>
            <div className="cv-tags">
              {prof.interests.map((t) => (
                <span key={t} className="cv-tag">{t}</span>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <h2 className="cv-heading">Education</h2>
            <div className="cv-rows">
              {education.map((e) => (
                <div key={e.id} className="cv-row">
                  <div className="cv-row__years">{e.years}</div>
                  <div>
                    <div className="cv-row__title">{e.label}</div>
                    {e.org ? <div className="cv-row__sub">{e.org}</div> : null}
                    {e.detail ? <div className="cv-row__detail">{e.detail}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <h2 className="cv-heading">Experience</h2>
            <div className="cv-rows">
              {experience.map((e) => (
                <div key={e.id} className="cv-row">
                  <div className="cv-row__years">{e.years}</div>
                  <div>
                    <div className="cv-row__title">{e.label}</div>
                    {e.org ? <div className="cv-row__sub">{e.org}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <div className="cv-section__head">
              <h2 className="cv-heading" style={{ margin: 0 }}>Selected Publications</h2>
              <Link href="/publications" className="link-underline" style={{ fontSize: 14 }}>전체 논문 보기</Link>
            </div>
            <div>
              {selected.map((p) => (
                <article key={p.id} className="cv-pub">
                  <div className="cv-pub__year">{p.year}</div>
                  <div>
                    <div className="cv-pub__title">{p.title}</div>
                    <div className="cv-pub__authors">{p.authors}</div>
                    <div className="cv-pub__venue">{p.venue}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="cv-section cv-section--last">
            <h2 className="cv-heading">Awards &amp; Honors</h2>
            <div className="cv-awards">
              {awards.map((a) => (
                <div key={a.id} className="cv-row">
                  <div className="cv-row__years">{a.years}</div>
                  <div className="cv-award__title">{a.label}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
