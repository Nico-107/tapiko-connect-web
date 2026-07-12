import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import stepBrief from "@/assets/step-brief.jpg";
import stepDesign from "@/assets/step-design.jpg";
import stepPrint from "@/assets/step-print.jpg";
import stepEmbed from "@/assets/step-embed.jpg";

const STEPS = [
  { key: "brief", img: stepBrief },
  { key: "design", img: stepDesign },
  { key: "print", img: stepPrint },
  { key: "embed", img: stepEmbed },
] as const;

export function HowItWorks() {
  const { t } = useTranslation();
  return (
    <section id="how" className="border-t border-[color:var(--stone)]/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-tight text-[color:var(--ink)] sm:text-5xl">
            {t("how.title")}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map(({ key, img }, i) => (
            <Reveal key={key} delay={i * 90}>
              <div className="flex flex-col border-t border-[color:var(--ink)]/15 pt-6">
                <div className="mb-6 overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 3" }}>
                  <img
                    src={img}
                    alt={t(`how.steps.${key}.title`)}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="eyebrow text-[color:var(--terra)]">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-medium text-[color:var(--ink)]">
                  {t(`how.steps.${key}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--graphite)]">
                  {t(`how.steps.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}