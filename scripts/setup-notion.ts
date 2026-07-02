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
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import * as sample from '../lib/sample-data.ts';

const require = createRequire(import.meta.url);
const { Client } = require('@notionhq/client');

// ---- .env.local 로드 (standalone 스크립트는 자동 로드 안 됨) ----
function loadEnvLocal(): void {
  try {
    const text = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* .env.local 없으면 process.env 만 사용 */
  }
}
loadEnvLocal();

const token = process.env.NOTION_TOKEN;
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

const notion = new Client({ auth: token });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ---- 속성 스키마 빌더 ----
const P = {
  title: () => ({ title: {} }),
  text: () => ({ rich_text: {} }),
  number: () => ({ number: {} }),
  date: () => ({ date: {} }),
  url: () => ({ url: {} }),
  files: () => ({ files: {} }),
  checkbox: () => ({ checkbox: {} }),
  select: (opts: string[]) => ({ select: { options: opts.map((name) => ({ name })) } }),
  multi: () => ({ multi_select: {} }),
};

// ---- 값 빌더 ----
const V = {
  title: (s: string) => ({ title: [{ text: { content: s ?? '' } }] }),
  text: (s?: string) => ({ rich_text: s ? [{ text: { content: s } }] : [] }),
  number: (n: number) => ({ number: n }),
  date: (s: string) => ({ date: { start: s.replace(/\./g, '-') } }), // 2026.06.12 → 2026-06-12
  url: (s?: string) => ({ url: s || null }),
  select: (s: string) => ({ select: { name: s } }),
  multi: (arr: string[]) => ({ multi_select: arr.map((name) => ({ name })) }),
  checkbox: (b: boolean) => ({ checkbox: Boolean(b) }),
};

type Props = Record<string, unknown>;

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
    name: P.title(),
    role: P.text(),
    note: P.text(),
    category: P.select(['postdoc', 'phd', 'ms', 'undergrad', 'visiting', 'alumni']),
    order: P.number(),
    photo: P.files(),
  });
  await seed(
    ids.NOTION_DB_MEMBERS,
    sample.sampleMembers.map((m) => ({
      name: V.title(m.name),
      role: V.text(m.role),
      note: V.text(m.note),
      category: V.select(m.category),
      order: V.number(m.order),
    })),
  );

  // 4) Research Areas
  ids.NOTION_DB_RESEARCH = await createDb('TAILAB · Research Areas', {
    title: P.title(),
    description: P.text(),
    tags: P.multi(),
    order: P.number(),
  });
  await seed(
    ids.NOTION_DB_RESEARCH,
    sample.sampleResearchAreas.map((a) => ({
      title: V.title(a.title),
      description: V.text(a.description),
      tags: V.multi(a.tags),
      order: V.number(Number(a.no)),
    })),
  );

  // 5) Projects
  ids.NOTION_DB_PROJECTS = await createDb('TAILAB · Projects', {
    title: P.title(),
    type: P.select(['national', 'company']),
    funder: P.text(),
    role: P.text(),
    period: P.text(),
    order: P.number(),
  });
  await seed(
    ids.NOTION_DB_PROJECTS,
    sample.sampleProjects.map((p, i) => ({
      title: V.title(p.title),
      type: V.select(p.type),
      funder: V.text(p.funder),
      role: V.text(p.role),
      period: V.text(p.period),
      order: V.number(i + 1),
    })),
  );

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
