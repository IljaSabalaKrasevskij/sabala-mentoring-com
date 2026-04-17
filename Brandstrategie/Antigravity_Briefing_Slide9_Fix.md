# Briefing: Slide 9 Fix — Premium-Angebot

## Kontext

Das Angebot-Dokument ist fertig. Es gibt **zwei Korrekturen auf Slide 9 (letzte Seite / CTA-Slide)**, die ich jetzt einbauen möchte.

Die relevante Datei ist: `files/Angebot-Export.html` → Slide 9 beginnt bei `<!-- SLIDE 9: CTA (Dark) -->`

---

## KORREKTUR 1 — Foto neu ausrichten

**Problem:** Das Foto rechts schneidet das Gesicht ab. Aktuelle Klasse: `object-cover object-top`

**Fix:**
- Ändere `object-top` zu `object-center` damit das Gesicht zentriert dargestellt wird
- Verwende das richtige Foto laut Briefing: `5_-__MXS8196.jpg` (Seitenprofil, einladend)  
  → Aktuell ist fälschlicherweise `Das-Team-Sabala.jpg` eingebunden
- Pfad: `../public/Bilder Sabala/5 - _MXS8196.jpg`
- Falls `object-center` nicht reicht, probiere `object-[center_30%]` um das Gesicht vollständig sichtbar zu machen

---

## KORREKTUR 2 — Buchungslink einbauen

**Problem:** Der CTA-Button ist ein `<button>` ohne Link — er tut nichts.

**Link:** `https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen`

**Fix:**
- Ersetze den `<button>` durch einen klickbaren `<a>`-Tag
- Öffnet im neuen Tab (`target="_blank"`)
- Gleiche Optik wie bisher (Night Gold Hintergrund, Text Night Foundation, rounded-full)
- CTA-Text bleibt: **HIER TERMIN WÄHLEN →**

**Erwünschtes HTML:**
```html
<a href="https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen"
   target="_blank"
   rel="noopener noreferrer"
   class="block w-full bg-night-gold text-deep-charcoal px-8 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors duration-500 text-center">
  HIER TERMIN WÄHLEN →
</a>
```

---

## KORREKTUR 3 — Headline anpassen (optional, aber empfohlen)

**Aktuell:** `Lass uns sprechen.<br><span class="italic text-night-gold">Mit klarem Commitment.</span>`

**Laut Originalbrieifng:** `Lass uns sprechen. *Völlig unverbindlich.*`

Da der User ein **unverbindliches Vorgespräch** als CTA möchte, passt "Mit klarem Commitment" nicht mehr. Bitte auf folgendes ändern:

```html
Lass uns sprechen.<br><span class="italic text-night-gold">Völlig unverbindlich.</span>
```

---

## Nach den Änderungen

1. Zeige mir die überarbeitete Slide 9 im Browser-Preview
2. Exportiere das aktualisierte PDF als `Premium-Angebot.pdf` in `Sabala Final Assets/`
3. Kein anderes Slide anfassen — nur Slide 9

---

## Qualitätsprüfung Slide 9

- [ ] Foto zeigt das Gesicht vollständig (nicht abgeschnitten)
- [ ] Foto ist `5_-__MXS8196.jpg` (Seitenprofil), nicht `Das-Team-Sabala.jpg`
- [ ] Button-Link öffnet `https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen`
- [ ] Link öffnet in neuem Tab (`target="_blank"`)
- [ ] Headline lautet "Völlig unverbindlich." (nicht "Mit klarem Commitment.")
- [ ] Optik unverändert — nur diese drei Korrekturen
