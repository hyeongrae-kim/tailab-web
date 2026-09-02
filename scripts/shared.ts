// setup-notion / migrate-draft 공용: .env.local 로드, Notion 클라이언트, 속성/값 빌더, 시딩.
import { createRequire } from 'module';
import { readFileSync } from 'fs';

const require = createRequire(import.meta.url);
const { Client } = require('@notionhq/client');

export function loadEnvLocal(): void {
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

export const token = process.env.NOTION_TOKEN;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const notion: any = new Client({ auth: token });
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ---- 속성 스키마 빌더 ----
export const P = {
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
export const V = {
  title: (s: string) => ({ title: [{ text: { content: s ?? '' } }] }),
  text: (s?: string) => ({ rich_text: s ? [{ text: { content: s } }] : [] }),
  number: (n: number) => ({ number: n }),
  date: (s: string) => ({ date: { start: s.replace(/\./g, '-') } }), // 2026.06.12 → 2026-06-12
  url: (s?: string) => ({ url: s || null }),
  select: (s: string) => ({ select: { name: s } }),
  multi: (arr: string[]) => ({ multi_select: arr.map((name) => ({ name })) }),
  checkbox: (b: boolean) => ({ checkbox: Boolean(b) }),
};

export type Props = Record<string, unknown>;

export async function seed(databaseId: string, rows: Props[]): Promise<void> {
  for (const properties of rows) {
    await notion.pages.create({ parent: { database_id: databaseId }, properties });
    await sleep(340); // 레이트리밋(~3 req/s) 여유
  }
  console.log(`    └ ${rows.length}건 시딩 완료`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function queryAll(databaseId: string): Promise<any[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({ database_id: databaseId, start_cursor: cursor });
    out.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return out;
}
