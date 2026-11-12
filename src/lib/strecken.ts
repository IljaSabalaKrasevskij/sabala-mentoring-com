import type { Client, InValue } from "@libsql/client";
import { randomBytes } from "node:crypto";

/* ──────────────────────────────────────────────────────────────────────────
   Strecken: Mail-Folgen, die von selbst laufen (Willkommen, Warteliste, Webinar).

   Eine Strecke startet mit einem Merkmal, dem Auslöser. Merkmale setzt die Webseite erst nach dem Klick in der
   Bestätigungsmail (einwilligung.ts): das Formular, über das jemand Ja gesagt hat („Warteliste Webseiten-Kurs“),
   den Leadmagneten („startpaket-claude-code“) und die Nische („Nische: Second Brain“). So ist jede Liste
   „hat über dieses Formular Ja gesagt“, rechtlich bleibt es eine Einwilligung: der Sabala Newsletter.
   Danach gehen die Schritte der Reihe nach raus, jeder mit Wartezeit nach dem vorigen oder zu einem festen
   Zeitpunkt (Webinar). Ein verpasster fester Zeitpunkt wird übersprungen, nie nachgeholt.

   Regeln:
   - Status der Strecke: aus (nichts passiert), test (läuft echt, aber jede Mail geht ins Test-Postfach), an.
   - Los läuft nur, wer das Merkmal NACH dem Einschalten bekommt (seit = Wechsel weg von „aus“). Alte Kontakte bekommen
     keine Willkommens-Strecke. Von test auf an fallen die Testläufe weg: Wer im Test kam, läuft dann echt los.
     Pause ohne Verlust: auf test stellen. Auf aus stellen heißt: Wer in der Pause kommt, läuft nie los.
   - Jeder läuft eine Strecke höchstens einmal.
   - Vor jeder Mail: Einwilligung noch aktiv? Stopp-Merkmal da (Kauf)? Bei ActiveCampaign abgemeldet? Dann ist Schluss.
   - Eine Mail geht höchstens einmal raus: Der Schritt wird erst genommen (UPDATE mit Bedingung), dann verschickt.
     Scheitert der Versand, wird er zurückgegeben und eine Stunde später neu versucht. Nach dem dritten Fehler ist Schluss.
   - Was passiert, steht in nl_ereignisse. Sabala Mail zeigt es am Kontakt.

   Ohne App-Importe, damit strecken.test.mjs die Datei direkt mit Node laden kann. Versand und Rückfrage bei
   ActiveCampaign werden hineingereicht (takt), im Test sind es Attrappen.
   ────────────────────────────────────────────────────────────────────────── */

/** Dieselbe Liste wie LISTE.schluessel in einwilligung.ts: der Sabala Newsletter, dazu sagen alle Formulare Ja. */
const LISTE = "sabala-newsletter";

/** Mails je Takt (alle fünf Minuten), also höchstens 120 in der Stunde.
 *  ponytail: feste Zahl fürs eigene Postfach. Für große Listen kommt ein Versanddienst (geplant: Amazon SES), dann hochsetzen. */
export const JE_TAKT = 10;
/** Nach so vielen gescheiterten Versuchen hört eine Strecke für diesen Kontakt auf. */
const VERSUCHE = 3;

export const SCHEMA_STRECKEN = [
  `CREATE TABLE IF NOT EXISTS nl_strecken (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    schluessel TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    ausloeser TEXT NOT NULL,
    stopp_merkmal TEXT,
    status TEXT NOT NULL DEFAULT 'aus' CHECK (status IN ('aus','test','an')),
    seit TEXT NOT NULL DEFAULT (datetime('now')),
    erstellt_am TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  // warten_minuten: nach dem vorigen Schritt, beim ersten nach dem Merkmal. am: fester Zeitpunkt in UTC, dann zählt warten nicht.
  `CREATE TABLE IF NOT EXISTS nl_schritte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    strecke_id INTEGER NOT NULL REFERENCES nl_strecken(id) ON DELETE CASCADE,
    nr INTEGER NOT NULL,
    warten_minuten INTEGER NOT NULL DEFAULT 0,
    am TEXT,
    betreff TEXT NOT NULL,
    vorschau TEXT NOT NULL DEFAULT '',
    inhalt TEXT NOT NULL,
    UNIQUE (strecke_id, nr)
  )`,
  // schritt: nr des nächsten Schritts. test: im Testmodus gestartet, geht immer ins Test-Postfach.
  `CREATE TABLE IF NOT EXISTS nl_laeufe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    strecke_id INTEGER NOT NULL REFERENCES nl_strecken(id) ON DELETE CASCADE,
    kontakt_id INTEGER NOT NULL REFERENCES nl_kontakte(id) ON DELETE CASCADE,
    schritt INTEGER NOT NULL,
    faellig_am TEXT,
    status TEXT NOT NULL DEFAULT 'laeuft' CHECK (status IN ('laeuft','fertig','gestoppt','abgemeldet')),
    test INTEGER NOT NULL DEFAULT 0,
    fehler INTEGER NOT NULL DEFAULT 0,
    grund TEXT NOT NULL DEFAULT '',
    gestartet_am TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (strecke_id, kontakt_id)
  )`,
  `CREATE INDEX IF NOT EXISTS nl_laeufe_faellig ON nl_laeufe (status, faellig_am)`,
  // Ein fester Abmelde-Link je Einwilligung. Der Token der Bestätigung wechselt bei jeder neuen Anmeldung, dieser nie:
  // Auch der Link in einer alten Mail meldet noch ab.
  `CREATE TABLE IF NOT EXISTS nl_abmelden (
    token TEXT PRIMARY KEY,
    einwilligung_id INTEGER NOT NULL UNIQUE REFERENCES nl_einwilligungen(id) ON DELETE CASCADE,
    erstellt_am TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
];

/** Was der Takt verschickt. an: wohin die Mail geht (im Test das Test-Postfach), fuer: der Kontakt. abmelden: Token, im Test null. */
export type StreckenMail = { an: string; fuer: string; vorname: string; betreff: string; vorschau: string; inhalt: string; abmelden: string | null; test: boolean };
/** Stand einer Adresse bei ActiveCampaign, solange es parallel läuft. */
export type AcStand = "aktiv" | "abgemeldet" | "unbekannt" | "fehler";
export type Ergebnis = { eingetragen: number; gesendet: number; gestoppt: number; uebersprungen: number; fehler: number };

type Schritt = { nr: number; warten_minuten: number; am: string | null; betreff: string; vorschau: string; inhalt: string };
type Lauf = {
  id: number; strecke_id: number; kontakt_id: number; schritt: number; test: number; strecke: string; stopp_merkmal: string | null;
  email: string; vorname: string; einwilligung_id: number | null; einwilligung: string | null; stopp: number;
};

const alle = async <T>(db: Client, sql: string, args: InValue[] = []) => (await db.execute({ sql, args })).rows as unknown as T[];
const eine = async <T>(db: Client, sql: string, args: InValue[] = []) => (await alle<T>(db, sql, args))[0];

/** Zeit wie SQLite sie schreibt: UTC, „2026-11-12 14:30:00“. So lassen sich Zeiten als Text vergleichen. */
const zeit = (d: Date) => d.toISOString().replace("T", " ").slice(0, 19);
/** Ein ungültiger Zeitpunkt (Tippfehler im Cockpit) liegt vor allem anderen: Er gilt als verpasst und wird übersprungen, statt den Takt anzuhalten. */
const UNGUELTIG = "0000-00-00 00:00:00";
/** Liest auch „2026-12-01T18:00:00Z“ oder „…+01:00“. Ohne Zone gilt UTC, wie in SQLite. */
const utc = (s: string) => {
  const t = Date.parse(/[zZ]$|[+-]\d\d:?\d\d$/.test(s) ? s : `${s.trim().replace(" ", "T")}Z`);
  return Number.isNaN(t) ? UNGUELTIG : zeit(new Date(t));
};
const plus = (t: string, minuten: number) => zeit(new Date(Date.parse(`${t.replace(" ", "T")}Z`) + minuten * 60_000));

const fertig = new WeakMap<Client, Promise<unknown>>();
/** Legt die Tabellen der Strecken an, falls sie fehlen. Die Tabellen der Einwilligung legt einwilligung.ts an. */
export function streckenVorbereiten(db: Client): Promise<unknown> {
  let p = fertig.get(db);
  if (!p) {
    p = db.batch(SCHEMA_STRECKEN, "write").catch((err) => { fertig.delete(db); throw err; });
    fertig.set(db, p);
  }
  return p;
}

/** Ein Merkmal am Kontakt, etwa „Nische: Second Brain“ oder „Kauf: Webseiten-Kurs“. Steht es schon, bleibt das alte Datum: Eine Strecke startet nur einmal. */
export async function merkmalSetzen(db: Client, email: string, merkmal: string): Promise<void> {
  await db.execute({ sql: "INSERT OR IGNORE INTO nl_merkmale (kontakt_id, merkmal) SELECT id, ? FROM nl_kontakte WHERE email = ?", args: [merkmal, email.trim().toLowerCase()] });
}

/** Status einer Strecke umstellen. Kommt sie von „aus“, wird seit jetzt: Wer das Auslöser-Merkmal vorher bekam, läuft nicht los.
 *  Auf „an“ fallen die Testläufe weg: Wer im Test kam, läuft beim nächsten Takt echt los. (CASE liest den alten Status.) */
export async function streckeSchalten(db: Client, schluessel: string, status: "aus" | "test" | "an", jetzt = new Date()): Promise<boolean> {
  await streckenVorbereiten(db);
  const r = await db.execute({
    sql: "UPDATE nl_strecken SET status = ?, seit = CASE WHEN status = 'aus' THEN ? ELSE seit END WHERE schluessel = ? AND status <> ?",
    args: [status, zeit(jetzt), schluessel, status],
  });
  if (r.rowsAffected !== 1) return false;
  if (status === "an") await db.execute({ sql: "DELETE FROM nl_laeufe WHERE test = 1 AND strecke_id = (SELECT id FROM nl_strecken WHERE schluessel = ?)", args: [schluessel] });
  return true;
}

/** Der feste Abmelde-Token einer Einwilligung. Wird beim ersten Mal angelegt und ändert sich danach nie. */
export async function abmeldeToken(db: Client, einwilligung_id: number): Promise<string> {
  await db.execute({ sql: "INSERT OR IGNORE INTO nl_abmelden (token, einwilligung_id) VALUES (?, ?)", args: [randomBytes(24).toString("base64url"), einwilligung_id] });
  return (await eine<{ token: string }>(db, "SELECT token FROM nl_abmelden WHERE einwilligung_id = ?", [einwilligung_id]))!.token;
}

/** Einwilligung beenden und laufende Strecken stoppen. Wie abmelden() in Sabala Mail (src/lib/newsletter/db.ts). true: Diese Abmeldung war neu. */
async function beenden(db: Client, einwilligung_id: number, ip: string, grund: string): Promise<boolean> {
  const r = await db.execute({
    sql: "UPDATE nl_einwilligungen SET status = 'abgemeldet', abgemeldet_am = datetime('now'), abgemeldet_grund = ? WHERE id = ? AND status IN ('ausstehend','aktiv')",
    args: [grund, einwilligung_id],
  });
  if (r.rowsAffected !== 1) return false;
  await db.batch(
    [
      { sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, ip, notiz) VALUES (?, 'abgemeldet', ?, ?)", args: [einwilligung_id, ip, grund] },
      {
        sql: "UPDATE nl_laeufe SET status = 'abgemeldet', grund = ?, faellig_am = NULL WHERE status = 'laeuft' AND kontakt_id = (SELECT kontakt_id FROM nl_einwilligungen WHERE id = ?)",
        args: [grund, einwilligung_id],
      },
    ],
    "write",
  );
  return true;
}

/** Klick auf „Jetzt abmelden“ oder Ein-Klick-Abmeldung im Mailprogramm. Gilt sofort. null: Token unbekannt.
 *  Die Adresse kommt zurück, damit die Abmeldung auch ActiveCampaign erreicht. Ein zweiter Klick ändert nichts mehr (neu: false). */
export async function abmelden(db: Client, token: string, ip: string, grund: string): Promise<{ email: string; einwilligung_id: number; neu: boolean } | null> {
  await streckenVorbereiten(db);
  const e = await eine<{ id: number; email: string }>(
    db,
    "SELECT e.id, k.email FROM nl_abmelden a JOIN nl_einwilligungen e ON e.id = a.einwilligung_id JOIN nl_kontakte k ON k.id = e.kontakt_id WHERE a.token = ?",
    [token],
  );
  if (!e) return null;
  return { email: e.email, einwilligung_id: e.id, neu: await beenden(db, e.id, ip, grund) };
}

/**
 * Ein Takt: neue Läufe eintragen, fällige Schritte verschicken. Vercel ruft ihn alle fünf Minuten auf (api/strecken/takt).
 * senden: verschickt eine Mail, wirft bei Fehlern. testAn: Test-Postfach. pruefen: Stand bei ActiveCampaign (fehlt: keine Rückfrage).
 */
export async function takt(
  db: Client,
  o: { senden: (m: StreckenMail) => Promise<void>; testAn: string; pruefen?: (email: string) => Promise<AcStand>; jetzt?: Date },
): Promise<Ergebnis> {
  await streckenVorbereiten(db);
  const jetzt = zeit(o.jetzt ?? new Date());
  const r: Ergebnis = { eingetragen: 0, gesendet: 0, gestoppt: 0, uebersprungen: 0, fehler: 0 };

  const cache = new Map<number, Schritt[]>();
  const schritteVon = async (id: number) => {
    if (!cache.has(id)) {
      const liste = await alle<Schritt>(db, "SELECT nr, warten_minuten, am, betreff, vorschau, inhalt FROM nl_schritte WHERE strecke_id = ? ORDER BY nr", [id]);
      cache.set(id, liste.map((s) => ({ ...s, am: s.am ? utc(s.am) : null })));
    }
    return cache.get(id)!;
  };
  const faellig = (s: Schritt, ab: string) => s.am ?? plus(ab, s.warten_minuten);

  // 1. Eintragen: Merkmal seit dem Umschalten, Einwilligung aktiv, noch kein Lauf.
  const neue = await alle<{ strecke_id: number; kontakt_id: number; gesetzt_am: string; test: number }>(
    db,
    `SELECT s.id AS strecke_id, m.kontakt_id, m.gesetzt_am, s.status = 'test' AS test
     FROM nl_strecken s JOIN nl_merkmale m ON m.merkmal = s.ausloeser AND m.gesetzt_am >= s.seit
     WHERE s.status IN ('test','an')
       AND NOT EXISTS (SELECT 1 FROM nl_laeufe l WHERE l.strecke_id = s.id AND l.kontakt_id = m.kontakt_id)
       AND EXISTS (SELECT 1 FROM nl_einwilligungen e JOIN nl_listen li ON li.id = e.liste_id WHERE e.kontakt_id = m.kontakt_id AND li.schluessel = ? AND e.status = 'aktiv')`,
    [LISTE],
  );
  for (const n of neue) {
    const erster = (await schritteVon(n.strecke_id))[0];
    if (!erster) continue; // Strecke ohne Mails: erst eintragen, wenn es etwas zu schicken gibt
    const ab = utc(n.gesetzt_am);
    const ins = await db.execute({
      sql: "INSERT OR IGNORE INTO nl_laeufe (strecke_id, kontakt_id, schritt, faellig_am, test, gestartet_am) VALUES (?, ?, ?, ?, ?, ?)",
      args: [n.strecke_id, n.kontakt_id, erster.nr, faellig(erster, ab === UNGUELTIG ? jetzt : ab), n.test, jetzt],
    });
    r.eingetragen += ins.rowsAffected;
  }

  // 2. Verschicken. Echte Läufe nur, wenn die Strecke an ist. Steht sie auf Test, warten sie.
  const laeufe = await alle<Lauf>(
    db,
    `SELECT l.id, l.strecke_id, l.kontakt_id, l.schritt, l.test, s.name AS strecke, s.stopp_merkmal, k.email, k.vorname,
            e.id AS einwilligung_id, e.status AS einwilligung,
            EXISTS (SELECT 1 FROM nl_merkmale mm WHERE mm.kontakt_id = l.kontakt_id AND mm.merkmal = s.stopp_merkmal) AS stopp
     FROM nl_laeufe l
     JOIN nl_strecken s ON s.id = l.strecke_id
     JOIN nl_kontakte k ON k.id = l.kontakt_id
     LEFT JOIN nl_einwilligungen e ON e.kontakt_id = l.kontakt_id AND e.liste_id = (SELECT id FROM nl_listen WHERE schluessel = ?)
     WHERE l.status = 'laeuft' AND l.faellig_am <= ? AND (s.status = 'an' OR (s.status = 'test' AND l.test = 1))
     ORDER BY l.faellig_am LIMIT ?`,
    [LISTE, jetzt, JE_TAKT * 5],
  );
  const bis = Date.now() + 40_000; // Zeitrahmen der Funktion: lieber im nächsten Takt weiter als mitten im Versand abbrechen

  for (const l of laeufe) {
    if (r.gesendet >= JE_TAKT || Date.now() > bis) break;
    const ereignis = (art: string, notiz: string) =>
      l.einwilligung_id ? db.execute({ sql: "INSERT INTO nl_ereignisse (einwilligung_id, art, notiz) VALUES (?, ?, ?)", args: [l.einwilligung_id, art, notiz] }) : null;
    const schliessen = (status: "gestoppt" | "abgemeldet", grund: string) =>
      db.execute({ sql: "UPDATE nl_laeufe SET status = ?, grund = ?, faellig_am = NULL WHERE id = ? AND status = 'laeuft'", args: [status, grund, l.id] });

    if (l.einwilligung !== "aktiv" || !l.einwilligung_id) {
      await schliessen("abgemeldet", "Einwilligung nicht aktiv");
      r.gestoppt++;
      continue;
    }
    if (l.stopp) {
      await schliessen("gestoppt", `Merkmal: ${l.stopp_merkmal}`);
      await ereignis("strecke-stopp", `${l.strecke}: Schluss, Merkmal „${l.stopp_merkmal}“`);
      r.gestoppt++;
      continue;
    }

    const liste = await schritteVon(l.strecke_id);
    const s = liste.find((x) => x.nr === l.schritt);
    const n = liste.find((x) => x.nr > l.schritt);
    const nach = { schritt: n?.nr ?? l.schritt, status: n ? "laeuft" : "fertig" };
    // Den Schritt nehmen. Nur wer die Zeile ändert, darf senden: Ein zweiter Takt zur selben Zeit geht leer aus.
    const nehmen = async () =>
      (
        await db.execute({
          sql: "UPDATE nl_laeufe SET schritt = ?, status = ?, faellig_am = ? WHERE id = ? AND schritt = ? AND status = 'laeuft'",
          args: [nach.schritt, nach.status, n ? faellig(n, jetzt) : null, l.id, l.schritt],
        })
      ).rowsAffected === 1;

    // Schritt gelöscht oder fester Termin verpasst (mehr als eine Stunde her): weiter zum nächsten, nichts nachholen.
    if (!s || (s.am && s.am < plus(jetzt, -60))) {
      if (await nehmen()) {
        if (s) await ereignis("strecke-uebersprungen", `${l.strecke}, Mail ${s.nr}: Termin verpasst`);
        r.uebersprungen++;
      }
      continue;
    }

    if (!l.test && o.pruefen) {
      const ac = await o.pruefen(l.email);
      if (ac === "fehler") {
        r.fehler++; // ActiveCampaign gestört: nicht raten, im nächsten Takt neu fragen
        continue;
      }
      if (ac === "abgemeldet") {
        // Nur diesen Lauf stoppen, die Einwilligung hier bleibt: Der Stand dort kann älter sein als das Ja hier.
        await schliessen("gestoppt", "in ActiveCampaign abgemeldet");
        await ereignis("strecke-stopp", `${l.strecke}: Schluss, in ActiveCampaign abgemeldet`);
        r.gestoppt++;
        continue;
      }
    }

    const token = l.test ? null : await abmeldeToken(db, l.einwilligung_id);
    if (!(await nehmen())) continue;
    try {
      await o.senden({ an: l.test ? o.testAn : l.email, fuer: l.email, vorname: l.vorname, betreff: s.betreff, vorschau: s.vorschau, inhalt: s.inhalt, abmelden: token, test: !!l.test });
    } catch (err) {
      // Zurückgeben: derselbe Schritt in einer Stunde. Beim dritten Fehler ist Schluss.
      await db.execute({
        sql: `UPDATE nl_laeufe SET schritt = ?, fehler = fehler + 1,
                status = CASE WHEN fehler + 1 >= ? THEN 'gestoppt' ELSE 'laeuft' END,
                grund = CASE WHEN fehler + 1 >= ? THEN 'Versand ${VERSUCHE}-mal gescheitert' ELSE grund END,
                faellig_am = CASE WHEN fehler + 1 >= ? THEN NULL ELSE ? END
              WHERE id = ? AND schritt = ? AND status = ?`,
        args: [l.schritt, VERSUCHE, VERSUCHE, VERSUCHE, plus(jetzt, 60), l.id, nach.schritt, nach.status],
      });
      await ereignis("strecke-fehler", `${l.strecke}, Mail ${s.nr}: ${String(err instanceof Error ? err.message : err).slice(0, 200)}`)?.catch(() => {});
      r.fehler++;
      break; // Streikt das Postfach, streikt es meist für alle. Der Rest kommt im nächsten Takt.
    }
    r.gesendet++;
    // Die Mail ist raus. Was jetzt scheitert, darf den Schritt nicht zurückgeben, sonst ginge sie ein zweites Mal raus.
    // fehler zählt Fehlversuche am Stück: Nach einem Erfolg beginnt die Zählung neu.
    await Promise.all([
      db.execute({ sql: "UPDATE nl_laeufe SET fehler = 0 WHERE id = ? AND fehler > 0", args: [l.id] }),
      ereignis(l.test ? "strecke-test" : "strecke", `${l.strecke}, Mail ${s.nr}: ${s.betreff}${l.test ? ` (Test, ging an ${o.testAn})` : ""}`),
    ]).catch((err) => console.error("[strecken] Protokoll nach dem Versand gescheitert:", err));
  }
  return r;
}
