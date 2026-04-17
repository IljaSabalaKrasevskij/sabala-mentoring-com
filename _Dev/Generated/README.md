# Generated Assets — Ordnerstruktur

```
Generated/
├── 01_Explorations/     → Stil-Tests, Proben, datiert nach Session
├── 02_Approved/         → Freigegebene Assets (Single Source of Truth)
│   └── illustrations/
│       ├── _Style-Reference/   ← MASTER: SABALA-ILLUSTRATION-STYLE.md
│       └── [topic]/            ← nach Thema sortiert
└── 03_Archive/          → Alte Versuche, Referenz
```

## Workflow

1. **Neuer Test** → `01_Explorations/YYYY-MM-DD_[thema]/`
2. **Freigegeben** → verschieben nach `02_Approved/illustrations/[topic]/`
3. **Veraltet** → nach `03_Archive/`

## Stil-Entscheidung

**Aktueller Sabala-Stil:** Pencil + Warm Gouache
Siehe: `02_Approved/illustrations/_Style-Reference/SABALA-ILLUSTRATION-STYLE.md`

## Tool

Generation via KIE AI Flux Kontext Pro.
Skill: `/kie-image-gen`
