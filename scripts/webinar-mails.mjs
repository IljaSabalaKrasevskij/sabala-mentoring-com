/* Baut die komplette Webinar-Mailstrecke als fertige HTML-Dateien.

     node scripts/webinar-mails.mjs

   Ergebnis: emails/webinar-01-....html bis webinar-08-....html

   Warum ein Generator statt acht handgeschriebener Dateien:
   - Header, Footer und Logo kommen aus emails/akademie-willkommen.html, es gibt
     also nur EINE Quelle fuer das Mail-Design.
   - Termin und Links kommen aus src/components/webinar/config.ts, es gibt also
     nur EINE Quelle fuer den Termin.
   - Der ASCII-Zwang ist als Funktion abgesichert statt als Vorsatz. AC liest
     UTF-8 immer wieder als Latin-1, dann steht "f&uuml;hlt" als "f√°hlt" in der
     Mail. Deshalb wird JEDES Sonderzeichen zur HTML-Entity und am Ende hart
     geprueft. Siehe Vault: Newsletter-Encoding-Pflicht.
*/

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const P = (...p) => path.join(root, ...p);

/* ── Termin aus der einen Quelle ziehen ───────────────────────────────── */
const cfg = readFileSync(P("src/components/webinar/config.ts"), "utf8");
const pick = (k) => cfg.match(new RegExp(`${k}:\\s*"([^"]+)"`))?.[1] ?? "";
const WEEKDAY = pick("weekday");
const DATE = pick("date");
const TIME = pick("time");
const TERMIN = `${WEEKDAY}, ${DATE}, ${TIME}`;
const WEBINAR_AB = new Date(pick("iso"));

/* Der Zoom-Link kommt aus .env.local und steht NICHT im Code. Zwei Gruende:
   config.ts wird ins Frontend gebuendelt (Link stuende auf der Webseite), und
   dieses Repo ist oeffentlich auf GitHub (Link stuende dauerhaft in der
   Historie). Ein Zoom-Beitrittslink ohne Passwort ist eine offene Tuer.
   Die erzeugten Mails in emails/webinar-* sind aus demselben Grund ignoriert.

   Das kaufmaennische Und ist im Kalenderlink als &amp; geschrieben, weil er
   in einem href-Attribut steht. Beim Klick wird daraus wieder ein normales &. */
const ZOOM = process.env.WEBINAR_ZOOM_URL || leseEnv("WEBINAR_ZOOM_URL");

function leseEnv(schluessel) {
  const datei = P(".env.local");
  const treffer = readFileSync(datei, "utf8")
    .split("\n")
    .find((z) => z.trim().startsWith(`${schluessel}=`));
  const wert = treffer?.slice(treffer.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
  if (!wert) {
    throw new Error(
      `${schluessel} fehlt. Trag den Zoom-Link in .env.local ein:\n  ${schluessel}="https://..."`,
    );
  }
  return wert;
}
/* Kalender-Link wird aus der config berechnet, nicht getippt. Beim ersten
   Terminwechsel stand hier sonst noch das alte Datum, waehrend Seite, Mails und
   Banner schon umgezogen waren. Google will UTC im Format YYYYMMDDTHHMMSSZ. */
function googleZeit(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
const KALENDER =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&amp;text=" + encodeURIComponent("Live-Webinar: Dein Wissen gehoert auf deine Festplatte") +
  "&amp;dates=" + googleZeit(pick("iso")) + "/" + googleZeit(pick("isoEnde")) +
  "&amp;details=" + encodeURIComponent(
    "Second Brain fuer Claude. Obsidian, NotebookLM und Claude Code im echten Einsatz. " +
    "Zugangslink kommt per Mail. Details: https://sabala-mentoring.com/webinar") +
  "&amp;location=Zoom";

const SEITE = "https://sabala-mentoring.com/webinar";

/* Der Zoom-Link stand urspruenglich NUR in der Bestaetigungsmail. Am Tag des
   Webinars (Mail 4 und 5) steht er jetzt direkt drin: wer 15 Minuten vor Beginn
   erst eine alte Mail suchen muss, kommt zu spaet oder gar nicht. Die frueheren
   Mails (2 und 3) verweisen weiter zurueck, damit der Link nicht wochenlang
   durch jedes Postfach wandert. */
const ZUGANG_HINWEIS =
  "Deinen Zugangslink findest du in der Bestätigungsmail von deiner Anmeldung, " +
  "Betreff \"Du bist dabei. Hier ist dein Zugang.\". Such am besten jetzt kurz danach, " +
  "dann hast du sie später griffbereit.";
const AKADEMIE = "https://sabala-mentoring.com/akademie";

/* Aufzeichnung kommt jetzt aus config.ts, nicht mehr aus dieser Datei.
   Grund (27.8.2026): der Link war hier fest verdrahtet und zeigte auf den Lauf
   vom 14.8. Beim naechsten Webinar haetten die Mails 6 und 7 den Teilnehmern
   die Aufzeichnung des VORIGEN Laufs geschickt.
   Solange der Wert leer ist, werden Mail 6 und 7 gar nicht gebaut. Sie gehoeren
   ohnehin erst nach dem Webinar raus, dann traegst du den Link in config.ts ein
   und laesst das Script nochmal laufen.
   Muss der oeffentliche Share-Link sein (Fathom: Share -> "Anyone with the link"),
   sonst laufen alle Empfaenger in eine Anmeldewand. */
const AUFZEICHNUNG = pick("aufzeichnungUrl");
const NACH_WEBINAR = ["webinar-06-aufzeichnung", "webinar-07-verpasst"];

/* Checkout kommt aus cohorts.ts, damit der Preis-/Termin-Lauf nur EINE Quelle
   hat. Gleicher Regex-Trick wie im Banner-Script beim Datum. Faellt auf die
   Kursseite zurueck, falls der Eintrag mal fehlt. */
const KURS_CHECKOUT =
  readFileSync(new URL("../src/components/akademie/cohorts.ts", import.meta.url), "utf8")
    .match(/checkoutUrl:\s*"([^"]+)"/)?.[1] ?? AKADEMIE;

/* ── ASCII-Panzerung ──────────────────────────────────────────────────── */
const MAP = {
  "ä": "&auml;", "ö": "&ouml;", "ü": "&uuml;", "Ä": "&Auml;", "Ö": "&Ouml;",
  "Ü": "&Uuml;", "ß": "&szlig;", "€": "&euro;", "©": "&copy;", "°": "&deg;",
  "→": "&rarr;", "·": "&middot;", "•": "&bull;", "×": "x",
  "„": "\"", "“": "\"", "”": "\"", "‚": "'", "‘": "'", "’": "'",
  "…": "...", "—": ",", "–": "-", " ": "&nbsp;",
};

function ascii(s) {
  return String(s).replace(/[^\x00-\x7F]/g, (c) => {
    if (MAP[c]) return MAP[c];
    throw new Error(`Unbekanntes Sonderzeichen ohne Entity: ${JSON.stringify(c)} (U+${c.codePointAt(0).toString(16)})`);
  });
}

/* ── Bausteine ────────────────────────────────────────────────────────── */
const T = (s) => ascii(s);

const p = (t, extra = "") => `        <p style="margin: 0 0 18px 0;${extra}">${T(t)}</p>`;
const pFett = (t) => p(t, "font-weight:600;");

const knopf = (href, label) => `
    <tr>
      <td style="padding: 4px 40px 30px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background-color:#D4AE5A;border-radius:4px;">
              <a href="${href}" target="_blank"
                 style="display:inline-block;padding:16px 40px;font-family:'Satoshi',-apple-system,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;letter-spacing:0.3px;color:#0A0806;text-decoration:none;">
                ${T(label)}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

/* Dunkler Terminkasten, der in jeder Vorab-Mail gleich aussieht.
   Wiedererkennung ist bei Erinnerungsmails die halbe Miete. */
const terminBox = () => `
    <tr>
      <td style="padding: 4px 40px 26px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0806;border-radius:6px;">
          <tr>
            <td style="padding:26px 30px;">
              <div style="font-family:'Satoshi',-apple-system,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:#D4AE5A;">
                ${T("Live-Webinar &middot; kostenlos").replace("&amp;", "&")}
              </div>
              <div style="height:10px;line-height:10px;">&nbsp;</div>
              <div style="font-family:'Instrument Serif',Georgia,serif;font-size:24px;line-height:1.2;color:#FAF8F5;">
                ${T(TERMIN)}
              </div>
              <div style="height:8px;line-height:8px;">&nbsp;</div>
              <div style="font-family:'Satoshi',-apple-system,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:rgba(250,248,245,0.66);">
                ${T(`Zoom &middot; ${pick("duration")} &middot; Zeit f&uuml;r deine Fragen`)}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

const ps = (t) => `
    <tr>
      <td style="padding: 0px 40px 10px 40px; font-size: 15px; line-height: 1.65; color:#5A554C;">
        <p style="margin: 0 0 18px 0;"><strong style="color:#2E2B26;">P.S.:</strong> ${T(t)}</p>
      </td>
    </tr>`;

const signOff = `
    <tr>
      <td style="padding: 20px 40px 30px 40px; font-size: 16px; line-height: 1.65; color:#2E2B26;">
        <p style="margin: 0 0 6px 0;">Bis dann,</p>
        <p style="margin: 0; font-family: 'Instrument Serif', Georgia, serif; font-size: 22px; color:#2E2B26;">Ilja</p>
      </td>
    </tr>`;

const kopf = (zeile1, zeile2) => `
    <tr>
      <td style="padding: 40px 40px 10px 40px;">
        <h1 style="font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 1.2; color:#2E2B26; margin:0; font-weight: normal;">
          ${T(zeile1)}<br><em style="color:#B8963E;">${T(zeile2)}</em>
        </h1>
      </td>
    </tr>`;

const text = (...zeilen) => `
    <tr>
      <td style="padding: 10px 40px 26px 40px; font-size: 16px; line-height: 1.65; color:#2E2B26;">
${zeilen.join("\n\n")}
      </td>
    </tr>`;

/* ── Die Strecke ──────────────────────────────────────────────────────── */
const MAILS = [
  {
    slug: "webinar-01-bestaetigung",
    wann: "Sofort nach der Anmeldung",
    betreff: "Du bist dabei. Hier ist dein Zugang.",
    preheader: `Dein Platz für ${DATE} ist reserviert. Trag dir den Termin am besten gleich ein.`,
    body: [
      kopf("Du bist dabei.", "Jetzt einmal kurz eintragen."),
      text(
        p("Hey du,"),
        p("dein Platz ist reserviert. Ich freue mich, dass du dabei bist."),
        pFett("Mach bitte jetzt eine Sache, sie kostet dich zehn Sekunden: trag den Termin in deinen Kalender ein. Sonst geht er zwischen dem Rest der Woche unter, und das wäre schade."),
      ),
      terminBox(),
      knopf(KALENDER, "Termin in den Kalender"),
      text(
        p("Den Zoom-Link schicke ich dir am Tag des Webinars noch einmal, du musst ihn dir also nicht merken. Hier ist er trotzdem schon:"),
        p(`<a href="${ZOOM}" style="color:#B8963E;">${ZOOM}</a>`),
        p("Du brauchst nichts vorzubereiten und nichts zu installieren. Komm einfach mit einer Frage im Kopf, an der du gerade hängst."),
      ),
      ps("Wenn du live nicht kannst: bleib trotzdem eingetragen. Die Aufzeichnung geht am Tag danach an alle raus, die angemeldet sind."),
      signOff,
    ],
  },
  {
    slug: "webinar-02-warum",
    wann: "3 Tage vor dem Webinar",
    betreff: "Der Satz, den ich fast jede Woche höre",
    preheader: "Ich baue nichts, also brauche ich Claude Code nicht. Warum das der teuerste Irrtum gerade ist.",
    body: [
      kopf("\"Ich baue nichts.", "Also brauche ich das nicht.\""),
      text(
        p("Hey du,"),
        p("diesen Satz höre ich fast jede Woche. Meistens von Leuten, die klug sind und viel wissen."),
        p("Der Irrtum steckt im Wort Code. Claude Code klingt nach Programmieren, ist aber vor allem eins: das einzige Werkzeug, das auf deine eigenen Dateien schauen darf."),
        p("Und genau da liegt der Unterschied. Solange dein Wissen nur in Chatverläufen liegt, fängt jede Sitzung bei null an. Du erklärst wieder, wer der Kunde ist, wie du arbeitest, was letztes Mal besprochen wurde."),
        pFett("Liegt dasselbe Wissen als Textdatei auf deiner Platte, liest Claude es selbst. Du fragst nicht mehr, ob er sich etwas merken kann. Du fragst, was ihr ueber den Kunden wisst."),
        p(`Am ${DATE} zeige ich dir live, wie dieser Ordner aussieht. Mit meinen echten Notizen, nicht mit einem Demo-Beispiel.`),
      ),
      terminBox(),
      text(p(`Alle Details stehen hier: <a href="${SEITE}" style="color:#B8963E;">${SEITE}</a>`)),
      ps("Falls du jemanden kennst, der denselben Satz sagt: leite die Mail gerne weiter. Anmelden geht bis kurz vorher."),
      signOff,
    ],
  },
  {
    slug: "webinar-03-vorbereitung",
    wann: "1 Tag vor dem Webinar",
    betreff: `Morgen ${TIME}. Zwei Minuten Vorbereitung.`,
    preheader: "Eine kleine Sache vorab, dann holst du morgen deutlich mehr raus.",
    body: [
      kopf("Morgen geht es los.", "Zwei Minuten Vorbereitung."),
      text(
        p("Hey du,"),
        p("morgen ist es so weit. Du musst nichts installieren und nichts können. Eine Sache hilft aber wirklich:"),
        pFett("Denk dir eine konkrete Frage aus, die du gerne einmal an dein eigenes Wissen stellen würdest."),
        p("Zum Beispiel: Was habe ich diesem Kunden vor einem halben Jahr eigentlich angeboten? Wie habe ich das letzte Mal kalkuliert? Worüber habe ich schon geschrieben?"),
        p("Schreib sie dir auf einen Zettel. Ich zeige dir morgen genau das System, das solche Fragen beantwortet, und nehme Fragen aus dem Chat als Beispiel."),
      ),
      terminBox(),
      text(p(ZUGANG_HINWEIS)),
      ps("Wenn dir morgen etwas dazwischenkommt: die Aufzeichnung bekommst du trotzdem. Bleib einfach eingetragen."),
      signOff,
    ],
  },
  {
    slug: "webinar-04-heute",
    wann: "Am Tag des Webinars, morgens",
    betreff: `Heute um ${TIME}`,
    preheader: "Kurze Erinnerung mit dem Termin. Bis nachher.",
    body: [
      kopf("Heute.", TIME),
      text(
        p("Hey du,"),
        p("nur eine kurze Erinnerung, damit es dir heute nicht durchrutscht."),
        p("Ich mache mein eigenes Second Brain auf und zeige dir, wie es aufgebaut ist: ein Ordner, aus dem Claude mein Wissen liest, statt mich jedes Mal neu zu fragen. Obsidian, NotebookLM und Claude Code im echten Einsatz."),
      ),
      terminBox(),
      knopf(ZOOM, "Zum Webinar"),
      text(
        p("Der Knopf führt dich direkt in den Raum. Sei gerne ein paar Minuten früher da, dann verpasst du den Anfang nicht."),
        p("Ich freue mich auf dich."),
      ),
      signOff,
    ],
  },
  {
    slug: "webinar-05-gleich",
    wann: "15 Minuten vor Beginn",
    betreff: "Wir starten in 15 Minuten",
    preheader: "Der Raum ist offen. Hier ist dein Link.",
    body: [
      kopf("Wir starten", "in 15 Minuten."),
      text(p("Der Raum ist offen. Komm rein, dann verpasst du nichts.")),
      knopf(ZOOM, "Jetzt beitreten"),
      signOff,
    ],
  },
  {
    slug: "webinar-06-aufzeichnung",
    wann: "direkt nach dem Webinar, an alle die dabei waren",
    betreff: "Deine Aufzeichnung und dein Platz für nächste Woche",
    preheader: "Danke, dass du dabei warst. Hier ist alles zum Nachschauen.",
    body: [
      kopf("Danke, dass du", "dabei warst."),
      text(
        p("Hey du,"),
        p("hat mich gefreut, dich heute dabeizuhaben. Hier ist die Aufzeichnung zum Nachschauen und Nachbauen:"),
      ),
      knopf(AUFZEICHNUNG, "Aufzeichnung ansehen"),
      text(
        pFett("Der eine Schritt für heute, falls du ihn noch nicht gemacht hast:"),
        p("Leg einen Ordner an. Schreib eine einzige Textdatei hinein, in der steht, wer du bist und wie du arbeitest. Das ist der Anfang, alles andere wächst daran."),
        pFett("Wenn du es nicht alleine bauen willst:"),
        p("In der Akademie bauen wir das System in zwei Live-Sessions komplett auf, mit deinen eigenen Daten und mit mir daneben. Session 1 am Freitag, 21. August, Session 2 am Freitag, 28. August, jeweils 15 bis 17:30 Uhr."),
        p("Zehn Plätze, mehr nicht. Bei zehn Leuten kann ich in beiden Sessions auf jeden einzeln eingehen, bei dreißig nicht mehr."),
      ),
      knopf(KURS_CHECKOUT, "Platz sichern"),
      text(
        p("Wenn du vorher noch mal in Ruhe alles nachlesen willst, hier steht der ganze Ablauf: " + AKADEMIE),
      ),
      ps("Antworte gerne auf diese Mail und schreib mir, wo du hängst. Ich lese jede selbst."),
      signOff,
    ],
  },
  {
    slug: "webinar-07-verpasst",
    wann: "1 Tag danach, nur an die, die nicht da waren",
    betreff: "Du hast gefehlt. Hier ist trotzdem alles.",
    preheader: "Kein Vorwurf. Die Aufzeichnung liegt hier für dich bereit.",
    body: [
      kopf("Du warst nicht da.", "Kein Problem."),
      text(
        p("Hey du,"),
        p("gestern kam wohl etwas dazwischen. Passiert, deshalb nehme ich immer auf."),
        p("In 60 Minuten zeige ich darin mein eigenes Second Brain: einen Ordner auf dem eigenen Rechner, aus dem Claude dein Wissen liest, statt dich bei jeder Sitzung neu zu fragen."),
      ),
      knopf(AUFZEICHNUNG, "Aufzeichnung ansehen"),
      text(
        p("Wenn du nur 15 Minuten hast: schau ab Minute 25, da mache ich den Ordner auf. Das ist der Teil, den du sofort nachmachen kannst."),
      ),
      ps("Beim nächsten Live-Termin bist du automatisch eingeladen. Du musst dich nicht neu eintragen."),
      signOff,
    ],
  },
  {
    slug: "webinar-08-akademie",
    wann: "3 Tage danach, an alle",
    betreff: "Vom Ordner zum System",
    preheader: "Was der nächste Schritt ist, wenn du es nicht alleine bauen willst.",
    body: [
      kopf("Vom ersten Ordner", "zum fertigen System."),
      text(
        p("Hey du,"),
        p("im Webinar hast du gesehen, wie der Anfang aussieht. Ein Ordner, eine Regeldatei, Claude der mitliest."),
        p("Der Rest ist kein Hexenwerk, aber er dauert. Die meisten kommen bis zum Ordner und bleiben dann liegen, weil im Alltag keine Zeit fuer Feinschliff ist."),
        pFett("Genau dafür gibt es die Akademie. Zwei Live-Sessions, in denen wir das System mit deinen echten Daten aufbauen. Nicht mit einem Beispielkunden, sondern mit deinen Kunden, deinen Angeboten, deinen Notizen."),
        p("Kleine Gruppe, damit ich auf jeden Einzelnen schauen kann."),
      ),
      knopf(AKADEMIE, "Termine und Details"),
      ps("Wenn du unsicher bist, ob es zu dir passt: antworte auf diese Mail und beschreib mir kurz deine Situation. Ich sage dir ehrlich, ob es sich lohnt."),
      signOff,
    ],
  },
];

/* ── Rendern ──────────────────────────────────────────────────────────── */
const vorlage = readFileSync(P("emails/akademie-willkommen.html"), "utf8");
const [kopfTeil, rest] = vorlage.split("<!-- CONTENT START");
const fussTeil = "<!-- CONTENT END" + rest.split("<!-- CONTENT END")[1];

for (const m of MAILS) {
  // Ohne Aufzeichnungslink keine Aufzeichnungs-Mails. Lieber gar keine Datei
  // als eine mit dem Video vom letzten Mal.
  if (!AUFZEICHNUNG && NACH_WEBINAR.includes(m.slug)) {
    console.log(`${m.slug}.html  |  UEBERSPRUNGEN, aufzeichnungUrl in config.ts ist leer`);
    continue;
  }
  let head = kopfTeil
    .replace(/<title>[^<]*<\/title>/g, `<title>${T(m.betreff)}</title>`)
    // Feste Kopfzeile im dunklen Header umschreiben, sonst steht dort weiter
    // "Willkommen" aus der Vorlage.
    .replace(/Sabala Academy &middot; Willkommen/g, "Sabala Academy &middot; Webinar")
    // Preheader-Text sitzt als einzige Zeile im unsichtbaren div
    .replace(
      /(overflow:hidden;">\n)[^\n]*/,
      `$1${T(m.preheader)}`
    );

  const html = head + "<!-- CONTENT START -->\n" + m.body.join("\n") + "\n    " + fussTeil;

  const nonAscii = [...html].filter((c) => c.charCodeAt(0) > 127);
  if (nonAscii.length) {
    throw new Error(`${m.slug}: ${nonAscii.length} Zeichen sind nicht ASCII: ${[...new Set(nonAscii)].join(" ")}`);
  }

  writeFileSync(P("emails", `${m.slug}.html`), html);
  console.log(`${m.slug}.html  |  ${m.wann}  |  Betreff: ${m.betreff}`);
}

const gebaut = AUFZEICHNUNG ? MAILS.length : MAILS.length - NACH_WEBINAR.length;
console.log(`\n${gebaut} Mails gebaut. Termin ueberall: ${TERMIN}`);
if (!AUFZEICHNUNG) {
  console.log("Mail 6 und 7 fehlen absichtlich: erst nach dem Webinar den Share-Link");
  console.log("in src/components/webinar/config.ts bei aufzeichnungUrl eintragen, dann erneut laufen lassen.");
}
console.log(`Zoom-, Kalender- und Kurslink sind eingesetzt. Aufzeichnung: ${AUFZEICHNUNG}`);
console.log(`Kurs-Checkout (aus cohorts.ts): ${KURS_CHECKOUT}`);

/* ── Versandplan ──────────────────────────────────────────────────────────
   Die Vorab-Mails haengen an festen Uhrzeiten vor dem Termin. Bei kurzem
   Vorlauf passen sie nicht mehr alle rein, und ein Anmelder wuerde vier Mails
   in zwei Tagen bekommen. Deshalb rechnet das Skript den Plan aus, statt dass
   die Daten in einer Anleitung veralten.

   Regel: mindestens 36 Stunden Abstand zwischen zwei Vorab-Mails. Was das
   reisst, faellt raus.
   ────────────────────────────────────────────────────────────────────────── */

const TAG = 86400000;
const jetzt = new Date();

/* ACHTUNG Zeitzone: alle Uhrzeiten sind deutsche Zeit, weil die Teilnehmer und
   ActiveCampaign in deutscher Zeit denken. Der Rechner, auf dem das Skript
   laeuft, steht aber womoeglich woanders (Tbilisi = UTC+4). setHours() und ein
   Formatter ohne timeZone wuerden dann die Ortszeit des Rechners nehmen und den
   ganzen Plan verschieben. Deshalb: Datumsteil aus der config nehmen, Uhrzeit
   mit dem Offset der config anhaengen, und beim Anzeigen hart Europe/Berlin.

   ponytail: der Offset wird vom Webinar-Termin uebernommen. Fuer Mails wenige
   Tage davor stimmt das immer, ausser der Termin liegt direkt auf der Zeit-
   umstellung Ende Maerz oder Ende Oktober. Dann eine Stunde von Hand pruefen. */
const [DATUMSTEIL, ZEITTEIL] = pick("iso").split("T");
const OFFSET = ZEITTEIL.match(/([+-]\d{2}:\d{2}|Z)$/)?.[1] ?? "Z";

function vorlaufZeit(tageDavor, stunde, minute = 0) {
  const [y, m, d] = DATUMSTEIL.split("-").map(Number);
  const tag = new Date(Date.UTC(y, m - 1, d) - tageDavor * TAG).toISOString().slice(0, 10);
  const hh = String(stunde).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return new Date(`${tag}T${hh}:${mm}:00${OFFSET}`);
}

const fmt = (d) =>
  new Intl.DateTimeFormat("de-DE", {
    weekday: "short", day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin",
  }).format(d);

const fmtDatum = (d) =>
  new Intl.DateTimeFormat("de-DE", {
    day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Berlin",
  }).format(d);

/* Selbstpruefung: der Plan muss in deutscher Zeit stehen, egal wo der Rechner
   steht. Mail 5 gehoert 15 Minuten vor den Termin. */
{
  const soll = `${String((Number(ZEITTEIL.slice(0, 2)) + 23) % 24).padStart(2, "0")}:45`;
  const ist = fmt(new Date(WEBINAR_AB.getTime() - 15 * 60000)).slice(-5);
  if (ist !== soll) {
    throw new Error(`Zeitzonen-Fehler: Mail 5 steht auf ${ist}, muesste ${soll} deutscher Zeit sein.`);
  }
}

const PLAN = [
  { nr: 1, slug: "webinar-01-bestaetigung", zeit: null, label: "sofort bei der Anmeldung" },
  { nr: 2, slug: "webinar-02-warum", zeit: vorlaufZeit(3, 9) },
  { nr: 3, slug: "webinar-03-vorbereitung", zeit: vorlaufZeit(1, 17) },
  { nr: 4, slug: "webinar-04-heute", zeit: vorlaufZeit(0, 9) },
  { nr: 5, slug: "webinar-05-gleich", zeit: new Date(WEBINAR_AB.getTime() - 15 * 60000) },
];

const vorlaufTage = (WEBINAR_AB - jetzt) / TAG;

/* Durchgehen und ausduennen: was schon vorbei ist oder zu dicht am Vorgaenger
   liegt, wird als "streichen" markiert. */
let letzte = null;
for (const m of PLAN) {
  if (!m.zeit) { letzte = jetzt; continue; }
  if (m.zeit <= jetzt) {
    m.streichen = "Sendezeitpunkt liegt schon in der Vergangenheit";
  } else if (letzte && m.zeit - letzte < 1.5 * TAG && m.nr <= 3) {
    m.streichen = "weniger als 36 Stunden Abstand zur vorigen Mail";
  } else {
    letzte = m.zeit;
  }
}

const aktiv = PLAN.filter((m) => !m.streichen);

const zeilen = [
  "# Versandplan (automatisch erzeugt)",
  "",
  `Erzeugt am ${fmt(jetzt)} von \`scripts/webinar-mails.mjs\`. Nicht von Hand ändern, bei jedem Lauf überschrieben.`,
  "",
  `**Webinar:** ${TERMIN}`,
  `**Vorlauf ab heute:** ${vorlaufTage.toFixed(1)} Tage`,
  "",
  "## Vorab-Mails",
  "",
  "Mail 1 laeuft als Automation (Ausloeser: Tag). Alle anderen stellst du als",
  "geplante Kampagne auf das Segment `Tag = Webinar Second Brain` ein.",
  "",
  "| Mail | Senden am | Wie |",
  "|---|---|---|",
];

for (const m of PLAN) {
  if (m.streichen) {
    zeilen.push(`| ~~${m.nr} \`${m.slug}\`~~ | **streichen** | ${m.streichen} |`);
    continue;
  }
  if (!m.zeit) {
    zeilen.push(`| ${m.nr} \`${m.slug}\` | ${m.label} | **Automation**, Auslöser ist der Tag |`);
    continue;
  }
  zeilen.push(`| ${m.nr} \`${m.slug}\` | ${fmt(m.zeit)} | Kampagne planen |`);
}

zeilen.push("", "## Einschätzung", "");
if (vorlaufTage < 0) {
  zeilen.push("**Der Termin liegt in der Vergangenheit.** Setz einen neuen Termin in `src/components/webinar/config.ts`.");
} else if (aktiv.length <= 3) {
  zeilen.push(
    `**Kurzer Vorlauf.** Es passen nur noch ${aktiv.length} Vorab-Mails sinnvoll rein. Nimm genau die oben nicht durchgestrichenen und lass den Rest weg. Lieber drei Mails mit Luft dazwischen als fuenf, die sich drängeln.`,
  );
} else {
  zeilen.push(`Volle Strecke passt: ${aktiv.length} Vorab-Mails mit ausreichend Abstand.`);
}
zeilen.push(
  "",
  "Die Mails nach dem Webinar (6, 7, 8) haengen nicht am Vorlauf und bleiben immer gleich.",
  "",
  "**Warum geplante Kampagnen statt Automation-Wartezeiten:** eine geplante Kampagne geht nur an die Kontakte, die zum Sendezeitpunkt im Segment sind. Wer sich danach eintraegt, bekommt sie gar nicht erst, statt sie verspaetet nachgeliefert zu bekommen. Damit entfaellt jede Sonderbehandlung fuer Last-Minute-Anmeldungen.",
);

writeFileSync(P("emails", "webinar-versandplan.md"), zeilen.join("\n") + "\n");

console.log(`\nVorlauf: ${vorlaufTage.toFixed(1)} Tage  |  ${aktiv.length} von 5 Vorab-Mails passen`);
for (const m of PLAN) {
  console.log(
    m.streichen
      ? `  STREICHEN  Mail ${m.nr}  (${m.streichen})`
      : `  ok         Mail ${m.nr}  ${m.zeit ? fmt(m.zeit) : m.label}`,
  );
}
console.log("\nPlan geschrieben: emails/webinar-versandplan.md");
console.log("Kalender-Link (Termin daraus):", KALENDER.replace(/&amp;/g, "&").slice(0, 118) + " ...");
