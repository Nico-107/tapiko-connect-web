import { useTranslation } from "react-i18next";
import { Hero3D } from "./Hero3D";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 lg:min-h-[92vh] lg:pb-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-10">
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
        </div>

        {/* HERO 3D SLOT — interactive model to be integrated here. */}
        <Hero3D />
      </div>
    </section>
  );
}