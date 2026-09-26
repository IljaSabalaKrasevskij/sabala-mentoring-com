/* Einzige Quelle der Wahrheit fuer das Second-Brain-Webinar.
   Hero, Anmeldung, FAQ, Metadata und das LinkedIn-Banner-Script lesen HIER.
   Neuer Termin = diese Datei anfassen, sonst nichts. */

export const WEBINAR = {
  eyebrow: "Kostenloses Live-Webinar",
  title: "Dein Wissen gehört auf deine Festplatte.",
  subtitle:
    "Ich zeige dir mein eigenes Second Brain, wie es aufgebaut ist und was ich täglich damit mache. Ohne eine einzige Zeile Code.",

  // Datum als ISO fuer <time> + Strukturdaten, Labels fuer die Anzeige.
  iso: "2026-09-18T15:00:00+02:00",
  isoEnde: "2026-09-18T16:00:00+02:00",
  weekday: "Freitag",
  date: "18. September 2026",
  time: "15:00 Uhr",
  duration: "60 Minuten",
  ort: "Live via Zoom, Aufzeichnung bekommst du danach",

  // LinkedIn-Event: URL eintragen, sobald das Event angelegt ist.
  // Leer = der Button wird gar nicht erst gerendert.
  linkedInEventUrl: "",

  // Aufzeichnung: erst NACH dem Webinar eintragen, oeffentlicher Share-Link
  // (in Fathom: Share -> "Anyone with the link"), nicht die interne Call-URL.
  // Leer lassen bis die Aufzeichnung existiert. Solange leer, baut
  // scripts/webinar-mails.mjs die Mails 6 und 7 gar nicht erst, damit niemand
  // aus Versehen die Aufzeichnung des VORIGEN Laufs verschickt.
  aufzeichnungUrl: "",

  // Platzzahl des Zoom-Raums. null = wird nicht erwaehnt.
  // Nur eintragen, wenn es stimmt: eine erfundene Knappheit faellt auf,
  // spaetestens wenn jemand zwei Minuten vor Beginn noch reinkommt.
  plaetze: null as number | null,
} as const;

/* Ablauf im Webinar. Kurz halten, das ist kein Curriculum. */
export const AGENDA = [
  {
    minute: "00-10",
    title: "Der Moment, in dem es klickt",
    body: "Ich stelle Claude live dieselbe Frage zweimal. Einmal ohne System, einmal mit. Du siehst den Unterschied sofort, ohne Erklärung.",
  },
  {
    minute: "10-25",
    title: "Warum Chat kein Wissen ist",
    body: "Was mit deinen Notizen, Entscheidungen und Kundeninfos passiert, wenn sie nur im Chatverlauf existieren. Und warum das kein Backup-Problem ist, sondern ein Zugriffsproblem.",
  },
  {
    minute: "25-45",
    title: "Mein Second Brain, offen auf dem Tisch",
    body: "Ordner, Textdateien, eine Regeldatei. Mehr ist es nicht. Ich mache mein eigenes System auf und zeige dir, wie es aufgebaut ist, mit echten Notizen aus meinem Geschäft.",
  },
  {
    minute: "45-60",
    title: "Dein erster Schritt für heute",
    body: "Was du direkt nach dem Webinar in 20 Minuten selbst anlegen kannst, damit Claude schon morgen früh mehr über dich weiß als heute. Und wie es danach weitergeht, wenn du es nicht allein machen willst.",
  },
] as const;

/* Die drei Glaubenssaetze, die Leute vom Second Brain fernhalten. */
export const MYTHEN = [
  {
    glaube: "Ich baue nichts. Also brauche ich Claude Code nicht.",
    wahrheit:
      "Claude Code ist kein Programmier-Werkzeug, es ist ein Zugriffs-Werkzeug. Es darf auf deine Dateien schauen. Genau das ist der Punkt. Berater, Coaches und Agenturinhaber holen daraus mehr raus als viele Entwickler, weil sie mehr Wissen haben und weniger Zeit.",
  },
  {
    glaube: "Ich bleibe in der App, das reicht mir doch.",
    wahrheit:
      "Für einzelne Fragen reicht es. Für alles, was über mehrere Wochen läuft, nicht. Die App kennt dein Gespräch. Sie kennt nicht dein Geschäft. Und was du dort hineinschreibst, liegt nicht bei dir, sondern in einem Verlauf, den du weder durchsuchen noch weitergeben kannst.",
  },
  {
    glaube: "Sowas aufzusetzen dauert Wochen.",
    wahrheit:
      "Der Kern sind ein Ordner und eine Textdatei. Das erste brauchbare Second Brain steht in unter einer Stunde. Alles danach ist Pflege, nicht Aufbau.",
  },
] as const;

/* Was Wissen im Chat von Wissen auf der Platte unterscheidet. */
export const VERGLEICH = [
  {
    thema: "Wo es liegt",
    chat: "Im Verlauf eines Anbieters",
    lokal: "In einem Ordner auf deinem Rechner",
  },
  {
    thema: "Wer drankommt",
    chat: "Genau ein Chatfenster",
    lokal: "Jedes Werkzeug, das Dateien lesen kann",
  },
  {
    thema: "Wenn du wechselst",
    chat: "Du fängst von vorne an",
    lokal: "Du nimmst alles mit",
  },
  {
    thema: "Suchen",
    chat: "Scrollen und hoffen",
    lokal: "Volltext in Sekunden",
  },
  {
    thema: "Neue Session",
    chat: "Claude weiß wieder nichts",
    lokal: "Claude liest sich selbst ein",
  },
] as const;

export const FAQ = [
  {
    q: "Baue ich im Webinar selbst etwas mit?",
    a: "Nein, und das ist Absicht. Ich zeige dir mein eigenes System, wie es aufgebaut ist und was ich täglich damit mache. Zusehen und verstehen geht in einer Stunde, selbst aufbauen nicht. Den Aufbau mit deinen eigenen Daten machen wir im Kurs.",
  },
  {
    q: "Muss ich programmieren können?",
    a: "Nein. Wir schreiben im Webinar keine Zeile Code. Du siehst Ordner, Textdateien und ein Terminalfenster, in das du Sätze auf Deutsch tippst.",
  },
  {
    q: "Brauche ich einen bezahlten Claude-Zugang?",
    a: "Zum Zuschauen nicht. Zum Nachbauen hilft ein Abo, weil Claude Code daran hängt. Ich sage dir im Webinar ehrlich, was du wirklich brauchst und was nicht.",
  },
  {
    q: "Mac oder Windows?",
    a: "Ich arbeite auf dem Mac und zeige es dort. Der Aufbau funktioniert unter Windows identisch, die Ordner heißen nur anders.",
  },
  {
    q: "Ist das eine verkappte Verkaufsveranstaltung?",
    a: "Nein, aber ich mache auch kein Geheimnis daraus: am Ende stelle ich meinen Kurs vor, der am 24. September startet, mit maximal 10 Plätzen. Das sage ich dir lieber vorher als hinterher. Die 60 Minuten davor funktionieren komplett für sich, auch wenn du danach nie wieder von mir hörst.",
  },
  {
    q: "Für wen ist das nichts?",
    a: "Wenn du einen Prompt-Trick für heute Nachmittag suchst. Wenn du willst, dass jemand anderes das einrichtet und du nie hinschaust. Und wenn du Entwickler bist und Claude Code schon gut kennst, dann lernst du hier wenig Neues.",
  },
  {
    q: "Ich kann live nicht.",
    a: "Trag dich trotzdem ein. Die Aufzeichnung geht am Tag danach an alle Angemeldeten raus.",
  },
] as const;
