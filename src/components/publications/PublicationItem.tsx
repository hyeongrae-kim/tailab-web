import type { Publication } from "@/types";

export function PublicationItem({ item }: { item: Publication }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{item.authors}</p>
      <p className="mt-1 text-sm text-slate-500">
        {[item.venue, item.year].filter(Boolean).join(" · ")}
      </p>
      {item.abstract ? <p className="mt-3 text-sm text-slate-700">{item.abstract}</p> : null}
      {item.doi ? (
        <a
          href={`https://doi.org/${item.doi}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline"
        >
          DOI: {item.doi}
        </a>
      ) : null}
    </article>
  );
}
