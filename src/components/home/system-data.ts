export type Moon = {
  name: string;
  href: string;
  desc: string;
};

export type PlanetData = {
  key: string;
  code: string; // digitaler Code fürs HUD, z.B. "MODE_01"
  title: string;
  subtitle: string;
  pitch: string; // 1-2 Sätze, sprechen den ICP an
  href: string;
  cta: string;
  color: string; // Highlight / Glow
  color2: string; // tiefer Schatten-Ton
  position: [number, number, number]; // Desktop (horizontal)
  mPos: [number, number, number]; // Mobile (vertikal gestapelt, Hochformat)
  size: number;
  grid: [number, number]; // Dichte des digitalen Grids (lon, lat)
  fresnel: number; // Rim-Schärfe (kleiner = breiter/weicher)
  ring?: boolean; // planetarer Ring (Saturn-Charakter)
  labelSide: 1 | -1; // Annotation rechts (1) oder links (-1) vom Planeten
  labelDy: number; // vertikaler Versatz der Annotation (gegen Überlappung)
  moons: Moon[];
};

export const SYSTEM: PlanetData[] = [
  {
    key: "build",
    code: "MODE_01",
    title: "Für dich gebaut",
    subtitle: "du sagst was, ich baue es",
    pitch:
      "Du führst ein wachsendes Unternehmen und brauchst einen Auftritt oder ein KI-System, das einfach läuft. Du sagst, was du brauchst — ich baue es fertig und übergebe es dir.",
    href: "/webseiten",
    cta: "Zu den Webseiten",
    // Champagner-Gold — hell, fein, präzise
    color: "#EAC86A",
    color2: "#6E5212",
    position: [-5.6, 0.8, 0.0],
    mPos: [0, 4.4, 0],
    size: 1.3,
    grid: [90, 46],
    fresnel: 2.8,
    labelSide: 1,
    labelDy: 0.0,
    moons: [
      { name: "Webseiten", href: "/webseiten", desc: "Premium-Auftritt, der verkauft" },
      { name: "Custom GPTs", href: "/gpt-team", desc: "Dein Wissen als KI-Assistent" },
      { name: "Agent OS", href: "/mitentwickelt#agenten", desc: "Autonome Agenten für dein Business" },
    ],
  },
  {
    key: "with",
    code: "MODE_02",
    title: "Mit dir entwickelt",
    subtitle: "deine Vision, unser gemeinsamer Code",
    pitch:
      "Du hast ein laufendes Projekt und brauchst einen technischen Partner auf Augenhöhe, der mit dir weiterbaut, oft genau da, wo starkes Design den Unterschied macht. Wir entwickeln es gemeinsam, vom Frontend bis zu KI-Agenten.",
    href: "/mitentwickelt",
    cta: "Lass uns reden",
    // Kupfer-Rost — deutlich wärmer/orange, menschlicher
    color: "#D4823C",
    color2: "#5E2E10",
    position: [0.3, -2.9, -0.4],
    mPos: [0, 0, 0],
    size: 1.0,
    grid: [54, 28],
    fresnel: 2.2,
    labelSide: 1,
    labelDy: 0.0,
    moons: [
      { name: "Co-Development", href: "/mitentwickelt", desc: "Ich baue mit dir weiter" },
      { name: "Frontend & Design", href: "/mitentwickelt#frontend", desc: "Design, das den Unterschied macht" },
      { name: "Agentensysteme", href: "/mitentwickelt#agenten", desc: "KI, die euch Arbeit abnimmt" },
    ],
  },
  {
    key: "learn",
    code: "MODE_03",
    title: "Dir beigebracht",
    subtitle: "du willst es selbst können",
    pitch:
      "Du willst, dass dein Team KI wirklich nutzt — nicht nur darüber redet. Ich bring es euch bei, kinderleicht und mit direktem Praxisbezug. Akademie für Solopreneure, Workshops für dein Unternehmen.",
    href: "/akademie",
    cta: "Zur Akademie",
    // Gedämpftes Sage-Grün — Wachstum/Lernen, ohne Ring (gleiche Technik wie die anderen)
    color: "#6FA382",
    color2: "#2E4A39",
    position: [5.5, 1.3, 0.0],
    mPos: [0, -4.4, 0],
    size: 1.15,
    grid: [70, 36],
    fresnel: 3.1,
    labelSide: -1,
    labelDy: 0.4,
    moons: [
      { name: "KI-Akademie", href: "/akademie", desc: "Für Webdesigner & Solopreneure" },
      { name: "Team-Workshops", href: "/akademie#workshops", desc: "Dein Unternehmen wird KI-fit" },
    ],
  },
];
