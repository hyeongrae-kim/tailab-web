/**
 * 기존 Professor DB에 'photo' (Files & media) 속성을 추가한다. (이미 있으면 그대로)
 * setup-notion 을 이미 돌린 워크스페이스용 일회성 마이그레이션.
 * 실행:  node --experimental-strip-types scripts/add-professor-photo.ts
 */
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

const token = process.env.NOTION_TOKEN;
const dbId = process.env.NOTION_DB_PROFESSOR;
if (!token || !dbId) {
  console.error('✖ NOTION_TOKEN / NOTION_DB_PROFESSOR 가 .env.local 에 필요합니다.');
  process.exit(1);
}

const notion = new Client({ auth: token });

await notion.databases.update({
  database_id: dbId,
  properties: { photo: { files: {} } },
});

console.log("✓ Professor DB에 'photo' (Files & media) 속성을 추가했습니다.");
console.log('  이제 Notion에서 교수 행을 열어 photo 에 사진을 업로드하세요.');
