import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung | Sabala Mentoring",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-32 px-6">
      <div className="max-w-[760px] mx-auto">

        <p className="text-xs font-mono uppercase tracking-[0.2em] text-refined-gold mb-4">Rechtliches</p>
        <h1 className="font-instrument text-5xl text-deep-charcoal mb-4 leading-tight">Datenschutzerklärung</h1>
        <p className="text-deep-charcoal/50 text-sm mb-16">SABALA MENTORING LLC · Stand: 2025</p>

        <div className="space-y-12 text-deep-charcoal/80 leading-relaxed">

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
              sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Verantwortliche Stelle</h3>
            <p>
              SABALA MENTORING LLC<br />
              30 N Gould St Ste N, 82801 Sheridan, WY, USA<br />
              Telefon: <a href="tel:+491783561736" className="text-refined-gold hover:underline">+49 178 3561736</a><br />
              E-Mail: <a href="mailto:sabala@sabala-mentoring.com" className="text-refined-gold hover:underline">sabala@sabala-mentoring.com</a>
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Datenerfassung auf dieser Website</h3>
            <p>
              Daten werden durch Ihre Eingaben (z. B. Kontaktformulare) sowie automatisch durch
              IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser,
              Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Ihre Rechte</h3>
            <p>
              Sie haben jederzeit das Recht auf kostenlose Auskunft über Herkunft, Empfänger und
              Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht auf
              Berichtigung oder Löschung dieser Daten. Wenn Sie eine Einwilligung zur
              Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die
              Zukunft widerrufen. Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">2. Hosting</h2>
            <p>
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website
              erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich
              v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
              Kontaktdaten, Namen, Websitezugriffe und sonstige Daten handeln.
            </p>
            <p className="mt-4">
              Das Hosting erfolgt auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              einer zuverlässigen Darstellung unseres Online-Angebotes). Ein Auftragsverarbeitungsvertrag
              (AVV) wurde geschlossen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 className="font-medium text-deep-charcoal mb-2">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
              verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung
              entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
              Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich
              zulässigen Gründe für die Speicherung haben.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Rechtsgrundlagen der Datenverarbeitung</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung der betroffenen Person</li>
              <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertragserfüllung oder vorvertragliche Maßnahmen</li>
              <li><strong>Art. 6 Abs. 1 lit. c DSGVO</strong> – Erfüllung einer rechtlichen Verpflichtung</li>
              <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Wahrung berechtigter Interessen</li>
            </ul>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Widerspruchsrecht</h3>
            <p>
              Soweit die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
              haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
              gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen. Gegen die
              Verarbeitung für Direktwerbung können Sie jederzeit ohne Angabe von Gründen widersprechen.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">SSL-/TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
              Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">4. Datenerfassung auf dieser Website</h2>

            <h3 className="font-medium text-deep-charcoal mb-2">Cookies</h3>
            <p>
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete
              und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für
              die Dauer einer Sitzung (Session-Cookies) oder dauerhaft auf Ihrem Endgerät gespeichert
              (permanente Cookies).
            </p>
            <p className="mt-4">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert
              werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle
              oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des
              Browsers aktivieren.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
              Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="mt-4">
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung dieser
              Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von
              Art. 6 Abs. 1 lit. b DSGVO.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Anfrage per E-Mail oder Telefon</h3>
            <p>
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller
              daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung
              Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne
              Ihre Einwilligung weiter.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">WhatsApp</h3>
            <p>
              Für die Kommunikation nutzen wir unter anderem WhatsApp. Anbieter ist die WhatsApp Ireland
              Limited, Dublin, Irland. Die Kommunikation erfolgt über eine Ende-zu-Ende-Verschlüsselung.
              WhatsApp erhält jedoch Zugriff auf Metadaten, die im Rahmen des Kommunikationsvorgangs
              anfallen. WhatsApp teilt diese Daten mit seiner Muttergesellschaft Meta (USA).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">5. Newsletter</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">ActiveCampaign</h3>
            <p>
              Für den Versand unserer Newsletter nutzen wir ActiveCampaign, Inc., Chicago, Illinois, USA.
              ActiveCampaign ermöglicht es uns, Newsletter-Kampagnen zu analysieren (Öffnungsraten, Klicks,
              Konversionen). Die Daten werden auf Servern von ActiveCampaign verarbeitet.
            </p>
            <p className="mt-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können sich jederzeit
              vom Newsletter abmelden. Nach der Abmeldung werden Ihre Daten auf einer Sperrliste
              (Blacklist) gespeichert, um zukünftige Mailings zu verhindern.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">6. Plugins und Tools</h2>

            <h3 className="font-medium text-deep-charcoal mb-2">YouTube (Erweiterter Datenschutzmodus)</h3>
            <p>
              Diese Website bindet Videos der YouTube LLC ein. Betreiber ist die Google Ireland Limited,
              Dublin, Irland. Wir nutzen YouTube im erweiterten Datenschutzmodus. Videos im erweiterten
              Datenschutzmodus werden nach Aussage von YouTube nicht zur Personalisierung des Surfens
              bei YouTube eingesetzt, solange Sie das Video nicht abspielen.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Zoom</h3>
            <p>
              Für Videokonferenzen nutzen wir Zoom. Anbieter ist die Zoom Communications Inc.,
              San Jose, California, USA. Bei der Nutzung von Zoom werden verschiedene Daten verarbeitet
              (E-Mail-Adresse, IP-Adresse, Gerätedaten). Ein Auftragsverarbeitungsvertrag wurde
              geschlossen. Zoom ist nach dem EU-US Data Privacy Framework zertifiziert.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">7. eCommerce und Zahlungsanbieter</h2>
            <p>
              Wenn Sie bei uns bestellen oder einen Kauf tätigen, verarbeiten wir personenbezogene
              Kundendaten zur Begründung, inhaltlichen Ausgestaltung und Änderung unserer
              Vertragsbeziehungen (Art. 6 Abs. 1 lit. b DSGVO). Wir übermitteln personenbezogene Daten
              an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung notwendig ist (z. B. an
              das mit der Zahlungsabwicklung beauftragte Kreditinstitut).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">8. Audio- und Videokonferenzen</h2>
            <p>
              Bei der Teilnahme an Online-Meetings oder Videokonferenzen werden verschiedene
              personenbezogene Daten verarbeitet. Der Umfang der verarbeiteten Daten hängt davon ab,
              welche Daten Sie vor bzw. bei der Teilnahme an einem Online-Meeting, Videochat oder
              einem Webinar machen.
            </p>
            <p className="mt-4">
              Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an effektiver Kommunikation) sowie ggf. Art. 6 Abs. 1 lit. a
              DSGVO (Einwilligung).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">9. Ihre Rechte im Überblick</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
              <li><strong>Beschwerderecht</strong> bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a href="mailto:sabala@sabala-mentoring.com" className="text-refined-gold hover:underline">
                sabala@sabala-mentoring.com
              </a>
            </p>
          </section>

        </div>

        <div className="mt-20 pt-8 border-t border-deep-charcoal/10 flex gap-6 text-sm text-deep-charcoal/50">
          <Link href="/impressum" className="hover:text-refined-gold transition-colors">Impressum</Link>
          <Link href="/agb" className="hover:text-refined-gold transition-colors">AGB</Link>
        </div>
      </div>
    </div>
  );
}
