import type { Metadata } from "next";
import { MemberCard } from "@/components/members/MemberCard";
import { Section } from "@/components/ui/Section";
import {validateLocale} from "@/i18n/locale";
import {getMessages} from "@/i18n/getMessages";
import { getMembers } from "@/lib/notion";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);

  return {
    title: messages.members.title,
    description: messages.members.description,
  };
}

export default async function MembersPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const members = await getMembers();

  return (
    <Section title={messages.members.title} description={messages.members.sectionDescription}>
      {members.length === 0 ? (
        <p className="text-sm text-slate-600">{messages.members.noData}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} roleFallback={messages.members.roleFallback} />
          ))}
        </div>
      )}
    </Section>
  );
}
