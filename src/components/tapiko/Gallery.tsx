import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { ProductImage } from "./ProductImage";
import gallery from "@/assets/gallery-collection.jpg";
import hero from "@/assets/hero-plaque.jpg";
import deriva from "@/assets/case-bar-deriva.jpg";

const ITEMS: { id: string; src?: string; ratio: string }[] = [
  { id: "1", src: hero, ratio: "4 / 5" },
  { id: "2", src: gallery, ratio: "4 / 5" },
  { id: "3", src: deriva, ratio: "4 / 5" },
  { id: "4", src: undefined, ratio: "4 / 5" },
  { id: "5", src: undefined, ratio: "4 / 5" },
  { id: "6", src: undefined, ratio: "4 / 5" },
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
    </section>
  );
}