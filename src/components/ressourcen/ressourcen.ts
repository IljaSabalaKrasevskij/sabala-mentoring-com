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
  /* ganz: Bild nicht beschneiden (Symbol auf dunklem Grund). */
  bild: { src: string; alt: string; ganz?: boolean };
  /* Seite der Ressource und Sprungziel ihres Formulars dort. */
  seite: string;
  formular: string;
  knopf: string;
  /* Nur bei Open Source: öffentliches Repository und Lizenz (SPDX-Kürzel). */
  code?: string;
  lizenz?: string;
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
    name: "Skill-Paket",
    art: "Skills für Claude · Deutsch",
    satz: "Vier Skills, die ich selbst nutze, auf Deutsch und zum Anpassen an deine Stimme.",
    punkte: ["Texte ohne KI-Klang", "Schöneres Design", "Check vor dem Livegang"],
    bild: {
      src: "/blog/webseiten-bau-mit-claude-anfaenger/cover.jpg",
      alt: "Skizze: aufgeschlagenes Notizbuch mit Entwürfen für eine Webseite, daneben ein Laptop und eine Tasse Kaffee",
    },
    seite: "/claude-code/skill-paket",
    formular: "anfordern",
    knopf: "Skill-Paket holen",
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
];
