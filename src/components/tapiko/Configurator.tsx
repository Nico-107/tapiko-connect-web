import { useState, useEffect, lazy, Suspense, Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CONTACT } from "@/config/pricing";
import {
  STYLE_PRESETS, BODY_COLORS, ACCENT_COLORS, PATTERNS,
  ZONE_OPTIONS, BASE_SHAPES, FONT_OPTIONS, ICON_OPTIONS,
} from "@/config/configurator";
import type { Pattern, ZoneOption, ButtonShape, FontOption, KickstandStyle, ShapeKey, IconOption } from "@/config/configurator";
import { Reveal } from "./Reveal";

const ConfiguratorCanvas = lazy(() => import("./ConfiguratorCanvas"));

// ── Error boundary ────────────────────────────────────────────────────────────
interface EBState { hasError: boolean }
class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  componentDidCatch(e: Error, info: ErrorInfo) { console.warn("WebGL unavailable:", e, info); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

// ── Brand icon SVGs (section 06 of brand sheet) ──────────────────────────────
const BrandReview = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5l2.4 5 5.4.7-3.9 3.9.9 5.5-4.8-2.6-4.8 2.6.9-5.5-3.9-3.9 5.4-.7z" />
  </svg>
);
const BrandFollow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.5c-4-2.7-8.5-6.3-8.5-10.7A4.8 4.8 0 0112 6.7a4.8 4.8 0 018.5 3.1c0 4.4-4.5 8-8.5 10.7z" />
  </svg>
);
const BrandShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="12" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" />
    <line x1="8" y1="11" x2="16" y2="7.2" /><line x1="8" y1="13" x2="16" y2="16.8" />
  </svg>
);
const BrandMenu = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="13" y2="16" />
  </svg>
);
const BrandContactless = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 18A6 6 0 0110 8.7" opacity="0.9" /><path d="M12.5 20A9.5 9.5 0 0113 5.8" opacity="0.55" />
    <circle cx="7" cy="19" r="1.8" fill="currentColor" stroke="none" />
  </svg>
);

// ── i18n key maps (handles hyphens in shape/font keys) ────────────────────────
const SHAPE_I18N: Record<ShapeKey, string> = {
  "classic":     "configurator.shape.classic",
  "rounded-top": "configurator.shape.rounded_top",
  "full-round":  "configurator.shape.full_round",
  "tag":         "configurator.shape.tag",
};
const FONT_FAMILY_CSS: Record<FontOption, string> = {
  modern:  "system-ui,-apple-system,sans-serif",
  serif:   "Georgia,'Times New Roman',serif",
  rounded: "'Trebuchet MS','Century Gothic',sans-serif",
  bold:    "system-ui,-apple-system,sans-serif",
};
const FONT_WEIGHT_CSS: Record<FontOption, string> = {
  modern: "500", serif: "400", rounded: "600", bold: "800",
};
const ICON_GLYPH: Record<IconOption, ReactNode> = {
  maps: "📍", google: "🔵", instagram: "📷", tiktok: "♪",
  menu: <BrandMenu />, website: "🌐", review: <BrandReview />, message: "💬",
  social: <BrandFollow />, share: <BrandShare />,
};

// ── Primitive UI components ───────────────────────────────────────────────────
function Swatch({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button" onClick={onClick}
      className="relative h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terra)] focus-visible:ring-offset-2"
      style={{
        background: color,
        borderColor: active ? "var(--ink)" : "transparent",
        boxShadow: active ? "0 0 0 2px var(--paper), 0 0 0 4px var(--ink)" : undefined,
      }}
      aria-pressed={active} aria-label={color}
    />
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button" onClick={onClick} aria-pressed={active}
      className={[
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--paper)]"
          : "border-[color:var(--stone)] bg-transparent text-[color:var(--graphite)] hover:border-[color:var(--ink)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function FontChip({ fontOpt, active, label, onClick }: {
  fontOpt: FontOption; active: boolean; label: string; onClick: () => void;
}) {
  return (
    <button
      type="button" onClick={onClick} aria-pressed={active}
      className={[
        "rounded-xl border px-3 py-2 text-sm transition-colors flex flex-col items-center gap-0.5 min-w-[58px]",
        active
          ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--paper)]"
          : "border-[color:var(--stone)] bg-transparent text-[color:var(--graphite)] hover:border-[color:var(--ink)]",
      ].join(" ")}
      style={{ fontFamily: FONT_FAMILY_CSS[fontOpt], fontWeight: FONT_WEIGHT_CSS[fontOpt] }}
    >
      <span className="text-base leading-none">Aa</span>
      <span className="text-[10px] font-sans font-medium tracking-wide leading-none opacity-70" style={{ fontFamily: "system-ui", fontWeight: 500 }}>
        {label}
      </span>
    </button>
  );
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_SHAPE   = BASE_SHAPES[0];
const DEFAULT_ICONS: IconOption[] = ["maps", "google", "instagram", "website"];

export function Configurator() {
  const { t } = useTranslation();

  const [hasMounted,  setHasMounted]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);

  const [activePreset, setActivePreset] = useState<string>("minimalist");

  const [activeShape,  setActiveShape]  = useState<ShapeKey>("classic");
  const [shapeWidth,   setShapeWidth]   = useState(DEFAULT_SHAPE.width);
  const [shapeHeight,  setShapeHeight]  = useState(DEFAULT_SHAPE.height);
  const [cornerRadius, setCornerRadius] = useState(DEFAULT_SHAPE.cornerRadius);

  const [bodyColor,      setBodyColor]      = useState("#F5F3EE");
  const [accentColor,    setAccentColor]    = useState("#2A3A50");
  const [pattern,        setPattern]        = useState<Pattern>("solid");
  const [thickness,      setThickness]      = useState(0.10);
  const [buttonShape,    setButtonShape]    = useState<ButtonShape>("square");
  const [kickstandStyle, setKickstandStyle] = useState<KickstandStyle>("thin");

  const [fontOption,       setFontOption]       = useState<FontOption>("modern");
  const [activeFontPreset, setActiveFontPreset] = useState<FontOption>("modern");

  const [zoneCount,    setZoneCount]    = useState<ZoneOption>(2);
  const [hasKickstand, setHasKickstand] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [buttonIcons,  setButtonIcons]  = useState<IconOption[]>(DEFAULT_ICONS);

  const [dragHintDismissed, setDragHintDismissed] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  function applyPreset(key: string) {
    const p = STYLE_PRESETS.find(s => s.key === key);
    if (!p) return;
    setActivePreset(key);
    setBodyColor(p.bodyColor);
    setAccentColor(p.accentColor);
    setPattern(p.pattern as Pattern);
    setThickness(p.thickness);
    setButtonShape(p.buttonShape as ButtonShape);
    setKickstandStyle(p.kickstandStyle as KickstandStyle);
    setFontOption(p.fontOption as FontOption);
    setActiveFontPreset(p.fontOption as FontOption);
  }

  function applyShape(key: ShapeKey) {
    const s = BASE_SHAPES.find(b => b.key === key);
    if (!s) return;
    setActiveShape(key);
    setShapeWidth(s.width);
    setShapeHeight(s.height);
    setCornerRadius(s.cornerRadius);
  }

  function handleFont(f: FontOption) {
    setFontOption(f);
    setActiveFontPreset(f);
    setActivePreset("");
  }

  function handleBodyColor(c: string)   { setBodyColor(c);   setActivePreset(""); }
  function handleAccentColor(c: string) { setAccentColor(c); setActivePreset(""); }
  function handlePattern(p: Pattern)    { setPattern(p);     setActivePreset(""); }

  function stepZone(delta: number) {
    const idx  = ZONE_OPTIONS.indexOf(zoneCount);
    const next = ZONE_OPTIONS[Math.min(Math.max(0, idx + delta), ZONE_OPTIONS.length - 1)];
    setZoneCount(next);
  }

  function setIcon(zoneIdx: number, icon: IconOption) {
    setButtonIcons(prev => {
      const next = [...prev] as IconOption[];
      next[zoneIdx] = icon;
      return next;
    });
  }

  const configSummary = [
    activePreset ? `Style: ${activePreset}` : `Body: ${bodyColor}`,
    `Shape: ${activeShape}`,
    `Font: ${fontOption}`,
    `Pattern: ${pattern}`,
    `Zones: ${zoneCount}`,
    hasKickstand ? "Kickstand: yes" : null,
    businessName ? `Name: ${businessName}` : null,
    `Icons: ${buttonIcons.slice(0, zoneCount).join(", ")}`,
  ].filter(Boolean).join(" · ");

  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    `Hi Tapiko! Here's my configured design — ${configSummary} — I'd like a quote.`
  )}`;

  return (
    <section className="py-24 bg-[color:var(--paper)]" id="configurator">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Editorial header */}
        <Reveal>
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">{t("configurator.eyebrow")}</p>
            <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-[color:var(--ink)] sm:text-4xl">
              {t("configurator.title")}
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-base text-[color:var(--graphite)]/80 leading-relaxed">
              {t("configurator.intro")}
            </p>
            <p className="mt-2 text-xs text-[color:var(--graphite)]/50 tracking-wide">
              {t("configurator.subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* Canvas */}
          <div className="relative overflow-hidden rounded-3xl aspect-square lg:aspect-auto lg:h-[580px]"
            style={{ background: "radial-gradient(ellipse at 60% 40%, #F0EDE6 0%, #E8E3DA 100%)" }}>
            {hasMounted ? (
              <WebGLBoundary fallback={
                <div className="flex h-full items-center justify-center text-sm text-[color:var(--graphite)]">
                  {t("configurator.webgl_unavailable")}
                </div>
              }>
                <Suspense fallback={
                  <div className="flex h-full items-center justify-center text-sm text-[color:var(--graphite)]">
                    Loading…
                  </div>
                }>
                  <ConfiguratorCanvas
                    bodyColor={bodyColor} accentColor={accentColor}
                    zoneCount={zoneCount} hasKickstand={hasKickstand}
                    pattern={pattern} businessName={businessName}
                    isMobile={isMobile} thickness={thickness}
                    buttonShape={buttonShape} fontOption={fontOption}
                    kickstandStyle={kickstandStyle}
                    shapeKey={activeShape}
                    shapeWidth={shapeWidth} shapeHeight={shapeHeight}
                    cornerRadius={cornerRadius} buttonIcons={buttonIcons}
                  />
                </Suspense>
              </WebGLBoundary>
            ) : (
              <div className="h-full w-full" />
            )}
            {/* Subtle inner vignette */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ boxShadow: "inset 0 0 60px 0 rgba(11,31,58,0.07)" }} />
            {!dragHintDismissed && hasMounted && (
              <button
                type="button" onClick={() => setDragHintDismissed(true)}
                className="pointer-events-auto absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1.5 text-xs text-[color:var(--ink)]/60 backdrop-blur-sm transition-opacity hover:opacity-0"
                aria-label="Dismiss hint"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                </svg>
                {t("configurator.drag_hint")}
              </button>
            )}
          </div>

          {/* Controls panel */}
          <div className="flex flex-col gap-0 rounded-3xl bg-white shadow-lg overflow-hidden lg:max-h-[580px]">
            <div className="flex flex-col gap-5 p-6 overflow-y-auto flex-1">

              {/* Style presets */}
              <div>
                <p className="eyebrow mb-2">{t("configurator.presets.label")}</p>
                <div className="flex flex-wrap gap-2">
                  {STYLE_PRESETS.map(p => (
                    <Chip key={p.key} label={t(`configurator.presets.${p.key}`)}
                      active={activePreset === p.key} onClick={() => applyPreset(p.key)} />
                  ))}
                </div>
              </div>

              <div className="h-px bg-[color:var(--stone)]/30" />

              {/* Shape */}
              <div>
                <p className="eyebrow mb-2">{t("configurator.shape.label")}</p>
                <div className="flex flex-wrap gap-2">
                  {BASE_SHAPES.map(s => (
                    <Chip key={s.key} label={t(SHAPE_I18N[s.key as ShapeKey])}
                      active={activeShape === s.key} onClick={() => applyShape(s.key as ShapeKey)} />
                  ))}
                </div>
              </div>

              <div className="h-px bg-[color:var(--stone)]/30" />

              {/* Body colour */}
              <div>
                <p className="eyebrow mb-2">{t("configurator.body_color")}</p>
                <div className="flex flex-wrap gap-2">
                  {BODY_COLORS.map(c => (
                    <Swatch key={c} color={c} active={bodyColor === c} onClick={() => handleBodyColor(c)} />
                  ))}
                </div>
              </div>

              {/* Accent colour */}
              <div>
                <p className="eyebrow mb-2">{t("configurator.accent_color")}</p>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_COLORS.map(c => (
                    <Swatch key={c} color={c} active={accentColor === c} onClick={() => handleAccentColor(c)} />
                  ))}
                </div>
              </div>

              {/* Pattern */}
              <div>
                <p className="eyebrow mb-2">{t("configurator.pattern.label")}</p>
                <div className="flex flex-wrap gap-2">
                  {PATTERNS.map(p => (
                    <Chip key={p} label={t(`configurator.pattern.${p}`)}
                      active={pattern === p} onClick={() => handlePattern(p)} />
                  ))}
                </div>
              </div>

              <div className="h-px bg-[color:var(--stone)]/30" />

              {/* Typography */}
              <div>
                <p className="eyebrow mb-2">{t("configurator.font.label")}</p>
                <div className="flex flex-wrap gap-2">
                  {FONT_OPTIONS.map(f => (
                    <FontChip
                      key={f}
                      fontOpt={f}
                      label={t(`configurator.font.${f}`)}
                      active={activeFontPreset === f}
                      onClick={() => handleFont(f)}
                    />
                  ))}
                </div>
              </div>

              <div className="h-px bg-[color:var(--stone)]/30" />

              {/* Tap zones */}
              <div className="flex items-center justify-between">
                <p className="eyebrow">{t("configurator.zones.label")}</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => stepZone(-1)} disabled={zoneCount === ZONE_OPTIONS[0]}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--stone)] text-sm font-medium transition-colors hover:border-[color:var(--ink)] disabled:opacity-30">
                    −
                  </button>
                  <span className="w-4 text-center text-sm font-semibold text-[color:var(--ink)]">{zoneCount}</span>
                  <button type="button" onClick={() => stepZone(1)} disabled={zoneCount === ZONE_OPTIONS[ZONE_OPTIONS.length - 1]}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--stone)] text-sm font-medium transition-colors hover:border-[color:var(--ink)] disabled:opacity-30">
                    +
                  </button>
                </div>
              </div>

              {/* Icon picker */}
              <div>
                <p className="eyebrow mb-2">{t("configurator.icons.label")}</p>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: zoneCount }, (_, zi) => (
                    <div key={zi} className="flex items-center gap-2">
                      <span className="w-14 shrink-0 text-xs text-[color:var(--graphite)]">
                        {t("configurator.icons.zone")} {zi + 1}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {ICON_OPTIONS.map(icon => (
                          <button
                            key={icon}
                            type="button"
                            title={t(`configurator.icons.${icon}`)}
                            onClick={() => setIcon(zi, icon)}
                            className={[
                              "h-7 w-7 rounded-lg border text-sm transition-colors flex items-center justify-center",
                              buttonIcons[zi] === icon
                                ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--paper)]"
                                : "border-[color:var(--stone)] hover:border-[color:var(--ink)]",
                            ].join(" ")}
                            aria-pressed={buttonIcons[zi] === icon}
                          >
                            {ICON_GLYPH[icon]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[color:var(--stone)]/30" />

              {/* Kickstand */}
              <div className="flex items-center justify-between">
                <p className="eyebrow">{t("configurator.kickstand.label")}</p>
                <button
                  type="button" role="switch" aria-checked={hasKickstand}
                  onClick={() => setHasKickstand(v => !v)}
                  className={[
                    "relative h-6 w-11 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terra)] focus-visible:ring-offset-2",
                    hasKickstand ? "bg-[color:var(--ink)]" : "bg-[color:var(--stone)]",
                  ].join(" ")}
                >
                  <span className={[
                    "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                    hasKickstand ? "translate-x-5" : "translate-x-0",
                  ].join(" ")} />
                </button>
              </div>

              {/* Business name */}
              <div>
                <label className="eyebrow mb-1.5 block">
                  {t("configurator.name.label")}
                </label>
                <input
                  type="text" maxLength={32} value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder={t("configurator.name.placeholder")}
                  className="w-full rounded-xl border border-[color:var(--stone)]/60 bg-[color:var(--paper)] px-3 py-2 text-sm text-[color:var(--ink)] placeholder:text-[color:var(--graphite)]/40 focus:border-[color:var(--ink)] focus:outline-none"
                />
              </div>

            </div>

            {/* CTA area — pinned to bottom */}
            <div className="border-t border-[color:var(--stone)]/40 px-6 py-5 bg-white">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="block rounded-full bg-[color:var(--terra)] px-4 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90">
                {t("configurator.cta")}
              </a>
              <p className="mt-3 text-center text-[10px] leading-relaxed text-[color:var(--graphite)]/50">
                {t("configurator.disclaimer")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
