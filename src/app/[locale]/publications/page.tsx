import type { Metadata } from "next";
import { PublicationItem } from "@/components/publications/PublicationItem";
import { Section } from "@/components/ui/Section";
import {validateLocale} from "@/i18n/locale";
import {getMessages} from "@/i18n/getMessages";
import { getPublications } from "@/lib/notion";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return {
    title: messages.publications.title,
    description: messages.publications.description,
  };
}

export default async function PublicationsPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const publications = await getPublications();

  return (
    <Section title={messages.publications.title} description={messages.publications.sectionDescription}>
      {publications.length === 0 ? (
        <p className="text-sm text-slate-600">{messages.publications.noData}</p>
      ) : (
        <div className="space-y-4">
          {publications.map((item) => (
            <PublicationItem key={item.id} item={item} doiLabel={messages.publications.doiLabel} />
          ))}
        </div>
      )}
    </Section>
  );
}
