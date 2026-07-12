export const STYLE_PRESETS = [
  { key: "minimalist", bodyColor: "#F5F3EE", accentColor: "#0B1F3A", pattern: "solid" },
  { key: "vintage",    bodyColor: "#EDE3D3", accentColor: "#8B4A2B", pattern: "grain" },
  { key: "coastal",   bodyColor: "#F5F3EE", accentColor: "#2E6BE6", pattern: "waves" },
  { key: "bold",      bodyColor: "#0B1F3A", accentColor: "#E2683C", pattern: "dots"  },
] as const;

export const BODY_COLORS   = ["#F5F3EE", "#0B1F3A", "#EDE3D3", "#1B5E60", "#F6F1E7"];
export const ACCENT_COLORS = ["#E2683C", "#2E6BE6", "#8B4A2B", "#0B1F3A", "#C9A24B"];
export const PATTERNS      = ["solid", "waves", "dots", "grain"] as const;
export const ZONE_OPTIONS  = [1, 2, 3, 4] as const;

export type Pattern    = (typeof PATTERNS)[number];
export type ZoneOption = (typeof ZONE_OPTIONS)[number];
