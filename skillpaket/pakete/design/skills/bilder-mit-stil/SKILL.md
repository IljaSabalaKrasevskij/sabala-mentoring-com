---
name: bilder-mit-stil
description: Schreibt Bild-Prompts für KI-Bilder so, dass alle Bilder einer Seite, eines Artikels oder einer Reihe aus einer Hand aussehen, und prüft jedes erzeugte Bild auf typische KI-Fehler. Legt den Stil einmal fest, plant die Bilder als Liste und liefert die Prompts mit festem Stil-Satz. Nutzen bei Titelbildern, Illustrationen für Artikel und Präsentationen, Beitragsbildern, Symbolbildern und wiederkehrenden Figuren. Auch bei "mach mir ein Bild", "Bildprompt", "Midjourney", "Illustration im gleichen Stil" oder "prüf dieses KI-Bild".
---

# Bilder mit Stil

Bilder wirken wie aus einer Hand, wenn der Stil einmal festgelegt wird und in jedem Auftrag wortgleich steht. Dieser Skill schreibt die Aufträge (Prompts) und prüft die fertigen Bilder. Erzeugt werden sie in dem Bild-Werkzeug, das die Person nutzt.

## Der Ablauf

1. **Erst lesen:** Gibt es Unterlagen zur Marke oder eine Stil-Karte? Farbe und Stil wählst du nie aus dem Bauch.
   Gibt es nichts außer ein paar Wörtern wie „ruhig, warm“, schlägst du zwei Stil-Karten vor, die sich klar unterscheiden, etwa in Technik und Farbwelt. Eine davon geht bewusst weg vom Naheliegenden. Sag, dass es Vorschläge sind, und lass die Person wählen.
2. **Zweck und Zielgruppe klären.** Die Zielgruppe entscheidet über Motiv und Stimmung.
3. **Den Stil einmal festlegen** und als Stil-Karte aufschreiben.
4. **Die Bilder als Liste planen:** je Bild Platz, Aussage, Motiv, Format, Dateiname.
5. **Liste und Prompts zeigen** (Vorlage „Vor dem Erzeugen“) und auf das Ja warten, vor allem, wenn das Erzeugen Geld kostet.
6. **Erst ein Probebild,** dann die ganze Reihe.
7. **Jedes Bild vergrößert prüfen,** bevor es eingebaut wird, und das Ergebnis melden (Vorlage „Nach dem Erzeugen“).

## Die Stil-Karte

```
STIL-KARTE
Sprache der Prompts: [englisch oder deutsch, eine für alle Bilder]
Stil-Satz: [Technik, Material, Oberfläche, Kanten, in einem Satz, in der Sprache der Prompts]
Licht: ..        Farbwelt in Worten: ..        Akzentfarbe: [sparsam, als Glanzpunkt]
Stimmung: [zwei, drei Wörter, die für alle Bilder gelten]
Menschen: [nein, nur angedeutet (von hinten, nur Hände, ohne Gesicht), ja]
Referenzbild: [das Bild, an dem sich jedes neue misst]
Verbotene Stil-Wörter: [Wörter, die den Stil kippen]
Formate: [zum Beispiel 16:9 Titelbild, 1:1 Beitrag, 3:4 Hochformat]
```

- Es gibt **eine** Fassung des Stil-Satzes an **einem** Ort.
- **Eine Sprache je Prompt.** Englisch verstehen die meisten Bild-Werkzeuge am sichersten. Schreibst du deutsch, übersetzt du auch die Schutz-Zeile: „kein Text, keine Logos, keine Signatur, kein Wasserzeichen“.
- Den Stil beschreibst du über Technik, Material, Licht und Kanten. Du nennst keine lebenden Künstler als Vorbild.
- Das Referenzbild ist der Maßstab. Ein Bild schlägt jede Beschreibung.

## So ist ein Prompt gebaut

```
[STIL-SATZ]                                                 in jedem Prompt wortgleich
[MOTIV: wer oder was, was geschieht, wo]                    nur diese Zeile wechselt
[LICHT], [FARBWELT], [AKZENT], [STIMMUNG]                   aus der Stil-Karte, wortgleich
[SCHUTZ: no text, no logos, no signatures, no watermark]    wortgleich
```

- **Drei Zeilen stehen fest, eine wechselt.** Stil-Satz, die Zeile mit Licht, Farbwelt, Akzent und Stimmung und der Schutz sind in jedem Prompt gleich. Nur das Motiv wechselt.
- **Das Format** stellst du im Bild-Werkzeug ein. Hat das Werkzeug dafür keine Einstellung, steht es als letzte Zeile im Prompt.

- **Motiv:** eine Szene, die die Aussage erzählt, statt eines abstrakten Sinnbilds. Keine Beschreibung wie aus dem Bildkatalog.
- **Genaue Wörter für Gegenstände.** Ein mehrdeutiges Wort erzeugt den falschen Gegenstand.
- **Farb- und Lichtwörter färben das ganze Bild.** Ein einzelnes Farbwort kann aus einem Taghimmel einen Sonnenuntergang machen.
- **Ohne Menschen, wenn das Thema ohne sie auskommt.** Dann steht im Schutz zusätzlich: `no people, no hands, no figures`.
- **Geht es im Thema um Menschen** (ein Paar, ein Team, eine Familie), wirkt ein leeres Stillleben kühl. Dann zeigst du sie angedeutet: von hinten, klein im Bild, nur Hände, ohne Gesicht. Im Schutz steht dann: `no faces`. So bleibt die Wärme, und niemand hält die Figur für einen echten Menschen.
- **Text gehört nie ins Bild.** Er wird danach gesetzt. Das Gleiche gilt für Logos: Du erzeugst eine leere Fläche und setzt das echte Logo später ein.
- **Keine geschützten Figuren** und keine Namen bekannter Marken im Prompt.

## Dieselbe Figur, derselbe Mensch

- **Wiederkehrende Figur:** ein Master-Bild als Vorlage und ein Stammtext, der in jedem Prompt wortgleich steht. Es wechseln nur Pose, Ort und Licht. Danach prüfst du die festen Merkmale am Bild.
- **Echter Mensch:** nie ohne Referenzfoto, sonst entsteht ein anderer Mensch. Ein einziges, aktuelles Foto als Anker, gleiche Kleidung, gleiche Lichtstimmung. Den Körperbau verschönerst du nicht.
- **Wo Vertrauen zählt,** gehört ein echtes Foto hin: das erste Bild einer Seite und der persönliche Schluss. KI-Bilder passen für Illustrationen und Erklärbilder.

## Jedes Bild prüfen

Sieh dir jedes Bild vergrößert an, vor allem die Bildmitte, die unteren Ecken und alles, was eine Fläche hat: Zettel, Bildschirme, Schilder, Gerätedeckel.

| Prüfpunkt | Typischer Fehler |
|---|---|
| Hände und Finger | zu viele Finger, verwachsene Hände |
| Augen und Gesicht | schiefer Blick, verschmolzene Züge |
| Schrift | Schein-Schrift auf Zetteln und Bildschirmen, trotz Verbot im Prompt |
| Logos und Signaturen | erfundene Zeichen, Kritzelei in der unteren Ecke |
| Gegenstand | das falsche Ding, unmögliche Bauweise |
| Stil | hält dem Vergleich mit dem Referenzbild nicht stand |
| Farbe | Farbstich über dem ganzen Bild |
| Wirkung | gestellt wie im Katalog, zu kindlich für die Zielgruppe |

- Fehler an Händen, Augen oder Gesicht: verwerfen und neu erzeugen.
- Kleine Fehler wie Schein-Schrift oder eine Signatur am Rand: ausbessern oder zuschneiden.
- Verworfene Bilder benennst du um, damit sie niemand versehentlich verwendet.
- Im fertigen Layout schaust du noch einmal: kein Text über einem Gesicht, niemand am Rand angeschnitten.

## Was du ablieferst

Es gibt zwei Stände. Du lieferst den ersten, wartest auf das Ja und lieferst den zweiten erst, wenn Bilder da sind.

**Vor dem Erzeugen:**

```
BILD-AUFTRAG: [Seite, Artikel oder Reihe]
Stand: Prompts fertig, noch kein Bild erzeugt
Stil-Karte: [siehe oben, oder Verweis auf die vorhandene]

Nr | Platz | Aussage | Motiv | Format | Dateiname
1  | ..    | ..      | ..    | ..     | ..

PROMPT 1: ..
PROMPT 2: ..

Hinweis: [wo ein echtes Foto besser wäre]
Frage: Passt das so? Dann erzeuge zuerst Bild 1 als Probe.
```

**Nach dem Erzeugen,** je Bild eine Zeile:

```
Bild 1 [Dateiname]: Hände · Augen · Schrift · Logos · Ecken · Gegenstand · Stil · Farbe → in Ordnung | ausgebessert | verworfen, weil ..
```

## Prüfen, bevor du es abgibst

- Steht der Stil-Satz wortgleich in jedem Prompt, ohne ein verbotenes Stil-Wort?
- Erzählt jedes Motiv eine Aussage, und passt es zur Zielgruppe?
- Hat jeder Prompt den Schutz gegen Text, Logos und Signaturen?
- Steht jeder Prompt in einer einzigen Sprache, auch die Schutz-Zeile?
- Stehen bei einem Thema mit Menschen angedeutete Menschen im Bild statt eines leeren Stilllebens?
- Wurde jedes Bild einzeln und vergrößert angesehen?
- Kommt in einer Übersicht kein Bild doppelt vor?

## Ehrlich bleiben

- Du meldest einen Bild-Auftrag nie als fertig, solange kein Bild da ist.
- Zeigt ein KI-Bild etwas, das wie ein echtes Foto des Angebots wirkt, wird es als Symbolbild gekennzeichnet. Echte Fotos bleiben das Ziel.
- Bei Fotos aus der Bildersuche sind die Rechte unklar. Die klärt die Person, bevor etwas veröffentlicht wird.
