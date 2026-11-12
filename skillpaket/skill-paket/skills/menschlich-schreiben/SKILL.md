---
name: menschlich-schreiben
description: Schreibt und überarbeitet deutsche Texte so, dass sie nach einem Menschen klingen und nicht nach KI oder Werbeprospekt. Nutzen bei Webseiten-Texten, Mails, Newslettern, Beiträgen für LinkedIn oder Instagram, Angeboten und jedem Text, der veröffentlicht oder verschickt wird. Auch wenn jemand sagt "klingt nach KI", "mach das menschlicher", "glätte den Text" oder "prüf meinen Text".
---

# Menschlich schreiben

Ein Text klingt nach KI, wenn er glatt, allgemein und aufgeblasen ist. Nach einem Menschen klingt er, wenn er konkret ist, eine Haltung hat und sich im Fluss lesen lässt. Dieser Skill sorgt für das Zweite.

## Vor dem Schreiben

1. Lies `meine-stimme.md` in diesem Ordner. Dort steht, wie die Person schreibt: Anrede, Wörter, die sie mag oder meidet, und ein Text, der nach ihr klingt.
   - **Anrede:** Steht hinter „Anrede:“ ein du oder Sie, gilt das für neue Texte. Überarbeitest du einen vorhandenen Text, behältst du seine Anrede, außer die Person will es anders. Steht dort noch nichts und gibt es keinen Ausgangstext, frag einmal nach und nimm im Zweifel „du“.
2. Kläre für dich, wer den Text liest und was diese Person danach wissen oder tun soll. Ein Text hat ein Ziel.

## So klingt ein Text nach einem Menschen

- **Konkret.** Zahlen, Namen und Beispiele aus dem Alltag der Leser. „Spart dir jeden Montag eine Stunde“ trägt mehr als „steigert die Effizienz“.
- **Ein Gedanke, ein Satz.** Kurz heißt auf den Punkt. Was zusammengehört, verbindet ein Komma, statt es in Fetzen zu hacken.
  - Abgehackt: „Egal wo du stehst. Es gibt einen Weg. Für dich.“
  - Im Fluss: „Egal wo du gerade stehst, es gibt einen Weg für dich.“
- **Aktiv.** Wer macht was? „Ich schicke dir die Vorlage“ statt „Die Vorlage wird zugesandt“.
- **Mit Haltung.** Sag, was du denkst und warum. Ein klarer Satz mit Meinung wirkt stärker als drei vorsichtige.
- **Wie im Gespräch.** Schreib so, wie die Person mit ihrem Gegenüber am Tisch reden würde.
- **Sparsam betonen.** Höchstens zwei bis drei Ausrufezeichen im ganzen Text, keine Wörter in GROSSBUCHSTABEN.
- **„du“ klein.** Mitten im Satz immer klein: du, dich, dir, dein. Groß nur am Satzanfang. Bei Sie-Anrede gilt die normale Schreibweise.

## Was nie in den Text kommt

### Gedankenstriche
Der lange Strich (— oder –) ist das bekannteste Erkennungszeichen von KI-Texten. Nimm stattdessen einen Punkt, ein Komma, einen Doppelpunkt oder Klammern. Auch zwei Bindestriche (--) als Ersatz fallen weg. Nur Spannen bei Zahlen und Zeiten bekommen einen kurzen Strich: „9-17 Uhr“, „2024-2026“.

- Mit Strich: „Die Seite ist fertig — und sie verkauft.“
- Ohne: „Die Seite ist fertig. Und sie verkauft.“

### Satzbauten, die nach Werbung klingen
- **Verneinen, um dann zu behaupten:** „Das ist kein Kurs, sondern eine Begleitung.“ Auch „Es geht nicht um X. Es geht um Y.“ Sag einfach, was es ist: „Ich begleite dich sechs Wochen lang, jede Woche live.“
- **Dreierketten, die nur klingen sollen:** „klar, präzise und wirkungsvoll“. Nimm das eine Wort, das stimmt, oder ein Beispiel.
- **„Mehr als nur …“, „echte …“, „wahre …“:** Wenn etwas echt ist, braucht es das Wort nicht.
- **Leere Einstiege:** „In der heutigen Zeit …“, „Es ist wichtig zu beachten, dass …“, „Lass uns eintauchen“.
- **Frage mit sofortiger Antwort** („Die Lösung? Ganz einfach.“): höchstens einmal pro Text.
- **Doppelungen:** Sagen zwei Sätze dasselbe, fällt einer weg.

### Wörter aus dem Werbeprospekt
Ersetze sie durch das, was konkret gemeint ist.

| Statt | Schreib |
|---|---|
| Game-Changer, revolutionär, bahnbrechend | was sich konkret ändert |
| Transformation, Reise (als Bild) | wie es vorher war und wie danach |
| authentisch | ein Beispiel, das es zeigt |
| Empowerment, in deine Kraft kommen | was die Person danach kann |
| nahtlos, mühelos, spielend leicht | wie lange es dauert |
| innovativ, modernste | was es kann |
| ganzheitlich, maßgeschneidert, Mehrwert | wofür genau und für wen |
| Potenzial entfalten, das nächste Level | das Ergebnis in Zahlen oder einem Bild |
| Synergien | wer was für wen tut |
| eintauchen, entfesseln | das schlichte Verb |
| Sichere dir jetzt, Nur noch X Plätze, Hier klicken | ein ehrlicher Knopftext mit Verb und Ziel, etwa „Platz anfragen“ |

Die eigene Liste der Person in `meine-stimme.md` gilt zusätzlich.

## Nach dem Schreiben: prüfen

1. **Prüfskript.** Wenn Python 3 da ist, speichere den Text als Datei und lass ihn prüfen:
   `python3 ~/.claude/skills/menschlich-schreiben/pruefen.py text.md`
   Das Skript liegt im Ordner dieses Skills, in Claude Code meist unter `~/.claude/skills/menschlich-schreiben/`. Unter Windows heißt der Befehl oft `py` statt `python3`. Es meldet Gedankenstriche, verneinende Satzbauten, Wörter aus der Liste (auch die aus `meine-stimme.md`), sehr lange Sätze, viele Ausrufezeichen und großes „Du“ mitten im Satz, jeweils mit Zeile. Fehler behebst du, Hinweise schaust du dir an.
   Ohne Python gehst du dieselben Punkte selbst Zeile für Zeile durch.
2. **Laut lesen.** Lies den Text in Gedanken laut. Klingt eine Stelle nach Prospekt oder nach LinkedIn-Werbung, schreib sie neu.
3. **Kurz zeigen, was du geändert hast.** Höchstens fünf Punkte, damit die Person ihren Stil wiedererkennt.

## Wenn du einen fremden Text überarbeitest

- Inhalt und Stimme der Person bleiben. Du änderst nur, was nach KI oder Werbung klingt oder unklar ist.
- **Nichts dazuerfinden.** Keine Zahlen, Zeiten, Preise, Zitate, Kunden oder Ergebnisse, die nicht im Ausgangstext oder in `meine-stimme.md` stehen. Konkret werden ist gut, aber nur mit Fakten der Person. Fehlt dir etwas, setz einen Platzhalter in eckigen Klammern, etwa [Zahl der Kunden], und frag nach.
- Fachbegriffe, Namen, Preise und Zitate bleiben, wie sie sind.
