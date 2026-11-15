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
   oder für eine Datei auf dem Rechner mit dem Pfad zur HTML-Datei statt der Adresse. Das Skript liegt im Ordner dieses Skills, in Claude Code meist unter `~/.claude/skills/vor-dem-livegang/`. Unter Windows heißt der Befehl oft `py` statt `python3`. Es prüft Titel, Beschreibung, Überschriften, Bilder ohne Beschreibung, Formularfelder ohne Beschriftung, Handy-Einstellung, Vorschaubild, Impressum und Datenschutz, vorab gesetzte Häkchen, https, fremde Server und kaputte Links und Bilder.
   Das Skript sortiert seine Funde schon nach der Ampel unten: ROT, GELB und OFFEN. Übernimm das so in den Bericht.
   Bei einer Datei auf dem Rechner kann es Links ins Netz nicht prüfen und sagt das unter OFFEN. Prüf die Seite nach dem Hochladen noch einmal mit ihrer Adresse.
   Ohne Python liest du die Seite selbst und gehst dieselben Punkte durch.
3. **Von Hand prüfen** mit der Liste unten. Was du nicht prüfen kannst (etwa weil kein Browser zur Hand ist), schreibst du ehrlich als offen in den Bericht.
4. **Bericht schreiben** nach der Vorlage am Ende, als normaler Text ohne die Code-Striche drumherum. Zu jedem Punkt ein Satz, warum er zählt. Zu jedem roten Punkt schreibst du die Korrektur gleich dazu: die Zeile, die fehlt, oder den Satz, der ersetzt wird.
5. **Erst nach Zustimmung ändern.** Die Korrekturen stehen im Bericht, eingebaut werden sie nach dem Ja. Danach noch einmal prüfen.

## Die Ampel

| Farbe | Was sie heißt | Beispiele |
|---|---|---|
| Rot | So geht die Seite nicht online. Es droht Ärger mit dem Recht, etwas ist kaputt, oder die Seite lässt sich am Handy nicht bedienen. | Impressum oder Datenschutz fehlt, Häkchen für Werbung ist vorab gesetzt, Formular kommt nicht an, falscher Preis, Link oder Bild führt ins Leere, Handy-Einstellung fehlt |
| Gelb | Bald beheben, am besten noch vorher. Es kostet Auffindbarkeit oder Eindruck. | Beschreibung für Google fehlt, Titel sagt nichts, kein Vorschaubild, Bild ohne Beschreibung, Formularfeld ohne Beschriftung |
| Grün | Geprüft und in Ordnung. | |
| Offen | Konnte nicht geprüft werden. Schreib dazu, wer es wie prüfen kann. | Formular nicht abgeschickt, kein Handy zur Hand, Sprache nicht geprüft |

- Jeder Fund kommt in genau eine Farbe, auch die Funde von Hand.
- In jeder Farbe steht das Schwerste oben: erst Recht, dann Bedienung, dann Auffindbarkeit.
- Was kein Mangel der Seite ist, etwa eine Prüfung, die nicht lief, steht unter Offen und nie unter Gelb.

## Die Liste

### Texte
- Keine Gedankenstriche, keine Werbefloskeln. Liegt der Skill `menschlich-schreiben` aus dem Paket Texte daneben, prüft das Skript die Sprache mit. Ohne ihn liest du selbst gegen und schreibst „Sprache von Hand gelesen“ in den Bericht.
- Stimmen Preise, Termine, Zahlen und Namen überall auf der Seite und auf allen anderen Seiten überein? Eine Zahl, die an zwei Stellen verschieden steht, kostet sofort Vertrauen.
- Versteht ein Besucher in fünf Sekunden, was angeboten wird und für wen?
- Tragen Knöpfe ein Verb und ein Ziel („Termin wählen“)?

### Gestaltung
- Fotos in 1470 × 770, 1366 × 650, 1280 × 720 und am Handy 390 × 844 angesehen (siehe Skill `schoen-gestalten`, Abschnitt 7)?
- Fließtext mindestens 15 px, deckende Schrift, Kontrast mindestens 4,5 zu 1?
- Passt jeder Abschnitt ins Laptop-Fenster? Liegt nirgends Text über einem Gesicht?

### Handy
- Tippflächen mindestens 44 px hoch, Knöpfe über die ganze Breite? Miss die Höhe im Browser und schreib die gemessenen Werte in den Bericht.
- Nichts ragt über den rechten Rand, nichts muss man seitlich schieben?
- Telefonnummer und Mail-Adresse lassen sich antippen?
- Lässt sich das Formular am Handy ausfüllen, ohne dass die Tastatur das Feld verdeckt?

### Google und KI-Suchen
- Titel höchstens 60 Zeichen, mit dem wichtigsten Begriff vorn. „Home“ oder „Startseite“ ist kein Titel.
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
- Jedes Formularfeld hat eine sichtbare Beschriftung. Ein Platzhalter im Feld reicht nicht, er verschwindet beim Tippen.
- Formular einmal mit eigener Adresse abschicken: Kommt die Anfrage an? Kommt die Mail, und landet sie nicht im Spam?
- Preise: Steht bei jedem Preis, ob er mit oder ohne Mehrwertsteuer gilt? Wer an Privatkunden verkauft, nennt den Endpreis.
- Wird auf der Seite direkt gekauft oder gebucht? Dann braucht es mehr, etwa Geschäftsbedingungen, eine Widerrufsbelehrung und einen Kaufknopf mit klarer Aufschrift wie „Zahlungspflichtig bestellen“. Das gehört vor dem Livegang zu einer Fachperson.
- Fremde Dienste: Lädt die Seite Schriften, Karten, Videos oder Zählwerkzeuge von fremden Servern? Dann stehen sie in der Datenschutzerklärung, und was nicht nötig ist, lädt erst nach Zustimmung. Schriften legst du am besten auf den eigenen Server.
- Dieser Abschnitt ersetzt keine Rechtsberatung. Bei Unsicherheit eine Fachperson fragen.

### Technik
- Kein Link und kein Bild führt ins Leere (Fehler 404).
- Die Adresse beginnt mit `https`, und die Fassung mit `http` leitet dorthin um.
- Bilder sind komprimiert (WebP oder AVIF) und nicht größer, als sie angezeigt werden.
- Die Seite lädt am Handy in wenigen Sekunden.
- Alte Adressen leiten dauerhaft auf die neuen um (301), und die Adresse mit und ohne „www“ führt auf dieselbe Seite.
- Ein Seitensymbol (Favicon) ist da.

## Vorlage für den Bericht

```
Seite:  https://…
Ziel:   Besucher tragen sich für … ein

Rot (so nicht online gehen)
1. … Warum: … Korrektur: …

Gelb (bald beheben)
1. … Warum: …

Grün
- Titel, Beschreibung, Überschriften, Handy …

Offen (konnte ich nicht prüfen)
- … Wer es prüfen kann: …

Geändert habe ich noch nichts. Sag Ja, dann behebe ich zuerst alles unter Rot.
```

## Nach dem Livegang

- **Live prüfen, nicht nur auf dem eigenen Rechner.** Die ausgelieferte Seite ist der Maßstab, nicht der Code.
- Die neue Adresse bei der Google Search Console und den Bing Webmaster Tools einreichen, damit sie schneller gefunden wird.
- Nach einer Woche nachsehen: Ist die Seite im Index? Kommen erste Besucher?
