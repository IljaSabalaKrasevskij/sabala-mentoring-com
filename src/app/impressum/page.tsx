import Link from "next/link";

export const metadata = {
  title: "Impressum | Sabala Mentoring",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-32 px-6">
      <div className="max-w-[760px] mx-auto">

        <p className="text-xs font-mono uppercase tracking-[0.2em] text-refined-gold mb-4">Rechtliches</p>
        <h1 className="font-instrument text-5xl text-deep-charcoal mb-16 leading-tight">Impressum</h1>

        <div className="space-y-12 text-deep-charcoal/80 leading-relaxed">

          {/* Das TMG wurde am 14.5.2024 durch das Digitale-Dienste-Gesetz (DDG) abgeloest.
              Impressumspflicht steht seitdem in § 5 DDG, die Haftungsregeln in §§ 7–10 DDG.
              TODO Ilja: Wyoming Filing ID der LLC hier ergaenzen (Registerangabe, empfohlen). */}
          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">Angaben gemäß § 5 DDG</h2>
            <p>SABALA MENTORING LLC<br />
            30 N Gould St Ste N<br />
            82801 Sheridan, WY<br />
            Vereinigte Staaten von Amerika</p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">Vertreten durch</h2>
            <p>Ilja Krasevskij<br />
            Kukuri Gogiashvili I Lane 8, Apt. 44, 3rd Floor<br />
            Saburtalo District<br />
            0171 Tbilisi, Georgia</p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">Kontakt</h2>
            <p>
              Telefon: <a href="tel:+995591443665" className="text-refined-gold hover:underline">+995 591 44 36 65</a><br />
              E-Mail: <a href="mailto:sabala@sabala-mentoring.com" className="text-refined-gold hover:underline">sabala@sabala-mentoring.com</a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p>Ilja Krasevskij<br />
            Kukuri Gogiashvili I Lane 8, Apt. 44, 3rd Floor<br />
            Saburtalo District<br />
            0171 Tbilisi, Georgia</p>
          </section>

          {/* Die EU-Plattform zur Online-Streitbeilegung (OS) wurde zum 20.7.2025 eingestellt.
              Der Link darf nicht mehr stehen. Die Erklaerung nach § 36 VSBG bleibt Pflicht. */}
          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">Streitschlichtung</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen (§ 36 Abs. 1 Nr. 1 VSBG).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
            <p className="mt-4">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
              entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
              nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </section>

        </div>

        <div className="mt-20 pt-8 border-t border-deep-charcoal/10 flex gap-6 text-sm text-deep-charcoal/50">
          <Link href="/datenschutz" className="hover:text-refined-gold transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-refined-gold transition-colors">AGB</Link>
        </div>
      </div>
    </div>
  );
}
