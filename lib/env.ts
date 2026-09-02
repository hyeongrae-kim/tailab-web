// 서버 전용 환경변수 접근 지점. 클라이언트에서 import 금지.

export const env = {
  notionToken: process.env.NOTION_TOKEN ?? '',
  webhookSecret: process.env.NOTION_WEBHOOK_SECRET ?? '',
  db: {
    news: process.env.NOTION_DB_NEWS ?? '',
    publications: process.env.NOTION_DB_PUBLICATIONS ?? '',
    members: process.env.NOTION_DB_MEMBERS ?? '',
    research: process.env.NOTION_DB_RESEARCH ?? '',
    projects: process.env.NOTION_DB_PROJECTS ?? '',
    professor: process.env.NOTION_DB_PROFESSOR ?? '',
    cv: process.env.NOTION_DB_CV ?? '',
    site: process.env.NOTION_DB_SITE ?? '',
  },
};

// 토큰이 없으면 샘플 데이터로 폴백한다.
export const hasNotion = Boolean(env.notionToken);
