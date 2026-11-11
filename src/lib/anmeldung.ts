import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeLeadmagnet, subscribeMooniVoice, subscribeToAcademy, subscribeWarteliste, subscribeWebinar, tagContact } from "@/lib/activecampaign";
import { anmelden, bestaetigen, lastDerStunde, vermerken, type Bestaetigt } from "@/lib/einwilligung";
import { EINWILLIGUNG_VERSION, EINWILLIGUNGEN } from "@/lib/einwilligung-text";
import { getClient } from "@/lib/leads";
import { bestaetigungSenden, mailBereit } from "@/lib/mail";
import { FORMULARE, istLeadmagnet, istQuelle, LEADMAGNETE, NISCHEN, nischeVon, type Quelle } from "@/lib/quellen";
import { TELEFON_MELDUNG, telefonPruefen } from "@/lib/telefon";

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

/* Namen: Wörter aus Buchstaben aller Sprachen, getrennt durch Leerzeichen, Bindestrich oder Apostroph. Ein Punkt geht nur
   am Wortende (Dr. Hans, J. R.), nie mitten im Wort: Sonst käme „www.irgendwas.de“ als Vorname durch.
   Der Name landet im CRM und nach dem Klick im Newsletter-Werkzeug, dort soll kein fremder Werbetext stehen. */
const NAME = /^['’]?[\p{L}\p{M}]+\.?(?:[ '’-]+[\p{L}\p{M}]+\.?)*$/u;

/* Die Meldungen sind für Menschen geschrieben: Die Route schickt die erste zurück, das Formular zeigt sie am Feld an. */
export const FELDER = {
  vorname: z.string({ error: "Bitte gib deinen Vornamen an." }).trim().min(2, "Bitte gib deinen Vornamen an.").max(80, "Der Vorname ist zu lang.").regex(NAME, "Im Vornamen gehen nur Buchstaben."),
  nachname: z.string({ error: "Bitte gib deinen Nachnamen an." }).trim().min(2, "Bitte gib deinen Nachnamen an.").max(80, "Der Nachname ist zu lang.").regex(NAME, "Im Nachnamen gehen nur Buchstaben."),
  email: z.string({ error: "Bitte gib deine E-Mail-Adresse an." }).trim().toLowerCase().max(160, "Bitte prüf deine E-Mail-Adresse.").regex(/^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/, "Bitte prüf deine E-Mail-Adresse."),
  // Pflicht. Nur echte Nummern mit Ländervorwahl, heraus kommt eine Schreibweise (+49 1520 4817263). Regeln: src/lib/telefon.ts
  telefon: z.string({ error: TELEFON_MELDUNG.fehlt }).max(60, TELEFON_MELDUNG.ungueltig).transform((roh, ctx) => {
    const t = telefonPruefen(roh);
    if ("nummer" in t) return t.nummer;
    ctx.issues.push({ code: "custom", message: TELEFON_MELDUNG[t.fehler], input: roh });
    return z.NEVER;
  }),
  einwilligung: z.boolean().optional().default(false),
  // Für Formulare, deren Zweck die Mails sind (Newsletter, Warteliste, Webinar)
  einwilligungPflicht: z.literal(true, { error: "Bitte setz das Häkchen. Ohne dein Ja darf ich dir nicht schreiben." }),
  // Nummer des Satzes, der am Haekchen stand. Fehlt sie, gilt der aktuelle.
  einwilligungVersion: z.number().int().refine((v) => v in EINWILLIGUNGEN, "Einwilligungstext unbekannt").optional(),
  // Unsichtbares Feld gegen Roboter. Bewusst nicht per max(0) erzwungen: Sonst fängt die Prüfung den Roboter mit 422 ab
  // und verrät ihm, dass er aufgefallen ist. Gefüllt quittiert die Route still mit 200 und speichert nichts.
  fax: z.string().max(200).optional().default(""),
};

/** Prüft die Eingabe. Wo ein Feld keine eigene Meldung hat, steht der allgemeine Hinweis, nie englischer Standardtext. */
export const eingabePruefen = <S extends z.ZodType>(schema: S, json: unknown) => schema.safeParse(json, { error: () => "Bitte prüf deine Angaben." });

/** Antwort bei falscher Eingabe: das erste beanstandete Feld mit seiner Meldung. */
export function eingabeAbsage(fehler: z.ZodError) {
  const erster = fehler.issues[0];
  return NextResponse.json({ ok: false, reason: "validation", feld: String(erster?.path[0] ?? ""), meldung: erster?.message ?? "Bitte prüf deine Angaben." }, { status: 422 });
}

/** Aus welchem Formular oder von welchem Leadmagneten die Einwilligung kam (src/lib/quellen.ts). Steht als Quelle im Nachweis und entscheidet, was nach dem Klick passiert. */
export type Formular = Quelle;

/* Der Eintrag ins Newsletter-Werkzeug je Formular. Tag startet dort die passende Mail-Strecke (Willkommen, Webinar-Zugang).
   Leadmagnete stehen nicht hier: Sie laufen alle gleich, auf die Akademie-Liste mit dem Tag „Leadmagnet: <Name>“. */
const NACH_KLICK: Record<keyof typeof FORMULARE, (b: Bestaetigt) => Promise<"ok" | "skipped" | "error">> = {
  "Akademie-Newsletter": (b) => subscribeToAcademy(b.email, b.vorname, b.nachname),
  Kontaktformular: (b) => subscribeToAcademy(b.email, b.vorname, b.nachname),
  "Warteliste Kurs": (b) => subscribeWarteliste(b.email, b.vorname, "Warteliste Second Brain Kurs", b.nachname),
  "Warteliste Webinar": (b) => subscribeWarteliste(b.email, b.vorname, "Warteliste Webinar", b.nachname),
  "Webinar Second Brain": (b) => subscribeWebinar(b.email, b.vorname, b.nachname),
  "Mooni Voice": (b) => subscribeMooniVoice(b.email, b.vorname, b.nachname),
};

async function insWerkzeug(b: Bestaetigt, formular: string): Promise<void> {
  const db = getClient();
  if (!istQuelle(formular)) return;
  const magnet = istLeadmagnet(formular) ? LEADMAGNETE[formular].name : null;
  const nische = nischeVon(formular);
  let stand: string;
  try {
    stand = magnet ? await subscribeLeadmagnet(b.email, b.vorname, b.nachname, magnet) : await NACH_KLICK[formular as keyof typeof FORMULARE](b);
    // Die Nische als eigener Tag: Daran lassen sich im Newsletter-Werkzeug Gruppen für passende Mails bilden.
    if (stand === "ok" && nische && (await tagContact(b.email, `Nische: ${NISCHEN[nische]}`)) !== "ok") stand = "ok, aber der Nische-Tag fehlt";
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

/** Klick auf den Link in der Mail. Gibt die Quelle des bestätigten Formulars zurück (auch beim zweiten Klick), nach ihr richtet sich die Dankeseite.
 *  null: Link unbekannt oder abgemeldet. */
export async function einwilligungBestaetigen(token: string, ip: string): Promise<string | null> {
  const db = getClient();
  if (!db) return null;
  const b = await bestaetigen(db, token, ip);
  if (!b) return null;
  if (b.neu) await insWerkzeug(b, b.quelle);
  return b.quelle;
}
