import nodemailer from "nodemailer";
import { EINWILLIGUNG_TEXT } from "@/lib/einwilligung-text";

/* ──────────────────────────────────────────────────────────────────────────
   Bestätigungsmail für das Double-Opt-in. Geht über das eigene Postfach raus (SMTP),
   kein Newsletter-Dienst dazwischen. Die Mail enthält keine Werbung: nur die Bitte
   um Bestätigung, den Wortlaut der Einwilligung und das Impressum.

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

const maskiert = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Text und HTML der Mail. Eigene Funktion, damit man sie ansehen kann, ohne etwas zu verschicken. */
export function bestaetigungsMail(link: string) {
  const hallo = "Hallo,";
  const text = [
    hallo,
    "",
    "bitte bestätige kurz deine Anmeldung zum Sabala Newsletter:",
    "",
    link,
    "",
    "Damit sagst du:",
    `„${EINWILLIGUNG_TEXT}“`,
    "",
    "Du hast dich nicht eingetragen? Dann lösch diese Mail einfach. Ohne deinen Klick bekommst du nichts von mir.",
    "",
    "Ilja Krasevskij",
    "Sabala Mentoring",
    "",
    "SABALA MENTORING LLC, 30 N Gould St Ste N, Sheridan, WY 82801, USA",
    "Impressum: https://sabala-mentoring.com/impressum",
    "Datenschutz: https://sabala-mentoring.com/datenschutz",
  ].join("\n");
  const html = `<!doctype html><html lang="de"><body style="margin:0;padding:0;background:#faf8f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1814;font-size:16px;line-height:1.6;">
<tr><td style="padding-bottom:20px;font-family:Georgia,'Times New Roman',serif;font-size:22px;">Sabala Mentoring</td></tr>
<tr><td style="padding-bottom:16px;">${maskiert(hallo)}</td></tr>
<tr><td style="padding-bottom:24px;">bitte bestätige kurz deine Anmeldung zum Sabala Newsletter:</td></tr>
<tr><td style="padding-bottom:28px;"><a href="${maskiert(link)}" style="display:inline-block;background:#1a1814;color:#faf8f5;text-decoration:none;font-weight:600;padding:14px 26px;border-radius:4px;">Anmeldung bestätigen</a></td></tr>
<tr><td style="padding-bottom:8px;color:#5c564b;font-size:15px;">Damit sagst du:</td></tr>
<tr><td style="padding:0 0 24px 14px;border-left:3px solid #b8963e;font-size:15px;">„${maskiert(EINWILLIGUNG_TEXT)}“</td></tr>
<tr><td style="padding-bottom:24px;color:#5c564b;font-size:15px;">Du hast dich nicht eingetragen? Dann lösch diese Mail einfach. Ohne deinen Klick bekommst du nichts von mir.</td></tr>
<tr><td style="padding-bottom:28px;">Ilja Krasevskij<br>Sabala Mentoring</td></tr>
<tr><td style="border-top:1px solid #e4ded3;padding-top:16px;color:#5c564b;font-size:13px;line-height:1.5;">SABALA MENTORING LLC, 30 N Gould St Ste N, Sheridan, WY 82801, USA<br>
<a href="https://sabala-mentoring.com/impressum" style="color:#5c564b;">Impressum</a> · <a href="https://sabala-mentoring.com/datenschutz" style="color:#5c564b;">Datenschutz</a><br>
Geht der Knopf nicht? Dann kopiere diese Adresse in deinen Browser:<br><span style="word-break:break-all;">${maskiert(link)}</span></td></tr>
</table></td></tr></table></body></html>`;
  return { betreff: "Bitte bestätige deine Anmeldung", text, html };
}

/** Schickt die Bestätigungsmail. false, wenn kein Postfach eingerichtet ist. Wirft, wenn der Mailserver ablehnt. */
export async function bestaetigungSenden(an: string, link: string): Promise<boolean> {
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
  const m = bestaetigungsMail(link);
  // Empfänger als fertige Adresse übergeben: So liest nodemailer die Zeichenkette nicht als Liste von Empfängern.
  await transport.sendMail({ from: process.env.MAIL_VON || `Sabala Mentoring <${user}>`, to: { name: "", address: an }, subject: m.betreff, text: m.text, html: m.html });
  return true;
}
