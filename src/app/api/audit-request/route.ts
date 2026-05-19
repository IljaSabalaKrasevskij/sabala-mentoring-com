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

const isLocalDev = process.env.NODE_ENV !== "production" && !process.env.VERCEL;

async function saveToFile(payload: AuditRequest): Promise<string | null> {
  if (!isLocalDev) return null;
  try {
    const dir = process.env.AUDIT_REQUESTS_DIR ||
      path.join(process.env.HOME || "", "Documents", "_Obsidian_Vault", "04_Ressourcen", "Audit-Requests");
    await fs.mkdir(dir, { recursive: true });
    const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}_${payload.email.replace(/[^a-z0-9]/gi, "-")}.json`;
    const filepath = path.join(dir, filename);
    await fs.writeFile(filepath, JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }, null, 2), "utf-8");
    return filepath;
  } catch (err) {
    console.error("[audit-request] File-Save fehlgeschlagen:", err);
    return null;
  }
}

async function saveToNotion(payload: AuditRequest): Promise<{ saved: boolean; pageId?: string; reason?: string }> {
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
    const data = await res.json();
    return { saved: true, pageId: data.id };
  } catch (err) {
    return { saved: false, reason: err instanceof Error ? err.message : "Notion-Netzwerkfehler" };
  }
}

async function pushWhatsApp(payload: AuditRequest): Promise<{ sent: boolean; reason?: string }> {
  const PHONE = process.env.CALLMEBOT_PHONE;
  const KEY = process.env.CALLMEBOT_API_KEY;
  if (!PHONE || !KEY) {
    return { sent: false, reason: "CallMeBot-Credentials nicht gesetzt (CALLMEBOT_PHONE + CALLMEBOT_API_KEY)" };
  }

  const message =
    `🎯 Neue Audit-Anfrage\n\n` +
    `🌐 ${payload.url}\n` +
    `📧 ${payload.email}\n\n` +
    `👉 Audit erstellen + persönlich versenden.\n` +
    `Notion: https://www.notion.so/sabala (Status = Neu)`;

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(PHONE)}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(KEY)}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      const errText = await res.text();
      return { sent: false, reason: `CallMeBot ${res.status}: ${errText.slice(0, 200)}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : "CallMeBot-Netzwerkfehler" };
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

  const [fileResult, notionResult, whatsappResult] = await Promise.all([
    saveToFile(payload),
    saveToNotion(payload),
    pushWhatsApp(payload),
  ]);

  if (!notionResult.saved) console.warn("[audit-request] Notion:", notionResult.reason);
  if (!whatsappResult.sent) console.warn("[audit-request] WhatsApp:", whatsappResult.reason);

  const anyPersistence = notionResult.saved || !!fileResult;
  if (!anyPersistence) {
    console.error("[audit-request] Kein Save-Backend erreichbar. Payload verloren:", payload);
    return NextResponse.json(
      { error: "Speichern fehlgeschlagen. Versuch es bitte später." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Audit-Anfrage empfangen. Wir melden uns innerhalb von 48 Stunden.",
    storage: {
      file: !!fileResult,
      notion: notionResult.saved,
      whatsapp: whatsappResult.sent,
    },
  });
}
