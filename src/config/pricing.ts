// Standard ready-to-order plaque — fixed price, ships immediately.
export const STANDARD = {
  amount: 19.99,
  currency: "€",
  tapZones: 4, // 1 main body zone + 3 button zones
  launchNote: true,
};

// Custom-designed plaque — quote-based, fully bespoke.
export const CUSTOM = {
  startingAmount: 20,
  currency: "€",
};

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
