import { SITE_NAME } from "@/constants";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-sm text-slate-500">
        <p>{SITE_NAME} Research Lab</p>
        <p>Built with Next.js + Notion CMS</p>
      </div>
    </footer>
  );
}
