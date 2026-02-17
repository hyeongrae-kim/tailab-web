import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { getResearchAreas } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Research",
  description: "Research topics and directions.",
};

export const revalidate = 3600;

export default async function ResearchPage() {
  const areas = await getResearchAreas();

  return (
    <Section title="Research" description="Core research topics in the lab.">
      {areas.length === 0 ? (
        <p className="text-sm text-slate-600">No research data found. Connect your Notion Research DB.</p>
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
