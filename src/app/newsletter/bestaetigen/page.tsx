import { redirect } from "next/navigation";
import Ankunft from "../Ankunft";
import stil from "../ankunft.module.css";

export const metadata = {
  title: "Adresse bestätigen | Sabala Mentoring",
  robots: { index: false, follow: false },
};

// Ziel des Links in der Bestätigungsmail (über /api/newsletter/bestaetigen). Bestätigt wird erst mit dem Knopf (POST):
// Virenscanner, die Links vorab öffnen, bestätigen so niemanden.
export default async function BestaetigenPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams;
  const t = String(q.t ?? "");
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(t)) redirect("/newsletter/link-ungueltig");
  // Token und Wahl der Skill-Pakete reisen unverändert zum Knopf. Prüfen und lesen tut erst der POST, nur feste Kürzel.
  const weiter = new URLSearchParams({ t });
  for (const k of ["pakete", "beruf"]) if (q[k]) weiter.set(k, String(q[k]));
  return (
    <Ankunft adler="/newsletter/adler-blick.webp" zeile="Fast geschafft" titel="Ein Klick" pointe="fehlt noch.">
      <p>Bestätige mit dem Knopf, dass diese Adresse dir gehört. Erst dann zählt deine Anmeldung.</p>
      <p>Du hast dich gar nicht eingetragen? Dann schließ diese Seite einfach. Ohne den Knopf passiert nichts.</p>
      <form method="post" action={`/api/newsletter/bestaetigen?${weiter}`} className={stil.wege}>
        <button type="submit" className={stil.knopf}>Adresse bestätigen</button>
      </form>
    </Ankunft>
  );
}
