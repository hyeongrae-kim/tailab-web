import { SITE_NAME } from "@/constants";
import type { AppMessages } from "@/i18n/messages";

type FooterProps = {
  messages: AppMessages;
};

export function Footer({ messages }: FooterProps) {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center">
        <p>
          {SITE_NAME} {messages.layout.researchLab}
        </p>
        <p>{messages.layout.builtWith}</p>
      </div>
    </footer>
  );
}
