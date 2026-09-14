export type AuditLang = "de" | "en";

export const PROJECT_TYPES = ["relaunch", "new", "direction"] as const;
export const PROJECT_TIMELINES = ["within-3-months", "3-to-6-months", "later", "open"] as const;

export const PROJECT_LABELS = {
  de: {
    projectType: { relaunch: "Bestehende Webseite neu aufstellen", new: "Erste Webseite für unser Unternehmen", direction: "Erst die richtige Richtung klären" },
    timeline: { "within-3-months": "Innerhalb der nächsten 3 Monate", "3-to-6-months": "In 3 bis 6 Monaten", later: "Später als in 6 Monaten", open: "Zeitpunkt noch offen" },
  },
  en: {
    projectType: { relaunch: "Rethink our existing website", new: "Our company's first website", direction: "Work out the right direction first" },
    timeline: { "within-3-months": "Within the next 3 months", "3-to-6-months": "In 3 to 6 months", later: "More than 6 months from now", open: "Timing is still open" },
  },
};

export type ProjectDetails = {
  company: string;
  industry: string;
  noWebsite: boolean;
  projectType: typeof PROJECT_TYPES[number] | "";
  audience: string;
  goal: string;
  timeline: typeof PROJECT_TIMELINES[number] | "";
  name: string;
  role: string;
};
export type ProjectDraft = ProjectDetails & { url: string; email: string; consent: boolean };
export type AuditRequest = { url: string; email: string; consent: true; lang: AuditLang; qualification?: ProjectDetails };
export type AuditField = keyof ProjectDraft;
export type AuditErrors = Partial<Record<AuditField, string>>;

export const EMPTY_PROJECT: ProjectDraft = { company: "", industry: "", noWebsite: false, url: "", projectType: "", audience: "", goal: "", timeline: "", name: "", role: "", email: "", consent: false };

export function normalizeAuditUrl(raw: unknown): string | null {
  if (typeof raw !== "string" || raw.trim().length > 2000) return null;
  const value = raw.trim();
  if (!value || /\s/.test(value)) return null;
  try {
    const parsed = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password || !parsed.hostname.includes(".") || parsed.hostname.startsWith(".") || parsed.hostname.endsWith(".")) return null;
    return parsed.toString().length <= 2000 ? parsed.toString() : null;
  } catch { return null; }
}

export function normalizeAuditEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? value : null;
}

function textInRange(value: unknown, min: number, max: number): value is string {
  return typeof value === "string" && value.trim().length >= min && value.trim().length <= max;
}

export function validateProjectStep(draft: Partial<ProjectDraft>, step: number, lang: AuditLang): AuditErrors {
  const de = lang === "de";
  const errors: AuditErrors = {};
  if (step === 0) {
    if (!textInRange(draft.company, 2, 160)) errors.company = de ? "Wie heißt dein Unternehmen? Bitte 2 bis 160 Zeichen." : "What is your company called? Please use 2 to 160 characters.";
    if (!textInRange(draft.industry, 2, 160)) errors.industry = de ? "Bitte nenne deine Branche in wenigen Worten." : "Please describe your industry in a few words.";
    if (draft.noWebsite !== true && !normalizeAuditUrl(draft.url)) errors.url = de ? "Bitte gib eine gültige Webseite ein oder wähle die Option darunter." : "Enter a valid website or select the option below.";
  }
  if (step === 1) {
    if (!PROJECT_TYPES.some(value => value === draft.projectType)) errors.projectType = de ? "Worum geht es? Bitte wähle eine Richtung." : "Please choose the direction for your project.";
    if (!textInRange(draft.audience, 2, 400)) errors.audience = de ? "Wen willst du erreichen? Wenn das noch offen ist, schreib es dazu." : "Who do you want to reach? If you are unsure, say so here.";
    if (!textInRange(draft.goal, 20, 2000)) errors.goal = de ? "Beschreibe kurz, was sich verändern soll. Bitte mindestens 20 Zeichen." : "Briefly describe what should change. Please use at least 20 characters.";
    if (!PROJECT_TIMELINES.some(value => value === draft.timeline)) errors.timeline = de ? "Bitte wähle einen Zeitrahmen. Er darf noch offen sein." : "Please choose a timeframe. It can still be open.";
  }
  if (step === 2) {
    if (!textInRange(draft.name, 2, 120)) errors.name = de ? "Bitte gib deinen Namen an." : "Please enter your name.";
    if (!textInRange(draft.role, 2, 120)) errors.role = de ? "Welche Rolle hast du im Unternehmen?" : "What is your role in the company?";
    if (!normalizeAuditEmail(draft.email)) errors.email = de ? "Bitte gib eine gültige E-Mail-Adresse ein." : "Please enter a valid email address.";
    if (draft.consent !== true) errors.consent = de ? "Bitte bestätige die Datenschutzhinweise." : "Please confirm the privacy notice.";
  }
  return errors;
}

export function parseAuditRequest(body: unknown): { data: AuditRequest; errors?: never } | { data?: never; errors: AuditErrors } {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { errors: { email: "Ungültige Anfrage." } };
  const raw = body as Record<string, unknown>;
  const lang: AuditLang = raw.lang === "en" ? "en" : "de";
  const email = normalizeAuditEmail(raw.email);
  const url = normalizeAuditUrl(raw.url);

  // Existing blog forms keep their compact request format.
  if (raw.qualification === undefined) {
    const errors: AuditErrors = {};
    if (!url) errors.url = lang === "de" ? "Bitte gib eine gültige Webseite ein." : "Please enter a valid website.";
    if (!email) errors.email = lang === "de" ? "Bitte gib eine gültige E-Mail-Adresse ein." : "Please enter a valid email address.";
    if (raw.consent !== true) errors.consent = lang === "de" ? "Datenschutz-Einwilligung fehlt." : "Privacy consent is missing.";
    return Object.keys(errors).length ? { errors } : { data: { url: url!, email: email!, consent: true, lang } };
  }
  if (!raw.qualification || typeof raw.qualification !== "object" || Array.isArray(raw.qualification)) return { errors: { company: "Ungültige Projektangaben." } };
  const q = raw.qualification as Record<string, unknown>;
  const draft = { ...q, url: raw.url, email: raw.email, consent: raw.consent } as Partial<ProjectDraft>;
  const errors = { ...validateProjectStep(draft, 0, lang), ...validateProjectStep(draft, 1, lang), ...validateProjectStep(draft, 2, lang) };
  if (typeof q.noWebsite !== "boolean") errors.url = lang === "de" ? "Bitte gib an, ob bereits eine Webseite besteht." : "Please specify whether you have a website.";
  if (Object.keys(errors).length) return { errors };
  const qualification: ProjectDetails = {
    company: (q.company as string).trim(), industry: (q.industry as string).trim(), noWebsite: q.noWebsite === true,
    projectType: q.projectType as ProjectDetails["projectType"], audience: (q.audience as string).trim(), goal: (q.goal as string).trim(),
    timeline: q.timeline as ProjectDetails["timeline"], name: (q.name as string).trim(), role: (q.role as string).trim(),
  };
  return { data: { url: qualification.noWebsite ? "" : url!, email: email!, consent: true, lang, qualification } };
}

/** Page content avoids requiring new properties in the existing Notion database. */
export function auditDetailRows(payload: AuditRequest): [string, string][] {
  const q = payload.qualification;
  if (!q) return [];
  return [
    ["Unternehmen", q.company], ["Branche", q.industry], ["Webseite", q.noWebsite ? "Noch keine Webseite" : payload.url],
    ["Vorhaben", q.projectType ? PROJECT_LABELS.de.projectType[q.projectType] : ""], ["Zielgruppe", q.audience],
    ["Gewünschte Veränderung", q.goal], ["Zeitrahmen", q.timeline ? PROJECT_LABELS.de.timeline[q.timeline] : ""],
    ["Ansprechpartner", q.name], ["Rolle im Unternehmen", q.role], ["E-Mail", payload.email],
    ["Formularsprache", payload.lang], ["Datenschutz-Einwilligung", "Bestätigt"],
  ];
}

export function auditNotionChildren(payload: AuditRequest) {
  return auditDetailRows(payload).flatMap(([label, value]) => [
    { object: "block", type: "heading_3", heading_3: { rich_text: [{ type: "text", text: { content: label } }] } },
    { object: "block", type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: value } }] } },
  ]);
}
