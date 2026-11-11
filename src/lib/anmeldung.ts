import { z } from "zod";
import { subscribeMooniVoice, subscribeToAcademy, subscribeWarteliste, subscribeWebinar } from "@/lib/activecampaign";
import { anmelden, bestaetigen, lastDerStunde, vermerken, type Bestaetigt } from "@/lib/einwilligung";
import { EINWILLIGUNG_VERSION, EINWILLIGUNGEN } from "@/lib/einwilligung-text";
import { getClient } from "@/lib/leads";
import { bestaetigungSenden, mailBereit } from "@/lib/mail";

/* ──────────────────────────────────────────────────────────────────────────
   Was alle Formulare gemeinsam haben: dieselben Felder, dasselbe Häkchen, derselbe Weg.

   Mit Häkchen: Nachweis speichern → Bestätigungsmail → Klick → erst dann der Eintrag
   ins Newsletter-Werkzeug (ActiveCampaign). Ohne Klick steht dort niemand.
   Ohne Häkchen: Die Anfrage landet nur im Briefkasten, Werbung gibt es keine.

   Was im Formular steht, hat irgendwer getippt, auch mit fremder Adresse. Darum:
   - Die Antwort ist immer dieselbe, egal ob die Adresse schon bestätigt ist. Niemand kann abfragen, wer Abonnent ist.
   - Ins Newsletter-Werkzeug gehen nur Daten aus der Datenbank, und nur nach einem Klick im Postfach.
   - Die Mail-Adresse besteht aus einem engen Zeichensatz. Kommas, Klammern und spitze Klammern würde ein Mailprogramm
     als mehrere Empfänger lesen, und die Sperre je Adresse liefe ins Leere.
   ────────────────────────────────────────────────────────────────────────── */

/* Namen: Buchstaben aller Sprachen, dazu Leerzeichen, Punkt, Bindestrich und Apostroph. Keine Adressen, keine Links:
   Der Name landet im CRM und nach dem Klick im Newsletter-Werkzeug, dort soll kein fremder Werbetext stehen. */
const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;

export const FELDER = {
  vorname: z.string().trim().min(1, "Vorname fehlt").max(80).regex(NAME, "Vorname ungueltig"),
  nachname: z.string().trim().min(1, "Nachname fehlt").max(80).regex(NAME, "Nachname ungueltig"),
  email: z.string().trim().toLowerCase().max(160).regex(/^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/, "E-Mail ungueltig"),
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

/** gesendet: Mail ist raus, oder an diese Adresse ging eben erst eine. fehlt: Datenbank oder Postfach nicht eingerichtet, Obergrenze erreicht oder Versand gescheitert. */
export type Bestaetigung = "gesendet" | "fehlt";

/* Zwei Obergrenzen je Stunde, beide in der Datenbank gezählt und geprüft, BEVOR etwas gespeichert oder verschickt wird.
   - je Absender (IP, bei IPv6 das Netz): Ein Einzelner kann weder das Postfach als Mailschleuder nutzen noch die
     Grenze für alle aufbrauchen noch die Datenbank füllen. 30 reicht für einen Seminarraum im selben WLAN.
   - über alle: schützt das Postfach, falls viele Absender zusammen angreifen. Echte Spitzen liegen weit darunter.
   Wer an eine Grenze stößt, bekommt dieselbe Antwort wie bei gestörtem Versand (Ausweichtext mit Kontaktadresse).
   Das verrät einem Angreifer wenig, und ein echter Mensch wartet nicht auf eine Mail, die nicht kommt.
   ponytail: feste Zahlen. Vor einer großen Aktion (Webinar-Start, Vortrag mit vielen Leuten im Raum) hochsetzen. */
const MAILS_JE_STUNDE = 120;
const JE_ABSENDER_JE_STUNDE = 30;

/* Adresse für den Link in der Mail. Fest, nicht aus der Anfrage gelesen: Sonst könnte jemand mit einem gefälschten
   Host-Kopf unsere Mail mit einem Link auf eine fremde Seite verschicken lassen. Vorschau-Bauten nehmen ihre eigene Adresse. */
const BASIS = (process.env.SEITE_URL || (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sabala-mentoring.com")).replace(/\/+$/, "");

/** Häkchen gesetzt: Nachweis festhalten und die Bestätigungsmail schicken. */
export async function einwilligungStarten(d: { formular: Formular; email: string; vorname: string; nachname: string; version?: number; ip: string }): Promise<Bestaetigung> {
  const db = getClient();
  const version = d.version ?? EINWILLIGUNG_VERSION;
  // Ohne Datenbank oder Postfach gar nicht erst anfangen: Dann entsteht auch kein Eintrag, zu dem nie eine Mail käme.
  if (!db || !mailBereit()) return "fehlt";
  try {
    const last = await lastDerStunde(db, d.ip);
    if (last.ausNetz >= JE_ABSENDER_JE_STUNDE || last.mails >= MAILS_JE_STUNDE) {
      console.error(`[einwilligung] Obergrenze erreicht (${last.ausNetz} aus diesem Netz, ${last.mails} Mails gesamt in der letzten Stunde), nichts gespeichert, nichts verschickt`);
      return "fehlt";
    }
    const stand = await anmelden(db, { email: d.email, vorname: d.vorname, nachname: d.nachname, quelle: d.formular, ip: d.ip, text: EINWILLIGUNGEN[version], version });
    // Auch wer schon bestätigt ist, bekommt nur eine Mail mit Link. Erst der Klick löst im Newsletter-Werkzeug etwas aus.
    // Ging eben erst eine Mail an diese Adresse, sieht die Antwort trotzdem gleich aus: Von außen lässt sich nichts über die Adresse ablesen.
    if (!stand.senden) return "gesendet";
    if (!(await bestaetigungSenden(d.email, `${BASIS}/api/newsletter/bestaetigen?t=${stand.token}`))) return "fehlt";
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
