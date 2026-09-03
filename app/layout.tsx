import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'TAILAB',
    template: '%s · TAILAB',
  },
  description: '신뢰할 수 있고 인간과 협력하는 인공지능을 연구합니다.',
  // 링크 공유 미리보기(og:title)는 모든 페이지에서 'TAILAB'으로 고정
  openGraph: { title: 'TAILAB' },
};

// 페인트 전에 테마를 적용해 FOUC를 방지하는 부트스트랩 스크립트.
const themeScript = `(function(){function set(t){document.documentElement.setAttribute('data-theme',t);}window.__toggleTheme=function(){var c=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';set(c);try{localStorage.setItem('tailab-theme',c);}catch(e){}};try{var s=localStorage.getItem('tailab-theme');if(s)set(s);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
