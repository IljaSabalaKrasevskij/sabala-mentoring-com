import type { Client } from "@libsql/client";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/* ──────────────────────────────────────────────────────────────────────────
   Botschutz: der Stempel.

   Bevor ein Formular etwas abschicken darf, holt die Seite beim Server einen Stempel (GET /api/formular/siegel).
   Er ist mit einem geheimen Schlüssel unterschrieben und trägt seine Ausstellzeit. Beim Abschicken prüft der Server:
   - Unterschrift echt? Sonst hat sich jemand den Stempel ausgedacht.
   - Mindestens drei Sekunden alt? So schnell füllt kein Mensch ein Formular aus. Die Seite wartet von selbst so lange.
   - Höchstens zwei Stunden alt und noch nie benutzt? Jeder Stempel gilt genau einmal.
   - Höchstens 30 eingelöste Stempel je Absender und Stunde, über alle Formulare zusammen.
   - Höchstens 300 eingelöste Stempel je Stunde über alle Absender. Das ist der Gurt für den Fall, dass viele
     Absender zusammen angreifen: Briefkasten, Notion und das Handy laufen dann nicht voll.

   Das Verfahren braucht kein Versteck im Code: Der Code ist öffentlich, der Schlüssel nicht.
   Wovor es nicht schützt: Programme, die einen echten Browser fernsteuern und sich Zeit lassen. Die bremsen
   die Obergrenze, das unsichtbare Feld und die strengen Feldprüfungen (Name, Mail, Telefon).
   ponytail: kein Bilderrätsel, kein fremder Dienst. Kommt trotzdem Müll durch: Vercel BotID oder Cloudflare Turnstile davorsetzen.

   Vom Absender wird nur ein Fingerabdruck gespeichert (mit dem Schlüssel verrechnet, nicht zurückrechenbar),
   und nur so lange, wie die Obergrenze ihn braucht.

   Ohne App-Importe, damit siegel.test.mjs die Datei direkt mit Node laden kann.
   ────────────────────────────────────────────────────────────────────────── */

export const MIN_ALTER_MS = 3_000;
export const MAX_ALTER_MS = 2 * 60 * 60 * 1000;
/* ponytail: feste Zahl. 30 reicht für einen Seminarraum im selben WLAN. Vor einer großen Aktion hochsetzen. */
export const JE_ABSENDER_JE_STUNDE = 30;
/* ponytail: feste Zahl, weit über dem echten Betrieb (ein paar Anfragen am Tag). Greift sie, sind die Formulare für alle
   zu, bis die Stunde um ist. Kommt das vor: Vercel BotID oder Cloudflare Turnstile davorsetzen. */
export const GESAMT_JE_STUNDE = 300;
const STUNDE = 60 * 60 * 1000;

export type SiegelUrteil = "ok" | "ungueltig" | "zu-frueh" | "zu-viele";

const zeichnen = (schluessel: string, text: string) => createHmac("sha256", schluessel).update(text).digest("base64url");

/** Neuer Stempel: Zufall, Ausstellzeit, Unterschrift. */
export function siegelAusstellen(schluessel: string, jetzt = Date.now()): string {
  const kern = `${randomBytes(12).toString("base64url")}.${jetzt.toString(36)}`;
  return `${kern}.${zeichnen(schluessel, kern)}`;
}

/* Die Indizes halten das Zählen schnell, auch wenn viele Absender die Tabelle füllen. Ohne sie liest jede Anfrage
   die ganze Tabelle, und dieselbe Datenbank trägt den Briefkasten und die Einwilligungen. */
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS formular_siegel (
    id TEXT PRIMARY KEY,
    absender TEXT NOT NULL,
    eingeloest INTEGER NOT NULL,
    bis INTEGER NOT NULL
  )`,
  "CREATE INDEX IF NOT EXISTS formular_siegel_absender ON formular_siegel (absender, eingeloest)",
  "CREATE INDEX IF NOT EXISTS formular_siegel_eingeloest ON formular_siegel (eingeloest)",
  "CREATE INDEX IF NOT EXISTS formular_siegel_bis ON formular_siegel (bis)",
];
const fertig = new WeakMap<Client, Promise<unknown>>();
function vorbereiten(db: Client): Promise<unknown> {
  let p = fertig.get(db);
  if (!p) {
    p = db.batch(SCHEMA, "write").catch((err) => { fertig.delete(db); throw err; });
    fertig.set(db, p);
  }
  return p;
}

/**
 * Prüft einen Stempel und löst ihn ein. absender: IP oder IPv6-Netz in einer Schreibweise (absenderNetz aus einwilligung.ts).
 * Ohne Datenbank (db = null) gelten nur Unterschrift und Alter: kein Einmal-Schutz, keine Obergrenze.
 */
export async function siegelEinloesen(db: Client | null, schluessel: string, wert: unknown, absender: string, jetzt = Date.now()): Promise<SiegelUrteil> {
  if (typeof wert !== "string" || wert.length > 200) return "ungueltig";
  const [id, zeit, unterschrift, ...rest] = wert.split(".");
  if (!id || !zeit || !unterschrift || rest.length) return "ungueltig";
  const soll = Buffer.from(zeichnen(schluessel, `${id}.${zeit}`));
  const ist = Buffer.from(unterschrift);
  if (ist.length !== soll.length || !timingSafeEqual(ist, soll)) return "ungueltig";
  const ausgestellt = parseInt(zeit, 36);
  const alter = jetzt - ausgestellt;
  if (!(alter <= MAX_ALTER_MS)) return "ungueltig";
  if (alter < MIN_ALTER_MS) return "zu-frueh";
  if (!db) return "ok";

  await vorbereiten(db);
  const wer = zeichnen(schluessel, `absender:${absender}`).slice(0, 24);
  /* Zählen und Schreiben in einer einzigen Anweisung: Die Zeile entsteht nur, wenn der Absender unter der Grenze ist.
     Getrennt (erst zählen, dann schreiben) kämen hundert gleichzeitige Anfragen alle durch, weil jede noch null zählt.
     Die Zeile bleibt, bis der Stempel abgelaufen ist (Einmal-Schutz) und die Stunde der Obergrenze vorbei ist. */
  const [, neu] = await db.batch(
    [
      { sql: "DELETE FROM formular_siegel WHERE bis < ?", args: [jetzt] },
      {
        sql: `INSERT INTO formular_siegel (id, absender, eingeloest, bis)
              SELECT ?, ?, ?, ?
              WHERE (SELECT count(*) FROM formular_siegel WHERE absender = ? AND eingeloest > ?) < ?
                AND (SELECT count(*) FROM formular_siegel WHERE eingeloest > ?) < ?
              ON CONFLICT(id) DO NOTHING`,
        args: [id, wer, jetzt, Math.max(ausgestellt + MAX_ALTER_MS, jetzt + STUNDE), wer, jetzt - STUNDE, JE_ABSENDER_JE_STUNDE, jetzt - STUNDE, GESAMT_JE_STUNDE],
      },
    ],
    "write",
  );
  if (neu.rowsAffected === 1) return "ok";
  // Nichts geschrieben: Entweder gibt es den Stempel schon (zweites Mal), oder eine der beiden Grenzen ist erreicht.
  const schonDa = await db.execute({ sql: "SELECT 1 FROM formular_siegel WHERE id = ?", args: [id] });
  return schonDa.rows.length ? "ungueltig" : "zu-viele";
}
