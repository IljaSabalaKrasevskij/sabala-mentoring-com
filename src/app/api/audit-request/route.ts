import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { auditNotionChildren, parseAuditRequest, type AuditRequest } from "@/lib/audit-request";

export const runtime = "nodejs";

const isLocalDev = process.env.NODE_ENV !== "production" && !process.env.VERCEL;

async function saveToFile(payload: AuditRequest): Promise<string | null> {
  if (!isLocalDev) return null;
  try {
    const dir = process.env.AUDIT_REQUESTS_DIR ||
      path.join(process.env.HOME || "", "Documents", "_Obsidian_Vault", "04_Ressourcen", "Audit-Requests");
    await fs.mkdir(dir, { recursive: true });
    const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}_${payload.email.replace(/[^a-z0-9]/gi, "-").slice(0, 100)}.json`;
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
      signal: AbortSignal.timeout(10000),
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: {
          "URL": { url: payload.url || null },
          "Email": { email: payload.email },
          "Status": { select: { name: "Neu" } },
          "Eingegangen": { date: { start: new Date().toISOString() } },
        },
        ...(payload.qualification ? { children: auditNotionChildren(payload) } : {}),
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

async function pushNtfy(payload: AuditRequest, pageId?: string): Promise<{ sent: boolean; reason?: string; channel?: string }> {
  const q = payload.qualification;
  const summary = q
    ? `${q.company} · ${q.industry}\n${q.name} · ${q.role}\n${payload.email}\n${payload.url || "Noch keine Webseite"}\n\n${q.goal.slice(0, 300)}`
    : `URL: ${payload.url}\nEmail: ${payload.email}`;
  const notionLink = pageId ? `https://www.notion.so/${pageId.replaceAll("-", "")}` : "https://www.notion.so/5fd25d02df244473bbeadba79f88ae12";
  // Primary: ntfy.sh (Open-Source, Self-hosted-ready, robust)
  const NTFY_TOPIC = process.env.NTFY_TOPIC;
  const NTFY_SERVER = process.env.NTFY_SERVER || "https://ntfy.sh";

  if (NTFY_TOPIC) {
    // JSON-Mode: alles im Body als JSON, vermeidet HTTP-Header-Encoding-Issues mit UTF-8/Emojis
    const ntfyPayload = {
      topic: NTFY_TOPIC,
      title: "Neue Audit-Anfrage",
      message: `${summary}\n\nAlle Angaben in Notion ansehen.`,
      tags: ["dart", "email"],
      priority: 4,
      click: notionLink,
    };

    try {
      const res = await fetch(NTFY_SERVER, {
        method: "POST",
        signal: AbortSignal.timeout(8000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ntfyPayload),
      });
      if (!res.ok) {
        const errText = await res.text();
        return { sent: false, reason: `ntfy ${res.status}: ${errText.slice(0, 200)}`, channel: "ntfy" };
      }
      return { sent: true, channel: "ntfy" };
    } catch (err) {
      return { sent: false, reason: err instanceof Error ? err.message : "ntfy-Netzwerkfehler", channel: "ntfy" };
    }
  }

  // Fallback (Legacy): CallMeBot — wenn ntfy nicht konfiguriert ist, aber CallMeBot noch existiert
  const PHONE = process.env.CALLMEBOT_PHONE;
  const KEY = process.env.CALLMEBOT_API_KEY;
  if (PHONE && KEY) {
    const message = `Neue Analyse-Anfrage\n\n${summary}\n\n${notionLink}`;
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(PHONE)}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(KEY)}`;
      const res = await fetch(url, { method: "GET", signal: AbortSignal.timeout(8000) });
      if (!res.ok) {
        const errText = await res.text();
        return { sent: false, reason: `CallMeBot ${res.status}: ${errText.slice(0, 200)}`, channel: "callmebot" };
      }
      return { sent: true, channel: "callmebot" };
    } catch (err) {
      return { sent: false, reason: err instanceof Error ? err.message : "CallMeBot-Netzwerkfehler", channel: "callmebot" };
    }
  }

  return { sent: false, reason: "Kein Push-Channel konfiguriert (NTFY_TOPIC oder CALLMEBOT_*)" };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Request-Body." }, { status: 400 });
  }

  const parsed = parseAuditRequest(body);
  if (!parsed.data) return NextResponse.json({ error: Object.values(parsed.errors)[0], errors: parsed.errors }, { status: 400 });
  const payload = parsed.data;

  const [fileResult, notionResult] = await Promise.all([saveToFile(payload), saveToNotion(payload)]);
  if (!notionResult.saved) console.warn("[audit-request] Notion:", notionResult.reason);
  if (!notionResult.saved && !fileResult) {
    console.error("[audit-request] Kein Save-Backend erreichbar. Anfrage nicht gespeichert.");
    return NextResponse.json({ error: "Speichern fehlgeschlagen. Versuch es bitte später." }, { status: 500 });
  }

  // Notify only after durable storage; a failed notification must not lose a saved lead.
  const pushResult = await pushNtfy(payload, notionResult.pageId);
  if (!pushResult.sent) console.warn(`[audit-request] Push (${pushResult.channel || "none"}):`, pushResult.reason);
  return NextResponse.json({ success: true, message: payload.lang === "en" ? "Your enquiry has been received. Ilja will contact you personally by email." : "Deine Anfrage ist angekommen. Ilja meldet sich persönlich per E-Mail." });
}
