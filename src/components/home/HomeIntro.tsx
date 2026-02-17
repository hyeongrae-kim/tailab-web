import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function HomeIntro() {
  return (
    <Section
      title="About Us"
      description="Tailab focuses on applied AI systems, trustworthy ML, and human-centered computing."
    >
      <div className="space-y-4 text-slate-700">
        <p>
          This website is powered by Notion as CMS. Lab members can maintain profiles, publications, and announcements
          directly in Notion databases.
        </p>
        <Button href="/research">Explore Research</Button>
      </div>
    </Section>
  );
}
