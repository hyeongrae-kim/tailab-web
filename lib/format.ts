// 순수 표현 헬퍼: 콘텐츠 카테고리 → 화면 라벨 / 배지 강조 여부.
import type { MemberCategory, NewsCategory } from './types';

export const MEMBER_CATEGORY_LABEL: Record<MemberCategory, string> = {
  postdoc: '박사후연구원',
  phd: '박사과정',
  ms: '석사과정',
  undergrad: '학부연구생',
  visiting: '객원연구원',
  alumni: 'Alumni',
};

// 구성원 필터/그룹 순서 (전체 → 각 그룹)
export const MEMBER_CATEGORY_ORDER: MemberCategory[] = [
  'postdoc',
  'phd',
  'ms',
  'undergrad',
  'visiting',
  'alumni',
];

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  notice: '공지',
  award: '수상',
  paper: '논문',
  talk: '세미나',
};

export const NEWS_FILTER_ORDER: NewsCategory[] = ['notice', 'award', 'paper', 'talk'];

// 배지: 강조(solid) vs 일반(muted) → 클래스명 산출
export function badgeClass(solid: boolean): string {
  return solid ? 'badge badge--solid' : 'badge badge--muted';
}

// 날짜 표시: Notion ISO(2026-06-12) → 디자인 표기(2026.06.12). 이미 점 표기면 그대로.
export function formatDate(s: string): string {
  return s.replace(/-/g, '.');
}
