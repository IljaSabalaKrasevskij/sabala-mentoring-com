export type CoffeeChoice = "black" | "sugar" | "none";
export type CoffeePhase = "invitation" | "walking" | "seated";

export const COFFEE_ASSETS = {
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
      { id: "black", label: "Schwarz, bitte.", detail: "Ganz pur." },
      { id: "sugar", label: "Mit etwas Zucker.", detail: "Ein bisschen süßer." },
      { id: "none", label: "Ohne Kaffee, danke.", detail: "Ich komme trotzdem mit." },
    ],
    walking: "Komm mit. Nebenan haben wir Ruhe.",
    skip: "Direkt Platz nehmen", seated: { black: "Dein Kaffee. Schwarz, wie gewünscht.", sugar: "Dein Kaffee. Mit etwas Zucker.", none: "Schön, dass du Platz genommen hast." },
    alt: "Der Sabala-Adler lädt dich in der ausgestatteten Galerie zu einem Kaffee ein.",
  },
  en: {
    room: "Join me for a coffee", host: "Your host", title: "How do you take your coffee?",
    invitation: "There’s a table for us next door. Let’s take a moment to talk about your ideas.",
    choices: [
      { id: "black", label: "Black, please.", detail: "Just as it is." },
      { id: "sugar", label: "With a little sugar.", detail: "A little sweeter." },
      { id: "none", label: "No coffee, thank you.", detail: "I’ll join you anyway." },
    ],
    walking: "Come with me. It’s quiet next door.",
    skip: "Take a seat now", seated: { black: "Your coffee. Black, as requested.", sugar: "Your coffee. With a little sugar.", none: "I’m glad you could join me." },
    alt: "The Sabala eagle invites you for coffee in the gallery of completed websites.",
  },
} as const;
