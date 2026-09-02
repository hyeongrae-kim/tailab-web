// draft 반영 스키마 조각 + sample-data → Notion 행 변환. setup-notion / migrate-draft 공용.
import type { Member, ResearchArea, Project, SiteCopy } from '../lib/types.ts';
import { P, V } from './shared.ts';

export const MEMBER_SCHEMA = {
  name: P.title(),
  category: P.select(['research-professor', 'phd', 'ms', 'researcher', 'alumni']),
  order: P.number(),
  nameEn: P.text(),
  role: P.text(),
  roleEn: P.text(),
  interests: P.text(),
  homepage: P.url(),
  github: P.url(),
  linkedin: P.url(),
  email: P.text(),
};

export const PROJECT_SCHEMA = {
  role: P.select(['pi', 'co']),
  funder: P.text(),
  field: P.text(),
  description: P.text(),
};

export const SITE_SCHEMA = {
  key: P.title(),
  heading: P.text(),
  body: P.text(),
  en: P.text(),
  link: P.url(),
};

export const memberRow = (m: Member) => ({
  name: V.title(m.name),
  category: V.select(m.category),
  order: V.number(m.order),
  nameEn: V.text(m.nameEn),
  role: V.text(m.role),
  roleEn: V.text(m.roleEn),
  interests: V.text(m.interests),
  homepage: V.url(m.homepage),
  github: V.url(m.github),
  linkedin: V.url(m.linkedin),
  email: V.text(m.email),
});

export const areaRow = (a: ResearchArea) => ({
  title: V.title(a.title),
  subtitle: V.text(a.subtitle),
  description: V.text(a.description),
  tags: V.multi(a.tags),
  order: V.number(Number(a.no)),
});

export const projectRow = (p: Project, i: number) => ({
  title: V.title(p.title),
  role: V.select(p.role),
  funder: V.text(p.funder),
  field: V.text(p.field),
  description: V.text(p.description),
  order: V.number(i + 1),
});

export const siteRow = (c: SiteCopy) => ({
  key: V.title(c.key),
  heading: V.text(c.heading),
  body: V.text(c.body),
  en: V.text(c.en),
  link: V.url(c.link),
});
