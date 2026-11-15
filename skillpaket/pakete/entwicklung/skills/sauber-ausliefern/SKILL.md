---
name: sauber-ausliefern
description: Führt eine Änderung sauber vom Auftrag bis live. Plan vor Bau, eigener Zweig, nur eigene Dateien im Commit, selbst prüfen mit allen Tests und an der echten Seite, klare Beschreibung, live erst nach ausdrücklichem Ja. Nutzen bei jeder Funktion oder Korrektur in einem Repository, bei Merge und Deploy, bei Übergaben, wenn mehrere Sitzungen im selben Ordner arbeiten und wenn jemand sagt "die Seite funktioniert nicht" oder "ist das live". Auch bei "mach einen PR", "deploy das", "commit und push" oder "schalt das live".
---

# Sauber ausliefern

Sauber ausgeliefert ist eine Änderung, wenn genau das live ist, was geprüft wurde, wenn niemandes Arbeit dabei verloren ging und wenn man es an der echten Adresse sehen kann. Dieser Skill führt durch den Weg dorthin.

## Der Weg in neun Schritten

1. **Verstehen und Plan zeigen.** Sag den Auftrag in eigenen Worten. Bei allem Größeren kommt erst der Plan, dann das Ja.
2. **Lage prüfen:** `git branch --show-current`, `git status`, `git fetch`. Arbeitet noch jemand in diesem Ordner?
3. **Fremden offenen Stand sichern** und sagen, dass du sicherst: als Patch und Kopie außerhalb des Ordners, zum Beispiel `git diff > ../sicherung-<datum>.patch`, dazu die neuen Dateien kopieren.
4. **Eigener Platz für deine Arbeit:**
   - Arbeitet noch jemand im Ordner, oder liegen dort fremde offene Änderungen: eine eigene Arbeitskopie, `git worktree add ../<name> -b <zweig>`. Der Ordner selbst bleibt, wie er ist.
   - Sonst reicht ein eigener Zweig vom frischen Hauptzweig: `git fetch && git switch -c <zweig> origin/main`.
   - Gibt es kein entferntes Ziel, zweigst du vom lokalen Hauptzweig ab.
5. **Prüfliste schreiben, dann bauen.**
6. **Selbst prüfen** am Stand, der ausgeliefert wird: alle Tests, der Bau, die echte Seite. Jeden Punkt der Liste abhaken.
7. **Nur die eigenen Dateien committen,** mit einer Beschreibung nach dem Muster unten.
8. **Eine direkte Frage zum Livegang.** Nach dem Ja den Hauptzweig holen, neu prüfen, genau den geprüften Stand mergen.
9. **An der Live-Adresse nachprüfen,** aufräumen, Abschluss melden.

**Bei einer Kleinigkeit** wie einer geänderten Zeile schrumpft der Weg: Lage prüfen, eigener Platz, ändern, ansehen, committen, fragen. Plan, Prüfliste und lange Beschreibung entfallen.

**Was „live“ heißt:** der Schritt, nach dem andere die Änderung bekommen. Bei einer Webseite ist das das Ausliefern, in einem Repository ohne Seite der Merge in den Hauptzweig.

## Plan vor Bau

- Erst verstehen, dann handeln: vorhandene Bausteine ansehen, Wege mit Aufwand nebeneinanderlegen, eine Empfehlung nennen, die Entscheidung abwarten.
- Ein kleiner, klarer Auftrag wird genau so umgesetzt. Was dir nebenbei auffällt, nennst du in einem Satz und fasst es nicht an.
- Kommt mitten in der Arbeit eine neue Idee, sagst du sofort in einem Satz, ob sie jetzt mitkommt oder danach.
- Du sagst nie „fertig“, solange es kein Ergebnis gibt, das man ansehen kann.
- Große Umbauten entstehen als eigene Fassung neben dem Original, damit es einen Rückweg gibt.

## Zweig und Commit

- **Nie `git add -A`.** Du fügst nur benannte Dateien hinzu.
- Stehen fremde Änderungen in derselben Datei, kommen nur deine Zeilen in den Commit. Prüf es mit `git diff --cached`.
- Kein `git stash` in einem Ordner, in dem noch jemand arbeitet, und kein Commit mit fremden Dateien.
- Hat der Hauptzweig sich bewegt, holst du ihn zuerst: `git fetch`, dann `git merge --ff-only origin/main` oder ein Rebase deines Zweigs.
- Nach dem Commit zeigt `git diff --stat` gegen den Hauptzweig nur deine Dateien.
- Eine Ignore-Regel kann eine Datei still verschlucken. Mit `git ls-files <ordner>` siehst du, was wirklich im Repository liegt.

## Mehrere Sitzungen im selben Ordner

- Ein Ordner gehört einer Sitzung. Für parallele Arbeit bekommt jede Aufgabe eine eigene Arbeitskopie (`git worktree`) mit eigenem Zweig.
- Vor jedem Schreiben liest du die Datei frisch ein.
- Gemeinsame Dateien wie die Paketliste änderst du zeilenweise und nie blind.
- Nach jedem Schreiben läuft der schnelle Check, damit jeder Zwischenstand baubar ist.

## Selbst prüfen

- Vor dem Commit laufen **alle** Tests des Projekts, nie nur die eigenen.
- Geprüft wird der Stand, der ausgeliefert wird, und nicht der Arbeitsordner mit seinen offenen Änderungen.
- Sichtbares siehst du dir selbst an, am Laptop und am Handy, bevor du es zeigst.
- Formulare testest du mit echten Formulardaten, aber ohne echten Versand.
- Ein grüner Status ist kein Beweis. Sieh dir das Ergebnis an.

## Wenn jemand sagt „funktioniert nicht“

Die Reihenfolge ist fest:

1. die ausgelieferte Seite abfragen, zum Beispiel mit `curl`
2. den lokalen Stand ansehen
3. Git: Ist die Korrektur überhaupt gespeichert und gepusht?
4. erst dann am Code arbeiten

Oft liegt die Korrektur seit Tagen ungespeichert im Arbeitsordner, und lokal sieht alles richtig aus.

## Live gehen

- **Nichts geht live ohne ausdrückliches Ja.** Die Frage kommt direkt vor dem Schritt: „Soll ich jetzt live schalten?“ Ein Ja vom Anfang der Arbeit reicht nach vielen Änderungen nicht.
- Vor dem Merge holst du den Hauptzweig und prüfst neu.
- Du mergst genau den geprüften Stand, zum Beispiel mit `gh pr merge <nr> --squash --match-head-commit <sha>`.
- Danach prüfst du selbst an der Live-Adresse und nennst den Beleg: Statuscode, Prüfsumme oder Foto.
- Der Rückweg steht vorher fest, zum Beispiel `git revert` und Push.
- Nach dem Merge: Hauptzweig holen, den erledigten Zweig löschen.
- Hält eine Schutzregel einen Schritt an, umgehst du sie nicht. Du machst den Rest fertig und fragst.
- Eine Regel in der Regeldatei ist eine Bitte. Was auf keinen Fall passieren darf, braucht eine technische Sperre, zum Beispiel einen Hook oder einen Test.

## Pakete und Übergaben

- Ein Upload-Paket enthält alles, was der Einstiegspunkt lädt, und nie `.env`, Datenbanken oder `node_modules`.
- Eine Übergabe gilt erst, wenn das Paket frisch entpackt die eigene Anleitung Schritt für Schritt durchläuft.
- Bei einem Umzug leitest du alte Adressen um und prüfst jede einzelne.

## Die Beschreibung für Commit und PR

```
[Bereich]: [Ergebnis in einem Satz]

Anlass: [wer wollte was, oder der Messbefund mit Zahl]
Änderungen
- [Ort oder Datei]: [was sich ändert, mit Wert vorher und nachher]
Unverändert: [was bewusst gleich bleibt]
Geprüft: alle [N] Tests · [durchgespielte Fälle] · [Breiten oder Geräte] · Bau auf dem Stand des Hauptzweigs
Offen: [was fehlt, was der nächste Schritt braucht]
Fremdes: [mitgenommene Teile anderer Arbeit, Herkunft, Lizenz]
```

## Die Abschlussmeldung

Sie trennt drei Dinge und ist so kurz wie der Auftrag:

- **Gebaut:** was sich geändert hat und wo es liegt (Zweig, Arbeitskopie, Commit)
- **Geprüft:** womit, mit Beleg
- **Offen:** was fehlt oder nicht geprüft werden konnte, und was der Mensch tun muss, damit er die Änderung sieht

## Prüfen, bevor du fertig meldest

- Bei Größerem: War der Plan gezeigt, bevor gebaut wurde?
- Zeigt der Vergleich mit dem Hauptzweig nur die eigenen Dateien?
- Liefen alle Tests und der Bau auf genau dem Stand, der ausgeliefert wird?
- Kam das Ja zum Livegang auf eine direkte Frage, kurz vor dem Schritt?
- Ist die Live-Adresse nachgeprüft, mit Beleg?
