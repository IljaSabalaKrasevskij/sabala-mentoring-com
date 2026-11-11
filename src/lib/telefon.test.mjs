import test from "node:test";
import assert from "node:assert/strict";
import { telefonPruefen } from "./telefon.ts";

const nummer = (roh) => telefonPruefen(roh).nummer;
const fehler = (roh) => telefonPruefen(roh).fehler;

test("Echte Nummern kommen durch und landen in einer Schreibweise, egal wie getippt", () => {
  for (const roh of ["+49 1520 4817263", "+49 01520 4817263", "+49 (0) 1520 48 17 263", "0049 1520 4817263", "+49-1520/4817263", "  +4915204817263  "]) {
    assert.equal(nummer(roh), "+49 1520 4817263", roh);
  }
  assert.equal(nummer("+49 30 901820"), "+49 30 901820", "Festnetz Berlin");
  assert.equal(nummer("+49 32 221481726"), "+49 32 221481726", "Internet-Telefonie");
  assert.equal(nummer("+43 0664 4817263"), "+43 664 4817263", "Österreich mobil, mit der Null vor der Vorwahl");
  assert.equal(nummer("+41 79 481 72 63"), "+41 79 481 72 63", "Schweiz mobil");
  assert.equal(nummer("+995 591 443665"), "+995 591 44 36 65", "Georgien mobil");
  assert.equal(nummer("+1 415 555 2671"), "+1 415 555 2671", "USA");
});

test("Ohne Ländervorwahl, leer oder mit Buchstaben: abgelehnt, mit dem passenden Grund", () => {
  assert.equal(fehler("01520 4817263"), "vorwahl");
  assert.equal(fehler(""), "fehlt");
  assert.equal(fehler("+49 "), "fehlt", "nur die Vorwahl aus dem Formular");
  assert.equal(fehler("+49 151 CALLME48"), "ungueltig", "Buchstaben werden nicht in Ziffern umgerechnet");
  assert.equal(fehler("+49 176 48172"), "ungueltig", "zu kurz für ein deutsches Handy");
  assert.equal(fehler("+49 1111 481726"), "ungueltig", "Vorwahlbereich gibt es nicht");
  assert.equal(fehler("+999 481 726350"), "ungueltig", "Ländervorwahl gibt es nicht");
});

test("Teure und unpersönliche Sondernummern gehen nicht: kein teurer Rückruf über das Formular", () => {
  for (const roh of ["+49 900 1481726", "+49 180 5481726", "+49 137 4817263", "+49 800 1481726", "+49 700 14817260"]) {
    assert.equal(fehler(roh), "sondernummer", roh);
  }
});

test("Beispielnummern gehen nicht, auch wenn der Nummernplan sie zulässt", () => {
  for (const roh of ["+49 151 23456789", "+49 170 1234567", "+49 151 11111111", "+49 40 123456", "+49 171 9876543", "+49 30 0000000"]) {
    assert.equal(fehler(roh), "platzhalter", roh);
  }
  assert.equal(nummer("+49 1520 1122334"), "+49 1520 1122334", "ein paar gleiche Ziffern sind normal");
});
