import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { CoreResearchThemes } from "@/components/home/CoreResearchThemes";
import { LatestNews } from "@/components/home/LatestNews";
import { validateLocale } from "@/i18n/locale";
import { getMessages } from "@/i18n/getMessages";
import { getLatestMockNews } from "@/mocks/news";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
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
  const latestNews = getLatestMockNews(3);

  return (
    <div className="-mt-8 -mb-8 space-y-0">
      <HomeHero locale={locale} />
      <CoreResearchThemes messages={messages.home} />
      <div className="space-y-6">
        <LatestNews items={latestNews} messages={messages.home} />
      </div>
    </div>
  );
}
