// Editable pricing constants. Adjust these to update the pricing section.
export type TierKey = "essential" | "signature" | "pro";

export interface Tier {
  key: TierKey;
  priceFrom: number;
  currency: string;
  highlighted?: boolean;
}

// One-time custom design + physical plaque.
export const TIERS: Tier[] = [
  { key: "essential", priceFrom: 39, currency: "€" },
  { key: "signature", priceFrom: 59, currency: "€", highlighted: true },
  { key: "pro", priceFrom: 89, currency: "€" },
];

// Optional subscription add-on.
export const SUBSCRIPTION = {
  key: "plus",
  priceFrom: 7,
  currency: "€",
  period: "/mo",
};

export const CONTACT = {
  whatsappNumber: "34672051147",
  whatsappMessage: "Hola Tapiko! Me gustaria mas informacion sobre una placa NFC.",
  instagram: "https://instagram.com/tapiko.studio",
  tiktok: "https://tiktok.com/@tapiko.studio",
  bookingUrl: "#booking",
};