import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";

type HomeHeroProps = {
  locale: Locale;
};

const HERO_COPY: Record<
  Locale,
  {
    title: [string, string];
    subtitle: [string, string];
  }
> = {
  en: {
    title: ["Rewriting English", "Literature with AI"],
    subtitle: [
      "Exploring new possibilities of language, literature, and",
      "intelligence through LLMs and NLP.",
    ],
  },
  ko: {
    title: ["AI로 다시쓰는", "영어영문학"],
    subtitle: [
      "LLM과 NLP를 통해",
      "언어·문학·지능의 새로운 가능성을 탐구합니다.",
    ],
  },
};

export function HomeHero({ locale }: HomeHeroProps) {
  const copy = HERO_COPY[locale];

  return (
    <section className="w-full bg-[#EEF2F7] xl:relative xl:left-1/2 xl:w-screen xl:-translate-x-1/2">
      <div className="relative aspect-[1280/587] bg-[#EEF2F7] xl:mx-auto xl:max-w-7xl">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] [background-size:40px_40px] [box-shadow:inset_0_0_0_1px_#EEF2F7]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 -translate-x-full xl:block [background-image:linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_right,transparent,black)] [-webkit-mask-image:linear-gradient(to_right,transparent,black)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 translate-x-full xl:block [background-image:linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_right,black,transparent)] [-webkit-mask-image:linear-gradient(to_right,black,transparent)]"
        />

        <div className="relative z-10 flex h-full items-center px-6 py-8 md:px-10 md:py-10">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-5 md:gap-8 md:items-stretch">
            <div className="md:col-span-3 flex items-center justify-start">
              <div className="max-w-3xl">
                <h1 className="text-[clamp(1.9rem,4.1vw,4rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-slate-900">
                  <span className="block">{copy.title[0]}</span>
                  <span className="block">{copy.title[1]}</span>
                </h1>

                <div className="mt-6 inline-flex items-stretch gap-4">
                  <span className="w-px bg-slate-400/80" aria-hidden />
                  <p className="max-w-2xl text-[clamp(0.86rem,1.35vw,1.1rem)] leading-relaxed text-slate-700">
                    <span className="block">{copy.subtitle[0]}</span>
                    <span className="block">{copy.subtitle[1]}</span>
                  </p>
                </div>

                <div className="mt-30 flex flex-wrap items-center gap-3">
                  <Link
                    href="/research"
                    className="inline-flex h-11 items-center rounded-[4px] bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Research
                  </Link>
                  <Link
                    href="/publications"
                    className="inline-flex h-11 items-center rounded-[4px] border border-slate-300 bg-slate-100 px-5 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                  >
                    Publication
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex items-center justify-start">
              <div className="h-full w-full rounded-xl bg-[#D1D5DB]/80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
