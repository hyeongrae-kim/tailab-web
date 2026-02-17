import Image from "next/image";
import type { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

function textFromRichText(items: RichTextItemResponse[]): string {
  return items.map((item) => item.plain_text).join("");
}

function RichText({ items }: { items: RichTextItemResponse[] }) {
  return <>{textFromRichText(items)}</>;
}

export function renderNotionBlocks(blocks: BlockObjectResponse[]): React.ReactNode {
  return blocks.map((block) => {
    switch (block.type) {
      case "heading_1":
        return (
          <h1 key={block.id} className="mt-8 text-3xl font-semibold text-slate-900">
            <RichText items={block.heading_1.rich_text} />
          </h1>
        );
      case "heading_2":
        return (
          <h2 key={block.id} className="mt-6 text-2xl font-semibold text-slate-900">
            <RichText items={block.heading_2.rich_text} />
          </h2>
        );
      case "heading_3":
        return (
          <h3 key={block.id} className="mt-5 text-xl font-semibold text-slate-900">
            <RichText items={block.heading_3.rich_text} />
          </h3>
        );
      case "paragraph":
        return (
          <p key={block.id} className="mt-4 leading-7 text-slate-700">
            <RichText items={block.paragraph.rich_text} />
          </p>
        );
      case "bulleted_list_item":
        return (
          <ul key={block.id} className="mt-3 list-disc pl-6 text-slate-700">
            <li>
              <RichText items={block.bulleted_list_item.rich_text} />
            </li>
          </ul>
        );
      case "numbered_list_item":
        return (
          <ol key={block.id} className="mt-3 list-decimal pl-6 text-slate-700">
            <li>
              <RichText items={block.numbered_list_item.rich_text} />
            </li>
          </ol>
        );
      case "quote":
        return (
          <blockquote key={block.id} className="mt-4 border-l-4 border-slate-300 pl-4 italic text-slate-600">
            <RichText items={block.quote.rich_text} />
          </blockquote>
        );
      case "code":
        return (
          <pre key={block.id} className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
            <code>{textFromRichText(block.code.rich_text)}</code>
          </pre>
        );
      case "divider":
        return <hr key={block.id} className="my-8 border-slate-200" />;
      case "image": {
        const src = block.image.type === "external" ? block.image.external.url : block.image.file.url;
        const caption = textFromRichText(block.image.caption);

        return (
          <figure key={block.id} className="mt-6">
            <Image
              src={src}
              alt={caption || "Notion image"}
              width={1200}
              height={700}
              className="h-auto w-full rounded-xl border border-slate-200 object-cover"
            />
            {caption ? <figcaption className="mt-2 text-sm text-slate-500">{caption}</figcaption> : null}
          </figure>
        );
      }
      default:
        return null;
    }
  });
}
