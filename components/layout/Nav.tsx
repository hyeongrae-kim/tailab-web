'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { label: '홈', href: '/' },
  { label: '연구', href: '/research' },
  { label: '교수', href: '/professor' },
  { label: '구성원', href: '/people' },
  { label: '논문', href: '/publications' },
  { label: '연구소', href: '/institute' },
  { label: '소식', href: '/gallery' },
];

function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      <Link href="/" className="nav__brand">
        TAILAB
      </Link>
      <div className="nav__links">
        {NAV_ITEMS.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`nav__link${isActive(pathname, it.href) ? ' is-active' : ''}`}
          >
            {it.label}
          </Link>
        ))}
        {/* 지원 페이지는 추후 추가 예정 — 이동 없음 */}
        <a href="#" className="nav__cta">
          지원
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
