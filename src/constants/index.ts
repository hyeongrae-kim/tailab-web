export const SITE_NAME = "Tailab";
export const ISR_SECONDS = 3600;

export type NavItemKey =
  | "home"
  | "professor"
  | "members"
  | "research"
  | "publications"
  | "news"
  | "gallery"
  | "apply";

export type NavItem = {
  href: string;
  key: NavItemKey;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", key: "home" },
  { href: "/professor", key: "professor" },
  { href: "/members", key: "members" },
  { href: "/research", key: "research" },
  { href: "/publications", key: "publications" },
  { href: "/news", key: "news" },
  { href: "/gallery", key: "gallery" },
  { href: "/apply", key: "apply" },
];
