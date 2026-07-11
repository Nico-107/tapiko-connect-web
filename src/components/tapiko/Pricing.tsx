import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { TIERS } from "@/config/pricing";

export function Pricing() {
  const { t } = useTranslation();
  return (
    <section id="pricing" className="border-t border-[color:var(--stone)]/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">{t("pricing.eyebrow")}</p>
              <h2 className="mt-4 text-4xl font-medium leading-tight text-[color:var(--ink)] sm:text-5xl">
                {t("pricing.title")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[color:var(--graphite)]">
              {t("pricing.note")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => {
            const featuresRaw = t(`pricing.tiers.${tier.key}.features`, {
              returnObjects: true,
            });
            const features = Array.isArray(featuresRaw) ? (featuresRaw as string[]) : [];
            const highlighted = tier.highlighted;
            return (
              <Reveal key={tier.key} delay={i * 100}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-8 transition-transform hover:-translate-y-1 ${
                    highlighted
                      ? "border-2 border-[color:var(--terra)] bg-white shadow-[0_30px_60px_-40px_rgba(226,104,60,0.55)]"
                      : "border border-[color:var(--stone)] bg-white/60"
                  }`}
                >
                  {highlighted && (
                    <span className="eyebrow absolute -top-3 left-8 rounded-full bg-[color:var(--terra)] px-3 py-1 text-white">
                      {t("pricing.popular")}
                    </span>
                  )}
                  <p className="eyebrow text-[color:var(--graphite)]">
                    {t(`pricing.tiers.${tier.key}.zones`)}
                  </p>
                  <h3 className="mt-3 text-3xl font-medium text-[color:var(--ink)]">
                    {t(`pricing.tiers.${tier.key}.name`)}
                  </h3>
                  <p className="mt-3 min-h-[3.5rem] text-[15px] leading-relaxed text-[color:var(--graphite)]">
                    {t(`pricing.tiers.${tier.key}.desc`)}
                  </p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="eyebrow text-[color:var(--graphite)]">
                      {t("pricing.from")}
                    </span>
                    <span className="text-5xl font-medium text-[color:var(--ink)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {tier.currency}
                      {tier.priceFrom}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-3 border-t border-[color:var(--stone)] pt-6 text-sm text-[color:var(--ink)]">
                    {features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--terra)]"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                      highlighted
                        ? "bg-[color:var(--terra)] text-white hover:brightness-105"
                        : "border border-[color:var(--ink)] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)]"
                    }`}
                  >
                    {t("pricing.cta")}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}