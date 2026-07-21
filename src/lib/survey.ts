import { createClient, type Client } from "@libsql/client";

/* ──────────────────────────────────────────────────────────────────────────
   Umfrage-Speicher = dieselbe gehostete Turso/libSQL-DB wie die Leads.
   Die Webseite (Vercel) schreibt Umfrage-Antworten hier rein, das Sabala-
   Dashboard liest dieselbe Tabelle und wertet aus (Aggregate + Content-Ideen).

   Mehrfach-Antworten (themen, modelle, ziele) liegen als JSON-Text-Array in
   einer TEXT-Spalte — SQLite hat keinen Array-Typ, JSON ist der pragmatische
   Weg. Beim Lesen JSON.parse, fuer Aggregate ueber alle Zeilen flatten.

   Env (Vercel, Production): TURSO_DATABASE_URL + TURSO_AUTH_TOKEN (wie leads).
   ────────────────────────────────────────────────────────────────────────── */

export type SurveyInput = {
  email: string;
  vorname: string;
  rolle: string;           // Single-Choice: wer bist du
  techLevel: string;       // Single-Choice: nicht-technisch … developer
  modelle: string[];       // Multi: OpenAI, Claude, lokal, …
  themen: string[];        // Multi: Automationen, Content, …
  ziele: string[];         // Multi: was willst du erreichen
  problem: string;         // Freitext: groesste Herausforderung
  kontext: string;         // Freitext optional: sonst noch was
  quelle: string;          // "Umfrage-Newsletter" | "Umfrage-Kunde"
};

let client: Client | null = null;

function getClient(): Client | null {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) return null;
  if (!client) client = createClient({ url, authToken });
  return client;
}

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS survey_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  vorname TEXT,
  rolle TEXT,
  tech_level TEXT,
  modelle TEXT,
  themen TEXT,
  ziele TEXT,
  problem TEXT,
  kontext TEXT,
  quelle TEXT,
  status TEXT NOT NULL DEFAULT 'Neu',
  erstellt_am TEXT NOT NULL DEFAULT (datetime('now'))
)`;

/* Schreibt eine Umfrage-Antwort. false, wenn Turso nicht konfiguriert ist. */
export async function insertSurveyResponse(data: SurveyInput): Promise<boolean> {
  const db = getClient();
  if (!db) return false;

  await db.batch(
    [
      CREATE_TABLE,
      {
        sql: `INSERT INTO survey_responses
                (email, vorname, rolle, tech_level, modelle, themen, ziele, problem, kontext, quelle)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          data.email,
          data.vorname,
          data.rolle,
          data.techLevel,
          JSON.stringify(data.modelle),
          JSON.stringify(data.themen),
          JSON.stringify(data.ziele),
          data.problem,
          data.kontext,
          data.quelle,
        ],
      },
    ],
    "write"
  );
  return true;
}
