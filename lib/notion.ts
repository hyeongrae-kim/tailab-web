// 서버 전용. Notion 클라이언트 + 타입드 fetch 함수.
// NOTION_TOKEN 이 없으면 lib/sample-data.ts 로 폴백한다.
// 컴포넌트는 @notionhq/client 를 직접 import 하지 말고 반드시 이 모듈의 getX() 를 쓴다.
import { Client } from '@notionhq/client';
import { unstable_cache } from 'next/cache';
import { env, hasNotion } from './env';
import type {
  News,
  Publication,
  Member,
  ResearchArea,
  Project,
  CvEntry,
  Professor,
  SiteCopy,
  NewsCategory,
  MemberCategory,
  ProjectRole,
  CvKind,
} from './types';
import * as sample from './sample-data';
import { mirrorImage } from './image-mirror';

const notion = hasNotion
  ? new Client({ auth: env.notionToken, notionVersion: '2022-06-28' })
  : null;

const REVALIDATE = 3600; // 웹훅 누락 대비 시간 재검증(보험). 빠른 갱신은 revalidateTag.

/* ----------------------------------------------------------------
   Notion property 추출 헬퍼.
   매핑 경계에서만 느슨한 접근을 허용한다(이 파일 밖으로 raw가 새지 않게).
---------------------------------------------------------------- */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = Record<string, any>;

function plainText(prop: any): string {
  const arr = prop?.title ?? prop?.rich_text ?? [];
  return Array.isArray(arr) ? arr.map((t: any) => t.plain_text ?? '').join('') : '';
}
function selectKey(prop: any): string {
  return prop?.select?.name ?? '';
}
function multiSelect(prop: any): string[] {
  return Array.isArray(prop?.multi_select) ? prop.multi_select.map((o: any) => o.name) : [];
}
function numberOf(prop: any, fallback = 0): number {
  return typeof prop?.number === 'number' ? prop.number : fallback;
}
function urlOf(prop: any): string | undefined {
  return prop?.url || undefined;
}
function checkbox(prop: any): boolean {
  return Boolean(prop?.checkbox);
}
function dateOf(prop: any): string {
  return prop?.date?.start ?? '';
}
function fileUrl(prop: any): string | undefined {
  const f = prop?.files?.[0];
  return f?.file?.url ?? f?.external?.url ?? undefined;
}

// databaseId → 사람이 읽기 쉬운 이름 (로그용)
const DB_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(env.db).map(([name, id]) => [id, name]),
);

async function queryAll(databaseId: string, sorts?: any[]): Promise<any[]> {
  if (!notion) return [];
  const t0 = Date.now();
  const results: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      sorts,
    });
    results.push(...res.results);
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  // 이 로그는 "캐시 미스"일 때만 찍힘(= Notion을 실제로 조회). 안 찍히면 캐시에서 나온 것.
  console.log(`[notion] ${DB_LABEL[databaseId] ?? databaseId} 조회 ${results.length}건 · ${Date.now() - t0}ms`);
  return results;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ----------------------------------------------------------------
   공개 fetch 함수 (태그 기반 캐시 → 웹훅이 revalidateTag 로 무효화)
---------------------------------------------------------------- */

export const getNews = unstable_cache(
  async (): Promise<News[]> => {
    if (!notion) return sample.sampleNews;
    const rows = await queryAll(env.db.news, [{ property: 'date', direction: 'descending' }]);
    return Promise.all(
      rows.map(async (r): Promise<News> => {
        const p = r.properties as Props;
        return {
          id: r.id,
          title: plainText(p.title),
          description: plainText(p.description),
          category: (selectKey(p.category) || 'notice') as NewsCategory,
          date: dateOf(p.date),
          thumbnailUrl: await mirrorImage(fileUrl(p.thumbnail)),
        };
      }),
    );
  },
  ['news'],
  { tags: ['news'], revalidate: REVALIDATE },
);

export const getPublications = unstable_cache(
  async (): Promise<Publication[]> => {
    if (!notion) return sample.samplePublications;
    const rows = await queryAll(env.db.publications, [{ property: 'year', direction: 'descending' }]);
    return rows.map((r): Publication => {
      const p = r.properties as Props;
      return {
        id: r.id,
        title: plainText(p.title),
        authors: plainText(p.authors),
        venue: plainText(p.venue),
        year: numberOf(p.year),
        linkUrl: urlOf(p.link),
        featured: checkbox(p.featured),
      };
    });
  },
  ['publications'],
  { tags: ['publications'], revalidate: REVALIDATE },
);

export const getMembers = unstable_cache(
  async (): Promise<Member[]> => {
    if (!notion) return sample.sampleMembers;
    const rows = await queryAll(env.db.members, [{ property: 'order', direction: 'ascending' }]);
    return Promise.all(
      rows.map(async (r): Promise<Member> => {
        const p = r.properties as Props;
        return {
          id: r.id,
          name: plainText(p.name),
          category: (selectKey(p.category) || 'phd') as MemberCategory,
          order: numberOf(p.order),
          nameEn: plainText(p.nameEn) || undefined,
          role: plainText(p.role) || undefined,
          roleEn: plainText(p.roleEn) || undefined,
          interests: plainText(p.interests) || undefined,
          homepage: urlOf(p.homepage),
          github: urlOf(p.github),
          linkedin: urlOf(p.linkedin),
          email: plainText(p.email) || undefined,
          photoUrl: await mirrorImage(fileUrl(p.photo)),
        };
      }),
    );
  },
  ['members'],
  { tags: ['members'], revalidate: REVALIDATE },
);

export const getResearchAreas = unstable_cache(
  async (): Promise<ResearchArea[]> => {
    if (!notion) return sample.sampleResearchAreas;
    const rows = await queryAll(env.db.research, [{ property: 'order', direction: 'ascending' }]);
    return rows.map((r, i): ResearchArea => {
      const p = r.properties as Props;
      return {
        id: r.id,
        no: String(numberOf(p.order, i + 1)).padStart(2, '0'),
        title: plainText(p.title),
        subtitle: plainText(p.subtitle) || undefined,
        description: plainText(p.description),
        tags: multiSelect(p.tags),
      };
    });
  },
  ['research-areas'],
  { tags: ['research-areas'], revalidate: REVALIDATE },
);

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    if (!notion) return sample.sampleProjects;
    const rows = await queryAll(env.db.projects, [{ property: 'order', direction: 'ascending' }]);
    return rows.map((r): Project => {
      const p = r.properties as Props;
      return {
        id: r.id,
        title: plainText(p.title),
        role: (selectKey(p.role) || 'co') as ProjectRole,
        funder: plainText(p.funder),
        field: plainText(p.field),
        description: plainText(p.description),
      };
    });
  },
  ['projects'],
  { tags: ['projects'], revalidate: REVALIDATE },
);

export const getProfessor = unstable_cache(
  async (): Promise<Professor> => {
    if (!notion) return sample.sampleProfessor;
    const rows = await queryAll(env.db.professor);
    const r = rows[0];
    if (!r) return sample.sampleProfessor;
    const p = r.properties as Props;
    return {
      name: plainText(p.name),
      nameEn: plainText(p.nameEn),
      position: plainText(p.position),
      dept: plainText(p.dept),
      email: plainText(p.email),
      office: plainText(p.office),
      phone: plainText(p.phone),
      bioLead: plainText(p.bioLead),
      bio: plainText(p.bio),
      interests: multiSelect(p.interests),
      photoUrl: await mirrorImage(fileUrl(p.photo)),
      scholarUrl: urlOf(p.scholarUrl),
      cvUrl: urlOf(p.cvUrl),
    };
  },
  ['professor'],
  { tags: ['professor'], revalidate: REVALIDATE },
);

export const getCvEntries = unstable_cache(
  async (): Promise<CvEntry[]> => {
    if (!notion) return sample.sampleCvEntries;
    const rows = await queryAll(env.db.cv, [{ property: 'order', direction: 'ascending' }]);
    return rows.map((r): CvEntry => {
      const p = r.properties as Props;
      return {
        id: r.id,
        kind: (selectKey(p.kind) || 'experience') as CvKind,
        label: plainText(p.label),
        years: plainText(p.years),
        org: plainText(p.org) || undefined,
        detail: plainText(p.detail) || undefined,
      };
    });
  },
  ['cv'],
  { tags: ['professor'], revalidate: REVALIDATE },
);

// 페이지 단발 문구(About·Institute). 캐시는 배열, 조회는 key → SiteCopy (없으면 빈 문구로 폴백).
const fetchSiteCopy = unstable_cache(
  async (): Promise<SiteCopy[]> => {
    if (!notion) return sample.sampleSiteCopy;
    const rows = await queryAll(env.db.site);
    return rows.map((r): SiteCopy => {
      const p = r.properties as Props;
      return {
        key: plainText(p.key),
        heading: plainText(p.heading),
        body: plainText(p.body),
        en: plainText(p.en) || undefined,
        link: urlOf(p.link),
      };
    });
  },
  ['site'],
  { tags: ['site'], revalidate: REVALIDATE },
);

export async function getSiteCopy(): Promise<(key: string) => SiteCopy> {
  const list = await fetchSiteCopy();
  return (key) => list.find((c) => c.key === key) ?? { key, heading: '', body: '' };
}

// 웹훅이 무효화할 수 있는 전체 태그 목록.
export const ALL_TAGS = [
  'news',
  'publications',
  'members',
  'research-areas',
  'projects',
  'professor',
  'site',
] as const;
