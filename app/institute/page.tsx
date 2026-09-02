import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteCopy } from '@/lib/notion';
import PageHeader from '@/components/common/PageHeader';

export const metadata: Metadata = { title: 'Institute' };

export default async function InstitutePage() {
  const t = await getSiteCopy();
  const center = t('institute.center');
  const director = t('institute.director');
  const direction = t('institute.direction');
  const site = t('institute.site');
  // "AI Research Hub Director · 오동석" → 소제목 + 이름
  const [dirRole, dirName] = director.heading.includes(' · ')
    ? director.heading.split(' · ')
    : [director.heading, ''];

  return (
    <div className="container container--top">
      <PageHeader eyebrow={center.en ?? 'Institute'} title={center.heading}>
        {center.body.split('\n').map((line, i) => (
          <span key={i}>
            {i > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </PageHeader>

      <section className="subsection">
        <div className="inst-grid">
          <article className="inst-card">
            <div className="eyebrow eyebrow--label">{dirRole}</div>
            <h2 className="inst-card__title">{dirName || dirRole}</h2>
            <p className="inst-card__body">{director.body}</p>
            <Link href="/professor" className="link-underline inst-card__link">프로필 보기</Link>
          </article>
          <article className="inst-card">
            <div className="eyebrow eyebrow--label">Research Direction</div>
            <h2 className="inst-card__title">{direction.heading}</h2>
            <p className="inst-card__body">{direction.body}</p>
          </article>
        </div>
      </section>

      <section className="subsection subsection--last" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="inst-cta">
          <div>
            <h2 className="inst-card__title">{site.heading}</h2>
            <p className="inst-card__body">{site.body}</p>
          </div>
          {site.link ? (
            <a href={site.link} target="_blank" rel="noreferrer" className="btn btn--solid">
              바로가기 ↗
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}
