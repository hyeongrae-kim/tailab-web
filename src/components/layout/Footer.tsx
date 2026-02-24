import type { AppMessages } from "@/i18n/messages";

type FooterProps = {
  messages: AppMessages;
};

export function Footer({ messages }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-slate-500">
        <div className="flex flex-col items-start">
          <p>{messages.footer.address}</p>
          <p className="mt-6">{messages.footer.poweredBy}</p>
          <p className="mt-1">{messages.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
