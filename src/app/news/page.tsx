import type { Metadata } from "next";
import { NewsCard } from "@/components/news/NewsCard";
import { Section } from "@/components/ui/Section";
import { getNews } from "@/lib/notion";

export const metadata: Metadata = {
  title: "News",
  description: "Lab news and announcements.",
};

export const revalidate = 3600;

export default async function NewsPage() {
  const news = await getNews(100);

  return (
    <Section title="News" description="All announcements from the lab.">
      {news.length === 0 ? (
        <p className="text-sm text-slate-600">No news data found. Connect your Notion News DB.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Section>
  );
}
