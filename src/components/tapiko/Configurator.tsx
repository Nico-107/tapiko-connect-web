import { useState, useEffect, lazy, Suspense, Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CONTACT } from "@/config/pricing";
import {
  STYLE_PRESETS,
  BODY_COLORS,
  ACCENT_COLORS,
  PATTERNS,
  ZONE_OPTIONS,
  BASE_SHAPES,
} from "@/config/configurator";
import type { Pattern, ZoneOption, ButtonShape, FontStyle, KickstandStyle, ShapeKey } from "@/config/configurator";

const ConfiguratorCanvas = lazy(() => import("./ConfiguratorCanvas"));

interface EBState { hasError: boolean }
class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  componentDidCatch(e: Error, info: ErrorInfo) { console.warn("WebGL unavailable:", e, info); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function Swatch({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terra)] focus-visible:ring-offset-2"
      style={{
        background: color,
        borderColor: active ? "var(--ink)" : "transparent",
        boxShadow: active ? "0 0 0 2px var(--paper), 0 0 0 4px var(--ink)" : undefined,
      }}
      aria-pressed={active}
      aria-label={color}
    />
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--paper)]"
          : "border-[color:var(--stone)] bg-transparent text-[color:var(--graphite)] hover:border-[color:var(--ink)]",
      ].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

const DEFAULT_SHAPE = BASE_SHAPES[0];

export function Configurator() {
  const { t } = useTranslation();

  const [hasMounted, setHasMounted]             = useState(false);
  const [isMobile,   setIsMobile]               = useState(false);
  const [activePreset,  setActivePreset]         = useState<string>("minimalist");
  const [activeShape,   setActiveShape]          = useState<ShapeKey>("classic");
  const [bodyColor,     setBodyColor]            = useState("#F5F3EE");
  const [accentColor,   setAccentColor]          = useState("#2A3A50");
  const [pattern,       setPattern]              = useState<Pattern>("solid");
  const [thickness,     setThickness]            = useState(0.10);
  const [buttonShape,   setButtonShape]          = useState<ButtonShape>("square");
  const [fontStyle,     setFontStyle]            = useState<FontStyle>("normal");
  const [kickstandStyle, setKickstandStyle]      = useState<KickstandStyle>("thin");
  const [shapeWidth,    setShapeWidth]           = useState(DEFAULT_SHAPE.width);
  const [shapeHeight,   setShapeHeight]          = useState(DEFAULT_SHAPE.height);
  const [cornerRadius,  setCornerRadius]         = useState(DEFAULT_SHAPE.cornerRadius);
  const [zoneCount,     setZoneCount]            = useState<ZoneOption>(2);
  const [hasKickstand,  setHasKickstand]         = useState(false);
  const [businessName,  setBusinessName]         = useState("");
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
    setFontStyle(p.fontStyle as FontStyle);
    setKickstandStyle(p.kickstandStyle as KickstandStyle);
  }

  function applyShape(key: ShapeKey) {
    const s = BASE_SHAPES.find(b => b.key === key);
    if (!s) return;
    setActiveShape(key);
    setShapeWidth(s.width);
    setShapeHeight(s.height);
    setCornerRadius(s.cornerRadius);
  }

  function handleBodyColor(c: string)   { setBodyColor(c);   setActivePreset(""); }
  function handleAccentColor(c: string) { setAccentColor(c); setActivePreset(""); }
  function handlePattern(p: Pattern)    { setPattern(p);     setActivePreset(""); }

  function stepZone(delta: number) {
    const idx  = ZONE_OPTIONS.indexOf(zoneCount);
    const next = ZONE_OPTIONS[Math.min(Math.max(0, idx + delta), ZONE_OPTIONS.length - 1)];
    setZoneCount(next);
  }

  const configSummary = [
    activePreset ? `Style: ${activePreset}` : `Body: ${bodyColor}, Accent: ${accentColor}`,
    `Shape: ${activeShape}`,
    `Pattern: ${pattern}`,
    `Zones: ${zoneCount}`,
    hasKickstand ? "Kickstand: yes" : null,
    businessName ? `Name: ${businessName}` : null,
  ].filter(Boolean).join(", ");

  const waMessage = encodeURIComponent(
    `Hi Tapiko! Here's the design I configured — ${configSummary} — I'd like to request a quote.`
  );
  const waUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${waMessage}`;

  return (
    <section className="py-20 bg-[color:var(--paper)]" id="configurator">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="eyebrow mb-2">{t("configurator.eyebrow")}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[color:var(--ink)] sm:text-4xl">
            {t("configurator.title")}
          </h2>
          <p className="mt-3 text-sm text-[color:var(--graphite)]">{t("configurator.subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* Canvas */}
          <div className="relative overflow-hidden rounded-3xl bg-[#F5F3EE] aspect-square lg:aspect-auto lg:h-[540px]">
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
                    bodyColor={bodyColor}
                    accentColor={accentColor}
                    zoneCount={zoneCount}
                    hasKickstand={hasKickstand}
                    pattern={pattern}
                    businessName={businessName}
                    isMobile={isMobile}
                    thickness={thickness}
                    buttonShape={buttonShape}
                    fontStyle={fontStyle}
                    kickstandStyle={kickstandStyle}
                    shapeWidth={shapeWidth}
                    shapeHeight={shapeHeight}
                    cornerRadius={cornerRadius}
                  />
                </Suspense>
              </WebGLBoundary>
            ) : (
              <div className="h-full w-full bg-[#F5F3EE]" />
            )}

            {!dragHintDismissed && hasMounted && (
              <button
                type="button"
                onClick={() => setDragHintDismissed(true)}
                className="pointer-events-auto absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/12 px-3 py-1.5 text-xs text-[color:var(--ink)]/70 backdrop-blur-sm transition-opacity hover:opacity-0"
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

          {/* Controls */}
          <div className="flex flex-col gap-5 rounded-3xl border border-[color:var(--stone)]/50 bg-white p-6 shadow-sm overflow-y-auto max-h-[540px] lg:max-h-[540px]">

            {/* Style presets */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--graphite)]">
                {t("configurator.presets.label")}
              </p>
              <div className="flex flex-wrap gap-2">
                {STYLE_PRESETS.map(p => (
                  <Chip
                    key={p.key}
                    label={t(`configurator.presets.${p.key}`)}
                    active={activePreset === p.key}
                    onClick={() => applyPreset(p.key)}
                  />
                ))}
              </div>
            </div>

            <hr className="border-[color:var(--stone)]/40" />

            {/* Shape */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--graphite)]">
                {t("configurator.shape.label")}
              </p>
              <div className="flex flex-wrap gap-2">
                {BASE_SHAPES.map(s => (
                  <Chip
                    key={s.key}
                    label={t(`configurator.shape.${s.key}`)}
                    active={activeShape === s.key}
                    onClick={() => applyShape(s.key as ShapeKey)}
                  />
                ))}
              </div>
            </div>

            <hr className="border-[color:var(--stone)]/40" />

            {/* Body color */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--graphite)]">
                {t("configurator.body_color")}
              </p>
              <div className="flex flex-wrap gap-2">
                {BODY_COLORS.map(c => (
                  <Swatch key={c} color={c} active={bodyColor === c} onClick={() => handleBodyColor(c)} />
                ))}
              </div>
            </div>

            {/* Accent color */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--graphite)]">
                {t("configurator.accent_color")}
              </p>
              <div className="flex flex-wrap gap-2">
                {ACCENT_COLORS.map(c => (
                  <Swatch key={c} color={c} active={accentColor === c} onClick={() => handleAccentColor(c)} />
                ))}
              </div>
            </div>

            {/* Pattern */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--graphite)]">
                {t("configurator.pattern.label")}
              </p>
              <div className="flex flex-wrap gap-2">
                {PATTERNS.map(p => (
                  <Chip
                    key={p}
                    label={t(`configurator.pattern.${p}`)}
                    active={pattern === p}
                    onClick={() => handlePattern(p)}
                  />
                ))}
              </div>
            </div>

            <hr className="border-[color:var(--stone)]/40" />

            {/* Tap zones */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--graphite)]">
                {t("configurator.zones.label")}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => stepZone(-1)}
                  disabled={zoneCount === ZONE_OPTIONS[0]}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--stone)] text-sm font-medium transition-colors hover:border-[color:var(--ink)] disabled:opacity-30"
                >
                  −
                </button>
                <span className="w-4 text-center text-sm font-semibold text-[color:var(--ink)]">{zoneCount}</span>
                <button
                  type="button"
                  onClick={() => stepZone(1)}
                  disabled={zoneCount === ZONE_OPTIONS[ZONE_OPTIONS.length - 1]}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--stone)] text-sm font-medium transition-colors hover:border-[color:var(--ink)] disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            {/* Kickstand */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--graphite)]">
                {t("configurator.kickstand.label")}
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={hasKickstand}
                onClick={() => setHasKickstand(v => !v)}
                className={[
                  "relative h-6 w-11 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terra)] focus-visible:ring-offset-2",
                  hasKickstand ? "bg-[color:var(--ink)]" : "bg-[color:var(--stone)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                    hasKickstand ? "translate-x-5" : "translate-x-0",
                  ].join(" ")}
                />
              </button>
            </div>

            {/* Business name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[color:var(--graphite)]">
                {t("configurator.name.label")}
              </label>
              <input
                type="text"
                maxLength={32}
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder={t("configurator.name.placeholder")}
                className="w-full rounded-xl border border-[color:var(--stone)]/60 bg-[color:var(--paper)] px-3 py-2 text-sm text-[color:var(--ink)] placeholder:text-[color:var(--graphite)]/40 focus:border-[color:var(--ink)] focus:outline-none"
              />
            </div>

            {/* WhatsApp CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block rounded-xl bg-[color:var(--terra)] px-4 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("configurator.cta")}
            </a>

            <p className="text-center text-[10px] leading-relaxed text-[color:var(--graphite)]/60">
              {t("configurator.disclaimer")}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
