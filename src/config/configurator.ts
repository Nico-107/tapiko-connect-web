export const FONT_OPTIONS = ["modern", "serif", "rounded", "bold"] as const;

export const ICON_OPTIONS = [
  "maps", "google", "instagram", "tiktok",
  "menu", "website", "review", "message", "social", "share",
] as const;

export const STYLE_PRESETS = [
  {
    key:           "minimalist",
    bodyColor:     "#F5F3EE",
    accentColor:   "#2A3A50",
    pattern:       "solid"        as const,
    thickness:     0.10,
    buttonShape:   "square"       as const,
    fontOption:    "modern"       as const,
    kickstandStyle:"thin"         as const,
  },
  {
    key:           "vintage",
    bodyColor:     "#EDE3D3",
    accentColor:   "#8B4A2B",
    pattern:       "grain"        as const,
    thickness:     0.16,
    buttonShape:   "circle"       as const,
    fontOption:    "serif"        as const,
    kickstandStyle:"wide"         as const,
  },
  {
    key:           "coastal",
    bodyColor:     "#D6E8EC",
    accentColor:   "#2E6B8A",
    pattern:       "waves"        as const,
    thickness:     0.12,
    buttonShape:   "pill"         as const,
    fontOption:    "rounded"      as const,
    kickstandStyle:"thin"         as const,
  },
  {
    key:           "bold",
    bodyColor:     "#232B38",
    accentColor:   "#E2683C",
    pattern:       "dots"         as const,
    thickness:     0.20,
    buttonShape:   "large-square" as const,
    fontOption:    "bold"         as const,
    kickstandStyle:"block"        as const,
  },
] as const;

export const BODY_COLORS   = ["#F5F3EE", "#EDE3D3", "#D6E8EC", "#232B38", "#1B5E60"];
export const ACCENT_COLORS = ["#E2683C", "#2E6B8A", "#8B4A2B", "#2A3A50", "#C9A24B"];
export const PATTERNS      = ["solid", "waves", "dots", "grain"] as const;
export const ZONE_OPTIONS  = [1, 2, 3, 4] as const;

export const BASE_SHAPES = [
  { key: "classic",     width: 1.30, height: 1.60, cornerRadius: 0.04  },
  { key: "rounded-top", width: 1.30, height: 1.60, cornerRadius: 0.22  },
  { key: "full-round",  width: 1.10, height: 1.80, cornerRadius: 0.55  },
  { key: "tag",         width: 1.45, height: 1.45, cornerRadius: 0.725 },
] as const;

export type Pattern        = (typeof PATTERNS)[number];
export type ZoneOption     = (typeof ZONE_OPTIONS)[number];
export type ButtonShape    = "square" | "circle" | "pill" | "large-square";
export type FontOption     = (typeof FONT_OPTIONS)[number];
export type KickstandStyle = "thin" | "wide" | "block";
export type ShapeKey       = (typeof BASE_SHAPES)[number]["key"];
export type IconOption     = (typeof ICON_OPTIONS)[number];
