import test from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@libsql/client";
import { anmelden, bestaetigen } from "./einwilligung.ts";
import { abmelden, JE_TAKT, merkmalSetzen, streckenVorbereiten, streckeSchalten, takt } from "./strecken.ts";
import { streckenHtml, streckenText } from "./mail-html.ts";

// Läuft gegen eine Datenbank im Speicher. Kein Netz, keine Mail, kein echter Kontakt: Das Postfach und ActiveCampaign sind Attrappen.
const frisch = () => createClient({ url: ":memory:" });
const um = (minuten) => new Date(Date.UTC(2026, 10, 12, 10, 0) + minuten * 60_000); // 12.11.2026, 10:00 UTC
const TEST_AN = "test@sabala.example";

/** Ein Kontakt mit Einwilligung, bestätigt, Merkmal zu einer festen Zeit. */
async function kontakt(db, email, gesetzt = "2026-11-12 10:00:00", merkmal = "Warteliste Webseiten-Kurs") {
  const s = await anmelden(db, { email, vorname: "Anna", nachname: "Test", quelle: merkmal, ip: "203.0.113.7", text: "Ja, Text.", version: 2 });
  await bestaetigen(db, s.token, "203.0.113.7");
  await db.execute({ sql: "UPDATE nl_merkmale SET gesetzt_am = ? WHERE merkmal = ? AND kontakt_id = (SELECT id FROM nl_kontakte WHERE email = ?)", args: [gesetzt, merkmal, email] });
}

/** Die Strecke „probe“: Auslöser Warteliste Webseiten-Kurs, an seit 9 Uhr. */
async function strecke(db, { status = "an", seit = "2026-11-12 09:00:00", stopp = null, schritte = [{ warten: 0 }] } = {}) {
  await streckenVorbereiten(db);
  const s = await db.execute({
    sql: "INSERT INTO nl_strecken (schluessel, name, ausloeser, stopp_merkmal, status, seit) VALUES ('probe', 'Probe', 'Warteliste Webseiten-Kurs', ?, ?, ?)",
    args: [stopp, status, seit],
  });
  for (const [i, x] of schritte.entries()) {
    await db.execute({
      sql: "INSERT INTO nl_schritte (strecke_id, nr, warten_minuten, am, betreff, inhalt) VALUES (?, ?, ?, ?, ?, ?)",
      args: [Number(s.lastInsertRowid), i + 1, x.warten ?? 0, x.am ?? null, `Mail ${i + 1}`, `Hey {vorname}, hier ist Mail ${i + 1}.`],
    });
  }
}

const postfach = (streikt = false) => {
  const mails = [];
  return { mails, senden: async (m) => { if (streikt) throw new Error("Postfach streikt"); mails.push(m); } };
};
const t = (db, p, minuten, extra = {}) => takt(db, { senden: p.senden, testAn: TEST_AN, jetzt: um(minuten), ...extra });
const spalte = async (db, sql) => (await db.execute(sql)).rows;

test("Los läuft nur, wer das Merkmal nach dem Einschalten bekommt; aus heißt aus", async () => {
  const db = frisch();
  await kontakt(db, "alt@example.com", "2026-11-12 08:00:00");
  await kontakt(db, "neu@example.com");
  await strecke(db);
  const p = postfach();
  const r = await t(db, p, 1);
  assert.equal(r.eingetragen, 1);
  assert.deepEqual(p.mails.map((m) => m.an), ["neu@example.com"], "wer vor dem Einschalten kam, bekommt nichts");

  await streckeSchalten(db, "probe", "aus", um(2));
  await kontakt(db, "pause@example.com", "2026-11-12 10:30:00");
  await t(db, p, 60);
  await streckeSchalten(db, "probe", "an", um(90));
  await t(db, p, 120);
  assert.deepEqual(p.mails.map((m) => m.an), ["neu@example.com"], "wer in der Pause kam, läuft auch nach dem Einschalten nicht los");
});

test("Schritte kommen mit Abstand zur vorigen Mail, jeder genau einmal, danach ist die Strecke fertig", async () => {
  const db = frisch();
  await kontakt(db, "anna@example.com");
  await strecke(db, { schritte: [{ warten: 0 }, { warten: 2 * 24 * 60 }] });
  const p = postfach();
  await t(db, p, 5);
  await t(db, p, 6);
  await t(db, p, 5 + 2880 - 1);
  assert.equal(p.mails.length, 1, "Mail 2 erst zwei Tage nach Mail 1");
  await t(db, p, 5 + 2880);
  await t(db, p, 9000);
  assert.deepEqual(p.mails.map((m) => m.betreff), ["Mail 1", "Mail 2"]);
  assert.deepEqual({ vorname: p.mails[0].vorname, inhalt: p.mails[0].inhalt }, { vorname: "Anna", inhalt: "Hey {vorname}, hier ist Mail 1." });
  assert.equal(p.mails[1].abmelden, p.mails[0].abmelden, "jede Mail trägt denselben Abmelde-Link");
  const [l] = await spalte(db, "SELECT status, faellig_am FROM nl_laeufe");
  assert.deepEqual({ status: l.status, faellig: l.faellig_am }, { status: "fertig", faellig: null });
});

test("Kauf stoppt, Abmelden stoppt sofort, und der Abmelde-Link gilt auch nach einer neuen Anmeldung", async () => {
  const db = frisch();
  await kontakt(db, "kaeufer@example.com");
  await kontakt(db, "geher@example.com");
  await strecke(db, { stopp: "Kauf: Webseiten-Kurs", schritte: [{ warten: 0 }, { warten: 1440 }, { warten: 1440 }] });
  const p = postfach();
  await t(db, p, 1);
  assert.equal(p.mails.length, 2);
  const token = p.mails.find((m) => m.an === "geher@example.com").abmelden;
  assert.match(token, /^[A-Za-z0-9_-]{32}$/);

  await merkmalSetzen(db, " Kaeufer@Example.com", "Kauf: Webseiten-Kurs");
  const ab = await abmelden(db, token, "198.51.100.9", "Abmelde-Knopf auf der Webseite");
  assert.deepEqual({ email: ab.email, neu: ab.neu }, { email: "geher@example.com", neu: true });
  assert.equal((await abmelden(db, token, "198.51.100.9", "zweiter Klick")).neu, false, "ein zweiter Klick ändert nichts");
  assert.equal(await abmelden(db, "gibt-es-nicht-gibt-es-nicht", "", ""), null);

  await t(db, p, 3 * 1440);
  assert.equal(p.mails.length, 2, "nach Kauf und Abmeldung keine Mail mehr");
  const laeufe = Object.fromEntries((await spalte(db, "SELECT k.email, l.status FROM nl_laeufe l JOIN nl_kontakte k ON k.id = l.kontakt_id")).map((x) => [x.email, x.status]));
  assert.deepEqual(laeufe, { "kaeufer@example.com": "gestoppt", "geher@example.com": "abgemeldet" });
  const [e] = await spalte(db, "SELECT count(*) AS n FROM nl_ereignisse WHERE art = 'abgemeldet'");
  assert.equal(e.n, 1, "die Abmeldung steht im Protokoll");

  // Später neu angemeldet und bestätigt: Der Link aus der alten Mail meldet trotzdem ab.
  const neu = await anmelden(db, { email: "geher@example.com", vorname: "Gerd", nachname: "Test", quelle: "Akademie-Newsletter", ip: "203.0.113.7", text: "Ja.", version: 2 });
  await bestaetigen(db, neu.token, "203.0.113.7");
  assert.equal((await abmelden(db, token, "", "alter Link")).neu, true);
});

test("Testmodus: Mails gehen nur ins Test-Postfach, ohne echten Abmelde-Link; echte Läufe warten so lange", async () => {
  const db = frisch();
  const gefragt = [];
  const pruefen = async (email) => { gefragt.push(email); return "aktiv"; };
  await kontakt(db, "echt@example.com");
  await strecke(db, { status: "test", schritte: [{ warten: 0 }, { warten: 60 }] });
  const p = postfach();
  await t(db, p, 1, { pruefen });
  assert.deepEqual(p.mails.map((m) => ({ an: m.an, fuer: m.fuer, abmelden: m.abmelden, test: m.test })), [{ an: TEST_AN, fuer: "echt@example.com", abmelden: null, test: true }]);

  // Eingeschaltet: Die Testläufe fallen weg. Wer im Test kam, bekommt die Strecke jetzt echt, dazu wer neu kommt.
  await streckeSchalten(db, "probe", "an", um(2));
  await kontakt(db, "neu@example.com", "2026-11-12 10:03:00");
  await t(db, p, 5, { pruefen });
  assert.deepEqual(p.mails.slice(1).map((m) => [m.an, m.test]), [["echt@example.com", false], ["neu@example.com", false]]);

  // Zurück auf Test: Echte Läufe warten, wer jetzt kommt, läuft als Test.
  await streckeSchalten(db, "probe", "test", um(6));
  await kontakt(db, "spaet@example.com", "2026-11-12 10:10:00");
  await t(db, p, 70, { pruefen });
  assert.deepEqual(p.mails.slice(3).map((m) => [m.an, m.fuer]), [[TEST_AN, "spaet@example.com"]], "Mail 2 der echten Läufe wartet");
  assert.deepEqual(gefragt, ["echt@example.com", "neu@example.com"], "ActiveCampaign wird nur vor echten Mails gefragt");
  const arten = (await spalte(db, "SELECT art FROM nl_ereignisse WHERE art LIKE 'strecke%' ORDER BY id")).map((x) => x.art);
  assert.deepEqual(arten, ["strecke-test", "strecke", "strecke", "strecke-test"]);
});

test("Scheitert der Versand, kommt dieselbe Mail eine Stunde später, nach drei Fehlern ist Schluss; zwei Takte zugleich senden nie doppelt", async () => {
  const db = frisch();
  await kontakt(db, "anna@example.com");
  await strecke(db, { schritte: [{ warten: 0 }, { warten: 60 }] });
  const kaputt = postfach(true);
  await t(db, kaputt, 1);
  let [l] = await spalte(db, "SELECT schritt, status, fehler, faellig_am FROM nl_laeufe");
  assert.deepEqual({ ...l }, { schritt: 1, status: "laeuft", fehler: 1, faellig_am: "2026-11-12 11:01:00" });
  await t(db, kaputt, 30);
  await t(db, kaputt, 61);
  await t(db, kaputt, 121);
  [l] = await spalte(db, "SELECT status, fehler FROM nl_laeufe");
  assert.deepEqual({ ...l }, { status: "gestoppt", fehler: 3 });

  // Nach einem Erfolg zählt der nächste Fehler wieder von vorn
  const db1 = frisch();
  await kontakt(db1, "anna@example.com");
  await strecke(db1, { schritte: [{ warten: 0 }, { warten: 60 }] });
  await t(db1, postfach(true), 1);
  const heil = postfach();
  await t(db1, heil, 61);
  assert.equal(heil.mails.length, 1);
  [l] = await spalte(db1, "SELECT fehler, schritt FROM nl_laeufe");
  assert.deepEqual({ ...l }, { fehler: 0, schritt: 2 });

  // Mail raus, danach scheitert das Protokoll: Der Schritt bleibt genommen, die Mail geht nicht ein zweites Mal raus.
  const db3 = frisch();
  await kontakt(db3, "anna@example.com");
  await strecke(db3, { schritte: [{ warten: 0 }, { warten: 60 }] });
  const raus = [];
  const r3 = await t(db3, { senden: async (m) => { raus.push(m); await db3.execute("DROP TABLE nl_ereignisse"); } }, 1);
  assert.deepEqual({ gesendet: r3.gesendet, fehler: r3.fehler }, { gesendet: 1, fehler: 0 });
  [l] = await spalte(db3, "SELECT schritt, fehler FROM nl_laeufe");
  assert.deepEqual({ ...l }, { schritt: 2, fehler: 0 });

  const db2 = frisch();
  await kontakt(db2, "anna@example.com");
  await strecke(db2);
  const p = postfach();
  await Promise.all([t(db2, p, 1), t(db2, p, 1), t(db2, p, 1)]);
  assert.equal(p.mails.length, 1);
});

test("Höchstens zehn Mails je Takt; ein verpasster fester Termin wird übersprungen, nie nachgeholt", async () => {
  const db = frisch();
  for (let i = 0; i < 12; i++) await kontakt(db, `k${i}@example.com`);
  await strecke(db);
  const p = postfach();
  await t(db, p, 1);
  assert.equal(p.mails.length, JE_TAKT);
  await t(db, p, 6);
  assert.equal(p.mails.length, 12);

  const db2 = frisch();
  await kontakt(db2, "spaet@example.com");
  await strecke(db2, { schritte: [{ am: "2026-11-12T08:00:00Z" }, { warten: 0 }] }); // das Webinar war um 8 Uhr
  const q = postfach();
  await t(db2, q, 1);
  await t(db2, q, 6);
  assert.deepEqual(q.mails.map((m) => m.betreff), ["Mail 2"]);

  // Ein Tippfehler im Termin hält den Takt nicht an: Der Schritt gilt als verpasst.
  const db3 = frisch();
  await kontakt(db3, "tippfehler@example.com");
  await strecke(db3, { schritte: [{ am: "am Dienstag um acht" }, { warten: 0 }] });
  const z = postfach();
  await t(db3, z, 1);
  await t(db3, z, 6);
  assert.deepEqual(z.mails.map((m) => m.betreff), ["Mail 2"]);
});

test("Bei ActiveCampaign abgemeldet: keine Mail, der Lauf endet, die Einwilligung hier bleibt; bei Störung wird neu gefragt", async () => {
  const db = frisch();
  await kontakt(db, "ac-weg@example.com");
  await kontakt(db, "ac-stoerung@example.com");
  await strecke(db);
  const p = postfach();
  const r = await t(db, p, 1, { pruefen: async (email) => (email.startsWith("ac-weg") ? "abgemeldet" : "fehler") });
  assert.equal(p.mails.length, 0);
  assert.deepEqual({ gestoppt: r.gestoppt, fehler: r.fehler }, { gestoppt: 1, fehler: 1 });
  const zeilen = await spalte(db, "SELECT k.email, e.status AS einwilligung, l.status AS lauf, l.grund FROM nl_laeufe l JOIN nl_kontakte k ON k.id = l.kontakt_id JOIN nl_einwilligungen e ON e.kontakt_id = k.id ORDER BY k.email");
  assert.deepEqual(zeilen.map((x) => [x.email, x.einwilligung, x.lauf, x.grund]), [
    ["ac-stoerung@example.com", "aktiv", "laeuft", ""],
    ["ac-weg@example.com", "aktiv", "gestoppt", "in ActiveCampaign abgemeldet"],
  ]);
});

test("ActiveCampaign: nur „abgemeldet“ zählt, Abmelden nimmt die Adresse von jeder aktiven Liste", async () => {
  const { acAbmelden, acStand } = await import("./activecampaign.ts");
  const vorher = { fetch: globalThis.fetch, url: process.env.AC_API_URL, key: process.env.AC_API_KEY };
  process.env.AC_API_URL = "https://ac.example";
  process.env.AC_API_KEY = "probe";
  // Attrappe der Schnittstelle. Kontakt 7: aktiv und abgemeldet gemischt, 8: abgemeldet, 9: nur unzustellbar.
  const ids = { "a@example.com": "7", "b@example.com": "8", "c@example.com": "9" };
  const listen = { 7: [{ list: "1", status: "1" }, { list: "26", status: "1" }, { list: "4", status: "2" }], 8: [{ list: "1", status: "2" }], 9: [{ list: "1", status: "3" }] };
  const posts = [];
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url);
    if (init.method === "POST") { posts.push(JSON.parse(init.body).contactList); return Response.json({}); }
    if (u.pathname === "/api/3/contacts") { const id = ids[u.searchParams.get("email")]; return Response.json({ contacts: id ? [{ id }] : [] }); }
    return Response.json({ contactLists: listen[u.pathname.split("/")[4]] }); // /api/3/contacts/<id>/contactLists
  };
  try {
    assert.deepEqual(await Promise.all(["a", "b", "c", "x"].map((n) => acStand(`${n}@example.com`))), ["aktiv", "abgemeldet", "unbekannt", "unbekannt"]);
    assert.equal(await acAbmelden("a@example.com"), "ok");
    assert.deepEqual(posts, [{ list: 1, contact: 7, status: 2 }, { list: 26, contact: 7, status: 2 }], "nur aktive Listen, mit Status 2");
  } finally {
    globalThis.fetch = vorher.fetch;
    for (const [k, v] of [["AC_API_URL", vorher.url], ["AC_API_KEY", vorher.key]]) v === undefined ? delete process.env[k] : (process.env[k] = v);
  }
});

test("Strecken-Mail: Name maskiert, Links nur mit https, Knopf, Abmelde-Link im Fuß", () => {
  const m = {
    betreff: "Hallo",
    vorschau: "kurz",
    vorname: "<b>Max</b>",
    abmelden: "https://sabala-mentoring.com/newsletter/abmelden?t=abc",
    inhalt: "Hey {vorname},\nschön.\n\n**Wichtig:** [Kurs](https://sabala-mentoring.com/kurs?a=1&b=2) und [böse](javascript:alert(1))\n\n[Zum Kurs](https://sabala-mentoring.com/kurs)",
  };
  const html = streckenHtml(m);
  assert.ok(html.includes("Hey &lt;b&gt;Max&lt;/b&gt;,<br>schön."), "Name maskiert");
  assert.ok(html.includes("<strong>Wichtig:</strong>"));
  assert.ok(html.includes('href="https://sabala-mentoring.com/kurs?a=1&amp;b=2"'));
  assert.ok(!html.includes('href="javascript'), "nur https wird ein Link");
  assert.ok(/<a href="https:\/\/sabala-mentoring\.com\/kurs" style="display:inline-block[^>]*>Zum Kurs<\/a>/.test(html), "eigener Absatz mit Link wird ein Knopf");
  assert.ok(html.includes('href="https://sabala-mentoring.com/newsletter/abmelden?t=abc"'), "Abmelden im Fuß");
  const text = streckenText({ ...m, vorname: "" });
  assert.ok(text.startsWith("Hey du,\nschön."));
  assert.ok(streckenText({ ...m, vorname: "Ca$$h $'" }).startsWith("Hey Ca$$h $',"), "$-Zeichen im Namen bleiben, wie sie sind");
  assert.ok(streckenHtml({ ...m, vorname: "Ca$$h $'" }).includes("Hey Ca$$h $',"));
  assert.ok(text.includes("Kurs: https://sabala-mentoring.com/kurs?a=1&b=2"));
  assert.ok(text.includes("Abmelden mit einem Klick: https://sabala-mentoring.com/newsletter/abmelden?t=abc"));
});
