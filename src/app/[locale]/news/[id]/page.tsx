import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {toDateLocale} from "@/i18n/config";
import {validateLocale} from "@/i18n/locale";
import {getMessages} from "@/i18n/getMessages";
import { getNewsById, getPageBlocks } from "@/lib/notion";
import { renderNotionBlocks } from "@/lib/notion-blocks";
import { formatDate } from "@/lib/utils";

type NewsDetailPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { locale: localeParam, id } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const item = await getNewsById(id);

  if (!item) {
    return {
      title: messages.news.title,
      description: messages.news.detailFallbackDescription,
    };
  }

  return {
    title: item.title,
    description: item.summary || messages.news.detailFallbackDescription,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale: localeParam, id } = await params;
  const locale = validateLocale(localeParam);
  const messages = await getMessages(locale);
  const item = await getNewsById(id);

  if (!item) {
    notFound();
  }

  const blocks = await getPageBlocks(id);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm text-slate-500">{formatDate(item.publishedAt, toDateLocale(locale), messages.common.tba)}</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">{item.title}</h1>
      {item.summary ? <p className="mt-4 text-slate-700">{item.summary}</p> : null}

      <section className="mt-8">
        {blocks.length > 0 ? (
          <div>{renderNotionBlocks(blocks)}</div>
        ) : (
          <p className="text-sm text-slate-600">{messages.news.noDetailContent}</p>
        )}
      </section>
    </article>
  );
}
