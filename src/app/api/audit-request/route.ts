import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

type AuditRequest = {
  url: string;
  email: string;
  consent: boolean;
};

function validateUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  try {
    const normalized = raw.startsWith("http") ? raw : `https://${raw}`;
    const parsed = new URL(normalized);
    return parsed.toString();
  } catch {
    return null;
  }
}

function validateEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : null;
}

async function saveToFile(payload: AuditRequest) {
  const dir = process.env.AUDIT_REQUESTS_DIR ||
    path.join(process.env.HOME || "", "Documents", "_Obsidian_Vault", "04_Ressourcen", "Audit-Requests");
  await fs.mkdir(dir, { recursive: true });
  const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}_${payload.email.replace(/[^a-z0-9]/gi, "-")}.json`;
  const filepath = path.join(dir, filename);
  await fs.writeFile(filepath, JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }, null, 2), "utf-8");
  return filepath;
}

async function saveToNotion(payload: AuditRequest): Promise<{ saved: boolean; reason?: string }> {
  const NOTION_TOKEN = process.env.NOTION_API_KEY;
  const NOTION_DB_ID = process.env.NOTION_AUDIT_REQUESTS_DB_ID;
  if (!NOTION_TOKEN || !NOTION_DB_ID) {
    return { saved: false, reason: "Notion-Credentials nicht gesetzt (NOTION_API_KEY + NOTION_AUDIT_REQUESTS_DB_ID)" };
  }

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: {
          "URL": { url: payload.url },
          "Email": { email: payload.email },
          "Status": { select: { name: "Neu" } },
          "Eingegangen": { date: { start: new Date().toISOString() } },
        },
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      return { saved: false, reason: `Notion-API-Fehler ${res.status}: ${errText.slice(0, 200)}` };
    }
    return { saved: true };
  } catch (err) {
    return { saved: false, reason: err instanceof Error ? err.message : "Notion-Netzwerkfehler" };
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Request-Body." }, { status: 400 });
  }

  const data = body as Partial<AuditRequest>;
  const url = validateUrl(data.url);
  const email = validateEmail(data.email);

  if (!url) return NextResponse.json({ error: "Bitte gib eine gültige Webseiten-URL ein." }, { status: 400 });
  if (!email) return NextResponse.json({ error: "Bitte gib eine gültige Email-Adresse ein." }, { status: 400 });
  if (!data.consent) return NextResponse.json({ error: "Datenschutz-Einwilligung fehlt." }, { status: 400 });

  const payload: AuditRequest = { url, email, consent: true };

  const fileResult = await saveToFile(payload).catch((err) => {
    console.error("[audit-request] Datei-Save fehlgeschlagen:", err);
    return null;
  });

  const notionResult = await saveToNotion(payload);
  if (!notionResult.saved) {
    console.warn("[audit-request] Notion nicht erreicht:", notionResult.reason);
  }

  if (!fileResult && !notionResult.saved) {
    return NextResponse.json({ error: "Speichern fehlgeschlagen. Versuch es bitte später." }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "Audit-Anfrage empfangen. Wir melden uns innerhalb von 48 Stunden.",
    storage: {
      file: !!fileResult,
      notion: notionResult.saved,
    },
  });
}
