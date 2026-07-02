// 도메인 콘텐츠 타입. Notion raw → 이 타입으로 변환(매핑)은 lib/notion.ts 에 가둔다.

export type NewsCategory = 'notice' | 'award' | 'paper' | 'talk';
export type PublicationCategory = 'intl' | 'domestic';
export type MemberCategory =
  | 'postdoc'
  | 'phd'
  | 'ms'
  | 'undergrad'
  | 'visiting'
  | 'alumni';
export type ProjectType = 'national' | 'company';
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
  category: PublicationCategory;
  pdfUrl?: string;
  featured?: boolean;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  note: string;
  category: MemberCategory;
  order: number;
  photoUrl?: string;
}

export interface ResearchArea {
  id: string;
  no: string; // "01", "02" ...
  title: string;
  description: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  funder: string;
  role: string;
  period: string;
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
