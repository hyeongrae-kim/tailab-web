import { Link } from "@/i18n/navigation";
import type {AppMessages} from "@/i18n/messages";
import type { NewsItem } from "@/types";

type LatestNewsProps = {
  items: NewsItem[];
  messages: AppMessages["home"];
};

export function LatestNews({ items, messages }: LatestNewsProps) {
  return (
    <section className="w-full bg-[#EEF2F7] xl:relative xl:left-1/2 xl:w-screen xl:-translate-x-1/2">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:py-12">
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-5">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {messages.latestNewsTitle}
          </h2>
          <Link href="/news" className="text-sm font-medium text-slate-700 hover:text-slate-900 hover:underline">
            {messages.latestNewsViewAll}
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white">
          {items.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-600">{messages.noNews}</p>
          ) : (
            <div className="divide-y divide-slate-200">
              {items.map((item) => {
                const { yearMonth, day } = getDateParts(item.publishedAt);

                return (
                  <article key={item.id} className="grid grid-cols-[72px_1fr] gap-4 px-4 py-4 md:grid-cols-[88px_1fr]">
                    <div className="flex flex-col items-center justify-center">
                      <span className="w-12 text-center text-[11px] font-medium tracking-[0.02em] tabular-nums text-slate-400">
                        {yearMonth}
                      </span>
                      <span className="mt-1 w-12 text-center text-xl leading-none font-semibold tabular-nums text-slate-900 md:text-2xl">
                        {day}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="inline-flex w-fit items-center rounded-sm bg-slate-100 px-2 py-0.5 text-[11px] font-medium tracking-[0.08em] text-slate-600 uppercase">
                        {item.category || "News"}
                      </p>
                      <h3 className="mt-1 truncate text-base font-semibold text-slate-900 md:text-lg">{item.title}</h3>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function getDateParts(dateString: string | null): { yearMonth: string; day: string } {
  if (!dateString) {
    return { yearMonth: "00-00", day: "00" };
  }

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(dateString) ? `${dateString}T00:00:00` : dateString;
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return { yearMonth: "00-00", day: "00" };
  }

  const year = String(date.getFullYear() % 100).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return { yearMonth: `${year}-${month}`, day };
}
