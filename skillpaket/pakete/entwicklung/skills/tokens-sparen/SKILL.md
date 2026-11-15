---
name: tokens-sparen
description: Hält das Gedächtnis der Unterhaltung (den Kontext) schlank und spart Kontingent beim Arbeiten mit Claude Code. Erst suchen, dann gezielt lesen, die Regeldatei als Wegweiser, große Ausgaben in Dateien, Zwischenstand notieren, einfachste Lösung zuerst. Nutzen bei langen Sitzungen, großen Projekten, großen Lese-Aufgaben, vor dem Einsatz von Helfern (Subagenten) und wenn eine CLAUDE.md aufgeräumt werden soll. Auch bei "spar Tokens", "Kontext ist voll", "Limit erreicht", "Claude wird langsam" oder "räum meine CLAUDE.md auf".
---

# Tokens sparen

Tokens sind die Einheit, in der Claude Text zählt und abrechnet. Alles, was in der Unterhaltung steht, wird bei jeder Antwort neu mitgelesen. Ein voller Verlauf macht Claude also teurer, langsamer und unschärfer. Dieser Skill hält ihn schlank, ohne an der Qualität zu sparen.

## Die Reihenfolge

1. **Messen.** `/context` zeigt, wie voll das Gedächtnis der Unterhaltung ist, `/usage` zeigt den Verbrauch. Beide Befehle tippt der Mensch. Du selbst misst, was du messen kannst: Zeilen und Zeichen einer Datei, zum Beispiel mit `wc -l` und `wc -c`. Nenn die Zahlen vorher und nachher.
2. **Erst suchen, dann lesen.** Such nach Dateinamen und Stichworten und lies danach gezielt die eine Datei oder den einen Abschnitt. Ganze Ordner liest du nie auf Verdacht.
3. **Erst nachsehen, dann fragen.** Bevor du den Menschen fragst: Projektdateien und Regeldatei, Notizen, frühere Ergebnisse. Du fragst nur, wenn es um eine echte Vorliebe geht oder Quellen sich widersprechen. Mehrere offene Punkte stellst du gebündelt in einer Nachricht.
4. **Kleinste Lösung zuerst.** Muss das überhaupt gebaut werden? Gibt es das schon im Projekt, in der Sprache oder im Framework? Erst dann schreibst du das Minimum, das läuft.
5. **Zwischenstand in eine Datei,** sobald eine Aufgabe länger als eine Sitzung dauert. So kann eine neue Unterhaltung weitermachen, ohne dass jemand nacherzählt. Bei einer kurzen Aufgabe entfällt das.
6. **Aufgabe fertig: neue Unterhaltung.** `/clear` nach einer erledigten Aufgabe, `/compact` bei einem langen Verlauf mitten in einer Aufgabe. Eine Aufgabe, eine Unterhaltung.

## Die Regeldatei ist ein Wegweiser

Die CLAUDE.md wird in jeder Unterhaltung geladen. Jede Zeile darin kostet also immer.

- Sie sagt vor allem, **wo** etwas liegt. Die Inhalte stehen in eigenen Dateien und werden erst gelesen, wenn sie gebraucht werden.
- Winzige Dauerfakten, die fast jede Aufgabe braucht, bleiben drin: der Stack in drei Zeilen, die Sprache der Antworten.
- Eine Seite reicht. Kürzer ist besser.
- Regeln sind konkret: „Antworte auf Deutsch“ wirkt, „Es wäre schön, wenn“ kaum.
- Ein Fakt steht an genau einer Stelle. Alle anderen Dateien verweisen dorthin.
- Keine zweite Regeldatei daneben, die etwas anderes sagt.
- Was sich wiederholt, wird beim zweiten Mal ein Skill statt ein Absatz in der Regeldatei.

```
# [Projekt]
> Diese Datei ist ein Wegweiser, kein Lager. Sie sagt nur, wo du nachschaust.

## Zuerst suchen, dann fragen
[Suchbefehl oder Reihenfolge der Orte]. Danach gezielt die eine Datei lesen.

## Gilt immer
[drei bis sechs konkrete Regeln: Sprache, Ton, was nie ohne ausdrückliches Ja passiert]

## Wegweiser
| Wenn es geht um … | dann lies |

## Stand
[was fertig ist, was als Nächstes kommt, ein bis zwei Zeilen]
```

Beim Aufräumen einer gewachsenen Regeldatei geht nichts verloren:

1. Leg zuerst eine Kopie des Originals mit Datum im Namen ab, an einem Ort, den Claude nicht automatisch liest.
2. Verschieb Abschnitte in eigene Dateien in einem Ordner, zum Beispiel `docs/`.
3. Doppeltes darfst du zusammenführen und gleichförmige Zeilen zu einer Tabelle verdichten. Jede Zusammenführung nennst du in der Meldung.
4. Widersprechen sich zwei Regeln, entscheidest du nicht selbst. Du fragst.
5. Verweise schreibst du als Pfad im Text. Ein Verweis mit `@` davor lädt die Datei sofort mit und spart nichts.
6. Am Ende prüfst du, dass jeder Verweis auf eine vorhandene Datei zeigt, und zählst nach: Steht jede Zeile des Originals noch irgendwo?

## Große Ausgaben bleiben draußen

- Lange Protokolle, Suchergebnisse, abgerufene Webseiten und Tabellen gehören in eine Datei, in den Verlauf kommt nur der Auszug, den du brauchst.
- Fakten ziehst du per Befehl oder kleinem Skript aus dem Text, statt alles zu lesen.
- PDFs und lange Dokumente liest du in Teilen. Erst das Inhaltsverzeichnis oder die Suche, dann die eine Stelle.
- Erzeugte Dateien, die sich wiederholen, änderst du am Erzeuger und baust neu, statt sie Stelle für Stelle nachzubessern.
- Wähl Wege mit kleiner Ausgabe: lieber ein kurzer Befehl mit Ergebniszeile als einer, der hundert Zeilen Fortschritt schreibt.

## Helfer kosten extra

Jeder Helfer (Subagent) liest sich neu ein und verbraucht eigene Tokens.

- Standard ist: allein arbeiten, Datei für Datei.
- Ein Helfer lohnt sich für eine abgetrennte Lese- oder Denkaufgabe, deren Ergebnis ein kurzer Bericht ist.
- Vor mehreren Helfern nennst du Anzahl und Modell und wartest auf das Ja.
- Kleines Modell fürs Suchen, mittleres als Standard, großes nur für schwere Denkarbeit.
- Jeder Helfer schreibt sein Ergebnis in eine Datei. Bricht etwas ab, ist die bezahlte Arbeit noch da.

## Zwischenstand, der einen Neustart übersteht

```
# Fortschritt: [Aufgabe]
## Ziel
## Erledigt
## Nächster Schritt
## Offene Fragen
## Nachweis   [Test, Befehl oder Adresse, an der man sieht, dass es läuft]
```

Jede neue Unterhaltung liest diese Datei zuerst.

## Modell und Antworten

- Für die meisten Aufgaben reicht das mittlere Modell (`/model`). Für Einfaches senkst du den Denkaufwand (`/effort`).
- Erst die kurze Antwort, Einzelheiten auf Nachfrage. Die Antwort ist so lang wie der Auftrag.
- Gibt es mehrere Wege, nenn den einfachsten und sag, warum.
- Liegt ein API-Schlüssel in der Umgebung, kann Claude Code darüber abrechnen statt über das Abo. Für die tägliche Arbeit gehört er dort nicht hin.

## Woran nie gespart wird

Kürzer heißt nie unsicherer. Die Prüfung von Eingaben, die Behandlung von Fehlern, Sicherheit und Barrierefreiheit bleiben vollständig, auch wenn es mehr Zeilen kostet.

## Prüfen, bevor du fertig meldest

- Sind die Zahlen vorher und nachher genannt?
- Nach einem Aufräumen: Gibt es die Kopie des Originals, zeigt jeder Verweis auf eine Datei, ist nichts verloren?
- Stand vor dem Lesen eine Suche, und liegen große Ausgaben in Dateien?
- Lief ein Helfer nur nach dem Ja?
- Bei einer langen Aufgabe: Liegt der Zwischenstand in einer Datei?
- Ist die Lösung die kleinste, die läuft, mit vollständiger Prüfung der Eingaben?
