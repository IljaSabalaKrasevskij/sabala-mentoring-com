---
name: vor-dem-livegang
description: Prüft eine Webseite oder Landingpage, bevor sie veröffentlicht oder einem Kunden gezeigt wird. Geprüft werden Texte, Gestaltung, Handy, Google und KI-Suchen, Formulare, Impressum und Datenschutz sowie Links. Liefert einen Bericht mit Ampel und konkreten Korrekturen. Nutzen bei "prüf meine Seite", "kann das so online", "vor dem Livegang", "ist die Seite fertig" und nach jedem größeren Umbau.
---

# Vor dem Livegang

Eine Seite geht erst online, wenn sie für den Leser funktioniert: verständlich, lesbar, am Handy bedienbar, bei Google auffindbar und rechtlich sauber. Dieser Skill prüft das in einer festen Reihenfolge und schreibt einen Bericht. Geändert wird erst, wenn die Person zustimmt.

## Ablauf

1. **Ziel klären.** Welche Seite, für wen, was soll der Besucher am Ende tun? Ein Satz reicht.
2. **Automatisch prüfen.** Wenn Python 3 da ist:
   `python3 ~/.claude/skills/vor-dem-livegang/seite_pruefen.py https://deine-seite.de/unterseite`
   oder für eine Datei auf dem Rechner mit dem Pfad zur HTML-Datei statt der Adresse. Das Skript liegt im Ordner dieses Skills, in Claude Code meist unter `~/.claude/skills/vor-dem-livegang/`. Unter Windows heißt der Befehl oft `py` statt `python3`. Es prüft Titel, Beschreibung, Überschriften, Bilder ohne Beschreibung, Handy-Einstellung, Vorschaubild, Impressum und Datenschutz, vorab gesetzte Häkchen, kaputte Links und, wenn der Skill `menschlich-schreiben` daneben liegt, auch die Sprache.
   Ohne Python liest du die Seite selbst und gehst dieselben Punkte durch.
   Ein FEHLER des Skripts kommt im Bericht unter Rot, ein HINWEIS unter Gelb. Weichst du davon ab, schreib dazu, warum.
3. **Von Hand prüfen** mit der Liste unten. Was du nicht prüfen kannst (etwa weil kein Browser zur Hand ist), schreibst du ehrlich als offen in den Bericht.
4. **Bericht schreiben** nach der Vorlage am Ende, als normaler Text ohne die Code-Striche drumherum. Die wichtigsten Korrekturen zuerst.
5. **Erst nach Zustimmung ändern.** Danach noch einmal prüfen.

## Die Liste

### Texte
- Läuft das Prüfskript aus `menschlich-schreiben` ohne Fehler? Keine Gedankenstriche, keine Werbefloskeln.
- Stimmen Preise, Termine, Zahlen und Namen überall auf der Seite und auf allen anderen Seiten überein? Eine Zahl, die an zwei Stellen verschieden steht, kostet sofort Vertrauen.
- Versteht ein Besucher in fünf Sekunden, was angeboten wird und für wen?
- Tragen Knöpfe ein Verb und ein Ziel („Termin wählen“)?

### Gestaltung
- Fotos in 1470 × 770, 1366 × 650 und 390 × 844 angesehen (siehe Skill `schoen-gestalten`, Abschnitt 7)?
- Fließtext mindestens 15 px, deckende Schrift, Kontrast mindestens 4,5 zu 1?
- Passt jeder Abschnitt ins Laptop-Fenster? Liegt nirgends Text über einem Gesicht?

### Handy
- Tippflächen mindestens 44 px hoch, Knöpfe über die ganze Breite?
- Nichts ragt über den rechten Rand, nichts muss man seitlich schieben?
- Telefonnummer und Mail-Adresse lassen sich antippen?
- Lässt sich das Formular am Handy ausfüllen, ohne dass die Tastatur das Feld verdeckt?

### Google und KI-Suchen
- Titel höchstens 60 Zeichen, mit dem wichtigsten Begriff vorn.
- Beschreibung höchstens 160 Zeichen, sie sagt, was der Leser hier bekommt.
- Genau eine Hauptüberschrift (H1). Darunter Überschriften, die echte Fragen beantworten („Was kostet das?“).
- Oben auf der Seite steht die kurze Antwort auf die wichtigste Frage. KI-Suchen zitieren gern Seiten, die gleich am Anfang klar antworten.
- Jedes Bild mit Inhalt hat eine Beschreibung (Alt-Text).
- Sprechende Adresse (`/claude-code/startpaket` statt `/seite-2`), Seite in der Sitemap, kein `noindex`.
- Vorschaubild für WhatsApp und LinkedIn (`og:image`) ist gesetzt.

### Formulare und Recht (Deutschland, Österreich, Schweiz)
- Impressum und Datenschutzerklärung sind von jeder Seite aus mit einem Klick erreichbar.
- Häkchen für Werbung oder Newsletter sind nie vorab gesetzt.
- Newsletter nur mit Bestätigungsmail (Double-Opt-in).
- Formular einmal mit eigener Adresse abschicken: Kommt die Anfrage an? Kommt die Mail, und landet sie nicht im Spam?
- Dieser Punkt ersetzt keine Rechtsberatung. Bei Unsicherheit eine Fachperson fragen.

### Technik
- Kein Link führt ins Leere (Fehler 404).
- Bilder sind komprimiert (WebP oder AVIF) und nicht größer, als sie angezeigt werden.
- Die Seite lädt am Handy in wenigen Sekunden.
- Alte Adressen leiten dauerhaft auf die neuen um (301), und die Adresse mit und ohne „www“ führt auf dieselbe Seite.
- Ein Seitensymbol (Favicon) ist da.

## Vorlage für den Bericht

```
Seite:  https://…
Ziel:   Besucher tragen sich für … ein

Rot (vor dem Livegang beheben)
1. …

Gelb (bald beheben)
1. …

Grün
- Titel, Beschreibung, Überschriften, Handy …

Offen (konnte ich nicht prüfen)
- …
```

## Nach dem Livegang

- **Live prüfen, nicht nur auf dem eigenen Rechner.** Die ausgelieferte Seite ist der Maßstab, nicht der Code.
- Die neue Adresse bei der Google Search Console und den Bing Webmaster Tools einreichen, damit sie schneller gefunden wird.
- Nach einer Woche nachsehen: Ist die Seite im Index? Kommen erste Besucher?
