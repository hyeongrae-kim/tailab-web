'use client';

import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {locales, type Locale} from '@/i18n/config';
import {cx} from '@/lib/utils';

type LanguageSwitcherProps = {
  label: string;
  names: Record<Locale, string>;
};

export function LanguageSwitcher({label, names}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  return (
    <div className="flex items-center gap-2 text-xs md:text-sm">
      <span className="text-slate-500">{label}</span>
      <div className="flex items-center rounded-lg border border-slate-200 p-1">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            className={cx(
              'rounded-md px-2 py-1 font-medium',
              currentLocale === locale
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
          >
            {names[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
