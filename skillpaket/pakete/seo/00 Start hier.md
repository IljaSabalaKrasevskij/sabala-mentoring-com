# Start hier: Skill-Paket SEO und KI-Suche

Gefunden werden, bei Google und in KI-Antworten. Mit diesen drei Skills findet Claude Themen, die deine Kunden wirklich suchen, baut Seiten dafür und sorgt dafür, dass auch ChatGPT und andere sie lesen können.

## Die drei Skills

| Skill | Was er macht | Wofür du ihn nutzt |
|---|---|---|
| themen-finden | Findet Themen in der Sprache deiner Kunden, prüft sie an der ersten Google-Seite und bringt sie in eine Reihenfolge. | Blog-Planung, Redaktionsplan, alte Artikel aufräumen |
| seo-seite | Baut eine Seite für Google: Titel und Beschreibung mit Zeichenzahl, Überschriften als Fragen, Antwort-Absatz, Fragen-Block, interne Links. | neue Artikel, Leistungsseiten, zu lange Titel kürzen |
| ki-suche | Schreibt Antworten, die eine KI zitieren kann, prüft, was KI-Crawler wirklich lesen, legt die llms.txt an und misst mit festen Testfragen. | Antwort-Absätze, Fragen-Blöcke, llms.txt, Messung |

## So greifen sie ineinander

1. **Finden:** `themen-finden` sagt dir, worüber sich das Schreiben lohnt und in welcher Reihenfolge.
2. **Bauen:** `seo-seite` macht aus einem Thema eine Seite mit allem, was Google braucht.
3. **Schärfen:** `ki-suche` sorgt dafür, dass auch KI-Suchen die Seite lesen und zitieren können, und misst, ob es wirkt.

## Fertige Aufträge zum Ausprobieren

- „Finde zehn Themen für meine Webseite und sag mir, welche drei ich zuerst schreibe. Ich bin [Beruf] in [Ort], meine Kunden sind [Zielgruppe]. Nutze themen-finden.“
- „Lohnt sich eine eigene Seite für [Suchbegriff]? Schau dir an, wer bei Google oben steht.“
- „Mach diese Seite fit für Google, nach seo-seite: [Adresse oder Text]“
- „Kürze die Titel dieser zwölf Artikel auf höchstens 60 Zeichen: [Liste]“
- „Schreib mir eine llms.txt für meine Webseite. Meine Seiten: [Liste]. Nutze ki-suche.“
- „Leg fünfzehn Testfragen fest, mit denen ich prüfe, ob ChatGPT mein Angebot nennt.“

## Vorher und Nachher

Aus dem Test vom November 2026: Ein unabhängiger Tester hat denselben Auftrag erst ohne Skill gelöst, dann mit. Die Ausschnitte sind wörtlich übernommen. Die Betriebe in den Beispielen sind erfunden. Wo der Tester einen Skill unklar fand, habe ich ihn danach nachgebessert.

**seo-seite**

Auftrag: „Mach die Seite ‚Manuelle Therapie‘ meiner Physiotherapie-Praxis in Bamberg fit für Google.“ Hier der erste Absatz der Seite.

Ohne Skill:

```
Bei der Manuellen Therapie untersuchen und behandeln wir Gelenke und Muskeln mit gezielten Handgriffen. In unserer Praxis am Stadtpark behandeln wir damit Beschwerden an Rücken, Nacken, Schulter und Kiefergelenk.
```

Mit Skill:

```
Manuelle Therapie in Bamberg bekommen Sie in der Physiotherapie-Praxis am Stadtpark. Drei Therapeutinnen behandeln hier, alle mit dem Zertifikat Manuelle Therapie. Wir behandeln Beschwerden an Rücken, Nacken, Schulter und Kiefergelenk. Eine Behandlung dauert 20 bis 25 Minuten, meist stehen 6 Einheiten auf der Verordnung.
```

Was sich geändert hat: Suchbegriff und Ort stehen im ersten Satz. Dazu kamen drei Titel mit Zeichenzahl und die Herkunft jeder Frage im Fragen-Block.

**ki-suche**

Auftrag: „Schreib mir eine llms.txt für meine Webseite als Hochzeitsfotograf in Erfurt.“ Hier die Zeile zur Preisseite.

Ohne Skill:

```
[Preise](https://fotograf-erfurt.example/preise): Ganztagsreportage 2.600 €. Winter-Aktion: 15 % Nachlass, gültig bis 31.01.[Jahr eintragen].
```

Mit Skill:

```
[Preise](https://fotograf-erfurt.example/preise): Nennt die aktuellen Preise für die Hochzeitsreportage, auch für die Begleitung über den ganzen Tag.
```

Was sich geändert hat: Preis und befristete Aktion stehen nicht mehr in der Datei. Beides veraltet, und die Datei bleibt lange liegen.

## Mach die Skills zu deinen

- **Deine Daten:** Hast du die Google Search Console eingerichtet, gib Claude die Suchanfragen deiner Seite. Dann rechnet `themen-finden` mit echten Zahlen statt mit Schätzungen.
- **Dein Markenzusatz:** In `seo-seite` zählt der Zusatz im Titel mit. Sag Claude, wie deiner heißt, zum Beispiel „· Praxis Müller“.
- **Deine Testfragen:** Die Liste aus `ki-suche` legst du einmal fest und fragst sie immer gleich. Nur so siehst du eine Veränderung.

## Passt dazu von GitHub

Für dieses Paket nutze ich keine Skills anderer Entwickler. Die drei hier decken meinen ganzen Ablauf ab.

## Gut zu wissen

- Wie du die Skills einrichtest, steht in „01 Installation“.
- Suchvolumen in Zahlen gibt es nur in bezahlten Werkzeugen. Ohne sie schätzt Claude begründet und schreibt das dazu.
- Kein Skill kann einen Platz bei Google oder eine Nennung in einer KI versprechen. Bis eine Änderung wirkt, vergehen Wochen.
- Für die Technik einer ganzen Seite passt `vor-dem-livegang` aus dem Paket Design.
- Was sich geändert hat: `AENDERUNGEN.md`. Was du mit den Skills machen darfst: `LIZENZ.md`.

Ilja
