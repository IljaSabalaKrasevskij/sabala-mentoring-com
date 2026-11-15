# Start hier: Skill-Paket Texte

Texte, die nach dir klingen. Mit diesen drei Skills schreibt Claude ohne KI-Klang, erklärt so, dass jeder es versteht, und baut aus einem Diktat einen fertigen Newsletter.

## Die drei Skills

| Skill | Was er macht | Wofür du ihn nutzt |
|---|---|---|
| menschlich-schreiben | Schreibt und überarbeitet Texte konkret und im Fluss, ohne Gedankenstriche und Werbefloskeln. Mit Prüfskript und einer Vorlage für deine eigene Stimme. | Webseiten-Texte, Mails, Angebote, Beiträge |
| einfach-erklaeren | Erklärt Fachthemen so, dass jemand ohne Vorwissen sie versteht und weiß, was er als Nächstes tut. | Anleitungen, Antworten an Kunden, Schulungsunterlagen |
| newsletter-schreiben | Macht aus einem Diktat oder ein paar Notizen eine persönliche Mail: drei Betreffs, ein Gedanke, ein Knopf, ein P.S. | Rundmails, Ankündigungen, letzte Aufrufe vor einer Frist |

## So greifen sie ineinander

1. **Zuerst deine Stimme.** Öffne `skills/menschlich-schreiben/meine-stimme.md` und trag ein, wie du schreibst. Das dauert zehn Minuten und wirkt in jedem Text danach.
2. **Dann schreiben.** Für Erklärtexte nimmt Claude `einfach-erklaeren`, für Mails an deine Liste `newsletter-schreiben`.
3. **Am Ende prüfen.** `menschlich-schreiben` bringt ein Prüfskript mit. Es findet Gedankenstriche, Werbefloskeln und deine eigenen Tabu-Wörter.

## Fertige Aufträge zum Ausprobieren

- „Füll mit mir meine-stimme.md aus. Stell mir die Fragen einzeln.“
- „Schreib drei Sätze für meine Startseite. Ich bin [Beruf] in [Ort] und mache [Leistung]. Nutze menschlich-schreiben.“
- „Prüf diesen Text mit dem Prüfskript aus menschlich-schreiben und zeig mir die Funde: [Text]“
- „Erklär meinen Kunden in einer kurzen Mail, warum [Thema]. Halte dich an einfach-erklaeren.“
- „Schreib meinen Newsletter. [Diktat: was passiert ist, wer vorkommt, was der Leser tun soll]“

## Vorher und Nachher

Aus dem Test vom November 2026: Ein unabhängiger Tester hat denselben Auftrag erst ohne Skill gelöst, dann mit. Die Ausschnitte sind wörtlich übernommen. Die Betriebe in den Beispielen sind erfunden. Wo der Tester einen Skill unklar fand, habe ich ihn danach nachgebessert.

**menschlich-schreiben**

Auftrag: „Schreib drei Sätze für die Startseite der Schreinerei Holzwerk Brenner in Freiburg: Massivholzküchen nach Maß, seit 2009, 14 Küchen im letzten Jahr.“

Ohne Skill:

```
Bei Holzwerk Brenner in Freiburg bauen wir seit 2009 Massivholzküchen nach Maß, die genau zu dir und deinem Zuhause passen. Im letzten Jahr sind in unserer Werkstatt 14 Küchen entstanden, jede einzelne mit viel Sorgfalt und Liebe zum Detail geplant und gefertigt. Erzähl uns von deiner Traumküche, und wir machen daraus ein Stück, das dich viele Jahre begleitet.
```

Mit Skill:

```
Bei Holzwerk Brenner in Freiburg bauen wir seit 2009 Küchen aus Massivholz, jede nach Maß. Im letzten Jahr waren es 14, also gut eine im Monat. Wenn du gerade eine Küche planst, erzähl uns von deinem Raum.
```

Was sich geändert hat: 37 statt 58 Wörter, die Floskeln sind weg, die Zahl wird greifbar. Das Prüfskript meldet vorher einen Fund, nachher keinen.

**einfach-erklaeren**

Auftrag: „Erklär Handwerkern ohne Vorwissen in einer kurzen Mail, warum ihre Webseite ein Impressum braucht.“

Ohne Skill:

```
In Deutschland ist das Impressum gesetzlich vorgeschrieben (§ 5 Digitale-Dienste-Gesetz). Jede geschäftliche Webseite muss eines haben, also auch deine.
```

Mit Skill:

```
Stell es dir vor wie die Beschriftung auf deinem Firmenwagen, nur dass sie im Netz Pflicht ist. Wer auf deine Seite kommt, soll sofort sehen, welcher Betrieb das ist und wo er anrufen kann.
```

Was sich geändert hat: Die Antwort steht im ersten Satz, der Paragraf ist raus, ein Bild aus dem Alltag ersetzt die Erklärung.

## Mach die Skills zu deinen

- **`meine-stimme.md`:** deine Anrede, Wörter, die du magst, Wörter, die du nie benutzt, und ein Text, der nach dir klingt. Auch die Skills der anderen Pakete lesen diese Datei.
- **Eigene Tabu-Wörter:** Alles, was du in `meine-stimme.md` unter den Tabu-Wörtern einträgst, findet das Prüfskript ab sofort.
- **Deine Newsletter-Formate:** In `newsletter-schreiben` stehen sechs Formate. Streich, was du nie verschickst, und ergänz dein eigenes.

## Passt dazu von GitHub

Skills anderer Entwickler, die ich zusätzlich nutze. Sie liegen nicht in diesem Paket, du holst sie beim Original.

- **humanizer** (Lizenz MIT, github.com/blader/humanizer): findet typische Muster von KI-Texten und schreibt sie um. Die Muster stammen aus einer Liste der englischen Wikipedia, darum wirkt er bei englischen Texten am stärksten. Für deutsche Texte nimmst du `menschlich-schreiben`.

      /plugin marketplace add blader/humanizer
      /plugin install humanizer@humanizer

Vor dem Installieren eines fremden Skills: die fünf Prüfpunkte in „01 Installation“.

## Gut zu wissen

- Wie du die Skills einrichtest, steht in „01 Installation“.
- Das Prüfskript braucht Python 3. Fehlt es, prüft Claude dieselben Punkte selbst.
- Was sich geändert hat: `AENDERUNGEN.md`. Was du mit den Skills machen darfst: `LIZENZ.md`.

Ilja
