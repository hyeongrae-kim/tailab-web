import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { GalleryItem } from "@/types";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-600">No gallery items available.</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const cover = item.imageUrls[0] ?? null;

        return (
          <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {cover ? (
              <Image src={cover} alt={item.title} width={800} height={500} className="h-44 w-full object-cover" />
            ) : (
              <div className="h-44 w-full bg-slate-100" />
            )}
            <div className="p-4">
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{formatDate(item.date)}</p>
              {item.description ? <p className="mt-2 text-sm text-slate-700">{item.description}</p> : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
