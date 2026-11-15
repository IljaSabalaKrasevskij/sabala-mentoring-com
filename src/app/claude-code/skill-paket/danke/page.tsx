import Link from "next/link";
import SkillPaketeDanke from "@/components/skill-pakete/SkillPaketeDanke";
import { EINWILLIGUNG_TEXT } from "@/lib/einwilligung-text";
import Ankunft from "@/app/newsletter/Ankunft";
import stil from "@/app/newsletter/ankunft.module.css";

export const metadata = {
  title: "Deine Skill-Pakete | Sabala Mentoring",
  robots: { index: false, follow: false },
};

/* Ziel nach dem Klick in der Bestätigungsmail, wenn jemand Skill-Pakete angefordert hat (dankeSeite() in src/lib/quellen.ts).
   Der Link trägt die Wahl aus dem Formular (pakete, beruf). Pakete und Setup zeigt SkillPaketeDanke, die Inhalte stehen in daten.ts.
   Ohne JavaScript bleibt der Download aller Pakete in einem Ordner.
   ponytail: weiches Tor wie beim Startpaket. Die Dateien unter /downloads sind öffentlich, für kostenlose Pakete reicht das.
   Pakete neu bauen: sh skillpaket/bauen.sh */
export default function SkillPaketDankePage() {
  return (
    <Ankunft adler="/newsletter/adler-blick.webp" erledigt zeile="Bestätigt" titel="Deine Skill-Pakete." pointe="Liegen bereit.">
      <p>Danke fürs Bestätigen. Hier sind deine Pakete für Claude, darunter die Anleitung für deinen Beruf.</p>
      <SkillPaketeDanke />
      <noscript>
        <p style={{ marginTop: "2rem" }}>
          <a href="/downloads/skill-pakete/alle.zip" download className={stil.knopf}>
            Alle sechs Pakete herunterladen
          </a>
        </p>
      </noscript>
      <div style={{ marginTop: "3.2rem" }}>
        <p>Kommt ein Skill dazu oder wird einer besser, schreibe ich dir. Außerdem bekommst du KI-Updates für dein Unternehmen, neue Kurse und Termine.</p>
        <p className={stil.wortlaut}>„{EINWILLIGUNG_TEXT}“</p>
        <p>Der Link zum Abmelden steht in jeder Mail. Ein Klick genügt.</p>
        <div className={stil.wege}>
          <Link href="/ressourcen" className={stil.weiter}>
            Weitere kostenlose Hilfen
          </Link>
        </div>
      </div>
    </Ankunft>
  );
}
