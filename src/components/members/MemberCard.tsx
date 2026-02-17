import type { Member } from "@/types";

type MemberCardProps = {
  member: Member;
  roleFallback: string;
};

export function MemberCard({ member, roleFallback }: MemberCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{member.role || roleFallback}</p>
      {member.email ? <p className="mt-2 text-sm text-slate-500">{member.email}</p> : null}
      {member.researchInterests.length > 0 ? (
        <p className="mt-3 text-sm text-slate-700">{member.researchInterests.join(", ")}</p>
      ) : null}
    </article>
  );
}
