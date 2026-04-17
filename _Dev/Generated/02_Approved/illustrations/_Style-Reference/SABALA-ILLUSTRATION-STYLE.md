# Sabala Illustration Style — Master Reference

**Entscheidung getroffen:** 17. April 2026
**Stil-Name:** Pencil + Warm Gouache (Sabala Sketchbook)
**Referenzen:** Tatsuro Kiuchi, Pascal Campion, André Ducci

---

## Visueller Kern

- Sichtbare Bleistiftlinien, die durch die Farbflächen durchschimmern
- Warme Gouache-Flächen (Creme, Amber, Gold)
- Skizzenbuch-Ästhetik mit unfertigen, offenen Kanten
- Licht trägt die Komposition statt harter Konturen
- Menschliche Präsenz, nicht fotorealistisch
- Intimes, werkstattartiges Gefühl

## Master-Prompt (Base)

```
pencil sketch illustration with warm gouache color overlay,
visible graphite pencil lines peeking through painted areas,
sketchbook aesthetic with unfinished edges,
[MOTIV-BESCHREIBUNG],
warm afternoon light,
cream and amber palette with gold accents,
in the style of Tatsuro Kiuchi and Pascal Campion,
intimate workshop feeling, no text
```

## Parameter

```json
{
  "model": "flux-kontext-pro",
  "aspectRatio": "16:9",
  "outputFormat": "jpeg",
  "enableTranslation": false,
  "promptUpsampling": true,
  "safetyTolerance": 2
}
```

## Farb-Palette (aus Brand Guide)

- `--cream: #FAF8F5` — Hintergründe
- `--warm-light: #EDE8E0` — Flächen
- `--warm-mid: #7A7268` — Schatten
- `--deep: #2E2B26` — Linien, Kontrast
- `--gold: #B8963E` — Akzent
- `--gold-light: #D4AE5A` — Highlights

## Verbotene Stil-Elemente

- Anime / Manga
- Fotorealismus
- Harte schwarze Umrisslinien
- Kühle Farbtöne (Blau, Grün dominant)
- 3D-Renderings
- Flat Design ohne Textur
- Vektorielles Clean-Line-Design

## Beispiel-Referenz

`SABALA-ILLUSTRATION-STYLE-MASTER.jpg` in diesem Ordner.

## Anwendung

| Kontext | Motiv-Typ |
|--------|-----------|
| Brand Book | Konzepte, Prozesse, Methoden |
| Präsentationen | Szenen mit Menschen |
| Website-Hero | Stimmungsbilder |
| Social Media | Einzelne ikonische Momente |
| Mooni-Charakter | Separater Stil, siehe Mooni-Guide |

## Ablage

- **Approved final:** `_Dev/Generated/02_Approved/illustrations/[topic]/`
- **Explorations:** `_Dev/Generated/01_Explorations/YYYY-MM-DD_[thema]/`
- **Archive:** `_Dev/Generated/03_Archive/`

---

**Single Source of Truth:** Dieser Ordner. Jede neue Illustration MUSS sich an diesem Style-Master messen lassen.
