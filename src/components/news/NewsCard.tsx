import {Link} from "@/i18n/navigation";
import { Tag } from "@/components/ui/Tag";
import { toDateLocale, type Locale } from "@/i18n/config";
import { formatDate } from "@/lib/utils";
import type { NewsItem } from "@/types";

type NewsCardProps = {
  item: NewsItem;
  locale: Locale;
  pinnedLabel: string;
  tbaLabel: string;
};

export function NewsCard({ item, locale, pinnedLabel, tbaLabel }: NewsCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        {item.category ? <Tag label={item.category} /> : null}
        {item.isPinned ? <Tag label={pinnedLabel} /> : null}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">
        <Link href={`/news/${item.id}`} className="hover:underline">
          {item.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-slate-500">{formatDate(item.publishedAt, toDateLocale(locale), tbaLabel)}</p>
      {item.summary ? <p className="mt-3 text-sm text-slate-700">{item.summary}</p> : null}
    </article>
  );
}
