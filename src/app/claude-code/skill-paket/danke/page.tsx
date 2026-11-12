import Link from "next/link";
import { EINWILLIGUNG_TEXT } from "@/lib/einwilligung-text";
import Ankunft from "@/app/newsletter/Ankunft";
import stil from "@/app/newsletter/ankunft.module.css";

export const metadata = {
  title: "Dein Skill-Paket | Sabala Mentoring",
  robots: { index: false, follow: false },
};

/* Ziel nach dem Klick in der Bestätigungsmail, wenn jemand das Skill-Paket angefordert hat
   (dankeSeite() in src/lib/quellen.ts). Hier liegt der Download.
   ponytail: weiches Tor wie beim Startpaket. Die Datei unter /downloads ist öffentlich, für ein kostenloses Paket reicht das.
   Paket neu bauen: sh skillpaket/bauen.sh */
export default function SkillPaketDankePage() {
  return (
    <Ankunft adler="/newsletter/adler-blick.webp" erledigt zeile="Bestätigt" titel="Dein Skill-Paket." pointe="Liegt bereit.">
      <p>Danke fürs Bestätigen. Hier sind deine vier Skills für Claude mit Anleitung. Am besten öffnest du zuerst die Datei „00 Start hier“, dort steht, wie du sie in Claude Code oder in der Claude-App installierst.</p>
      {/* Abstand nach unten: Anders als auf der allgemeinen Ankunftsseite folgt hier noch Text unter den Knöpfen. */}
      <div className={stil.wege} style={{ marginBottom: "2.2rem" }}>
        <a
          href="/downloads/skill-paket.zip"
          download
          className={stil.knopf}
          data-umami-event="download"
          data-umami-event-datei="skill-paket.zip"
        >
          Skill-Paket herunterladen
        </a>
        <Link href="/ressourcen" className={stil.weiter}>Alle Ressourcen</Link>
      </div>
      <p>Ich schreibe dir außerdem, wenn es etwas Neues gibt: KI-Updates für dein Unternehmen, neue Kurse und Termine.</p>
      <p className={stil.wortlaut}>„{EINWILLIGUNG_TEXT}“</p>
      <p>Der Link zum Abmelden steht in jeder Mail. Ein Klick genügt.</p>
    </Ankunft>
  );
}
