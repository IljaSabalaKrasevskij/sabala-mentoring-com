# Start hier: Skill-Paket Marktrecherche

Markt und Mitbewerber verstehen. Mit diesen drei Skills vergleicht Claude dein Angebot mit dem Markt, beschreibt deine Wunschkunden so, dass du damit entscheiden kannst, und belegt jede Zahl.

## Die drei Skills

| Skill | Was er macht | Wofür du ihn nutzt |
|---|---|---|
| mitbewerber-pruefen | Stellt dich neben deine Mitbewerber: erster Satz, Angebot, Preis, Belege, Lücken. Mit Sternen nach fester Regel und einem Urteil in einem Satz. | neues Angebot, Preisfindung, neue Webseite |
| zielgruppe-schaerfen | Beschreibt Wunschkunden über Prüfsteine und ein echtes Beispiel statt über Branchen oder eine erfundene Kunstfigur. | Angebot, Webseite, Anzeigen, Kaltakquise |
| quellen-pruefen | Belegt Zahlen und Behauptungen mit Quelle und Datum, markiert Unsicheres und sagt offen, was sich nicht belegen ließ. | Artikel, Angebote, Präsentationen, KI-Entwürfe |

## So greifen sie ineinander

1. **Wer:** `zielgruppe-schaerfen` klärt, für wen du arbeitest. Daran hängt alles Weitere.
2. **Gegen wen:** `mitbewerber-pruefen` zeigt, wer diese Kunden heute bedient und was fehlt.
3. **Stimmt das:** `quellen-pruefen` sorgt dafür, dass keine Zahl aus dem Bauch in deine Unterlagen kommt.

## Fertige Aufträge zum Ausprobieren

- „Schärfe meine Zielgruppe nach zielgruppe-schaerfen. Mein bester Kunde war [Beispiel].“
- „Passt dieser Interessent zu mir? Hier ist seine Webseite: [Adresse]“
- „Vergleiche mein Angebot mit diesen Mitbewerbern, nach mitbewerber-pruefen: [drei bis fünf Adressen]. Passt mein Preis, und was bietet niemand an?“
- „Beleg diese zwei Zahlen oder kennzeichne sie: [Aussagen]. Nutze quellen-pruefen.“
- „Prüf alle Zahlen und Zitate in diesem Entwurf, bevor ich ihn veröffentliche: [Text]“

## Vorher und Nachher

Aus dem Test vom November 2026: Ein unabhängiger Tester hat denselben Auftrag erst ohne Skill gelöst, dann mit. Die Ausschnitte sind wörtlich übernommen. Die Betriebe in den Beispielen sind erfunden. Wo der Tester einen Skill unklar fand, habe ich ihn danach nachgebessert.

**mitbewerber-pruefen**

Auftrag: „Vergleiche mich mit diesen vier Mitbewerbern. Passt mein Preis, und was bietet niemand an?“

Ohne Skill:

```
Das hast laut den Texten nur du:
1. Lieferung in 14 Tagen. Der Nächstschnellste ist B mit 4 Wochen. A braucht 6 bis 8 Wochen, D 10 Wochen, C sagt nichts dazu.
2. Ein Album im Preis unter 3.900 €. D hat das Album auch inklusive, aber erst ab 3.900 €.
```

Mit Skill:

```
Lieferung in 14 Tagen | allein unter allen, die eine Lieferzeit nennen. C nicht geprüft.
Album im Preis | nicht allein | D: „Album inklusive“
Versprechen „natürlich, nicht verstellt“ | nicht allein | B: „ehrlich und ungestellt“
```

Was sich geändert hat: Jedes Merkmal trägt „allein“, „nicht allein“ oder „nicht geprüft“, mit Beleg. Auch das, was nicht für dich spricht, steht da.

## Mach die Skills zu deinen

- **Deine Prüfsteine:** Hat `zielgruppe-schaerfen` dein Profil geschrieben, speicher es in deinem Projekt. Jeder weitere Skill kann sich dann darauf beziehen.
- **Deine Spalten:** In `mitbewerber-pruefen` steht eine Rubrik mit vier Spalten. Zählt in deinem Markt etwas anderes, zum Beispiel Lieferzeit, ergänz eine fünfte.
- **Deine Quellen:** Hast du Stellen, denen du vertraust, etwa einen Verband oder ein Amt, nenn sie Claude. `quellen-pruefen` sucht dort zuerst.

## Passt dazu von GitHub

Skills anderer Entwickler, die ich zusätzlich nutze. Sie liegen nicht in diesem Paket, du holst sie beim Original.

- **mattpocock-skills** (Lizenz MIT, aus dem offiziellen Marktplatz von Anthropic, github.com/mattpocock/skills): Mit `/grill-me` stellt dir Claude so lange Fragen zu deinem Vorhaben, bis jede offene Stelle geklärt ist. Gut vor einem neuen Angebot. Das Plugin bringt weitere Skills mit, die meisten davon sind für Entwickler gedacht.

      /plugin install mattpocock-skills@claude-plugins-official

Vor dem Installieren eines fremden Skills: die fünf Prüfpunkte in „01 Installation“.

## Gut zu wissen

- Wie du die Skills einrichtest, steht in „01 Installation“.
- Claude braucht für diese Skills Zugang zum Netz, um Seiten zu lesen. Ohne Zugang arbeitet es mit dem, was du einfügst, und schreibt dazu, was es nicht prüfen konnte.
- Ein Vergleich ist eine Momentaufnahme. Seiten und Preise ändern sich.
- Was sich geändert hat: `AENDERUNGEN.md`. Was du mit den Skills machen darfst: `LIZENZ.md`.

Ilja
