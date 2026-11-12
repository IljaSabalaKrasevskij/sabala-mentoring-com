# Start hier: dein Skill-Paket

Vier Skills für Claude, die ich selbst so nutze. Damit klingen deine Texte nach dir und deine Seiten sehen hochwertig aus.

Ein Skill ist eine Anleitung, die Claude liest, wenn sie gebraucht wird. Du musst dir nichts merken: Bittest du Claude um einen Newsletter, nimmt es den Skill fürs Schreiben von selbst.

| Skill | Was er macht |
|---|---|
| menschlich-schreiben | Texte ohne KI-Klang: konkret, im Fluss, ohne Gedankenstriche und Werbefloskeln. Mit Prüfskript und einer Vorlage für deine eigene Stimme. |
| einfach-erklaeren | Fachthemen so erklärt, dass jeder sie versteht und weiß, was er als Nächstes tut. Mit Bauplan für Erklärtexte und Anleitungen zum Nachklicken. |
| schoen-gestalten | Webseiten, Folien und PDFs, die hochwertig wirken und für alle lesbar sind, auch für Leser ab 50. |
| vor-dem-livegang | Die Prüfung vor dem Veröffentlichen: Texte, Gestaltung, Handy, Google, Formulare, Impressum. Mit Prüfskript für jede Adresse. |


## So installierst du sie in Claude Code

Am einfachsten machst du es mit Claude Code selbst.

1. Entpacke die ZIP-Datei.
2. Öffne Claude Code im entpackten Ordner „skill-paket“.
3. Schreib: „Kopiere die vier Ordner aus skills nach ~/.claude/skills und zeig mir danach, ob sie dort sind.“
4. Beende Claude Code und starte es neu. Mit /skills siehst du die Liste.

Von Hand geht es so:

- **Mac:** Öffne den Finder und drück ⇧⌘G (Umschalt, Befehl, G). Gib `~/.claude` ein und drück Enter. Gibt es dort noch keinen Ordner „skills“, leg ihn an. Zieh die vier Ordner aus „skills“ hinein.
- **Windows:** Öffne den Explorer, tippe in die Adresszeile `%USERPROFILE%\.claude` und drück Enter. Gibt es dort noch keinen Ordner „skills“, leg ihn an. Zieh die vier Ordner aus „skills“ hinein.


## So nutzt du sie in der Claude-App (claude.ai)

Skills gibt es in der Claude-App ab dem kostenlosen Plan.

1. Öffne claude.ai/settings/capabilities und schalte „Code execution and file creation“ ein (in neueren Versionen heißt es „Create and edit files“).
2. Öffne claude.ai/customize/skills.
3. Klick auf das Plus, dann auf „Create skill“ und „Upload a skill“.
4. Wähl im Ordner „fuer-die-claude-app“ die ZIP-Datei des Skills, den du willst. Jeder Skill ist eine eigene Datei.
5. Schalte den Skill in der Liste ein.

Bist du in Claude Code mit demselben Konto angemeldet, erscheinen die Skills aus der App dort automatisch mit.


## So arbeitest du damit

Claude wählt den passenden Skill von selbst, wenn deine Bitte dazu passt. In Claude Code kannst du einen Skill auch direkt aufrufen, mit Schrägstrich: /menschlich-schreiben.

Drei Sätze zum Ausprobieren:

- „Schreib mir einen Newsletter über unser neues Angebot. Nutze menschlich-schreiben.“
- „Erklär meinen Kunden in einer kurzen Mail, warum ihre Webseite ein Impressum braucht. Halte dich an einfach-erklaeren.“
- „Prüf meine Seite https://… mit vor-dem-livegang und schreib mir den Bericht.“


## Mach sie zu deinen

Öffne `skills/menschlich-schreiben/meine-stimme.md` und trag ein, wie du schreibst: deine Anrede, Wörter, die du magst, Wörter, die du nie benutzt, und einen Text, der nach dir klingt. Ab dann schreibt Claude in deiner Stimme, und das Prüfskript kennt deine eigenen Tabu-Wörter.

Alle Skills sind einfache Textdateien. Ändere, was nicht zu dir passt. In der Claude-App lädst du einen geänderten Skill einfach noch einmal hoch.


## Gut zu wissen

- Die zwei Prüfskripte brauchen Python 3. Auf dem Mac ist es meist schon da, in der Claude-App immer. Fehlt es, prüft Claude dieselben Punkte selbst.
- Weitere Skills, die ich nutze, darunter humanizer für englische Texte und impeccable für den Feinschliff am Design, stehen im kostenlosen Claude-Code-Startpaket: sabala-mentoring.com/claude-code/startpaket
- Woher die Skills kommen und was du damit machen darfst: LIZENZ.md

Viel Freude damit. Wenn dir ein Skill fehlt, schreib mir: sabala@sabala-mentoring.com

Ilja
