import { cx } from "@/lib/utils";

type SectionProps = {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ title, description, className, children }: SectionProps) {
  return (
    <section className={cx("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8", className)}>
      <header className="mb-5">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      </header>
      {children}
    </section>
  );
}
