// Editable pricing constants. Adjust these to update the pricing section.
export type TierKey = "essential" | "signature" | "pro";

export interface Tier {
  key: TierKey;
  priceFrom: number;
  currency: string;
  highlighted?: boolean;
}

export const TIERS: Tier[] = [
  { key: "essential", priceFrom: 89, currency: "€" },
  { key: "signature", priceFrom: 149, currency: "€", highlighted: true },
  { key: "pro", priceFrom: 229, currency: "€" },
];

export const CONTACT = {
  whatsappNumber: "34600000000",
  whatsappMessage: "Hola Tapiko! Me gustaria mas informacion sobre una placa NFC.",
  instagram: "https://instagram.com/tapiko.studio",
  tiktok: "https://tiktok.com/@tapiko.studio",
  bookingUrl: "#booking",
};