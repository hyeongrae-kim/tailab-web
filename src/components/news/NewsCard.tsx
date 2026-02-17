import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import type { NewsItem } from "@/types";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        {item.category ? <Tag label={item.category} /> : null}
        {item.isPinned ? <Tag label="Pinned" /> : null}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">
        <Link href={`/news/${item.id}`} className="hover:underline">
          {item.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-slate-500">{formatDate(item.publishedAt)}</p>
      {item.summary ? <p className="mt-3 text-sm text-slate-700">{item.summary}</p> : null}
    </article>
  );
}
