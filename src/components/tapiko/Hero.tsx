import { useTranslation } from "react-i18next";
import { Hero3D } from "./Hero3D";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="top"
      className="relative overflow-x-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 lg:min-h-[92vh] lg:pb-32"
    >
      {/* Brand wave — section 07 radiating arcs, aria-hidden, purely decorative */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 -z-10 w-[min(55vw,480px)] text-[color:var(--terra)]"
        viewBox="0 0 600 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMax meet"
      >
        <path d="M0 220 A90 90 0 0 0 90 130"   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.13" />
        <path d="M0 220 A150 150 0 0 0 150 70"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.08" />
        <path d="M0 220 A210 210 0 0 0 210 10"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.055" />
        <path d="M0 220 A270 270 0 0 0 270 -50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.035" />
        <circle cx="0" cy="220" r="5" fill="currentColor" opacity="0.18" />
      </svg>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:px-10">
        {/* Text column */}
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">{t("hero.eyebrow")}</p>
          <h1 className="text-[clamp(2.6rem,6vw,5.25rem)] font-medium leading-[1.02] text-[color:var(--ink)]">
            {t("hero.title_pre")}{" "}
            <em
              className="text-[color:var(--signal)]"
              style={{ fontStyle: "italic" }}
            >
              {t("hero.title_accent")}
            </em>{" "}
            {t("hero.title_post")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--graphite)]">
            {t("hero.subhead")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--terra)] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--signal)]"
            >
              {t("hero.cta_primary")}
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)]/20 px-6 py-3.5 text-sm font-medium text-[color:var(--ink)] transition-colors hover:border-[color:var(--ink)]"
            >
              {t("hero.cta_secondary")}
            </a>
          </div>

          {/* Secondary decision row */}
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="#pricing"
              className="inline-flex items-center rounded-full border border-[color:var(--ink)]/15 px-4 py-2 text-xs font-medium text-[color:var(--ink)] transition-colors hover:border-[color:var(--terra)]/60 hover:bg-[color:var(--terra)]/5"
            >
              {t("hero.cta_standard")}
            </a>
            <a
              href="#configurator"
              className="inline-flex items-center rounded-full border border-[color:var(--ink)]/15 px-4 py-2 text-xs font-medium text-[color:var(--ink)] transition-colors hover:border-[color:var(--ink)]/40"
            >
              {t("hero.cta_configurator")}
            </a>
          </div>
          <p className="mt-2 text-[11px] text-[color:var(--graphite)]/50">
            {t("hero.sub_note")}
          </p>

          {/* Reassurance line */}
          <p
            className="mt-4 text-[11px] tracking-wide text-[color:var(--graphite)]/55"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Designed & 3D-printed in Barcelona · Custom to your brand
          </p>
        </div>

        {/* Product image — dominant column, bleeds slightly past container on desktop */}
        <div className="lg:-mr-[4vw]">
          <Hero3D />
        </div>
      </div>

      {/* Scroll cue — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-35 lg:flex"
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--graphite)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Scroll
        </span>
        <div className="h-8 w-px bg-[color:var(--graphite)]" />
      </div>
    </section>
  );
}
