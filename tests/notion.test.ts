import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

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
    const db = Object.fromEntries(['news', 'publications', 'members', 'research', 'projects', 'professor', 'cv', 'site'].map((key) => [key, `${prefix}-${key}`]));
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
  assert.equal(new Set(keys.map((key) => JSON.stringify(key))).size, 24);
  assert.deepEqual(JSON.parse(JSON.stringify(observedTags.slice(0, 8))), [['news'], ['publications'], ['members'], ['research-areas'], ['projects'], ['professor'], ['professor'], ['site']]);
});

test('실제 웹훅 핸들러: 잘못된/누락 서명 401, 올바른 서명 200 및 태그 무효화', async () => {
  const secret = 'test-only-webhook-secret';
  const invalidated: string[] = [];
  const tags = ['news', 'publications', 'members', 'research-areas', 'projects', 'professor', 'site'];
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
