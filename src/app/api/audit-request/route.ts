import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { auditDetailRows, auditNotionChildren, parseAuditRequest, type AuditRequest } from "@/lib/audit-request";
import { ipAus, jsonAus, siegelPruefen } from "@/lib/botschutz";
import { insertLead } from "@/lib/leads";
import { TELEFON_MELDUNG, telefonPruefen } from "@/lib/telefon";

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

/* Briefkasten fürs CRM (Turso, Tabelle leads), wie bei allen anderen Formularen: Von dort holt Sabala Mail die Anfrage.
   Vorher landeten Analyse-Anfragen nur in Notion und kamen nie im CRM an. Notion bleibt der zweite Speicher. */
async function saveToBriefkasten(payload: AuditRequest): Promise<boolean> {
  const q = payload.qualification;
  const [vorname = "", ...rest] = (q?.name ?? "").split(/\s+/).filter(Boolean);
  const OHNE = ["Ansprechpartner", "E-Mail", "Telefon", "Formularsprache", "Datenschutz-Einwilligung"]; // steht schon in eigenen Spalten
  const angaben = q ? auditDetailRows(payload).filter(([k]) => !OHNE.includes(k)).map(([k, v]) => `${k}: ${v}`) : [`Webseite: ${payload.url}`];
  try {
    return await insertLead({
      vorname,
      nachname: rest.join(" "),
      email: payload.email,
      unternehmen: q?.company ?? "",
      webseite: payload.url,
      anliegen: [q ? "Webseiten-Analyse" : "Webseiten-Audit aus dem Blog", ...angaben].join("\n"),
      quelle: "Webseiten-Analyse",
      telefon: payload.telefon,
    });
  } catch (err) {
    console.error("[audit-request] Briefkasten:", err);
    return false;
  }
}

async function pushNtfy(payload: AuditRequest, pageId?: string): Promise<{ sent: boolean; reason?: string; channel?: string }> {
  const q = payload.qualification;
  const telefon = payload.telefon ? `\n${payload.telefon}` : "";
  const summary = q
    ? `${q.company} · ${q.industry}\n${q.name} · ${q.role}\n${payload.email}${telefon}\n${payload.url || "Noch keine Webseite"}\n\n${q.goal.slice(0, 300)}`
    : `URL: ${payload.url}\nE-Mail: ${payload.email}${telefon}`;
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
  const body = await jsonAus(req);
  if (body === undefined) return NextResponse.json({ error: "Ungültiger Request-Body." }, { status: 400 });

  const parsed = parseAuditRequest(body);
  if (!parsed.data) return NextResponse.json({ error: Object.values(parsed.errors)[0], errors: parsed.errors }, { status: 400 });
  const payload = parsed.data;

  // Telefon: Pflicht in den deutschen Formularen, geprüft wie bei allen anderen (src/lib/telefon.ts). Vor dem Stempel,
  // damit ein Tippfehler keinen verbraucht. Das englische Formular hat kein Telefonfeld.
  if (payload.lang === "de") {
    const roh = (body as Record<string, unknown>).telefon;
    const t = telefonPruefen(typeof roh === "string" ? roh : "");
    if (!("nummer" in t)) return NextResponse.json({ error: TELEFON_MELDUNG[t.fehler], feld: "telefon", meldung: TELEFON_MELDUNG[t.fehler] }, { status: 422 });
    payload.telefon = t.nummer;
  }

  // Botschutz: Stempel und Obergrenze je Absender (src/lib/botschutz.ts). Diese Route legt Seiten in Notion an und klingelt auf dem Handy.
  const urteil = await siegelPruefen(ipAus(req), body);
  if (urteil !== "ok") {
    return NextResponse.json({ error: payload.lang === "en" ? "Please reload the page and try again." : "Bitte lade die Seite neu und versuch es noch einmal." }, { status: urteil === "zu-viele" ? 429 : 400 });
  }

  // Gespeichert ist die Anfrage, sobald sie in einem der Speicher steht: Briefkasten (CRM), Notion oder lokal als Datei.
  const [fileResult, notionResult, imBriefkasten] = await Promise.all([saveToFile(payload), saveToNotion(payload), saveToBriefkasten(payload)]);
  if (!notionResult.saved) console.warn("[audit-request] Notion:", notionResult.reason);
  if (!imBriefkasten) console.warn("[audit-request] Briefkasten: nicht gespeichert");
  if (!notionResult.saved && !fileResult && !imBriefkasten) {
    console.error("[audit-request] Kein Save-Backend erreichbar. Anfrage nicht gespeichert.");
    return NextResponse.json({ error: "Speichern fehlgeschlagen. Versuch es bitte später." }, { status: 500 });
  }

  // Notify only after durable storage; a failed notification must not lose a saved lead.
  const pushResult = await pushNtfy(payload, notionResult.pageId);
  if (!pushResult.sent) console.warn(`[audit-request] Push (${pushResult.channel || "none"}):`, pushResult.reason);
  return NextResponse.json({ success: true, message: payload.lang === "en" ? "Your enquiry has been received. Ilja will contact you personally by email." : "Deine Anfrage ist angekommen. Ilja meldet sich persönlich per E-Mail." });
}
