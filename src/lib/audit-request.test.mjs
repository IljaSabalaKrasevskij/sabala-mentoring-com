import test from "node:test";
import assert from "node:assert/strict";
import { auditDetailRows, auditNotionChildren, normalizeAuditUrl, parseAuditRequest, validateProjectStep, EMPTY_PROJECT } from "./audit-request.ts";

export const validRequest = {
  url: " example.com ", email: " alex@example.com ", consent: true, lang: "de",
  qualification: { company: " Beispiel Studio ", industry: "Architektur", noWebsite: false, projectType: "relaunch", audience: "Gewerbliche Bauherren", goal: "Unser Auftritt soll die Qualität unserer Arbeit zeigen und passende Anfragen bringen.", timeline: "within-3-months", name: "Alex Beispiel", role: "Geschäftsführung" },
};

test("normalizes the qualified request and preserves every answer without adding a budget", () => {
  const { data } = parseAuditRequest(validRequest);
  assert.equal(data.url, "https://example.com/");
  assert.equal(data.email, "alex@example.com");
  assert.equal(data.qualification.company, "Beispiel Studio");
  assert.equal(data.qualification.goal, validRequest.qualification.goal);
  assert.equal("budget" in data.qualification, false);
  const details = Object.fromEntries(auditDetailRows(data));
  assert.equal(details["Rolle im Unternehmen"], "Geschäftsführung");
  assert.equal(details["Zielgruppe"], "Gewerbliche Bauherren");
  assert.equal(details["Zeitrahmen"], "Innerhalb der nächsten 3 Monate");
  assert.equal(details["Datenschutz-Einwilligung"], "Bestätigt");
  assert.ok(JSON.stringify(auditNotionChildren(data)).includes(validRequest.qualification.goal));
});

test("accepts a company without a site and discards its stale URL", () => {
  const { data } = parseAuditRequest({ ...validRequest, url: "old.example.com", qualification: { ...validRequest.qualification, noWebsite: true, projectType: "new" } });
  assert.equal(data.url, "");
  assert.equal(Object.fromEntries(auditDetailRows(data))["Webseite"], "Noch keine Webseite");
});

test("direction and timing can honestly still be open", () => {
  const { data } = parseAuditRequest({ ...validRequest, qualification: { ...validRequest.qualification, projectType: "direction", timeline: "open", audience: "Noch zu klären" } });
  assert.equal(data.qualification.timeline, "open");
});

test("legacy blog requests still work without qualification", () => {
  const legacy = { url: validRequest.url, email: validRequest.email, consent: true };
  const { data } = parseAuditRequest(legacy);
  assert.equal(data.email, "alex@example.com");
  assert.equal(data.qualification, undefined);
  assert.deepEqual(auditNotionChildren(data), []);
});

test("requires literal consent and validates all project fields on the server", () => {
  for (const consent of [false, "true", "false", 1, null]) assert.ok(parseAuditRequest({ ...validRequest, consent }).errors.consent);
  for (const [field, value] of [["company", ""], ["industry", 7], ["noWebsite", "true"], ["projectType", "unknown"], ["audience", ""], ["goal", "Just a site"], ["timeline", "unknown"], ["name", ""], ["role", []]]) {
    assert.ok(parseAuditRequest({ ...validRequest, qualification: { ...validRequest.qualification, [field]: value } }).errors, field);
  }
});

test("rejects malformed bodies and a present but malformed qualification", () => {
  for (const body of [null, [], "text", 1]) assert.ok(parseAuditRequest(body).errors);
  for (const qualification of [null, [], "text"]) assert.ok(parseAuditRequest({ ...validRequest, qualification }).errors);
});

test("website validation only accepts usable http and https addresses", () => {
  assert.equal(normalizeAuditUrl("HTTPS://EXAMPLE.COM"), "https://example.com/");
  for (const value of ["", "https://", "localhost", "https://user:password@example.com", "javascript:alert(1)", "ftp://example.com", "https://bad address.com"]) assert.equal(normalizeAuditUrl(value), null, value);
});

test("length limits protect storage and reject non-string answers", () => {
  assert.ok(parseAuditRequest({ ...validRequest, qualification: { ...validRequest.qualification, goal: "x".repeat(2001) } }).errors.goal);
  assert.ok(parseAuditRequest({ ...validRequest, email: {} }).errors.email);
  assert.ok(parseAuditRequest({ ...validRequest, qualification: { ...validRequest.qualification, company: "x".repeat(161) } }).errors.company);
});

test("each step validates its own fields and provides English errors", () => {
  assert.deepEqual(Object.keys(validateProjectStep(EMPTY_PROJECT, 0, "de")), ["company", "industry", "url"]);
  assert.deepEqual(Object.keys(validateProjectStep(EMPTY_PROJECT, 1, "de")), ["projectType", "audience", "goal", "timeline"]);
  assert.match(validateProjectStep(EMPTY_PROJECT, 2, "en").name, /Please/);
});
