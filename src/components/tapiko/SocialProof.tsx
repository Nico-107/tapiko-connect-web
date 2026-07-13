import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";

const SLOT_COUNT = 5;

export function SocialProof() {
  const { t } = useTranslation();
  return (
    <section className="bg-[color:var(--ink)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-center text-[color:var(--paper)]/60">
            {t("proof.eyebrow")}
          </p>
          <h2
            className="mt-4 text-center text-2xl font-medium text-[color:var(--paper)] sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("proof.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-[color:var(--paper)]/60">
            {t("proof.body")}
          </p>
          <div className="mt-10 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: SLOT_COUNT }).map((_, i) => (
              <div
                key={i}
                className="flex h-14 items-center justify-center rounded-xl border border-dashed border-white/20 px-4"
              >
                <span className="text-center text-xs text-white/30">
                  {t("proof.slot_label")}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
