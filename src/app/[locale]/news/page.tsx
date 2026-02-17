import type { Metadata } from "next";
import { NewsCard } from "@/components/news/NewsCard";
import { Section } from "@/components/ui/Section";
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
    title: messages.news.title,
    description: messages.news.description,
  };
}

export default async function NewsPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const news = await getNews(100);

  return (
    <Section title={messages.news.title} description={messages.news.sectionDescription}>
      {news.length === 0 ? (
        <p className="text-sm text-slate-600">{messages.news.noData}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              locale={locale}
              pinnedLabel={messages.news.pinned}
              tbaLabel={messages.common.tba}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
