# Sabala Outreach-Agent — Vollständige Methodologie & Architektur

> **Master-Referenz für alle zukünftigen Agent-Builds in Sabala-Mentoring + CHK + Studios.**
> Erstellt: 2026-05-10 · Sabala Mentoring · von Ilja + Claude in 4-Stunden-Iterations-Session

---

## Kernthese

> *"In einer Zeit, in der KI alles billig macht, sind Qualität, Glaubwürdigkeit und Vertrauen die seltensten Werte geworden — und damit die wichtigsten."*

Dieses Dokument beschreibt das **vollständige System** eines Premium-Cold-Outreach-Agenten, der vom Prospect-Research bis zur 14-Tage-Email-Sequenz autark läuft, ohne Funnel-Sprache zu verwenden, und der **methodisch übertragbar** ist auf andere Brands (CHK, Diamond Force, Kunden-Outreach).

Das Ziel ist nicht "ein Outreach-Tool". Das Ziel ist eine **Skill-Architektur**, die Brand-Voice-DNA, Anti-Pattern-Wissen und Daten-Hygiene in einem System kombiniert, das auch beim 100. Prospect noch konsistent Premium liefert.

---

## Inhalts-Karte

1. [Die große Idee](#1-die-große-idee)
2. [Die Architektur](#2-die-architektur)
3. [Die 3-Email-Sequenz](#3-die-3-email-sequenz)
4. [Die 6 Anti-Patterns](#4-die-6-anti-patterns)
5. [Die System-Prinzipien](#5-die-system-prinzipien)
6. [Die Lernungen](#6-die-lernungen-aus-der-bau-session)
7. [Das Blueprint](#7-das-blueprint-für-andere-brands)
8. [Status heute](#8-status-heute)
9. [Wiederverwendbare Kernbotschaften](#9-wiederverwendbare-kernbotschaften)
10. [Quellen / Vault-Doku](#10-quellen--vault-doku)

---

## 1. Die große Idee

### Das Problem

Cold-Outreach-Tools wie Lemlist, Smartlead, Apollo dominieren den Markt. Sie funktionieren auf Volumen-Logik: möglichst viele Mails an möglichst viele Prospects, mit AI-personalisierten Hooks. Das produziert KI-typische Texte mit "Hey [first_name], I noticed your work in [industry]..." und ähnlicher Hohlheit.

In einer Zeit, in der KI Texte massenhaft erzeugt, ist genau **diese Generic-Mass-Personalisation tot**. Empfänger erkennen das Pattern in Sekunden — und lehnen ab. Premium-Coaches/Therapeuten/Berater sind besonders sensibel, weil sie selbst trainiert sind, Authentizität von Performance zu unterscheiden.

### Die Lösung — Anti-Funnel-Outreach

Wir bauen **kein Volume-Tool**. Wir bauen einen **High-Touch-Skill** mit:

- Selektivem ICP-Filter (max. 100-200 Prospects/Monat)
- Hand-validierter Voice (6-Iteration-Refinement)
- Personalisierung im PDF, nicht im Email-Body (2-Stufen-Authentizität)
- Anti-Pattern-Validation auf Code-Ebene
- Sequenz von 3 Mails über 14 Tage mit klarer Eskalations-Logik
- Vollständig autonom nach Setup (launchd-Cron)

### Das Kernprinzip

> **"Vertrauen kommt zuerst. Pitch nie."**

Im Cold-Outreach gibt's zwei Conversion-Hebel: **Conversation-Trust** (Gespräch baut Vertrauen in Echtzeit) und **Credibility-Trust** (Arbeit demonstriert Vertrauen vorab). Sabalas System operiert auf beiden Ebenen — das Audit-PDF baut Credibility-Trust, das 45-Min-Klärungsgespräch (wenn es kommt) baut Conversation-Trust.

Niemals beides gleichzeitig in der Cold-Email — das wäre der CTA-Widerspruch (siehe Anti-Pattern 3).

---

## 2. Die Architektur

### Vier-Schichten-Modell

Das System ist in 4 Schichten organisiert, jede mit klarer Verantwortung:

| Schicht | Was lebt hier | Beispiel-Files |
|---|---|---|
| **🛠 Code** (Skill-Helpers) | Python-Skripte, automatisierungs-fähig | `~/.claude/skills/sabala-prospect-research/helpers/` |
| **🎯 Operativ** (Notion-Cockpit) | Live-Pipeline, du-siehst-täglich-rein | Notion-DB "📤 Outreach-Pipeline" |
| **📚 Vault-Doku** (Markdown) | Methodologie, Voice-Guides, Anti-Patterns | `~/Documents/_Obsidian_Vault/04_Ressourcen/...` |
| **🧠 Memory** (auto-loaded) | Cross-Session-Wissen, Doctrines | `~/.claude/projects/.../memory/` |

Jede Schicht zeigt auf die andere. Wenn ich (Claude) bei einer zukünftigen Session eine Outreach-Mail schreibe:
1. Memory wird automatisch geladen (Anti-Patterns, Voice-Doctrine)
2. Memory verweist auf Vault-Doku (für Detail-Begründung)
3. Vault-Doku verweist auf Skill-Templates (operativ)
4. Skill-Templates importieren von `constants.py` (Single-Source-of-Truth)

### Source-of-Truth-Map

Jeder Datentyp lebt an **genau einem Ort**. Die Map:

| Datentyp | Source-of-Truth | Spiegel/Verknüpfung |
|---|---|---|
| Prospect-Stammdaten (Name, Email, Brand) | SQLite `prospects` | Notion-Card |
| Outreach-Status (Stage) | SQLite `outreach_sends` | Notion-Card-Stage |
| Send-Historie (alle Sends, message_ids) | SQLite `outreach_sends` | — |
| Audit-PDF (File) | Filesystem `outreach/` | Notion-Card-Property |
| Email-Templates | Skill `templates/` | — |
| Voice-Doku | Vault `00_Kontext/Schreibstil.md` | — |
| Konstanten (Links, Codes, Pfade) | Skill `constants.py` | Vault-Map |
| Brand-Voice-Anti-Patterns | Vault + Memory | Skill-Template-Frontmatter |

### Tools-Stack

| Tool | Rolle | Warum dieses |
|---|---|---|
| **Gmail-API** (OAuth) | Email-Versand | Sabala nutzt Gmail eh; OAuth-Token auto-refresh; Premium-Deliverability |
| **SQLite** (`finanz.db`) | Archiv + Statistik | Lokal, kein Service nötig, 100k+ Rows ohne Performance-Drop |
| **Notion** (DB + Views) | Cockpit + Approval-UI | Sabala arbeitet täglich darin; visueller Status-Wechsel |
| **Firecrawl-Scraper** | Email-Discovery + Website-Research | Headless, schneller als Chrome, gute Markdown-Extraction |
| **launchd** (macOS) | Daily-Cron | Native, kein Python-Daemon nötig, wake-on-schedule |
| **Mailtrack** (geplant) | Open-Tracking | Browser-Extension, kostenlos, Setup in 1 Min |
| **TidyCal** | Termin-Buchung | Existing in Sabala-Setup; Webhook-fähig |
| **Thrivecart** | Diamond-Force-Checkout | Existing; Coupon-Code-Support `CUSTOMGPT20` |

### Datenfluss (vereinfacht)

```
[Prospect-URL] → prospect-research-Skill
                 ├─ scrape Website
                 ├─ scrape_email.py → email
                 ├─ ICP-Score berechnen
                 ├─ research.md schreiben
                 ├─ render_audit_pdf.py → PDF
                 └─ DB-Insert + Notion-Card

[Sabala approvet in Notion] → production_send.py --email-position 1
                              ├─ Email rendern aus Template
                              ├─ Gmail-API send
                              ├─ outreach_sends-Insert
                              └─ Notion-Card-Stage → "📤 Sent"

[Day +7, daily 09:00] → daily_outreach.py
                        ├─ check_replies.py → Gmail-API-Poll
                        ├─ Email 2 Kandidaten finden + senden
                        └─ Email 3 Kandidaten finden + senden

[Reply ODER Termin] → Sequenz stoppt automatisch
```

---

## 3. Die 3-Email-Sequenz

### Übersicht

| # | Day | Subject-Pattern | Funktion | CTA |
|---|---|---|---|---|
| 1 | 0 | "Drei Beobachtungen, {Name}" | Quality-Demo + PDF-Geschenk | **keiner** |
| 2 | +7 | "Falls etwas resoniert hat, {Name}" | Tür für Gespräch öffnen | TidyCal-Link |
| 3 | +14 | "Eine kleinere Tür, {Name}" | Diamond Force Soft-Bridge | CUSTOMGPT20-Code |

**Stop-Bedingungen:** Jede Reply, jede Termin-Buchung → Sequenz endet automatisch.

### Email 1 — Initial v6 (Day 0)

**Funktion:** Quality-Demonstration. Keine Sales-Sprache. Audit-PDF ist das Geschenk. Body ist universell — Personalisierung lebt im PDF.

**Voice-Anker:**
- "in einer Zeit, in der KI alles billig macht..." — KI-Zeit-Frame als Hook
- "Ich pitche dir nicht. Stattdessen versuche ich, dir einen Eindruck meiner Arbeit zu geben — was bei dir davon ankommt, entscheidest du selbst." — Anti-Pitch + Empfänger-Empowerment
- "In 10 Minuten weißt du, wo dein Auftritt deiner Arbeit noch hinterherhinkt — und was du heute schon ändern kannst." — Konkretes Outcome-Versprechen mit Zeit + Verb
- "aber Vertrauen kommt für mich zuerst" — Prinzip explizit
- "Speichere es einfach kurz, schau später in Ruhe rein." — Mikro-Action (low ask)
- "Du musst nicht antworten. Nimm es, wenn du etwas davon brauchen kannst." — No-Pressure-Schluss

**Was die Email NICHT hat:**
- Keinen Termin-Button (CTA-Widerspruch zu "ich pitche dir nicht")
- Keine Selbst-Behauptung ("meine Arbeit spricht für sich" wäre überheblich)
- Keine emotionalen Claims ("was mich besonders berührt hat" wäre gelogen, da Sabala die Seite nicht persönlich gesehen hat)

### Email 2 — Invitation v2 (Day +7)

**Funktion:** Reflexionszeit anerkennen. Tür für Gespräch öffnen. Individuell-offen, nicht "buche dieses fixe Angebot".

**Voice-Anker:**
- "Vielleicht hast du reingeschaut, vielleicht nicht — beides ist okay." — Reflexionszeit-Anerkennung ohne Schuld
- "Die Angebote auf meiner Webseite sind Orientierung, nicht Schablone." — Spiegelung der Coach-Logik
- "Generische Strategien funktionieren bei dir nicht, weil deine Arbeit nicht generisch ist." — Sabala-Voice-Anker
- "melde ich mich in einer Woche noch ein letztes Mal — danach Funkstille." — Ankündigung der 3. Mail (Trust-Move)

### Email 3 — Diamond Force v5 (Day +14)

**Funktion:** Soft-Bridge zu kleinerer Tür. Down-Sell mit Würde. Last contact, dann 6 Monate Pause.

**Voice-Anker:**
- "Heute eine kleinere Tür — für die Phase, in der du selbst Hand anlegen willst, mit Werkzeug, das nicht generisch ist." — Neutral, nicht herabwertend
- "Was sie anders macht: sie fragen, statt zu raten." — Echter Mechanismus-Anker (nicht generisches "schneller, klarer")
- "Einmaliger Kauf, kein Abo. Lebenslang deins." — Risk-Reversal in 3 Wörtern
- "Wozu, wenn du Claude oder ChatGPT eh nutzt?" — Objection-Handling explizit

**Sales-Psychology-Struktur:** Bridge → Frame-Reset → Hook → Pain+Use → CTA #1 (mid) → Optional Detail → CTA #2 (end) → Soft Close

**Wichtig:** v5 ist 270 Wörter — kompakt, weil warmer Prospect (3. Berührung). Längere Pain-Education gehört in Email 1, nicht hier.

---

## 4. Die 6 Anti-Patterns

Während der 6-Iterations-Refinement-Session hat Sabala diese 6 Anti-Patterns aufgedeckt. Sie sind jetzt **System-Wissen** — verankert in 4 Schichten.

### ❌ 1. Falsche emotionale Claims

**Symptom:** *"Was mich besonders berührt hat..."* obwohl der Sender die Seite nie persönlich gesehen hat.

**Warum gefährlich:** Im KI-Zeitalter ist falsche Emotion das schnellste Vertrauens-Killer-Signal.

**Lösung — 2-Stufen-Authentizitäts-Modell:**
- **Cold-Email:** Body universell, Personalisierung nur im PDF
- **Nach Termin-Buchung:** Erst hier authentische persönliche Auseinandersetzung

### ❌ 2. Sender-Behauptungen statt Empfänger-Einladung

**Symptom:** *"Ich lasse meine Arbeit für sich sprechen."* — Selbst-Behauptung der Qualität.

**Warum gefährlich:** Wirkt überheblich. Premium-Coaches sind besonders sensibel — Selbstlob signalisiert paradox Unsicherheit.

**Lösung:** *"Ich versuche, dir einen Eindruck zu geben — was bei dir davon ankommt, entscheidest du selbst."* Empfänger wird zur Richterin, nicht zum Konsumenten.

### ❌ 3. CTA-Widerspruch zum Anti-Pitch

**Symptom:** *"Ich will dir nichts verkaufen"* + Termin-Buch-Button im selben Body.

**Warum gefährlich:** Das Unterbewusstsein erkennt den Widerspruch sofort.

**Lösung — Phasen-getrennte CTAs:**
- Email 1 = KEIN CTA
- Email 2 = TidyCal-CTA (Gespräch ist jetzt Sinn)
- Email 3 = Thrivecart-Code (Soft-Bridge zu kleinerer Tür)

### ❌ 4. Vage Insider-Sprache

**Symptom:** *"Aber nicht so."* — Leser muss raten, was "so" meint.

**Warum gefährlich:** Insider-Sprache funktioniert für den Sender, nicht für den Cold-Empfänger.

**Lösung:** Prinzip explizit machen: *"aber Vertrauen kommt für mich zuerst."*

### ❌ 5. Nutzen-Beschreibung ohne Outcome

**Symptom:** *"Drei konkrete Beobachtungen + drei Schritte."* — Faktisch korrekt, sagt aber nicht, was sie davon HAT.

**Warum gefährlich:** Wenn das PDF-Öffnen nicht "verkauft" wird, bleibt es ungeöffnet — und das ist die Mikro-Conversion, auf die alles zielt.

**Lösung — Outcome mit Zeit + Verb:** *"In 10 Minuten weißt du, wo dein Auftritt deiner Arbeit hinterherhinkt — und was du heute schon ändern kannst."*

### ❌ 6. Redundanz / Selbstbezug-Doppelung

**Symptom:** *"Eindruck meiner Arbeit"* + (3 Absätze später) *"Eindruck meiner Arbeitsweise"*.

**Warum gefährlich:** Bläht die Mail auf, schwächt jedes einzelne Vorkommen.

**Lösung:** Eine Stelle reicht. Streichen ist Erbarmen für die Lesezeit.

---

## 5. Die System-Prinzipien

### Prinzip 1: Single-Source-of-Truth

**Jeder Datentyp hat genau einen Ort.** Keine Duplikation.

Konkret:
- Konstanten (Links, Codes, Pfade) → `constants.py`
- Voice-Anti-Patterns → `Schreibstil.md` + Memory
- Email-Templates → `templates/email-{01,02,03}.md`
- Prospect-Daten → SQLite `prospects` (Notion ist Spiegel)

**Anti-Pattern:** "Hardcoded Strings überall" — derselbe Thrivecart-Link in 5 Dateien führt beim Update zu Inkonsistenz.

### Prinzip 2: Idempotenz auf Code-Ebene

Jedes Skript prüft "schon gemacht?" bevor es etwas tut. Doppel-Sends sind technisch unmöglich.

Konkret in `production_send.py`:
- `_check_send_already_done(prospect_id, position)` vor jedem Send
- Sequenz-Stop-Check: `replied_at` ODER `meeting_booked_at` → skip

### Prinzip 3: HTML-Pflicht im Code erzwungen

Keine Email verlässt das System ohne sauberen HTML-Body. `gmail_sender.py` wirft `ValueError` bei Plain-Text-only oder leerem HTML.

> *"Premium-Look ist nicht-verhandelbar."* — Ilja, 2026-05-10

### Prinzip 4: Anti-Patterns als 4-Schichten-System-Wissen

Anti-Patterns sind nicht "wir versuchen, dran zu denken" — sie sind:
- **Skill-Template-Frontmatter** (Skill-Output kann automatisch validieren)
- **Vault-Doku** (Schreibstil.md + Outreach-Email-Voice-Guide.md)
- **Memory-Datei** (auto-loaded bei jeder Session)
- **Code-Validation** (z.B. HTML-Pflicht in gmail_sender.py)

### Prinzip 5: "Wir suchen nicht jedes Mal"

Wenn eine Frage wie *"wo ist der Thrivecart-Link?"* auftaucht, ist die System-Map kaputt. Die Lösung:
- Konstante in `constants.py`
- Eintrag in `Outreach-System-Map.md`
- Skill liest direkt aus `constants.py`

### Prinzip 6: Stop-Disziplin (Scope-Discipline)

Cross-Platform-Brand-Audit (Perplexity + Firecrawl für alle Social Profile) wäre wertvoll, aber **zu viel für jetzt**. Sabala selbst hat das aufgeschoben mit *"machen wir's nicht zu groß und zu kompliziert"*. Diese Erkennung von "genug" ist eine eigene Disziplin.

---

## 6. Die Lernungen aus der Bau-Session

### Was wir gelernt haben

1. **Erste Versionen sind selten Sabala-Voice.** Email 1 brauchte 6 Iterationen, um von "Sales-Mail" zu "Gabe ohne Erwartung" zu werden.
2. **Anti-Patterns sind wertvoller als Best-Practices** — sie helfen beim Filtern (was kann raus), nicht beim Schreiben (was kommt rein).
3. **Test-Sends an sich selbst sind Pflicht.** Email-im-Postfach-Sehen unterscheidet sich vom Editor-Lesen.
4. **Schema-Annahmen sind gefährlich.** Beim ersten Real-Send fiel auf, dass `outreach_assets.path` eigentlich `file_path` heißt. → Lehre: vor SQL-Inserts immer `SELECT * LIMIT 1` zur Schema-Verifikation.
5. **"Wrap-up-Mode" ist die gefährlichste Phase.** Da werden Regeln vergessen ("ich frage statt zu suchen").
6. **System-Gaps sind oft "Tool exists, Workflow doesn't use it"** — `scrape_email.py` lag seit v0.4 im Skill, war aber nicht Teil des Standard-Workflows. Behoben in V1.1.

### Was wir gebaut haben

| Komponente | Was es tut |
|---|---|
| `constants.py` | Single-Source-of-Truth für alle Konstanten |
| `email_body_generator.py` | V6-Build-Funktionen für Email 1/2/3 + V4-Mooni-Signatur |
| `gmail_sender.py` | OAuth-Send + HTML-Pflicht-Validation |
| `scrape_email.py` | Email-Discovery (Score 0-100, vorname@-Pattern) |
| `production_send.py` | Echter Send mit `--email-position 1/2/3`, idempotent |
| `check_replies.py` | Gmail-API-Poll für Replies, setzt `replied_at` |
| `daily_outreach.py` | Master-Cron-Script (Replies + Email 2/3 + Stats) |
| `stats_query.py` | Pipeline-Stats (Overall + Funnel + Brand + Score-Bucket) |
| `launchd Plist` | Täglicher 09:00-Trigger via macOS-native |
| 3 Email-Templates | YAML-Frontmatter mit Voice-Prinzipien + Anti-Patterns |
| `Schreibstil.md` Update | 6 Cold-Outreach-Anti-Patterns + 2-Stufen-Modell |
| `Outreach-Email-Voice-Guide.md` | Komplette Voice-Methodologie |
| `Outreach-System-Map.md` | Location-of-Truth-Map |
| `Outreach-Automation-Setup.md` | Operating-Handbook |
| `Bauplan_Premium-Sales-Funnel-Agent.md` | V1.1 mit 3-Email-Sequenz + Anti-Patterns |
| Memory-Datei | Auto-loaded Doctrine bei jeder Session |
| 5 Notion-Karten | 3 active + 2 in Lerndatenbank |

### Was wir bewusst NICHT gebaut haben

- **Cross-Platform-Brand-Audit** — zu groß; geparkt in BrainDump
- **Open-Tracking-Pixel** — braucht Vercel-Function; Workaround Mailtrack-Extension
- **TidyCal-Webhook** — braucht Public-URL; Workaround manuelles Eintragen
- **Thrivecart-Webhook** — same
- **Streamlit-Stats-Dashboard** — `stats_query.py` reicht für die ersten 100
- **Auto-Notion-Sync** — Workaround: Claude-Session-Sync via MCP

### Das Sales-Truth, das in der Session entstanden ist

> *"Conversation oder Credibility — eines von beiden braucht's. Wenn man ohne Gespräch Conversion will, braucht's Credibility."*

Diese Aussage ist die strategische Begründung für das ganze Cross-Platform-Audit (geparkt) — und gleichzeitig die Begründung dafür, warum das Audit-PDF SO wichtig ist: es ist Sabalas Credibility-Demonstration vor dem Gespräch.

---

## 7. Das Blueprint für andere Brands

### Was übertragbar ist

Diese Komponenten gelten brand-agnostisch:
- **4-Schichten-Architektur** (Code/Operativ/Vault/Memory)
- **Single-Source-of-Truth-Prinzip**
- **Idempotenz auf Code-Ebene**
- **Anti-Pattern-Validation**
- **HTML-Pflicht für Premium-Brands**
- **Daily-Cron-Pattern** mit launchd
- **2-Stufen-Authentizitäts-Modell** (Cold vs. Nach-Termin)
- **3-Email-Sequenz-Logik** (mit Brand-spezifischer Voice + Templates)

### Was Brand-spezifisch ist

Diese Komponenten müssen pro Brand neu gemacht werden:
- **Voice-Bank** (Brand-typische Phrasen, Tabu-Begriffe)
- **ICP-Filter** (was qualifiziert für diese Brand?)
- **Email-Templates** (Sprache, Tonalität, Sequenz-Länge ggf. anders)
- **Audit-Format** (PDF für Sabala, vielleicht Mini-Deck für CHK)
- **CTA-Konfiguration** (TidyCal-Link, Thrivecart-Link, Discount-Codes)

### Konkreter Übertragungs-Plan für CHK-Outreach

1. Voice-Bank für CHK aufbauen (separates `Schreibstil-CHK.md`)
2. ICP für CHK definieren (anders als Sabala — "Macher mit Herz")
3. 3-Email-Templates für CHK (eventuell andere Subjects, anderer Tonfall)
4. Eigene Audit-Vorlage (statt "Webseite", vielleicht "Plattform-Eignung")
5. Alle Konstanten in `constants_chk.py` ODER `constants.py` Brand-Switching

### Konkreter Übertragungs-Plan für Diamond-Force-Onboarding

Nach dem Kauf eines Diamond-Force-Pakets:
1. Welcome-Email-Sequenz (8 Mails über 30 Tage)
2. Each Email: 1 GPT-Vorstellung + Use-Case + Probier-Aufforderung
3. Day +14: Survey "Welcher GPT hat dich am meisten gerettet?"
4. Day +30: "Möchtest du Aurel um deinen eigenen Custom-GPT erweitern?"
5. Komplett anderer Voice-Anker (warm, einladend, Owner-Welcome statt Cold-Outreach)

---

## 8. Status heute

### Konkrete Zahlen (10.05.2026)

- **Total Prospects in DB:** 5
- **Active Pipeline:** 3 (Johanna Zeller, Lukas Görög, Studio Ann)
- **Lerndatenbank Anti-Match:** 2 (Lynn Reardon, Kimberly Elsholz)
- **Erste echte Sends:** 1 (Johanna Zeller, 18:31, message_id `19e1327a9b34a348`)
- **launchd-Cron:** ✅ aktiv, läuft täglich 09:00

### Roadmap

**Morgen (11.05.):**
- 9 weitere Prospects researchen + Email 1 senden
- Total: 10 Prospects in Pipeline für die ersten Stats

**Day +7 (17.05.):**
- Cron findet Email-2-Kandidaten automatisch
- Erste Auto-Sends fließen

**Day +14 (24.05.):**
- Cron findet Email-3-Kandidaten
- Erste Diamond-Force-Soft-Bridges fließen

**Diesen Monat (Mai 2026):**
- 100 Prospects total in Pipeline
- Erste Reply-Rate / Termin-Rate / Conversion-Stats sichtbar
- ICP-Filter basierend auf Anti-ICP-Pattern-Häufigkeiten verfeinern

---

## 9. Wiederverwendbare Kernbotschaften

Diese Phrasen sind in der Refinement-Session entstanden und können in Newsletter, Karussells, Podcasts, LinkedIn wiederverwendet werden:

### Über KI und Vertrauen

> "In einer Zeit, in der KI alles billig macht, sind Qualität, Glaubwürdigkeit und Vertrauen die seltensten Werte geworden — und damit die wichtigsten."

### Über Sabalas Grundhaltung

> "Ich pitche dir nicht. Stattdessen versuche ich, dir einen Eindruck meiner Arbeit zu geben — was bei dir davon ankommt, entscheidest du selbst."

> "Vertrauen kommt für mich zuerst. Deshalb gehe ich gern in Vorleistung — gerade für Menschen, die selbst Menschen helfen."

### Über individuelle Angebote

> "Die Angebote auf meiner Webseite sind Orientierung, nicht Schablone. Generische Strategien funktionieren bei dir nicht, weil deine Arbeit nicht generisch ist."

### Über Diamond Force / KI-Werkzeuge

> "Was sie anders macht: sie fragen, statt zu raten."

> "Sieben Custom GPTs, die ich für mein eigenes Business gebaut habe und täglich nutze."

> "Standard-Tools sind großartig für komplexe Einzelaufgaben. Custom GPTs gewinnen bei wiederkehrenden Themen — kein Setup-Tax, weniger Token-Verbrennung, konsistenter Ton."

### Über Sales-Psychology

> "Conversation oder Credibility — eines von beiden braucht's, um zu konvertieren."

### Über System-Building

> "Anti-Patterns sind wertvoller als Best-Practices — sie helfen beim Filtern, nicht beim Schreiben."

> "Single-Source-of-Truth ist Disziplin, nicht Mut."

---

## 10. Quellen / Vault-Doku

Alle Inhalte dieses Dokuments referenzieren auf kanonische Quellen im Vault + Skill-Ordner:

### Vault-Doku
- [`00_Kontext/Schreibstil.md`](file:///Users/iljakrasevskij/Documents/_Obsidian_Vault/00_Kontext/Schreibstil.md) — Voice-Master + 6 Anti-Patterns
- [`04_Ressourcen/Claude_Code_Skills/Outreach-Email-Voice-Guide.md`](file:///Users/iljakrasevskij/Documents/_Obsidian_Vault/04_Ressourcen/Claude_Code_Skills/Outreach-Email-Voice-Guide.md) — Komplette Voice-Methodologie
- [`04_Ressourcen/Claude_Code_Skills/Outreach-System-Map.md`](file:///Users/iljakrasevskij/Documents/_Obsidian_Vault/04_Ressourcen/Claude_Code_Skills/Outreach-System-Map.md) — Single-Source-of-Truth-Map
- [`04_Ressourcen/Claude_Code_Skills/Outreach-Automation-Setup.md`](file:///Users/iljakrasevskij/Documents/_Obsidian_Vault/04_Ressourcen/Claude_Code_Skills/Outreach-Automation-Setup.md) — Operating-Handbook
- [`04_Ressourcen/Claude_Code_Skills/Bauplan_Premium-Sales-Funnel-Agent.md`](file:///Users/iljakrasevskij/Documents/_Obsidian_Vault/04_Ressourcen/Claude_Code_Skills/Bauplan_Premium-Sales-Funnel-Agent.md) — V1.1 Methodologie
- [`00_Kontext/Systemarchitektur.md`](file:///Users/iljakrasevskij/Documents/_Obsidian_Vault/00_Kontext/Systemarchitektur.md) — System-Übergreifende Architektur

### Skill-Code (`~/.claude/skills/sabala-prospect-research/`)
- `helpers/constants.py` — Single-Source-of-Truth
- `helpers/email_body_generator.py` — V6-Build-Funktionen
- `helpers/gmail_sender.py` — OAuth-Send mit HTML-Pflicht
- `helpers/scrape_email.py` — Email-Discovery
- `helpers/production_send.py` — Real-Send (Position 1/2/3)
- `helpers/check_replies.py` — Reply-Detection
- `helpers/daily_outreach.py` — Master-Cron
- `helpers/stats_query.py` — Pipeline-Stats
- `templates/email-01-initial.md` — Initial v6
- `templates/email-02-invitation.md` — Invitation v2
- `templates/email-03-diamondforce.md` — Diamond Force v5

### Memory (auto-loaded)
- `~/.claude/projects/-Users-iljakrasevskij-Claude/memory/sabala_outreach_voice_anti_patterns.md`

### System-Files
- `~/Library/LaunchAgents/com.sabala.outreach.daily.plist` — launchd-Trigger
- `~/Library/Logs/sabala-outreach-daily.log` — Daily-Run-Logs

---

## Schluss-Notiz

Dieses Dokument wurde in einer 4+ Stunden Session am 10.05.2026 entstanden. Es ist nicht "fertig" im Sinne von "nichts mehr zu tun" — sondern "fertig" im Sinne von "vollständig dokumentiert für die nächste Iteration".

Die nächsten Schritte sind operativ (10 weitere Prospects bis morgen, 100 bis Monatsende), nicht architekturell. Die Architektur trägt.

Der größte Wert dieser Session war nicht der Code — der Code ist relativ simpel. Der größte Wert ist die **Voice-Refinement-Erkenntnis** mit den 6 Anti-Patterns. Diese Erkenntnis ist jetzt in 4 Schichten verankert und wird automatisch geladen, wenn ein neuer Outreach-Mail-Build startet.

> *"Wenn die Mail im Inbox aufpoppt vs. wie du sie geschrieben hast, ist der entscheidende Realitäts-Check."*

— Letzter Insight der Session

---

**Zuletzt aktualisiert:** 2026-05-10 23:00
**Autoren:** Ilja "Sabala" Krasevskij + Claude
**Lizenz:** Internes Material, Sabala Mentoring + CHK
