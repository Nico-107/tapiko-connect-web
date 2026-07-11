import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { Sparkles, Package, TrendingUp } from "lucide-react";

const ITEMS = [
  { key: "custom", Icon: Sparkles },
  { key: "physical", Icon: Package },
  { key: "results", Icon: TrendingUp },
] as const;

export function ValueProps() {
  const { t } = useTranslation();
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">{t("why.eyebrow")}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight text-[color:var(--ink)] sm:text-5xl">
            {t("why.title")}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {ITEMS.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-[color:var(--stone)] bg-white/60 p-8">
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--terra)]/15 text-[color:var(--terra)]"
                >
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-2xl font-medium text-[color:var(--ink)]">
                  {t(`why.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--graphite)]">
                  {t(`why.items.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}