import {getMessages as getIntlMessages} from 'next-intl/server';
import type {AppLocale} from '@/i18n/routing';

export async function getMessages(locale?: AppLocale) {
  return getIntlMessages(locale ? {locale} : undefined);
}
