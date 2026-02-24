import type { AppMessages } from "@/i18n/messages";

type CoreResearchThemesProps = {
  messages: AppMessages["home"];
};

type IconProps = {
  className?: string;
};

const THEME_ICONS = [ShieldIcon, NetworkIcon, LanguageIcon] as const;

export function CoreResearchThemes({ messages }: CoreResearchThemesProps) {
  return (
    <section className="w-full bg-white xl:relative xl:left-1/2 xl:w-screen xl:-translate-x-1/2">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:py-12">
        <header className="mb-6 md:mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {messages.coreResearchTitle}
          </h2>
        </header>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {messages.coreResearchThemes.map((theme, index) => {
            const Icon = THEME_ICONS[index] ?? LanguageIcon;

            return (
              <article
                key={theme.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                  <Icon className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{theme.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{theme.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <path d="M12 3l7 3v5c0 5.1-3 8.8-7 10-4-1.2-7-4.9-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function NetworkIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="12" cy="17" r="2.5" />
      <path d="M8.3 8.6L10.8 14M15.7 8.6L13.2 14M8.5 7h7" />
    </svg>
  );
}

function LanguageIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <path d="M4 6h10M9 6c0 6.2-3.2 9.6-5 11M9 6c.6 3.8 2.8 7.3 5.7 10.2" />
      <path d="M14 12h6M15.5 10l3 8M20.5 10l-3 8" />
    </svg>
  );
}
