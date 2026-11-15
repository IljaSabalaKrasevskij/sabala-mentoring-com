# So installierst du die Skills

Ein Skill ist ein Ordner mit einer Anleitung, die Claude liest, wenn sie gebraucht wird. Du musst dir nichts merken: Bittest du Claude um einen Newsletter, nimmt es den passenden Skill von selbst.

In jedem Paket liegen die Skills zweimal:

- im Ordner „skills“ für Claude Code
- im Ordner „fuer-die-claude-app“ als ZIP-Dateien für die Claude-App auf claude.ai


## In Claude Code

Am einfachsten machst du es mit Claude Code selbst.

1. Entpacke die ZIP-Datei.
2. Öffne Claude Code im entpackten Ordner.
3. Schreib: „Kopiere alle Ordner, die in einem Ordner skills liegen, nach ~/.claude/skills und zeig mir danach, ob sie dort sind.“
4. Beende Claude Code und starte es neu. Mit /skills siehst du die Liste.

Von Hand geht es so:

- **Mac:** Öffne den Finder und drück ⇧⌘G (Umschalt, Befehl, G). Gib `~/.claude` ein und drück Enter. Gibt es dort noch keinen Ordner „skills“, leg ihn an. Zieh die Ordner aus „skills“ hinein.
- **Windows:** Öffne den Explorer, tippe in die Adresszeile `%USERPROFILE%\.claude` und drück Enter. Gibt es dort noch keinen Ordner „skills“, leg ihn an. Zieh die Ordner aus „skills“ hinein.


## In der Claude-App (claude.ai)

Skills gibt es in der Claude-App ab dem kostenlosen Plan.

1. Öffne claude.ai/settings/capabilities und schalte „Code execution and file creation“ ein (in neueren Versionen heißt es „Create and edit files“).
2. Öffne claude.ai/customize/skills.
3. Klick auf das Plus, dann auf „Create skill“ und „Upload a skill“.
4. Wähl im Ordner „fuer-die-claude-app“ die ZIP-Datei des Skills, den du willst. Jeder Skill ist eine eigene Datei.
5. Schalte den Skill in der Liste ein.

Bist du in Claude Code mit demselben Konto angemeldet, erscheinen die Skills aus der App dort automatisch mit.


## So arbeitest du damit

Claude wählt den passenden Skill von selbst, wenn deine Bitte dazu passt. In Claude Code rufst du einen Skill auch direkt auf, mit Schrägstrich und seinem Namen, zum Beispiel /newsletter-schreiben.

Fertige Aufträge zum Ausprobieren stehen in „00 Start hier“ jedes Pakets.


## Mach sie zu deinen

Alle Skills sind einfache Textdateien. Ändere, was nicht zu dir passt. In der Claude-App lädst du einen geänderten Skill einfach noch einmal hoch.

Hast du das Paket Texte, trag zuerst in `skills/menschlich-schreiben/meine-stimme.md` ein, wie du schreibst: deine Anrede, Wörter, die du magst, Wörter, die du nie benutzt, und einen Text, der nach dir klingt. Auch die Skills aus den anderen Paketen lesen diese Datei, sobald sie Texte schreiben.


## Updates

Kommt ein Skill dazu oder wird einer besser, schreibe ich dir eine Mail. Die neueste Fassung liegt immer unter sabala-mentoring.com/claude-code/skill-paket. Was sich geändert hat, steht in `AENDERUNGEN.md`.

Kopierst du ein Update über einen alten Skill-Ordner, sind deine eigenen Änderungen darin weg. Leg vorher eine Kopie deiner `meine-stimme.md` beiseite und kopier sie danach zurück.


## Skills anderer Entwickler

In „00 Start hier“ nenne ich dir zu manchen Paketen Skills von GitHub, die ich zusätzlich nutze. Sie liegen nicht in diesem Paket. Du holst sie beim Original, so hast du immer die neueste Fassung.

Skills und Plugins können auf deinem Rechner Befehle ausführen. Prüf deshalb vor jeder Installation fünf Dinge:

1. **Wer steht dahinter?** Ein Entwickler oder eine Firma mit Namen und Geschichte.
2. **Welche Lizenz?** MIT oder Apache 2.0 erlauben die Nutzung.
3. **Wird er gepflegt?** Die letzte Änderung sollte nicht lange her sein.
4. **Was steht in der SKILL.md?** Die Datei ist kurz und in normaler Sprache geschrieben. Steht dort etwas, das du nicht willst, lass es.
5. **Frag Claude.** Gib Claude Code den Link und schreib: „Prüf dieses Repository, bevor ich es installiere. Was tut es auf meinem Rechner?“

Die Befehle zum Installieren tippst du in Claude Code ein, nicht ins normale Terminal.


## Gut zu wissen

- Die Prüfskripte in einigen Skills brauchen Python 3. Auf dem Mac ist es meist schon da, in der Claude-App immer. Fehlt es, prüft Claude dieselben Punkte selbst.
- Woher die Skills kommen und was du damit machen darfst: `LIZENZ.md`
- Fehlt dir ein Skill? Schreib mir: sabala@sabala-mentoring.com

Ilja
