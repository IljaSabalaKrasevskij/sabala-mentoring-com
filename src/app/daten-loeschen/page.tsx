import Link from "next/link";

export const metadata = {
  title: "Daten löschen | Sabala Mentoring",
};

// Loesch-Anleitung fuer die Meta-App Sabala Social (Feld "Nutzer-Datenloeschung").
export default function DatenLoeschenPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-32 px-6">
      <div className="max-w-[760px] mx-auto">

        <p className="text-xs font-mono uppercase tracking-[0.2em] text-refined-gold mb-4">Rechtliches</p>
        <h1 className="font-instrument text-5xl text-deep-charcoal mb-16 leading-tight">Daten löschen</h1>

        <section className="text-deep-charcoal/80 leading-relaxed">
          <h2 className="font-semibold text-deep-charcoal text-lg mb-4">So lassen Sie Ihre Daten löschen</h2>
          <p>
            Wenn Sie auf einem unserer Instagram-Konten ein Stichwort kommentiert haben, speichern wir
            Ihren Nutzernamen, Ihren Kommentar und die Nachrichten dieses Ablaufs, höchstens 90 Tage
            lang.
          </p>
          <p className="mt-4">
            Sie möchten das früher gelöscht haben? Schreiben Sie an{" "}
            <a href="mailto:sabala@sabala-mentoring.com" className="text-refined-gold hover:underline whitespace-nowrap">sabala@sabala-mentoring.com</a>{" "}
            und nennen Sie Ihren Instagram-Namen. Wir löschen alles innerhalb von 30 Tagen und
            bestätigen es Ihnen.
          </p>
          <p className="mt-4">
            Ihren Kommentar selbst können Sie jederzeit auf Instagram löschen.
          </p>
        </section>

        <div className="mt-20 pt-8 border-t border-deep-charcoal/10 flex gap-6 text-sm text-deep-charcoal/50">
          <Link href="/datenschutz" className="hover:text-refined-gold transition-colors">Datenschutz</Link>
          <Link href="/impressum" className="hover:text-refined-gold transition-colors">Impressum</Link>
        </div>
      </div>
    </div>
  );
}
