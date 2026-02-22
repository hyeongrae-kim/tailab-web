import { NAV_ITEMS, SITE_NAME } from "@/constants";
import { Link } from "@/i18n/navigation";
import type { AppMessages } from "@/i18n/messages";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

type HeaderProps = {
  messages: AppMessages;
};

export function Header({ messages }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            {SITE_NAME}
          </Link>
        </div>

        <nav className="flex flex-wrap gap-2 text-sm md:gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {messages.nav[item.key]}
            </Link>
          ))}
          <span className="px-2 py-1 text-slate-300">|</span>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
