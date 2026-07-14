import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Reveal } from "./Reveal";

// ── base images ──────────────────────────────────────────────────────────────
import singleBase from "@/assets/catalog/plaque-single/base.png";
import doubleBase from "@/assets/catalog/plaque-double/base.png";
import tripleBase from "@/assets/catalog/plaque-triple/base.png";
import wallBase from "@/assets/catalog/wall-plate/base.jpg";
import tentBase from "@/assets/catalog/table-tent/base.png";
import coasterRevBase from "@/assets/catalog/coaster-review/base.jpeg";
import coasterMenuBase from "@/assets/catalog/coaster-menu/base.jpeg";

// ── plaque-single variants ────────────────────────────────────────────────────
import psTerra from "@/assets/catalog/plaque-single/terra.jpeg";
import psCharcoal from "@/assets/catalog/plaque-single/charcoal.jpeg";
import psOcean from "@/assets/catalog/plaque-single/ocean.jpeg";
import psSage from "@/assets/catalog/plaque-single/sage.jpeg";

// ── plaque-double variants ────────────────────────────────────────────────────
import pdChalk from "@/assets/catalog/plaque-double/chalk.jpeg";
import pdMidnight from "@/assets/catalog/plaque-double/midnight.jpeg";
import pdNatural from "@/assets/catalog/plaque-double/natural.jpeg";
import pdForest from "@/assets/catalog/plaque-double/forest.jpeg";

// ── plaque-triple variants ────────────────────────────────────────────────────
import ptCool from "@/assets/catalog/plaque-triple/cool.jpeg";
import ptWarm from "@/assets/catalog/plaque-triple/warm.jpeg";
import ptEarth from "@/assets/catalog/plaque-triple/earth.jpeg";
import ptDark from "@/assets/catalog/plaque-triple/dark.jpeg";
import ptMuted from "@/assets/catalog/plaque-triple/muted.jpeg";
import ptMediterranean from "@/assets/catalog/plaque-triple/mediterranean.jpeg";
import ptWarmwood from "@/assets/catalog/plaque-triple/warmwood.jpeg";
import ptCobalt from "@/assets/catalog/plaque-triple/cobalt.jpeg";

// ── wall-plate variants ───────────────────────────────────────────────────────
import wpTerra from "@/assets/catalog/wall-plate/terra.jpeg";
import wpCharcoal from "@/assets/catalog/wall-plate/charcoal.jpeg";
import wpOcean from "@/assets/catalog/wall-plate/ocean.jpeg";
import wpSage from "@/assets/catalog/wall-plate/sage.jpeg";

// ── table-tent variants ───────────────────────────────────────────────────────
import ttChalk from "@/assets/catalog/table-tent/chalk.jpeg";
import ttMidnight from "@/assets/catalog/table-tent/midnight.jpeg";
import ttTerra from "@/assets/catalog/table-tent/terra.jpeg";
import ttSage from "@/assets/catalog/table-tent/sage.jpeg";

// ─────────────────────────────────────────────────────────────────────────────

interface Swatch {
  key: string;
  label: string;
  color: string;
  img: string;
}

interface CatalogProduct {
  id: string;
  base: string;
  swatches: Swatch[];
}

const PRODUCTS: CatalogProduct[] = [
  {
    id: "plaque-single",
    base: singleBase,
    swatches: [
      { key: "terra",    label: "Terra",    color: "#b86b4a", img: psTerra    },
      { key: "charcoal", label: "Charcoal", color: "#3c3c3c", img: psCharcoal },
      { key: "ocean",    label: "Ocean",    color: "#3a7ab8", img: psOcean    },
      { key: "sage",     label: "Sage",     color: "#5a8c5a", img: psSage     },
    ],
  },
  {
    id: "plaque-double",
    base: doubleBase,
    swatches: [
      { key: "chalk",    label: "Chalk",    color: "#ede9e0", img: pdChalk    },
      { key: "midnight", label: "Midnight", color: "#1e2d3d", img: pdMidnight },
      { key: "natural",  label: "Natural",  color: "#c8b88a", img: pdNatural  },
      { key: "forest",   label: "Forest",   color: "#2d5a3d", img: pdForest   },
    ],
  },
  {
    id: "plaque-triple",
    base: tripleBase,
    swatches: [
      { key: "cool",          label: "Cool",          color: "#7ab0c8", img: ptCool          },
      { key: "warm",          label: "Warm",          color: "#c4865a", img: ptWarm          },
      { key: "earth",         label: "Earth",         color: "#8b7355", img: ptEarth         },
      { key: "dark",          label: "Dark",          color: "#2a2a2a", img: ptDark          },
      { key: "muted",         label: "Muted",         color: "#8a9098", img: ptMuted         },
      { key: "mediterranean", label: "Mediterranean", color: "#5a8c6a", img: ptMediterranean },
      { key: "warmwood",      label: "Warmwood",      color: "#8b6040", img: ptWarmwood      },
      { key: "cobalt",        label: "Cobalt",        color: "#1e5fa3", img: ptCobalt        },
    ],
  },
  {
    id: "wall-plate",
    base: wallBase,
    swatches: [
      { key: "terra",    label: "Terra",    color: "#b86b4a", img: wpTerra    },
      { key: "charcoal", label: "Charcoal", color: "#3c3c3c", img: wpCharcoal },
      { key: "ocean",    label: "Ocean",    color: "#3a7ab8", img: wpOcean    },
      { key: "sage",     label: "Sage",     color: "#5a8c5a", img: wpSage     },
    ],
  },
  {
    id: "table-tent",
    base: tentBase,
    swatches: [
      { key: "chalk",    label: "Chalk",    color: "#ede9e0", img: ttChalk    },
      { key: "midnight", label: "Midnight", color: "#1e2d3d", img: ttMidnight },
      { key: "terra",    label: "Terra",    color: "#b86b4a", img: ttTerra    },
      { key: "sage",     label: "Sage",     color: "#5a8c5a", img: ttSage     },
    ],
  },
  {
    id: "coaster-review",
    base: coasterRevBase,
    swatches: [],
  },
  {
    id: "coaster-menu",
    base: coasterMenuBase,
    swatches: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

function Modal({
  product,
  onClose,
}: {
  product: CatalogProduct;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [activeSwatch, setActiveSwatch] = useState<Swatch | null>(
    product.swatches[0] ?? null
  );
  const [displayImg, setDisplayImg] = useState(
    product.swatches[0]?.img ?? product.base
  );
  const [imgOpacity, setImgOpacity] = useState(1);

  const switchSwatch = useCallback((swatch: Swatch) => {
    if (swatch.key === activeSwatch?.key) return;
    setImgOpacity(0);
    setTimeout(() => {
      setDisplayImg(swatch.img);
      setActiveSwatch(swatch);
      setImgOpacity(1);
    }, 180);
  }, [activeSwatch]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const productName = t(`catalog.products.${product.id}.name`);
  const productDesc = t(`catalog.products.${product.id}.desc`);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-6"
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-[color:var(--ink)]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative z-10 w-full max-w-3xl bg-[color:var(--paper)] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col sm:flex-row max-h-[92dvh] sm:max-h-[80vh]">
        {/* image pane */}
        <div className="relative w-full sm:w-1/2 bg-[color:var(--stone)]/20 aspect-square sm:aspect-auto flex-shrink-0">
          <img
            src={displayImg}
            alt={productName}
            className="w-full h-full object-cover"
            style={{ opacity: imgOpacity, transition: "opacity 0.18s ease" }}
          />
        </div>

        {/* info pane */}
        <div className="flex flex-col flex-1 p-6 overflow-y-auto">
          <button
            onClick={onClose}
            className="self-end -mt-1 -mr-1 mb-4 p-1.5 rounded-full hover:bg-[color:var(--stone)]/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[color:var(--graphite)]" />
          </button>

          <h3 className="text-2xl font-medium text-[color:var(--ink)] leading-tight">
            {productName}
          </h3>
          <p className="mt-2 text-sm text-[color:var(--graphite)] leading-relaxed">
            {productDesc}
          </p>

          {product.swatches.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-widest text-[color:var(--graphite)] mb-3">
                {activeSwatch?.label ?? ""}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.swatches.map((sw) => (
                  <button
                    key={sw.key}
                    onClick={() => switchSwatch(sw)}
                    title={sw.label}
                    className="w-8 h-8 rounded-full transition-all duration-150 focus:outline-none"
                    style={{
                      backgroundColor: sw.color,
                      boxShadow:
                        activeSwatch?.key === sw.key
                          ? `0 0 0 2px var(--paper), 0 0 0 4px var(--ink)`
                          : `0 0 0 1px rgba(0,0,0,0.12)`,
                    }}
                    aria-pressed={activeSwatch?.key === sw.key}
                    aria-label={sw.label}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8">
            <a
              href="#contact"
              onClick={onClose}
              className="block w-full text-center rounded-xl bg-[color:var(--terra)] px-6 py-3.5 text-sm font-medium text-white hover:bg-[color:var(--terra)]/90 transition-colors"
            >
              {t("catalog.cta")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onClick,
}: {
  product: CatalogProduct;
  onClick: () => void;
}) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="group text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terra)] rounded-2xl"
    >
      <div className="overflow-hidden rounded-2xl bg-[color:var(--stone)]/10 aspect-square">
        <img
          src={product.base}
          alt={t(`catalog.products.${product.id}.name`)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-3 px-1">
        <p className="text-sm font-medium text-[color:var(--ink)]">
          {t(`catalog.products.${product.id}.name`)}
        </p>
        {product.swatches.length > 0 && (
          <div className="mt-1.5 flex gap-1.5 flex-wrap">
            {product.swatches.slice(0, 6).map((sw) => (
              <span
                key={sw.key}
                className="w-3 h-3 rounded-full inline-block"
                style={{
                  backgroundColor: sw.color,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.10)",
                }}
              />
            ))}
            {product.swatches.length > 6 && (
              <span className="text-[10px] text-[color:var(--graphite)] leading-3 self-center">
                +{product.swatches.length - 6}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Catalog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<CatalogProduct | null>(null);

  return (
    <section id="catalog" className="bg-[color:var(--paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* header */}
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-[color:var(--terra)]">
              {t("catalog.eyebrow")}
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-tight text-[color:var(--ink)] sm:text-5xl">
              {t("catalog.title")}
            </h2>
            <p className="mt-4 text-base text-[color:var(--graphite)]">
              {t("catalog.subtitle")}
            </p>
          </div>
        </Reveal>

        {/* grid */}
        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={i * 60}>
              <ProductCard product={product} onClick={() => setOpen(product)} />
            </Reveal>
          ))}
        </div>

        {/* design-your-own nudge */}
        <Reveal>
          <p className="mt-10 text-sm text-[color:var(--graphite)] text-center">
            {t("catalog.design_own_pre")}{" "}
            <a
              href="#configurator"
              className="underline underline-offset-2 text-[color:var(--ink)] hover:text-[color:var(--terra)] transition-colors"
            >
              {t("catalog.design_own_link")}
            </a>
          </p>
        </Reveal>
      </div>

      {/* modal */}
      {open && <Modal product={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
