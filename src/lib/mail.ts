import nodemailer from "nodemailer";
import { EINWILLIGUNG_TEXT } from "@/lib/einwilligung-text";
import { anlassVon, bestaetigungHtml, bestaetigungText } from "@/lib/mail-html";

/* ──────────────────────────────────────────────────────────────────────────
   Bestätigungsmail für das Double-Opt-in. Geht über das eigene Postfach raus (SMTP),
   kein Newsletter-Dienst dazwischen. Die Mail enthält keine Werbung: nur die Bitte
   um Bestätigung, den Wortlaut der Einwilligung, die Signatur und das Impressum.
   Wie sie aussieht, steht in mail-html.ts (dasselbe Kleid wie der Newsletter).

   In der Mail steht nichts, was jemand ins Formular getippt hat, auch kein Name.
   Sonst könnte ein Fremder über unser Postfach eigenen Text an beliebige Adressen schicken.

   Env (Vercel, Production). Das Passwort trägt Ilja selbst ein, es steht in keiner Datei:
     SMTP_HOST   mail.sabala-mentoring.com
     SMTP_PORT   465 (Standard, verschlüsselt ab dem ersten Byte)
     SMTP_USER   Postfach, von dem die Mail kommt
     SMTP_PASS   Passwort dieses Postfachs
     MAIL_VON    optional, Standard: Sabala Mentoring <SMTP_USER>

   ponytail: ein Postfach reicht für die paar Bestätigungen am Tag. Wird es viel mehr,
   kommt hier ein Versanddienst hin (geplant: Amazon SES Frankfurt), der Rest bleibt.
   ────────────────────────────────────────────────────────────────────────── */

export const mailBereit = () => !!process.env.SMTP_HOST && !!process.env.SMTP_USER;

/** Text und HTML der Mail. Eigene Funktion, damit man sie ansehen kann, ohne etwas zu verschicken.
 *  quelle: das Formular aus der Datenbank. Leadmagnete wie das Startpaket bekommen ihren eigenen Betreff (anlassVon in mail-html.ts). */
export function bestaetigungsMail(link: string, quelle = "") {
  const anlass = anlassVon(quelle);
  return { betreff: anlass.betreff, text: bestaetigungText(link, EINWILLIGUNG_TEXT, anlass), html: bestaetigungHtml(link, EINWILLIGUNG_TEXT, anlass) };
}

/** Schickt die Bestätigungsmail. false, wenn kein Postfach eingerichtet ist. Wirft, wenn der Mailserver ablehnt. */
export async function bestaetigungSenden(an: string, link: string, quelle = ""): Promise<boolean> {
  if (!mailBereit()) return false;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER!;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_PASS ? { user, pass: process.env.SMTP_PASS } : undefined,
    connectionTimeout: 8000,
    socketTimeout: 10000,
  });
  const m = bestaetigungsMail(link, quelle);
  // Empfänger als fertige Adresse übergeben: So liest nodemailer die Zeichenkette nicht als Liste von Empfängern.
  await transport.sendMail({ from: process.env.MAIL_VON || `Sabala Mentoring <${user}>`, to: { name: "", address: an }, subject: m.betreff, text: m.text, html: m.html });
  return true;
}
