import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Section } from "@/components/ui/Section";
import {validateLocale} from "@/i18n/locale";
import {getMessages} from "@/i18n/getMessages";
import { getGalleryItems } from "@/lib/notion";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return {
    title: messages.gallery.title,
    description: messages.gallery.description,
  };
}

export default async function GalleryPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const items = await getGalleryItems();

  return (
    <Section title={messages.gallery.title} description={messages.gallery.sectionDescription}>
      <GalleryGrid
        items={items}
        locale={locale}
        noDataLabel={messages.gallery.noData}
        tbaLabel={messages.common.tba}
      />
    </Section>
  );
}
