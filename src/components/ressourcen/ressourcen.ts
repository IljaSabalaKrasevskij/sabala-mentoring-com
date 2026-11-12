/* Die Ressourcen: EINE Quelle für die Seite /ressourcen (RessourcenView) und für die Angaben für Google in page.tsx.
   Neue Ressource = ein Eintrag mehr, die Seite zeigt sie als weitere Karte.

   Hier steht nur, was kostenlos ist (Iljas Entscheidung vom 11.11.2026, seit 12.11.2026 heißt der Bereich „Ressourcen“
   statt „Shop“). Jede Karte führt auf die Seite der Ressource, dort steht das Formular mit Häkchen und Bestätigungsmail.
   Jede Angabe muss auf dieser Seite oder im Repository belegt sein, nichts dazuerfinden. */

export type Ressource = {
  name: string;
  /* Kurze Einordnung über dem Namen: Art und Plattform. */
  art: string;
  satz: string;
  /* Höchstens drei, kurz genug für eine Zeile am Laptop (sonst passt der Abschnitt nicht mehr ins Fenster). */
  punkte: string[];
  /* ganz: Bild nicht beschneiden (Symbol auf dunklem Grund). Ohne Bild zeigt die Karte eine ruhige Fläche. */
  bild?: { src: string; alt: string; ganz?: boolean };
  /* Seite der Ressource und Sprungziel ihres Formulars dort. */
  seite: string;
  formular: string;
  knopf: string;
  /* Nur bei Open Source: öffentliches Repository und Lizenz (SPDX-Kürzel). */
  code?: string;
  lizenz?: string;
  /* Noch in Arbeit: ruhige Fläche statt Bild, kein Eintrag in den Angaben für Google. */
  kommt?: true;
};

export const RESSOURCEN: Ressource[] = [
  {
    name: "Claude-Code-Startpaket",
    art: "Anleitung · Mac und Windows",
    satz: "Alles für deine erste Woche mit Claude Code, in einfacher Sprache.",
    punkte: ["Installation und Spickzettel", "Zwei CLAUDE.md-Vorlagen", "Zehn Skills, die ich selbst nutze"],
    bild: {
      src: "/blog/claude-code-installieren/ohne-terminal.jpg",
      alt: "Skizze: ein älterer Mann arbeitet lächelnd am Küchentisch mit einer einfachen App mit Ordnern auf dem Laptop",
    },
    seite: "/claude-code/startpaket",
    formular: "anfordern",
    knopf: "Startpaket holen",
  },
  {
    name: "Mooni Voice",
    art: "Diktieren · Open Source",
    satz: "Du sprichst, und der Text steht da. In jeder App, auch in Claude Code.",
    punkte: ["Läuft komplett auf deinem Mac", "25 Sprachen, auch Deutsch", "Apple-Chip, ab macOS 14"],
    bild: { src: "/shop/mooni-voice-cover.png", alt: "Mooni Voice: App-Symbol mit kleinem Roboter über einer goldenen Tonwelle", ganz: true },
    seite: "/mooni-voice",
    formular: "download",
    knopf: "Mooni Voice holen",
    code: "https://github.com/IljaSabalaKrasevskij/mooni-voice",
    lizenz: "MIT",
  },
  {
    name: "Skill-Paket",
    art: "Skills für Claude",
    satz: "Meine Skills für menschliche Texte und schöneres Design. Ich packe sie gerade für dich zusammen.",
    punkte: ["Du bekommst Bescheid per Mail"],
    seite: "/claude-code/startpaket",
    formular: "anfordern",
    knopf: "Bis dahin: das Startpaket",
    kommt: true,
  },
];
