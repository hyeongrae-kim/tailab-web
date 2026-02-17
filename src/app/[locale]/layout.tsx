import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {Footer} from '@/components/layout/Footer';
import {Header} from '@/components/layout/Header';
import {SITE_NAME} from '@/constants';
import {getMessages} from '@/i18n/getMessages';
import {validateLocale} from '@/i18n/locale';
import {routing} from '@/i18n/routing';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: LocaleLayoutProps): Promise<Metadata> {
  const {locale: localeParam} = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return {
    title: {
      default: messages.metadata.siteTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: messages.metadata.siteDescription,
    alternates: {
      languages: {
        ko: '/',
        en: '/en',
      },
    },
  };
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale: localeParam} = await params;
  const locale = validateLocale(localeParam);

  // Required by next-intl for static rendering in App Router.
  setRequestLocale(locale);

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <Header messages={messages} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <Footer messages={messages} />
    </NextIntlClientProvider>
  );
}
