# Sabala Blog — Schreib- und Bau-Stil (verbindlich)

> Der Maßstab ist `src/app/blog/seo-und-geo-fuer-personal-brands-2026/page.tsx`.
> Das ist der beste Artikel nach Aufbau, Stil und Visualisierung. Jeder neue
> Blog-Artikel (auch von einem Agenten geschrieben) folgt diesem Bauplan.
> Wenn etwas unklar ist: in diese Datei schauen, dann in den Gold-Standard.

Jeder Artikel ist eine handgebaute `page.tsx` (kein MDX). Server Component.

---

## 1. Stimme (nicht verhandelbar)

- Kleines „du" durchgehend (du, dich, dein), nur am Satzanfang groß.
- „Ich" als Autor an den Vertrauens-Stellen (Praxis-Beispiel, eigene Zahlen, eigene Prüfung). Der Artikel wird unter Iljas Namen veröffentlicht.
- **Kein Em-Dash** (`—`/`–`). Stattdessen Komma, Punkt, Doppelpunkt.
- Kein „Nicht X, sondern Y". Keine AI-Vocabulary (delve, leverage, seamless, Game-Changer, Transformation, Empowerment, authentisch).
- Satzfluss statt Staccato: ein Gedanke = ein Satz mit Kommas, nicht in Fragmente zerhackt.
- Nicht gendern (generisches Maskulinum).
- **Wahrheit vor Hype.** Echte Zahlen, Bereiche statt Pseudo-Präzision, Obergrenzen als solche benennen. Premium kommt aus der Verdichtung, nicht aus dem Superlativ.
- Kein Agentur-Sprech, keinen Pathos. Wie jemand, der gegenübersitzt.

---

## 2. Pflicht-Architektur (Reihenfolge von oben nach unten)

1. **3 JSON-LD-Schemas** als `<Script type="application/ld+json" strategy="beforeInteractive">`: `Article`, `Person` (Ilja, mit `knowsAbout`), `FAQPage`. Das ist der GEO-Hebel, nicht optional.
2. **Dunkler Hero** (der „neue" Header, bevorzugt): dunkler BG, Cover-Bild bei `opacity-45` unter Gradienten, **heller Text**, `h1` in `font-instrument` mit Gold-Italic-Akzent im zweiten Teil, Tag-Pills (Kategorie · How-to), Datum, Lesezeit, Back-Link „Zurück zum Journal". Referenz-Markup: `claude-code-weniger-code-ponytail` oder `case-studies`.
   - **PFLICHT: Sabala-Logo groß im Hero, direkt über dem „Zurück zum Journal"-Back-Link** (starker Wiedererkennungswert, darf NIE zu klein sein). `<SabalaLogo light size={64} />` aus `@/components/brand/SabalaLogo`, verlinkt auf `/`, mit `mb-8`. Sitzt als erstes Element im `ScrollReveal` des Hero-Content-Blocks (`absolute bottom-0 left-0 ...`), vor dem Back-Link. Das `light`-Prop legt die weiße Scheibe hinter den Gold-Pfad → **weißer Berg** (nie schwarzer/durchscheinender Berg). NICHT klein oben in die Ecke.
3. **TL;DR-Box** („Das Wichtigste in Kürze" / „Die kurze Antwort vorab"): `bg-warm-light/40 border-l-2 border-refined-gold`, Icon-Bullet-Liste mit 3 bis 4 verdichteten Kernaussagen.
4. **Intro mit Drop-Cap** (großes „S"): erster Absatz nach Hero/TL;DR bekommt `dropCapClass`. Eine Szene oder ein konkretes Bild, dann der Nutzen-Aufriss („Dieser Artikel zeigt dir: …").
5. **Wechsel aus Prosa + visuellem Anker**, mehrfach: ein Prosa-Block (`max-w-820`) öffnet mit Drop-Cap-Absatz, dann ein visueller Anker (`max-w-1200/1400`): Karten-Grid, Stat-Cards, Bild. **Regel: alle 200 bis 400 Wörter eine visuelle Atempause** (Bild, Liste, Zwischenüberschrift, Card, PullQuote).
6. **`GoldDivider`** zwischen großen Sektionen.
7. **`PullQuote`** für 1 bis 3 Kern-Aussagen über den Artikel verteilt.
8. **Nummerierte Blöcke** für „die N Hebel / N Fehler / N Schritte": `border-l-4 border-refined-gold`, große Gold-Nummer + `h3`.
9. **Animierte Stats** mit `<CountUp>` in dunklen Karten (`#2E2B26`), wo es echte Zahlen gibt.
10. **Dunkler „Side-Quest"-Block** (`#2E2B26`, `rounded-3xl`): ein konkreter Sprint / eine Schritt-für-Schritt-Anleitung.
11. **FAQ-Akkordeon** (6 bis 9 Fragen, `<details>`), inhaltlich identisch zum `FAQPage`-Schema. Antworten 50 bis 100 Wörter (KI-zitierfähige Länge).
12. **`<ArticleAuditCTA>`** als **einziger** Haupt-CTA (siehe §5).
13. **Spokes/Weiterlesen**: Karten-Grid mit verwandten Artikeln (interne Verlinkung = Topical Authority).

Nicht jeder Artikel braucht alle 13 Blöcke, aber: Hero, TL;DR, Drop-Cap-Intro, ≥1 visueller Anker pro Großsektion, ≥1 PullQuote, FAQ + Schema, 1-CTA-Audit sind Pflicht.

---

## 3. Wiederverwendbare Bausteine (aus dem Gold-Standard kopieren)

Diese Konstanten/Komponenten stehen im Gold-Standard-File und werden mitkopiert:

- `proseBlock` — die Prose-Wrapper-Klassen (Instrument-Headings, gold Links, Satoshi-Body).
- `dropCapClass` — `first-letter:font-instrument first-letter:text-[5rem] ... first-letter:text-refined-gold`.
- `GoldDivider()` — dünne Gold-Linie mit Punkt.
- `PullQuote({children})` — gold border-left, `Quote`-Icon, Instrument-Serif-Italic.
- `<CountUp to={n} decimals={d} />` aus `@/components/blog/CountUp`.
- `<ArticleAuditCTA eyebrow headline bridge />` aus `@/components/blog/ArticleAuditCTA`.
- `<ScrollReveal>` aus `@/components/ui/ScrollReveal` (jeder Block wird damit eingeblendet).
- `lucide-react`-Icons großzügig (aber existierende Namen prüfen, z.B. `Github` existiert nicht mehr).

---

## 4. Bilder & Grafiken (der größte Unterschied zu den schwachen Artikeln)

- **3 bis 4 Illustrationen pro Artikel**, nicht nur ein Cover. Der Gold-Standard hat: `cover.jpg`, `stats.jpg`, `tools.jpg`, `timeline.jpg`.
- Stil: **Sabala Pencil-Gouache** (`kie-image-gen`, Kiuchi/Campion, warme Cream/Ocker/Gold-Töne, „no text"). Konsistent mit dem Cover.
- Ablage: `public/blog/<slug>/<name>.jpg`, web-optimiert (progressive JPEG, max ~1600px Breite, `ImageOps.exif_transpose`).
- Jede große Sektion bekommt ihren visuellen Anker (Bild ODER Karten-Grid ODER Stat-Cards). Reiner Text über mehr als ~400 Wörter ist ein Fehler (Wall-of-Text).
- Cover dient auch als OpenGraph-/Pinterest-Vorschaubild, also auch ohne Hero-Overlay schön.

---

## 5. CTA-Strategie (1-CTA, Hick's Law)

- **Genau ein primärer CTA pro Artikel, passend zum Thema.** Welches Ziel welcher Artikel bekommt, steht im verbindlichen Mapping: Vault `03_Bereiche/Sabala_Mentoring/Blog/00_Blog-CTA-Strategie-und-Mapping.md`.
- Ziel-Menü: `<ArticleAuditCTA>` (Default/Sichtbarkeit), `/akademie` (KI-Lernen), `AcademyNewsletter`-Formular (künftige Kurse), `/webseiten` (Premium-Homepage), `/gpt-team` (ChatGPT-Angebot), künftig `/webdesign-os` (Web OS). Audit ist der Default, wenn nichts Spezifischeres passt.
- Kein zweiter konkurrierender Sales-CTA. Premium wird nicht über tote Links beworben (`/premium-angebot` existiert nicht mehr → `/webseiten`).
- **Verbotene tote Ziele:** `/premium-angebot` und `/special-launch-angebot` existieren nicht mehr. Wenn ein Angebot verlinkt werden muss: **`/webseiten`** (Premium-Web), `/akademie` (KI-Akademie), `/termin-buchen`, `/case-studies`.

---

## 6. Link-Hygiene (Pflicht-Check vor jedem Publish)

- Jeder interne Link muss auf eine **existierende Route** unter `src/app/.../page.tsx` zeigen.
- Gültige Top-Level-Routen: `/`, `/blog`, `/akademie`, `/akademie-hub`, `/webseiten`, `/mitentwickelt`, `/gpt-team`, `/case-studies`, `/ueber-mich`, `/termin-buchen`, `/podcast`, `/meditation`, `/webdesign-os`, `/brandguide`, `/impressum`, `/datenschutz`, `/agb`.
- Tote Ziele NIE verlinken: `/premium-angebot`, `/special-launch-angebot`, `/referenzen` (→ `/case-studies`).
- Externe Links: `target` und Vollständigkeit prüfen.

---

## 7. Brand-Tokens (Tailwind)

`refined-gold` (Akzent) · `deep-charcoal` (Text dunkel) · `warm-steel` (Body) · `warm-light` (helle Karten) · `pure-surface` (Seitengrund) · `#2E2B26` (dunkle Blöcke). Schriften: `font-instrument` (Instrument Serif, Headlines) · `font-satoshi` (Body) · `font-mono` (Eyebrows/Labels, uppercase tracking-widest).

---

## 8. Konformitäts-Checkliste (QA-Gate vor Publish)

- [ ] 3 JSON-LD-Schemas (Article, Person, FAQPage) vorhanden
- [ ] Dunkler Hero mit Gold-Italic-Akzent, Tag-Pills, Lesezeit
- [ ] Sabala-Logo oben-links im Hero (`<SabalaLogo light />`, weißer Berg)
- [ ] TL;DR-Box mit 3 bis 4 Icon-Bullets
- [ ] Intro mit Drop-Cap
- [ ] ≥ 3 Illustrationen, jede Großsektion mit visuellem Anker
- [ ] ≥ 1 PullQuote, GoldDivider zwischen Sektionen
- [ ] Nummerierte Blöcke für Listen-Hebel/Fehler
- [ ] CountUp-Stats wo es echte Zahlen gibt
- [ ] Dunkler Side-Quest-/Anleitungs-Block
- [ ] FAQ-Akkordeon (6 bis 9), deckungsgleich mit FAQPage-Schema
- [ ] Genau ein ArticleAuditCTA, kein toter Angebots-Link
- [ ] Spokes/Weiterlesen-Grid mit internen Links
- [ ] Voice-Check: kleines du, kein Em-Dash, Satzfluss, ehrliche Zahlen
- [ ] Link-Hygiene: alle internen Links zeigen auf existierende Routen
- [ ] `tsc --noEmit` sauber, Dev-Render 200, keine Konsolen-Fehler
