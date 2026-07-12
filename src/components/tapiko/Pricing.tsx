import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { STANDARD, CUSTOM, SUBSCRIPTION } from "@/config/pricing";
import { RefreshCw } from "lucide-react";

export function Pricing() {
  const { t } = useTranslation();

  const standardFeatures = t("pricing.standard.features", { returnObjects: true }) as string[];
  const customFeatures = t("pricing.custom.features", { returnObjects: true }) as string[];

  return (
    <section id="pricing" className="bg-[color:var(--ink)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-[color:var(--paper)]/60">{t("pricing.eyebrow")}</p>
              <h2 className="mt-4 text-4xl font-medium leading-tight text-[color:var(--paper)] sm:text-5xl">
                {t("pricing.title")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[color:var(--paper)]/60">
              {t("pricing.note")}
            </p>
          </div>
        </Reveal>

        {/* Two-offer comparison */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Standard card */}
          <Reveal delay={0}>
            <div className="relative flex h-full flex-col rounded-3xl border border-[color:var(--stone)]/40 bg-white p-8 transition-transform hover:-translate-y-1">
              {STANDARD.launchNote && (
                <span className="eyebrow absolute -top-3 left-8 rounded-full bg-[color:var(--terra)] px-3 py-1 text-white">
                  {t("pricing.standard.badge")}
                </span>
              )}
              <h3 className="text-2xl font-medium text-[color:var(--ink)]">
                {t("pricing.standard.name")}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--graphite)]">
                {t("pricing.standard.desc")}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className="text-5xl font-medium text-[color:var(--ink)]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {STANDARD.currency}{STANDARD.amount}
                </span>
                <span
                  className="text-sm text-[color:var(--graphite)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("pricing.standard.period")}
                </span>
              </div>
              <ul className="mt-6 space-y-3 border-t border-[color:var(--stone)] pt-6 text-sm text-[color:var(--ink)]">
                {Array.isArray(standardFeatures) && standardFeatures.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--terra)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-5 py-3 text-sm font-medium text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)]"
              >
                {t("pricing.standard.cta")}
              </a>
            </div>
          </Reveal>

          {/* Custom card — terracotta border marks it as a premium alternative */}
          <Reveal delay={100}>
            <div className="relative flex h-full flex-col rounded-3xl border-2 border-[color:var(--terra)] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(226,104,60,0.3)] transition-transform hover:-translate-y-1">
              <h3 className="text-2xl font-medium text-[color:var(--ink)]">
                {t("pricing.custom.name")}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--graphite)]">
                {t("pricing.custom.desc")}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="eyebrow text-[color:var(--graphite)]">
                  {t("pricing.from")}
                </span>
                <span
                  className="text-5xl font-medium text-[color:var(--ink)]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {CUSTOM.currency}{CUSTOM.startingAmount}
                </span>
              </div>
              <ul className="mt-6 space-y-3 border-t border-[color:var(--stone)] pt-6 text-sm text-[color:var(--ink)]">
                {Array.isArray(customFeatures) && customFeatures.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--terra)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[color:var(--terra)] px-5 py-3 text-sm font-medium text-white transition-colors hover:brightness-105"
              >
                {t("pricing.custom.cta")}
              </a>
              <p className="mt-3 text-center text-[11px] text-[color:var(--graphite)]">
                {t("pricing.custom.configurator_nudge")}{" · "}
                <a href="#configurator" className="font-medium text-[color:var(--terra)] hover:underline">
                  {t("common.design_your_own")} →
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Optional subscription add-on */}
        <Reveal delay={120}>
          <div className="mt-10 flex flex-col gap-6 rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--terra)]/15 text-[color:var(--terra)]">
                <RefreshCw size={18} strokeWidth={1.7} />
              </span>
              <div>
                <p className="eyebrow text-[color:var(--paper)]/60">{t("pricing.plus.eyebrow")}</p>
                <h3 className="mt-2 text-2xl font-medium text-[color:var(--paper)]">
                  {t("pricing.plus.name")}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-[color:var(--paper)]/60">
                  {t("pricing.plus.desc")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-2">
              <div className="flex items-baseline gap-1">
                <span className="eyebrow text-[color:var(--paper)]/60">{t("pricing.from")}</span>
                <span className="text-3xl font-medium text-[color:var(--paper)]" style={{ fontFamily: "var(--font-serif)" }}>
                  {SUBSCRIPTION.currency}{SUBSCRIPTION.priceFrom}
                </span>
                <span className="text-sm text-[color:var(--paper)]/60">{SUBSCRIPTION.period}</span>
              </div>
              <span className="text-xs text-[color:var(--paper)]/40">{t("pricing.plus.note")}</span>
            </div>
          </div>
        </Reveal>

        {/* Chain / multi-location CTA */}
        <Reveal delay={160}>
          <a
            href="#contact"
            className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[color:var(--terra)] px-6 py-5 text-white transition-transform hover:-translate-y-0.5 sm:flex-row sm:items-center sm:px-8"
          >
            <span className="max-w-xl text-base sm:text-lg">
              {t("pricing.chain.title")}
            </span>
            <span className="eyebrow rounded-full bg-white px-4 py-2 text-[color:var(--ink)]">
              {t("pricing.chain.cta")}
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
