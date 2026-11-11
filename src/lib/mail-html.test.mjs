import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { anlassVon, bestaetigungHtml, bestaetigungText, downloadHtml, downloadText, downloadVon } from "./mail-html.ts";

const LINK = "https://sabala-mentoring.com/api/newsletter/bestaetigen?t=abc_DEF-123";
const WORTLAUT = "Ja, ich will den Sabala Newsletter & mehr.";
const html = bestaetigungHtml(LINK, WORTLAUT);
const text = bestaetigungText(LINK, WORTLAUT);

test("Bestätigungsmail: Link, Wortlaut, Signatur und Impressum stehen drin, als HTML und als Text", () => {
  assert.ok(html.includes(`<a href="${LINK}"`), "Knopf zeigt auf den Link");
  assert.ok(html.includes("Ja, ich will den Sabala Newsletter &amp; mehr."), "Wortlaut steht maskiert in der Mail");
  for (const stueck of ["SABALA MENTORING LLC, 30 N Gould St Ste N, Sheridan, WY 82801, USA", "sabala-mentoring.com/impressum", "sabala-mentoring.com/datenschutz", "Sabala", "Ilja Krasevskij"]) {
    assert.ok(html.includes(stueck), `HTML: ${stueck}`);
    assert.ok(text.includes(stueck), `Text: ${stueck}`);
  }
  assert.ok(text.includes(LINK) && text.includes(WORTLAUT));
  assert.ok(!html.includes("undefined") && !text.includes("undefined"));
});

test("Nichts in der Mail lässt sich über Link oder Wortlaut einschleusen", () => {
  const boese = bestaetigungHtml('https://x.example/?a="><script>alert(1)</script>', '<img src=x onerror=alert(1)> "Zitat"');
  assert.ok(!boese.includes("<script>") && !boese.includes("<img src=x"), "spitze Klammern werden maskiert");
  assert.ok(!boese.includes('?a="><'), "Anführungszeichen schließen kein Attribut");
});

test("Bilder und Verweise zeigen nur auf die eigene Seite, jedes Bild hat Maße und alt", () => {
  const ziele = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(ziele.length >= 6);
  for (const z of ziele) assert.ok(z.startsWith("https://sabala-mentoring.com/") || z === "mailto:sabala@sabala-mentoring.com", z);
  for (const bild of html.match(/<img [^>]+>/g)) assert.ok(/ alt="[^"]*"/.test(bild) && / width="\d+"/.test(bild) && / height="\d+"/.test(bild), bild);
});

test("Keine Schrift unter 12 px (außer der versteckten Vorschauzeile), kein Style-Block, keine Werbung", () => {
  const groessen = [...html.matchAll(/font-size:\s*([\d.]+)px/g)].map((m) => Number(m[1])).filter((g) => g > 1);
  assert.ok(Math.min(...groessen) >= 12, `kleinste Schrift ${Math.min(...groessen)} px`);
  assert.ok(!/<style/i.test(html), "Stile stehen am Element, viele Mailprogramme werfen <style> weg");
  // Die Bestätigungsmail darf keine Werbung enthalten: keine Verweise auf Angebote oder Kanäle
  for (const werbung of ["/akademie", "/shop", "/webseiten", "linkedin.com", "instagram.com"]) assert.ok(!html.includes(werbung), werbung);
});

test("Das Startpaket nennt sich in der Mail, alle anderen Formulare behalten den allgemeinen Text", () => {
  const a = anlassVon("startpaket-claude-code");
  assert.match(a.betreff, /Claude-Code-Startpaket/);
  const h = bestaetigungHtml(LINK, WORTLAUT, a);
  const t = bestaetigungText(LINK, WORTLAUT, a);
  for (const s of [h, t]) {
    assert.ok(s.includes("Claude-Code-Startpaket") && s.includes("direkt zum Download"), "nennt Paket und Download");
    assert.ok(!s.includes("Erst danach schreibe ich dir"), "kein allgemeiner Satz daneben");
  }
  assert.ok(h.includes(`<a href="${LINK}"`) && t.includes(LINK), "Link bleibt derselbe");
  assert.ok(h.includes("<title>Dein Claude-Code-Startpaket: ein Klick fehlt noch</title>"));
  for (const werbung of ["/akademie", "/shop", "/webseiten", "linkedin.com", "instagram.com"]) assert.ok(!h.includes(werbung), werbung);
  // Alles, was kein Leadmagnet mit eigenem Text ist, bekommt die Mail wie bisher
  for (const q of ["Akademie-Newsletter", "Warteliste Kurs", "ki-newsletter", "", "__proto__", "toString"]) {
    assert.equal(anlassVon(q).betreff, "Bitte bestätige deine Anmeldung", q);
  }
  assert.ok(html.includes("Erst danach schreibe ich dir.") && text.includes("Erst danach schreibe ich dir:"), "allgemeine Mail unverändert");
});

test("Download-Mail: Knopf zum Paket, drei Schritte, nur eigene Adressen, nichts aus dem Formular", () => {
  const d = downloadVon("startpaket-claude-code");
  assert.ok(d, "Startpaket hat eine Download-Mail");
  const h = downloadHtml(d);
  const t = downloadText(d);
  assert.ok(h.includes(`<a href="${d.datei}"`) && t.includes(d.datei), "Knopf und Text zeigen auf das Paket");
  // Das Paket liegt wirklich dort, wohin die Mail zeigt
  const datei = new URL(`../../public${new URL(d.datei).pathname}`, import.meta.url);
  assert.ok(fs.existsSync(datei), `fehlt: ${datei.pathname}`);
  for (const s of d.schritte) assert.ok(t.includes(s), s);
  for (const stueck of ["SABALA MENTORING LLC, 30 N Gould St Ste N, Sheridan, WY 82801, USA", "Ilja Krasevskij"]) {
    assert.ok(h.includes(stueck) && t.includes(stueck), stueck);
  }
  for (const z of [...h.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1])) {
    assert.ok(z.startsWith("https://sabala-mentoring.com/") || z === "mailto:sabala@sabala-mentoring.com", z);
  }
  const groessen = [...h.matchAll(/font-size:\s*([\d.]+)px/g)].map((m) => Number(m[1])).filter((g) => g > 1);
  assert.ok(Math.min(...groessen) >= 12, `kleinste Schrift ${Math.min(...groessen)} px`);
  assert.ok(!/<style/i.test(h) && !h.includes("undefined") && !t.includes("undefined"));
  // Nur Quellen mit Paket bekommen eine Download-Mail
  for (const q of ["Akademie-Newsletter", "Warteliste Kurs", "ki-newsletter", "", "__proto__", "toString"]) assert.equal(downloadVon(q), null, q);
});
