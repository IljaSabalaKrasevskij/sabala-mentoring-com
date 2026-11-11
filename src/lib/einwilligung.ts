import type { Client, InValue } from "@libsql/client";
import { randomBytes } from "node:crypto";

/* ──────────────────────────────────────────────────────────────────────────
   Einwilligung in Mails, mit Nachweis und Double-Opt-in.

   Schritt 1 (anmelden): Formular mit Häkchen abgeschickt. Gespeichert wird der Wortlaut am Häkchen
   samt Version, die Zeit und die IP. Status „ausstehend“, dazu ein Token für den Link in der Mail.
   Schritt 2 (bestaetigen): Klick auf den Link. Erst jetzt ist die Einwilligung „aktiv“.

   Grundsatz: Was im Formular steht, hat irgendwer getippt. Erst der Klick im Postfach zeigt, dass es der Mensch
   hinter der Adresse war. Darum ändert ein Formular allein nie etwas an einem bestätigten Kontakt: nicht den Namen,
   nicht die Merkmale. Trägt sich ein bestätigter Kontakt über ein weiteres Formular ein (etwa die Warteliste),
   wird das als Wunsch gemerkt (nl_wuensche) und gilt ebenfalls erst nach dem Klick.

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
  // Ein bestätigter Kontakt hat ein weiteres Formular abgeschickt. Gilt erst, wenn er den Link dazu anklickt.
  `CREATE TABLE IF NOT EXISTS nl_wuensche (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    einwilligung_id INTEGER NOT NULL REFERENCES nl_einwilligungen(id) ON DELETE CASCADE,
    formular TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    erstellt_am TEXT NOT NULL DEFAULT (datetime('now')),
    erledigt_am TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS nl_merkmale (
    kontakt_id INTEGER NOT NULL REFERENCES nl_kontakte(id) ON DELETE CASCADE,
    merkmal TEXT NOT NULL,
    gesetzt_am TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (kontakt_id, merkmal)
  )`,
];

export type Anmeldung = { email: string; vorname: string; nachname: string; quelle: string; ip: string; text: string; version: number };
/** senden: Jetzt gehört eine Mail mit diesem Token raus. false, wenn an die Adresse eben erst eine ging. Nach dem Versand: vermerken(id, "mail"). */
export type Stand = { id: number; status: "ausstehend" | "aktiv"; token: string; senden: boolean };
export type Bestaetigt = { email: string; vorname: string; nachname: string; quelle: string; einwilligung_id: number; neu: boolean };

const eine = async <T>(db: Client, sql: string, args: InValue[] = []) => (await db.execute({ sql, args })).rows[0] as unknown as T | undefined;

/** Legt die Tabellen an, falls sie fehlen. Einmal je Verbindung, damit auch die Zählung vor der ersten Anmeldung etwas zum Zählen hat. */
const fertig = new WeakMap<Client, Promise<unknown>>();
export function vorbereiten(db: Client): Promise<unknown> {
  let p = fertig.get(db);
  if (!p) {
    p = db.batch(SCHEMA, "write").catch((err) => { fertig.delete(db); throw err; });
    fertig.set(db, p);
  }
  return p;
}

/**
 * Muster für die Zählung je Absender. Bei IPv6 zählt das Netz (die ersten vier Blöcke), sonst wechselt ein Angreifer einfach
 * die Adresse im eigenen Netz. Das gilt nur, wenn diese vier Blöcke ausgeschrieben sind: Bei verkürzter Schreibweise („::1“,
 * „2001:db8::1“) stehen vorn weniger Blöcke, dann zählt die Adresse selbst. Gespeichert wird immer die ganze IP.
 */
function netz(ip: string): string {
  const teile = ip.split(":");
  const kopf = teile.slice(0, 4);
  return teile.length > 4 && kopf.every((t) => t !== "") ? `${kopf.join(":")}:%` : ip;
}

/**
 * Was in der letzten Stunde los war: verschickte Bestätigungsmails über alle Adressen, und Anmeldungen aus dem Netz dieser IP.
 * Davon hängen die zwei Obergrenzen ab. Gezählt wird in der Datenbank, weil der Zähler im Speicher je Server-Instanz neu beginnt.
 */
export async function lastDerStunde(db: Client, ip: string): Promise<{ mails: number; ausNetz: number }> {
  await vorbereiten(db);
  const z = await eine<{ mails: number; aus_netz: number }>(
    db,
    `SELECT (SELECT count(*) FROM nl_ereignisse WHERE art = 'mail' AND am > datetime('now', '-1 hour')) AS mails,
            (SELECT count(*) FROM nl_ereignisse WHERE art IN ('angemeldet', 'wunsch') AND ip LIKE ? AND am > datetime('now', '-1 hour')) AS aus_netz`,
    [netz(ip)],
  );
  return { mails: Number(z?.mails ?? 0), ausNetz: Number(z?.aus_netz ?? 0) };
}
const token = () => randomBytes(24).toString("base64url"); // 192 Bit Zufall, nicht erratbar

/** Schritt 1. Legt Kontakt und Einwilligung an oder frischt sie auf. Der Wortlaut kommt vom Formular, nicht aus der Datenbank: Bewiesen wird, was dastand. */
export async function anmelden(db: Client, d: Anmeldung): Promise<Stand> {
  const email = d.email.trim().toLowerCase();
  await vorbereiten(db);
  await db.batch(
    [
      // Die Liste zeigt in Sabala Mail den Satz, der gerade am Häkchen steht. Ein älterer Stand der Seite dreht ihn nicht zurück.
      {
        sql: `INSERT INTO nl_listen (marke, schluessel, name, beschreibung, einwilligungstext, einwilligung_version) VALUES (?, ?, ?, ?, ?, ?)
              ON CONFLICT(schluessel) DO UPDATE SET einwilligungstext = excluded.einwilligungstext, einwilligung_version = excluded.einwilligung_version
              WHERE nl_listen.einwilligung_version < excluded.einwilligung_version`,
        args: [LISTE.marke, LISTE.schluessel, LISTE.name, LISTE.beschreibung, d.text, d.version],
      },
      { sql: "INSERT INTO nl_kontakte (email, vorname, nachname) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING", args: [email, d.vorname, d.nachname] },
    ],
    "write",
  );
  const liste = (await eine<{ id: number }>(db, "SELECT id FROM nl_listen WHERE schluessel = ?", [LISTE.schluessel]))!;
  const k = (await eine<{ id: number }>(db, "SELECT id FROM nl_kontakte WHERE email = ?", [email]))!;

  // mail_s: Sekunden seit der letzten wirklich verschickten Mail an diese Adresse. Scheitert der Versand, gibt es keinen Vermerk, und der nächste Versuch schickt wieder.
  const alt = await eine<{ id: number; status: string; token: string; mail_s: number | null }>(
    db,
    `SELECT e.id, e.status, e.token, (julianday('now') - julianday((SELECT max(am) FROM nl_ereignisse WHERE einwilligung_id = e.id AND art = 'mail'))) * 86400 AS mail_s
     FROM nl_einwilligungen e WHERE e.kontakt_id = ? AND e.liste_id = ?`,
    [k.id, liste.id],
  );
  // Schutz für fremde Postfächer: Wer eine Adresse zehnmal einträgt, löst trotzdem nur eine Mail aus. Gilt in jedem Zustand.
  const ebenGeschickt = !!alt && alt.mail_s !== null && alt.mail_s < WARTEN_SEKUNDEN;

  if (alt?.status === "aktiv") {
    // Bestätigter Kontakt: nichts an ihm ändern. Nur den Wunsch merken, der Klick entscheidet.
    if (ebenGeschickt) return { id: alt.id, status: "aktiv", token: "", senden: false };
    // Ein offener Wunsch für dasselbe Formular wird wiederverwendet: je Kontakt höchstens eine offene Zeile je Formular, egal wie oft jemand abschickt.
    const offen = await eine<{ token: string }>(db, "SELECT token FROM nl_wuensche WHERE einwilligung_id = ? AND formular = ? AND erledigt_am IS NULL ORDER BY id DESC LIMIT 1", [alt.id, d.quelle]);
    const t = offen?.token ?? token();
    if (!offen) await db.execute({ sql: "INSERT INTO nl_wuensche (einwilligung_id, formular, token) VALUES (?, ?, ?)", args: [alt.id, d.quelle, t] });
    // Mit IP vermerkt, damit auch Wünsche in die Obergrenze je Absender zählen
    await db.execute({ sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, ip, notiz) VALUES (?, 'wunsch', ?, ?)", args: [alt.id, d.ip, d.quelle] });
    return { id: alt.id, status: "aktiv", token: t, senden: true };
  }
  if (alt?.status === "ausstehend" && ebenGeschickt) return { id: alt.id, status: "ausstehend", token: alt.token, senden: false };

  // Noch nicht bestätigt: Der Name aus dem Formular darf den alten ersetzen, er wird mit dem Klick gültig.
  await db.execute({
    sql: "UPDATE nl_kontakte SET vorname = CASE WHEN ? = '' THEN vorname ELSE ? END, nachname = CASE WHEN ? = '' THEN nachname ELSE ? END, geaendert_am = datetime('now') WHERE id = ?",
    args: [d.vorname, d.vorname, d.nachname, d.nachname, k.id],
  });
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

/**
 * Schritt 2. Nur „ausstehend“ wird „aktiv“. neu sagt, ob genau dieser Klick etwas bestätigt hat: Dann darf danach einmal etwas passieren.
 * Namen und Formular kommen aus der Datenbank, nie aus der Anfrage. Kennt die Einwilligung den Token nicht, kann es der Wunsch eines bestätigten Kontakts sein.
 */
export async function bestaetigen(db: Client, tok: string, ip: string): Promise<Bestaetigt | null> {
  type Zeile = { id: number; kontakt_id: number; status: string; quelle: string; email: string; vorname: string; nachname: string };
  const merkmal = (kontakt_id: number, m: string) => db.execute({ sql: "INSERT OR IGNORE INTO nl_merkmale (kontakt_id, merkmal) VALUES (?, ?)", args: [kontakt_id, m] });
  const e = await eine<Zeile>(
    db,
    "SELECT e.id, e.kontakt_id, e.status, e.quelle, k.email, k.vorname, k.nachname FROM nl_einwilligungen e JOIN nl_kontakte k ON k.id = e.kontakt_id WHERE e.token = ?",
    [tok],
  );
  if (e) {
    let neu = false;
    if (e.status === "ausstehend") {
      // Die Bedingung im UPDATE entscheidet, wer zuerst war, wenn zwei Klicks gleichzeitig kommen (Mensch und Mail-Scanner).
      const r = await db.execute({ sql: "UPDATE nl_einwilligungen SET status = 'aktiv', bestaetigt_am = datetime('now'), bestaetigt_ip = ? WHERE id = ? AND status = 'ausstehend'", args: [ip, e.id] });
      neu = r.rowsAffected === 1;
      if (neu) {
        await db.execute({ sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, ip) VALUES (?, 'bestaetigt', ?)", args: [e.id, ip] });
        await merkmal(e.kontakt_id, e.quelle);
      }
    } else if (e.status !== "aktiv") {
      return null; // abgemeldet oder gesperrt: Der alte Link meldet niemanden wieder an
    }
    return { email: e.email, vorname: e.vorname, nachname: e.nachname, quelle: e.quelle, einwilligung_id: e.id, neu };
  }

  const w = await eine<Zeile & { wunsch: number; formular: string }>(
    db,
    `SELECT w.id AS wunsch, w.formular, e.id, e.kontakt_id, e.status, e.quelle, k.email, k.vorname, k.nachname
     FROM nl_wuensche w JOIN nl_einwilligungen e ON e.id = w.einwilligung_id JOIN nl_kontakte k ON k.id = e.kontakt_id WHERE w.token = ?`,
    [tok],
  );
  if (!w || w.status !== "aktiv") return null;
  const r = await db.execute({ sql: "UPDATE nl_wuensche SET erledigt_am = datetime('now') WHERE id = ? AND erledigt_am IS NULL", args: [w.wunsch] });
  const neu = r.rowsAffected === 1;
  if (neu) {
    await db.execute({ sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, ip, notiz) VALUES (?, 'bestaetigt', ?, ?)", args: [w.id, ip, `weiteres Formular: ${w.formular}`] });
    await merkmal(w.kontakt_id, w.formular);
  }
  return { email: w.email, vorname: w.vorname, nachname: w.nachname, quelle: w.formular, einwilligung_id: w.id, neu };
}

/** Hält fest, was sonst geschah: „mail“ = Bestätigungsmail ist raus (davon hängt die Wartezeit ab), „werkzeug“ = Eintrag ins Newsletter-Werkzeug nach dem Klick. */
export async function vermerken(db: Client, einwilligung_id: number, art: "mail" | "werkzeug", notiz = ""): Promise<void> {
  await db.execute({ sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, notiz) VALUES (?, ?, ?)", args: [einwilligung_id, art, notiz] });
}
