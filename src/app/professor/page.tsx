import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { getProfessorProfile } from "@/lib/notion";
import { splitLines } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Professor",
  description: "Professor CV and profile.",
};

export const revalidate = 3600;

export default async function ProfessorPage() {
  const professor = await getProfessorProfile();

  if (!professor) {
    return <Section title="Professor">No profile is available yet.</Section>;
  }

  return (
    <Section title={professor.name} description={professor.role || "Professor"}>
      <div className="space-y-4 text-sm text-slate-700">
        {professor.email ? <p>Email: {professor.email}</p> : null}
        <p>{professor.biography}</p>

        {splitLines(professor.education.join("\n")).length > 0 ? (
          <div>
            <h3 className="font-semibold text-slate-900">Education</h3>
            <ul className="mt-2 list-disc pl-5">
              {splitLines(professor.education.join("\n")).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {splitLines(professor.experience.join("\n")).length > 0 ? (
          <div>
            <h3 className="font-semibold text-slate-900">Experience</h3>
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
