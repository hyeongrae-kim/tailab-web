import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Apply",
  description: "Application guide for prospective students.",
};

export default async function ApplyPage() {
  return (
    <Section title="Apply" description="Prospective students and collaborators are welcome.">
      <div className="space-y-3 text-sm text-slate-700">
        <p>
          Application details can be managed in Notion and rendered here. For now, use this page as a template and
          replace it with your official process.
        </p>
        <ul className="list-disc pl-5">
          <li>Include your CV and transcript.</li>
          <li>Share your research interests and relevant projects.</li>
          <li>Contact the professor by email with your background summary.</li>
        </ul>
      </div>
    </Section>
  );
}
