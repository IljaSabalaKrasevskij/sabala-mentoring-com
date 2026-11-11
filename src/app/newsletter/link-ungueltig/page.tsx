import Link from "next/link";
import Ankunft from "../Ankunft";
import stil from "../ankunft.module.css";

export const metadata = {
  title: "Link gilt nicht mehr | Sabala Mentoring",
  robots: { index: false, follow: false },
};

// Ziel, wenn der Link aus der Bestätigungsmail unbekannt oder überholt ist (/api/newsletter/bestaetigen).
export default function LinkUngueltigPage() {
  return (
    <Ankunft adler="/newsletter/adler-seitenblick.webp" zeile="Newsletter" titel="Dieser Link" pointe="gilt nicht mehr.">
      <p>
        Hast du dich danach noch einmal eingetragen? Dann gilt nur der Link aus der neuesten Mail.
        Es kann auch sein, dass der Link unvollständig angekommen ist.
      </p>
      <p>Trag dich einfach noch einmal ein, dann bekommst du eine frische Mail.</p>
      <div className={stil.wege}>
        <Link href="/akademie-hub#newsletter" className={stil.knopf}>Zur Anmeldung</Link>
        <Link href="/" className={stil.weiter}>Zur Startseite</Link>
      </div>
    </Ankunft>
  );
}
