/* ──────────────────────────────────────────────────────────────────────────
   Absenden für alle Formulare. Läuft im Browser.

   Vor jedem Absenden braucht die Seite einen Stempel vom Server (Botschutz, src/lib/siegel.ts). Er muss beim
   Abschicken mindestens drei Sekunden alt sein. Darum holt formularBeruehrt() ihn schon, sobald jemand ins Formular
   klickt: Bis ein Mensch fertig getippt hat, ist der Stempel alt genug, und niemand wartet.
   ────────────────────────────────────────────────────────────────────────── */

type Stempel = { wert: string; reif: number; geholt: number };
let vorrat: Promise<Stempel> | null = null;
const FRISCH_MS = 100 * 60 * 1000; // der Server nimmt einen Stempel zwei Stunden lang, hier mit Abstand

function holen(): Promise<Stempel> {
  const p = fetch("/api/formular/siegel", { cache: "no-store" }).then(async (res) => {
    if (!res.ok) throw new Error("Verbindungsproblem. Versuch es bitte noch einmal."); // zwei Formulare zeigen diesen Text direkt an
    const j = (await res.json()) as { siegel: string; warten: number };
    // etwas Luft, falls die Uhren von Browser und Server minimal auseinanderlaufen
    return { wert: j.siegel, reif: Date.now() + j.warten + 250, geholt: Date.now() };
  });
  p.catch(() => { if (vorrat === p) vorrat = null; }); // beim nächsten Mal neu versuchen
  return p;
}

/** Als onFocus aufs Formular legen: holt den Stempel, sobald jemand hineinklickt. */
export function formularBeruehrt(): void {
  vorrat ??= holen();
}

/* Nimmt den Stempel aus dem Vorrat und wartet, bis er alt genug ist. Jeder gilt einmal, darum ist der Vorrat danach leer. */
async function nimm(): Promise<Stempel> {
  let s = await (vorrat ??= holen());
  if (Date.now() - s.geholt > FRISCH_MS) s = await (vorrat = holen());
  vorrat = null;
  const rest = s.reif - Date.now();
  if (rest > 0) await new Promise((fertig) => setTimeout(fertig, rest));
  return s;
}

/** Ein Stempel für Formulare mit eigenem Absenden: als Feld „siegel“ mitschicken. */
export const siegel = async () => (await nimm()).wert;

export type Ergebnis =
  | { art: "ok"; bestaetigung?: string }
  | { art: "eingabe"; feld: string; meldung: string } // der Server beanstandet ein Feld, die Meldung gehört ans Formular
  | { art: "fehlt" } // Backend nicht eingerichtet oder Bestätigungsmail nicht möglich
  | { art: "fehler" }; // Netz weg, Obergrenze erreicht oder Serverfehler

/** Schickt ein Formular an eine der Routen, die mit { ok, reason, feld, meldung, bestaetigung } antworten. */
export async function formularSenden(api: string, daten: Record<string, unknown>): Promise<Ergebnis> {
  try {
    for (let versuch = 0; versuch < 2; versuch++) {
      const s = await nimm();
      const res = await fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...daten, siegel: s.wert }) });
      const j = (await res.json().catch(() => ({}))) as { bestaetigung?: string; reason?: string; feld?: string; meldung?: string };
      if (res.ok) return { art: "ok", bestaetigung: j.bestaetigung };
      if (res.status === 422) {
        vorrat = Promise.resolve(s); // nicht eingelöst: Nach dem Korrigieren geht es ohne Warten weiter
        return { art: "eingabe", feld: j.feld ?? "", meldung: j.meldung ?? "Bitte prüf deine Angaben." };
      }
      if (res.status === 503) return { art: "fehlt" };
      if (res.status !== 400 || j.reason !== "siegel") return { art: "fehler" };
      // Stempel abgelaufen oder schon benutzt: einmal mit einem frischen versuchen
    }
  } catch {
    // Netz weg
  }
  return { art: "fehler" };
}
