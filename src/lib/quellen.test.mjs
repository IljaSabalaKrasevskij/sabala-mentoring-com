import test from "node:test";
import assert from "node:assert/strict";
import { dankeSeite, FORMULARE, istLeadmagnet, istQuelle, LEADMAGNETE, NISCHEN, nischeVon } from "./quellen.ts";

test("Jede Quelle zeigt auf eine Nische, die es gibt (oder bewusst auf keine)", () => {
  for (const [kuerzel, m] of Object.entries(LEADMAGNETE)) {
    assert.match(kuerzel, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${kuerzel}: Kürzel nur klein, mit Bindestrichen (so steht es in Adressen und Auswertungen)`);
    assert.ok(m.name.length >= 3, kuerzel);
    assert.ok(m.nische in NISCHEN, `${kuerzel}: Nische ${m.nische}`);
    assert.equal(nischeVon(kuerzel), m.nische);
  }
  for (const [name, f] of Object.entries(FORMULARE)) {
    assert.ok(f.nische === null || f.nische in NISCHEN, name);
    assert.equal(nischeVon(name), f.nische);
  }
});

test("Kürzel von Leadmagneten und Namen alter Formulare stoßen nicht zusammen, Fremdes wird nicht erkannt", () => {
  for (const kuerzel of Object.keys(LEADMAGNETE)) assert.ok(!(kuerzel in FORMULARE), kuerzel);
  assert.equal(istLeadmagnet("startpaket-claude-code"), true);
  assert.equal(istLeadmagnet("Akademie-Newsletter"), false);
  assert.equal(istQuelle("Akademie-Newsletter"), true);
  for (const fremd of ["", "gibt-es-nicht", "toString", "__proto__", "constructor"]) {
    assert.equal(istLeadmagnet(fremd), false, fremd);
    assert.equal(istQuelle(fremd), false, fremd);
  }
});

test("Der Klick in der Bestätigungsmail führt auf eine eigene Seite der Webseite, nie woandershin", () => {
  for (const [kuerzel, m] of Object.entries(LEADMAGNETE)) {
    // Ein Pfad auf dieser Webseite: ein Schrägstrich vorn, kein zweiter direkt danach (sonst wäre //andere-seite.de eine fremde Adresse)
    assert.match(m.danke, /^\/[a-z0-9-]+(\/[a-z0-9-]+)*$/, `${kuerzel}: ${m.danke}`);
    assert.equal(dankeSeite(kuerzel), m.danke);
  }
  assert.equal(dankeSeite("startpaket-claude-code"), "/claude-code/startpaket/danke");
  for (const sonst of ["Akademie-Newsletter", "Warteliste Kurs", "", "gibt-es-nicht", "__proto__", "//boese.example"]) {
    assert.equal(dankeSeite(sonst), "/newsletter/bestaetigt", sonst);
  }
});
