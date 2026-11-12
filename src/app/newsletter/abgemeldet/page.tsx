import Link from "next/link";
import Ankunft from "../Ankunft";
import stil from "../ankunft.module.css";

export const metadata = {
  title: "Abgemeldet | Sabala Mentoring",
  robots: { index: false, follow: false },
};

// Ziel nach dem Knopf „Jetzt abmelden“ (/api/newsletter/abmelden).
export default async function AbgemeldetPage({ searchParams }: { searchParams: Promise<{ probe?: string }> }) {
  const { probe } = await searchParams;
  return (
    <Ankunft adler="/newsletter/adler-blick.webp" erledigt zeile="Abgemeldet" titel="Erledigt." pointe="Du bist abgemeldet.">
      {probe ? (
        <p>Das war der Link aus einer Test-Mail. Er zeigt nur den Weg, abgemeldet wurde niemand.</p>
      ) : (
        <p>Ab jetzt bekommst du keine Mails mehr von mir. Kommt in den nächsten Stunden doch noch eine, war sie schon unterwegs.</p>
      )}
      <p>Wenn du magst, trägst du dich später einfach wieder ein.</p>
      <div className={stil.wege}>
        <Link href="/" className={stil.knopf}>Zur Startseite</Link>
      </div>
    </Ankunft>
  );
}
