import test from "node:test";
import assert from "node:assert/strict";
import { bestaetigungHtml, bestaetigungText } from "./mail-html.ts";

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
