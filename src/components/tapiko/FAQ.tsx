import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";

const ITEMS = ["how", "app", "time", "editable", "durable"] as const;

export function FAQ() {
  const { t } = useTranslation();
  return (
    <section id="faq" className="border-t border-[color:var(--stone)]/70 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">{t("faq.eyebrow")}</p>
          <h2 className="mt-4 text-4xl font-medium leading-tight text-[color:var(--ink)] sm:text-5xl">
            {t("faq.title")}
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-[color:var(--stone)] border-y border-[color:var(--stone)]">
          {ITEMS.map((k, i) => (
            <Reveal key={k} delay={i * 60}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <span className="text-lg font-medium text-[color:var(--ink)]">
                    {t(`faq.items.${k}.q`)}
                  </span>
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--ink)]/30 text-[color:var(--ink)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[color:var(--graphite)]">
                  {t(`faq.items.${k}.a`)}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}