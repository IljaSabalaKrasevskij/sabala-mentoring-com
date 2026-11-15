---
name: sicher-bauen
description: Achtet beim Schreiben von Code und vor dem Ausliefern auf die Sicherheits-Grundlagen und belegt sie mit echten Proben. Geprüft werden Eingaben und Datenbank-Abfragen, Anmeldung und Passwörter, Rechte, öffentliche Formulare, Geheimnisse und das Repository. Nutzen bei neuen Routen, Formularen, Anmeldung, Datenbanken, Zugangsdaten, öffentlichen Repositories und fremdem Code. Auch bei "ist das sicher", "Login bauen", "Formular mit Datenbank", "API-Schlüssel", "Repo öffentlich machen" oder "Security-Check".
---

# Sicher bauen

Sicher ist ein Stück Software, wenn man es belegen kann: Eine Anfrage ohne Anmeldung wird abgewiesen, eine fremde Kennung läuft gegen die Wand, kein Schlüssel liegt im Repository. Dieser Skill sorgt beim Bauen für die Grundlagen und prüft sie am Ende mit echten Proben.

## Vor dem ersten Code

Klär drei Dinge und schreib sie auf:

1. **Wer darf was?** Die Rollen als kleine Tabelle.
2. **Wem gehört welcher Datensatz?**
3. **Welche Geheimnisse braucht es,** und wo liegen sie?

Gibt es schon echte Daten, sicherst du sie vorher und prüfst, dass sich die Sicherung wieder einspielen lässt.

## Sechs Pflichten bei jedem Code

1. **Datenbank-Abfragen mit Platzhaltern,** nie aus Text zusammengesetzt.
2. **Geheimnisse in der Umgebung** (`.env`), nie im Code.
3. **Eingaben auf dem Server gegen ein Schema prüfen,** zum Beispiel mit zod. Die Prüfung im Browser ist nur Komfort.
4. **Anmeldung an einem Kontrollpunkt** vor allen geschützten Routen.
5. **CORS ohne Stern:** nur die Herkünfte, die wirklich zugreifen sollen.
6. **Passwörter mit scrypt oder argon2 hashen,** nie synchron. Synchrones Hashen blockiert den Server.

## Eingaben und Daten

- Prüfen, säubern, bei der Ausgabe schützen. Erlaubt-Listen statt Verbots-Listen. Funktionen des Frameworks statt eigener.
- Nur annehmen, was als das erwartete Format angekündigt ist, zum Beispiel `application/json`. Der Preis: Das Formular braucht dann JavaScript. Soll es ohne gehen, nimmst du die normale Formular-Übertragung an und prüfst sie genauso streng.
- Pfade aus Eingaben dürfen den vorgesehenen Ordner nie verlassen.
- Die Fehlermeldung steht am Feld, das Formular bleibt ausgefüllt.
- Fehlt eine Pflichtangabe wie die Zuordnung zu einem Kunden, bricht der Vorgang ab. Es gibt keinen stillen Standardwert.
- Nach jedem Umbau testest du mit genau den Daten, die das echte Formular schickt.

## Anmeldung und Passwörter

- Den Login erfindest du nie selbst. Nimm die Anmeldung des Frameworks oder einen Dienst dafür.
- Sitzungen lassen sich sofort widerrufen. Das Sitzungs-Token ist lang und zufällig, entsteht bei jedem Login neu und liegt in der Datenbank nur als Hash.
- Cookie mit `httpOnly`, `SameSite=Lax` und `Secure`.
- Bremse für Fehlversuche, zum Beispiel fünf in fünfzehn Minuten.
- Gleiche Antwort und gleiche Dauer für „Adresse unbekannt“ und „Passwort falsch“.

## Rechte

- **Verweigern ist der Standard.** Eine neue Funktion erlaubt ausdrücklich eine Rolle.
- Jeder Zugriff prüft, ob der Datensatz dem Angemeldeten gehört.
- Teilen sich mehrere Kunden eine Anwendung, liegt die Trennung an einer Stelle in der Struktur. Sie hängt nie davon ab, dass jede einzelne Route daran denkt.
- Sammel- und Status-Endpunkte prüfst du eigens: Zeigen sie nur das Eigene?
- Ein Dienst, der nicht ins Netz muss, hört nur auf dem eigenen Rechner. Nicht erreichbar schlägt passwortgeschützt, aber offen.

## Öffentliche Formulare

- Bei einer Anmeldung per Mail zählt erst der Klick im Postfach. Das Formular allein ändert an einem bestätigten Kontakt nichts.
- Der Link in der Mail trägt ein langes, zufälliges Token. Es läuft ab, gilt nur einmal und liegt in der Datenbank nur als Hash. Manche Mail-Programme rufen Links von selbst auf. Soll das nicht als Bestätigung zählen, bestätigt erst ein Knopf auf der Zielseite.
- Jede Adresse bekommt die gleiche Antwort, auch wenn eine Obergrenze greift. Sonst lässt sich abfragen, wer eingetragen ist.
- Nichts aus dem Formular wandert ungeprüft in eine Mail. Links in Mails kommen aus einer festen Adresse.
- Obergrenzen je Adresse und je Absender zählt die Datenbank, in derselben Anweisung wie das Speichern. Ein Beispiel: fünf Anmeldungen je Absender in fünfzehn Minuten, drei Mails je Adresse am Tag.
- Hinter einem Proxy oder einer Plattform liest du die Adresse des Absenders aus dem richtigen Kopf der Anfrage. Sonst zählen alle Besucher als einer.
- Schutz vor Automaten ohne fremden Dienst: ein Stempel vom Server, ein unsichtbares Feld, eine Obergrenze je Absender. Der Stempel ist eine signierte Uhrzeit, die das Formular beim Laden bekommt und mitschickt. Kommt er zu früh zurück oder ist er zu alt, wird die Anfrage abgelehnt.
- Ohne echten Mailversand erscheint der Bestätigungs-Link nur lokal im Protokoll, nie im Chat.

## Geheimnisse

- Schlüssel, Tokens und Passwörter stehen nie im Chat, in Notizen oder im Repository.
- Du legst die Felder leer an, der Mensch trägt die Werte selbst ein. Du gibst Werte nie aus und meldest dich nie mit fremden Passwörtern an.
- Landet ein Wert doch im Chat oder in einer Ausgabe: sofort widerrufen, neu erstellen, überall ersetzen.
- Alles, was in der Konfiguration fürs Frontend steht, ist öffentlich. Es liegt im ausgelieferten JavaScript.

## Repository und fremder Code

- In einem öffentlichen Repository bleibt alles Committete öffentlich, auch nach dem Löschen. Es steht in der Historie.
- `.env`, Datenbank-Dateien und Exporte stehen in `.gitignore`. Mit `git ls-files` prüfst du den echten Stand.
- Nie `git add -A`. Du fügst nur benannte Dateien hinzu.
- Fremde Schriften und Bausteine kommen nur hinein, wenn ihre Lizenz das erlaubt. Herkunft und Lizenz stehen im Code.
- Fremde Pakete prüfst du vor dem Installieren: wer dahintersteht, welche Lizenz, ob es gepflegt wird, was die Installations-Skripte tun.
- `npm audit` nie mit `--force`. Erst gezielt beheben und den Unterschied prüfen.

## Beweisen statt behaupten

Am Ende belegst du jede Zeile mit einer echten Probe:

```
SICHERHEITS-CHECK: [Änderung]
Urteil: SAUBER | MIT WARNUNG | STOPP

Bereich               | Wie geprüft                                                    | Ergebnis
Eingaben, Abfragen    | Schema auf dem Server, Platzhalter, echte Formulardaten        |
Anmeldung             | ohne Login, falsches Passwort, erfundenes Token: abgewiesen    |
Rechte                | fremde Kennung abgewiesen, Sammel-Endpunkte zeigen nur Eigenes |
Öffentliches Formular | gleiche Antwort für jede Adresse, Automat mit gefülltem Zusatzfeld, Klick im Postfach |
Grenzen               | jede einmal ausgelöst, auch mit gleichzeitigen Anfragen        |
Geheimnisse           | git ls-files ohne .env und Datenbank, nichts im Frontend       |
Repository, Fremdes   | Sichtbarkeit, Lizenzen, Herkunft, Audit                        |

Offen: [was fehlt, was der Mensch selbst tun muss]
```

- **SAUBER:** Alle Proben sind gelaufen und bestanden.
- **MIT WARNUNG:** bestanden, aber eine Probe ließ sich nicht ausführen, oder es bleibt ein benanntes Restrisiko.
- **STOPP:** Eine Probe ist gescheitert, oder ein Geheimnis liegt offen.

Eine Zeile, die für diese Änderung nicht zutrifft, trägt „entfällt, weil …“. Konntest du eine Probe nicht ausführen, steht dort „nicht geprüft, weil …“.

Ein „sollte passen“ zählt nicht. Jede Grenze löst du einmal wirklich aus.

## Ehrlich bleiben

Dieser Skill deckt die Grundlagen ab. Er ersetzt keine Prüfung durch Sicherheits-Fachleute und keinen Rechtsrat zum Datenschutz. Bei Zahlungen, Gesundheitsdaten oder vielen Nutzern sag das deutlich.
