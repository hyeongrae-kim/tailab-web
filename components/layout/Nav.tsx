'use client';

import { useEffect, useState } from 'react';
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
  const [open, setOpen] = useState(false);

  // 라우트 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="nav">
      <Link href="/" className="nav__brand">
        TAILAB
      </Link>
      <button
        type="button"
        className="nav__menu-btn"
        aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>
      <div className={`nav__links${open ? ' is-open' : ''}`}>
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
