export const SITE_NAME = "Tailab";
export const ISR_SECONDS = 3600;

export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/professor", label: "Professor" },
  { href: "/members", label: "Members" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/apply", label: "Apply" },
];
