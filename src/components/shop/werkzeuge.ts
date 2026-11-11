/* Die Werkzeuge im Shop: EINE Quelle für die Seite (ShopView) und für die maschinenlesbaren Angaben in page.tsx.
   Neues Werkzeug = ein Eintrag mehr, die Seite zeigt es als weitere Karte.

   In den Shop kommt nur, was quelloffen ist und nichts kostet (Iljas Entscheidung vom 11.11.2026).
   Web Design OS und KI-Assistenzteam sind seitdem raus. Jede Angabe hier muss auf der Seite des Werkzeugs
   oder in seinem Repository belegt sein, nichts dazuerfinden. */

export type Werkzeug = {
  name: string;
  /* Kurze Einordnung über dem Namen, z. B. Art und Plattform. */
  art: string;
  satz: string;
  punkte: string[];
  braucht: string;
  lizenz: string;
  bild: string;
  bildAlt: string;
  /* Eigene Seite des Werkzeugs auf sabala-mentoring.com. */
  seite: string;
  /* Öffentliches Repository mit dem Quellcode. */
  code: string;
};

export const WERKZEUGE: Werkzeug[] = [
  {
    name: "Mooni Voice",
    art: "Sprache zu Text · Mac",
    satz: "Du sprichst, und der Text steht da. In jeder App auf deinem Mac, auch in Claude Code und im Terminal.",
    punkte: [
      "Läuft komplett auf deinem Mac, deine Stimme verlässt das Gerät nie",
      "Erkennt Deutsch, Englisch und 23 weitere Sprachen",
      "Kein Abo, kein Konto",
    ],
    braucht: "Mac mit Apple-Chip, macOS 14 oder neuer",
    lizenz: "MIT",
    bild: "/shop/mooni-voice-cover.png",
    bildAlt: "Mooni Voice: App-Symbol mit kleinem Roboter über einer goldenen Tonwelle",
    seite: "/mooni-voice",
    code: "https://github.com/IljaSabalaKrasevskij/mooni-voice",
  },
];
