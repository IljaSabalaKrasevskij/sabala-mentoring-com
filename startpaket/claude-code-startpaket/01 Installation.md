# Claude Code installieren

Ein Befehl, eine Anmeldung, ein Ordner. Rechne mit zehn Minuten.


## Was du brauchst

- Einen Mac mit macOS 13 oder neuer, oder Windows 10 ab Version 1809 oder Windows 11. Unter Linux laufen Ubuntu ab 20.04 und Debian ab 10.
- Mindestens 4 GB Arbeitsspeicher und eine Internetverbindung.
- Ein bezahltes Claude-Abo. Claude Code ist ab dem Pro-Plan dabei: 20 Dollar im Monat, bei jährlicher Zahlung 17 Dollar im Monat, jeweils zuzüglich Steuer (Stand November 2026). Im kostenlosen Plan fehlt Claude Code. Alle Pläne im Vergleich: https://sabala-mentoring.com/blog/claude-code-kosten


## Auf dem Mac

1. **Terminal öffnen.** Drück Cmd und Leertaste, tipp Terminal und drück Enter. Es öffnet sich ein Fenster, in das du Befehle schreibst.

2. **Den Befehl einfügen.** Kopier die Zeile, füg sie ins Terminal ein und drück Enter. Der Installer legt Claude Code in deinem Benutzerordner ab.

       curl -fsSL https://claude.ai/install.sh | bash

3. **Prüfen, ob es geklappt hat.** Öffne ein neues Terminal-Fenster und frag die Version ab. Steht dort eine Nummer, ist alles da.

       claude --version

4. **Im Projektordner starten.** Wechsel mit cd in den Ordner, in dem Claude arbeiten soll, und starte Claude Code.

       cd ~/Documents/meine-webseite
       claude

5. **Anmelden.** Beim ersten Start öffnet sich der Browser. Du meldest dich mit deinem Claude-Konto an, danach geht es im Terminal weiter.


## Auf Windows

1. **PowerShell öffnen.** Drück die Windows-Taste, tipp PowerShell und öffne sie. Administratorrechte brauchst du nicht.

2. **Den Befehl einfügen.** Kopier die Zeile, füg sie in PowerShell ein und drück Enter.

       irm https://claude.ai/install.ps1 | iex

3. **Git für Windows dazunehmen.** Claude Code läuft auch ohne. Mit Git für Windows kann es aber Befehle in der Bash ausführen, so wie auf dem Mac. Anthropic empfiehlt es. Du bekommst es unter https://git-scm.com

4. **Prüfen und starten.** Öffne ein neues PowerShell-Fenster, prüf die Version, wechsel in deinen Projektordner und tipp claude. Die Anmeldung läuft wie auf dem Mac über den Browser.

       claude --version
       cd $HOME\Documents\meine-webseite
       claude

Du arbeitest lieber in der Eingabeaufforderung (CMD)? Dann nimm in Schritt 2 diese Zeile:

       curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd


## Ganz ohne Terminal

Die Claude-App für Mac und Windows hat einen eigenen Bereich für Code. Du wählst einen Ordner und schreibst los. Es ist dasselbe Claude Code mit demselben Abo, nur in normalen Fenstern. Für den Einstieg ist das oft angenehmer. Die Befehle aus 02 funktionieren dort genauso.


## Andere Wege für Fortgeschrittene

Wer schon mit einem Paketmanager arbeitet, kann Claude Code auch darüber holen. Diese Wege aktualisieren sich nicht von selbst.

- Mac mit Homebrew: brew install --cask claude-code
- Windows mit WinGet: winget install Anthropic.ClaudeCode (Updates mit winget upgrade)
- npm, braucht Node.js 22 oder neuer, nie mit sudo: npm install -g @anthropic-ai/claude-code


## Updates

Hast du mit dem Befehl von oben installiert, aktualisiert sich Claude Code im Hintergrund von selbst. Die neue Version ist beim nächsten Start da. Willst du sofort aktualisieren, tipp im Terminal:

       claude update


## Wenn es hakt

**„command not found: claude“**
Der Ordner mit Claude Code fehlt in deinem Pfad. Auf dem Mac trägt diese Zeile ihn ein, danach öffnest du ein neues Terminal:

       echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc

Auf Windows nimmst du den Ordner %USERPROFILE%\.local\bin in die Umgebungsvariable Path auf und öffnest PowerShell neu.

**Eine Fehlermeldung mit < oder XmlDocument**
Statt des Installers kam eine Webseite zurück. Meist steckt ein Firmennetz, ein Proxy oder ein Filter dahinter. Probier es in einem anderen Netz oder frag deine IT.

**Fehler 403 beim Herunterladen**
Das Netz blockiert den Download, oder du bist in einem Land, in dem Anthropic Claude nicht anbietet.

**Windows verlangt Git für Windows oder PowerShell**
Installier Git für Windows oder starte die Installation aus PowerShell heraus.

**Im Zweifel: claude doctor**
Der Befehl prüft deine Installation und deine Einstellungen und schlägt Lösungen vor. Er ändert dabei nichts.

       claude doctor


Die ausführliche Anleitung mit Bildern: https://sabala-mentoring.com/blog/claude-code-installieren
