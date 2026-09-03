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

  // 메뉴 열림을 히스토리 더미 엔트리로 만들어, 백버튼이 페이지 이동 대신 '메뉴 닫기'로 동작하게 한다.
  useEffect(() => {
    if (!open) return;
    history.pushState({ navMenu: true }, '');
    const onPop = () => setOpen(false);
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      // 백버튼이 아닌 방법(X·스크림 터치)으로 닫혔으면 더미 엔트리를 걷어낸다.
      // 링크로 이동한 경우엔 이미 새 엔트리가 쌓여 있으므로 건드리지 않는다.
      if (history.state?.navMenu) history.back();
    };
  }, [open]);

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
      {/* 메뉴 열림 시 바깥 영역 터치로 닫는 투명 스크림 */}
      {open ? <div className="nav__scrim" onClick={() => setOpen(false)} /> : null}
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
