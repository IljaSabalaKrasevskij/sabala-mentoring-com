import type { Client, InValue } from "@libsql/client";
import { randomBytes } from "node:crypto";

/* ──────────────────────────────────────────────────────────────────────────
   Einwilligung in Mails, mit Nachweis und Double-Opt-in.

   Schritt 1 (anmelden): Formular mit Häkchen abgeschickt. Gespeichert wird der Wortlaut am Häkchen
   samt Version, die Zeit und die IP. Status „ausstehend“, dazu ein Token für den Link in der Mail.
   Schritt 2 (bestaetigen): Klick auf den Link. Erst jetzt ist die Einwilligung „aktiv“.

   Die Tabellen heißen nl_* und liegen in derselben Datenbank wie der Briefkasten (leads).
   Sabala Mail liest sie und zeigt die Einwilligung am Kontakt. Das Schema ist dort dasselbe
   (src/lib/newsletter/db.ts), darum hier nur CREATE IF NOT EXISTS für frische Datenbanken.

   Ohne App-Importe, damit einwilligung.test.mjs die Datei direkt mit Node laden kann.
   ────────────────────────────────────────────────────────────────────────── */

export const LISTE = { marke: "sabala", schluessel: "sabala-newsletter", name: "Sabala Newsletter", beschreibung: "KI-Updates für Unternehmer, neue Kurse und Termine" } as const;

/** So lange nach einer verschickten Bestätigungsmail geht an dieselbe Adresse keine zweite raus. */
export const WARTEN_SEKUNDEN = 600;

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS nl_kontakte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    vorname TEXT NOT NULL DEFAULT '',
    nachname TEXT NOT NULL DEFAULT '',
    sprache TEXT NOT NULL DEFAULT 'de' CHECK (sprache IN ('de','en')),
    erstellt_am TEXT NOT NULL DEFAULT (datetime('now')),
    geaendert_am TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS nl_listen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    marke TEXT NOT NULL CHECK (marke IN ('sabala','vega','luxus')),
    schluessel TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    beschreibung TEXT NOT NULL DEFAULT '',
    einwilligungstext TEXT NOT NULL,
    einwilligung_version INTEGER NOT NULL DEFAULT 1,
    erstellt_am TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS nl_einwilligungen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kontakt_id INTEGER NOT NULL REFERENCES nl_kontakte(id) ON DELETE CASCADE,
    liste_id INTEGER NOT NULL REFERENCES nl_listen(id),
    status TEXT NOT NULL DEFAULT 'ausstehend' CHECK (status IN ('ausstehend','aktiv','abgemeldet','unzustellbar','beschwert')),
    quelle TEXT NOT NULL DEFAULT '',
    einwilligungstext TEXT NOT NULL,
    einwilligung_version INTEGER NOT NULL,
    angemeldet_am TEXT NOT NULL DEFAULT (datetime('now')),
    angemeldet_ip TEXT NOT NULL DEFAULT '',
    bestaetigt_am TEXT, bestaetigt_ip TEXT,
    abgemeldet_am TEXT, abgemeldet_grund TEXT,
    token TEXT NOT NULL UNIQUE,
    UNIQUE (kontakt_id, liste_id)
  )`,
  `CREATE TABLE IF NOT EXISTS nl_ereignisse (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    einwilligung_id INTEGER NOT NULL REFERENCES nl_einwilligungen(id) ON DELETE CASCADE,
    art TEXT NOT NULL,
    am TEXT NOT NULL DEFAULT (datetime('now')),
    ip TEXT NOT NULL DEFAULT '',
    notiz TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE TABLE IF NOT EXISTS nl_merkmale (
    kontakt_id INTEGER NOT NULL REFERENCES nl_kontakte(id) ON DELETE CASCADE,
    merkmal TEXT NOT NULL,
    gesetzt_am TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (kontakt_id, merkmal)
  )`,
];

export type Anmeldung = { email: string; vorname: string; nachname: string; quelle: string; ip: string; text: string; version: number };
/** senden: Jetzt gehört eine Bestätigungsmail raus. false bei „aktiv“ (schon bestätigt) und wenn eben erst eine rausging. Nach dem Versand: mailVermerken(id). */
export type Stand = { id: number; status: "ausstehend" | "aktiv"; token: string; senden: boolean };
export type Bestaetigt = { email: string; vorname: string; nachname: string; quelle: string; einwilligung_id: number; neu: boolean };

const eine = async <T>(db: Client, sql: string, args: InValue[] = []) => (await db.execute({ sql, args })).rows[0] as unknown as T | undefined;
const token = () => randomBytes(24).toString("base64url"); // 192 Bit Zufall, nicht erratbar

/** Schritt 1. Legt Kontakt und Einwilligung an oder frischt sie auf. Der Wortlaut kommt vom Formular, nicht aus der Datenbank: Bewiesen wird, was dastand. */
export async function anmelden(db: Client, d: Anmeldung): Promise<Stand> {
  const email = d.email.trim().toLowerCase();
  await db.batch(
    [
      ...SCHEMA,
      // Die Liste zeigt in Sabala Mail den Satz, der gerade am Häkchen steht. Ein älterer Stand der Seite dreht ihn nicht zurück.
      {
        sql: `INSERT INTO nl_listen (marke, schluessel, name, beschreibung, einwilligungstext, einwilligung_version) VALUES (?, ?, ?, ?, ?, ?)
              ON CONFLICT(schluessel) DO UPDATE SET einwilligungstext = excluded.einwilligungstext, einwilligung_version = excluded.einwilligung_version
              WHERE nl_listen.einwilligung_version < excluded.einwilligung_version`,
        args: [LISTE.marke, LISTE.schluessel, LISTE.name, LISTE.beschreibung, d.text, d.version],
      },
      {
        sql: `INSERT INTO nl_kontakte (email, vorname, nachname) VALUES (?, ?, ?)
              ON CONFLICT(email) DO UPDATE SET vorname = CASE WHEN excluded.vorname = '' THEN vorname ELSE excluded.vorname END,
                nachname = CASE WHEN excluded.nachname = '' THEN nachname ELSE excluded.nachname END, geaendert_am = datetime('now')`,
        args: [email, d.vorname, d.nachname],
      },
    ],
    "write",
  );
  const liste = (await eine<{ id: number }>(db, "SELECT id FROM nl_listen WHERE schluessel = ?", [LISTE.schluessel]))!;
  const k = (await eine<{ id: number }>(db, "SELECT id FROM nl_kontakte WHERE email = ?", [email]))!;
  await db.execute({ sql: "INSERT OR IGNORE INTO nl_merkmale (kontakt_id, merkmal) VALUES (?, ?)", args: [k.id, d.quelle] });

  // mail_s: Sekunden seit der letzten wirklich verschickten Bestätigungsmail. Scheitert der Versand, gibt es keinen Vermerk, und der nächste Versuch schickt wieder.
  const alt = await eine<{ id: number; status: string; token: string; mail_s: number | null }>(
    db,
    `SELECT e.id, e.status, e.token, (julianday('now') - julianday((SELECT max(am) FROM nl_ereignisse WHERE einwilligung_id = e.id AND art = 'mail'))) * 86400 AS mail_s
     FROM nl_einwilligungen e WHERE e.kontakt_id = ? AND e.liste_id = ?`,
    [k.id, liste.id],
  );
  if (alt?.status === "aktiv") return { id: alt.id, status: "aktiv", token: alt.token, senden: false };
  // Schutz für fremde Postfächer: Wer eine Adresse zehnmal einträgt, löst trotzdem nur eine Mail aus.
  if (alt?.status === "ausstehend" && alt.mail_s !== null && alt.mail_s < WARTEN_SEKUNDEN) return { id: alt.id, status: "ausstehend", token: alt.token, senden: false };

  const t = token();
  let id = alt?.id ?? 0;
  if (alt) {
    // Nie bestätigt oder abgemeldet: neue Anmeldung, neuer Beweis, neuer Token.
    await db.batch(
      [
        {
          sql: `UPDATE nl_einwilligungen SET status = 'ausstehend', quelle = ?, einwilligungstext = ?, einwilligung_version = ?, angemeldet_am = datetime('now'), angemeldet_ip = ?,
                bestaetigt_am = NULL, bestaetigt_ip = NULL, abgemeldet_am = NULL, abgemeldet_grund = NULL, token = ? WHERE id = ?`,
          args: [d.quelle, d.text, d.version, d.ip, t, alt.id],
        },
        { sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, ip, notiz) VALUES (?, 'angemeldet', ?, ?)", args: [alt.id, d.ip, `erneut über ${d.quelle}`] },
      ],
      "write",
    );
  } else {
    const neu = await db.execute({
      sql: "INSERT INTO nl_einwilligungen (kontakt_id, liste_id, quelle, einwilligungstext, einwilligung_version, angemeldet_ip, token) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [k.id, liste.id, d.quelle, d.text, d.version, d.ip, t],
    });
    id = Number(neu.lastInsertRowid);
    await db.execute({ sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, ip, notiz) VALUES (?, 'angemeldet', ?, ?)", args: [id, d.ip, `über ${d.quelle}`] });
  }
  return { id, status: "ausstehend", token: t, senden: true };
}

/** Schritt 2. Nur „ausstehend“ wird „aktiv“. neu sagt, ob genau dieser Klick bestätigt hat: Dann darf danach einmal etwas passieren. */
export async function bestaetigen(db: Client, tok: string, ip: string): Promise<Bestaetigt | null> {
  const e = await eine<{ id: number; status: string; quelle: string; email: string; vorname: string; nachname: string }>(
    db,
    "SELECT e.id, e.status, e.quelle, k.email, k.vorname, k.nachname FROM nl_einwilligungen e JOIN nl_kontakte k ON k.id = e.kontakt_id WHERE e.token = ?",
    [tok],
  );
  if (!e) return null;
  let neu = false;
  if (e.status === "ausstehend") {
    // Die Bedingung im UPDATE entscheidet, wer zuerst war, wenn zwei Klicks gleichzeitig kommen (Mensch und Mail-Scanner).
    const r = await db.execute({ sql: "UPDATE nl_einwilligungen SET status = 'aktiv', bestaetigt_am = datetime('now'), bestaetigt_ip = ? WHERE id = ? AND status = 'ausstehend'", args: [ip, e.id] });
    neu = r.rowsAffected === 1;
    if (neu) await db.execute({ sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, ip) VALUES (?, 'bestaetigt', ?)", args: [e.id, ip] });
  } else if (e.status !== "aktiv") {
    return null; // abgemeldet oder gesperrt: Der alte Link meldet niemanden wieder an
  }
  return { email: e.email, vorname: e.vorname, nachname: e.nachname, quelle: e.quelle, einwilligung_id: e.id, neu };
}

/** Hält fest, was sonst geschah: „mail“ = Bestätigungsmail ist raus (davon hängt die Wartezeit ab), „werkzeug“ = Eintrag ins Newsletter-Werkzeug nach dem Klick. */
export async function vermerken(db: Client, einwilligung_id: number, art: "mail" | "werkzeug", notiz = ""): Promise<void> {
  await db.execute({ sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, notiz) VALUES (?, ?, ?)", args: [einwilligung_id, art, notiz] });
}
