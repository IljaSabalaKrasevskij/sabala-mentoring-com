# Zehn Skills für den Anfang

Ein Skill ist eine Anleitung, die Claude liest, wenn sie gebraucht wird. Damit kann Claude Dinge, die es vorher nicht so gut konnte: deinen Plan mit Fragen prüfen, eine Webseite gestalten, Texte glätten. Mehrere Skills zusammen, oft mit kleinen Helfern dazu, heißen Plugin.

Diese zehn nutze ich selbst. Alle sind kostenlos, ihre Lizenz erlaubt die Nutzung (MIT oder Apache 2.0). Stand: November 2026.

**Mein Rat:** Fang mit einem einzigen an. Nimm den, der zu der Aufgabe passt, die du am häufigsten erledigst.


## So installierst du sie

Die Befehle tippst du in Claude Code ein, nicht ins normale Terminal. Claude Code zeigt dir danach den Skill und fragt, wo er gelten soll. Wähl „Install for you (user scope)“, dann hast du ihn in allen Projekten.

Die ersten fünf stammen aus dem offiziellen Marktplatz von Anthropic. Den kennt Claude Code schon, eine Zeile reicht. Die anderen fünf kommen von unabhängigen Entwicklern. Dort meldest du zuerst deren Marktplatz an, das ist die erste der beiden Zeilen.

Danach ist der Skill sofort da. Muss Claude Code dafür die Plugins neu laden, erledigt es das von selbst.


## Aus dem offiziellen Marktplatz von Anthropic

### 1. Erklärmodus (explanatory-output-style)
Claude erklärt beim Arbeiten kurz, warum es etwas so baut. So lernst du nebenbei, was in deinen Dateien passiert. Einmal installiert, ist er in jeder Unterhaltung an. Abschalten kannst du ihn über /plugin.

    /plugin install explanatory-output-style@claude-plugins-official

### 2. CLAUDE.md pflegen (claude-md-management)
Prüft deine CLAUDE.md und schlägt Verbesserungen vor. Sag dazu: „Prüf meine CLAUDE.md.“ Am Ende einer Sitzung hält /revise-claude-md fest, was ihr dabei gelernt habt.

    /plugin install claude-md-management@claude-plugins-official

### 3. Eigene Skills bauen (skill-creator)
Macht aus einem Ablauf, den du oft brauchst, deinen eigenen Skill. Sag zum Beispiel: „Bau mir einen Skill, der meine Angebotsmails nach meiner Vorlage schreibt.“

    /plugin install skill-creator@claude-plugins-official

### 4. Gestaltung für Webseiten (frontend-design)
Für Webseiten und Oberflächen, die nicht nach Vorlage aussehen. Claude nutzt den Skill von selbst, sobald du eine Seite baust.

    /plugin install frontend-design@claude-plugins-official

### 5. Plan hinterfragen (mattpocock-skills)
Mit /grill-me stellt dir Claude so lange Fragen zu deinem Vorhaben, bis jede offene Stelle geklärt ist. Ideal vor einem neuen Angebot oder einer neuen Webseite. Das Plugin bringt weitere Skills mit, die meisten davon sind für Entwickler gedacht.

    /plugin install mattpocock-skills@claude-plugins-official


## Von unabhängigen Entwicklern

### 6. Weniger Code, gleiches Ergebnis (ponytail)
Bringt Claude dazu, die einfachste Lösung zu bauen, die wirklich läuft. Das spart Platz im Gedächtnis und schont dein Kontingent im Abo. Mehr dazu: https://sabala-mentoring.com/blog/claude-code-weniger-code-ponytail

    /plugin marketplace add DietrichGebert/ponytail
    /plugin install ponytail@ponytail

### 7. Statuszeile (claude-hud)
Zeigt unten im Terminal, wie voll das Gedächtnis der Unterhaltung ist und woran Claude gerade arbeitet. Nach der Installation tippst du einmal /hud, das richtet die Zeile ein. Es braucht Node.js ab Version 22.18. Fehlt es, hilft /hud dir weiter.

    /plugin marketplace add jarrodwatts/claude-hud
    /plugin install claude-hud@claude-hud

### 8. Pläne, die einen Neustart überstehen (planning-with-files)
Legt bei großen Aufgaben den Plan, die Notizen und den Fortschritt als Dateien in deinem Projekt ab. Bricht eine Unterhaltung ab oder machst du mit /clear neu auf, liest Claude dort nach und macht weiter. Sag zu Beginn eines großen Vorhabens: „Nutz planning-with-files.“

    /plugin marketplace add OthmanAdi/planning-with-files
    /plugin install planning-with-files@planning-with-files

### 9. KI-Klang aus Texten nehmen (humanizer)
Findet typische Muster von KI-Texten, etwa aufgeblähte Wörter und immer gleiche Satzbauten, und schreibt sie um, ohne den Inhalt zu ändern. Aufruf: /humanizer. Die Muster stammen aus einer Liste der englischen Wikipedia, darum wirkt er bei englischen Texten am stärksten. Er braucht eine aktuelle Version von Claude Code (claude update).

    /plugin marketplace add blader/humanizer
    /plugin install humanizer@humanizer

### 10. Design prüfen und polieren (impeccable)
Kritisiert und verfeinert das Design deiner Webseite: Abstände, Schriften, Farben, Hierarchie. Tipp einmal je Projekt /impeccable init, danach zum Beispiel „/impeccable critique die Startseite“ oder „/impeccable polish“.

    /plugin marketplace add pbakaus/impeccable
    /plugin install impeccable@impeccable


## Bevor du einen fremden Skill installierst

Skills und Plugins können auf deinem Rechner Befehle ausführen. Prüf deshalb vor jeder Installation fünf Dinge:

1. **Wer steht dahinter?** Ein Entwickler oder eine Firma mit Namen und Geschichte.
2. **Welche Lizenz?** MIT oder Apache 2.0 erlauben die Nutzung.
3. **Wird er gepflegt?** Die letzte Änderung sollte nicht lange her sein.
4. **Was steht in der SKILL.md?** Die Datei ist kurz und in normaler Sprache geschrieben. Steht dort etwas, das du nicht willst, lass es.
5. **Frag Claude.** Gib Claude Code den Link und schreib: „Prüf dieses Repository, bevor ich es installiere. Was tut es auf meinem Rechner?“
