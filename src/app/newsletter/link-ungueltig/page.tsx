import Link from "next/link";

export const metadata = {
  title: "Link gilt nicht mehr | Sabala Mentoring",
  robots: { index: false, follow: false },
};

// Ziel, wenn der Link aus der Bestätigungsmail unbekannt oder überholt ist (/api/newsletter/bestaetigen).
export default function LinkUngueltigPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-32 px-6">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-refined-gold mb-4">Newsletter</p>
        <h1 className="font-instrument text-5xl text-deep-charcoal mb-10 leading-tight">Dieser Link gilt nicht mehr.</h1>

        <div className="space-y-5 text-[1.06rem] leading-relaxed text-deep-charcoal">
          <p>
            Hast du dich danach noch einmal eingetragen? Dann gilt nur der Link aus der neuesten Mail.
            Es kann auch sein, dass der Link unvollständig angekommen ist.
          </p>
          <p>Trag dich einfach noch einmal ein, dann bekommst du eine frische Mail.</p>
          <p className="pt-4 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/akademie-hub#newsletter" className="text-refined-gold underline underline-offset-4">Zur Anmeldung</Link>
            <Link href="/" className="text-refined-gold underline underline-offset-4">Zur Startseite</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
