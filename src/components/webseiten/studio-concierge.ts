/* Texte fuer Schaufenster und Empfang.
   Die Schilder im Fenster tragen bewusst KEINE Zahlen: die Seite verkauft die
   kostenlose Potenzial-Analyse, nicht eine Preisliste (12.9.2026, Ilja).
   `price` ist das, was auf dem Schild in Serifenschrift steht, nicht ein Betrag. */
export const DISPLAY_DETAILS = [
  { price: "inklusive", title: "Die richtigen Kunden erkennen sich.", features: ["Zielgruppe und Angebot", "Wettbewerb und Unterschied", "Ein klarer nächster Schritt"], benefit: "Damit Besucher sofort verstehen, warum gerade du die richtige Wahl bist." },
  { price: "inklusive", title: "Eine Geschichte, die weiterführt.", features: ["Botschaft und roter Faden", "Texte in der Sprache deiner Kunden", "Eine Seitenstruktur, die trägt"], benefit: "Damit aus Aufmerksamkeit Interesse wird und aus Interesse ein Gespräch." },
  { price: "inklusive", title: "Dein Auftritt so gut wie deine Arbeit.", features: ["Eigene Bildwelt und Art Direction", "Typografie bis ins Detail", "Für großen und kleinen Bildschirm gestaltet"], benefit: "Damit deine Qualität schon vor dem ersten Gespräch sichtbar wird." },
  { price: "inklusive", title: "Qualität, die auch hinter der Fassade trägt.", features: ["Webseite in eigenem Code", "Tempo und Suchmaschinenstruktur", "Messbare Kontaktwege"], benefit: "Damit der starke erste Eindruck auch beim Benutzen deiner Webseite hält." },
  { price: "inklusive", title: "Nach der Anfrage geht es weiter.", features: ["Formulare und Qualifizierung", "Verbundene Abläufe", "Übergabe und Nachfassen"], benefit: "Damit Interesse im richtigen Prozess ankommt und bearbeitet wird." },
  { price: "100 %", title: "Dein Unternehmen. Dein Eigentum.", features: ["Deine Domain", "Dein Hosting und dein Code", "Zugänge sauber übergeben"], benefit: "Damit du langfristig selbst über deinen Auftritt bestimmst." },
] as const;

export const CONCIERGE_QUESTIONS = [
  { question: "Brauche ich eine neue Webseite?", answer: "Vielleicht braucht deine Webseite einen neuen Auftritt. Vielleicht fehlt ihr nur Klarheit. Entscheidend ist: Erkennt man deine Qualität, versteht man dein Angebot und findet man den nächsten Schritt? Eine gute Webseite macht deine Qualität sichtbar und hilft den richtigen Menschen, sich für dich zu entscheiden." },
  { question: "Was gehört bei dir dazu?", answer: "Wir verbinden Positionierung, Geschichte, Design und eigenes Web Development. Dazu kommen die Abläufe hinter deinen Anfragen. So entsteht ein Auftritt, der deine Arbeit verständlich und deine Qualität sichtbar macht. Domain, Hosting und Code gehören dir." },
  { question: "Zeig mir deine Arbeit.", answer: "Sehr gern. Scroll einfach weiter. Ich nehme dich mit in den nächsten Raum und zeige dir ein paar Ergebnisse aus den Sabala Studios." },
] as const;
