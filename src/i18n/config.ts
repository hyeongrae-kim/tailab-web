import {routing, type AppLocale} from '@/i18n/routing';

export const locales = routing.locales;
export type Locale = AppLocale;
export const defaultLocale: Locale = routing.defaultLocale;

export function toDateLocale(locale: Locale): string {
  return locale === 'ko' ? 'ko-KR' : 'en-GB';
}
