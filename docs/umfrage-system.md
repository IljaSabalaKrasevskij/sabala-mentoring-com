# Sabala Beduerfnis-Umfrage — Strategie & Betrieb

> Gebaut am 21.7.2026. Ziel: herausfinden, was deine Menschen mit KI wirklich wollen,
> die Daten sammeln, auswerten und in Trainings + Content verwandeln.

---

## 1. Die Idee in einem Satz

Statt zu raten, was deine Newsletter-Anmelder und Kunden brauchen, **fragst du sie direkt** —
mit einer 2-Minuten-Umfrage, deren Antworten automatisch in deinem Dashboard landen, sich selbst
auswerten und dir fertige Content-Ideen liefern.

## 2. Warum das der Hebel ist

- **Du baust ab jetzt aus echten Beduerfnissen**, nicht aus Bauchgefuehl.
- **Jede Antwort ist ein O-Ton** — direkt als Hook, Betreff oder Karussell-Titel nutzbar.
- **Newsletter UND Bestandskunden** beantworten dieselbe Umfrage. Du siehst getrennt,
  wie sich Interessenten von Kunden unterscheiden.
- **Kein neues Tool.** Alles laeuft ueber deine bestehende Kette:
  Webseite (Vercel) -> Turso -> Dashboard, plus ActiveCampaign fuer den Versand.

## 3. Der Funnel

```
  ActiveCampaign-Mail  ->  sabala-mentoring.com/umfrage  ->  Turso (survey_responses)
   (Einladung)              (schoenes Formular)               |
                                                              +->  Dashboard /umfrage  (Auswertung + Content-Ideen)
                                                              +->  AC-Tag "Umfrage ausgefuellt"  (fuer Follow-up)
                                                              +->  ntfy-Push aufs Handy  (du weisst sofort Bescheid)
```

## 4. Was gefragt wird (und warum)

| Frage | Warum |
|---|---|
| Wer bist du? (Rolle) | Segmentierung: Solo vs. Agentur vs. Team vs. Anfaenger |
| Wie technisch? | Sprache/Tiefe der Trainings kalibrieren (Developer vs. nicht-technisch) |
| Womit arbeitest du? (Modelle) | OpenAI / Claude / lokale Modelle / noch keine -> Positionierung |
| Was beschaeftigt dich? (Themen) | Content-Themen priorisieren |
| Wo willst du hin? (Ziele) | Angebots-Richtung (Automation vs. Content vs. eigene Tools) |
| Groesste Huerde? (Freitext) | Die echten O-Toene fuer Hooks + Betreffzeilen |
| Sonst noch was? (Freitext) | Wuensche, die du sonst nie erfahren wuerdest |

## 5. Was gebaut wurde (Dateien)

**Webseite (`~/code/sabala-mentoring-com`)**
- `src/app/umfrage/page.tsx` + `src/components/umfrage/UmfrageForm.tsx` — das Formular (`/umfrage`)
- `src/app/api/umfrage/route.ts` — nimmt an, schreibt Turso, taggt AC, pusht ntfy
- `src/lib/survey.ts` — Turso-Schema `survey_responses`
- `src/lib/activecampaign.ts` — neue Funktion `tagContact()` (taggt ohne Listen-Zwang)
- `emails/umfrage-einladung.html` — die Einladungs-Mail (ASCII, fuer AC)

**Dashboard (`~/code/sabala-dashboard-v2`)**
- `src/app/(universe)/umfrage/` — die Auswertungs-View (Aggregate + O-Toene + Content-Ideen)
- `src/lib/survey.ts` — Lesen + deterministische Analyse (kein LLM)
- Link im Universe-Top-Strip neben "Anfragen"

**Link-Varianten**
- Newsletter/Interessenten: `https://sabala-mentoring.com/umfrage`
- Bestandskunden: `https://sabala-mentoring.com/umfrage?k=1` (wird im Dashboard als "Umfrage-Kunde" getrennt)

---

## 6. Was DU noch tun musst (die API kann keine AC-Automationen bauen)

### A) Bestandskunden + Liste jetzt anschreiben (einmalige Kampagne)

1. ActiveCampaign -> linke Leiste **Campaigns** -> **Create a campaign**.
2. Name: `Umfrage - Wo willst du mit KI hin` -> Type: **Standard**.
3. **Lists**: waehle deine Kunden-/Interessenten-Liste(n) (z. B. Liste 26 "Sabala Academy",
   plus die Liste/den Tag deiner Bestandskunden).
4. **Design**: oben **"Start from scratch"** -> Zeilen-Typ **"Code"** (HTML-Block) ->
   Inhalt von `emails/umfrage-einladung.html` reinkopieren.
   - Fuer die Kunden-Kampagne im Button-Link `/umfrage` durch `/umfrage?k=1` ersetzen
     und den mit "KUNDEN-VARIANTE" markierten Absatz nehmen (steht als Kommentar in der Datei).
5. Betreff-Vorschlag: `Kurze Frage: wo willst du mit KI eigentlich hin?`
6. **Send** (oder Schedule).

### B) Neue Newsletter-Anmelder automatisch einladen (Automation)

1. ActiveCampaign -> **Automations** -> **Create an automation** -> **Start from scratch**.
2. Trigger: **"Tag is added"** -> Tag: **`Sabala Academy Newsletter`** (existiert, ID 59).
   Runs: **Once**.
3. Aktion **"Wait"** -> 1 Tag (damit die Willkommensmail zuerst kommt).
4. Aktion **"Send an email"** -> **"Start from scratch"** -> HTML-Block ->
   `emails/umfrage-einladung.html` einfuegen (Standard-Link `/umfrage`).
5. **Active** schalten.

### C) Optional: Danke sagen, wenn jemand geantwortet hat

- Trigger: **"Tag is added"** -> Tag **`Umfrage ausgefuellt`** (existiert bereits, ID 68 —
  wird von der Webseite automatisch gesetzt).
- Aktion: kurze Danke-Mail. (Nice-to-have, nicht noetig.)

---

## 7. So liest du das Dashboard (`/umfrage`)

- **Stats oben**: wie viele Antworten, Split Newsletter vs. Kunden.
- **Tabs**: "Alle / Umfrage-Kunde / Umfrage-Newsletter" — die Balken darunter rechnen sich pro Tab neu.
  So siehst du direkt, wo sich Kunden von Interessenten unterscheiden.
- **Content-Ideen** (goldener Block): automatisch aus den haeufigsten Themen + Zielen abgeleitet,
  mit "X-mal gefragt". Das ist deine Redaktionsliste.
- **O-Toene**: die Freitext-Huerden im Original. Direkt als Hook/Betreff kopieren.
- **Einzelantworten**: jede Antwort aufklappbar, mit "zurueckschreiben"-Link.

## 8. Offene Feinschliff-Ideen (spaeter)

- Umfrage-Antworten in den `lead-watch`/Morning-Brief aufnehmen (aktuell pusht die API direkt).
- CSV-Export im Dashboard.
- Wenn genug Antworten da sind: MOONI/LLM ueber die Freitexte laufen lassen fuer Themen-Cluster
  (jetzt bewusst regelbasiert gehalten — schnell, gratis, nachvollziehbar).
