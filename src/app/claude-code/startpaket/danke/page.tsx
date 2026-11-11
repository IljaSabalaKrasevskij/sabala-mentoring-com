import Link from "next/link";
import { EINWILLIGUNG_TEXT } from "@/lib/einwilligung-text";
import Ankunft from "@/app/newsletter/Ankunft";
import stil from "@/app/newsletter/ankunft.module.css";

export const metadata = {
  title: "Dein Claude-Code-Startpaket | Sabala Mentoring",
  robots: { index: false, follow: false },
};

/* Ziel nach dem Klick in der Bestätigungsmail, wenn jemand das Startpaket angefordert hat
   (dankeSeite() in src/lib/quellen.ts). Hier liegt der Download.
   ponytail: weiches Tor. Die Datei unter /downloads ist öffentlich, wer den Link kennt, lädt sie auch ohne Anmeldung.
   Für ein kostenloses Paket reicht das. Ein echtes Tor (Link mit Token aus der Bestätigung) erst, wenn das Paket etwas kostet.
   Paket neu bauen: cd startpaket && zip -FS -r -X -q ../public/downloads/claude-code-startpaket.zip claude-code-startpaket -x '*.DS_Store' */
export default function StartpaketDankePage() {
  return (
    <Ankunft adler="/newsletter/adler-blick.webp" erledigt zeile="Bestätigt" titel="Dein Startpaket." pointe="Liegt bereit.">
      <p>Danke fürs Bestätigen. Hier ist dein Ordner mit Anleitung, Spickzettel, zwei Vorlagen und zehn Skills. Am besten öffnest du zuerst die Datei „00 Start hier“.</p>
      {/* Abstand nach unten: Anders als auf der allgemeinen Ankunftsseite folgt hier noch Text unter den Knöpfen. */}
      <div className={stil.wege} style={{ marginBottom: "2.2rem" }}>
        <a
          href="/downloads/claude-code-startpaket.zip"
          download
          className={stil.knopf}
          data-umami-event="download"
          data-umami-event-datei="claude-code-startpaket.zip"
        >
          Startpaket herunterladen
        </a>
        <Link href="/claude-code" className={stil.weiter}>Alles zu Claude Code</Link>
      </div>
      <p>Ich schreibe dir außerdem, wenn es etwas Neues gibt: KI-Updates für dein Unternehmen, neue Kurse und Termine.</p>
      <p className={stil.wortlaut}>„{EINWILLIGUNG_TEXT}“</p>
      <p>Der Link zum Abmelden steht in jeder Mail. Ein Klick genügt.</p>
    </Ankunft>
  );
}
