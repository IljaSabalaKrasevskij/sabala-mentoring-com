import type { Metadata } from "next";

/* ─────────────────────────────────────────────────────────────────────────
   /beratung — Die Beratungsstunde (Mini-Produkt, Aktionspreis).
   Bewusst als Server Component gebaut: der FAQ-Block nutzt natives
   <details>/<summary> statt JS-Accordion. Dadurch stehen alle Antworten im
   HTML und sind für Google und die KI-Suchen lesbar. Das ist bei einer
   Seite, deren Substanz aus 40 Fragen besteht, der ganze Punkt.
   Fragen kommen aus [[Beratungsstunde/Fragenkatalog]] im Vault, nicht erfunden.
   ───────────────────────────────────────────────────────────────────────── */

// HIER den ThriveCart-Link eintragen, sobald das Produkt existiert.
// Solange das Feld leer ist, fuehrt der Button zu einer Anfrage-Mail statt ins Leere.
// Das ist Absicht: die Seite darf live sein, bevor der Checkout steht.
const CHECKOUT_THRIVECART = "";

const CHECKOUT =
  CHECKOUT_THRIVECART ||
  "mailto:sabala@sabala-mentoring.com" +
    "?subject=Beratungsstunde%2097%20Euro" +
    "&body=Hallo%20Sabala%2C%0A%0Aich%20moechte%20die%20Beratungsstunde%20buchen.%0A%0AMeine%20Fragen%3A%0A-%20%0A%0AViele%20Gruesse%0A";

const CHECKOUT_BEREIT = Boolean(CHECKOUT_THRIVECART);

const PREIS = "97";
const PREIS_REGULAER = "200";
const GUTSCHEIN = "120";        // Gutschein fuer den naechsten Second-Brain-Kurs, netto
const GUTSCHEIN_CODE = "BERATUNG120";  // muss in ThriveCart als Coupon existieren

const gold = "#b8963e";
const goldLight = "#d4ae5a";
const cream = "#faf8f5";
const deep = "#2e2b26";
const warmMid = "#7a7268";

export const metadata: Metadata = {
  title: "Beratungsstunde: deine Fragen zu KI, Claude und Webseiten | Sabala",
  description:
    "Eine Stunde 1:1 zu Webseiten mit Claude Code, Deployment, Second Brain Setup, HTML-Präsentationen, lokalen Agenten und Datensicherheit. 65 typische Fragen mit Antworten. 97 € statt 200 € netto, dazu 120 € Gutschein für den nächsten Second-Brain-Kurs.",
  alternates: { canonical: "https://sabala-mentoring.com/beratung" },
};

/* Was du in der Stunde klärst. Bewusst kurz gehalten. */
const MITNEHMEN = [
  "Einen klaren nächsten Schritt statt zwanzig offener Tabs.",
  "Antworten auf genau deine Fragen, nicht auf ein Standardprogramm.",
  "Die Werkzeuge, die du wirklich brauchst, und die, die du dir sparen kannst.",
  "Die Abkürzungen an den Stellen, an denen ich selbst Wochen verloren habe.",
  "Eine ehrliche Einschätzung, ob dein Vorhaben in deinem Zeitrahmen realistisch ist.",
  "Eine schriftliche Zusammenfassung, mit der du am nächsten Tag weiterarbeitest.",
];

const ABLAUF = [
  { n: "01", t: "Du buchst und schreibst mir deine Fragen", d: "Nach der Buchung suchst du dir einen Termin aus und schickst mir vorab, was dich beschäftigt. Ich bereite mich darauf vor." },
  { n: "02", t: "Wir sprechen eine Stunde", d: "Per Video, Bildschirm geteilt. Wir gehen deine Fragen durch, ich zeige dir Dinge live statt sie zu beschreiben." },
  { n: "03", t: "Du bekommst die Notizen", d: "Danach schicke ich dir eine Zusammenfassung mit den Links, Tools und Schritten, über die wir gesprochen haben." },
];

/* FAQ-Katalog. Reihenfolge = Iljas Schwerpunkt, nicht Alphabet.
   Quellen: Session-Analysen der Akademie (echte Teilnehmerfragen, 26.6. + 3.7.2026),
   Feedback-PDF einer Kundin (24.8.2026), Fragen aus Kundenprojekten.
   Formuliert in der Ich-Perspektive dessen, der es selbst machen will. */
const FAQ_GRUPPEN: { titel: string; thema: string; fragen: [string, string][] }[] = [
  {
    titel: "Webseiten mit Claude Code",
    thema: "Damit sie nach dir aussieht und nicht nach Vorlage.",
    fragen: [
      ["Wie baue ich eine Webseite mit KI, die nicht nach KI aussieht?",
       "Der Grund, warum KI-Seiten sich alle ähneln, ist selten das Werkzeug. Es ist der leere Prompt. Wer nur sagt, bau mir eine Webseite, bekommt den Durchschnitt aus allem, was das Modell je gesehen hat. Der Hebel liegt davor: du gibst Claude erst deine Marke, also Farben, Schriften, Tonfall, Bildsprache und drei Seiten, die du gut findest. Ab da baut es deine Seite. In der Stunde machen wir das an deiner Marke."],
      ["Woran erkennt man, dass eine Seite von einer KI gebaut wurde?",
       "An wiederkehrenden Mustern. Drei Karten nebeneinander mit Icon und drei Zeilen Text. Verläufe von Lila nach Blau. Überschriften mit Wortspiel, die nichts sagen. Lächelnde Stockfoto-Menschen im Meeting. Wir schauen auf deine Seite oder dein Vorbild, und ich zeige dir, welche Stellen dieses Muster tragen und was du stattdessen machst."],
      ["Wie komme ich von der leeren Seite zu einer Struktur, die verkauft?",
       "Die Reihenfolge der Abschnitte entscheidet mehr als das Design. Wer mit dem Preis öffnet, verliert. Wer nie zum Preis kommt, auch. Wir gehen deine Seite Abschnitt für Abschnitt durch und sortieren sie danach, in welcher Reihenfolge ein Interessent die Fragen im Kopf hat."],
      ["Wie schreibe ich Texte, die nach mir klingen und nicht nach Marketing?",
       "Indem du der KI Material von dir gibst, bevor sie schreibt. Alte E-Mails, Sprachnachrichten, ein Podcast-Transkript. Aus echtem Material entsteht dein Ton, aus einem leeren Prompt entsteht LinkedIn-Sprache. Ich zeige dir, wie ich meinen eigenen Schreibstil als Regelwerk hinterlegt habe."],
      ["Woher nehme ich Bilder, wenn ich keine Fotos habe?",
       "Drei Wege: eigene Fotos, lizenzfreie Quellen, KI-generierte Bilder. Alle drei haben Fallen bei Rechten und Wiedererkennbarkeit. Ich arbeite mit allen dreien und sage dir, was zu deinem Budget passt und wo du aufpassen musst."],
      ["Wordpress, Baukasten oder selbst gebaut. Was passt zu mir?",
       "Das hängt daran, wie oft du selbst etwas änderst und wie wichtig Tempo ist. Ich habe alle drei Wege gebaut. Manchmal ist Wordpress die richtige Antwort, auch wenn ich selbst anders arbeite. Du bekommst eine Empfehlung für deinen Fall, keine Grundsatzdebatte."],
    ],
  },
  {
    titel: "Claude Code und Terminal",
    thema: "Was das ist, was es kostet, wie du reinkommst.",
    fragen: [
      ["Was ist Claude Code, und wozu brauche ich das Terminal?",
       "Claude im Browser ist ein Gespräch. Claude Code sitzt auf deinem Rechner und darf dort Dateien lesen, schreiben und Programme starten. Deshalb kann es eine ganze Webseite bauen, statt sie nur zu beschreiben. Das Terminal ist die Tür, durch die du mit ihm sprichst, und du tippst dort in normalen Sätzen."],
      ["Ich habe noch nie ein Terminal benutzt. Ist das ein Ausschlusskriterium?",
       "Nein. In meinen Kursen saß bisher niemand, der programmieren kann. Die Angst vor dem schwarzen Fenster ist größer als das Fenster. Wir öffnen es in der Stunde einmal gemeinsam, damit du siehst, wie wenig dahinter steckt."],
      ["Wann nutze ich den Chat und wann Claude Code?",
       "Das ist die häufigste Verwechslung überhaupt, sie kommt in jedem Kurs. Kurz: der Chat kennt nur, was du hineinkopierst. Claude Code kennt deine Dateien und Projekte. Planen und Denken geht gut im Chat, Bauen und Ändern gehört in Claude Code. Wo genau die Grenze liegt, zeige ich dir an einem Beispiel."],
      ["Wo gehört die CLAUDE.md hin, und was schreibe ich da rein?",
       "Das ist die kleine Steuerdatei, die Claude sagt, wer du bist und wie du arbeitest. Sie ist der Hebel mit dem größten Effekt und gleichzeitig die Datei, bei der die meisten den falschen Speicherort erwischen. Wir legen deine gemeinsam an."],
      ["Reicht der kostenlose Account, und was kostet mich das im Monat?",
       "Zum Ausprobieren reicht der kostenlose Zugang. Sobald du ernsthaft arbeitest, stehst du sonst ständig vor Limits. Wir rechnen an deiner geplanten Nutzung durch, was realistisch zusammenkommt, damit du nicht auf Verdacht ein Abo kaufst."],
      ["Was sind Skills, und wer macht die eigentlich?",
       "Skills sind fertige Fähigkeiten, die du dir dazuholst, statt sie zu bauen. Die Frage nach der Herkunft ist die richtige Frage: nicht alles, was es gibt, gehört auf deinen Rechner. Ich zeige dir, worauf ich schaue, bevor ich etwas installiere."],
      ["Kann ich per Sprache statt Tippen arbeiten?",
       "Ja, und für lange Anweisungen ist das deutlich schneller. Ich diktiere den größten Teil meiner Arbeit. Welches Setup dafür lokal läuft und nichts nach außen schickt, zeige ich dir."],
    ],
  },
  {
    titel: "Online bringen und Deployment",
    thema: "Von deinem Rechner ins Netz, mit deiner Domain.",
    fragen: [
      ["Wie bringe ich meine mit Claude gebaute Seite überhaupt online?",
       "Auf dem Rechner ist sie fertig, aber niemand sieht sie. Es braucht drei Dinge: einen Ort für den Code, einen Dienst, der ihn ausliefert, und deine Domain, die darauf zeigt. Bei mir dauert das inzwischen Minuten. Genau diesen Weg gehen wir durch, an deinem Projekt."],
      ["Was kostet Hosting, und was brauche ich davon wirklich?",
       "Für eine normale Selbständigen-Webseite reicht ein kostenloser oder sehr günstiger Tarif. Ich sage dir, wo die Grenze liegt, ab der es wirklich Geld kostet, damit du nicht auf Vorrat bezahlst."],
      ["Wie verbinde ich meine Domain damit?",
       "Über zwei Einträge bei deinem Domain-Anbieter. Daran bleiben die meisten hängen, weil die Oberflächen überall anders heißen. Sag mir vorher, wo deine Domain liegt, dann gehen wir es an deinem echten Konto durch."],
      ["Ich ersetze meine alte Seite. Verliere ich meine Google-Rankings?",
       "Nur wenn du die alten Adressen verschwinden lässt. Jede alte URL braucht eine Weiterleitung auf ihre neue Entsprechung. Das ist Pflicht und wird beim Umzug am häufigsten vergessen. Wir schauen uns an, welche deiner Seiten heute Besucher bringen."],
      ["Was ist Git, und muss ich das verstehen?",
       "Git ist die Versionsgeschichte deines Projekts, also die Möglichkeit, jederzeit zurückzuspringen. Verstehen musst du davon wenig. Du solltest nur wissen, dass es dein Sicherheitsnetz ist und warum es bei der Installation mitkommt."],
      ["Wie ändere ich später etwas, ohne die Seite kaputtzumachen?",
       "Indem jede Änderung zuerst in einer Vorschau landet, die nur du siehst. Passt es nicht, geht es zurück auf den letzten funktionierenden Stand. Das ist eingebaut, sobald der Aufbau stimmt, und nimmt die Angst aus jeder Änderung."],
    ],
  },
  {
    titel: "Rechtssicher betreiben",
    thema: "Cookie-Banner, Datenschutz, Impressum, ohne Panik.",
    fragen: [
      ["Brauche ich ein Cookie-Banner, und wenn ja, welches?",
       "Das hängt daran, was auf deiner Seite läuft. Bindest du nichts Fremdes ein, brauchst du oft keins. Sobald Analytics, Karten, Videos oder Schriften von fremden Servern dazukommen, sieht es anders aus. Wir gehen durch, was auf deiner Seite tatsächlich lädt, und du weißt danach, was du brauchst."],
      ["Wie bringe ich eine Webseite rechtssicher online?",
       "Impressum, Datenschutzerklärung, ein Kontaktweg und saubere Einbindung fremder Dienste. Dazu die Frage, wo dein Anbieter die Daten verarbeitet. Ich zeige dir die Punkte, die bei fast jedem Projekt fehlen, und sage dir klar, wo meine Auskunft aufhört und du eine anwaltliche Prüfung brauchst."],
      ["Brauche ich einen Hinweis, dass die Seite mit KI gebaut wurde?",
       "Für den Bau der Seite selbst nicht. Interessanter wird es, wenn auf deiner Seite eine KI mit Besuchern spricht oder Daten verarbeitet. Wir klären, welcher Fall bei dir vorliegt."],
      ["Wo muss ich hosten, damit die Daten in Europa bleiben?",
       "Es gibt Anbieter, bei denen du die Region festlegen kannst, und solche, bei denen das nicht sauber möglich ist. Was das für dein Kontaktformular und deine Analytics bedeutet, schauen wir uns konkret an."],
      ["Wie halte ich Passwörter und Schlüssel aus dem Code raus?",
       "Zugangsdaten gehören nie in den Code, sondern in eine getrennte Datei, die niemals mit hochgeladen wird. Das ist der Fehler, der am häufigsten passiert und am teuersten wird, gerade wenn dein Code öffentlich liegt."],
    ],
  },
  {
    titel: "Second Brain Setup",
    thema: "Damit Claude dein Wissen kennt und behält.",
    fragen: [
      ["Warum vergisst Claude alles, sobald ich ein neues Fenster öffne?",
       "Weil jedes Gespräch bei null anfängt. Genau dagegen baut man ein Gedächtnis: eine Datei, die beschreibt, wer du bist, plus eine durchsuchbare Wissensbasis, in die Claude hineinschaut. Ich zeige dir das Prinzip an meinem eigenen Aufbau, der über zweitausend Dateien umfasst."],
      ["Wie fange ich an, wenn ich Obsidian noch nie benutzt habe?",
       "Mit einem leeren Ordner und drei Dateien. Der Fehler ist, ein System aufzubauen, bevor man Inhalt hat. Wir schauen, welches Wissen bei dir schon herumliegt und wie es sortiert gehört, damit es Claude auch findet."],
      ["Ich habe Obsidian schon. Fange ich trotzdem von vorne an?",
       "Nein. Wir schauen auf dein bestehendes Setup und bauen das Gedächtnis dort ein, wo es Sinn ergibt. Ein gewachsener Vault ist ein Vorteil, kein Hindernis."],
      ["Wie hole ich meine bestehenden Dokumente da rein?",
       "Word-Dateien, PDFs, alte Notizen und Transkripte lassen sich umwandeln und einsortieren. Die eigentliche Arbeit ist nicht das Umwandeln, sondern die Frage, wohin was gehört. Genau dafür lohnt sich eine Stunde zu zweit."],
      ["Kann ich das auf meiner NAS oder in einer Cloud liegen haben?",
       "Ja, mit Fallstricken. Manche Sync-Dienste laden Dateien erst herunter, wenn jemand sie öffnet, und dann findet Claude sie nicht zuverlässig. Ich sage dir, welche Kombination bei mir stabil läuft und welche Probleme macht."],
      ["Wie recherchiere ich ein Thema so, dass es danach nutzbar ist?",
       "Der Weg ist immer derselbe: Thema wählen, in die Tiefe recherchieren, das Ergebnis sortiert ablegen, Claude Zugriff geben. Danach arbeitet er zu diesem Thema wie jemand, der seit Jahren nichts anderes macht. Das ist der Kern der KI-Akademie, und in der Stunde bekommst du den Überblick."],
    ],
  },
  {
    titel: "Daten und Datensicherheit",
    thema: "Wo deine Daten landen und was bei dir bleibt.",
    fragen: [
      ["Wo landen meine Daten, wenn ich mit Claude arbeite?",
       "Das hängt am Zugang und an deinen Einstellungen. Die Unterschiede zwischen den Tarifen sind real und werden selten erklärt. Wir schauen uns deinen konkreten Zugang an und stellen ein, was einzustellen ist."],
      ["Darf ich Kundendaten oder Mandantendaten durch eine KI schicken?",
       "Hier bin ich am vorsichtigsten. Es hängt an deiner Branche, deinen Verträgen und am genutzten Modell. Ich sage dir, was aus meiner Praxis geht, wo ich selbst Grenzen ziehe, und wo du eine rechtliche Prüfung brauchst statt meiner Meinung."],
      ["Was bleibt lokal auf meinem Rechner, und was geht ins Netz?",
       "Es gibt Aufbauten, bei denen deine Notizen den Rechner nie verlassen. Wir klären, was für dich nötig ist und was übertrieben wäre, damit du weder fahrlässig noch unnötig umständlich arbeitest."],
      ["Kann ich Modelle lokal laufen lassen, damit nichts rausgeht?",
       "Ja, und für viele Aufgaben reicht das inzwischen. Es ist langsamer und braucht Rechenleistung, dafür bleiben die Daten bei dir. Ich zeige dir, welche Werkzeuge dafür taugen und ab wann es sich lohnt."],
      ["Können meine Mitarbeiter nur auf bestimmte Bereiche zugreifen?",
       "Das lässt sich über die Struktur deiner Ablage lösen, nicht über ein Rechtesystem in der KI. Wie man das sauber trennt, gehen wir an deinem Fall durch."],
      ["Gibt es Backups, und wer kümmert sich um Updates?",
       "Bei einem sauberen Aufbau ist jede Version deiner Seite gespeichert und du kannst jederzeit zurück. Bei Systemen mit Plugins ist regelmäßige Pflege dagegen Pflicht, sonst wird die Seite zur offenen Tür."],
    ],
  },
  {
    titel: "HTML-Präsentationen",
    thema: "Decks, die jedes Mal gleich gut aussehen.",
    fragen: [
      ["Wie baue ich Präsentationen mit Claude Code statt mit PowerPoint?",
       "Als HTML-Seite, die im Browser läuft. Der Vorteil ist, dass du sie mit einem Satz änderst, statt Kästchen zu verschieben, und dass sie auf jedem Rechner gleich aussieht. Ich baue meine Kundendecks seit Monaten so."],
      ["Wie erreiche ich, dass jedes Deck gleich gut aussieht?",
       "Indem das Aussehen einmal als Regelwerk festgeschrieben wird: Deckblatt, Schriftgrößen, Logo-Position, Farben. Danach baut Claude nicht irgendein Deck, sondern deins. Ich zeige dir mein Regelwerk und wie du deins bekommst."],
      ["Wie wird aus einer Recherche automatisch eine fertige Präsentation?",
       "Recherche, Ablage im Vault, Deck-Aufbau. Wenn die Kette einmal steht, entsteht aus einem Thema in wenigen Minuten ein Deck. Genau das ist der Ablauf, den ich für meine eigenen Angebote nutze."],
      ["Kann ich das als PDF weitergeben?",
       "Ja, und zwar in Präsentationsqualität im Querformat. Der Weg dahin hat ein paar Tücken bei Seitenumbrüchen und Schriften, die ich inzwischen kenne."],
      ["Warum wird bei mir immer etwas abgeschnitten?",
       "Weil Folien auf jedem Bildschirm anders hoch sind. Es gibt einen Weg, Inhalte einzupassen statt sie abzuschneiden. Das ist eine Kleinigkeit, die aus einem peinlichen Deck ein sauberes macht."],
    ],
  },
  {
    titel: "Apps und eigene Werkzeuge",
    thema: "Eigene Tools bauen und sicher betreiben.",
    fragen: [
      ["Kann ich mir mit Claude Code eine eigene kleine App bauen?",
       "Ja. Ich betreibe damit unter anderem ein Dashboard für die Lead-Gewinnung und mehrere interne Werkzeuge. Der Unterschied zur Webseite ist, dass Daten gespeichert werden, und genau daran hängen die wichtigen Fragen."],
      ["Wo hoste ich so eine App, ohne mir ein Sicherheitsproblem einzukaufen?",
       "Sobald echte Daten im Spiel sind, brauchst du Zugangsschutz, saubere Datenbankabfragen und getrennte Zugangsdaten. Das sind drei Punkte, die man von Anfang an richtig macht oder später teuer nachrüstet. Ich gehe sie mit dir durch."],
      ["Wie schütze ich ein internes Dashboard vor fremdem Zugriff?",
       "Mit einem Login, das nicht selbst gebaut ist, und der Regel, dass nichts Internes öffentlich erreichbar sein darf. Wir schauen, was bei dir angemessen ist, ohne dass du gleich ein Firmen-Login-System brauchst."],
      ["Wie verbinde ich meine App mit Daten, die ich schon habe?",
       "Über die Schnittstellen der Dienste, die du nutzt, oder über einen Export. Was davon stabil läuft und was regelmäßig kaputtgeht, sage ich dir aus eigener Erfahrung."],
    ],
  },
  {
    titel: "Agenten und Automatisierung",
    thema: "Aufgaben, die dir wirklich abgenommen werden.",
    fragen: [
      ["Wie baue ich einen Agenten, der eine Aufgabe wirklich übernimmt?",
       "Ein Agent ist eine Beschreibung: was er kann, worauf er zugreifen darf, wie er entscheidet. Ich zeige dir an einem echten Beispiel von mir, wie so eine Beschreibung aussieht und wo die Grenze zwischen praktisch und Spielerei verläuft."],
      ["Was kann ich sinnvoll automatisieren, und wo lohnt es sich nicht?",
       "Alles, was du regelmäßig gleich machst und wo ein Fehler nicht weh tut. Nicht automatisieren solltest du Seltenes und alles, wo ein Fehler direkt Kunden trifft. Wir sortieren deine Aufgaben in diese beiden Töpfe."],
      ["Kann etwas jeden Tag automatisch laufen, ohne dass ich es starte?",
       "Ja, das lässt sich einrichten. Ich lasse zum Beispiel täglich einen Durchlauf für Systempflege laufen. Wir schauen, ob es bei dir etwas gibt, das sich dafür eignet."],
      ["Wie verbinde ich Claude mit meinen Tools wie Kalender oder E-Mail?",
       "Über Verbindungen zu Diensten, die du schon nutzt. Ich sage dir, welche davon stabil laufen, welche noch wackeln und wo du besser die Finger von lässt."],
      ["Wie lasse ich mehrere Agenten parallel arbeiten?",
       "Das geht und ist bei großen Aufgaben ein echter Zeitgewinn. Es lohnt sich aber erst, wenn die Grundlagen sitzen. Ich sage dir ehrlich, ob du an diesem Punkt schon bist."],
    ],
  },
  {
    titel: "Kontrolle und Zugänge",
    thema: "Damit du selbst rankommst und niemandem ausgeliefert bist.",
    fragen: [
      ["Kann ich Texte, Bilder und Preise später selbst ändern?",
       "Das ist die wichtigste Frage der ganzen Liste, und sie kam bei mir wörtlich von einer Kundin. Eine Webseite, die du für jede Preisänderung an jemanden schicken musst, ist eine Abhängigkeit. Wir klären, wie dein Aufbau aussehen muss, damit du selbst rankommst."],
      ["Bekomme ich am Ende wirklich alle Zugänge?",
       "Webseite, Hosting, Domain, Analytics, Search Console und alle verwendeten Tools. Das gehört in eine Übergabeliste, die du abhaken kannst. Ich zeige dir, wie so eine Liste aussieht, damit du sie bei jedem Projekt einfordern kannst."],
      ["Was passiert, wenn mein Dienstleister nicht mehr erreichbar ist?",
       "Wenn alles auf deinen Konten läuft und der Code dir gehört, läuft deine Seite weiter. Diese Frage stellst du am besten jedem, mit dem du arbeitest, und zwar bevor ihr anfangt."],
      ["Kann ich später zu jemand anderem wechseln?",
       "Wenn dein Aufbau auf offenen Standards steht, ja. Sitzt du in einem geschlossenen System, wird es teuer. Wir schauen, wo du gerade stehst und was ein Wechsel kosten würde."],
    ],
  },
  {
    titel: "Gefunden werden",
    thema: "Google, Local SEO und die neuen KI-Suchen.",
    fragen: [
      ["Warum findet mich bei Google niemand?",
       "Meist an einer von drei Stellen: Google kann die Seite nicht richtig lesen, sie beantwortet keine Frage, nach der jemand sucht, oder sie ist gar nicht erst im Index. Wir prüfen die drei Punkte an deiner Seite, das dauert Minuten."],
      ["Welche Themen gehören auf welche Seite?",
       "Eine Seite, ein Thema. Wer drei Leistungen auf eine Seite packt, rankt für keine davon richtig. Wir sortieren deine Leistungen auf eigene Unterseiten."],
      ["Wie werde ich in ChatGPT, Claude und Google AI Overviews zitiert?",
       "Das läuft anders als klassisches SEO. KI-Systeme zitieren Seiten, die eine Frage direkt und knapp beantworten, in klarer Struktur und lesbar ohne JavaScript. Die Seite, die du gerade liest, ist genau so gebaut, und ich zeige dir warum."],
      ["Wie wichtig ist Local SEO für mich?",
       "Wenn du Kunden vor Ort hast, ist das dein größter Hebel. Adresse, Stadtteil, strukturierte Unternehmensdaten und ein Google-Unternehmensprofil, bei dem Name, Adresse und Telefonnummer überall identisch geschrieben sind."],
      ["Wie messe ich, ob meine Seite etwas bringt?",
       "Besucherzahlen sind die uninteressanteste Zahl. Interessant ist, wie viele Menschen den Termin-Button klicken und wie viele wirklich anfragen. Wir richten die Messung darauf aus, und ich zeige dir eine Lösung, die ohne Cookie-Banner auskommt."],
    ],
  },
  {
    titel: "Zur Beratungsstunde selbst",
    thema: "Ablauf, Vorwissen, Gutschein.",
    fragen: [
      ["Wie läuft die Stunde ab?",
       "Per Video mit geteiltem Bildschirm. Du schickst mir vorab deine Fragen, ich bereite mich darauf vor. In der Stunde zeige ich dir Dinge live, statt sie zu beschreiben. Danach bekommst du eine schriftliche Zusammenfassung mit allen Links und Schritten."],
      ["Brauche ich Vorwissen?",
       "Nein. Sag mir vorher, wo du stehst, dann setze ich dort an. Ich habe Menschen dabei, die noch nie ein Terminal geöffnet haben, und solche, die schon Seiten gebaut haben und an einer Stelle festhängen."],
      ["Was, wenn meine Frage gar nicht in der Liste steht?",
       "Dann ist sie trotzdem willkommen. Die Liste zeigt, was oft gefragt wird, und ist keine Einschränkung. Schreib mir einfach, was dich beschäftigt."],
      ["Was, wenn wir die Stunde nicht voll brauchen?",
       "Dann hören wir früher auf. Ich verlängere nichts künstlich. Umgekehrt schmeiße ich dich auch nicht auf die Minute raus, wenn wir mitten in etwas stecken."],
      ["Wie funktioniert der Gutschein über 120 €?",
       "Direkt nach dem Kauf bekommst du einen Gutscheincode. Den löst du ein, wenn du dich für den nächsten Second-Brain-Kurs anmeldest, und zahlst statt 397 € nur 277 €. Der Gutschein ist damit 120 € wert und liegt über dem, was die Stunde dich kostet."],
      ["Muss ich den Kurs buchen, damit sich die Stunde lohnt?",
       "Nein. Die Stunde steht für sich, du bekommst deine Antworten und die schriftliche Zusammenfassung. Der Gutschein ist ein Zusatz für den Fall, dass du weitermachen willst, keine Bedingung."],
      ["Wie lange gilt der Gutschein?",
       "Für den nächsten Durchlauf des Second-Brain-Kurses nach deiner Beratungsstunde. Wenn dir dieser Termin nicht passt, sag Bescheid, dann finden wir eine Lösung."],
      ["Ist das ein verkapptes Verkaufsgespräch?",
       "Nein. Du bekommst eine Stunde Antworten, und danach entscheidest du frei. Wenn du danach willst, dass ich etwas für dich baue, sprechen wir darüber. Wenn nicht, hast du trotzdem, wofür du bezahlt hast."],
    ],
  },
];

export default function BeratungPage() {
  const anzahlFragen = FAQ_GRUPPEN.reduce((s, g) => s + g.fragen.length, 0);

  // FAQPage-Schema: lässt Google und die KI-Suchen die Antworten direkt zitieren.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GRUPPEN.flatMap((g) =>
      g.fragen.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      }))
    ),
  };

  return (
    <div style={{ background: cream, color: deep }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(120px, 16vh, 190px) 24px clamp(60px, 9vh, 90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <p className="font-mono" style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: gold, marginBottom: 24 }}>
            Einführungsaktion
          </p>
          <h1
            className="font-serif"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.015em", marginBottom: 26 }}
          >
            Eine Stunde. Deine Fragen.{" "}
            <em style={{ fontStyle: "italic", color: gold }}>Klare Antworten.</em>
          </h1>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.65, color: warmMid, maxWidth: 620, marginBottom: 38 }}>
            Webseiten mit Claude Code, die Seite online bringen, dein Second Brain aufsetzen,
            HTML-Präsentationen, eigene Agenten, und die Frage, wo deine Daten dabei landen.
            Statt dich durch dreißig Tutorials zu graben, fragst du einmal jemanden, der das
            jeden Tag macht.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 16, marginBottom: 12 }}>
            <span className="font-serif" style={{ fontSize: "clamp(3rem, 7vw, 4.4rem)", fontStyle: "italic", color: gold, lineHeight: 1 }}>
              {PREIS} €
            </span>
            <span className="font-mono" style={{ fontSize: 14, color: warmMid, letterSpacing: "0.05em" }}>
              regulär {PREIS_REGULAER} € · zzgl. MwSt.
            </span>
          </div>
          {/* B2B-Hinweis trägt die Netto-Auszeichnung (§ 3 PAngV). Nicht entfernen. */}
          <p className="font-mono" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: warmMid, opacity: 0.75, marginBottom: 20 }}>
            Angebot für Unternehmen und Selbständige
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: deep, marginBottom: 34, paddingLeft: 14, borderLeft: `2px solid ${gold}` }}>
            Dazu bekommst du einen Gutschein über <strong>{GUTSCHEIN} €</strong> für den nächsten
            Second-Brain-Kurs. Der ist mehr wert als die Stunde selbst.
          </p>

          <a
            href={CHECKOUT}
            className="font-sans"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12, background: gold, color: "#0a0806",
              fontWeight: 600, letterSpacing: "0.06em", padding: "19px 40px", fontSize: "1.02rem",
            }}
          >
            {CHECKOUT_BEREIT ? "Beratungsstunde sichern" : "Beratungsstunde anfragen"}
            <svg width="18" height="12" viewBox="0 0 20 12" fill="none" aria-hidden>
              <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── GUTSCHEIN ───────────────────────────────────────────────────── */}
      <section style={{ padding: "0 24px clamp(60px, 9vh, 90px)" }}>
        <div
          style={{
            maxWidth: 820, margin: "0 auto", background: "rgba(184,150,62,0.08)",
            border: `1px solid rgba(184,150,62,0.35)`, padding: "clamp(28px, 4vw, 42px)",
          }}
        >
          <p className="font-mono" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 14 }}>
            Du bekommst mehr zurück, als du zahlst
          </p>
          <p className="font-serif" style={{ fontSize: "clamp(1.35rem, 2.8vw, 1.85rem)", lineHeight: 1.35, marginBottom: 14 }}>
            Nach der Stunde bekommst du einen Gutschein über {GUTSCHEIN} € für den nächsten
            Second-Brain-Kurs.
          </p>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.65, color: warmMid, marginBottom: 18 }}>
            Die Stunde kostet dich {PREIS} €, der Gutschein ist {GUTSCHEIN} € wert. Entscheidest du dich
            danach für den Kurs, hast du also nicht nur nichts bezahlt, sondern stehst besser da als
            vorher. Entscheidest du dich dagegen, hast du trotzdem deine Antworten.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", alignItems: "baseline" }}>
            <span className="font-mono" style={{ fontSize: 13, color: deep }}>
              Second-Brain-Kurs regulär 397 € &rarr; mit Gutschein {397 - Number(GUTSCHEIN)} €
            </span>
            <a href="/akademie" style={{ fontSize: "0.98rem", color: gold, textDecoration: "underline", textUnderlineOffset: 3 }}>
              Zum Kurs
            </a>
          </div>
        </div>
      </section>

      {/* ── WAS DU MITNIMMST ────────────────────────────────────────────── */}
      <section style={{ padding: "0 24px clamp(60px, 9vh, 90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.5rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: 26 }}>
            Was du danach hast
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
            {MITNEHMEN.map((m) => (
              <li key={m} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span aria-hidden style={{ flex: "0 0 auto", width: 6, height: 6, borderRadius: "50%", background: gold, marginTop: 10 }} />
                <span style={{ fontSize: "1.05rem", lineHeight: 1.6, color: warmMid }}>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── THEMEN ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 24px clamp(70px, 10vh, 100px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.5rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: 12 }}>
            Worüber wir sprechen können
          </h2>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.65, color: warmMid, maxWidth: 560, marginBottom: 32 }}>
            Du entscheidest, worum es geht. Das sind die Bereiche, in denen ich täglich arbeite.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2, background: "rgba(46,43,38,0.1)", border: "1px solid rgba(46,43,38,0.1)" }}>
            {FAQ_GRUPPEN.filter((g) => g.titel !== "Zur Beratungsstunde selbst").map((g) => (
              <div key={g.titel} style={{ background: cream, padding: "24px 22px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                  <h3 className="font-serif" style={{ fontSize: "1.18rem", fontWeight: 400, lineHeight: 1.25 }}>{g.titel}</h3>
                  <span className="font-mono" style={{ flex: "0 0 auto", fontSize: 11, color: gold, letterSpacing: "0.08em" }}>{g.fragen.length}</span>
                </div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.55, color: warmMid }}>{g.thema}</p>
              </div>
            ))}
          </div>
          <p className="font-mono" style={{ fontSize: 11.5, letterSpacing: "0.09em", textTransform: "uppercase", color: warmMid, opacity: 0.7, marginTop: 18 }}>
            Die Zahl ist die Menge gesammelter Fragen zu diesem Thema
          </p>
        </div>
      </section>

      {/* ── ABLAUF ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 24px clamp(70px, 10vh, 100px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.5rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: 30 }}>
            So läuft es ab
          </h2>
          <div style={{ display: "grid", gap: 22 }}>
            {ABLAUF.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 20, alignItems: "flex-start", borderTop: "1px solid rgba(46,43,38,0.12)", paddingTop: 22 }}>
                <span className="font-mono" style={{ flex: "0 0 auto", fontSize: 13, color: gold, letterSpacing: "0.1em", paddingTop: 4 }}>
                  {s.n}
                </span>
                <div>
                  <h3 className="font-serif" style={{ fontSize: "1.3rem", fontWeight: 400, marginBottom: 6 }}>{s.t}</h3>
                  <p style={{ fontSize: "1rem", lineHeight: 1.62, color: warmMid }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#f3efe8", padding: "clamp(70px, 10vh, 110px) 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <p className="font-mono" style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: gold, marginBottom: 18 }}>
            {anzahlFragen} Fragen, die wirklich gestellt werden
          </p>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4.4vw, 3rem)", fontWeight: 400, lineHeight: 1.08, marginBottom: 18 }}>
            Vielleicht ist deine schon dabei
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.65, color: warmMid, maxWidth: 600, marginBottom: 50 }}>
            Diese Fragen habe ich nicht erfunden. Sie kommen aus Kursen, aus Kundenprojekten
            und aus einer Feedback-Liste, die mir eine Kundin geschickt hat. Wenn du dich in
            mehreren wiederfindest, ist die Stunde für dich gebaut.
          </p>

          {FAQ_GRUPPEN.map((gruppe) => (
            <div key={gruppe.titel} style={{ marginBottom: 46 }}>
              <h3
                className="font-mono"
                style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: deep, opacity: 0.55, marginBottom: 4, paddingBottom: 12, borderBottom: `1px solid rgba(184,150,62,0.4)` }}
              >
                {gruppe.titel}
              </h3>
              {gruppe.fragen.map(([q, a]) => (
                <details key={q} style={{ borderBottom: "1px solid rgba(46,43,38,0.1)" }}>
                  <summary
                    className="font-serif"
                    style={{ cursor: "pointer", listStyle: "none", padding: "20px 40px 20px 0", fontSize: "1.15rem", lineHeight: 1.4, position: "relative" }}
                  >
                    {q}
                    <span aria-hidden style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", color: goldLight, fontSize: "1.4rem", lineHeight: 1 }}>
                      +
                    </span>
                  </summary>
                  <p style={{ padding: "0 40px 22px 0", fontSize: "1rem", lineHeight: 1.7, color: warmMid, marginTop: -4 }}>
                    {a}
                  </p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── ABSCHLUSS-CTA ───────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(70px, 10vh, 110px) 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4.4vw, 2.9rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20 }}>
            Stell deine Frage einfach jemandem, der sie schon beantwortet hat.
          </h2>
          <p style={{ fontSize: "1.08rem", lineHeight: 1.65, color: warmMid, marginBottom: 34 }}>
            Eine Stunde für {PREIS} € statt {PREIS_REGULAER} €. Dazu {GUTSCHEIN} € Gutschein für den
            nächsten Second-Brain-Kurs.
          </p>
          <a
            href={CHECKOUT}
            className="font-sans"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12, background: gold, color: "#0a0806",
              fontWeight: 600, letterSpacing: "0.06em", padding: "20px 44px", fontSize: "1.05rem",
            }}
          >
            {CHECKOUT_BEREIT ? "Termin sichern" : "Stunde anfragen"}
            <svg width="18" height="12" viewBox="0 0 20 12" fill="none" aria-hidden>
              <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="font-mono" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: warmMid, opacity: 0.7, marginTop: 22 }}>
            Angebot für Unternehmen und Selbständige · zzgl. MwSt.
          </p>
        </div>
      </section>

      {/* Marker der details-Elemente ausblenden (Safari + Chrome) */}
      <style>{`
        details > summary::-webkit-details-marker { display: none; }
        details[open] > summary > span[aria-hidden] { transform: translateY(-50%) rotate(45deg); }
        details > summary > span[aria-hidden] { transition: transform 0.25s ease; }
      `}</style>
    </div>
  );
}
