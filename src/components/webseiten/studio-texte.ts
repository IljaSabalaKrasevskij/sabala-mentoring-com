/* ─────────────────────────────────────────────────────────────────────────
   Texte des Rundgangs, deutsch und englisch. Angelegt am 12.9.2026.

   Die englische Spalte ist KEINE Uebersetzung, sondern eigener Verkaufstext.
   Englisch traegt kuerzere Saetze und mehr Verb, deutsche Schachtelsaetze
   wirken darin steif. Gleiche Aussage, eigene Sprache.

   `Lang` liegt hier, weil Komponenten die untere Schicht sind: die Seite
   importiert von hier, nicht umgekehrt.
   ───────────────────────────────────────────────────────────────────────── */

export type Lang = "de" | "en";

const de = {
  bereich: "Ein Rundgang durch Sabala Studios",
  marke: "Sabala Studios",
  raeume: "Räume im Studio",
  raum: { window: "Schaufenster", reception: "Empfang", gallery: "Die Arbeiten" },
  ueberspringen: "Rundgang überspringen",
  zurueck: "Zurück zum Schaufenster",
  laedt: "Der Laden öffnet sich …",
  alsUebersicht: "Als Übersicht ansehen",
  naeher: "Komm näher.",
  naeherHinweis: "Scrollen, um näher zu kommen.",
  willkommen: "Willkommen.",
  arbeitenTitel: "Die Arbeiten.",
  eintreten: "Tritt ein.",
  tuerLabel: "Die Ladentür öffnen und eintreten",
  kicker: "High-End Web Development",
  erklaerungSchliessen: "Erklärung schließen",
  exponateEntdecken: "Exponate entdecken",
  dingeImFenster: "Die Dinge im Schaufenster",
  wieHelfen: "Wie kann ich dir helfen?",
  arbeitenAnsehen: "Arbeiten ansehen",
  weiterScrollen: "Weiter scrollen",
  fragenAnGastgeber: "Fragen an den Gastgeber",
  ausgewaehlteArbeiten: "Ausgewählte Arbeiten.",
  liveAnsehen: "Live-Webseite ansehen",
  caseStudy: "Case Study ansehen",
  arbeitWaehlen: "Arbeiten auswählen",
  vorherige: "Vorherige Arbeit",
  naechste: "Nächste Arbeit",
  projektBesprechen: "Mein Projekt besprechen",
  mitFahrt: "Mit Bildfahrt",
  ohneFahrt: "Ohne Bildfahrt",
  hinweis: {
    unavailable: "Auf diesem Gerät als Übersicht.",
    flat: "Raum für Raum.",
    entdecken: "Die Dinge im Fenster entdecken.",
    ersterEindruck: "Ein erster Eindruck. Ein Blick hinter die Fassade.",
    wasWissen: "Was möchtest du wissen?",
    weitergehen: "Scrollen, um weiterzugehen.",
  },
  bildAlt: {
    poster: "Das Schaufenster von Sabala Studios",
    window: "Sabala Studios: ein Londoner Laden mit schwarzer Fassade, Messing und sechs Exponaten",
    reception: "Der Sabala-Adler hinter dem Empfangstresen aus Walnuss und schwarzem Marmor",
    gallery: "Der Sabala-Adler präsentiert ausgewählte Arbeiten im Londoner Atelier",
  },
  exponate: [
    { object: "Das Dossier", label: "Positionierung", title: "Die richtigen Menschen erkennen sich.", text: "Für wen du da bist. Was du veränderst. Warum gerade du. Wir bringen dein Angebot auf einen klaren Punkt.", proof: "Positionierung für RFQ to PO und Stefanie Lommel." },
    { object: "Das Manuskript", label: "Storytelling", title: "Eine Geschichte, die weiterführt.", text: "Deine Sprache, ein roter Faden und ein verständlicher nächster Schritt. Aus einzelnen Leistungen wird eine Geschichte, der man folgen kann.", proof: "RFQ to PO: Your RFQ. Verified. Delivered." },
    { object: "Das Maßjackett", label: "Design", title: "Dein Auftritt so gut wie deine Arbeit.", text: "Eine eigene Bildwelt, bewusste Typografie und Gestaltung bis ins Detail. Damit man die Qualität deiner Arbeit schon vor dem Gespräch erkennt.", proof: "Eigene Markenwelten für YUNA und RFQ to PO." },
    { object: "Das Notebook", label: "Webseite", title: "Der Eindruck hält auch dem Klick stand.", text: "Dein Auftritt in eigenem Code. Für kleine und große Bildschirme gebaut, für Suchmaschinen strukturiert und mit messbaren Kontaktwegen.", proof: "Eigener Code, Suchmaschinen-Anbindung und Analytics bei YUNA." },
    { object: "Das Planetarium", label: "Systeme", title: "Hinter dem Auftritt geht es weiter.", text: "Anfragen erfassen, Informationen ordnen, nächste Schritte vorbereiten. Wir entwickeln die Abläufe, die dein Geschäft hinter der Webseite braucht.", proof: "Vega Leads und Fleurs Lead-Agent." },
    { object: "Der Schlüssel", label: "Eigentum", title: "Dein Unternehmen. Dein Eigentum.", text: "Domain, Hosting und Code in deinem Besitz. Du bekommst einen Auftritt, über den du selbst bestimmen kannst.", proof: "Bei RFQ to PO liegen Domain, Hosting und Repo bei der Kundin." },
  ],
  leistungen: [
    { title: "Positionierung & Geschichte", text: "Klar sagen, warum du die richtige Wahl bist.", detail: "Wir schärfen dein Angebot, deine Zielgruppe und die Geschichte, die beides verbindet." },
    { title: "Webseite & Design", text: "Die Qualität deiner Arbeit sichtbar machen.", detail: "Wir übersetzen deine Substanz in Bildwelt, Design und eine Webseite in eigenem Code." },
    { title: "Systeme dahinter", text: "Den nächsten Schritt gleich mitdenken.", detail: "Wir verbinden den Auftritt mit den Abläufen, die aus Interesse eine bearbeitete Anfrage machen." },
  ],
  schilder: [
    { tag: "inklusive", title: "Die richtigen Kunden erkennen sich.", features: ["Zielgruppe und Angebot", "Wettbewerb und Unterschied", "Ein klarer nächster Schritt"], benefit: "Damit Besucher sofort verstehen, warum gerade du die richtige Wahl bist." },
    { tag: "inklusive", title: "Eine Geschichte, die weiterführt.", features: ["Botschaft und roter Faden", "Texte in der Sprache deiner Kunden", "Eine Seitenstruktur, die trägt"], benefit: "Damit aus Aufmerksamkeit Interesse wird und aus Interesse ein Gespräch." },
    { tag: "inklusive", title: "Dein Auftritt so gut wie deine Arbeit.", features: ["Eigene Bildwelt und Art Direction", "Typografie bis ins Detail", "Für großen und kleinen Bildschirm gestaltet"], benefit: "Damit deine Qualität schon vor dem ersten Gespräch sichtbar wird." },
    { tag: "inklusive", title: "Qualität, die auch hinter der Fassade trägt.", features: ["Webseite in eigenem Code", "Tempo und Suchmaschinenstruktur", "Messbare Kontaktwege"], benefit: "Damit der starke erste Eindruck auch beim Benutzen deiner Webseite hält." },
    { tag: "inklusive", title: "Nach der Anfrage geht es weiter.", features: ["Formulare und Qualifizierung", "Verbundene Abläufe", "Übergabe und Nachfassen"], benefit: "Damit Interesse im richtigen Prozess ankommt und bearbeitet wird." },
    { tag: "100 %", title: "Dein Unternehmen. Dein Eigentum.", features: ["Deine Domain", "Dein Hosting und dein Code", "Zugänge sauber übergeben"], benefit: "Damit du langfristig selbst über deinen Auftritt bestimmst." },
  ],
  fragen: [
    { question: "Brauche ich eine neue Webseite?", answer: "Vielleicht braucht deine Webseite einen neuen Auftritt. Vielleicht fehlt ihr nur Klarheit. Entscheidend ist: Erkennt man deine Qualität, versteht man dein Angebot und findet man den nächsten Schritt? Eine gute Webseite macht deine Qualität sichtbar und hilft den richtigen Menschen, sich für dich zu entscheiden." },
    { question: "Was gehört bei dir dazu?", answer: "Wir verbinden Positionierung, Geschichte, Design und eigenes Web Development. Dazu kommen die Abläufe hinter deinen Anfragen. So entsteht ein Auftritt, der deine Arbeit verständlich und deine Qualität sichtbar macht. Domain, Hosting und Code gehören dir." },
    { question: "Zeig mir deine Arbeit.", answer: "Sehr gern. Scroll einfach weiter. Ich nehme dich mit in den nächsten Raum und zeige dir ein paar Ergebnisse aus den Sabala Studios." },
  ],
};

const en: typeof de = {
  bereich: "A walk through Sabala Studios",
  marke: "Sabala Studios",
  raeume: "Rooms in the studio",
  raum: { window: "Shop window", reception: "Reception", gallery: "The work" },
  ueberspringen: "Skip the tour",
  zurueck: "Back to the window",
  laedt: "Opening the shop …",
  alsUebersicht: "View as an overview",
  naeher: "Come closer.",
  naeherHinweis: "Scroll to come closer.",
  willkommen: "Welcome.",
  arbeitenTitel: "The work.",
  eintreten: "Step inside.",
  tuerLabel: "Open the door and step inside",
  kicker: "High-End Web Development",
  erklaerungSchliessen: "Close the note",
  exponateEntdecken: "Explore the exhibits",
  dingeImFenster: "What is in the window",
  wieHelfen: "What can I help you with?",
  arbeitenAnsehen: "See the work",
  weiterScrollen: "Keep scrolling",
  fragenAnGastgeber: "Ask the host",
  ausgewaehlteArbeiten: "Selected work.",
  liveAnsehen: "View the live site",
  caseStudy: "Read the case study",
  arbeitWaehlen: "Choose a project",
  vorherige: "Previous project",
  naechste: "Next project",
  projektBesprechen: "Talk about my project",
  mitFahrt: "With camera moves",
  ohneFahrt: "Without camera moves",
  hinweis: {
    unavailable: "Shown as an overview on this device.",
    flat: "Room by room.",
    entdecken: "Explore what is in the window.",
    ersterEindruck: "A first impression. A look behind the facade.",
    wasWissen: "What would you like to know?",
    weitergehen: "Scroll to walk on.",
  },
  bildAlt: {
    poster: "The Sabala Studios shop window",
    window: "Sabala Studios: a London shop with a black front, brass and six exhibits",
    reception: "The Sabala eagle behind a reception counter of walnut and black marble",
    gallery: "The Sabala eagle presenting selected work in the London atelier",
  },
  exponate: [
    { object: "The dossier", label: "Positioning", title: "The right people recognise themselves.", text: "Who you are for. What you change. Why you. We bring your offer down to one clear point.", proof: "Positioning for RFQ to PO and Stefanie Lommel." },
    { object: "The manuscript", label: "Storytelling", title: "A story that leads somewhere.", text: "Your words, one thread, and a next step anyone can follow. Separate services become a story people stay with.", proof: "RFQ to PO: Your RFQ. Verified. Delivered." },
    { object: "The tailored jacket", label: "Design", title: "A presence as good as your work.", text: "Your own imagery, deliberate typography, craft down to the detail. So people see the quality of your work before they ever speak to you.", proof: "Custom brand worlds for YUNA and RFQ to PO." },
    { object: "The laptop", label: "Website", title: "The impression survives the first click.", text: "Your presence in custom code. Built for small screens and large ones, structured for search engines, with contact paths you can measure.", proof: "Custom code, search console and analytics at YUNA." },
    { object: "The orrery", label: "Systems", title: "Behind the website, the work goes on.", text: "Capture enquiries, order the information, prepare the next step. We build the flow your business needs behind the site.", proof: "Vega Leads and a lead agent for Fleur." },
    { object: "The key", label: "Ownership", title: "Your business. Yours to own.", text: "Domain, hosting and code in your name. You get a presence you decide over, not one you rent.", proof: "At RFQ to PO the domain, hosting and repository sit with the client." },
  ],
  leistungen: [
    { title: "Positioning & story", text: "Say clearly why you are the right choice.", detail: "We sharpen your offer, your audience, and the story that ties the two together." },
    { title: "Website & design", text: "Make the quality of your work visible.", detail: "We turn your substance into imagery, design and a website in custom code." },
    { title: "The systems behind it", text: "Build the next step in from the start.", detail: "We connect the site to the flow that turns interest into an enquiry you can work with." },
  ],
  schilder: [
    { tag: "included", title: "The right clients recognise themselves.", features: ["Audience and offer", "Competition and difference", "One clear next step"], benefit: "So visitors understand straight away why you are the right choice." },
    { tag: "included", title: "A story that leads somewhere.", features: ["Message and one thread", "Copy in your clients' words", "A page structure that carries"], benefit: "So attention turns into interest, and interest into a conversation." },
    { tag: "included", title: "A presence as good as your work.", features: ["Own imagery and art direction", "Typography down to the detail", "Designed for large screens and small"], benefit: "So your quality shows before the first conversation." },
    { tag: "included", title: "Quality that holds behind the facade.", features: ["Website in custom code", "Speed and search structure", "Contact paths you can measure"], benefit: "So the strong first impression survives people actually using your site." },
    { tag: "included", title: "The enquiry is not the end.", features: ["Forms and qualification", "Connected workflows", "Handover and follow-up"], benefit: "So interest lands in the right process and actually gets worked on." },
    { tag: "100 %", title: "Your business. Yours to own.", features: ["Your domain", "Your hosting and your code", "Access handed over cleanly"], benefit: "So you keep deciding over your own presence, long term." },
  ],
  fragen: [
    { question: "Do I need a new website?", answer: "Maybe your site needs a new look. Maybe it just needs clarity. What matters is this: can people see your quality, do they understand your offer, and do they find the next step? A good website makes your quality visible and helps the right people choose you." },
    { question: "What is included?", answer: "We bring together positioning, story, design and custom web development. On top of that come the workflows behind your enquiries. The result is a presence that makes your work understandable and your quality visible. Domain, hosting and code are yours." },
    { question: "Show me your work.", answer: "Gladly. Just keep scrolling. I will take you into the next room and show you a few results from Sabala Studios." },
  ],
};

export const STUDIO_TEXTE: Record<Lang, typeof de> = { de, en };
