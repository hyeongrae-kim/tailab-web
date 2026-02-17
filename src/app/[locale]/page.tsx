import type { Metadata } from "next";
import { HomeIntro } from "@/components/home/HomeIntro";
import { LatestNews } from "@/components/home/LatestNews";
import {validateLocale} from "@/i18n/locale";
import {getMessages} from "@/i18n/getMessages";
import { getNews } from "@/lib/notion";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return {
    title: messages.home.title,
    description: messages.home.description,
  };
}

export default async function HomePage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const latestNews = await getNews(5);

  return (
    <div className="space-y-6">
      <LatestNews
        items={latestNews}
        locale={locale}
        messages={messages.home}
        pinnedLabel={messages.news.pinned}
        tbaLabel={messages.common.tba}
      />
      <HomeIntro messages={messages.home} />
    </div>
  );
}
