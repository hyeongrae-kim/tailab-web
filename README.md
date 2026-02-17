# TAILAB Homepage

Next.js 15 + Notion CMS 기반 TAILAB 홈페이지 프로젝트입니다.

## 시작하기

```bash
npm install
npm run dev
```

개발 서버: http://localhost:3000

## i18n 라우팅

- 지원 언어: 한국어(`ko`, 기본), 영어(`en`)
- 기본 언어(한국어)는 prefix 없이 제공됩니다. 예: `/`, `/news`
- 영어 페이지는 `/en` 프리픽스로 접근합니다. 예: `/en/news`
- 번역 메시지는 `messages/ko.json`, `messages/en.json`에서 관리합니다.

## 필수 환경변수

`.env.local` 파일을 만들고 아래 값을 채워주세요.

```bash
NOTION_API_KEY=
NOTION_MEMBERS_DB_ID=
NOTION_PUBLICATIONS_DB_ID=
NOTION_NEWS_DB_ID=
NOTION_GALLERY_DB_ID=
NOTION_RESEARCH_DB_ID=
```

## 주요 명령어

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
```
