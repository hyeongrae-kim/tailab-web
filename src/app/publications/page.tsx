import type { Metadata } from "next";
import { PublicationItem } from "@/components/publications/PublicationItem";
import { Section } from "@/components/ui/Section";
import { getPublications } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Publications",
  description: "Journal and conference publications.",
};

export const revalidate = 3600;

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <Section title="Publications" description="Journal, conference, and workshop papers.">
      {publications.length === 0 ? (
        <p className="text-sm text-slate-600">No publication data found. Connect your Notion Publications DB.</p>
      ) : (
        <div className="space-y-4">
          {publications.map((item) => (
            <PublicationItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
}
