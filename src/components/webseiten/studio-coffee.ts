export type CoffeeChoice = "black" | "sugar";
export type CoffeePhase = "invitation" | "walking" | "seated";

export const COFFEE_ASSETS = {
  cup: "/webseiten/studio-consultation-v1/coffee-cup-v1.webp",
  gallery: "/webseiten/studio-consultation-v1/gallery-coffee.webp",
  film: "/webseiten/studio-consultation-v1/coffee-walk-v1.mp4",
  mobileFilm: "/webseiten/studio-consultation-v1/coffee-walk-v1-mobil.mp4",
  table: "/webseiten/studio-consultation-v1/consultation.webp",
};

export const COFFEE_COPY = {
  de: {
    room: "Auf einen Kaffee", host: "Dein Gastgeber", title: "Wie trinkst du deinen Kaffee?",
    invitation: "Nebenan ist ein Tisch für uns frei. Lass uns in Ruhe über deine Ideen sprechen.",
    choices: [
      { id: "black", label: "Ohne Zucker.", detail: "Ganz pur." },
      { id: "sugar", label: "Mit Zucker.", detail: "Ein bisschen süßer." },
    ],
    walking: "Komm mit. Nebenan haben wir Ruhe.",
    skip: "Direkt Platz nehmen", seated: { black: "Dein Kaffee. Ohne Zucker.", sugar: "Dein Kaffee. Mit Zucker." },
    alt: "Der Sabala-Adler lädt dich in der ausgestatteten Galerie zu einem Kaffee ein.",
  },
  en: {
    room: "Join me for a coffee", host: "Your host", title: "How do you take your coffee?",
    invitation: "There’s a table for us next door. Let’s take a moment to talk about your ideas.",
    choices: [
      { id: "black", label: "Without sugar.", detail: "Just as it is." },
      { id: "sugar", label: "With sugar.", detail: "A little sweeter." },
    ],
    walking: "Come with me. It’s quiet next door.",
    skip: "Take a seat now", seated: { black: "Your coffee. Without sugar.", sugar: "Your coffee. With sugar." },
    alt: "The Sabala eagle invites you for coffee in the gallery of completed websites.",
  },
} as const;
