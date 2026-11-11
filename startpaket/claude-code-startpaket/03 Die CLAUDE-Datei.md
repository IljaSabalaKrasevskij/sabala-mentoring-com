# Die CLAUDE.md: dein Briefing für Claude

Claude Code beginnt jede Unterhaltung ohne Erinnerung an die letzte. Die CLAUDE.md ist eine einfache Textdatei, die Claude zu Beginn jeder Unterhaltung liest. Darin steht, wer du bist, worum es im Projekt geht und welche Regeln gelten. Du schreibst es einmal auf und musst es nicht jedes Mal neu erklären.


## Zwei Orte

**Im Projektordner:** Eine CLAUDE.md direkt in deinem Projektordner gilt nur für dieses Projekt. Hier steht, worum es geht, für wen und wo was liegt.

**In deinem Benutzerordner:** Eine CLAUDE.md im versteckten Ordner .claude gilt für alle Projekte auf deinem Rechner. Hier steht, wer du bist und wie Claude mit dir arbeiten soll.

- Mac: ~/.claude/CLAUDE.md (also: Benutzerordner, darin .claude, darin CLAUDE.md)
- Windows: C:\Users\DEINNAME\.claude\CLAUDE.md

Claude liest beide. Den Ordner .claude legt Claude Code beim ersten Start selbst an.


## So nutzt du die Vorlagen

1. Kopier die Datei aus „vorlagen/projekt“ in deinen Projektordner. Sie heißt schon richtig: CLAUDE.md.
2. Öffne sie mit einem Texteditor und füll die Stellen in [eckigen Klammern] aus. Lösch alles, was für dich nicht passt.
3. Kopier die Datei aus „vorlagen/global“ in den Ordner .claude in deinem Benutzerordner und füll sie genauso aus.

Auf dem Mac ist der Ordner .claude versteckt. Im Finder zeigst du versteckte Ordner mit Cmd + Shift + Punkt.

**Noch einfacher:** Lass Claude helfen. Starte Claude Code in deinem Projektordner und schreib: „Lies die CLAUDE.md und stell mir Fragen, bis alle Lücken gefüllt sind.“


## Drei Regeln für eine gute CLAUDE.md

1. **Kurz halten.** Claude liest die Datei zu Beginn jeder Unterhaltung, und jede Zeile kostet Platz im Gedächtnis. Eine Seite reicht.
2. **Klar formulieren.** „Antworte auf Deutsch“ wirkt. „Es wäre schön, wenn …“ wirkt weniger.
3. **Pflegen.** Macht Claude etwas falsch, schreib die Regel dazu. Mit /memory öffnest du die Datei direkt aus Claude Code.


## Was die CLAUDE.md nicht kann

Claude nimmt die Regeln ernst, eine Garantie sind sie trotzdem nicht. Was auf keinen Fall passieren darf, sicherst du über die Rückfragen ab: Im Modus Manual fragt Claude vor jeder Änderung (siehe 02 Befehle.md, Shift + Tab).


## Oder automatisch

In einem Ordner, in dem schon Dateien liegen, legt /init eine CLAUDE.md für dich an. Claude schaut sich dafür die Dateien an und schreibt auf, was es findet. Danach ergänzt du, was nur du weißt.
