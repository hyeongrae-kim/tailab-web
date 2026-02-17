import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type {AppMessages} from "@/i18n/messages";

type HomeIntroProps = {
  messages: AppMessages["home"];
};

export function HomeIntro({ messages }: HomeIntroProps) {
  return (
    <Section title={messages.aboutTitle} description={messages.aboutDescription}>
      <div className="space-y-4 text-slate-700">
        <p>{messages.aboutBody}</p>
        <Button href="/research">{messages.exploreResearch}</Button>
      </div>
    </Section>
  );
}
