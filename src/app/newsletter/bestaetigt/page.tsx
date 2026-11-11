import Link from "next/link";
import { EINWILLIGUNG_TEXT } from "@/lib/einwilligung-text";
import Ankunft from "../Ankunft";
import stil from "../ankunft.module.css";

export const metadata = {
  title: "Anmeldung bestätigt | Sabala Mentoring",
  robots: { index: false, follow: false },
};

// Ziel nach dem Klick in der Bestätigungsmail (/api/newsletter/bestaetigen).
export default function BestaetigtPage() {
  return (
    <Ankunft adler="/newsletter/adler-blick.webp" erledigt zeile="Geschafft" titel="Willkommen." pointe="Du bist dabei.">
      <p>Deine Anmeldung ist bestätigt. Ich schreibe dir, wenn es etwas Neues gibt: KI-Updates für dein Unternehmen, neue Kurse und Termine.</p>
      <p className={stil.wortlaut}>„{EINWILLIGUNG_TEXT}“</p>
      <p>Der Link zum Abmelden steht in jeder Mail. Ein Klick genügt.</p>
      <div className={stil.wege}>
        <Link href="/akademie-hub" className={stil.knopf}>Zur Akademie</Link>
        <Link href="/" className={stil.weiter}>Zur Startseite</Link>
      </div>
    </Ankunft>
  );
}
