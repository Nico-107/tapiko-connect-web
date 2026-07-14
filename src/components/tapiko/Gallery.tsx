import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { ProductImage } from "./ProductImage";
import deriva from "@/assets/gallery-deriva.jpg";
import coffee from "@/assets/gallery-coffee.jpg";
import tapas from "@/assets/gallery-tapas.jpg";
import cocktail from "@/assets/gallery-cocktail.jpg";
import brunch from "@/assets/gallery-brunch.jpg";
import pizza from "@/assets/gallery-pizza.jpg";
import caseImg from "@/assets/case-bar-deriva.jpg";

const ITEMS: { id: string; src: string; ratio: string }[] = [
  { id: "deriva", src: deriva, ratio: "4 / 5" },
  { id: "coffee", src: coffee, ratio: "4 / 5" },
  { id: "tapas", src: tapas, ratio: "4 / 5" },
  { id: "cocktail", src: cocktail, ratio: "4 / 5" },
  { id: "brunch", src: brunch, ratio: "4 / 5" },
  { id: "pizza", src: pizza, ratio: "4 / 5" },
];

export function Gallery() {
  const { t } = useTranslation();
  return (
    <section id="examples" className="bg-[color:var(--paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">{t("gallery.eyebrow")}</p>
              <h2 className="mt-4 text-4xl font-medium leading-tight text-[color:var(--ink)] sm:text-5xl">
                {t("gallery.title")}
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[color:var(--graphite)]">
              {t("gallery.subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => {
            const caption = t(`gallery.items.${item.id}`);
            return (
              <Reveal key={item.id} delay={(i % 3) * 80}>
                <figure className="group">
                  <div className="overflow-hidden rounded-2xl transition-transform duration-500 group-hover:-translate-y-1">
                    <ProductImage
                      src={item.src}
                      alt={caption}
                      label={caption}
                      ratio={item.ratio}
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="text-sm text-[color:var(--ink)]">{caption}</span>
                    <span className="eyebrow opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      0{i + 1}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Case study — full-bleed dark highlight beneath the grid */}
      <div className="mt-24 bg-[color:var(--ink)] py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:px-10">
          <Reveal>
            <ProductImage
              src={caseImg}
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
      </div>
    </section>
  );
}
