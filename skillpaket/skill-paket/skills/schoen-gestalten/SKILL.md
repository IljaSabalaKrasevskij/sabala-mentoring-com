---
name: schoen-gestalten
description: Gestaltet Webseiten, Landingpages, einzelne Abschnitte, Präsentationen und PDFs so, dass sie hochwertig aussehen, für alle gut lesbar sind (auch für Leser ab 50) und nicht nach KI-Vorlage wirken. Nutzen beim Bauen oder Überarbeiten jeder sichtbaren Seite oder Folie, bei "mach das schöner", "sieht billig aus", "wirkt wie eine Vorlage" und bevor eine Seite jemandem gezeigt wird.
---

# Schön gestalten

Hochwertig wirkt eine Seite, wenn das Auge sofort weiß, wohin es schauen soll, sich alles leicht lesen lässt und die Seite nach der Marke aussieht statt nach einer Vorlage.

## 1. Lesbar für alle, auch ab 50

- **Schriftgrößen** am Laptop und am Handy:
  - Fließtext und Listen mindestens 15 px, besser 16 bis 18 px
  - Einleitungen mindestens 16 px
  - kleine Hinweise mindestens 13,5 px
  - Überzeilen in Großbuchstaben und Knopf-Beschriftungen mindestens 12,5 px
- **Deckende Schrift.** Keine blasse oder halb durchsichtige Schrift, auch nicht für Nebensachen oder „inaktive“ Zustände. Hervorheben geht über Farbe, Größe oder eine Linie.
- **Kontrast** zwischen Schrift und Grund mindestens 4,5 zu 1. Auf Fotos nur mit dunklem Schleier dahinter.
- **Zeilen** höchstens etwa 70 Zeichen breit, Zeilenabstand um 1,5.
- **Die Kernbotschaft steht groß.** Nie die wichtigste Aussage in die kleine Überzeile packen.
- Wenn Platz fehlt, sparst du an Abständen, Bildern und Text, nie an der Schriftgröße.

## 2. Eine Botschaft je Abschnitt

- Jeder Abschnitt hat eine Aufgabe, und seine Überschrift sagt sie.
- **Überschrift in zwei Takten:** erst die Aussage, dann die Pointe in der Akzentfarbe. Zum Beispiel: „Was ich selbst nutze. Gratis für dich.“
- **Frageworte in Überschriften,** wo es passt: „Was kostet das?“, „Für wen ist das?“. Leser fühlen sich gemeint, und Google und KI-Suchen finden die Antwort.
- **Höchstens rund 100 Wörter je Abschnitt.** Den Rest tragen Bild, Karte oder Grafik.
- **Ein Hauptknopf je Abschnitt,** mit Verb und Ziel: „Startpaket holen“, „Termin wählen“. Ein Knopf, der nur „Weiter“ oder „Klick hier“ sagt, verschenkt den Klick.

## 3. Jeder Abschnitt passt ins Fenster

Ein Abschnitt muss am Laptop ganz ins Browserfenster passen, ohne Scrollen innerhalb des Abschnitts. Miss an echten Fenstergrößen nach Abzug von Menü und Browserleisten: 1470 × 770 (MacBook Air), 1366 × 650 (kleiner Laptop), 1280 × 720, und am Handy 390 × 844. Ausgenommen sind lange Formulare.

Passt es nicht, gehst du in dieser Reihenfolge vor:
1. Inhalt nebeneinander statt untereinander, etwa Text links und Bild rechts.
2. Den Knopf in die Karte holen statt in eine eigene Zeile darunter.
3. Listenpunkte so kürzen, dass sie am Laptop einzeilig bleiben.
4. Bildhöhe an die Fensterhöhe koppeln, zum Beispiel `height: clamp(120px, calc(100svh - 540px), 200px)`.
5. Abstände in `vh` statt in festen Pixeln.

## 4. Reich, aber mit Luft

- **Bildsprache macht den Wert:** echte Fotos, eigene Illustrationen, Icons aus einer Bibliothek (zum Beispiel Lucide), Farbflächen, große Zahlen. Eine Seite nur aus Text wirkt leer.
- **Und trotzdem Luft:** lieber ein großes Bild als zehn kleine Kacheln. Keine Wände aus Abzeichen, Etiketten und Mini-Karten.
- **Farbrhythmus:** Zwei benachbarte Abschnitte haben nie denselben Hintergrund. Wechsle hell, dunkel und Bild.
- **Ein Bildmotiv** zieht sich durch die Seite. Menschen auf Bildern passen zur Zielgruppe, in Alter und Umfeld.
- **Nie Text über Gesichtern.** Bild und Text bekommen eigene Bereiche, etwa Text links, Foto rechts.
- **Heller Text auf dunklem Kopfbild** ist sicherer als dunkler Text auf einem hellen Foto.

## 5. Nicht nach KI-Vorlage

Seiten aus dem Baukasten der KI sehen sich ähnlich. Vermeide ihre typischen Zeichen:
- lila-blaue Verläufe, Glitzer und Emojis als Icons,
- eine Schrift, die man von hundert anderen KI-Seiten kennt,
- Creme-Grund mit Terrakotta-Orange als einzige Idee,
- endlose Raster aus Karten mit Icon, Überschrift und zwei Zeilen,
- gestrichelte Rahmen um offene Stellen. Markiere Offenes ruhig, etwa mit einem kleinen farbigen Punkt.

Leite Farben und Schrift aus der Marke ab: Logo, Fotos, Branche, Persönlichkeit. Schlag zwei bis drei Schriftpaare mit Begründung vor und zeig sie mit der echten Überschrift der Seite, statt still eine zu setzen.

## 6. Bedienung

- Das Logo oben links führt auf jeder Seite zur Startseite.
- Tippflächen am Handy mindestens 44 px hoch, auch Links im Text und Häkchen.
- Knöpfe am Handy über die ganze Breite.
- Der erste Bildschirm steht sofort, ohne Einblenden. Bewegung darunter sparsam und mit Sinn.
- Wer am Gerät „Bewegung reduzieren“ eingestellt hat, bekommt eine ruhige Seite.

## 7. Prüfen, bevor du es zeigst

1. **Fotos in drei Größen:** 1470 × 770, 1366 × 650 und am Handy 390 × 844. Wenn du einen Browser steuern kannst (zum Beispiel mit Playwright oder einer Browser-Erweiterung), machst du die Fotos selbst. Am Handy fotografierst du Bildschirm für Bildschirm, nicht als ein langes Bild.
2. **Jedes Foto ansehen:** Passt jeder Abschnitt ins Fenster? Ist alles lesbar? Liegt Text über einem Gesicht? Läuft etwas über den Rand?
3. **Im Browser messen,** nicht nur im Code: Schriftgrößen, Kontrast, Deckkraft. Schleier, Bilder und durchsichtige Ebenen zählen mit.
4. **Erst wenn es dich selbst überzeugt,** zeigst du es. Sag dazu, wo die Seite hängt und wozu sie da ist.
