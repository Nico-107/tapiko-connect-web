import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { ProductImage } from "./ProductImage";
import deriva from "@/assets/case-bar-deriva.jpg";

export function CaseStudy() {
  const { t } = useTranslation();
  return (
    <section className="bg-[color:var(--ink)] py-24 text-[color:var(--paper)] sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:px-10">
        <Reveal>
          <ProductImage
            src={deriva}
            alt="Bar Deriva custom terracotta NFC plaque on a bar counter"
            ratio="4 / 5"
            className="shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow text-[color:var(--terra)]">{t("case.eyebrow")}</p>
          <h2 className="mt-4 text-4xl font-medium leading-tight text-[color:var(--paper)] sm:text-5xl">
            {t("case.title")}
          </h2>
          <dl className="mt-10 space-y-8">
            {(["brief", "solution", "result"] as const).map((k) => (
              <div key={k} className="border-t border-white/15 pt-6">
                <dt className="eyebrow text-[color:var(--paper)]/60">
                  {t(`case.${k}_label`)}
                </dt>
                <dd className="mt-3 max-w-xl text-lg leading-relaxed text-[color:var(--paper)]/90">
                  {t(`case.${k}`)}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}