# Skill-Paket für Antigravity — Sabala Mentoring

## Was ist das?

Diese Dateien sind AI-Skills (Best Practices & Anleitungen), die Claude in claude.ai verwendet, um hochwertige Ergebnisse zu produzieren. Gib sie Antigravity als Kontext, damit der Agent auf dem gleichen Niveau arbeiten kann.

## Enthaltene Skills

### Präsentation & PDF
| Datei | Zweck |
|-------|-------|
| `pptx-SKILL.md` | Hauptskill für PowerPoint-Erstellung (Übersicht, Design-Ideen) |
| `pptx-pptxgenjs.md` | Technische Anleitung: PPTX von Grund auf erstellen mit pptxgenjs |
| `pptx-editing.md` | Technische Anleitung: Bestehende PPTX bearbeiten |
| `pdf-SKILL.md` | PDF-Erstellung, -Bearbeitung, -Export |
| `pdf-REFERENCE.md` | Erweiterte PDF-Referenz (JavaScript, fortgeschrittene Techniken) |

### Design-Qualität
| Datei | Zweck |
|-------|-------|
| `high-end-visual-design-SKILL.md` | Premium-Design-Standards (Awwwards-Niveau). Definiert Fonts, Spacing, Shadows, Animationen. Blockiert generische AI-Ästhetik. |
| `design-tokens-SKILL.md` | Iljas eigenes Design-Token-System (Farben, Typografie, Komponenten, Layout) |
| `stitch-design-taste-SKILL.md` | Design-System für semantische UI-Standards — Typografie, Farbe, Layout, Micro-Motion |

### Qualitätssicherung
| Datei | Zweck |
|-------|-------|
| `full-output-enforcement-SKILL.md` | Verhindert, dass der Agent Code abkürzt oder Platzhalter verwendet. Erzwingt vollständige Ausgabe. |

## Empfohlene Verwendung in Antigravity

Gib dem Agenten diese Skills als Kontext mit dem Hinweis:

> "Lies zuerst die relevanten Skill-Dateien, bevor du mit der Arbeit beginnst. Für die Angebotspräsentation sind relevant: pptx-SKILL.md, pptx-pptxgenjs.md, high-end-visual-design-SKILL.md, design-tokens-SKILL.md und full-output-enforcement-SKILL.md."

## Reihenfolge für die Präsentation

1. `design-tokens-SKILL.md` lesen (Iljas Design-System verstehen)
2. `high-end-visual-design-SKILL.md` lesen (Premium-Standards)
3. `pptx-SKILL.md` + `pptx-pptxgenjs.md` lesen (Technische Umsetzung)
4. `full-output-enforcement-SKILL.md` lesen (Keine Abkürzungen)
5. Brandguide + Briefing als inhaltliche Grundlage verwenden
6. Präsentation erstellen → als PDF exportieren
