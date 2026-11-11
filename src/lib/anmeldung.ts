import { z } from "zod";
import { subscribeMooniVoice, subscribeToAcademy, subscribeWarteliste, subscribeWebinar } from "@/lib/activecampaign";
import { anmelden, bestaetigen, vermerken, type Bestaetigt } from "@/lib/einwilligung";
import { EINWILLIGUNG_VERSION, EINWILLIGUNGEN } from "@/lib/einwilligung-text";
import { getClient } from "@/lib/leads";
import { bestaetigungSenden } from "@/lib/mail";

/* ──────────────────────────────────────────────────────────────────────────
   Was alle Formulare gemeinsam haben: dieselben Felder, dasselbe Häkchen, derselbe Weg.

   Mit Häkchen: Nachweis speichern → Bestätigungsmail → Klick → erst dann der Eintrag
   ins Newsletter-Werkzeug (ActiveCampaign). Ohne Klick steht dort niemand.
   Ohne Häkchen: Die Anfrage landet nur im Briefkasten, Werbung gibt es keine.
   ────────────────────────────────────────────────────────────────────────── */

export const FELDER = {
  vorname: z.string().trim().min(1, "Vorname fehlt").max(80),
  nachname: z.string().trim().min(1, "Nachname fehlt").max(80),
  email: z.string().trim().max(160).refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "E-Mail ungueltig"),
  // freiwillig: Ziffern und die ueblichen Trennzeichen, damit hier kein Freitext landet
  telefon: z.string().trim().max(40).refine((v) => v === "" || /^[+0-9 ()/.-]{5,40}$/.test(v), "Telefon ungueltig").optional().default(""),
  einwilligung: z.boolean().optional().default(false),
  // Nummer des Satzes, der am Haekchen stand. Fehlt sie, gilt der aktuelle.
  einwilligungVersion: z.number().int().refine((v) => v in EINWILLIGUNGEN, "Einwilligungstext unbekannt").optional(),
};

/** Aus welchem Formular die Einwilligung kam. Steht als Quelle im Nachweis und entscheidet, was nach dem Klick passiert. */
export type Formular = "Akademie-Newsletter" | "Warteliste Kurs" | "Warteliste Webinar" | "Webinar Second Brain" | "Mooni Voice" | "Kontaktformular";

/* Der Eintrag ins Newsletter-Werkzeug je Formular. Tag startet dort die passende Mail-Strecke (Willkommen, Webinar-Zugang). */
const NACH_KLICK: Record<Formular, (b: Bestaetigt) => Promise<"ok" | "skipped" | "error">> = {
  "Akademie-Newsletter": (b) => subscribeToAcademy(b.email, b.vorname, b.nachname),
  Kontaktformular: (b) => subscribeToAcademy(b.email, b.vorname, b.nachname),
  "Warteliste Kurs": (b) => subscribeWarteliste(b.email, b.vorname, "Warteliste Second Brain Kurs", b.nachname),
  "Warteliste Webinar": (b) => subscribeWarteliste(b.email, b.vorname, "Warteliste Webinar", b.nachname),
  "Webinar Second Brain": (b) => subscribeWebinar(b.email, b.vorname, b.nachname),
  "Mooni Voice": (b) => subscribeMooniVoice(b.email, b.vorname, b.nachname),
};

async function insWerkzeug(b: Bestaetigt, formular: string): Promise<void> {
  const db = getClient();
  const tun = NACH_KLICK[formular as Formular];
  if (!tun) return;
  let stand: string;
  try {
    stand = await tun(b);
  } catch (err) {
    console.error("[einwilligung] Newsletter-Werkzeug nicht erreichbar:", err);
    stand = "error";
  }
  // Der Nachweis steht unabhaengig davon. Der Vermerk zeigt, ob der Eintrag nachgeholt werden muss.
  if (db) await vermerken(db, b.einwilligung_id, "werkzeug", `${formular}: ${stand}`).catch(() => {});
}

/** gesendet: Mail ist raus. wartet: eben erst eine geschickt. aktiv: schon bestätigt. fehlt: Datenbank oder Postfach nicht eingerichtet, oder der Versand ist gescheitert. */
export type Bestaetigung = "gesendet" | "wartet" | "aktiv" | "fehlt";

/* Adresse für den Link in der Mail. Fest, nicht aus der Anfrage gelesen: Sonst könnte jemand mit einem gefälschten
   Host-Kopf unsere Mail mit einem Link auf eine fremde Seite verschicken lassen. Vorschau-Bauten nehmen ihre eigene Adresse. */
const BASIS = (process.env.SEITE_URL || (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sabala-mentoring.com")).replace(/\/+$/, "");

/** Häkchen gesetzt: Nachweis festhalten und die Bestätigungsmail schicken. */
export async function einwilligungStarten(d: { formular: Formular; email: string; vorname: string; nachname: string; version?: number; ip: string }): Promise<Bestaetigung> {
  const db = getClient();
  const version = d.version ?? EINWILLIGUNG_VERSION;
  if (!db) return "fehlt";
  try {
    const stand = await anmelden(db, { email: d.email, vorname: d.vorname, nachname: d.nachname, quelle: d.formular, ip: d.ip, text: EINWILLIGUNGEN[version], version });
    if (stand.status === "aktiv") {
      // Schon bestätigt: Was dieses Formular im Newsletter-Werkzeug auslöst (Warteliste, Mooni), darf gleich passieren.
      await insWerkzeug({ email: d.email, vorname: d.vorname, nachname: d.nachname, quelle: d.formular, einwilligung_id: stand.id, neu: false }, d.formular);
      return "aktiv";
    }
    if (!stand.senden) return "wartet";
    if (!(await bestaetigungSenden(d.email, d.vorname, `${BASIS}/api/newsletter/bestaetigen?t=${stand.token}`))) return "fehlt";
    await vermerken(db, stand.id, "mail");
    return "gesendet";
  } catch (err) {
    console.error("[einwilligung] Anmeldung oder Versand gescheitert:", err);
    return "fehlt";
  }
}

/** Klick auf den Link in der Mail. true: bestätigt (auch beim zweiten Klick). false: Link unbekannt oder abgemeldet. */
export async function einwilligungBestaetigen(token: string, ip: string): Promise<boolean> {
  const db = getClient();
  if (!db) return false;
  const b = await bestaetigen(db, token, ip);
  if (!b) return false;
  if (b.neu) await insWerkzeug(b, b.quelle);
  return true;
}

export const ipAus = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
