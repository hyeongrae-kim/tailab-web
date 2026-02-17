import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import {validateLocale} from "@/i18n/locale";
import {getMessages} from "@/i18n/getMessages";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return {
    title: messages.apply.title,
    description: messages.apply.description,
  };
}

export default async function ApplyPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return (
    <Section title={messages.apply.title} description={messages.apply.sectionDescription}>
      <div className="space-y-3 text-sm text-slate-700">
        <p>{messages.apply.intro}</p>
        <ul className="list-disc pl-5">
          {messages.apply.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
