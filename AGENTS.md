# Tailab Homepage — Next.js + Notion CMS

Notion을 CMS로 사용하는 대학원 연구실 홈페이지. 교수/구성원/논문/연구/뉴스/갤러리 정보를 Notion DB에서 관리하고, Next.js App Router로 서빙한다.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **CMS**: Notion API (`@notionhq/client`)
- **Notion 블록 렌더링**: `@notion-render/client` 또는 커스텀 블록 렌더러
- **배포**: Vercel (추후 self-hosting 가능하도록 Vercel 전용 기능 의존 최소화)
- **패키지 매니저**: npm

## Commands

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm build        # 프로덕션 빌드
npm start        # 프로덕션 서버
npm lint         # ESLint 체크
npm type-check   # TypeScript 타입 체크
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃 (Header, Footer 포함)
│   ├── page.tsx                  # Home (Latest News + About Us)
│   ├── professor/page.tsx        # 교수 CV 페이지
│   ├── members/page.tsx          # 구성원 소개
│   ├── research/page.tsx         # 연구분야 소개
│   ├── publications/page.tsx     # 논문 목록
│   ├── news/
│   │   ├── page.tsx              # 뉴스 목록
│   │   └── [id]/page.tsx         # 뉴스 상세
│   ├── gallery/page.tsx          # 갤러리
│   └── apply/page.tsx            # 지원 안내
├── components/
│   ├── layout/                   # Header, Footer, Navigation
│   ├── home/                     # Home 페이지 전용 컴포넌트
│   ├── members/                  # MemberCard 등
│   ├── publications/             # PublicationItem 등
│   ├── news/                     # NewsCard 등
│   ├── gallery/                  # GalleryGrid 등
│   └── ui/                       # 공통 UI (Button, Tag, Skeleton, Section 등)
├── lib/
│   ├── notion.ts                 # Notion API 클라이언트 (싱글톤)
│   ├── notion-blocks.tsx         # Notion 블록 → React 컴포넌트 변환
│   └── utils.ts                  # 유틸리티 함수
├── types/
│   └── index.ts                  # 공통 타입 (Member, Publication, News 등)
└── constants/
    └── index.ts                  # 상수 (네비게이션 메뉴, DB ID 매핑 등)
```

## Architecture Decisions

### 데이터 페칭

- 모든 Notion API 호출은 **Server Component**에서 수행한다. 클라이언트에 API 키가 노출되지 않는다.
- `lib/notion.ts`에 DB별 fetch 함수를 집중 관리한다 (getMembers, getPublications, getNews 등).
- `revalidate` 옵션으로 ISR 적용. 기본 3600초 (1시간). 필요 시 On-Demand Revalidation API Route 추가.

### Notion 이미지 처리

- Notion S3 이미지 URL은 1시간 후 만료된다.
- `next/image`를 사용하되, `remotePatterns`에 Notion 이미지 도메인을 등록한다.
- 만료 대응: ISR revalidate 주기를 이미지 만료 시간보다 짧게 유지하거나, 별도 이미지 프록시 API Route를 둔다.

### Vercel 종속 최소화

- Edge Runtime, Vercel KV, Vercel Blob 등 Vercel 전용 기능은 사용하지 않는다.
- 추후 `next start`로 self-hosting 가능한 상태를 유지한다.

## Pages & Notion DB Mapping

| 페이지       | Notion DB                              | 주요 속성                                                                                     |
| ------------ | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| Home         | News DB (최신 3~5건)                   | 제목, 날짜, 카테고리, 고정여부                                                                |
| Professor    | 별도 페이지 또는 Members DB (교수 1명) | 이름, 직위, 학력, 경력, 연구분야, 이메일, 프로필 이미지                                       |
| Members      | Members DB                             | 이름, 직급(PhD/PostDoc/MS/BS/Visiting/Alumni), 이메일, 프로필, 연구관심사, 졸업여부, 정렬순서 |
| Research     | Research DB 또는 단일 Notion 페이지    | 연구분야명, 설명, 대표 이미지                                                                 |
| Publications | Publications DB                        | 제목, 저자, 학회/저널, 연도, DOI, 카테고리(Journal/Conference/Workshop), Abstract             |
| News         | News DB                                | 제목, 날짜, 본문(블록 콘텐츠), 카테고리, 대표이미지                                           |
| Gallery      | Gallery DB                             | 제목, 날짜, 이미지들, 설명                                                                    |
| Apply        | 단일 Notion 페이지                     | 지원 안내 텍스트 (블록 콘텐츠)                                                                |

## Coding Conventions

### TypeScript

- `strict: true`. `any` 타입 사용 금지.
- Notion API 응답은 반드시 타입 파싱 함수를 거쳐 우리 타입으로 변환한다 (raw Notion 타입을 컴포넌트에 직접 전달하지 않는다).

### Components

- 페이지 컴포넌트는 Server Component (async function)로 작성하고, 인터랙티브 요소만 'use client' Client Component로 분리한다.
- 컴포넌트 파일명: PascalCase (e.g., `MemberCard.tsx`).
- 한 파일에 하나의 export 컴포넌트.

### Styling

- Tailwind CSS 유틸리티 클래스만 사용. 커스텀 CSS 파일 작성하지 않는다.
- 반응형: mobile-first (기본 → `md:` → `lg:`)
- 다크모드: 현재 미지원 (추후 추가 가능하도록 시맨틱 색상 변수 사용 권장)

## Important Notes

- `.env.local` 파일은 절대 커밋하지 않는다. `.env.example`에 필요한 환경변수 키만 문서화한다.
- Notion DB ID와 API Key는 환경변수로 관리한다:
  - `NOTION_API_KEY`
  - `NOTION_MEMBERS_DB_ID`
  - `NOTION_PUBLICATIONS_DB_ID`
  - `NOTION_NEWS_DB_ID`
  - `NOTION_GALLERY_DB_ID`
  - `NOTION_RESEARCH_DB_ID`
- 한국어/영어 병행 사이트. UI 텍스트는 영어 기본, Notion 콘텐츠는 작성 언어 그대로 표시.
- SEO: 각 페이지에 적절한 metadata (title, description, og:image) 설정. 논문 페이지는 Google Scholar 친화적 메타태그 포함.
