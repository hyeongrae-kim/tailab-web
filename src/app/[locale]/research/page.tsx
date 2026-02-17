import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import {validateLocale} from "@/i18n/locale";
import {getMessages} from "@/i18n/getMessages";
import { getResearchAreas } from "@/lib/notion";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return {
    title: messages.research.title,
    description: messages.research.description,
  };
}

export default async function ResearchPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const areas = await getResearchAreas();

  return (
    <Section title={messages.research.title} description={messages.research.sectionDescription}>
      {areas.length === 0 ? (
        <p className="text-sm text-slate-600">{messages.research.noData}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {areas.map((area) => (
            <article key={area.id} className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-lg font-semibold text-slate-900">{area.title}</h3>
              {area.description ? <p className="mt-2 text-sm text-slate-700">{area.description}</p> : null}
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
