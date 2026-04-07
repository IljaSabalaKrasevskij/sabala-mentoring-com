---
name: sabala-mentoring-briefing
description: Complete project briefing for the Sabala Mentoring website rebuild. Contains page structure, section content, customer journey, animation notes, and technical requirements. Use together with SABALA-BRANDGUIDE.md and design skills.
---

# Projekt-Briefing: Sabala Mentoring — Website Rebuild
**Version:** 2.0 — Finale Headline
**Datum:** April 2026

---

## Projektübersicht

### Was gebaut wird
Eine Premium-Erlebnis-Website für Sabala Mentoring — den Premium-Partner für den professionellen Auftritt reflektierter Solo-Unternehmer. Die Seite muss vom ersten Scroll-Moment begeistern und das Gefühl vermitteln: hier arbeiten Profis, die mich verstehen.

### Build-Ansatz: Zwei Phasen
**Phase A (jetzt):** Struktur, Texte, Layout, Typografie, Farbwelt. Saubere Sections mit Platzhalter-Bildern. Die Seite muss inhaltlich und strukturell komplett stehen — richtige Headlines, Sublines, Section-Reihenfolge, responsive Layout, Navigation.

**Phase B (danach):** Section für Section aufwerten — Scroll-Animationen hinzufügen, Sprengbilder einbauen, Parallax-Effekte, Inline-Porträts in Headlines, Staggered Reveals, Spring-Physics. Eigene Foto- und Design-Elemente ersetzen die Platzhalter.

Beim initialen Build (Phase A) sollen Animationen nur angedeutet werden (sanftes Fade-In beim Scroll-Entry). Die aufwändigen Erlebnis-Effekte kommen in Phase B.

### Technische Basis
- Framework: Next.js oder Astro (statisch, schnell)
- Styling: Tailwind CSS
- Animationen: Framer Motion oder CSS-basiert
- Fonts: Instrument Serif (Headlines), Satoshi (Body), Geist Mono (Meta)
- Hosting: Wird von Christopher übernommen
- CMS: Optional für Blog (z.B. Markdown-basiert oder Headless CMS)

### Referenz-Dateien
- `SABALA-BRANDGUIDE.md` — Farben, Fonts, Bildsprache, Tone of Voice
- `taste-skill.md` — Premium-Design-Regeln
- `output-skill.md` — Vollständiger Code ohne Platzhalter

---

## Customer Journey

### Wer kommt auf die Seite?
Reflektierte Solo-Unternehmer — Coaches, Berater, Trainer, Designer, Therapeuten. Sie arbeiten mit Gefühl und Intuition. Sie haben bereits ein Business, aber der Außenauftritt passt nicht zur Qualität ihrer Arbeit. Sie haben schon investiert (Agenturen, Kurse, Website-Projekte) und sich trotzdem allein gefühlt.

### Was fühlen sie beim Ankommen?
"Endlich jemand, der mich versteht. Das sieht professionell aus. Das fühlt sich richtig an. Hier bin ich gut aufgehoben."

### Der Weg durch die Seite

```
Startseite (Erlebnis, Überblick, Vertrauen)
    ↓
Premium-Angebot (Detail, Prozess, Investition)
    ↓
Über Ilja (Vertrauen vertiefen, Geschichte, Werte)
    ↓
Referenzen (Beweis, echte Ergebnisse)
    ↓
Kennenlerngespräch buchen (Conversion)
```

Sekundäre Pfade:
- Blog → für SEO-Besucher, die über Google kommen
- Meditation → für Interessenten an innerer Arbeit
- Digitale Produkte → für Selbstlerner und kleinere Budgets

---

## Seite 1: Startseite (Scroll-Erlebnis)

Die Startseite ist das Herzstück. Sie muss beim ersten Blick begeistern und beim Scrollen ein Erlebnis bieten. Jede Section baut auf der vorherigen auf.

### Section 1.1: Hero
**Zweck:** Sofort fesseln. Klarheit geben. Zum Weiterscrollen einladen.
**Layout:** Asymmetrisch — Text links (ca. 60%), visuelles Element rechts (ca. 40%). NICHT zentriert.
**Animation:** Headline baut sich Wort für Wort auf oder faded elegant ein. Ein Porträt-Bild von Ilja sitzt inline zwischen den Wörtern der Headline (Signature-Technik aus dem taste-skill).

**Inhalt:**
- Eyebrow-Tag: `Der meditierende Business-Architekt`
- Headline (Instrument Serif, groß): "Klarheit in der Positionierung. Kraft im Auftritt. Kunden, die wirklich passen."
- Subline (Satoshi, Warm Steel): "Wir begleiten dich von der Kernbotschaft bis zur fertigen Premium-Website — und bleiben ein Jahr an deiner Seite. Strategie, Branding und Technik aus einer Hand."
- CTA-Button: "Kennenlerngespräch vereinbaren" (Refined Gold Hintergrund, weiß Text)
- Kein zweiter CTA. Kein "Mehr erfahren"-Link.

**Scroll-Erlebnis:** Beim Scrollen entsteht ein sanfter Parallax-Effekt — der Hero-Content bewegt sich langsamer als der Rest. Übergang zur nächsten Section ist fließend.

---

### Section 1.2: Trust-Leiste
**Zweck:** Sofortige Glaubwürdigkeit.
**Layout:** Horizontale Leiste, dezent, nicht aufdringlich. Hintergrund leicht abgesetzt (Pure Surface #FFFFFF mit Whisper Border oben/unten).
**Animation:** Elemente faden staggered ein beim Scroll-Entry.

**Inhalt:**
- Zertifikate/Siegel: Certified Trainer, ProvenExpert, weitere relevante
- Kurzer Text: "Vertraut von 50+ Unternehmern" oder ähnliche Social-Proof-Zahl
- Keine Sternebewertungen hier — die kommen in den Testimonials

---

### Section 1.3: Problem-Erkennung
**Zweck:** Der Besucher soll denken: "Ja, genau so geht es mir."
**Layout:** Dunkle Section (Night Foundation #1A1A18). Große Headline links, Fließtext rechts. Asymmetrisch.
**Animation:** Text revealed sich beim Scrollen, Zeile für Zeile.

**Inhalt:**
- Headline (Instrument Serif, Night Text): "Du hast investiert. Aber es fühlt sich nicht stimmig an."
- Text: "Du hast Geld für eine Website ausgegeben. Vielleicht für eine Agentur, einen Kurs, ein Coaching. Und trotzdem passt dein Außenauftritt nicht zu dem, was du wirklich anbietest. Die Website sieht aus wie tausend andere. Die Texte klingen nicht nach dir. Und neue Kunden kommen nicht, weil niemand versteht, was dich besonders macht."
- Kein CTA hier — nur Resonanz erzeugen.

---

### Section 1.4: Die Lösung — Premium-Paket Überblick
**Zweck:** Zeigen, was wir anders machen. Neugier auf die Detail-Seite wecken.
**Layout:** Helle Section. Große Headline, darunter ein visueller Flow mit 5-6 Schritten. KEIN 3-Spalten-Grid. Stattdessen ein vertikaler oder Zig-Zag-Flow.
**Animation:** Schritte erscheinen nacheinander beim Scrollen. Jeder Schritt hat eine leichte Einblend-Animation.

**Inhalt:**
- Headline: "Alles aus einem Guss. Von der Essenz bis zur Erlebnis-Website."
- Subline: "Kein Stückwerk. Kein Abliefern. Ein durchdachter Prozess, der bei dir beginnt — und in einer Website mündet, die dich wirklich zeigt."

**Die Schritte (visuell, nicht als Bullet-Liste):**

1. **Personal Brand Interview**
   "Wir tauchen in deine Geschichte, deine Werte und deine Vision ein. In einem intensiven Gespräch finden wir deine Kernbotschaft — die Essenz, die alles andere trägt."

2. **Brand Identity & Strategie**
   "Wir definieren, wofür du stehst, wen du ansprichst und wie du dich vom Markt abhebst. Klar, fokussiert, auf den Punkt."

3. **Brand Design**
   "Fleur entwickelt deine visuelle Identität — Farben, Typografie, Bildsprache. Alles abgestimmt auf deine Persönlichkeit und deine Zielgruppe."

4. **Premium-Erlebnis-Website**
   "Wir bauen eine Website, die vom ersten Moment begeistert. Mit Scroll-Animationen, professionellem Design und Texten, die nach dir klingen. Keine Template-Seite — ein digitales Erlebnis."

5. **Content & SEO-Strategie**
   "Strategische Blogartikel, SEO-Optimierung und Social-Media-Vorlagen, damit du gefunden wirst — und wiedererkannt."

6. **Brand Guidance — 1 Jahr Begleitung**
   "Wir lassen dich nicht allein. Ein Jahr lang passen wir deine Website an, wenn sich dein Angebot, dein Fokus oder deine Ausrichtung verändert. Hosting, Pflege, Rechtssicherheit inklusive."

- CTA: "Das komplette Paket entdecken →" (verlinkt zur Premium-Angebot-Seite)

---

### Section 1.5: Das Trio
**Zweck:** Vertrauen durch Gesichter. Zeigen, dass hier ein eingespieltes Team arbeitet.
**Layout:** Drei große Porträts nebeneinander (Desktop) oder gestapelt (Mobile). Unter jedem Porträt: Name, Rolle, ein Satz. Asymmetrisches Layout — Ilja etwas größer/prominenter als die anderen beiden.
**Animation:** Porträts faden staggered ein. Beim Hover leichter Gold-Glow-Effekt.

**Inhalt:**

**Ilja "Sabala" Krasevskij** — Strategie & Positionierung
"Ich gehe in die Tiefe, bevor ich an die Oberfläche gehe. Deine Kernbotschaft ist das Fundament — alles andere folgt daraus."

**Fleur** — Brand Design
"Ich übersetze, wer du bist, in Farben, Formen und Gefühl. Damit dein Auftritt nicht nur gut aussieht, sondern sich richtig anfühlt."

**Christopher** — Technik & Hosting
"Ich sorge dafür, dass alles läuft — schnell, sicher, rechtssicher. Damit du dich auf dein Business konzentrieren kannst."

---

### Section 1.6: Testimonials
**Zweck:** Sozialer Beweis. Echte Stimmen, echte Ergebnisse.
**Layout:** Dunkle Section (Night Foundation). Großes Zitat im Zentrum mit Porträt. Horizontal scrollbar oder wechselnd. NICHT 3 gleiche Cards.
**Animation:** Zitat faded sanft ein. Wechsel zwischen Testimonials mit Spring-Physics-Übergang.

**Inhalt:** Echte Testimonials aus der bestehenden Seite:

> "Ilja hat mich in 6 Sessions begleitet. In der Zusammenarbeit ist ein tolles Format entstanden, mit welchem ich bereits Umsatz generiere. Die Zusammenarbeit war unheimlich angenehm, durch Iljas wertschätzende, kreative, erdende und authentische Art."
> — **Nadja Kirchner**

> "Was man in kurzer Zeit über sich und seine Psyche lernt und verbessern kann, ist wirklich beeindruckend. Und das ganze mühelos! Was Sabala anbietet sollte JEDER in Erwägung ziehen, der zur heutigen Zeit selbstständig ist."
> — **Philipp Siebler**, Conversion Films

> "Sabalas wundervolle Fähigkeit, einen vertrauensvollen Raum zu eröffnen, ermöglicht es jedem Menschen, sich der eigenen Realität zu stellen und für die eigene Wahrheit zu öffnen."
> — **Silke Ettrich**, Bewusstseinsmentorin

---

### Section 1.7: Referenz-Vorschau
**Zweck:** Visueller Beweis — zeigen, wie die fertigen Websites aussehen.
**Layout:** 2-3 große Screenshots oder Mockups von fertigen Projekten. Bento-Grid: ein großes Bild links, zwei kleinere rechts gestapelt. Oder horizontal scrollbar.
**Animation:** Bilder faden ein mit leichtem Scale-Effekt (von 0.95 auf 1.0).

**Inhalt:**
- Screenshots/Mockups von fertigen Premium-Websites
- Kurzer Text pro Projekt: Kunde, Branche, was gemacht wurde
- Link: "Alle Referenzen ansehen →"
- (Platzhalter verwenden bis echte Projekte vorhanden sind)

---

### Section 1.8: Abschluss-CTA
**Zweck:** Klare Handlungsaufforderung. Kein Druck, aber Entschiedenheit.
**Layout:** Helle Section, großzügig. Große Headline zentriert (Ausnahme von der Asymmetrie-Regel — hier bewusst für Fokus). Darunter ein einzelner CTA-Button.
**Animation:** Headline faded sanft ein.

**Inhalt:**
- Headline: "Bereit für einen Auftritt, der zu dir passt?"
- Subline: "In einem Kennenlerngespräch schauen wir gemeinsam, wo du stehst — und ob wir die Richtigen füreinander sind. Kein Druck. Nur Klarheit."
- CTA: "Kennenlerngespräch vereinbaren" (Refined Gold)
- Darunter klein: Link zu TidyCal oder Calendly

---

## Seite 2: Premium-Angebot (Detail)

### Section 2.1: Angebots-Hero
**Layout:** Helle Section, asymmetrisch.
**Inhalt:**
- Eyebrow: `Das Premium-Paket`
- Headline: "Dein kompletter Auftritt. Von der Essenz bis zur Erlebnis-Website."
- Subline: "Für Unternehmer, die keinen Webdesigner suchen — sondern einen strategischen Partner für ihren gesamten professionellen Auftritt."

---

### Section 2.2: Der Prozess — Timeline
**Zweck:** Den kompletten Fahrplan zeigen. Klarheit über den Ablauf.
**Layout:** Vertikale Timeline mit Gold-Linie. Jeder Schritt abwechselnd links/rechts (Zig-Zag). Auf Mobile: untereinander.
**Animation:** Schritte erscheinen beim Scrollen, die Gold-Linie "wächst" von oben nach unten.

**Die Phasen:**

**Phase 1 — Essenz (Woche 1-2)**
Personal Brand Interview. Tiefeninterview zu deiner Geschichte, deinen Werten, deiner Vision. Ergebnis: Brand Voice, Kernbotschaft, Positionierungstexte, Über-mich-Story.

**Phase 2 — Strategie (Woche 3-4)**
Brand Identity und Brand Strategie. Zielgruppe definieren, Angebotsarchitektur klären, Wettbewerbspositionierung, Content-Strategie und SEO-Keyword-Plan.

**Phase 3 — Design (Woche 5-8)**
Brand Design mit Fleur. Farbpalette, Typografie, Bildsprache, Logo-Verfeinerung, Social-Media-Vorlagen. Alles abgestimmt auf deine Persönlichkeit und Zielgruppe.

**Phase 4 — Website (Woche 9-14)**
Premium-Erlebnis-Website. Scroll-Animationen, responsive Design, professionelle Texte, SEO-Optimierung, strategische Blogartikel. Kein Template — ein digitales Erlebnis.

**Phase 5 — Launch & Übergabe (Woche 15-16)**
Technischer Launch durch Christopher. Hosting-Setup, Rechtssicherheit, Datenschutz, PageSpeed-Optimierung, Analytics-Einrichtung, Einweisung.

**Phase 6 — Brand Guidance (Monat 4-16)**
Ein Jahr Begleitservice. Anpassungen bei Angebotsänderungen, technische Pflege, Performance-Monitoring, SEO-Betreuung. Wir bleiben dein Partner.

---

### Section 2.3: Was enthalten ist
**Layout:** Visueller Grid — Bento-Style, NICHT als Bullet-Liste.
**Inhalt (als Cards oder Tiles):**
- Personal Brand Interview + Positionierungstexte
- Brand Identity & Strategie-Dokument
- Komplettes Brand Design (Farben, Fonts, Vorlagen)
- Social-Media-Vorlagen im Brand Design
- Premium-Erlebnis-Website (5-8 Seiten)
- 3 strategische SEO-Blogartikel
- Technisches Hosting & Pflege
- Rechtssicherheit & Datenschutz
- PageSpeed-Optimierung
- Analytics & Reporting
- 1 Jahr Brand Guidance & Anpassungen

---

### Section 2.4: Investition
**Layout:** Clean, direkt, keine Spielereien.
**Inhalt:**
- Headline: "Investition"
- Preisrahmen oder "Auf Anfrage" — je nach Iljas Präferenz
- Hinweis: "Alle Preise zzgl. gesetzlicher MwSt."
- Hinweis: "Ratenzahlung möglich"
- CTA: "Unverbindliches Gespräch vereinbaren"

---

### Section 2.5: FAQ
**Layout:** Akkordeon-Style, clean. Nur Trennlinien zwischen Items, keine Boxen.
**Mögliche Fragen:**
- "Wie lange dauert der gesamte Prozess?"
- "Was passiert, wenn sich mein Angebot nach dem Launch ändert?"
- "Brauche ich vorher schon eine klare Positionierung?"
- "Kann ich auch nur die Website ohne Branding buchen?"
- "Was kostet der Service nach dem ersten Jahr?"

---

## Seite 3: Über mich — Iljas Weg

### Section 3.1: Hero
- Großes Porträt von Ilja
- Headline: "Ich baue keine Websites. Ich baue Fundamente."
- Subline: Kurzer Absatz über seine Arbeitsweise

### Section 3.2: Der Weg
Iljas Geschichte — nicht als Lebenslauf, sondern als narrative Reise:
- Restaurant geleitet, Teams geführt
- Digitale Projekte aufgebaut
- Fehler gemacht, Geld verbrannt, neu angefangen
- Meditation entdeckt, innere Führung gelernt
- Als digitaler Nomade unterwegs
- Community, Podcast, Business-Strukturen aufgebaut
- Heute: Premium-Partner für den professionellen Auftritt

### Section 3.3: Werte & Arbeitsweise
- "Ich pushe nicht. Ich tauche ein."
- "Umsetzung ist Pflicht."
- "Ich begleite — ich rette nicht."
- "Herz und Handlung gehören zusammen."

### Section 3.4: CTA
- "Lass uns herausfinden, ob wir zueinander passen."
- Button: Kennenlerngespräch

---

## Seite 4: Referenzen

### Section 4.1: Fertige Projekte
- Grid mit Screenshots/Mockups
- Pro Projekt: Kunde (mit Erlaubnis), Branche, was gemacht wurde, Link zur Live-Seite
- (Platzhalter bis echte Projekte vorhanden)

### Section 4.2: Ausführliche Testimonials
- Große Zitate mit Porträts
- Name, Rolle, Branche
- Konkrete Ergebnisse wo möglich

### Section 4.3: ProvenExpert / Bewertungen
- Eingebettetes Widget oder Screenshots
- Trust-Siegel

---

## Seite 5: Blog

### Struktur
- Blog-Übersicht mit Kategorien: Positionierung, Branding, Webdesign, Business-Mindset
- Einzelne Blogposts: SEO-optimiert, mit Meta-Beschreibungen, Open Graph Tags
- Jeder Artikel endet mit CTA zum Kennenlerngespräch oder Lead-Magnet

### Erste Artikel-Ideen (SEO-relevant)
1. "Warum deine Website nicht verkauft — und was du stattdessen brauchst"
2. "Positionierung für Coaches: So wirst du als Premium wahrgenommen"
3. "Was kostet eine Premium-Website wirklich?"
4. "Brand Identity vs. Logo: Warum ein Logo allein nicht reicht"
5. "Die 5 größten Fehler beim Webdesign für Berater und Coaches"

---

## Seite 6: Meditation (sekundär)

- Eigene Seite, aber nicht im Hauptfokus
- Headline: "Meditation als innere Kompetenz"
- Kurze Beschreibung von Iljas Meditationsbegleitung
- Auf Anfrage buchbar
- CTA: Kontaktaufnahme

---

## Seite 7: Digitale Produkte

- Im Menü unter "Ressourcen" oder "Tools"
- KI-Assistenten / Custom GPTs
- Kurze Beschreibung pro Produkt
- Preis und Kauf-Link
- Optional: CapCut-Kurs, Marketing-Guideline

---

## Navigation

### Desktop (Horizontal, sticky, floating)
```
[Logo]     Angebot     Über mich     Referenzen     Blog     [Kennenlerngespräch — Button]
```

- "Angebot" hat ein Dropdown: Premium-Paket, Meditation, Digitale Produkte
- "Kennenlerngespräch" ist der primäre CTA-Button (Refined Gold)
- Navigation ist eine floating Pill, leicht vom oberen Rand abgesetzt
- Glassmorphism-Effekt (backdrop-blur) auf hellem Hintergrund

### Mobile (Hamburger → Full-Screen Overlay)
- Hamburger-Icon morpht zu X
- Full-Screen Overlay mit gestaggertem Einblenden der Links
- CTA-Button prominent am unteren Rand

---

## Footer

### Struktur (NICHT 4-Spalten-Link-Farm)
- Links: Logo + ein Satz ("Premium Brand & Web Partner für reflektierte Unternehmer")
- Mitte: Wichtigste Links (Angebot, Über mich, Referenzen, Blog, Kontakt)
- Rechts: Social Links (LinkedIn, Instagram, YouTube)
- Darunter: Impressum, Datenschutz, AGB, Cookie-Einstellungen
- Ganz unten: "2026 Ilja Sabala Krasevskij"

---

## Technische Anforderungen

### Performance
- PageSpeed Score: mindestens 90 auf Mobile und Desktop
- Lazy Loading für alle Bilder
- Font-Subsetting (nur benötigte Glyphen laden)
- Critical CSS inline, Rest asynchron

### SEO
- Semantisches HTML (nav, main, article, section, aside)
- Meta-Tags: Title, Description, OG-Image pro Seite
- Strukturierte Daten (JSON-LD) für LocalBusiness und Person
- Sitemap.xml und robots.txt
- Canonical URLs

### Rechtliches
- Cookie-Consent-Banner (DSGVO-konform)
- Impressum und Datenschutzerklärung
- SSL/HTTPS
- Keine externen Tracking-Skripte ohne Consent

### Accessibility
- Skip-to-Content-Link
- Alt-Texte auf allen Bildern
- Fokus-Ringe auf interaktiven Elementen
- Ausreichend Farbkontrast (WCAG AA)
- Touch-Targets mindestens 44px

---

## Zusammenfassung: Dateien für Antigravity

Lege diese Dateien ins Projektroot:

```
/projekt-sabala/
├── BRANDGUIDE.md          ← Farben, Fonts, Bildsprache, Tone of Voice
├── BRIEFING.md            ← Dieses Dokument — Seitenstruktur, Inhalte, Journey
├── .agents/skills/
│   ├── taste-skill/SKILL.md
│   ├── redesign-skill/SKILL.md
│   ├── output-skill/SKILL.md
│   ├── stitch-skill/SKILL.md
│   ├── minimalist-skill/SKILL.md
│   └── brutalist-skill/SKILL.md
```

Dann sage dem Agent:
"Erstelle die Website für Sabala Mentoring auf Basis des BRIEFING.md und BRANDGUIDE.md. Nutze die Design-Skills. Starte mit der Startseite."

Der Agent wird den Brandguide für Farben und Fonts heranziehen, das Briefing für Struktur und Inhalte, und die Skills für die Premium-Design-Qualität.
