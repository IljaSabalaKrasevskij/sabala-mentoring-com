# Start hier: Skill-Paket Entwicklung

Sauber bauen und dabei Tokens sparen. Mit diesen drei Skills hält Claude Code das Gedächtnis der Unterhaltung schlank, achtet auf die Sicherheits-Grundlagen und bringt eine Änderung geordnet bis live.

Dieses Paket ist für Claude Code gedacht, also für die Arbeit an Software.

## Die drei Skills

| Skill | Was er macht | Wofür du ihn nutzt |
|---|---|---|
| tokens-sparen | Hält den Verlauf schlank: erst suchen, gezielt lesen, große Ausgaben in Dateien, Zwischenstand notieren, die kleinste Lösung zuerst. Macht aus der Regeldatei einen Wegweiser. | lange Sitzungen, große Projekte, eine gewachsene CLAUDE.md |
| sicher-bauen | Achtet beim Schreiben von Code auf Eingaben, Anmeldung, Rechte und Geheimnisse und belegt es am Ende mit echten Proben. | Formulare, Login, Datenbanken, öffentliche Repositories |
| sauber-ausliefern | Führt eine Änderung vom Auftrag bis live: Plan, eigener Zweig, nur eigene Dateien, alle Tests, klare Beschreibung, live erst nach deinem Ja. | eigene Apps, Kundenprojekte, Arbeit im Team |

Tokens sind die Einheit, in der Claude Text zählt und abrechnet. Alles, was in der Unterhaltung steht, wird bei jeder Antwort neu mitgelesen.

## So greifen sie ineinander

1. **Schlank starten:** `tokens-sparen` räumt die Regeldatei auf und sorgt dafür, dass Claude sucht, bevor es liest.
2. **Sicher bauen:** `sicher-bauen` läuft mit, sobald Formulare, Anmeldung oder eine Datenbank im Spiel sind.
3. **Geordnet liefern:** `sauber-ausliefern` führt vom Plan bis zur geprüften Live-Adresse.

## Fertige Aufträge zum Ausprobieren

- „Räum meine CLAUDE.md nach tokens-sparen auf. Nichts darf verloren gehen, nenn mir die Zeilen vorher und nachher.“
- „Die Sitzung ist lang geworden. Schreib den Zwischenstand in eine Datei, damit ich neu anfangen kann.“
- „Bau ein Kontaktformular mit Datenbank. Halte dich an sicher-bauen und zeig mir am Ende den Sicherheits-Check.“
- „Ich mache das Repository gleich öffentlich. Prüf vorher nach sicher-bauen, ob Geheimnisse drin liegen.“
- „Bring diese Korrektur nach sauber-ausliefern bis zum fertigen Commit und frag mich vor dem Livegang: [Korrektur]“

## Vorher und Nachher

Aus dem Test vom November 2026: Ein unabhängiger Tester hat denselben Auftrag erst ohne Skill gelöst, dann mit. Die Ausschnitte sind wörtlich übernommen. Die Betriebe in den Beispielen sind erfunden. Wo der Tester einen Skill unklar fand, habe ich ihn danach nachgebessert.

**sicher-bauen**

Auftrag: „Schreib die Server-Route für ein Newsletter-Formular mit Bestätigungsmail in Node.js, die Einträge landen in SQLite.“

Ohne Skill:

```
Vor dem Livegang fehlt noch:
- echter Mailversand
- eine Bremse gegen Massenanmeldungen (Rate-Limit) und ein Schutz gegen Bots
- ein Abmeldelink in jeder Mail
```

Mit Skill:

```
Je Absender 5 in 15 Minuten: von 20 gleichzeitigen kommen genau 5 durch. Je Adresse 3 Mails in 24 Stunden: von 20 gleichzeitigen gehen 3 Mails raus.
```

Was sich geändert hat: Die Bremse ist gebaut und gemessen, statt als offener Punkt zu enden. Im Test gingen ohne Skill bei 20 gleichzeitigen Anmeldungen 20 Mails raus.

**sauber-ausliefern**

Auftrag: „Ändere in index.html die Telefonnummer und speichere das in Git. Mein Kollege hat noch offene Änderungen im Ordner.“

Ohne Skill:

```
Der Ordner steht jetzt auf diesem Zweig. Für deinen Kollegen ändert sich an seinen Dateien nichts, aber wenn er als Nächstes speichert, landet das auch auf diesem Zweig. Sag ihm kurz Bescheid.
```

Mit Skill:

```
Gespeichert als Commit 15e3b7f auf dem eigenen Zweig telefonnummer-aendern, in einer eigenen Arbeitskopie. Im Ordner deines Kollegen habe ich nichts verändert.
```

Was sich geändert hat: Der Ordner des Kollegen bleibt, wie er war. Seine offene Arbeit ist gesichert, und vor dem Hauptzweig kommt eine direkte Frage.

**tokens-sparen**

Auftrag: „Meine CLAUDE.md ist gewachsen und Claude wird langsam. Räum sie auf, ohne dass Wissen verloren geht.“

Ohne Skill:

```
Deine CLAUDE.md ist aufgeräumt. Vorher 115 Zeilen, nachher 52 Zeilen.
```

Mit Skill:

```
Deine CLAUDE.md ist jetzt ein Wegweiser. Vorher 115 Zeilen (8.084 Zeichen), nachher 24 Zeilen (974 Zeichen).
```

Was sich geändert hat: Claude liest bei jedem Start rund 88 Prozent weniger Text mit statt rund 70 Prozent. Verloren ging nichts, die Inhalte liegen in eigenen Dateien.

## Mach die Skills zu deinen

- **Deine Regeldatei:** In `tokens-sparen` steht eine Vorlage für eine schlanke CLAUDE.md. Füll sie mit den Orten und Regeln deines Projekts.
- **Deine Pflichten:** Die sechs Pflichten in `sicher-bauen` nennen Beispiele wie zod. Trag ein, was dein Projekt nutzt.
- **Dein Weg nach live:** In `sauber-ausliefern` steht ein Beispiel für den Merge. Schreib hinein, wie bei dir ausgeliefert wird und wie der Rückweg aussieht.

## Passt dazu von GitHub

Skills und Plugins anderer Entwickler, die ich zusätzlich nutze. Sie liegen nicht in diesem Paket, du holst sie beim Original.

- **ponytail** (Lizenz MIT, github.com/DietrichGebert/ponytail): bringt Claude dazu, die einfachste Lösung zu bauen, die wirklich läuft. Das spart Platz im Gedächtnis und schont dein Kontingent.

      /plugin marketplace add DietrichGebert/ponytail
      /plugin install ponytail@ponytail

- **planning-with-files** (Lizenz MIT, github.com/OthmanAdi/planning-with-files): legt bei großen Aufgaben Plan, Notizen und Fortschritt als Dateien im Projekt ab. Nach einem Neustart liest Claude dort nach und macht weiter.

      /plugin marketplace add OthmanAdi/planning-with-files
      /plugin install planning-with-files@planning-with-files

- **claude-hud** (Lizenz MIT, github.com/jarrodwatts/claude-hud): zeigt unten im Terminal, wie voll das Gedächtnis der Unterhaltung ist. Nach der Installation tippst du einmal `/hud`. Es braucht Node.js ab Version 22.18.

      /plugin marketplace add jarrodwatts/claude-hud
      /plugin install claude-hud@claude-hud

Vor dem Installieren eines fremden Skills: die fünf Prüfpunkte in „01 Installation“.

## Gut zu wissen

- Wie du die Skills einrichtest, steht in „01 Installation“.
- `sicher-bauen` deckt die Grundlagen ab. Es ersetzt keine Prüfung durch Sicherheits-Fachleute.
- Befehle wie `/context`, `/usage`, `/clear` und `/compact` gehören zu Claude Code.
- Was sich geändert hat: `AENDERUNGEN.md`. Was du mit den Skills machen darfst: `LIZENZ.md`.

Ilja
