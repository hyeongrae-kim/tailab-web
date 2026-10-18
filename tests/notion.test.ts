import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import type { SiteCopy } from '../lib/types';

const databaseKeys = ['news', 'publications', 'members', 'research', 'projects', 'professor', 'cv', 'researchSiteCopy', 'instituteSiteCopy'];
const tags = ['news', 'publications', 'members', 'research-areas', 'projects', 'professor', 'research-site-copy', 'institute-site-copy'];

function load(path: string, dependencies: Record<string, unknown>): Record<string, unknown> {
  const code = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  runInNewContext(code, { exports, require: (name: string) => {
    assert.ok(name in dependencies, `예상하지 않은 모듈: ${name}`);
    return dependencies[name];
  }, console: { log: () => {} }, Buffer });
  return exports;
}

test('실제 조회 함수: DB 교체/샘플 전환 시 기존 캐시를 재사용하지 않고 태그/TTL 유지', async () => {
  const cache = new Map<string, unknown>();
  const keys: string[][] = [];
  const observedTags: string[][] = [];
  let queries = 0;
  function moduleFor(prefix: string, hasNotion: boolean) {
    const db = Object.fromEntries(databaseKeys.map((key) => [key, `${prefix}-${key}`]));
    return load('lib/notion.ts', {
      '@notionhq/client': { Client: class { databases = { query: async ({ database_id }: { database_id: string }) => {
        queries++;
        return { results: [{ id: database_id, properties: {} }], has_more: false };
      } }; } },
      'next/cache': { unstable_cache: (fn: () => Promise<unknown>, key: string[], options: { tags: string[]; revalidate: number }) => {
        keys.push(key); observedTags.push(options.tags);
        assert.equal(options.revalidate, 3600);
        return async () => {
          const cacheKey = JSON.stringify(key);
          if (!cache.has(cacheKey)) cache.set(cacheKey, await fn());
          return cache.get(cacheKey);
        };
      } },
      './env': { hasNotion, env: { notionToken: 'test', db } },
      './sample-data': { sampleNews: [{ id: 'sample' }] },
      './image-mirror': { mirrorImage: async () => undefined },
    });
  }
  const source = moduleFor('source', true);
  const target = moduleFor('target', true);
  const sample = moduleFor('source', false);
  const news = async (mod: Record<string, unknown>) => (await (mod.getNews as () => Promise<{ id: string }[]>)())[0].id;
  assert.equal(await news(source), 'source-news');
  assert.equal(await news(target), 'target-news');
  assert.equal(await news(sample), 'sample');
  assert.equal(await news(source), 'source-news');
  assert.equal(queries, 2);
  assert.equal(new Set(keys.map((key) => JSON.stringify(key))).size, 27);
  assert.deepEqual(JSON.parse(JSON.stringify(observedTags.slice(0, 9))), [['news'], ['publications'], ['members'], ['research-areas'], ['projects'], ['professor'], ['professor'], ['research-site-copy'], ['institute-site-copy']]);
  assert.deepEqual(Array.from(source.ALL_TAGS as string[]), tags);
});

function copyModule(hasNotion: boolean, db: Record<string, string>) {
  const queries: string[] = [];
  const sample = load('lib/sample-data.ts', {});
  const text = (value: string) => [{ plain_text: value }];
  const mod = load('lib/notion.ts', {
    '@notionhq/client': { Client: class { databases = { query: async ({ database_id, start_cursor }: { database_id: string; start_cursor?: string }) => {
      queries.push(database_id);
      // 같은 key도 각 DB의 값을 사용해야 한다. 두 번째 페이지도 합쳐 조회한다.
      return { results: [{ properties: {
        key: { title: text(start_cursor ? 'second' : 'shared') },
        heading: { rich_text: text(database_id) },
        body: { rich_text: [...text('문단 1'), ...text('\n문단 2')] },
        en: { rich_text: text('English') },
        link: { url: 'https://example.com/' },
      } }], has_more: !start_cursor, next_cursor: start_cursor ? null : 'next' };
    } }; } },
    'next/cache': { unstable_cache: (fn: () => Promise<unknown>) => fn },
    './env': { hasNotion, env: { notionToken: 'test', db } },
    './sample-data': sample,
    './image-mirror': { mirrorImage: async () => undefined },
  });
  return { queries, sample, research: mod.getResearchSiteCopy as () => Promise<(key: string) => SiteCopy>,
    institute: mod.getInstituteSiteCopy as () => Promise<(key: string) => SiteCopy> };
}

test('연구/연구소 문구: 독립 DB 조회, 페이지네이션과 필드 보존', async () => {
  const mod = copyModule(true, { researchSiteCopy: 'research-copy', instituteSiteCopy: 'institute-copy' });
  const research = await mod.research();
  assert.deepEqual(mod.queries, ['research-copy', 'research-copy']);
  const institute = await mod.institute();
  assert.deepEqual(mod.queries, ['research-copy', 'research-copy', 'institute-copy', 'institute-copy']);
  for (const [reader, id] of [[research, 'research-copy'], [institute, 'institute-copy']] as const) {
    assert.deepEqual({ ...reader('shared') }, { key: 'shared', heading: id, body: '문단 1\n문단 2', en: 'English', link: 'https://example.com/' });
    assert.equal(reader('second').heading, id);
    assert.deepEqual({ ...reader('missing') }, { key: 'missing', heading: '', body: '' });
  }
});

test('연구/연구소 문구: 새 DB ID 누락 시 기존 DB나 샘플로 대체하지 않는다', async () => {
  const mod = copyModule(true, { site: 'legacy-copy', researchSiteCopy: '', instituteSiteCopy: '' });
  await assert.rejects(mod.research(), /Missing Notion database ID for research-site-copy/);
  await assert.rejects(mod.institute(), /Missing Notion database ID for institute-site-copy/);
  assert.equal(mod.queries.length, 0);
});

test('샘플 모드: 각 페이지의 기존 문구를 유지하며 DB 설정 없이 조회한다', async () => {
  const mod = copyModule(false, { researchSiteCopy: '', instituteSiteCopy: '' });
  const research = await mod.research();
  const institute = await mod.institute();
  for (const copy of mod.sample.sampleSiteCopy as SiteCopy[]) {
    if (copy.key === 'about.philosophy') assert.equal(research(copy.key), copy);
    else if (copy.key.startsWith('institute.')) assert.equal(institute(copy.key), copy);
  }
  assert.equal(research('institute.center').heading, '');
  assert.equal(institute('about.philosophy').heading, '');
  assert.equal(mod.queries.length, 0);
});

test('실제 웹훅 핸들러: 잘못된/누락 서명 401, 올바른 서명 200 및 태그 무효화', async () => {
  const secret = 'test-only-webhook-secret';
  const invalidated: string[] = [];
  const mod = load('app/api/notion/webhook/route.ts', {
    crypto: { createHmac, timingSafeEqual },
    'next/server': { NextResponse: { json: (body: unknown, init?: { status: number }) => ({ body, status: init?.status ?? 200 }) } },
    'next/cache': { revalidateTag: (tag: string) => invalidated.push(tag) },
    '@/lib/env': { env: { webhookSecret: secret } }, '@/lib/notion': { ALL_TAGS: tags },
  });
  const post = mod.POST as (req: Request) => Promise<{ status: number }>;
  const body = JSON.stringify({ type: 'page.properties_updated' });
  const request = (signature?: string) => new Request('https://test/api/notion/webhook', { method: 'POST', body,
    headers: signature ? { 'x-notion-signature': signature } : {} });
  assert.equal((await post(request())).status, 401);
  assert.equal((await post(request('sha256=wrong'))).status, 401);
  assert.equal(invalidated.length, 0);
  const signature = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex');
  assert.equal((await post(request(signature))).status, 200);
  assert.deepEqual(invalidated, tags);
});
