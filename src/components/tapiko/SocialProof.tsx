import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";

const LOGO_SLOTS = ["l1", "l2", "l3", "l4", "l5"] as const;
const TESTIMONIALS = ["t1", "t2", "t3"] as const;

export function SocialProof() {
  const { t } = useTranslation();
  return (
    <section className="bg-[color:var(--ink)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-center text-[color:var(--paper)]/60">
            {t("proof.title")}
          </p>
          <div className="mt-8 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
            {LOGO_SLOTS.map((k) => (
              <div
                key={k}
                className="flex h-14 items-center justify-center rounded-xl border border-dashed border-white/20 px-4"
              >
                <span
                  className="text-lg tracking-tight text-white/40"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t(`proof.logos.${k}`)}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((k, i) => (
            <Reveal key={k} delay={i * 90}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6">
                <blockquote
                  className="text-lg leading-relaxed text-[color:var(--paper)]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  "{t(`proof.testimonials.${k}.quote`)}"
                </blockquote>
                <figcaption className="mt-6 border-t border-white/15 pt-4 text-sm">
                  <span className="block font-medium text-[color:var(--paper)]">
                    {t(`proof.testimonials.${k}.name`)}
                  </span>
                  <span className="block text-[color:var(--paper)]/50">
                    {t(`proof.testimonials.${k}.role`)}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
