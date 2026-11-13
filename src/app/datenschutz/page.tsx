import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung | Sabala Mentoring",
};

/* Stand August 2026. Gegen den echten Stack geprueft, nicht gegen eine Vorlage.
 *
 * Im Einsatz und hier beschrieben: Vercel (Hosting), Umami (selbst gehostet,
 * cookiefrei), ActiveCampaign (Newsletter), ThriveCart (Checkout), TidyCal
 * (Termine), Zoom (Calls), WhatsApp, Notion (Audit-Anfragen), eigene Datenbank.
 * Seit November 2026: Sabala Social (Instagram-Stichworte, Abschnitt 11, Loeschweg /daten-loeschen).
 * Seit November 2026: Formulare mit Telefon (Pflicht, wird geprueft), Botschutz ohne fremden Dienst (Abschnitt 4)
 * und Haekchen fuer Mails. Double-Opt-in laeuft ueber
 * das eigene Postfach und die eigene Datenbank (src/lib/anmeldung.ts), ActiveCampaign bekommt den Kontakt
 * erst nach dem Bestaetigungsklick. Abschnitte 4 (Formulare) und 6 (Newsletter) beschreiben genau das.
 * Schriften kommen ueber next/font/google und werden beim Build heruntergeladen,
 * zur Laufzeit also von unserer eigenen Domain ausgeliefert. Keine Verbindung
 * zu Google beim Seitenaufruf.
 *
 * Seit 12.11.2026 (Abschnitt 6): Rundmails aus Sabala Mail (Repo sabala-mail, scripts/rundmail-senden.mjs) ueber das eigene Postfach
 * sabala@ bei der Serverprofis GmbH (Rechenzentrum Muenchen; heute im Wiederverkaeufer-Konto, Umzug ins eigene Konto
 * geplant). Fuer grosse Listen Amazon SES eu-central-1, Absender sabala@news.sabala-mentoring.com. Vertragspartner bei
 * US-Kontoadresse: Amazon Web Services, Inc. (Customer Agreement, Abschnitt 12), AV-Vertrag ueber Service Terms 1.14,
 * DPF aktiv als Teil der Zertifizierung von Amazon.com, Inc. (dataprivacyframework.gov, geprueft 12.11.2026).
 * WICHTIG: In SES den Virtual Deliverability Manager nicht mit "Engagement tracking" einschalten (im Assistenten
 * steht es auf an). Sonst stimmt der Satz "Öffnungen und Klicks messen wir auch hier nicht" nicht mehr.
 * Abmeldung: /newsletter/abmelden plus Ein-Klick-Kopfzeilen (RFC 8058), traegt in Turso und bei ActiveCampaign aus.
 * Datenbank (Abschnitt 2): Turso (ChiselStrike Inc.), Region aws-eu-west-1 (Irland).
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
        <h1 className="font-instrument text-4xl sm:text-5xl text-deep-charcoal mb-4 leading-tight">Datenschutzerklärung</h1>
        <p className="text-deep-charcoal/50 text-sm mb-16">SABALA MENTORING LLC · Stand: November&nbsp;2026</p>

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
              von uns betriebenen Datenbank. Sie läuft beim Anbieter Turso (ChiselStrike Inc., 2093
              Philadelphia Pike #6336, Claymont, Delaware 19703, USA). Die Daten liegen auf Servern in
              Irland. Zugriff darauf haben ausschließlich wir selbst sowie
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
              mit „https://“ beginnt.
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
              In unseren Formularen fragen wir Vorname, Nachname, E-Mail-Adresse und Telefonnummer
              ab, je nach Formular auch Ihr Anliegen. Die Telefonnummer ist eine Pflichtangabe. Wir
              nutzen sie, um Sie bei Rückfragen zu Ihrem Anliegen persönlich zu erreichen und um
              ernst gemeinte Anfragen von falschen Einträgen zu unterscheiden. Dazu prüfen wir auf
              unserem eigenen Server automatisch, ob die Nummer nach den Regeln des jeweiligen Landes
              gültig ist. Für Werbeanrufe nutzen wir Ihre Nummer nicht.
            </p>
            <p className="mt-4">
              Unsere Formulare sind gegen automatisierte Einträge geschützt. Dafür setzen wir keinen
              fremden Dienst und kein Bilderrätsel ein. Beim Ausfüllen erhält Ihr Browser von unserem
              Server ein einmal gültiges Kennzeichen, das beim Absenden geprüft wird. Zusätzlich
              begrenzen wir, wie viele Formulare pro Stunde von einem Anschluss eingehen. Dazu
              speichern wir kurzzeitig, in der Regel für zwei Stunden, einen verschlüsselten Kurzwert
              Ihrer IP-Adresse, aus dem sich die Adresse nicht zurückrechnen lässt. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Schutz vor Missbrauch).
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
              Zusätzlich zählen wir, wie oft ein Formular abgeschickt und eine Datei heruntergeladen
              wird. Diese Zählung enthält keine Angaben zu Ihrer Person.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
              datensparsamen statistischen Auswertung unseres Angebots).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">6. Newsletter</h2>
            <h3 className="font-medium text-deep-charcoal mb-2">Anmeldung und Nachweis</h3>
            <p>
              Unseren Newsletter erhalten Sie nur, wenn Sie in einem unserer Formulare das Häkchen
              dafür selbst setzen. Das Häkchen ist nie vorab gesetzt. Die Anmeldung erfolgt im
              Double-Opt-in-Verfahren: Nach Ihrer Eintragung erhalten Sie eine E-Mail, in der Sie die
              Anmeldung bestätigen. Erst nach diesem Klick versenden wir den Newsletter. Die
              Bestätigungs-E-Mail verschicken wir über unser eigenes E-Mail-Postfach. Sie enthält
              keine Werbung.
            </p>
            <p className="mt-4">
              Zum Nachweis Ihrer Einwilligung speichern wir in unserer eigenen Datenbank (siehe
              Abschnitt&nbsp;2) den Wortlaut, dem Sie zugestimmt haben, das Formular, über das Sie sich
              angemeldet haben, sowie Zeitpunkt und IP-Adresse der Anmeldung und der Bestätigung.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und für den Nachweis Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse, die Einwilligung belegen zu können).
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Versand über unser eigenes Postfach</h3>
            <p>
              Seit dem 12.&nbsp;November&nbsp;2026 versenden wir unseren Newsletter über unser eigenes
              E-Mail-Postfach sabala@sabala-mentoring.com. Das Postfach liegt bei der Serverprofis GmbH,
              Otto-Lilienthal-Ring 34-36, 85622 Feldkirchen, Deutschland. Deren Server stehen in einem
              Rechenzentrum in München. Derzeit läuft das Postfach über das Konto eines IT-Dienstleisters,
              der die Leistungen von Serverprofis weiterverkauft. Der Umzug in ein eigenes Konto bei
              Serverprofis ist geplant.
            </p>
            <p className="mt-4">
              Den Versand starten wir mit unserer eigenen Software (Sabala Mail) auf unserem Rechner in
              Tiflis (Georgien). Sie liest die Empfänger aus unserer Datenbank und hält fest, an welche
              Adresse wann eine E-Mail ging. Für den Versand verwenden wir Ihre E-Mail-Adresse und Ihren
              persönlichen Abmeldelink. Ob Sie diese E-Mails öffnen oder Links darin anklicken, messen
              wir nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Versand über Amazon SES</h3>
            <p>
              Größere Versände wickeln wir über Amazon Simple Email Service (Amazon SES) ab. Anbieter ist
              die Amazon Web Services, Inc., 410 Terry Avenue North, Seattle, WA 98109-5210, USA. Wir
              nutzen dafür die Rechenzentren von Amazon in Frankfurt am Main. Absender ist dann
              sabala@news.sabala-mentoring.com, eine Adresse nur für den Versand. Ihre Antworten
              erreichen uns weiter unter sabala@sabala-mentoring.com.
            </p>
            <p className="mt-4">
              Amazon SES verarbeitet Ihre E-Mail-Adresse, den Inhalt der E-Mail und Angaben zur
              Zustellung. Meldet Ihr E-Mail-Anbieter, dass Ihre Adresse nicht erreichbar ist oder dass
              Sie eine unserer E-Mails als Spam markiert haben, setzt Amazon SES die Adresse auf eine
              Sperrliste unseres Kontos. An diese Adresse verschickt Amazon SES dann keine E-Mails mehr,
              solange wir sie nicht von der Liste nehmen. Öffnungen und Klicks messen wir auch hier
              nicht.
            </p>
            <p className="mt-4">
              Mit Amazon Web Services besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO, der
              die Standardvertragsklauseln der Europäischen Kommission einschließt. Amazon Web Services,
              Inc. ist außerdem nach dem EU-US Data Privacy Framework zertifiziert. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Versand über ActiveCampaign</h3>
            <p>
              Parallel nutzen wir für den Newsletter weiterhin ActiveCampaign, LLC, 1 North Dearborn,
              Chicago, Illinois 60602, USA. Erst nachdem Sie Ihre Anmeldung bestätigt haben,
              speichern wir Ihre E-Mail-Adresse sowie Ihren Vor- und Nachnamen bei ActiveCampaign.
            </p>
            <p className="mt-4">
              Bei Newslettern, die über ActiveCampaign versendet werden, wertet ActiveCampaign aus, ob
              und wann sie geöffnet und welche Links darin angeklickt werden. Wir nutzen das, um unsere
              Inhalte an den Interessen unserer Leser auszurichten. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. a DSGVO (Einwilligung), die Sie jederzeit für die Zukunft widerrufen können. Mit
              ActiveCampaign besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
            </p>

            <h3 className="font-medium text-deep-charcoal mt-6 mb-2">Abmeldung</h3>
            <p>
              Sie können den Newsletter jederzeit abbestellen. In jeder E-Mail steht dafür ein
              persönlicher Abmeldelink. In E-Mails aus unserem eigenen Postfach und über Amazon SES
              führt er auf die Seite sabala-mentoring.com/newsletter/abmelden. Dort genügt ein Klick auf
              „Jetzt abmelden“. Viele E-Mail-Programme zeigen außerdem oben in der E-Mail einen eigenen
              Knopf zum Abmelden, der ebenfalls mit einem Klick wirkt. Auf diesen beiden Wegen gilt die
              Abmeldung sofort, in unserer Datenbank und bei ActiveCampaign. Sie können auch auf eine
              unserer E-Mails mit „Abmelden“ antworten oder uns schreiben. Dann tragen wir Sie von Hand
              aus.
            </p>
            <p className="mt-4">
              Zum Nachweis speichern wir, wann und auf welchem Weg Sie sich abgemeldet haben, bei einer
              Abmeldung per Link oder Knopf auch die IP-Adresse. Ihre E-Mail-Adresse behalten wir auf
              einer Sperrliste, damit Sie keine weiteren Newsletter erhalten. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse, Ihre Abmeldung dauerhaft zu beachten und
              belegen zu können).
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

          <section>
            <h2 className="font-semibold text-deep-charcoal text-lg mb-4">11. Instagram: automatische Antworten auf Kommentare</h2>
            <p>
              Auf unseren Instagram-Konten @vega_leads, @sabala_mentoring und @luxus_websites können
              Sie ein Stichwort kommentieren, um zum Beispiel ein Skript oder einen Link zu erhalten.
              Dafür nutzen wir eine eigene Software (Sabala Social) über die offizielle Schnittstelle
              von Meta.
            </p>
            <p className="mt-4">Verantwortlich ist je nach Konto:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>@sabala_mentoring:</strong> SABALA MENTORING LLC (Angaben in Abschnitt&nbsp;1).</li>
              <li>
                <strong>@vega_leads und @luxus_websites:</strong> Ilja Krasevskij, Einzelunternehmer
                (Individual Entrepreneur) in Georgien, Identifikations- und Steuernummer 305845128.
                E-Mail für @vega_leads:{" "}
                <a href="mailto:kontakt@vegaleads.ai" className="text-refined-gold hover:underline whitespace-nowrap">kontakt@vegaleads.ai</a>,
                für @luxus_websites:{" "}
                <a href="mailto:kontakt@luxus-websites.com" className="text-refined-gold hover:underline whitespace-nowrap">kontakt@luxus-websites.com</a>.
              </li>
            </ul>
            <p className="mt-4">
              Wir verarbeiten dabei Ihren Instagram-Nutzernamen, die von Instagram vergebene Kennung,
              den Text Ihres Kommentars, die Nachrichten in diesem Ablauf und ob Sie unserem Konto
              folgen. Ob Sie folgen, fragen wir nur in dem Moment ab, in dem Sie auf den Knopf tippen
              oder uns antworten.
            </p>
            <p className="mt-4">
              Zweck ist, Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO,
              hilfsweise unser berechtigtes Interesse, Anfragen schnell zu beantworten (Art. 6 Abs. 1
              lit. f DSGVO). Die erste Nachricht ist als automatische Nachricht gekennzeichnet.
            </p>
            <p className="mt-4">
              Die Daten liegen auf unserem eigenen Rechner in Tiflis (Georgien), nicht bei einem
              Cloud-Anbieter. Nach 90 Tagen löschen wir sie automatisch. Georgien ist aus Sicht der EU
              ein Drittland, für das es keinen Angemessenheitsbeschluss der EU-Kommission gibt. Für die
              Nutzung von Instagram selbst gilt die Datenschutzrichtlinie von Meta.
            </p>
            <p className="mt-4">
              Wie Sie eine frühere Löschung verlangen, steht unter{" "}
              <Link href="/daten-loeschen" className="text-refined-gold hover:underline">„Daten löschen“</Link>.
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
