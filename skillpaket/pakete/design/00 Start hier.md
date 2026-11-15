# Start hier: Skill-Paket Design

Seiten, die hochwertig wirken. Mit diesen drei Skills gestaltet Claude lesbar und eigenständig, hält Bilder in einem Stil und prüft jede Seite, bevor sie online geht.

## Die drei Skills

| Skill | Was er macht | Wofür du ihn nutzt |
|---|---|---|
| schoen-gestalten | Gestaltet Webseiten, Folien und PDFs so, dass sie hochwertig aussehen und für alle lesbar sind, auch für Leser ab 50. Ohne den Look aus dem KI-Baukasten. | neue Seiten, einzelne Abschnitte, Präsentationen, PDFs |
| bilder-mit-stil | Legt den Stil einmal fest, schreibt die Bild-Aufträge mit festem Stil-Satz und prüft jedes erzeugte Bild auf typische KI-Fehler. | Titelbilder, Illustrationen für Artikel, Beitragsbilder, Figuren |
| vor-dem-livegang | Prüft Texte, Gestaltung, Handy, Google, Formulare und Impressum in einem Durchgang. Mit Prüfskript für jede Adresse und einem Bericht mit Ampel. | neue Seiten, Übergaben an Kunden, größere Umbauten |

## So greifen sie ineinander

1. **Gestalten:** `schoen-gestalten` sorgt für Schrift, Abstände, Farbe und Aufbau.
2. **Bebildern:** `bilder-mit-stil` liefert die Aufträge für dein Bild-Werkzeug und prüft, was zurückkommt.
3. **Prüfen:** `vor-dem-livegang` findet, was vor dem Start noch fehlt.

## Fertige Aufträge zum Ausprobieren

- „Mach diesen Abschnitt schöner. Nutze schoen-gestalten und zeig mir erst, was du ändern willst: [Datei oder Adresse]“
- „Leg mit mir eine Stil-Karte für meine Bilder an. Nutze bilder-mit-stil.“
- „Ich brauche vier Illustrationen für meinen Artikel über [Thema], alle im selben Stil. Schreib mir die Aufträge für mein Bild-Werkzeug.“
- „Prüf dieses Bild auf KI-Fehler, bevor ich es einbaue.“ (Bild anhängen)
- „Prüf meine Seite https://… mit vor-dem-livegang und schreib mir den Bericht.“

## Vorher und Nachher

Aus dem Test vom November 2026: Ein unabhängiger Tester hat denselben Auftrag erst ohne Skill gelöst, dann mit. Die Ausschnitte sind wörtlich übernommen. Die Betriebe in den Beispielen sind erfunden. Wo der Tester einen Skill unklar fand, habe ich ihn danach nachgebessert.

**schoen-gestalten**

Auftrag: „Mach diesen Abschnitt schöner. Es ist die Startseite vom Yogastudio Lindenhof in Kassel, Kurse für Anfänger ab 40, die Probestunde ist kostenlos.“ Der Ausgang war ein lila Verlauf mit Emojis und drei Karten, in denen dreimal derselbe Satz stand. Hier steht, was Claude zu den Karten schreibt.

Ohne Skill:

```
Drei Karten mit drei verschiedenen Aussagen. Vorher stand dreimal derselbe Satz darin. Gestrichelte Rahmen und Emojis sind weg, die Karten sind schlichte weiße Flächen mit Überschrift und einem Satz. „Community“ heißt jetzt „Gemeinschaft“.
```

Mit Skill:

```
Eine Tafel statt drei Karten. In den drei Karten stand dreimal derselbe Satz, mit gestricheltem Rahmen und Emojis. Jetzt gibt es eine Tafel mit einer großen Zahl (0 €), zwei Fragen als Überschriften („Was kostet die Probestunde?“, „Was erwartet dich?“) und deinen drei Themen als kurze Liste.
```

Was sich geändert hat: Ich habe beide Fassungen nachgemessen. In einem Laptop-Fenster von 1366 × 650 war der Abschnitt ohne Skill 749 px hoch, man musste also scrollen. Mit Skill sind es 451 px. Die Überschrift trägt jetzt beide Aussagen („Yoga für Anfänger ab 40. Die Probestunde ist kostenlos.“). Ohne Skill stand „kostenlos“ nur im Fließtext und im Knopf. Die Bildschirmfotos dazu stehen auf der Seite der Skill-Pakete.

**bilder-mit-stil**

Auftrag: „Ich bin Hochzeitsfotografin und brauche vier Illustrationen für meinen Blog-Artikel, alle im selben ruhigen, warmen Stil.“ Hier steht, wo das Licht festgelegt wird.

Ohne Skill, im Motiv von Bild 1:

```
Motiv: Ein helles Kleid hängt an einem Holzbügel vor einem Fenster. Daneben steht ein Stuhl, auf dem ein Blumenstrauß liegt, davor ein Paar Schuhe. Auf der Fensterbank liegt eine Kamera. Stilles Zimmer, Morgenlicht.
```

Mit Skill, wortgleich in allen vier Aufträgen:

```
Licht: weiches Tageslicht von links, sanfte Schatten. Farbwelt: warme gedeckte Töne, Sand, Leinen, helles Ocker, gedämpftes Salbeigrün. Akzent: Terrakotta, sparsam, nur an einem kleinen Gegenstand. Stimmung: ruhig, warm, aufgeräumt.
no text, no logos, no signatures, no watermark, no people, no hands, no figures
```

Was sich geändert hat: Ohne Skill steht das Licht im Motiv und wechselt von Bild zu Bild, einmal „Morgenlicht“, einmal „tief stehende Sonne“. So zerfällt eine Reihe. Mit Skill gilt eine Zeile für Licht, Farbwelt und Stimmung in allen vier Aufträgen, dazu der Schutz gegen Schrift und Logos. Nach dem Test geändert: Geht es im Thema um Menschen, zeigt der Skill sie jetzt angedeutet statt gar nicht, und der ganze Auftrag steht in einer Sprache.

**vor-dem-livegang**

Auftrag: „Kann diese Seite so online gehen? Es ist die Seite einer Hundeschule in Kiel.“ Hier der Punkt zum Handy.

Ohne Skill:

```
Am Handy ist die Seite winzig. Die Zeile für die Bildschirmbreite (viewport) fehlt. Ohne sie zeigt das Handy die Seite verkleinert wie am großen Bildschirm.
```

Mit Skill:

```
Am Handy nicht bedienbar. Die Handy-Einstellung fehlt, die Seite erscheint winzig (siehe Foto). Tippflächen: Links 18 px hoch, E-Mail-Feld 21 px, Häkchen 13 px, Knopf 21 px. Nötig sind mindestens 44 px.
```

Was sich geändert hat: Mit Skill wird gemessen statt geschätzt. Dazu kamen Funde, die ohne Skill fehlten: kein Canonical, kein Vorschaubild. Ein eigener Block nennt neun Punkte, die sich am Schreibtisch nicht prüfen ließen, etwa ob die Anfrage aus dem Formular ankommt. Nach dem Test geändert: Das Prüfskript sortiert jetzt selbst nach Rot, Gelb und Offen, erkennt Impressum und Datenschutz am Link-Text und meldet fehlende Bilddateien.

## Mach die Skills zu deinen

- **Deine Stil-Karte:** `bilder-mit-stil` legt sie beim ersten Mal mit dir an. Speicher sie in deinem Projekt, dann sehen alle Bilder aus wie aus einer Hand.
- **Deine Fenstergrößen:** In `schoen-gestalten` steht, in welchen Größen eine Seite geprüft wird. Trag die Geräte ein, die deine Kunden wirklich nutzen.
- **Deine Pflichtseiten:** `vor-dem-livegang` prüft Impressum und Datenschutz. Hast du weitere Pflichten, etwa Barrierefreiheit, ergänz sie in der Liste.

## Passt dazu von GitHub

Skills anderer Entwickler, die ich zusätzlich nutze. Sie liegen nicht in diesem Paket, du holst sie beim Original.

- **impeccable** (Lizenz Apache 2.0, github.com/pbakaus/impeccable): kritisiert und verfeinert das Design einer Webseite: Abstände, Schriften, Farben, Rangfolge. Tipp einmal je Projekt `/impeccable init`, danach zum Beispiel „/impeccable critique die Startseite“.

      /plugin marketplace add pbakaus/impeccable
      /plugin install impeccable@impeccable

- **frontend-design** (Lizenz Apache 2.0, aus dem offiziellen Marktplatz von Anthropic, github.com/anthropics/claude-plugins-official): für Webseiten und Oberflächen, die nicht nach Vorlage aussehen. Claude nutzt ihn von selbst, sobald du eine Seite baust.

      /plugin install frontend-design@claude-plugins-official

Vor dem Installieren eines fremden Skills: die fünf Prüfpunkte in „01 Installation“.

## Gut zu wissen

- Wie du die Skills einrichtest, steht in „01 Installation“.
- Das Prüfskript in `vor-dem-livegang` braucht Python 3. Es prüft die Sprache mit, wenn auch `menschlich-schreiben` aus dem Paket Texte installiert ist. Ohne das Paket Texte meldet es die Sprache als „offen“.
- `vor-dem-livegang` ersetzt keine Rechtsberatung.
- Was sich geändert hat: `AENDERUNGEN.md`. Was du mit den Skills machen darfst: `LIZENZ.md`.

Ilja
