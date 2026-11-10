import { COCKPIT_EINRICHTUNG_PREIS, CURRENT_COHORT, TERMIN_NAMEN, formatSessionDate, zeitText } from "./cohorts";

/* Fragen und Antworten der Kursseite. Eigene Datei ohne "use client", weil die Seite dieselben
   Texte auch als maschinenlesbare Angaben (FAQPage) an Google und KI-Suchen gibt.
   Ein Zeilenumbruch in einer Antwort wird auf der Seite als neue Zeile gezeigt. */

const TERMINE = CURRENT_COHORT
  ? `${CURRENT_COHORT.sessions.map((s, i) => `${TERMIN_NAMEN[i] ?? s.label}: ${formatSessionDate(s.date)}, ${zeitText(s.time)}`).join("\n")}\nDie Uhrzeiten gelten für Deutschland. Wir treffen uns live per Zoom.`
  : "Der nächste Termin wird gerade geplant. Trag dich auf die Warteliste ein, dann bekommst du ihn per Mail.";

export const FRAGEN: [frage: string, antwort: string][] = [
  ["Wann findet der nächste Kurs statt?", TERMINE],
  ["Was ist die Fragestunde?", "Nach den beiden Workshops arbeitest du ein paar Tage mit deinem Setup. In der Fragestunde bringst du mit, was dabei offen geblieben ist, und wir klären es gemeinsam. Die Stunde ist im Preis enthalten."],
  ["Was ist der Bonus?", "Du bekommst den ganzen Code meines Social Media Cockpits geschenkt. Damit planst du deinen Social-Media-Content im eigenen Kalender, mit Claude Code und ohne Notion."],
  ["Was kostet die gemeinsame Einrichtung des Cockpits?", `Den Code bekommst du geschenkt und kannst ihn selbst einrichten. Wenn du das lieber gemeinsam mit mir machst, kostet die Einrichtung ${COCKPIT_EINRICHTUNG_PREIS} € zzgl. MwSt. Sie ist freiwillig.`],
  ["Ich habe noch nie das Terminal benutzt. Ist das ein Problem?", "Nein. Wir richten das Terminal im zweiten Workshop gemeinsam ein, von Anfang an. Du gehst mit einer Umgebung raus, die läuft, egal wie viel Technik du vorher kanntest."],
  ["Brauche ich Claude Code Pro?", "Ja. Für den zweiten Workshop ist Claude Code Pro Pflicht, sonst kannst du nicht sinnvoll mitarbeiten. Der erste Workshop geht ohne. Für das fertige Memory-System brauchst du es."],
  ["Ich habe Obsidian schon. Fange ich trotzdem von vorne an?", "Nein. Wir schauen gemeinsam auf dein bestehendes Setup und bauen das System dort ein, wo es Sinn ergibt."],
  ["Was, wenn ich an einem Termin nicht kann?", "Wir bauen dein System live. Plane deshalb beide Workshops mit je 2,5 Stunden fest ein. Die Fragestunde gibt dir danach Raum für alles, was offen ist. Der Kurs ist kein Aufzeichnungsprodukt."],
  ["Für wen ist der Kurs nicht gedacht?", "Für alle, die nur nebenbei zuschauen wollen. Die Plätze sind für Teilnehmer, die beide Workshops einplanen und ihr Setup wirklich einrichten."],
  ["Ist das für Mac und Windows?", "Beides funktioniert. Obsidian, Gemini Notebook und Claude Code laufen auf beiden Systemen. Unterschiede klären wir im Workshop."],
];
