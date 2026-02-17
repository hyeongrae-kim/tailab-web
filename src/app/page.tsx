import { HomeIntro } from "@/components/home/HomeIntro";
import { LatestNews } from "@/components/home/LatestNews";
import { getNews } from "@/lib/notion";

export const revalidate = 3600;

export default async function HomePage() {
  const latestNews = await getNews(5);

  return (
    <div className="space-y-6">
      <LatestNews items={latestNews} />
      <HomeIntro />
    </div>
  );
}
