import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung | Sabala Mentoring",
};

/* Stand August 2026. Gegen den echten Stack geprueft, nicht gegen eine Vorlage.
 *
 * Im Einsatz und hier beschrieben: Vercel (Hosting), Umami (selbst gehostet,
 * cookiefrei), ActiveCampaign (Newsletter), ThriveCart (Checkout), TidyCal
 * (Termine), Zoom (Calls), WhatsApp, Notion (Audit-Anfragen), eigene Datenbank.
 * Schriften kommen ueber next/font/google und werden beim Build heruntergeladen,
 * zur Laufzeit also von unserer eigenen Domain ausgeliefert. Keine Verbindung
 * zu Google beim Seitenaufruf.
 *
 * Bewusst NICHT mehr drin: YouTube. Die Seite bindet keine Videos ein, der
 * alte Abschnitt beschrieb eine Verarbeitung, die es nicht gibt.
 *
 * TODO Ilja (mit Anwalt klaeren, siehe Notiz im Chat):
 * 1. Art. 27 DSGVO — EU-Vertreter fuer die US-LLC. Sobald benannt, hier eintragen.
 * 2. Uebermittlungsgrundlage je US-Dienst pruefen (DPF-Zertifizierung vs. SCC).
 */

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-32 px-6">
      <div className="max-w-[760px] mx-auto">

        <p className="text-xs font-mono uppercase tracking-[0.2em] text-refined-gold mb-4">Rechtliches</p>
        <h1 className="font-instrument text-5xl text-deep-charcoal mb-4 leading-tight">Datenschutzerklärung</h1>
        <p className="text-deep-charcoal/50 text-sm mb-16">SABALA MENTORING LLC · Stand: August 2026</p>

        <div className="space-y-12 text-deep-charcoal/80 leading-relaxed">

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen
              Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten,
              mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Verantwortliche Stelle</h3>
            <p>
              SABALA MENTORING LLC<br />
              30 N Gould St Ste N, 82801 Sheridan, WY, Vereinigte Staaten von Amerika<br />
              Vertreten durch: Ilja Krasevskij, Kukuri Gogiashvili I Lane 8, Apt. 44,
              Saburtalo District, 0171 Tbilisi, Georgien<br />
              Telefon: <a href="tel:+995591443665" className="text-refined-gold hover:underline">+995 591 44 36 65</a><br />
              E-Mail: <a href="mailto:sabala@sabala-mentoring.com" className="text-refined-gold hover:underline">sabala@sabala-mentoring.com</a>
            </p>
            <p className="mt-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
              gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
              Daten entscheidet.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Geltungsbereich</h3>
            <p>
              Wir haben unseren Sitz außerhalb der Europäischen Union, richten unser Angebot aber
              ausdrücklich auch an Personen in der EU. Für diese Verarbeitung gilt die
              Datenschutz-Grundverordnung (Art. 3 Abs. 2 DSGVO). Wir behandeln Ihre Daten
              entsprechend.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">2. Hosting und Auslieferung</h2>

            <h3 className="font-medium text-deep-charcoal mb-2">Vercel</h3>
            <p>
              Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              gehostet. Beim Aufruf der Seite verarbeitet Vercel technische Zugriffsdaten,
              insbesondere Ihre IP-Adresse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an einer sicheren und zuverlässigen Bereitstellung unseres
              Angebots). Mit Vercel besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Schriftarten</h3>
            <p>
              Die auf dieser Seite verwendeten Schriftarten werden bereits beim Erstellen der Seite
              auf unseren eigenen Server kopiert und von dort ausgeliefert. Beim Aufruf der Website
              wird deshalb keine Verbindung zu Servern von Google aufgebaut, und es werden keine
              Daten an Google übertragen.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Speicherung Ihrer Eingaben</h3>
            <p>
              Angaben, die Sie in ein Formular auf dieser Website eintragen, speichern wir in einer
              von uns betriebenen Datenbank. Zugriff darauf haben ausschließlich wir selbst sowie
              technische Dienstleister, die uns beim Betrieb unterstützen und vertraglich zur
              Vertraulichkeit verpflichtet sind.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 className="font-medium text-deep-charcoal mb-2">Rechtsgrundlagen der Datenverarbeitung</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung der betroffenen Person</li>
              <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertragserfüllung oder vorvertragliche Maßnahmen</li>
              <li><strong>Art. 6 Abs. 1 lit. c DSGVO</strong> – Erfüllung einer rechtlichen Verpflichtung</li>
              <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Wahrung berechtigter Interessen</li>
            </ul>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Übermittlung in Drittländer</h3>
            <p>
              Einige der von uns eingesetzten Dienstleister sitzen in den Vereinigten Staaten. Eine
              Übermittlung findet nur statt, wenn eine der Voraussetzungen aus Kapitel V der DSGVO
              erfüllt ist, insbesondere eine Zertifizierung des Empfängers nach dem
              EU-US Data Privacy Framework oder der Abschluss der Standardvertragsklauseln der
              Europäischen Kommission. Trotz dieser Garantien lässt sich nicht vollständig
              ausschließen, dass US-Behörden auf Daten zugreifen. Bei welchem Dienst welche
              Grundlage greift, teilen wir Ihnen auf Anfrage gern mit.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
              wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
              Verarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine
              Einwilligung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich
              zulässigen Gründe für die Speicherung haben, etwa handels- oder steuerrechtliche
              Aufbewahrungsfristen.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Widerruf und Widerspruch</h3>
            <p>
              Viele Verarbeitungen sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
              eine erteilte Einwilligung jederzeit für die Zukunft widerrufen. Die Rechtmäßigkeit der
              bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
            </p>
            <p className="mt-4">
              Soweit die Verarbeitung auf Art. 6 Abs. 1 lit. e oder f DSGVO beruht, haben Sie
              jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
              Widerspruch einzulegen. Gegen die Verarbeitung für Direktwerbung können Sie jederzeit
              ohne Angabe von Gründen widersprechen.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">SSL-/TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen eine SSL- beziehungsweise TLS-Verschlüsselung.
              Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
              mit „https://" beginnt.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">4. Datenerfassung auf dieser Website</h2>

            <h3 className="font-medium text-deep-charcoal mb-2">Cookies</h3>
            <p>
              Diese Website setzt keine Cookies für Werbung, Tracking oder Profilbildung. Verwendet
              werden ausschließlich technisch notwendige Speichervorgänge, die für den Betrieb der
              Seite erforderlich sind. Eine Einwilligung nach § 25 Abs. 1 TDDDG ist dafür nicht
              erforderlich, da die Ausnahme des § 25 Abs. 2 Nr. 2 TDDDG greift. Aus demselben Grund
              zeigen wir Ihnen kein Cookie-Banner.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Server-Log-Dateien</h3>
            <p>
              Beim Aufruf der Seite werden automatisch Informationen erfasst, die Ihr Browser
              übermittelt:
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
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an technisch fehlerfreier
              Darstellung und Sicherheit).
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Formulare und Kontaktanfragen</h3>
            <p>
              Wenn Sie uns über ein Formular, per E-Mail oder per Telefon kontaktieren, speichern und
              verarbeiten wir Ihre Angaben zur Bearbeitung Ihres Anliegens und für den Fall von
              Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage mit
              einem Vertrag zusammenhängt, sonst Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
              an der Beantwortung von Anfragen).
            </p>
            <p className="mt-4">
              Damit wir zeitnah reagieren können, werden wir über den Eingang neuer Anfragen
              benachrichtigt. Dabei kommen Benachrichtigungsdienste zum Einsatz, die den Inhalt der
              Anfrage an unser eigenes Endgerät übermitteln. Eine weitergehende Nutzung Ihrer Daten
              durch diese Dienste findet nicht statt.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Anfragen zu Webseiten-Audits</h3>
            <p>
              Fordern Sie über die Website ein Audit an, legen wir Ihre Anfrage zusätzlich in unserem
              Projektsystem ab, damit wir sie bearbeiten und nachverfolgen können. Anbieter ist die
              Notion Labs, Inc., San Francisco, USA. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche Maßnahmen).
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">WhatsApp</h3>
            <p>
              Für die Kommunikation nutzen wir unter anderem WhatsApp. Anbieter ist die WhatsApp
              Ireland Limited, Merrion Road, Dublin 4, Irland. Die Inhalte sind
              Ende-zu-Ende-verschlüsselt. WhatsApp erhält jedoch Zugriff auf Metadaten des
              Kommunikationsvorgangs und teilt diese mit der Muttergesellschaft Meta in den USA.
              Wenn Sie das vermeiden möchten, schreiben Sie uns bitte eine E-Mail.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">5. Reichweitenmessung</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">Umami (selbst gehostet)</h3>
            <p>
              Zur Auswertung der Seitennutzung verwenden wir Umami, eine quelloffene
              Analyse-Software, die wir auf unserer eigenen Infrastruktur betreiben. Die Daten
              verlassen unseren Server nicht und werden an keinen Dritten weitergegeben.
            </p>
            <p className="mt-4">
              Umami setzt keine Cookies und legt keine Kennung auf Ihrem Endgerät ab. Es wird kein
              geräteübergreifendes Profil gebildet und Sie werden nicht über mehrere Sitzungen
              hinweg wiedererkannt. IP-Adressen werden nicht gespeichert. Erfasst werden aufgerufene
              Seite, Verweisquelle, ungefähre Herkunftsregion sowie Browser- und Gerätetyp.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
              datensparsamen statistischen Auswertung unseres Angebots).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">6. Newsletter</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">ActiveCampaign</h3>
            <p>
              Für den Versand unserer Newsletter nutzen wir ActiveCampaign, LLC, 1 North Dearborn,
              Chicago, Illinois 60602, USA. Wenn Sie sich anmelden, speichern wir Ihre E-Mail-Adresse
              und die von Ihnen angegebenen weiteren Daten bei ActiveCampaign.
            </p>
            <p className="mt-4">
              Die Anmeldung erfolgt im Double-Opt-in-Verfahren: Nach Ihrer Eintragung erhalten Sie
              eine E-Mail, in der Sie die Anmeldung bestätigen. Erst danach versenden wir den
              Newsletter. Zum Nachweis Ihrer Einwilligung protokollieren wir Anmeldung und
              Bestätigung.
            </p>
            <p className="mt-4">
              ActiveCampaign wertet aus, ob und wann Newsletter geöffnet und welche Links darin
              angeklickt werden. Wir nutzen das, um unsere Inhalte an den Interessen unserer Leser
              auszurichten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), die Sie
              jederzeit für die Zukunft widerrufen können. Der Abmeldelink steht in jeder E-Mail.
              Nach der Abmeldung speichern wir Ihre Adresse auf einer Sperrliste, damit Sie keine
              weiteren Mailings erhalten. Mit ActiveCampaign besteht ein Auftragsverarbeitungsvertrag
              nach Art. 28 DSGVO.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">7. Terminbuchung</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">TidyCal</h3>
            <p>
              Für die Buchung von Gesprächsterminen nutzen wir TidyCal, ein Angebot der AppSumo LLC,
              Austin, Texas, USA. Wenn Sie einen Termin buchen, werden die von Ihnen dort
              eingegebenen Daten (insbesondere Name, E-Mail-Adresse, Terminwunsch und Ihre Angaben
              zum Anliegen) bei TidyCal verarbeitet. Die Buchungsseite wird auf einer eigenen Domain
              von TidyCal aufgerufen, nicht innerhalb dieser Website eingebettet. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">8. Shop und Zahlungsabwicklung</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">ThriveCart</h3>
            <p>
              Der Verkauf unserer digitalen Produkte läuft über ThriveCart, ein Angebot der
              ThriveCart LLC, USA. Der Bestell- und Bezahlvorgang findet auf einer Seite von
              ThriveCart statt. Dort verarbeitete Daten sind insbesondere Name, E-Mail-Adresse,
              Rechnungsanschrift sowie die für die Zahlung erforderlichen Angaben. Ihre vollständigen
              Zahlungsdaten erhalten wir nicht, diese werden direkt von den angebundenen
              Zahlungsdienstleistern verarbeitet.
            </p>
            <p className="mt-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Soweit wir Daten
              aufgrund handels- oder steuerrechtlicher Vorgaben aufbewahren müssen, erfolgt dies auf
              Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">9. Videokonferenzen</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">Zoom</h3>
            <p>
              Für Gespräche, Webinare und Online-Meetings nutzen wir Zoom, ein Angebot der Zoom
              Communications, Inc., San Jose, Kalifornien, USA. Verarbeitet werden dabei
              insbesondere Ihr Name, Ihre E-Mail-Adresse, IP-Adresse, Geräte- und Verbindungsdaten
              sowie, je nach Nutzung, Text-, Audio- und Videodaten. Aufzeichnungen erstellen wir nur,
              wenn wir Sie vorher darauf hinweisen.
            </p>
            <p className="mt-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei Terminen im Rahmen eines Vertrags,
              im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effektiver
              Kommunikation). Mit Zoom besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">10. Ihre Rechte im Überblick</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
              <li><strong>Widerruf einer Einwilligung</strong> (Art. 7 Abs. 3 DSGVO)</li>
              <li><strong>Beschwerderecht</strong> bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Sie können sich mit einer Beschwerde an die Aufsichtsbehörde Ihres gewöhnlichen
              Aufenthaltsorts oder Ihres Arbeitsplatzes wenden. Zur Ausübung Ihrer Rechte schreiben
              Sie uns bitte an:{" "}
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
