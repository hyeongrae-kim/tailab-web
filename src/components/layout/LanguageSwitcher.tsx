'use client';

import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/routing';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale() as AppLocale;
  const targetLocale = currentLocale === 'ko' ? 'en' : 'ko';
  const label = currentLocale === 'ko' ? 'ENG' : '한국어';

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className="rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    >
      {label}
    </Link>
  );
}
