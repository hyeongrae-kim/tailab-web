import { NewsCard } from "@/components/news/NewsCard";
import { Section } from "@/components/ui/Section";
import type { NewsItem } from "@/types";

export function LatestNews({ items }: { items: NewsItem[] }) {
  return (
    <Section title="Latest News" description="Recent updates from the lab.">
      {items.length === 0 ? (
        <p className="text-sm text-slate-600">No news has been published yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
}
