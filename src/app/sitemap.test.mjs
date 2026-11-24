import test from "node:test";
import assert from "node:assert/strict";

// sitemap.ts liest src/app/blog ab dem Projektordner, darum zuerst dorthin wechseln.
process.chdir(new URL("../../", import.meta.url).pathname);
const { default: sitemap } = await import("./sitemap.ts");

test("Jede Adresse trägt ihr eigenes Änderungsdatum, nicht das Datum des Baus", () => {
  const eintraege = sitemap();
  const morgen = new Date(Date.now() + 864e5).toISOString().slice(0, 10); // ein Tag Luft für Zeitzonen
  for (const e of eintraege) {
    assert.match(String(e.lastModified), /^\d{4}-\d{2}-\d{2}$/, `${e.url}: Datum fehlt. Artikel brauchen datePublished in ihrer page.tsx, feste Seiten "geaendert" in sitemap.ts`);
    assert.ok(e.lastModified <= morgen, `${e.url}: ${e.lastModified} liegt in der Zukunft`);
  }
  const verschiedene = new Set(eintraege.map((e) => e.lastModified)).size;
  assert.ok(verschiedene > 3, `nur ${verschiedene} verschiedene Daten: Das sieht wieder nach einem Stempel für alle aus`);
});

test("Startseite und Blog-Übersicht sind so frisch wie der neueste Artikel", () => {
  const eintraege = sitemap();
  const datum = (pfad) => eintraege.find((e) => e.url === `https://sabala-mentoring.com${pfad}`).lastModified;
  const neuester = eintraege.filter((e) => e.url.includes("/blog/")).map((e) => e.lastModified).sort().pop();
  assert.ok(datum("") >= neuester, `Startseite ${datum("")} ist älter als der neueste Artikel ${neuester}`);
  assert.ok(datum("/blog") >= neuester, `Blog-Übersicht ${datum("/blog")} ist älter als der neueste Artikel ${neuester}`);
});
