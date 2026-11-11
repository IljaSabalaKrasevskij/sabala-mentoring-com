import { createClient, type Client } from "@libsql/client";

/* ──────────────────────────────────────────────────────────────────────────
   Lead-Speicher = gehostetes SQLite (Turso / libSQL).
   Die Webseite (Vercel) schreibt hier rein. Sabala Mail holt die Zeilen ab und
   legt daraus Kontakte im CRM an (Tabelle leads = Briefkasten).

   Env (Vercel, Production):
     TURSO_DATABASE_URL   libsql://<db>-<org>.turso.io
     TURSO_AUTH_TOKEN     Turso-Datenbank-Token
   ────────────────────────────────────────────────────────────────────────── */

export type Lead = {
  vorname: string;
  nachname: string;
  email: string;
  unternehmen: string;
  webseite: string;
  anliegen: string;
  quelle: string;
  telefon?: string;
};

let client: Client | null = null;

export function getClient(): Client | null {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) return null;
  if (!client) client = createClient({ url, authToken });
  return client;
}

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vorname TEXT NOT NULL,
  nachname TEXT NOT NULL,
  email TEXT NOT NULL,
  unternehmen TEXT,
  webseite TEXT,
  anliegen TEXT NOT NULL,
  quelle TEXT,
  status TEXT NOT NULL DEFAULT 'Neu',
  erstellt_am TEXT NOT NULL DEFAULT (datetime('now')),
  telefon TEXT
)`;

/* Die Tabelle gab es schon vor dem Telefonfeld. Einmal je Instanz: anlegen, falls sie fehlt,
   und die Spalte nachziehen, falls sie fehlt (ALTER TABLE kennt in SQLite kein IF NOT EXISTS). */
let bereit: Promise<void> | null = null;
function tabelle(db: Client): Promise<void> {
  return (bereit ??= (async () => {
    await db.execute(CREATE_TABLE);
    try {
      await db.execute("ALTER TABLE leads ADD COLUMN telefon TEXT");
    } catch (err) {
      if (!/duplicate column/i.test(String(err))) throw err;
    }
  })().catch((err) => {
    bereit = null; // beim naechsten Mal neu versuchen
    throw err;
  }));
}

/* Schreibt einen Lead. Gibt false zurueck, wenn Turso nicht konfiguriert ist
   (dann faellt das Frontend auf mailto zurueck). Wirft bei echten DB-Fehlern. */
export async function insertLead(data: Lead): Promise<boolean> {
  const db = getClient();
  if (!db) return false;

  await tabelle(db);
  await db.execute({
    sql: `INSERT INTO leads (vorname, nachname, email, unternehmen, webseite, anliegen, quelle, telefon)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [data.vorname, data.nachname, data.email, data.unternehmen, data.webseite, data.anliegen, data.quelle, data.telefon || null],
  });
  return true;
}
