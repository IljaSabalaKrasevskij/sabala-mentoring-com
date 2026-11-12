import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import * as validation from "../../../lib/audit-request.ts";
import * as telefon from "../../../lib/telefon.ts";

const sample = { url: "example.com", email: "alex@example.com", telefon: "+49 1520 4817263", consent: true, lang: "de", qualification: { company: "Beispiel Studio", industry: "Architektur", noWebsite: false, projectType: "relaunch", audience: "Gewerbliche Bauherren", goal: "Wir möchten unser Angebot klarer zeigen und passende Projektanfragen erhalten.", timeline: "open", name: "Alex Beispiel", role: "Geschäftsführung" } };

// Run the actual handler with isolated transports. Never write a test lead or send a notification.
function handler({ notionFails = false, pushFails = false, briefkastenFails = false, siegel = "ok", istJson = true } = {}) {
  const calls = [];
  const leads = []; // was in den Briefkasten fürs CRM ginge
  const exports = {};
  const source = ts.transpileModule(readFileSync(new URL("./route.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const sandbox = {
    exports, URL, AbortSignal,
    process: { env: { NODE_ENV: "production", NOTION_API_KEY: "test", NOTION_AUDIT_REQUESTS_DB_ID: "test-db", NTFY_TOPIC: "test-topic" } },
    console: { error() {}, warn() {} },
    require(name) {
      if (name === "next/server") return { NextResponse: { json: (value, options) => new Response(JSON.stringify(value), options) } };
      if (name === "fs/promises") return { mkdir: () => { throw new Error("Unexpected file write"); }, writeFile: () => { throw new Error("Unexpected file write"); } };
      if (name === "path") return path;
      if (name === "@/lib/audit-request") return validation;
      // Botschutz als Attrappe: Der echte braucht Datenbank und Schlüssel. Hier zählt nur, was die Route mit seinem Urteil macht.
      if (name === "@/lib/botschutz") return { ipAus: () => "203.0.113.7", jsonAus: async (req) => (istJson ? req.json() : undefined), siegelPruefen: async () => siegel };
      // Briefkasten als Attrappe: Der echte schreibt in Turso. Die Telefonprüfung ist die echte.
      if (name === "@/lib/leads") return { insertLead: async (lead) => { if (briefkastenFails) return false; leads.push(lead); return true; } };
      if (name === "@/lib/telefon") return telefon;
      throw new Error(`Unexpected module: ${name}`);
    },
    async fetch(url, options) {
      calls.push({ url, body: JSON.parse(options.body) });
      if (url === "https://api.notion.com/v1/pages") return new Response(JSON.stringify(notionFails ? { error: "unavailable" } : { id: "page-123" }), { status: notionFails ? 503 : 200 });
      if (url === "https://ntfy.sh") return new Response("{}", { status: pushFails ? 503 : 200 });
      throw new Error(`Unexpected network call: ${url}`);
    },
  };
  vm.runInNewContext(source, sandbox);
  return { post: body => exports.POST({ json: async () => body }), calls, leads };
}

test("persists all project details before notifying with the saved page link", async () => {
  const { post, calls } = handler();
  const response = await post(sample);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(calls[0].url, "https://api.notion.com/v1/pages");
  const saved = JSON.stringify(calls[0].body.children);
  for (const field of ["company", "industry", "audience", "goal", "name", "role"]) assert.ok(saved.includes(sample.qualification[field]), field);
  assert.equal(calls[1].body.click, "https://www.notion.so/page123");
});

test("no website uses a null Notion URL and records the project's context", async () => {
  const { post, calls } = handler();
  assert.equal((await post({ ...sample, url: "", qualification: { ...sample.qualification, noWebsite: true, projectType: "new" } })).status, 200);
  assert.equal(calls[0].body.properties.URL.url, null);
  assert.ok(JSON.stringify(calls[0].body.children).includes("Noch keine Webseite"));
});

test("invalid qualification never reaches persistence or notifications", async () => {
  const { post, calls } = handler();
  assert.equal((await post({ ...sample, qualification: { ...sample.qualification, role: "" } })).status, 400);
  assert.equal(calls.length, 0);
});

test("Notion fällt aus, der Briefkasten hält die Anfrage: Erfolg und Push", async () => {
  const { post, calls, leads } = handler({ notionFails: true });
  assert.equal((await post(sample)).status, 200);
  assert.equal(leads.length, 1);
  assert.equal(calls.length, 2); // Notion versucht, dann der Push
});

test("fallen Notion und Briefkasten aus, gibt es einen Fehler und keinen Push", async () => {
  const { post, calls } = handler({ notionFails: true, briefkastenFails: true });
  assert.equal((await post(sample)).status, 500);
  assert.equal(calls.length, 1);
});

test("die Anfrage landet im Briefkasten fürs CRM, mit Name, Telefon und allen Angaben", async () => {
  const { post, calls, leads } = handler();
  assert.equal((await post(sample)).status, 200);
  const [lead] = leads;
  assert.equal(lead.quelle, "Webseiten-Analyse");
  assert.equal(lead.vorname, "Alex");
  assert.equal(lead.nachname, "Beispiel");
  assert.equal(lead.email, sample.email);
  assert.equal(lead.telefon, "+49 1520 4817263");
  assert.equal(lead.unternehmen, sample.qualification.company);
  assert.ok(lead.anliegen.startsWith("Webseiten-Analyse\n"), lead.anliegen);
  for (const wert of [sample.qualification.goal, sample.qualification.audience, "Architektur"]) assert.ok(lead.anliegen.includes(wert), wert);
  assert.ok(JSON.stringify(calls[0].body.children).includes("+49 1520 4817263"), "Telefon steht auch in Notion");
  assert.ok(calls[1].body.message.includes("+49 1520 4817263"), "und im Push");
});

test("ohne gültige Telefonnummer wird nichts gespeichert, die Meldung gehört ans Feld", async () => {
  for (const nummer of [undefined, "", "0151 2345678", "+49 151 23456789", "+49 900 1234567"]) {
    const { post, calls, leads } = handler();
    const response = await post({ ...sample, telefon: nummer });
    const body = await response.json();
    assert.ok([400, 422].includes(response.status), `${nummer}: ${response.status}`);
    if (response.status === 422) assert.equal(body.feld, "telefon", nummer);
    assert.equal(calls.length + leads.length, 0, nummer);
  }
});

test("das englische Formular hat kein Telefonfeld und braucht keins", async () => {
  const { post, leads } = handler();
  const { telefon: _ohne, ...englisch } = { ...sample, lang: "en" };
  assert.equal((await post(englisch)).status, 200);
  assert.equal(leads[0].telefon, undefined);
});

test("a saved request stays successful even if the notification fails", async () => {
  const { post } = handler({ pushFails: true });
  assert.equal((await post(sample)).status, 200);
});

test("die kurze Blog-Fassung bleibt verträglich, braucht jetzt aber die Telefonnummer", async () => {
  const { post, calls, leads } = handler();
  const kurz = { url: sample.url, email: sample.email, consent: true };
  assert.equal((await post({ ...kurz, telefon: sample.telefon })).status, 200);
  assert.equal(calls[0].body.children, undefined);
  assert.ok(leads[0].anliegen.startsWith("Webseiten-Audit aus dem Blog\n"), leads[0].anliegen);
  assert.equal(leads[0].vorname, "");
  const ohne = handler();
  const antwort = await ohne.post(kurz);
  assert.equal(antwort.status, 422);
  assert.equal((await antwort.json()).feld, "telefon");
  assert.equal(ohne.calls.length + ohne.leads.length, 0);
});

test("ohne gültigen Stempel wird nichts gespeichert und niemand benachrichtigt", async () => {
  for (const [siegel, status] of [["ungueltig", 400], ["zu-frueh", 400], ["zu-viele", 429]]) {
    const { post, calls } = handler({ siegel });
    assert.equal((await post(sample)).status, status, siegel);
    assert.equal(calls.length, 0, siegel);
  }
});

test("ein Körper, der nicht als JSON angekündigt ist, wird abgelehnt (fremde Webseiten können nur so schicken)", async () => {
  const { post, calls } = handler({ istJson: false });
  assert.equal((await post(sample)).status, 400);
  assert.equal(calls.length, 0);
});
