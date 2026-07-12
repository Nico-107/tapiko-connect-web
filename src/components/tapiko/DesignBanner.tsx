import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";

export function DesignBanner() {
  const { t } = useTranslation();
  return (
    <section className="bg-[color:var(--ink)] py-20">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow text-[color:var(--paper)]/60">{t("banner.eyebrow")}</p>
          <h2 className="mt-4 text-3xl font-medium text-[color:var(--paper)] sm:text-4xl">
            {t("banner.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--paper)]/60">
            {t("banner.body")}
          </p>
          <a
            href="#configurator"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--terra)] px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t("common.design_your_own")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
