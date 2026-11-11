import Link from "next/link";
import { EINWILLIGUNG_TEXT } from "@/lib/einwilligung-text";

export const metadata = {
  title: "Anmeldung bestätigt | Sabala Mentoring",
  robots: { index: false, follow: false },
};

// Ziel nach dem Klick in der Bestätigungsmail (/api/newsletter/bestaetigen).
export default function BestaetigtPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-32 px-6">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-refined-gold mb-4">Newsletter</p>
        <h1 className="font-instrument text-5xl text-deep-charcoal mb-10 leading-tight">Danke, das hat geklappt.</h1>

        <div className="space-y-5 text-[1.06rem] leading-relaxed text-deep-charcoal">
          <p>Deine Anmeldung ist bestätigt. Du hast zugestimmt:</p>
          <p className="border-l-[3px] border-refined-gold pl-4">„{EINWILLIGUNG_TEXT}“</p>
          <p>Der Link zum Abmelden steht in jeder Mail. Ein Klick genügt.</p>
          <p className="pt-4 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/akademie-hub" className="text-refined-gold underline underline-offset-4">Zur Akademie</Link>
            <Link href="/" className="text-refined-gold underline underline-offset-4">Zur Startseite</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
