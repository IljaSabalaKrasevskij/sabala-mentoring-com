---
name: ki-suche
description: Sorgt dafür, dass KI-Suchen wie ChatGPT, Perplexity, Copilot oder die KI-Übersicht von Google eine Seite lesen und zitieren können. Schreibt Antwort-Absätze und Fragen-Blöcke, prüft, was KI-Crawler wirklich sehen, legt die llms.txt an und misst mit festen Testfragen, ob die Seite genannt wird. Nutzen bei "GEO", "KI-Sichtbarkeit", "ChatGPT nennt mich nicht", "llms.txt", "AI Overviews", "Wie komme ich in KI-Antworten vor" oder "Warum zitiert mich Perplexity nicht".
---

# In KI-Antworten vorkommen

Eine KI zitiert, was sie lesen kann und was eine Frage direkt beantwortet. Dieser Skill sorgt für beides und misst ehrlich, ob es wirkt. Versprechen kann das niemand.

## Der Ablauf

1. **Testfragen festlegen,** so wie Kunden fragen: je Angebot eine, dazu einige allgemeine und eine zur Marke. Fünf bis fünfzehn reichen.
2. **Nullmessung:** Jede Frage in den KI-Systemen stellen, mindestens dreimal. Notieren: genannt, verlinkt, wer stattdessen, welche Quellen.
3. **Zitierte Quellen lesen:** Welche Form haben sie, und was fehlt ihnen?
4. **Zugang prüfen:** Dürfen die KI-Crawler die Seite lesen, und steht das Wichtige im ausgelieferten HTML?
5. **Schreiben:** Antwort-Absatz, Fragen als Überschriften, Fragen-Block, ein Baustein zum Herauslösen.
6. **Angaben für Maschinen setzen:** strukturierte Daten, eine einheitliche Identität.
7. **`llms.txt` schreiben** oder nachziehen.
8. **Freigabe holen,** dann die ausgelieferte Seite prüfen.
9. **Messung wiederholen,** mit denselben Fragen und Systemen.

**Fragt die Person nur nach einem Teil,** zum Beispiel nur nach der `llms.txt`, lieferst du diesen Teil und zwei Sätze dazu, was sonst noch zu prüfen wäre. Den ganzen Bericht gibt es nur für den ganzen Auftrag.

Die Testfragen kommen aus dem, was Kunden wirklich fragen. Kennst du es nicht, schlägst du Fragen vor, markierst sie als Vorschlag und lässt sie bestätigen.

## So schreibst du, damit eine KI zitieren kann

- **Antwort vorab:** Oben auf jeder wichtigen Seite steht ein Absatz von 40 bis 60 Wörtern mit wer, was, für wen. Er muss für sich allein stehen, als normaler Fließtext.
- **Fragen als Überschriften,** so wie Menschen sie stellen. Direkt darunter die Antwort in zwei bis drei Sätzen, dann die Tiefe.
- **Fragen-Block** aus echten Kundenfragen, als sichtbarer Text, jede Antwort 50 bis 100 Wörter.
- **Ein Baustein zum Herauslösen:** eine Tabelle oder eine Schrittliste, die man einzeln zitieren kann.
- **Etwas Eigenes:** eine eigene Zahl, eine eigene Messung oder ein eigener Fall. Texte, die nur sagen, was alle sagen, bleiben austauschbar.
- **Belege:** mindestens drei Quellen mit Link. Jede Zahl mit Quelle und Datum, am Original geprüft.
- **Klar benennen:** Definitionen an den Anfang des Absatzes. Jede Abkürzung beim ersten Auftreten ausschreiben. Ort und Stand nennen.
- **Sichtbares „aktualisiert am“** und der Autor mit Link zur Über-mich-Seite.
- **Eine eigene Seite für die enge Frage:** Für „Wer macht X für Y in Z?“ lohnt eine Seite mit genau diesen Wörtern und einem Beleg.

## Was KI-Crawler wirklich lesen

Die meisten KI-Crawler führen kein JavaScript aus. Sie sehen nur, was im ausgelieferten HTML steht.

- Prüf es mit einem Abruf ohne Browser, zum Beispiel `curl -A GPTBot https://deine-seite.de`. Hast du keine Befehlszeile, lass dir den Seitenquelltext geben.
- **Zahlen, die hochzählen,** tragen im HTML den Endwert. Sonst liest der Crawler eine Null.
- **Inhalte in Reitern und Aufklappern** stehen im HTML und sind nur optisch verborgen.
- **Strukturierte Daten** stehen als echtes Skript im HTML.
- **`robots.txt`** lässt die Crawler zu, die du willst (zum Beispiel Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot), und nennt die Sitemap. Auf der Live-Adresse steht kein `noindex`.

## Die llms.txt

Die Datei liegt im Hauptverzeichnis und sagt Maschinen in Kurzform, wer du bist und welche Seiten wichtig sind.

```
# [Name]
> [Ein bis zwei Sätze: wer, was, für wen. Sprache. Sitz.]

## [Abschnitt, zum Beispiel: Angebote · Belege · Artikel · Über mich · Rechtliches]
- [Seitenname](volle Adresse): [ein Satz, was die Seite bietet]
```

- Ohne Preise, Termine und Platzzahlen. Die veralten.
- Fehlt dir der Name oder die Kurzbeschreibung, setzt du einen sichtbaren Platzhalter und fragst.
- Startseite und Kontakt stehen im ersten Abschnitt.
- Ohne tote Links. Eine Adresse, die es nicht mehr gibt, meldest du, statt sie zu übernehmen.
- Jede neue wichtige Seite kommt in die Sitemap und in die `llms.txt`.
- Ehrlich dazu: Kein KI-Anbieter hat zugesagt, die Datei zu lesen (Stand November 2026). Sie ist ein günstiges Signal und kein Hebel mit Garantie.

## Eine Identität

- Ein Name und eine Rolle auf der ganzen Seite, auch in alten Unterseiten.
- Organisation oder Person mit Name, Adresse und Links zu echten, gepflegten Profilen in den strukturierten Daten.
- Profile und Verzeichnisse außerhalb der Seite sagen dasselbe wie die Seite.
- Es gibt eine Über-mich-Seite. Ohne sie fehlt der Beleg, wer hier schreibt.
- Bing nicht vergessen: ChatGPT und Copilot stützen sich bei der Websuche stark auf den Index von Bing. Richte die Bing Webmaster Tools ein und reich dort die Sitemap ein.

## Messen ohne Selbstbetrug

```
Nr | Frage | prüft [Marke, Angebot, Thema] | System, angemeldet?, Region | genannt in x von y Läufen | verlinkte Seite | wer stattdessen | zitierte Quellen
```

- Mindestens drei Läufe je Frage. Im Bericht steht „in einem von drei Läufen genannt“ und nie „Platz 1“.
- Immer dieselben Fragen und dieselben Systeme, sonst ist der Vergleich wertlos.
- Gezählt wird nur, was du im Wortlaut gelesen hast.
- Ist der Markenname auch ein normales Wort, zählt nur die eigene Adresse.
- Am besten stellt die Person die Fragen selbst, in den Systemen, die ihre Kunden nutzen.

## Was du ablieferst

```
KI-SUCHE: [Seite]        Stand: [Datum]

Ampel: grün = in Ordnung · gelb = Mängel · rot = verhindert das Lesen · offen = nicht geprüft

Zugang              | [Ampel] | [wichtigster Befund]
Was Crawler lesen   | ..
Antworten, Fragen   | ..
Daten, Identität    | ..
llms.txt            | ..
Messung             | [x von y Läufen, Datum]

Behoben: ..
Braucht dein Ja: [alle neuen Texte]
Nicht geprüft, weil: ..
```

## Prüfen, bevor du es abgibst

- Beantworten die ersten 40 bis 60 Wörter die Hauptfrage, mit wer, was, für wen?
- Hat jede Frage-Überschrift ihre Antwort direkt darunter?
- Stehen Kernaussagen, Endwerte und Fragen im ausgelieferten HTML?
- Sind Name, Rolle und Angaben überall gleich?
- Nennt die Messung Fragen, Systeme, Zahl der Läufe und Datum?

## Ehrlich bleiben

- Kein Versprechen, dass eine KI die Seite nennt. Erste Wirkung zeigt sich frühestens nach einigen Wochen.
- Eine einzelne Abfrage beweist nichts.
- Zahlen aus fremden Studien verwendest du nur, wenn du das Original gelesen hast.
- In Foren und Verzeichnissen schreibt die Person selbst. Du bereitest vor und veröffentlichst nichts.
