import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { ProductImage } from "./ProductImage";
import deriva from "@/assets/gallery-deriva.jpg";
import coffee from "@/assets/gallery-coffee.jpg";
import tapas from "@/assets/gallery-tapas.jpg";
import cocktail from "@/assets/gallery-cocktail.jpg";
import brunch from "@/assets/gallery-brunch.jpg";
import pizza from "@/assets/gallery-pizza.jpg";

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

        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-[color:var(--stone)]/40 pt-12 text-center">
            <p className="max-w-sm text-base text-[color:var(--graphite)]">
              {t("gallery.configurator_cta")}
            </p>
            <a
              href="#configurator"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ink)]/20 px-5 py-2.5 text-sm font-medium text-[color:var(--ink)] transition-colors hover:border-[color:var(--ink)]"
            >
              {t("common.design_your_own")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}