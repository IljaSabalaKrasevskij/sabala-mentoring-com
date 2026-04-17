# Briefing für Antigravity — Webseite auf Sabala Brand Guide V3.1 anpassen

**Projekt:** `/Users/iljakrasevskij/Documents/Claude/Projekte/Sabala Mentoring`
**Stack:** Next.js 15 (App Router) + Turbopack + Tailwind v4 + Framer Motion
**Dev-Server:** `http://localhost:3001`
**Stand:** 17.04.2026

---

## 0. Grundprinzip — WICHTIG

> **Special Design-Effekte und aufwändige Sektionen NIEMALS entfernen oder "vereinfachen".**
> Nur Brand-Tokens (Farben, Fonts, Text, Bilder) anpassen.

Die Seite hat bereits einen hohen technischen Fortschritt (Partikel-Heroes, Scrollytelling, 3D-Timelines, Custom Cursor, Chromakey-Videos). **Dieser Fortschritt wird bewahrt.** Der Brand Guide ist der Stil-Filter darüber, nicht ein Reset.

---

## 1. Brand Guide — Single Source of Truth

**Pflicht vor jedem Eingriff laden:**
```
/Users/iljakrasevskij/Documents/Claude/Projekte/Sabala Mentoring/Brandguide/SABALA-BRANDGUIDE.md
```

Version: **V3.1 — Sabala Sketchbook Edition**

---

## 2. KEEP — Diese Special Sections NICHT anfassen (nur Tokens remappen)

| Komponente | Pfad | Warum behalten |
|---|---|---|
| `DissolveParticleHero` | `src/components/ui/DissolveParticleHero.tsx` | Scroll-driven Partikel-Hero der Homepage — Signature-Effekt |
| `ExplodingParticleHero` | `src/components/ui/ExplodingParticleHero.tsx` | Alternative Hero — Signature-Effekt |
| `VideoParticleHero` | `src/components/ui/VideoParticleHero.tsx` | Video → Partikel Transition |
| `Timeline3DBox` | `src/components/ui/Timeline3DBox.tsx` | 3D rotating Timeline |
| `TreeBookshelfScrollytelling` | `src/components/ui/TreeBookshelfScrollytelling.tsx` | Scrollytelling |
| `MarvelTeamShowcase` | `src/components/ui/MarvelTeamShowcase.tsx` | KI-Team Showcase (gpt-team Seite) |
| `ChromaKeyVideo` | `src/components/ui/ChromaKeyVideo.tsx` | Transparent Video Overlays |
| `CustomCursor` | `src/components/ui/CustomCursor.tsx` | Globaler Custom Cursor |
| `MooniMascot` | `src/components/ui/MooniMascot.tsx` | Maskottchen Interaktion |
| `GoldDust` / `FootprintPath` / `SlowWordReveal` / `ScrollReveal` | `src/components/ui/*` | Micro-Animationen |
| Marquee Trust-Leiste | `src/app/page.tsx` Z. 15–62 | Logo-Slider (Namen-Version) |
| Framer Motion Scroll Reveals | verstreut | Entry-Animationen |
| Spotlight / Splite (Splide) | `src/components/ui/spotlight.tsx`, `splite.tsx` | Visuelle Akzente |

**Regel:** Animation-Logik, Scroll-Trigger, 3D-Transforms, Particle-Systems bleiben exakt wie sie sind. Nur Farben im Shader/im JSX tauschen, nichts Strukturelles.

---

## 3. REMAP — Globale Token-Anpassung

### 3.1 Farben in `src/app/globals.css` ersetzen

```diff
- --color-warm-canvas:     #FAF8F5;   ✓ (passt bereits)
- --color-pure-surface:    #FFFFFF;   ✓ (passt bereits)
- --color-deep-charcoal:   #1A1A18;   → #2E2B26   (WICHTIG: kein hartes Schwarz mehr)
- --color-warm-steel:      #6B6963;   → #7A7268
- --color-soft-stone:      #B5B0A8;   ✓ (behalten)
- --color-refined-gold:    #B8963E;   ✓ (passt exakt)

- --color-night-foundation:#1A1A18;   → #2E2B26
- --color-night-text:      #F5F3EF;   → #FAF8F5
- --color-night-secondary: #A09C95;   ✓ (behalten)
- --color-night-gold:      #C9A84C;   → #D4AE5A  (Gold-light aus Brand Guide)
```

**Zusätzlich ergänzen:**
```css
--color-warm-light:  #EDE8E0;  /* Cards, Sections */
--color-tech-bg:     #0A0806;  /* Nur für KI/Tech Deep-Dive Sections */
--color-gold:        #B8963E;
--color-gold-light:  #D4AE5A;
```

### 3.2 Hartkodierte Hex-Werte suchen & ersetzen

Prüfen via `grep -r "#030206\|#1A1A18\|#000000\|#F5F3EF" src/`:
- `#030206` → `#2E2B26` (auf `/gpt-team` Hero)
- `#000000` → `#2E2B26` überall
- Purple-Radials auf `/gpt-team` → Gold-Radials (`rgba(184,150,62,0.15)`)

### 3.3 Fonts

Pflicht: **Instrument Serif** (Headlines) + **Satoshi** (Body).
Bereits korrekt geladen in `layout.tsx`. **Keine Änderung nötig**, nur verifizieren dass keine Komponente `Inter`, `Roboto`, `Arial` erzwingt.

---

## 4. Die 3 Säulen — Farblogik (WICHTIG)

Pro Route konsistent anwenden:

| Route | Säule | Hintergrund | Textfarbe |
|---|---|---|---|
| `/gpt-team`, `/custom-gpt`, KI-Services | **Sabala AI Services** | Dark (`#2E2B26` oder `#0A0806`) | Cream (`#FAF8F5`), Gold-Akzent (`#D4AE5A`) |
| `/` (Home), `/ueber-mich`, `/premium-angebot`, Mentoring-Seiten | **Sabala Mentoring** | Cream (`#FAF8F5`) / Warm-Light (`#EDE8E0`) | Deep (`#2E2B26`) |
| `/special-launch-angebot`, Studio-Angebote | **Sabala Studio** | Pure White (`#FFFFFF`) | Deep (`#2E2B26`), Gold-Linie (`#B8963E`) |

**Regel:** Keine Sektion nutzt reines Schwarz mehr. Dark heißt `#2E2B26` (Mentoring/allgemein) oder `#0A0806` (Tech-Deep-Dive).

---

## 5. REPLACE — Inhaltliche Anpassungen

### 5.1 Bilder & Illustrationen

**Bestehende Bild-Ordner (bleiben, nur kuratiert einsetzen):**
```
/public/Bilder Sabala/      → Portrait-Fotos Sabala (für /ueber-mich, Autor-Sektionen)
/public/Bilder Meditation/  → Meditation-Content
/public/Sabalas Story/      → Storytelling-Assets
/public/images/             → Allgemein (Team, Logos, Hero-Elemente)
/public/images/team/        → Team-Fotos
/public/frames/muni-universe/      → Mooni Frame-Sequenzen
/public/frames/fuelle-geld/        → Scroll-Frame-Sequenzen
/public/blog-header-sequence/      → Blog-Header Sequenz
/public/videos/             → Video-Assets (ChromaKey etc.)
/public/models/             → 3D-Modelle
```

**Regeln:**
- Vorhandene Fotos (Sabala-Portraits, Team) bleiben — sind On-Brand
- Alle **generischen Stock-Illustrationen** durch **Pencil + Warm Gouache** Bilder ersetzen (Tatsuro Kiuchi / Pascal Campion Look)
- **Antigravity generiert KEINE Bilder.** Neue Illustrationen werden von Sabala via Claude + `/kie-image-gen` Skill erzeugt und als fertige Assets in `public/images/` bereitgestellt
- Antigravity referenziert fertige Bild-Pfade — bei Bedarf Platzhalter mit TODO-Kommentar setzen: `{/* TODO: Bild ersetzen durch /images/[name].jpg — wird separat generiert */}`
- Frame-Sequenzen (muni-universe, fuelle-geld, blog-header-sequence) bleiben unverändert — sind Signature-Assets

**Verboten:** Anime, Flat Design, 3D-Render, Vector-Art, kalte/blaue Paletten.

### 5.2 Tonalität (Copy)
Brand Guide V3.1 Tone of Voice strikt befolgen:
- **Raus:** "Start Sequence", "System Access", "99.9%", Ausrufezeichen, Buzzwords
- **Rein:** konkret, menschlich, ruhig, geerdet — siehe Brand Guide Kapitel Tonalität
- Auf `/gpt-team`: "Diamond Force" Metapher darf bleiben (Signature), aber umrahmende Copy anpassen

### 5.3 Emojis
**Absolutes Verbot.** Alle Emojis aus JSX entfernen.

---

## 6. Arbeitsreihenfolge für Antigravity

1. **Lies** `Brandguide/SABALA-BRANDGUIDE.md` vollständig
2. **Lies** dieses Briefing
3. **Globale Tokens** in `src/app/globals.css` remappen (Abschnitt 3.1)
4. **Hartkodierte Hex-Werte** ersetzen (Abschnitt 3.2) — Grep über `src/`
5. **Route für Route** durchgehen, pro Route Säulen-Farblogik anwenden (Abschnitt 4)
6. **Copy** Route für Route prüfen gegen Tone of Voice (Abschnitt 5.2)
7. **Special-Components** nur Farb-Props/Tailwind-Klassen anpassen — Logik nicht anfassen (Abschnitt 2)
8. **Emojis** entfernen (Abschnitt 5.3)
9. **Verify:** `npm run dev` auf Port 3001, alle Routen visuell prüfen

---

## 7. Verbotene Eingriffe

- ❌ Components in Abschnitt 2 löschen, ersetzen oder "vereinfachen"
- ❌ Animation-Dauern, Easing-Curves, Stagger-Delays ändern (außer Brand Guide verlangt explizit)
- ❌ Routen-Struktur ändern (`/gpt-team`, `/premium-angebot` etc. bleiben)
- ❌ Package-Dependencies ohne Rückfrage hinzufügen/entfernen
- ❌ `layout.tsx` Font-Setup brechen
- ❌ `public/` Asset-Ordner leeren

---

## 8. Quick Wins für Event morgen (Priorität)

Wenn Zeit knapp ist, in dieser Reihenfolge:

1. **globals.css Tokens** (Abschnitt 3.1) — 5 Minuten, größter visueller Impact
2. **`/` Homepage** Farblogik Säule Mentoring (cream) — sicherstellen
3. **Hero Copy** auf Homepage — Tonalität prüfen
4. **Navbar/Footer** Token-Check
5. Rest nach Event

---

**Ende Briefing.** Bei Unklarheiten: Brand Guide V3.1 hat immer Vorrang.
