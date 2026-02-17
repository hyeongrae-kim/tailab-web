import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import {validateLocale} from "@/i18n/locale";
import {getMessages} from "@/i18n/getMessages";
import { getProfessorProfile } from "@/lib/notion";
import { splitLines } from "@/lib/utils";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return {
    title: messages.professor.title,
    description: messages.professor.description,
  };
}

export default async function ProfessorPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const professor = await getProfessorProfile();

  if (!professor) {
    return <Section title={messages.professor.title}>{messages.professor.noProfile}</Section>;
  }

  return (
    <Section title={professor.name} description={professor.role || messages.professor.roleFallback}>
      <div className="space-y-4 text-sm text-slate-700">
        {professor.email ? (
          <p>
            {messages.professor.emailLabel}: {professor.email}
          </p>
        ) : null}
        <p>{professor.biography}</p>

        {splitLines(professor.education.join("\n")).length > 0 ? (
          <div>
            <h3 className="font-semibold text-slate-900">{messages.professor.education}</h3>
            <ul className="mt-2 list-disc pl-5">
              {splitLines(professor.education.join("\n")).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {splitLines(professor.experience.join("\n")).length > 0 ? (
          <div>
            <h3 className="font-semibold text-slate-900">{messages.professor.experience}</h3>
            <ul className="mt-2 list-disc pl-5">
              {splitLines(professor.experience.join("\n")).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
