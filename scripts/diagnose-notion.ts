/** 진단: .env.local 인식 여부 + Notion에서 실제로 들어오는 데이터 확인. 시크릿은 출력하지 않는다. */
import { createRequire } from 'module';
import { readFileSync } from 'fs';

const require = createRequire(import.meta.url);
const { Client } = require('@notionhq/client');

function loadEnvLocal(): void {
  try {
    const text = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
}
loadEnvLocal();

const present = (v?: string) => (v && v.trim() ? '✓ set' : '✗ MISSING');
const token = process.env.NOTION_TOKEN;

console.log('\n[env.local 인식 상태]');
console.log('  NOTION_TOKEN          ', present(token));
console.log('  NOTION_DB_NEWS        ', present(process.env.NOTION_DB_NEWS));
console.log('  NOTION_DB_PUBLICATIONS', present(process.env.NOTION_DB_PUBLICATIONS));
console.log('  NOTION_DB_MEMBERS     ', present(process.env.NOTION_DB_MEMBERS));
console.log('  → hasNotion (앱이 Notion 사용?):', Boolean(token));

if (!token || !process.env.NOTION_DB_NEWS) {
  console.log('\n토큰/DB ID가 없어 앱은 샘플 데이터로 폴백 중입니다. .env.local을 확인하세요.\n');
  process.exit(0);
}

const notion = new Client({ auth: token });
const text = (p: any) => (p?.title ?? p?.rich_text ?? []).map((t: any) => t.plain_text).join('');

const res = await notion.databases.query({
  database_id: process.env.NOTION_DB_NEWS,
  sorts: [{ property: 'date', direction: 'descending' }],
});
console.log(`\n[Notion News DB 실시간 조회] ${res.results.length}건`);
for (const r of res.results.slice(0, 5) as any[]) {
  console.log(`  · ${text(r.properties.title)}  (${r.properties.category?.select?.name}, ${r.properties.date?.date?.start})`);
}
console.log('\n→ 위 제목이 방금 수정한 내용과 같다면 "캐시" 문제(=.next 비우면 해결).');
console.log('→ 다르거나 옛 목업 그대로면 다른 DB를 보고 있거나 토큰 권한 문제.\n');
