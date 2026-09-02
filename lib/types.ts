// 도메인 콘텐츠 타입. Notion raw → 이 타입으로 변환(매핑)은 lib/notion.ts 에 가둔다.

export type NewsCategory = 'notice' | 'award' | 'paper' | 'talk';
export type MemberCategory = 'research-professor' | 'phd' | 'ms' | 'researcher' | 'alumni';
export type ProjectRole = 'pi' | 'co';
export type CvKind = 'education' | 'experience' | 'award';

export interface News {
  id: string;
  title: string;
  description: string;
  category: NewsCategory;
  date: string; // ISO or display string
  thumbnailUrl?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  linkUrl?: string; // 논문 링크(게재지·아카이브 등, PDF 아니어도 됨)
  featured?: boolean;
}

// 이름 외 전부 선택 — Notion에 이름만 먼저 넣고 나머지는 나중에 채워도 카드가 뜬다.
export interface Member {
  id: string;
  name: string;
  category: MemberCategory;
  order: number;
  nameEn?: string;
  role?: string;
  roleEn?: string;
  interests?: string;
  homepage?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  photoUrl?: string;
}

export interface ResearchArea {
  id: string;
  no: string; // "01", "02" ...
  title: string;
  subtitle?: string; // 영문 한 줄
  description: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  role: ProjectRole;
  funder: string;
  field: string; // 연구 분야
  description: string; // 홈페이지 소개 문안
}

export interface CvEntry {
  id: string;
  kind: CvKind;
  label: string;
  years: string;
  org?: string;
  detail?: string;
}

export interface Professor {
  name: string;
  nameEn: string;
  position: string;
  dept: string;
  email: string;
  office: string;
  phone: string;
  bioLead: string;
  bio: string;
  interests: string[];
  photoUrl?: string;
  scholarUrl?: string;
  cvUrl?: string;
}

// 페이지 단발 문구(About·Institute 등). key 로 조회.
export interface SiteCopy {
  key: string;
  heading: string;
  body: string;
  en?: string;
  link?: string;
}
