# Briefing: Brandguide erweitern — von 6 auf 16 Seiten

## KONTEXT
Der bestehende Brandguide unter `/brandguide` hat 6 Seiten. Er muss auf 16 Kapitel erweitert werden. Das bestehende Design (Typografie, Farben, Layout, Bogen-Element) ist die Vorlage — alle neuen Seiten müssen exakt im gleichen Stil gestaltet werden.

## REFERENZ-DOKUMENT
Lies den vollständigen Brandguide-Inhalt aus `SABALA-BRANDGUIDE.pdf` (18 Seiten). Dort steht der komplette Inhalt für alle 16 Kapitel. Übernimm den Inhalt 1:1, aber gestalte ihn im visuellen Stil der bestehenden 6 Seiten.

---

## TEIL 1: BESTEHENDE SEITEN FIXEN

### Seite 1 — Cover
- ✅ Bleibt wie es ist. Design ist stark.

### Seite 2 — Brand Essence
- ✅ Inhalt passt
- HINZUFÜGEN: Brand Values aus dem PDF übernehmen (Stabilität, Tiefe, Handwerk, Langfristigkeit, Authentizität) — die aktuellen 3 Werte (Klarheit, Tiefe, Eleganz) durch die vollständigen 5 ersetzen
- HINZUFÜGEN: Das Zitat "Klarheit in der Positionierung. Kraft im Auftritt. Kunden, die wirklich passen." als gestalterisches Element
- OPTIONAL: Ein Foto oder visuelles Element hinzufügen, die Seite ist sonst sehr textlastig

### Seite 3 — Color Palette
- FIX: Deep Charcoal #1A1A18 als Textfarbe ergänzen — fehlt aktuell komplett
- FIX: Warm Canvas Swatch braucht eine sichtbare Border (weiß auf weiß ist unsichtbar)
- FIX: Reihenfolge logischer sortieren: Warm Canvas → Pure Surface → Deep Charcoal → Warm Steel → Soft Stone → Refined Gold
- FIX: Pure Surface #FFFFFF fehlt ebenfalls

### Seite 4 — Typography
- FIX: Geist Mono als dritte Schrift hinzufügen (für Zahlen, Preise, technische Angaben)
- HINZUFÜGEN: Typografische Skala mit konkreten Größen (Display, H1, H2, H3)
- HINZUFÜGEN: Letter-Spacing und Line-Height Angaben

### Seite 5 — Interface Design
- FIX: Hintergrundfarbe der dunklen Section prüfen — muss Night Foundation #1A1A18 sein, nicht bräunlich
- HINZUFÜGEN: Navigation/Floating Pill als Beispiel-Komponente

### Seite 6 — Bildsprache & Mood
- HINZUFÜGEN: Verbotene Bildsprache (Stock-Fotos, Mandala/Lotus, Sonnenstrahlen-Overlays, Emojis)
- HINZUFÜGEN: Foto-Richtlinien (natürliches Licht, warme Töne, echte Situationen, leichte Entsättigung)
- HINZUFÜGEN: Mehr Beispielfotos aus dem Ordner `Sabala Bilder`

---

## TEIL 2: NEUE SEITEN HINZUFÜGEN (10 Seiten)

Alle neuen Seiten im exakt gleichen Designstil wie die bestehenden 6. Gleiche Typografie, gleiche Farbwelt, gleiche Eyebrow-Labels (z.B. "05 / DARK PALETTE"), gleiche Weißräume.

### Neue Seite 7 — Farbpalette Dunkel
**Eyebrow:** 05 / DARK MODE
**Headline:** Dark Palette.
**Inhalt:**
- Night Foundation #1A1A18 — Hintergrund dunkle Sections
- Night Text #F5F3EF — Primärtext auf Dunkel
- Night Secondary #A09C95 — Sekundärtext auf Dunkel
- Night Gold #C9A84C — Gold-Akzent auf Dunkel
- Farbswatches im gleichen Stil wie Seite 3, aber auf dunklem Hintergrund
- Beispiel-Zitat auf dunklem Hintergrund: "Du hast investiert. Aber es fühlt sich nicht stimmig an."

### Neue Seite 8 — Akzent & Verbotene Farben
**Eyebrow:** 06 / COLOR RULES
**Headline:** Akzent & Verbotene Farben.
**Inhalt:**
- Die goldene Regel: Maximal eine Akzentfarbe. Immer Refined Gold.
- Strukturelemente: Whisper Border rgba(181,176,168,0.3), Warm Shadow rgba(26,26,24,0.06), Gold Glow rgba(184,150,62,0.08)
- Verbotene Farben mit durchgestrichenen Swatches: Reines Schwarz #000000, kühle Blau-/Violett-Töne, übersättigtes Gold, Neon-Farben

### Neue Seite 9 — Verbotene Fonts
**Eyebrow:** 07 / TYPOGRAPHY RULES
**Headline:** Verbotene Fonts.
**Inhalt:**
- Liste der verbotenen Fonts mit Begründung:
  - Inter — generisch, kein Charakter
  - Roboto, Open Sans, Arial — Standard-AI-Output
  - Times New Roman, Georgia, Garamond — generische Serifen
  - Playfair Display — zu häufig in Coaching-Websites
- Visuelle Gegenüberstellung: Instrument Serif vs. verbotene Fonts

### Neue Seite 10 — Tone of Voice
**Eyebrow:** 08 / VOICE & TONE
**Headline:** Tone of Voice.
**Inhalt:**
- Klar. Direkt. Warm. Mit Haltung.
- Drei Beispiele in Cards:
  1. Ruhig zuversichtlich: "Dein Business darf wachsen. Wir sorgen dafür, dass es dabei gut aussieht."
  2. Direkt und mutig: "Keine halben Sachen. Positionierung, Branding, Website — alles aus einem Guss."
  3. Menschlich und nahbar: "Wir tauchen erst in dich und dein Business ein, bevor wir auch nur eine Zeile Code schreiben."
- Verbotene Begriffe als Tags: Elevate, Seamless, Unleash, Next-Gen, Game-Changer, Ganzheitlich, Revolutionär, Einzigartig, "Entfalte dein volles Potenzial"

### Neue Seite 11 — Layout-Prinzipien
**Eyebrow:** 09 / LAYOUT
**Headline:** Layout-Prinzipien.
**Inhalt:**
- CSS Grid, Max-Width 1400px
- Asymmetrie, kein zentrierter Hero
- Keine 3-Spalten-Equal-Card-Layouts
- Dunkle/Helle Sections im Wechsel
- Section-Rhythmus der Startseite:
  1. Hero (Hell, Asymmetrisch)
  2. Trust (Hell, Horizontal)
  3. Problem (Dunkel, Asymmetrisch)
  4. Lösung (Hell, Zig-Zag Flow)
  5. Trio (Hell, Grid)
  6. Testimonials (Dunkel, Wechselnd)
  7. Referenzen (Hell, Bento Grid)
  8. CTA (Hell, Zentriert)

### Neue Seite 12 — Hero-Section
**Eyebrow:** 10 / HERO SECTION
**Headline:** Hero-Section.
**Inhalt:**
- Visuelles Beispiel des Hero-Layouts (Text links 60%, Porträt rechts 40%)
- Eyebrow: Klein, gold, wie ein Gütesiegel
- Headline: Instrument Serif, groß, track-tight
- CTA: Ein Button, Refined Gold
- Spezifikationen: Letter-Spacing, Responsive Scaling mit clamp()

### Neue Seite 13 — Komponenten-Details
**Eyebrow:** 11 / COMPONENTS
**Headline:** Komponenten.
**Inhalt (ergänzend zu Seite 5):**
- Buttons: Primary (Gold BG), Secondary (Ghost), Active (scale 0.98)
- Cards: 2.5rem Border-Radius, Whisper Border, diffused Shadow
- Navigation: Floating Pill, Glassmorphism, CTA immer sichtbar
- Loaders: Skeletal Shimmer, KEINE circular Spinners

### Neue Seite 14 — Motion & Animation
**Eyebrow:** 12 / MOTION
**Headline:** Motion & Animation.
**Untertitel:** Wie ein ruhiger Atemzug, nicht wie ein Feuerwerk.
**Inhalt:**
- Spring-Physics: stiffness 100, damping 20
- Scroll-Reveals: translateY(20px) + opacity
- Staggered Entry: delay calc
- Zwei-Phasen-Ansatz: Phase A (Fade-In) → Phase B (Parallax, Spring-Physics)
- Verboten: Lineare Easing, Bouncing, Parallax-Overload, circular Spinners
- Regel: Nur transform/opacity animieren

### Neue Seite 15 — Anti-Patterns
**Eyebrow:** 13 / ANTI-PATTERNS
**Headline:** Anti-Patterns.
**Untertitel:** Was wir niemals tun. Diese Liste ist nicht verhandelbar.
**Inhalt in 3 Spalten:**
- Design: Keine Emojis, kein Inter, kein #000000, keine Neon-Glows, keine Equal-Card-Layouts, keine zentrierten Heroes
- Content: Keine generischen Namen, keine runden Fake-Zahlen, keine AI-Klischees, kein Lorem Ipsum
- Imagery: Kein Lotus/Mandala/Yoga, keine Stock-Fotos, keine Sonnenstrahlen

### Neue Seite 16 — Anwendung & Kontakt
**Eyebrow:** 14 / APPLICATION
**Headline:** Anwendung & Kontakt.
**Inhalt:**
- Wo der Brandguide eingesetzt wird: Website, Design (Fleur), Technik (Christopher), Social Media, Präsentationen, Blog & SEO
- Kontaktdaten: Sabala Mentoring, Ilja "Sabala" Krasevskij, sabala-mentoring.com
- Vertraulichkeitshinweis
- Version 2.0, April 2026

---

## DESIGN-REGELN FÜR ALLE NEUEN SEITEN

1. **Helle Seiten:** Background = Warm Canvas #FAF8F5
2. **Dunkle Seiten:** Background = Night Foundation #1A1A18 (NICHT bräunlich!)
3. **Wechsel:** Hell/Dunkel im Rhythmus, nicht mehr als 2 gleiche hintereinander
4. **Headlines:** Instrument Serif, dünn/light, letter-spacing -0.02em
5. **Body:** Satoshi, 400/500 weight
6. **Eyebrow-Labels:** Monospace, Gold, gesperrt, uppercase
7. **Kein Trio erwähnen** — der Brandguide ist rein visuell/gestalterisch
8. **Weißraum:** Großzügig. Lieber weniger Inhalt pro Seite als zu voll.
9. **Bilder:** Nur aus dem Ordner `Sabala Bilder`, rechteckig mit abgerundeten Ecken

## EMPFOHLENER SEITEN-RHYTHMUS (Hell/Dunkel)

| Nr | Kapitel | Modus |
|----|---------|-------|
| 1 | Cover | Dunkel |
| 2 | Brand Essence | Dunkel |
| 3 | Color Palette Hell | Hell |
| 4 | Typography | Hell |
| 5 | Interface Design | Dunkel |
| 6 | Bildsprache | Hell |
| 7 | Dark Palette | Dunkel |
| 8 | Akzent & Verboten | Hell |
| 9 | Verbotene Fonts | Dunkel |
| 10 | Tone of Voice | Dunkel |
| 11 | Layout-Prinzipien | Hell |
| 12 | Hero-Section | Hell |
| 13 | Komponenten | Dunkel |
| 14 | Motion & Animation | Hell |
| 15 | Anti-Patterns | Dunkel |
| 16 | Anwendung & Kontakt | Hell |
