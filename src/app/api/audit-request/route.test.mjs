import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import * as validation from "../../../lib/audit-request.ts";

const sample = { url: "example.com", email: "alex@example.com", consent: true, lang: "de", qualification: { company: "Beispiel Studio", industry: "Architektur", noWebsite: false, projectType: "relaunch", audience: "Gewerbliche Bauherren", goal: "Wir möchten unser Angebot klarer zeigen und passende Projektanfragen erhalten.", timeline: "open", name: "Alex Beispiel", role: "Geschäftsführung" } };

// Run the actual handler with isolated transports. Never write a test lead or send a notification.
function handler({ notionFails = false, pushFails = false } = {}) {
  const calls = [];
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
  return { post: body => exports.POST({ json: async () => body }), calls };
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

test("storage failure returns an error and sends no notification", async () => {
  const { post, calls } = handler({ notionFails: true });
  assert.equal((await post(sample)).status, 500);
  assert.equal(calls.length, 1);
});

test("a saved request stays successful even if the notification fails", async () => {
  const { post } = handler({ pushFails: true });
  assert.equal((await post(sample)).status, 200);
});

test("compact blog submissions remain compatible", async () => {
  const { post, calls } = handler();
  const legacy = { url: sample.url, email: sample.email, consent: true };
  assert.equal((await post(legacy)).status, 200);
  assert.equal(calls[0].body.children, undefined);
});
