import Link from "next/link";
import Ankunft from "../Ankunft";
import stil from "../ankunft.module.css";

export const metadata = {
  title: "Abmelden | Sabala Mentoring",
  robots: { index: false, follow: false },
};

// Ziel des Abmelde-Links in jeder Strecken-Mail. Abgemeldet wird erst mit dem Knopf (POST): Virenscanner, die Links vorab öffnen, melden so niemanden ab.
export default async function AbmeldenPage({ searchParams }: { searchParams: Promise<{ t?: string; fehler?: string }> }) {
  const { t = "", fehler } = await searchParams;
  if (fehler || !t) {
    return (
      <Ankunft adler="/newsletter/adler-seitenblick.webp" zeile="Newsletter" titel="Das hat" pointe="nicht geklappt.">
        <p>Der Abmelde-Link ist unvollständig oder unbekannt.</p>
        <p>
          Schreib mir kurz an <a href="mailto:sabala@sabala-mentoring.com">sabala@sabala-mentoring.com</a>, dann trage ich dich von Hand aus.
        </p>
      </Ankunft>
    );
  }
  return (
    <Ankunft adler="/newsletter/adler-seitenblick.webp" zeile="Newsletter" titel="Du willst gehen?" pointe="Ein Klick genügt.">
      <p>Danach bekommst du keine Mails mehr von mir: keine Mail-Strecke und keinen Newsletter.</p>
      <form method="post" action={`/api/newsletter/abmelden?t=${encodeURIComponent(t)}`} className={stil.wege}>
        <button type="submit" className={stil.knopf}>Jetzt abmelden</button>
        <Link href="/" className={stil.weiter}>Doch lieber bleiben</Link>
      </form>
    </Ankunft>
  );
}
