import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { ProductImage } from "./ProductImage";
import productImg from "@/assets/product-plaque.jpg";

export function Product() {
  const { t } = useTranslation();
  return (
    <section id="product" className="bg-[color:var(--paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ProductImage
              src={productImg}
              alt="Close-up of a Tapiko plaque with three tap zones"
              ratio="1 / 1"
              className="shadow-[0_30px_80px_-40px_rgba(11,31,58,0.35)]"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">{t("product.eyebrow")}</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight text-[color:var(--ink)] sm:text-5xl">
              {t("product.title")}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--graphite)]">
              {t("product.body")}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 overflow-hidden rounded-2xl bg-[color:var(--ink)] px-6 py-5 text-[color:var(--paper)] sm:px-10">
            <p className="eyebrow text-[color:var(--paper)]/70">
              {t("product.specs_label")}
            </p>
            <p className="mt-2 font-mono text-[13px] leading-relaxed text-[color:var(--paper)] sm:text-sm" style={{ fontFamily: "var(--font-mono)" }}>
              {t("product.specs")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}