import Link from "next/link";

export const metadata = {
  title: "AGB & Widerrufsbelehrung | Sabala Mentoring",
};

/* Stand August 2026. Ueberarbeitet, weil die alte Fassung drei harte Luecken hatte:
 * 1. Es fehlte die komplette Widerrufsbelehrung. Nur die Ausnahme fuer digitale
 *    Inhalte stand drin, ohne die Belehrung selbst greift die aber nicht.
 * 2. § 4 sagte "Nettopreise", der Shop zeigt Verbrauchern aber Bruttopreise.
 * 3. Der Kuendigungsausschluss uebersah § 627 BGB (Dienste hoeherer Art).
 *
 * Widerrufsbelehrung und Formular folgen den gesetzlichen Mustern
 * (Anlage 1 und Anlage 2 zu Art. 246a EGBGB), angepasst auf digitale Inhalte.
 *
 * WICHTIG, haengt nicht am Code (TODO Ilja):
 * Die Ausnahme in § 3 Abs. 4 greift nur, wenn ThriveCart im Checkout eine
 * aktiv anzuklickende Checkbox zeigt: Zustimmung zum sofortigen Beginn UND
 * Bestaetigung, dass damit das Widerrufsrecht erlischt. Ohne diese Checkbox
 * hat jeder Kunde 14 Tage Widerrufsrecht, auch nach dem Download.
 */

function Paragraph({ n, title, id, children }: { n: string; title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={id ? "scroll-mt-32" : undefined}>
      <h2 className="font-semibold text-deep-charcoal text-lg mb-4">
        § {n} {title}
      </h2>
      {children}
    </section>
  );
}

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-32 px-6">
      <div className="max-w-[760px] mx-auto">

        <p className="text-xs font-mono uppercase tracking-[0.2em] text-refined-gold mb-4">Rechtliches</p>
        <h1 className="font-instrument text-5xl text-deep-charcoal mb-4 leading-tight">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="text-deep-charcoal/50 text-sm mb-16">SABALA MENTORING LLC · Stand: August 2026</p>

        <div className="space-y-12 text-deep-charcoal/80 leading-relaxed">

          <Paragraph n="1" title="Geltungsbereich und Anbieter">
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der
              SABALA MENTORING LLC, 30 N Gould St Ste N, 82801 Sheridan, WY, Vereinigte Staaten von
              Amerika (nachfolgend „Anbieter") und ihren Kunden.
            </p>
            <p className="mt-4">
              Gegenstand sind insbesondere: Konzeption und Entwicklung von Webseiten, Einführung und
              Aufbau von KI-Systemen und Automatisierungen, Schulungen und Kurse der KI-Akademie,
              Mentoring und Beratung sowie digitale Produkte zum Download, darunter Setups,
              Anleitungen, Prompts und Custom GPTs.
            </p>
            <p className="mt-4">
              Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt,
              die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit
              zugerechnet werden können (§ 13 BGB). Unternehmer ist, wer in Ausübung einer
              gewerblichen oder selbständigen beruflichen Tätigkeit handelt (§ 14 BGB).
            </p>
            <p className="mt-4">
              Abweichende Bedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, der
              Anbieter stimmt ihnen ausdrücklich schriftlich zu.
            </p>
          </Paragraph>

          <Paragraph n="2" title="Vertragsschluss, Vertragstext und Eingabefehler">
            <p>
              Die Darstellung der Leistungen auf der Website stellt kein rechtlich bindendes Angebot
              dar, sondern eine Aufforderung zur Abgabe eines Angebots. Mit dem Absenden der
              Bestellung gibt der Kunde ein verbindliches Angebot ab. Der Vertrag kommt zustande,
              wenn der Anbieter die Bestellung bestätigt oder die Leistung bereitstellt.
            </p>
            <p className="mt-4">
              <strong>Vertragssprache</strong> ist Deutsch.
            </p>
            <p className="mt-4">
              <strong>Speicherung des Vertragstextes:</strong> Der Anbieter speichert die
              Bestelldaten. Der Kunde erhält die Bestelldaten sowie diese Bedingungen nach
              Vertragsschluss per E-Mail in Textform. Die Bestelldaten sind über die Website nicht
              gesondert abrufbar.
            </p>
            <p className="mt-4">
              <strong>Korrektur von Eingabefehlern:</strong> Vor dem verbindlichen Absenden der
              Bestellung kann der Kunde seine Eingaben jederzeit prüfen und über die üblichen
              Tastatur- und Mausfunktionen sowie die Zurück-Funktion des Browsers ändern oder den
              Bestellvorgang abbrechen.
            </p>
          </Paragraph>

          <Paragraph n="3" title="Widerrufsrecht für Verbraucher" id="widerruf">
            <p className="text-deep-charcoal/60 text-sm">
              Verbrauchern steht das folgende gesetzliche Widerrufsrecht zu. Unternehmer haben kein
              Widerrufsrecht.
            </p>

            <div className="mt-6 border border-refined-gold/30 bg-[#fcfbf9] rounded-2xl p-6 md:p-8">
              <h3 className="font-semibold text-deep-charcoal mb-4">Widerrufsbelehrung</h3>

              <h4 className="font-medium text-deep-charcoal mt-2 mb-2">Widerrufsrecht</h4>
              <p>
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
                widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
                Vertragsabschlusses.
              </p>
              <p className="mt-4">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
              </p>
              <p className="mt-2 pl-4 border-l-2 border-refined-gold/40">
                SABALA MENTORING LLC<br />
                30 N Gould St Ste N, 82801 Sheridan, WY<br />
                Vereinigte Staaten von Amerika<br />
                E-Mail: <a href="mailto:sabala@sabala-mentoring.com" className="text-refined-gold hover:underline">sabala@sabala-mentoring.com</a><br />
                Telefon: <a href="tel:+995591443665" className="text-refined-gold hover:underline">+995 591 44 36 65</a>
              </p>
              <p className="mt-4">
                mittels einer eindeutigen Erklärung (zum Beispiel ein mit der Post versandter Brief
                oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
                Sie können dafür das unten abgedruckte Muster-Widerrufsformular verwenden, das jedoch
                nicht vorgeschrieben ist.
              </p>
              <p className="mt-4">
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die
                Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>

              <h4 className="font-medium text-deep-charcoal mt-6 mb-2">Folgen des Widerrufs</h4>
              <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
                erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen
                Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von
                uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und
                spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung
                über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung
                verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
                eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart.
                In keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
              </p>
              <p className="mt-4">
                Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen
                sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis
                zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich
                dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum
                Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
              </p>

              <h4 className="font-medium text-deep-charcoal mt-6 mb-2">
                Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten
              </h4>
              <p>
                Das Widerrufsrecht erlischt bei einem Vertrag über die Bereitstellung von digitalen
                Inhalten, die nicht auf einem körperlichen Datenträger geliefert werden, wenn wir mit
                der Vertragserfüllung begonnen haben, nachdem Sie ausdrücklich zugestimmt haben, dass
                wir mit der Vertragserfüllung vor Ablauf der Widerrufsfrist beginnen, Sie Ihre
                Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der
                Vertragserfüllung Ihr Widerrufsrecht verlieren, und wir Ihnen eine Bestätigung nach
                § 312f BGB zur Verfügung gestellt haben.
              </p>
              <p className="mt-4 text-deep-charcoal/60 text-sm">
                Ende der Widerrufsbelehrung
              </p>
            </div>
          </Paragraph>

          <Paragraph n="4" title="Muster-Widerrufsformular">
            <p className="text-deep-charcoal/60 text-sm">
              Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden
              Sie es an uns zurück. Die Nutzung des Formulars ist nicht vorgeschrieben.
            </p>
            <div className="mt-6 border border-deep-charcoal/15 bg-white rounded-2xl p-6 md:p-8 font-satoshi text-[15px] leading-[1.9]">
              <p>
                An SABALA MENTORING LLC, 30 N Gould St Ste N, 82801 Sheridan, WY, Vereinigte Staaten
                von Amerika, E-Mail: sabala@sabala-mentoring.com
              </p>
              <p className="mt-5">
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den
                Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*)
              </p>
              <p className="mt-5">_______________________________________________</p>
              <p className="mt-5">Bestellt am (*) / erhalten am (*): _____________________</p>
              <p className="mt-3">Name des/der Verbraucher(s): _____________________</p>
              <p className="mt-3">Anschrift des/der Verbraucher(s): _____________________</p>
              <p className="mt-3">
                Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
                _____________________
              </p>
              <p className="mt-3">Datum: _____________________</p>
              <p className="mt-5 text-deep-charcoal/50 text-sm">(*) Unzutreffendes streichen.</p>
            </div>
          </Paragraph>

          <Paragraph n="5" title="Preise und Zahlungsbedingungen">
            <p>
              Die Angebote des Anbieters richten sich an Unternehmen und Selbständige. Die auf der
              Website angegebenen Preise sind Nettopreise und verstehen sich zuzüglich der gesetzlich
              geltenden Umsatzsteuer. Der endgültige Betrag einschließlich Umsatzsteuer wird vor
              Abgabe der Bestellung im Bestellvorgang ausgewiesen.
            </p>
            <p className="mt-4">
              Kommt im Einzelfall dennoch ein Vertrag mit einem Verbraucher zustande, gilt der im
              Bestellvorgang ausgewiesene Gesamtpreis einschließlich Umsatzsteuer. Maßgeblich ist
              dann der Steuersatz des Landes, in dem der Verbraucher seinen gewöhnlichen Aufenthalt
              hat.
            </p>
            <p className="mt-4">
              Die Zahlung erfolgt über den im Bestellvorgang gewählten Zahlungsdienstleister. Bei
              Zahlungsverzug ist der Anbieter berechtigt, weitere Leistungen bis zum Ausgleich der
              offenen Forderung zurückzustellen.
            </p>
          </Paragraph>

          <Paragraph n="6" title="Mitwirkungspflichten des Kunden">
            <p>
              Der Kunde stellt alle für die Erbringung der Leistungen erforderlichen Informationen,
              Materialien, Zugänge und Freigaben rechtzeitig bereit. Verzögerungen auf Kundenseite
              verlängern vereinbarte Fristen in angemessenem Umfang. Der Kunde stellt sicher, dass er
              an überlassenen Inhalten wie Texten, Bildern und Logos die erforderlichen Rechte hält.
            </p>
          </Paragraph>

          <Paragraph n="7" title="Termine, Absagen und Nichterscheinen">
            <p>
              Einzeltermine können bis 24 Stunden vor dem vereinbarten Termin kostenfrei abgesagt
              oder verschoben werden. Bei späteren Absagen oder bei Nichterscheinen gilt der Termin
              als in Anspruch genommen.
            </p>
            <p className="mt-4">
              Dem Kunden bleibt der Nachweis vorbehalten, dass dem Anbieter kein oder ein wesentlich
              geringerer Schaden entstanden ist.
            </p>
          </Paragraph>

          <Paragraph n="8" title="Laufzeiten, Programme und Kündigung">
            <p>
              Mentoring, Begleitungen und Programme mit fester Laufzeit erfordern eine gesonderte
              Vereinbarung. Vereinbarte Laufzeiten sind grundsätzlich verbindlich.
            </p>
            <p className="mt-4">
              Das Recht beider Parteien zur Kündigung aus wichtigem Grund bleibt unberührt. Soweit es
              sich um Dienste höherer Art handelt, die aufgrund besonderen Vertrauens übertragen
              werden, bleibt das gesetzliche Kündigungsrecht nach § 627 BGB unberührt. Gesetzliche
              Kündigungsrechte von Verbrauchern werden durch diese Bedingungen nicht eingeschränkt.
            </p>
            <p className="mt-4">
              Der Anbieter übernimmt keine Garantie für den Eintritt bestimmter wirtschaftlicher oder
              persönlicher Erfolge.
            </p>
          </Paragraph>

          <Paragraph n="9" title="Digitale Produkte: Nutzungsrechte">
            <p>
              Bei digitalen Produkten erhält der Kunde nach vollständiger Zahlung ein einfaches,
              zeitlich unbefristetes und nicht übertragbares Recht zur Nutzung für eigene Zwecke,
              einschließlich der Nutzung in eigenen Kundenprojekten.
            </p>
            <p className="mt-4">
              Nicht gestattet sind die Weitergabe, der Weiterverkauf, die Veröffentlichung und das
              Zugänglichmachen der erworbenen Inhalte an Dritte sowie deren Nutzung zur Erstellung
              eines konkurrierenden Konkurrenzprodukts, jeweils ohne ausdrückliche schriftliche
              Zustimmung des Anbieters.
            </p>
          </Paragraph>

          <Paragraph n="10" title="Mängel und Aktualisierungen bei digitalen Produkten">
            <p>
              Für Verträge mit Verbrauchern über digitale Produkte gelten die gesetzlichen
              Bestimmungen der §§ 327 ff. BGB. Der Anbieter stellt das digitale Produkt frei von
              Produkt- und Rechtsmängeln bereit.
            </p>
            <p className="mt-4">
              Soweit eine dauerhafte Bereitstellung oder eine Aktualisierungspflicht vereinbart ist,
              informiert der Anbieter über erforderliche Aktualisierungen und stellt sie im
              vereinbarten Umfang bereit. Bei einmalig bereitgestellten Produkten besteht eine
              Aktualisierungspflicht nur, soweit dies ausdrücklich zugesagt wurde.
            </p>
          </Paragraph>

          <Paragraph n="11" title="Haftung">
            <p>
              Der Anbieter haftet unbegrenzt für Schäden aus der Verletzung des Lebens, des Körpers
              oder der Gesundheit sowie für Vorsatz und grobe Fahrlässigkeit.
            </p>
            <p className="mt-4">
              Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
              Vertragspflichten, also solcher Pflichten, deren Erfüllung die ordnungsgemäße
              Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde
              regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den vorhersehbaren,
              vertragstypischen Schaden begrenzt. Im Übrigen ist die Haftung ausgeschlossen.
            </p>
            <p className="mt-4">
              Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.
            </p>
            <p className="mt-4">
              Der Anbieter haftet nicht für unternehmerische Entscheidungen, die der Kunde auf Basis
              von Beratungs-, Schulungs- oder Coaching-Inhalten trifft. Der Erfolg von Maßnahmen
              hängt von einer Vielzahl individueller Faktoren ab, auf die der Anbieter keinen
              Einfluss hat.
            </p>
          </Paragraph>

          <Paragraph n="12" title="Urheberrecht">
            <p>
              Alle vom Anbieter bereitgestellten Inhalte, Materialien, Skripte, Prompts und sonstigen
              Unterlagen sind urheberrechtlich geschützt. Kunden erhalten ausschließlich die
              ausdrücklich eingeräumten Nutzungsrechte. Eine darüber hinausgehende Nutzung,
              Vervielfältigung oder Weitergabe ist ohne schriftliche Zustimmung des Anbieters
              untersagt.
            </p>
          </Paragraph>

          <Paragraph n="13" title="Datenschutz">
            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <Link href="/datenschutz" className="text-refined-gold hover:underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </Paragraph>

          <Paragraph n="14" title="Anwendbares Recht, Gerichtsstand und Streitbeilegung">
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
              Für Verbraucher gilt diese Rechtswahl nur insoweit, als nicht zwingende
              Verbraucherschutzvorschriften des Staates, in dem der Verbraucher seinen gewöhnlichen
              Aufenthalt hat, entgegenstehen.
            </p>
            {/* TODO Ilja: Wenn du einen festen Gerichtsstand fuer Unternehmer willst, muss der
                mit dem Anwalt abgestimmt werden. Die LLC sitzt in Wyoming, ein deutscher
                Gerichtsstand laesst sich nicht einfach behaupten. Bis dahin: gesetzliche Regeln. */}
            <p className="mt-4">
              Für die Zuständigkeit der Gerichte gelten die gesetzlichen Bestimmungen. Gegenüber
              Verbrauchern bleiben die gesetzlichen Gerichtsstände in jedem Fall unberührt.
            </p>
            <p className="mt-4">
              Der Anbieter ist nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen (§ 36 Abs. 1 Nr. 1 VSBG).
            </p>
          </Paragraph>

          <Paragraph n="15" title="Salvatorische Klausel">
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die
              Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen
              Bestimmung tritt die gesetzliche Regelung.
            </p>
          </Paragraph>

        </div>

        <div className="mt-20 pt-8 border-t border-deep-charcoal/10 flex gap-6 text-sm text-deep-charcoal/50">
          <Link href="/impressum" className="hover:text-refined-gold transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-refined-gold transition-colors">Datenschutz</Link>
        </div>
      </div>
    </div>
  );
}
