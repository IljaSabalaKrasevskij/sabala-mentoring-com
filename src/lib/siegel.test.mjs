import test from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@libsql/client";
import { GESAMT_JE_STUNDE, JE_ABSENDER_JE_STUNDE, MAX_ALTER_MS, MIN_ALTER_MS, siegelAusstellen, siegelEinloesen } from "./siegel.ts";

// Läuft gegen eine Datenbank im Speicher, die Uhr wird von Hand gestellt.
const frisch = () => createClient({ url: ":memory:" });
const KEY = "nur-fuer-den-test";
const T0 = 1_800_000_000_000;
const REIF = T0 + MIN_ALTER_MS;

test("Ein Stempel gilt erst nach drei Sekunden, genau einmal und höchstens zwei Stunden", async () => {
  const db = frisch();
  const s = siegelAusstellen(KEY, T0);
  assert.equal(await siegelEinloesen(db, KEY, s, "203.0.113.7", T0 + MIN_ALTER_MS - 1), "zu-frueh");
  assert.equal(await siegelEinloesen(db, KEY, s, "203.0.113.7", REIF), "ok", "zu früh abgelehnt heißt nicht verbraucht");
  assert.equal(await siegelEinloesen(db, KEY, s, "203.0.113.7", REIF + 10), "ungueltig", "zweites Mal");
  assert.equal(await siegelEinloesen(db, KEY, s, "198.51.100.9", REIF + 20), "ungueltig", "auch von woanders nicht noch einmal");
  const alt = siegelAusstellen(KEY, T0);
  assert.equal(await siegelEinloesen(db, KEY, alt, "203.0.113.7", T0 + MAX_ALTER_MS), "ok", "an der Grenze noch gut");
  assert.equal(await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0), "203.0.113.7", T0 + MAX_ALTER_MS + 1), "ungueltig", "abgelaufen");
});

test("Ausgedachte und verbogene Stempel fallen durch", async () => {
  const db = frisch();
  const s = siegelAusstellen(KEY, T0);
  const [id, zeit, sig] = s.split(".");
  const frueher = (T0 - 60_000).toString(36);
  for (const [falsch, warum] of [
    [`${id}.${frueher}.${sig}`, "Zeit zurückgedreht"],
    [`${id}x.${zeit}.${sig}`, "Kennung geändert"],
    [`${id}.${zeit}.${sig.slice(0, -1)}`, "Unterschrift gekürzt"],
    [`${id}.${zeit}.${sig}.${sig}`, "angehängt"],
    [siegelAusstellen("anderer-schluessel", T0), "mit fremdem Schlüssel unterschrieben"],
    ["", "leer"],
    [undefined, "fehlt"],
    [42, "keine Zeichenkette"],
    ["a".repeat(500), "viel zu lang"],
  ]) {
    assert.equal(await siegelEinloesen(db, KEY, falsch, "203.0.113.7", REIF), "ungueltig", warum);
  }
  assert.equal(await siegelEinloesen(db, KEY, s, "203.0.113.7", REIF), "ok", "der echte gilt danach noch");
});

test("Obergrenze je Absender und Stunde: Darüber wird nichts mehr eingelöst, andere Absender merken nichts", async () => {
  const db = frisch();
  for (let i = 0; i < JE_ABSENDER_JE_STUNDE; i++) {
    assert.equal(await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0), "203.0.113.7", REIF + i), "ok", `Nummer ${i + 1}`);
  }
  const einer = siegelAusstellen(KEY, T0);
  assert.equal(await siegelEinloesen(db, KEY, einer, "203.0.113.7", REIF + 100), "zu-viele");
  assert.equal(await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0), "198.51.100.9", REIF + 100), "ok", "anderer Absender");
  // Eine Stunde nach dem ersten Einlösen ist wieder Platz, und der abgewiesene Stempel wurde nicht verbraucht.
  assert.equal(await siegelEinloesen(db, KEY, einer, "203.0.113.7", REIF + 60 * 60 * 1000 + 1), "ok");
});

test("Obergrenze hält auch, wenn alle Anfragen im selben Augenblick kommen", async () => {
  const db = frisch();
  const viele = Array.from({ length: JE_ABSENDER_JE_STUNDE + 20 }, () => siegelAusstellen(KEY, T0));
  const urteile = await Promise.all(viele.map((s) => siegelEinloesen(db, KEY, s, "203.0.113.7", REIF)));
  assert.equal(urteile.filter((u) => u === "ok").length, JE_ABSENDER_JE_STUNDE);
  assert.equal(urteile.filter((u) => u === "zu-viele").length, 20);
});

test("Gespeichert wird ein Fingerabdruck, nie die IP. Abgelaufene Zeilen verschwinden", async () => {
  const db = frisch();
  await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0), "203.0.113.7", REIF);
  const zeile = (await db.execute("SELECT * FROM formular_siegel")).rows[0];
  assert.ok(!JSON.stringify(zeile).includes("203.0.113"), "keine IP in der Tabelle");
  assert.equal(String(zeile.absender).length, 24);
  await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0 + 3 * MAX_ALTER_MS), "198.51.100.9", T0 + 3 * MAX_ALTER_MS + MIN_ALTER_MS);
  assert.equal(Number((await db.execute("SELECT count(*) AS n FROM formular_siegel")).rows[0].n), 1, "die alte Zeile ist weg");
});

test("Ohne Datenbank gelten Unterschrift und Alter weiter", async () => {
  const s = siegelAusstellen(KEY, T0);
  assert.equal(await siegelEinloesen(null, KEY, s, "", T0 + 1), "zu-frueh");
  assert.equal(await siegelEinloesen(null, KEY, s, "", REIF), "ok");
  assert.equal(await siegelEinloesen(null, KEY, `${s}x`, "", REIF), "ungueltig");
});

test("Grenze über alle Absender: Viele Absender zusammen kommen nicht über die Gesamtzahl je Stunde", async () => {
  const db = frisch();
  const absender = Math.ceil(GESAMT_JE_STUNDE / JE_ABSENDER_JE_STUNDE);
  for (let a = 0; a < absender; a++) {
    for (let i = 0; i < JE_ABSENDER_JE_STUNDE; i++) {
      assert.equal(await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0), `198.51.100.${a}`, REIF), "ok", `Absender ${a}, Nummer ${i + 1}`);
    }
  }
  assert.equal(await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0), "203.0.113.200", REIF + 1), "zu-viele", "ein neuer Absender, aber die Stunde ist voll");
  assert.equal(await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0), "203.0.113.200", REIF + 60 * 60 * 1000 + 1), "ok", "eine Stunde später ist wieder Platz");
});

test("Die Tabelle hat Indizes fürs Zählen und Aufräumen", async () => {
  const db = frisch();
  await siegelEinloesen(db, KEY, siegelAusstellen(KEY, T0), "203.0.113.7", REIF);
  const namen = (await db.execute("SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'formular_siegel' AND name NOT LIKE 'sqlite_%' ORDER BY name")).rows.map((r) => r.name);
  assert.deepEqual(namen, ["formular_siegel_absender", "formular_siegel_bis", "formular_siegel_eingeloest"]);
});
