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

test("Wer schon bestätigt hat, bekommt keine zweite Mail", async () => {
  const db = frisch();
  const { token } = await anmelden(db, anna);
  await bestaetigen(db, token, "198.51.100.9");
  const wieder = await anmelden(db, { ...anna, quelle: "Mooni Voice" });
  assert.deepEqual({ status: wieder.status, senden: wieder.senden }, { status: "aktiv", senden: false });
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
