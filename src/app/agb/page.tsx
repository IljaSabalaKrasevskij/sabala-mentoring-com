import Link from "next/link";

export const metadata = {
  title: "AGB | Sabala Mentoring",
};

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-32 px-6">
      <div className="max-w-[760px] mx-auto">

        <p className="text-xs font-mono uppercase tracking-[0.2em] text-refined-gold mb-4">Rechtliches</p>
        <h1 className="font-instrument text-5xl text-deep-charcoal mb-4 leading-tight">Allgemeine Geschäftsbedingungen</h1>
        <p className="text-deep-charcoal/50 text-sm mb-16">SABALA MENTORING LLC · Stand: 2025</p>

        <div className="space-y-12 text-deep-charcoal/80 leading-relaxed">

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der SABALA MENTORING LLC,
              30 N Gould St Ste N, 82801 Sheridan, WY, USA (nachfolgend „Anbieter") und ihren Kunden über
              Leistungen in den Bereichen Marketingberatung, Mentoring, 1:1-Begleitung, Gruppenprogramme,
              Meditationscoaching, digitale Produkte sowie Custom GPTs.
            </p>
            <p className="mt-4">
              Individuelle Angebote auf Webseiten stellen kein bindendes Angebot dar. Verträge kommen durch
              Annahme, Buchung oder schriftliche Bestätigung zustande. Der Anbieter ist berechtigt, Anfragen
              ohne Angabe von Gründen abzulehnen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 2 Vertragsschluss</h2>
            <p>
              Die Darstellung der Leistungen auf der Website stellt kein rechtlich bindendes Angebot dar,
              sondern eine Aufforderung zur Abgabe eines Angebots. Ein Vertrag kommt erst durch eine
              ausdrückliche Buchung, Annahme oder schriftliche Bestätigung durch den Anbieter zustande.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 3 Mitwirkungspflichten des Kunden</h2>
            <p>
              Der Kunde ist verpflichtet, alle für die Erbringung der Leistungen erforderlichen Informationen,
              Materialien und Freigaben rechtzeitig bereitzustellen. Verzögerungen auf Kundenseite verlängern
              vereinbarte Fristen in angemessenem Umfang.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 4 Preise und Zahlungsbedingungen</h2>
            <p>
              Alle angegebenen Preise verstehen sich als Nettopreise zuzüglich der gesetzlich geltenden
              Steuern, sofern nicht anders angegeben. Bei Zahlungsverzug ist der Anbieter berechtigt,
              weitere Leistungen bis zum Ausgleich der offenen Forderung zurückzustellen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 5 Terminabsagen und Nichterscheinen</h2>
            <p>
              Einzeltermine können bis 24 Stunden vor dem vereinbarten Termin kostenfrei abgesagt oder
              verschoben werden. Bei späteren Absagen oder Nichterscheinen ohne rechtzeitige Absage verfällt
              der Termin ersatzlos.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 6 1:1-Leistungen und Programme</h2>
            <p>
              1:1-Leistungen und individuelle Programme erfordern einen separaten Vertrag. Der Anbieter
              übernimmt keine Garantie für den Eintritt bestimmter wirtschaftlicher oder persönlicher Erfolge.
              Vereinbarte feste Laufzeiten sind verbindlich; eine ordentliche Kündigung vor Ablauf der
              Laufzeit ist ausgeschlossen, soweit nicht gesetzlich zwingend anders vorgeschrieben.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 7 Digitale Produkte und Custom GPTs</h2>
            <p>
              Bei digitalen Produkten und Custom GPTs erhält der Kunde nach vollständiger Zahlung ein
              einfaches, nicht übertragbares Nutzungsrecht für den eigenen Gebrauch. Eine Weitergabe,
              Vervielfältigung oder Weiterveräußerung der Inhalte ist ohne ausdrückliche schriftliche
              Zustimmung des Anbieters nicht gestattet.
            </p>
            <p className="mt-4">
              Bei digitalen Produkten (Downloads, GPT-Prompts, Anleitungen) besteht kein Widerrufsrecht,
              sobald der Download begonnen oder der Zugang gewährt wurde, sofern der Kunde vor dem Kauf
              ausdrücklich zugestimmt hat, dass er das Widerrufsrecht mit Beginn der Vertragserfüllung verliert.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 8 Haftung</h2>
            <p>
              Der Anbieter haftet unbegrenzt für Schäden aus der Verletzung des Lebens, des Körpers oder
              der Gesundheit sowie für Vorsatz und grobe Fahrlässigkeit.
            </p>
            <p className="mt-4">
              Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten
              (Kardinalpflichten) und nur in Höhe des vorhersehbaren, vertragstypischen Schadens.
              Im Übrigen ist die Haftung ausgeschlossen.
            </p>
            <p className="mt-4">
              Der Anbieter haftet insbesondere nicht für unternehmerische Entscheidungen des Kunden, die
              dieser auf Basis der erhaltenen Beratungs- oder Coaching-Inhalte trifft. Der Erfolg von
              Maßnahmen hängt von einer Vielzahl individueller Faktoren ab, auf die der Anbieter keinen
              Einfluss hat.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 9 Urheberrecht und Nutzungsrechte</h2>
            <p>
              Alle vom Anbieter bereitgestellten Inhalte, Materialien, Skripte, Prompts und sonstigen
              Unterlagen sind urheberrechtlich geschützt. Kunden erhalten ausschließlich die ausdrücklich
              eingeräumten Nutzungsrechte. Eine darüber hinausgehende Nutzung, Vervielfältigung oder
              Weitergabe ist ohne schriftliche Zustimmung des Anbieters untersagt.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 10 Datenschutz</h2>
            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <Link href="/datenschutz" className="text-refined-gold hover:underline">
                Datenschutzerklärung
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 11 Anwendbares Recht und Gerichtsstand</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
              Für Verbraucher gilt diese Rechtswahl nur insoweit, als nicht zwingende Verbraucherschutzvorschriften
              des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">§ 12 Salvatorische Klausel</h2>
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit
              der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die
              gesetzliche Regelung.
            </p>
          </section>

        </div>

        <div className="mt-20 pt-8 border-t border-deep-charcoal/10 flex gap-6 text-sm text-deep-charcoal/50">
          <Link href="/impressum" className="hover:text-refined-gold transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-refined-gold transition-colors">Datenschutz</Link>
        </div>
      </div>
    </div>
  );
}
