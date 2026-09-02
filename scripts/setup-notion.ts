/**
 * 일회성 부트스트랩: Notion에 6개(+CV) 데이터베이스를 스키마대로 생성하고
 * lib/sample-data.ts 의 목업을 시딩한 뒤, .env.local 에 붙여넣을 DB ID들을 출력한다.
 *
 * 사전 준비(사용자):
 *   1) Notion 통합 생성 → NOTION_TOKEN 확보
 *   2) Notion 페이지 1개 생성 → 그 페이지를 통합에 연결(Connections) → 페이지 ID 확보
 *   3) .env.local 에 NOTION_TOKEN, NOTION_PARENT_PAGE_ID 입력
 *
 * 실행:  npm run setup:notion
 */
import * as sample from '../lib/sample-data.ts';
import { notion, token, P, V, seed, type Props } from './shared.ts';
import { MEMBER_SCHEMA, PROJECT_SCHEMA, SITE_SCHEMA, memberRow, areaRow, projectRow, siteRow } from './rows.ts';

const parentPageId = process.env.NOTION_PARENT_PAGE_ID;

if (!token || !parentPageId) {
  console.error(
    '\n✖ NOTION_TOKEN 과 NOTION_PARENT_PAGE_ID 가 필요합니다.\n' +
      '  .env.local 에 두 값을 넣고 다시 실행하세요:\n' +
      '    NOTION_TOKEN=secret_xxx\n' +
      '    NOTION_PARENT_PAGE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n',
  );
  process.exit(1);
}

async function createDb(title: string, properties: Props): Promise<string> {
  const res = await notion.databases.create({
    parent: { type: 'page_id', page_id: parentPageId },
    title: [{ type: 'text', text: { content: title } }],
    properties,
  });
  console.log(`  ✓ DB 생성: ${title}`);
  return res.id as string;
}

async function seed(databaseId: string, rows: Props[]): Promise<void> {
  for (const properties of rows) {
    await notion.pages.create({ parent: { database_id: databaseId }, properties });
    await sleep(340); // 레이트리밋(~3 req/s) 여유
  }
  console.log(`    └ ${rows.length}건 시딩 완료`);
}

async function main(): Promise<void> {
  console.log('\nTAILAB · Notion 데이터베이스 부트스트랩 시작\n');
  const ids: Record<string, string> = {};

  // 1) News
  ids.NOTION_DB_NEWS = await createDb('TAILAB · News', {
    title: P.title(),
    description: P.text(),
    category: P.select(['notice', 'award', 'paper', 'talk']),
    date: P.date(),
    thumbnail: P.files(),
  });
  await seed(
    ids.NOTION_DB_NEWS,
    sample.sampleNews.map((n) => ({
      title: V.title(n.title),
      description: V.text(n.description),
      category: V.select(n.category),
      date: V.date(n.date),
    })),
  );

  // 2) Publications
  ids.NOTION_DB_PUBLICATIONS = await createDb('TAILAB · Publications', {
    title: P.title(),
    authors: P.text(),
    venue: P.text(),
    year: P.number(),
    category: P.select(['intl', 'domestic']),
    pdf: P.url(),
    featured: P.checkbox(),
  });
  await seed(
    ids.NOTION_DB_PUBLICATIONS,
    sample.samplePublications.map((p) => ({
      title: V.title(p.title),
      authors: V.text(p.authors),
      venue: V.text(p.venue),
      year: V.number(p.year),
      category: V.select(p.category),
      pdf: V.url(p.pdfUrl),
      featured: V.checkbox(Boolean(p.featured)),
    })),
  );

  // 3) Members
  ids.NOTION_DB_MEMBERS = await createDb('TAILAB · Members', {
    ...MEMBER_SCHEMA,
    photo: P.files(),
  });
  await seed(ids.NOTION_DB_MEMBERS, sample.sampleMembers.map(memberRow));

  // 4) Research Areas
  ids.NOTION_DB_RESEARCH = await createDb('TAILAB · Research Areas', {
    title: P.title(),
    subtitle: P.text(),
    description: P.text(),
    tags: P.multi(),
    order: P.number(),
  });
  await seed(ids.NOTION_DB_RESEARCH, sample.sampleResearchAreas.map(areaRow));

  // 5) Projects
  ids.NOTION_DB_PROJECTS = await createDb('TAILAB · Projects', {
    title: P.title(),
    ...PROJECT_SCHEMA,
    order: P.number(),
  });
  await seed(ids.NOTION_DB_PROJECTS, sample.sampleProjects.map(projectRow));

  // 6) Professor (프로필 1행)
  ids.NOTION_DB_PROFESSOR = await createDb('TAILAB · Professor', {
    name: P.title(),
    nameEn: P.text(),
    position: P.text(),
    dept: P.text(),
    email: P.text(),
    office: P.text(),
    phone: P.text(),
    bioLead: P.text(),
    bio: P.text(),
    interests: P.multi(),
    photo: P.files(),
    scholarUrl: P.url(),
    cvUrl: P.url(),
  });
  const prof = sample.sampleProfessor;
  await seed(ids.NOTION_DB_PROFESSOR, [
    {
      name: V.title(prof.name),
      nameEn: V.text(prof.nameEn),
      position: V.text(prof.position),
      dept: V.text(prof.dept),
      email: V.text(prof.email),
      office: V.text(prof.office),
      phone: V.text(prof.phone),
      bioLead: V.text(prof.bioLead),
      bio: V.text(prof.bio),
      interests: V.multi(prof.interests),
      scholarUrl: V.url(prof.scholarUrl),
      cvUrl: V.url(prof.cvUrl),
    },
  ]);

  // 7) CV Entries
  ids.NOTION_DB_CV = await createDb('TAILAB · CV Entries', {
    label: P.title(),
    kind: P.select(['education', 'experience', 'award']),
    years: P.text(),
    org: P.text(),
    detail: P.text(),
    order: P.number(),
  });
  await seed(
    ids.NOTION_DB_CV,
    sample.sampleCvEntries.map((e, i) => ({
      label: V.title(e.label),
      kind: V.select(e.kind),
      years: V.text(e.years),
      org: V.text(e.org),
      detail: V.text(e.detail),
      order: V.number(i + 1),
    })),
  );

  // 8) Site Copy (페이지 단발 문구)
  ids.NOTION_DB_SITE = await createDb('TAILAB · Site Copy', SITE_SCHEMA);
  await seed(ids.NOTION_DB_SITE, sample.sampleSiteCopy.map(siteRow));

  // ---- 결과 출력 ----
  console.log('\n────────────────────────────────────────────');
  console.log('완료! 아래 줄들을 .env.local 에 붙여넣으세요:\n');
  for (const [k, v] of Object.entries(ids)) {
    console.log(`${k}=${v.replace(/-/g, '')}`);
  }
  console.log('\n그런 다음 `npm run dev` 하면 Notion 데이터로 렌더됩니다.');
  console.log('────────────────────────────────────────────\n');
}

main().catch((err) => {
  console.error('\n✖ 실패:', err?.body ?? err?.message ?? err);
  process.exit(1);
});
