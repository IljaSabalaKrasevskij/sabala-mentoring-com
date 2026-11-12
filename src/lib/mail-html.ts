/* ──────────────────────────────────────────────────────────────────────────
   Mails im Kleid des Newsletters: dunkler Kopf mit Logo und Adler, heller Inhalt, dunkler Fuß mit Signatur und Foto.
   Dieselben Bausteine wie in der Newsletter-Vorlage (jüngste Newsletter_FINAL.html im Newsletter-Ordner),
   damit Anmeldung, Bestätigung und Newsletter wie aus einem Guss aussehen.

   Regeln für Mail-HTML: Tabellen statt Layout-CSS, alle Stile direkt am Element (viele Mailprogramme werfen <style> weg),
   Bilder mit fester Adresse auf sabala-mentoring.com und nie eingebettet. Schriften mit Ersatz, weil Mailprogramme
   fremde Schriften selten laden: Instrument Serif → Georgia, Satoshi → Systemschrift, Geist Mono → Courier.
   Kein Text unter 12 px, Fließtext 16 px: Die Leser sind oft über 50.

   Der Adler im Kopf bewegt sich (GIF). Outlook am PC zeigt nur das erste Bild, darum beginnt die Folge mit dem Blick nach vorn.

   Ohne App-Importe, damit mail-html.test.mjs und die Vorschau die Datei direkt mit Node laden können.
   ────────────────────────────────────────────────────────────────────────── */

const SEITE = "https://sabala-mentoring.com";
const ADLER = `${SEITE}/newsletter/adler-blick.gif`; // 144 px, bewegt: schaut nach links, nach vorn, nach rechts
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const SANS = "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "'Geist Mono', 'Courier New', monospace";
const DUNKEL = "#0A0806";
const GOLD = "#B8963E";
const GOLD_HELL = "#D4AE5A";
const TEXT = "#2E2B26";

export const maskiert = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const zeileMono = (t: string, farbe = GOLD) =>
  `<div style="font-family:${MONO}; font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:${farbe};">${t}</div>`;

/** Kopf, Inhalt, Fuß. inhalt sind fertige Tabellenzeilen (<tr>…</tr>), zeile steht klein unter dem Schriftzug. adlerImKopf: der kleine Adler rechts oben, wie im Newsletter.
 *  abmelden: Adresse der Abmelde-Seite. Gesetzt bei allem, was nicht nur bestätigt oder ausliefert (Strecken, Newsletter). */
export function mailRahmen({ titel, vorschau, zeile, inhalt, adlerImKopf = true, abmelden }: { titel: string; vorschau: string; zeile: string; inhalt: string; adlerImKopf?: boolean; abmelden?: string }): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${maskiert(titel)}</title>
</head>
<body style="margin:0; padding:0; background-color:#FAF8F5; font-family:${SANS}; color:${TEXT};">
<div style="display:none; font-size:1px; color:#FAF8F5; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">${maskiert(vorschau)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#FAF8F5;">
  <tr><td align="center" style="padding:30px 15px;">
  <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%; max-width:600px; background-color:#FFFFFF; border:1px solid #ECE7D9;">

    <tr>
      <td style="background-color:${DUNKEL}; padding:22px 28px 20px 28px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td valign="middle">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td valign="middle"><img src="${SEITE}/images/logo-sabala-mentoring.png" alt="" width="38" height="38" style="display:block; border:0;"></td>
                  <td valign="middle" style="padding-left:10px;"><div style="font-family:${SERIF}; font-size:20px; color:${GOLD_HELL}; letter-spacing:0.05em; white-space:nowrap;">SABALA MENTORING</div></td>
                </tr>
              </table>
              <div style="margin-top:12px;">${zeileMono(maskiert(zeile), "#9A9288")}</div>
            </td>
            ${adlerImKopf ? `<td valign="middle" align="right" width="72"><img src="${ADLER}" alt="Der Adler von Sabala" width="64" height="64" style="display:block; width:64px; height:64px; border:0;"></td>` : ""}
          </tr>
        </table>
      </td>
    </tr>
${inhalt}
    <tr>
      <td style="background-color:${DUNKEL}; padding:30px 28px 26px 28px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td valign="middle" width="78"><img src="${SEITE}/newsletter/ilja-profil-studio.jpg" alt="Ilja Krasevskij" width="66" height="66" style="display:block; width:66px; height:66px; border:0;"></td>
            <td valign="middle" style="padding-left:4px;">
              <div style="font-family:${SANS}; font-size:14px; color:#A09C95; line-height:1.4;">Alles Liebe,</div>
              <div style="font-family:${SERIF}; font-size:26px; font-style:italic; color:${GOLD_HELL}; line-height:1.2;">Sabala</div>
              <div style="margin-top:6px; font-family:${MONO}; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; color:#8A8378; white-space:nowrap;">Ilja Krasevskij &middot; Tbilisi</div>
            </td>
          </tr>
        </table>
        <div style="margin-top:24px; padding-top:18px; border-top:1px solid #2A251D; font-family:${SANS}; font-size:13px; line-height:1.7; color:#A09C95;">
          SABALA MENTORING LLC, 30 N Gould St Ste N, Sheridan, WY 82801, USA<br>
          <a href="mailto:sabala@sabala-mentoring.com" style="color:#A09C95; text-decoration:underline;">sabala@sabala-mentoring.com</a>
          <span style="color:#5C574F; padding:0 6px;">&middot;</span>
          <a href="${SEITE}/impressum" style="color:#A09C95; text-decoration:underline;">Impressum</a>
          <span style="color:#5C574F; padding:0 6px;">&middot;</span>
          <a href="${SEITE}/datenschutz" style="color:#A09C95; text-decoration:underline;">Datenschutz</a>${
            abmelden
              ? `<br>Du bekommst diese Mail, weil du dich auf sabala-mentoring.com eingetragen hast.
          <a href="${maskiert(abmelden)}" style="color:#D9D3C9; text-decoration:underline;">Abmelden</a> geht jederzeit.`
              : ""
          }
        </div>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Wofür jemand bestätigt: Betreff, kleine Zeile im Kopf, Vorschauzeile und ein eigener Satz. Ohne satz gilt der allgemeine Text. */
export type Anlass = { betreff: string; zeile: string; vorschau: string; satz?: string };

const NEWSLETTER: Anlass = { betreff: "Bitte bestätige deine Anmeldung", zeile: "Newsletter · Anmeldung", vorschau: "Ein Klick fehlt noch, dann bist du dabei." };

/* Leadmagnete nennen in der Mail, was nach dem Klick kommt, damit man die Mail wiedererkennt.
   Nur feste Texte, gewählt über das Kürzel aus der Datenbank, nie etwas aus dem Formular. Keine Werbung, nur das angeforderte Paket.
   Der Satz muss im HTML (Knopf oben) und im Text (Link darunter) passen, darum ohne „oben“ und „unten“. */
const ANLAESSE: Record<string, Anlass> = {
  "startpaket-claude-code": {
    betreff: "Dein Claude-Code-Startpaket: ein Klick fehlt noch",
    zeile: "Claude-Code-Startpaket",
    vorschau: "Ein Klick, dann liegt dein Startpaket bereit.",
    satz: "schön, dass du das Claude-Code-Startpaket willst. Bestätige bitte kurz, dass diese Adresse dir gehört. Der Klick bringt dich direkt zum Download.",
  },
  "skill-paket": {
    betreff: "Dein Skill-Paket: ein Klick fehlt noch",
    zeile: "Skill-Paket",
    vorschau: "Ein Klick, dann liegen deine vier Skills bereit.",
    satz: "schön, dass du das Skill-Paket willst. Bestätige bitte kurz, dass diese Adresse dir gehört. Der Klick bringt dich direkt zum Download.",
  },
};

export const anlassVon = (quelle: string): Anlass => (Object.prototype.hasOwnProperty.call(ANLAESSE, quelle) ? ANLAESSE[quelle] : NEWSLETTER);

/**
 * Die Bestätigungsmail (Double-Opt-in). Sie enthält keine Werbung und nichts, was jemand ins Formular getippt hat:
 * nur die Bitte um den Klick, den Wortlaut der Einwilligung, die Signatur und das Impressum.
 */
export function bestaetigungHtml(link: string, wortlaut: string, anlass: Anlass = NEWSLETTER): string {
  const adresse = maskiert(link);
  const inhalt = `
    <tr>
      <td align="center" style="background-color:${DUNKEL}; padding:10px 24px 42px 24px;">
        <img src="${ADLER}" alt="Der Adler von Sabala" width="96" height="96" style="display:block; width:96px; height:96px; border:0; margin:0 auto;">
        <div style="margin-top:22px;">${zeileMono("Schritt 2 von 2", GOLD_HELL)}</div>
        <h1 style="margin:14px 0 0 0; font-family:${SERIF}; font-size:38px; line-height:1.12; color:#FAF8F5; font-weight:400;">
          Fast geschafft.<br>
          <span style="font-style:italic; color:${GOLD_HELL};">Ein Klick fehlt noch.</span>
        </h1>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px auto 0 auto;">
          <tr>
            <td align="center" bgcolor="${GOLD_HELL}" style="background-color:${GOLD_HELL}; border-radius:999px;">
              <a href="${adresse}" style="display:inline-block; padding:17px 34px; font-family:${MONO}; font-size:15px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${DUNKEL}; text-decoration:none; border-radius:999px;">Jetzt bestätigen</a>
            </td>
          </tr>
        </table>
        <div style="margin-top:16px; font-family:${SANS}; font-size:14px; line-height:1.5; color:#B5AEA2;">Ein Klick genügt.</div>
      </td>
    </tr>
    <tr>
      <td style="padding:38px 28px 0 28px; font-size:16px; line-height:1.65; color:${TEXT};">
        <p style="margin:0 0 16px 0;">Hey du,</p>
        <p style="margin:0 0 30px 0;">${anlass.satz ? maskiert(anlass.satz) : "schön, dass du dabei sein willst. Bestätige oben bitte kurz, dass diese Adresse dir gehört. Erst danach schreibe ich dir."}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 28px 0 28px;">
        ${zeileMono("Dazu sagst du Ja")}
        <div style="margin:12px 0 26px 0; padding:16px 18px; background-color:#F7F3EA; border-left:3px solid ${GOLD}; font-size:16px; line-height:1.6; color:${TEXT};">„${maskiert(wortlaut)}“</div>
      </td>
    </tr>
    <tr>
      <td style="padding:0 28px 36px 28px; font-size:15px; line-height:1.65; color:#5C564B;">
        <p style="margin:0 0 16px 0;">Du hast dich nicht eingetragen? Dann lösch diese Mail einfach. Ohne deinen Klick bekommst du nichts von mir.</p>
        <p style="margin:0; font-size:13px; line-height:1.6;">Geht der Knopf nicht? Dann kopiere diese Adresse in deinen Browser:<br><span style="word-break:break-all; color:#7A7268;">${adresse}</span></p>
      </td>
    </tr>`;
  return mailRahmen({ titel: anlass.betreff, vorschau: anlass.vorschau, zeile: anlass.zeile, inhalt, adlerImKopf: false });
}

/** Dieselbe Mail als reiner Text, für Mailprogramme ohne HTML und für Spamfilter, die beide Fassungen erwarten. */
export function bestaetigungText(link: string, wortlaut: string, anlass: Anlass = NEWSLETTER): string {
  return [
    "Fast geschafft. Ein Klick fehlt noch.",
    "",
    "Hey du,",
    "",
    anlass.satz ?? "schön, dass du dabei sein willst. Bestätige bitte kurz, dass diese Adresse dir gehört. Erst danach schreibe ich dir:",
    "",
    link,
    "",
    "Dazu sagst du Ja:",
    `„${wortlaut}“`,
    "",
    "Du hast dich nicht eingetragen? Dann lösch diese Mail einfach. Ohne deinen Klick bekommst du nichts von mir.",
    "",
    ...FUSS_TEXT,
  ].join("\n");
}

/** Signatur und Impressum der Text-Fassungen, wie im Fuß der HTML-Mails. */
const FUSS_TEXT = [
  "Alles Liebe,",
  "Sabala",
  "Ilja Krasevskij, Tbilisi",
  "",
  "SABALA MENTORING LLC, 30 N Gould St Ste N, Sheridan, WY 82801, USA",
  "sabala@sabala-mentoring.com",
  "Impressum: https://sabala-mentoring.com/impressum",
  "Datenschutz: https://sabala-mentoring.com/datenschutz",
];

/* ──────────────────────────────────────────────────────────────────────────
   Download-Mail: Wer ein Paket angefordert hat (Startpaket), bekommt es nach dem ersten Klick in der Bestätigungsmail
   noch einmal per Mail zum Aufheben. Verschickt von der Webseite über das eigene Postfach (mail.ts), kein Newsletter-Dienst.
   Feste Texte je Leadmagnet, gewählt über das Kürzel aus der Datenbank. Ein neues Paket: hier ein Eintrag in DOWNLOADS.
   ────────────────────────────────────────────────────────────────────────── */

export type Download = {
  betreff: string;
  zeile: string;
  vorschau: string;
  kopf: string;
  titel: string;
  /** Wohin der Knopf führt: die Dankeseite mit dem Download, nie die Datei selbst. Ein Link direkt auf das ZIP
   *  öffnet aus vielen Mailprogrammen einen leeren Tab (Safari, Apps am Handy), der Download läuft dann unbemerkt. */
  seite: string;
  groesse: string;
  absatz: string;
  schritte: string[];
  knopf: string;
  tipp: string;
  mehr: { text: string; link: string; anzeige: string };
};

const DOWNLOADS: Record<string, Download> = {
  "startpaket-claude-code": {
    betreff: "Dein Claude-Code-Startpaket",
    zeile: "Claude-Code-Startpaket",
    vorschau: "Hier ist dein Ordner: Anleitung, Spickzettel, zwei Vorlagen und zehn Skills.",
    kopf: "Dein Startpaket",
    titel: "Hier ist dein Startpaket.",
    seite: `${SEITE}/claude-code/startpaket/danke`,
    groesse: "Ein Ordner, 11 KB, für Mac und Windows.",
    knopf: "Zum Download",
    absatz: "hier ist dein Claude-Code-Startpaket noch einmal zum Aufheben. Im Ordner liegen fünf kurze Anleitungen, zwei CLAUDE.md-Vorlagen und zehn Skills, die ich selbst nutze.",
    schritte: [
      "Öffne zuerst die Datei „00 Start hier“. Dort steht, in welcher Reihenfolge du vorgehst.",
      "Installier Claude Code mit „01 Installation“. Rechne mit zehn Minuten.",
      "Kopier die Vorlage aus „vorlagen/projekt“ in deinen Projektordner und füll die Lücken aus.",
    ],
    tipp: "Nimm dir für den Anfang nur einen der zehn Skills. Den für die Aufgabe, die du am häufigsten erledigst.",
    mehr: { text: "Alle Anleitungen zu Claude Code auf Deutsch findest du unter", link: `${SEITE}/claude-code`, anzeige: "sabala-mentoring.com/claude-code" },
  },
  "skill-paket": {
    betreff: "Dein Skill-Paket",
    zeile: "Skill-Paket",
    vorschau: "Hier sind deine vier Skills: menschlich schreiben, einfach erklären, schön gestalten, vor dem Livegang prüfen.",
    kopf: "Dein Skill-Paket",
    titel: "Hier ist dein Skill-Paket.",
    seite: `${SEITE}/claude-code/skill-paket/danke`,
    groesse: "Ein Ordner, 44 KB, für Claude Code und die Claude-App.",
    knopf: "Zum Download",
    absatz: "hier ist dein Skill-Paket noch einmal zum Aufheben. Im Ordner liegen vier Skills für Claude, zwei kleine Prüfskripte und eine Anleitung für Claude Code und die Claude-App.",
    schritte: [
      "Öffne zuerst die Datei „00 Start hier“. Dort steht, wie du die Skills installierst.",
      "Trag in „meine-stimme.md“ ein, wie du schreibst. Ab dann klingt Claude nach dir.",
      "Lass Claude einen Newsletter schreiben und prüf ihn mit „pruefen.py“.",
    ],
    tipp: "Fang mit menschlich-schreiben an. Den Unterschied merkst du schon beim ersten Text.",
    mehr: { text: "Weitere kostenlose Hilfen findest du unter", link: `${SEITE}/ressourcen`, anzeige: "sabala-mentoring.com/ressourcen" },
  },
};

/** Das Paket zu einer Quelle. null: Diese Quelle hat kein Paket, dann geht keine Download-Mail raus. */
export const downloadVon = (quelle: string): Download | null => (Object.prototype.hasOwnProperty.call(DOWNLOADS, quelle) ? DOWNLOADS[quelle] : null);

export function downloadHtml(d: Download): string {
  const seite = maskiert(d.seite);
  const schritt = (n: number, t: string) =>
    `<tr><td valign="top" width="34" style="padding:0 0 14px 0; font-family:${MONO}; font-size:16px; font-weight:700; color:${GOLD};">${n}</td><td style="padding:0 0 14px 0; font-family:${SANS}; font-size:16px; line-height:1.6; color:${TEXT};">${maskiert(t)}</td></tr>`;
  const inhalt = `
    <tr>
      <td align="center" style="background-color:${DUNKEL}; padding:10px 24px 42px 24px;">
        <img src="${ADLER}" alt="Der Adler von Sabala" width="96" height="96" style="display:block; width:96px; height:96px; border:0; margin:0 auto;">
        <div style="margin-top:22px;">${zeileMono(maskiert(d.kopf), GOLD_HELL)}</div>
        <h1 style="margin:14px 0 0 0; font-family:${SERIF}; font-size:38px; line-height:1.12; color:#FAF8F5; font-weight:400;">
          ${maskiert(d.titel)}<br>
          <span style="font-style:italic; color:${GOLD_HELL};">Viel Freude damit.</span>
        </h1>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px auto 0 auto;">
          <tr>
            <td align="center" bgcolor="${GOLD_HELL}" style="background-color:${GOLD_HELL}; border-radius:999px;">
              <a href="${seite}" style="display:inline-block; padding:17px 34px; font-family:${MONO}; font-size:15px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${DUNKEL}; text-decoration:none; border-radius:999px;">${maskiert(d.knopf)}</a>
            </td>
          </tr>
        </table>
        <div style="margin-top:16px; font-family:${SANS}; font-size:14px; line-height:1.5; color:#B5AEA2;">${maskiert(d.groesse)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:38px 28px 0 28px; font-size:16px; line-height:1.65; color:${TEXT};">
        <p style="margin:0 0 16px 0;">Hey du,</p>
        <p style="margin:0 0 26px 0;">${maskiert(d.absatz)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 28px 0 28px;">
        ${zeileMono("So fängst du an")}
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:14px 0 12px 0;">
          ${d.schritte.map((t, i) => schritt(i + 1, t)).join("\n          ")}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 28px 36px 28px; font-size:16px; line-height:1.65; color:${TEXT};">
        <div style="margin:0 0 26px 0; padding:16px 18px; background-color:#F7F3EA; border-left:3px solid ${GOLD};"><strong>Mein Tipp:</strong> ${maskiert(d.tipp)}</div>
        <p style="margin:0; font-size:15px; color:#5C564B;">P.S. ${maskiert(d.mehr.text)} <a href="${maskiert(d.mehr.link)}" style="color:#7A5C18; text-decoration:underline;">${maskiert(d.mehr.anzeige)}</a>.</p>
      </td>
    </tr>`;
  return mailRahmen({ titel: d.betreff, vorschau: d.vorschau, zeile: d.zeile, inhalt, adlerImKopf: false });
}

/** Dieselbe Download-Mail als reiner Text. */
export function downloadText(d: Download): string {
  return [
    `${d.titel} Viel Freude damit.`,
    "",
    "Hey du,",
    "",
    d.absatz,
    "",
    "Hier lädst du es herunter:",
    d.seite,
    "",
    "So fängst du an:",
    ...d.schritte.map((t, i) => `${i + 1}. ${t}`),
    "",
    `Mein Tipp: ${d.tipp}`,
    "",
    `P.S. ${d.mehr.text} ${d.mehr.link}`,
    "",
    ...FUSS_TEXT,
  ].join("\n");
}

/* ──────────────────────────────────────────────────────────────────────────
   Strecken-Mails (strecken.ts): Der Text kommt aus der Datenbank, geschrieben im Cockpit. Schreibweise:
   - Leerzeile = neuer Absatz, einfacher Zeilenumbruch bleibt einer.
   - Ein Absatz nur aus [Text](https://…) wird ein goldener Knopf. Im Fließtext wird [Text](https://…) ein Link, **so** wird fett.
   - {vorname} wird ersetzt, ohne Namen steht „du“ da („Hey {vorname},“ → „Hey du,“).
   Alles wird zuerst maskiert, erst danach werden Links und Fett eingesetzt. Links nur mit https, sonst bleibt der Text stehen, wie er ist.
   ────────────────────────────────────────────────────────────────────────── */

export type StreckenInhalt = { betreff: string; vorschau: string; inhalt: string; vorname: string; abmelden: string };

const LINK = /\[([^\]\n]+)\]\((https:\/\/[^\s)"<>]+)\)/g;
const absaetze = (inhalt: string) => inhalt.replace(/\r/g, "").split(/\n[ \t]*\n/).map((t) => t.trim()).filter(Boolean);
const knopf = (text: string, link: string) => `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:8px 0 26px 0;">
          <tr>
            <td align="center" bgcolor="${GOLD_HELL}" style="background-color:${GOLD_HELL}; border-radius:999px;">
              <a href="${link}" style="display:inline-block; padding:16px 30px; font-family:${MONO}; font-size:15px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:${DUNKEL}; text-decoration:none; border-radius:999px;">${text}</a>
            </td>
          </tr>
        </table>`;

export function streckenHtml(m: StreckenInhalt): string {
  const name = maskiert(m.vorname.trim() || "du");
  const html = absaetze(m.inhalt)
    .map((roh) => {
      const t = maskiert(roh); // ab hier ist alles maskiert, auch die Adressen in den Links
      const k = t.match(/^\[([^\]\n]+)\]\((https:\/\/[^\s)"<>]+)\)$/);
      if (k) return knopf(k[1], k[2]);
      const satz = t
        .replace(LINK, `<a href="$2" style="color:#7A5C18; text-decoration:underline;">$1</a>`)
        .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
      return `<p style="margin:0 0 18px 0;">${satz}</p>`;
    })
    .join("\n        ")
    .replaceAll("{vorname}", () => name); // als Funktion: Sonst liest replaceAll $&, $' und $$ im Namen als Muster
  const inhalt = `
    <tr>
      <td style="padding:38px 28px 20px 28px; font-family:${SANS}; font-size:16px; line-height:1.65; color:${TEXT};">
        ${html}
      </td>
    </tr>`;
  return mailRahmen({ titel: m.betreff, vorschau: m.vorschau, zeile: "Sabala Newsletter", inhalt, abmelden: m.abmelden });
}

export function streckenText(m: StreckenInhalt): string {
  const text = absaetze(m.inhalt)
    .join("\n\n")
    .replace(LINK, "$1: $2")
    .replace(/\*\*([^*\n]+)\*\*/g, "$1")
    .replaceAll("{vorname}", () => m.vorname.trim() || "du");
  return [text, "", ...FUSS_TEXT, "", "Du bekommst diese Mail, weil du dich auf sabala-mentoring.com eingetragen hast.", `Abmelden mit einem Klick: ${m.abmelden}`].join("\n");
}
