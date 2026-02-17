import type { Metadata } from "next";
import { MemberCard } from "@/components/members/MemberCard";
import { Section } from "@/components/ui/Section";
import { getMembers } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Members",
  description: "Current lab members and alumni.",
};

export const revalidate = 3600;

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <Section title="Members" description="PhD, MS, BS, and alumni profiles.">
      {members.length === 0 ? (
        <p className="text-sm text-slate-600">No member data found. Connect your Notion Members DB.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </Section>
  );
}
