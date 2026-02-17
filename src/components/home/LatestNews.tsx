import { NewsCard } from "@/components/news/NewsCard";
import { Section } from "@/components/ui/Section";
import { type Locale } from "@/i18n/config";
import type {AppMessages} from "@/i18n/messages";
import type { NewsItem } from "@/types";

type LatestNewsProps = {
  items: NewsItem[];
  locale: Locale;
  messages: AppMessages["home"];
  pinnedLabel: string;
  tbaLabel: string;
};

export function LatestNews({ items, locale, messages, pinnedLabel, tbaLabel }: LatestNewsProps) {
  return (
    <Section title={messages.latestNewsTitle} description={messages.latestNewsDescription}>
      {items.length === 0 ? (
        <p className="text-sm text-slate-600">{messages.noNews}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              locale={locale}
              pinnedLabel={pinnedLabel}
              tbaLabel={tbaLabel}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
