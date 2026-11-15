import test from "node:test";
import assert from "node:assert/strict";
import { ALLE_PAKETE, BERUFE, PAKETE, wahlFuerMail, wahlLesen, wahlMerkmale, wahlQuery, wahlText } from "./daten.ts";

test("Die Wahl kennt nur feste Kürzel: Fremdes fällt weg, leer heißt alle sechs", () => {
  assert.deepEqual(wahlLesen("seo,texte", "texter"), { pakete: ["texte", "seo"], beruf: "texter" }, "Reihenfolge der Seite, nicht des Links");
  assert.deepEqual(wahlLesen("", ""), { pakete: ALLE_PAKETE, beruf: null });
  assert.deepEqual(wahlLesen(null, null), { pakete: ALLE_PAKETE, beruf: null });
  for (const boese of ["texte<script>", "__proto__", "toString", "texte;seo", "TEXTE", "texte,,", " texte", "alle"]) {
    const w = wahlLesen(boese, boese);
    assert.ok(w.pakete.every((id) => ALLE_PAKETE.includes(id)), boese);
    assert.equal(w.beruf, null, boese);
  }
  assert.deepEqual(wahlLesen("texte,gibtsnicht", "constructor"), { pakete: ["texte"], beruf: null });
});

test("Der Link trägt die Wahl nur als Kürzel, und sie kommt unverändert zurück", () => {
  for (const [pakete, beruf] of [["texte", "texter"], ["design,seo,entwicklung", ""], ["", "entwickler"], ["", ""]]) {
    const w = wahlLesen(pakete, beruf);
    const q = wahlQuery(w);
    assert.match(q, /^(pakete=[a-z,]+)?(&?beruf=[a-z]+)?$/, q);
    const zurueck = new URLSearchParams(q);
    assert.deepEqual(wahlLesen(zurueck.get("pakete"), zurueck.get("beruf")), w, q);
  }
  assert.equal(wahlQuery(wahlLesen("", "")), "", "alle sechs ohne Setup: kein Zusatz im Link");
});

test("Merkmale und CRM-Zeile nennen Pakete und Beruf mit ihren Namen", () => {
  assert.deepEqual(wahlMerkmale(wahlLesen("texte,seo", "texter")), ["Skill-Paket: Texte", "Skill-Paket: SEO und KI-Suche", "Beruf: Texter"]);
  assert.equal(wahlMerkmale(wahlLesen("", "")).length, 6);
  assert.equal(wahlText(wahlLesen("texte,seo", "texter")), "Pakete: Texte, SEO und KI-Suche · Setup: Texter");
  assert.equal(wahlText(wahlLesen("", "")), "Pakete: alle sechs");
});

test("Jedes Paket hat einen Auftrag aus seiner Anleitung, jedes Setup drei Pakete, die es gibt", () => {
  for (const p of PAKETE) {
    assert.ok(p.auftrag.length > 30, p.id);
    assert.ok(!/[„“]/.test(p.auftrag), `${p.id}: Anführungszeichen setzt erst die Ausgabe`);
  }
  for (const b of BERUFE) for (const s of b.setup) assert.ok(ALLE_PAKETE.includes(s.paket), `${b.id}: ${s.paket}`);
  const m = wahlFuerMail(wahlLesen("social", "creator"));
  assert.equal(m.pakete.length, 1);
  assert.equal(m.setup?.als, "Content Creator");
  assert.equal(m.query, "pakete=social&beruf=creator");
});
