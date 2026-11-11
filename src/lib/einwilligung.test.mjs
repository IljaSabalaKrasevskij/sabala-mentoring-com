import test from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@libsql/client";
import { anmelden, bestaetigen, vermerken, WARTEN_SEKUNDEN } from "./einwilligung.ts";

// Läuft gegen eine Datenbank im Speicher. Kein Netz, keine Mail, kein echter Kontakt.
const frisch = () => createClient({ url: ":memory:" });
const anna = { email: " Anna@Example.com ", vorname: "Anna", nachname: "Beispiel", quelle: "Akademie-Newsletter", ip: "203.0.113.7", text: "Ja, Text Fassung 2.", version: 2 };
const zeile = async (db) => (await db.execute("SELECT e.*, k.email FROM nl_einwilligungen e JOIN nl_kontakte k ON k.id = e.kontakt_id")).rows[0];

test("Anmelden speichert den Nachweis: Wortlaut, Version, Zeit, IP, Status ausstehend", async () => {
  const db = frisch();
  const s = await anmelden(db, anna);
  assert.deepEqual({ status: s.status, senden: s.senden }, { status: "ausstehend", senden: true });
  const e = await zeile(db);
  assert.equal(e.email, "anna@example.com", "Adresse klein und ohne Leerzeichen");
  assert.equal(e.einwilligungstext, "Ja, Text Fassung 2.");
  assert.equal(e.einwilligung_version, 2);
  assert.equal(e.angemeldet_ip, "203.0.113.7");
  assert.match(e.angemeldet_am, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  assert.equal(e.bestaetigt_am, null, "ohne Klick keine Bestätigung");
  assert.ok(s.token.length >= 32);
});

test("Erst der Klick macht aktiv, und nur der erste Klick zählt als neu", async () => {
  const db = frisch();
  const { token } = await anmelden(db, anna);
  const erster = await bestaetigen(db, token, "198.51.100.9");
  assert.deepEqual({ email: erster.email, quelle: erster.quelle, neu: erster.neu }, { email: "anna@example.com", quelle: "Akademie-Newsletter", neu: true });
  const e = await zeile(db);
  assert.equal(e.status, "aktiv");
  assert.equal(e.bestaetigt_ip, "198.51.100.9");
  assert.ok(e.bestaetigt_am);
  const zweiter = await bestaetigen(db, token, "198.51.100.10");
  assert.equal(zweiter.neu, false, "zweiter Klick löst nichts mehr aus");
  assert.equal((await zeile(db)).bestaetigt_ip, "198.51.100.9", "der Nachweis des ersten Klicks bleibt");
  assert.equal(await bestaetigen(db, "gibt-es-nicht", "198.51.100.9"), null);
});

test("Bestätigter Kontakt und ein weiteres Formular: Ohne Klick ändert sich nichts an ihm, mit Klick gilt der Wunsch", async () => {
  const db = frisch();
  const { token } = await anmelden(db, anna);
  await bestaetigen(db, token, "198.51.100.9");
  // Irgendwer trägt Annas Adresse mit fremdem Namen in ein anderes Formular ein
  const wunsch = await anmelden(db, { ...anna, vorname: "Fremder", nachname: "http://boese.example", quelle: "Mooni Voice" });
  assert.deepEqual({ status: wunsch.status, senden: wunsch.senden }, { status: "aktiv", senden: true });
  assert.notEqual(wunsch.token, token, "eigener Link für den Wunsch");
  const name = async () => (await db.execute("SELECT vorname, nachname FROM nl_kontakte")).rows[0];
  const merkmale = async () => (await db.execute("SELECT merkmal FROM nl_merkmale ORDER BY merkmal")).rows.map((z) => z.merkmal);
  assert.deepEqual({ ...(await name()) }, { vorname: "Anna", nachname: "Beispiel" }, "der Name eines bestätigten Kontakts bleibt");
  assert.deepEqual(await merkmale(), ["Akademie-Newsletter"], "ohne Klick kein neues Merkmal");
  assert.equal((await zeile(db)).status, "aktiv", "die Einwilligung bleibt bestehen");

  const klick = await bestaetigen(db, wunsch.token, "198.51.100.11");
  assert.deepEqual({ quelle: klick.quelle, vorname: klick.vorname, nachname: klick.nachname, neu: klick.neu }, { quelle: "Mooni Voice", vorname: "Anna", nachname: "Beispiel", neu: true }, "es gelten die gespeicherten Namen");
  assert.deepEqual(await merkmale(), ["Akademie-Newsletter", "Mooni Voice"]);
  assert.equal((await bestaetigen(db, wunsch.token, "198.51.100.11")).neu, false, "der Wunsch gilt nur einmal");
});

test("Auch an bestätigte Adressen geht in der Wartezeit nur eine Mail", async () => {
  const db = frisch();
  const erste = await anmelden(db, anna);
  await bestaetigen(db, erste.token, "198.51.100.9");
  const wunsch = await anmelden(db, { ...anna, quelle: "Warteliste Kurs" });
  await vermerken(db, wunsch.id, "mail");
  const gleich = await anmelden(db, { ...anna, quelle: "Mooni Voice" });
  assert.deepEqual({ senden: gleich.senden, token: gleich.token }, { senden: false, token: "" });
  assert.equal((await db.execute("SELECT count(*) AS n FROM nl_wuensche")).rows[0].n, 1, "kein zweiter Wunsch ohne Mail");
});

test("Vor dem Klick gibt es kein Merkmal, und ein neuer Versuch darf den Namen noch ändern", async () => {
  const db = frisch();
  await anmelden(db, { ...anna, vorname: "Ana" });
  assert.equal((await db.execute("SELECT count(*) AS n FROM nl_merkmale")).rows[0].n, 0);
  await anmelden(db, anna); // kein Vermerk „mail“, also darf sofort neu angemeldet werden
  assert.equal((await db.execute("SELECT vorname FROM nl_kontakte")).rows[0].vorname, "Anna");
});

test("Zehnmal dieselbe Adresse eintragen löst nur eine Mail aus, nach der Wartezeit wieder eine", async () => {
  const db = frisch();
  const erste = await anmelden(db, anna);
  await vermerken(db, erste.id, "mail");
  const gleich = await anmelden(db, anna);
  assert.equal(gleich.senden, false);
  assert.equal(gleich.token, erste.token, "der Link aus der ersten Mail gilt weiter");
  await db.execute({ sql: "UPDATE nl_ereignisse SET am = datetime('now', ?) WHERE art = 'mail'", args: [`-${WARTEN_SEKUNDEN + 5} seconds`] });
  const spaeter = await anmelden(db, anna);
  assert.equal(spaeter.senden, true);
  assert.notEqual(spaeter.token, erste.token, "neue Anmeldung, neuer Link");
  assert.equal(await bestaetigen(db, erste.token, "198.51.100.9"), null, "der alte Link gilt nicht mehr");
});

test("Scheitert der Versand, schickt der nächste Versuch wieder", async () => {
  const db = frisch();
  const erste = await anmelden(db, anna); // kein Vermerk „mail“: Der Versand ist gescheitert
  const zweite = await anmelden(db, anna);
  assert.equal(zweite.senden, true);
  assert.equal(zweite.id, erste.id, "dieselbe Einwilligung, kein zweiter Eintrag");
});

test("Nach einer Abmeldung meldet der alte Link niemanden wieder an, ein neues Formular schon", async () => {
  const db = frisch();
  const { token } = await anmelden(db, anna);
  await bestaetigen(db, token, "198.51.100.9");
  await db.execute("UPDATE nl_einwilligungen SET status = 'abgemeldet', abgemeldet_am = datetime('now')");
  assert.equal(await bestaetigen(db, token, "198.51.100.9"), null);
  const neu = await anmelden(db, anna);
  assert.deepEqual({ status: neu.status, senden: neu.senden }, { status: "ausstehend", senden: true });
  const e = await zeile(db);
  assert.equal(e.bestaetigt_am, null, "neuer Beweis beginnt leer");
  assert.equal(e.abgemeldet_am, null);
});

test("Die Liste zeigt den neuesten Wortlaut, ein älterer Stand der Seite dreht ihn nicht zurück", async () => {
  const db = frisch();
  await anmelden(db, anna);
  await anmelden(db, { ...anna, email: "ben@example.com", text: "Alter Text.", version: 1 });
  const liste = (await db.execute("SELECT einwilligungstext, einwilligung_version FROM nl_listen")).rows;
  assert.equal(liste.length, 1);
  assert.equal(liste[0].einwilligung_version, 2);
  const ben = (await db.execute("SELECT e.einwilligungstext FROM nl_einwilligungen e JOIN nl_kontakte k ON k.id = e.kontakt_id WHERE k.email = 'ben@example.com'")).rows[0];
  assert.equal(ben.einwilligungstext, "Alter Text.", "bewiesen wird, was derjenige gesehen hat");
});
