import type { Metadata } from 'next';
import { getProfessor, getCvEntries } from '@/lib/notion';
import type { CvEntry } from '@/lib/types';
import Thumb from '@/components/common/Thumb';

export const metadata: Metadata = { title: 'Professor' };

function CvSection({ title, rows }: { title: string; rows: CvEntry[] }) {
  if (!rows.length) return null;
  return (
    <section className="cv-section">
      <h2 className="cv-heading">{title}</h2>
      <div className="cv-rows">
        {rows.map((e) => (
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
  );
}

export default async function ProfessorPage() {
  const [prof, cv] = await Promise.all([getProfessor(), getCvEntries()]);

  return (
    <div className="container container--top">
      <div className="breadcrumb">Faculty / Principal Investigator</div>

      <div className="cv-grid">
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
            {prof.office ? <div className="cv-contact__row"><span>Office</span><span>{prof.office}</span></div> : null}
            {prof.phone ? <div className="cv-contact__row"><span>Phone</span><span>{prof.phone}</span></div> : null}
          </div>
          {prof.scholarUrl || prof.cvUrl ? (
            <div className="cv-links">
              {prof.scholarUrl ? <a href={prof.scholarUrl} target="_blank" rel="noreferrer" className="cv-link">Google Scholar</a> : null}
              {prof.cvUrl ? <a href={prof.cvUrl} target="_blank" rel="noreferrer" className="cv-link">CV (PDF)</a> : null}
            </div>
          ) : null}
        </aside>

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
          <CvSection title="Education" rows={cv.filter((e) => e.kind === 'education')} />
          <CvSection title="Experience" rows={cv.filter((e) => e.kind === 'experience')} />
        </main>
      </div>
    </div>
  );
}
