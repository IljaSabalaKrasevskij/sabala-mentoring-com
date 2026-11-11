# Die Befehle für den Anfang

Befehle mit Schrägstrich tippst du in Claude Code ein, so wie eine normale Nachricht. Sobald du / tippst, zeigt Claude Code eine Liste, aus der du wählen kannst.


## In Claude Code

- **/help** zeigt alle Befehle.
- **/init** legt die CLAUDE.md mit den Regeln deines Projekts an.
- **/memory** öffnet deine CLAUDE.md-Dateien zum Bearbeiten.
- **/clear** startet eine neue Unterhaltung mit leerem Verlauf. Nimm das, wenn du mit einer neuen Aufgabe beginnst.
- **/compact** fasst einen langen Verlauf zusammen, damit wieder Platz ist.
- **/context** zeigt dir als Raster, wie voll das Gedächtnis der Unterhaltung gerade ist.
- **/resume** holt eine frühere Unterhaltung zurück.
- **/rewind** spult die Unterhaltung und deine Dateien auf einen früheren Stand zurück.
- **/model** wechselt das Modell, etwa zu Sonnet.
- **/usage** zeigt, wie viel du von deinem Abo schon verbraucht hast.


## Tasten

- **Esc** hält Claude mitten in der Arbeit an. Was schon fertig ist, bleibt. Danach kannst du neu ansagen, was du willst.
- **Esc zweimal** bei leerer Eingabe öffnet das Menü zum Zurückspulen, so wie /rewind.
- **Shift + Tab** stellt um, was Claude ohne Rückfrage darf:
  - Manual: Claude fragt vor jeder Änderung. Gut für den Anfang.
  - accept edits: Claude ändert Dateien, ohne zu fragen.
  - plan: Claude plant nur und ändert nichts. Gut für größere Vorhaben, du prüfst erst den Plan.
- **@** und ein Dateiname zeigen Claude eine bestimmte Datei, zum Beispiel: „Lies @ideen.md und mach daraus einen Newsletter.“


## Im Terminal, bevor Claude Code läuft

- **claude** startet Claude Code im aktuellen Ordner.
- **claude -c** setzt die letzte Unterhaltung in diesem Ordner fort.
- **claude update** holt sofort die neueste Version.
- **claude doctor** prüft deine Installation und schlägt Lösungen vor.


## Zwei Gewohnheiten, die viel sparen

1. **Eine Aufgabe, eine Unterhaltung.** Ist eine Aufgabe erledigt, tipp /clear. Ein langer Verlauf macht Claude langsamer und verbraucht mehr von deinem Abo.
2. **Erst fragen, dann bauen.** Bei allem, was größer ist, schalt mit Shift + Tab in den Modus plan. Claude schreibt dir dann zuerst einen Plan, und du entscheidest, ob es so losgeht.
