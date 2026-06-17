import { createClient, type Client } from "@libsql/client";

/* ──────────────────────────────────────────────────────────────────────────
   Lead-Speicher = gehostetes SQLite (Turso / libSQL).
   Die Webseite (Vercel) schreibt hier rein, das Sabala-Dashboard liest dieselbe
   DB und zeigt die Pipeline, MOONI benachrichtigt bei neuen Anfragen.

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
};

let client: Client | null = null;

function getClient(): Client | null {
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
  erstellt_am TEXT NOT NULL DEFAULT (datetime('now'))
)`;

/* Schreibt einen Lead. Gibt false zurueck, wenn Turso nicht konfiguriert ist
   (dann faellt das Frontend auf mailto zurueck). Wirft bei echten DB-Fehlern. */
export async function insertLead(data: Lead): Promise<boolean> {
  const db = getClient();
  if (!db) return false;

  await db.batch(
    [
      CREATE_TABLE,
      {
        sql: `INSERT INTO leads (vorname, nachname, email, unternehmen, webseite, anliegen, quelle)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [data.vorname, data.nachname, data.email, data.unternehmen, data.webseite, data.anliegen, data.quelle],
      },
    ],
    "write"
  );
  return true;
}
