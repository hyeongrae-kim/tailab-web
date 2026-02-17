import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  // Show no locale prefix for the default locale (`ko`).
  localePrefix: 'as-needed',
  // Keep Korean as the default regardless of browser Accept-Language.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
