import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArticleAuditCTA } from "@/components/blog/ArticleAuditCTA";
import Image from "next/image";
import Link from "next/link";
import { BlogSpokes } from "@/components/blog/BlogSpokes";
import SabalaLogo from "@/components/brand/SabalaLogo";
import Script from "next/script";
import { ArrowLeft, Mic, MonitorPlay, Code2, Quote } from "lucide-react";

export const metadata = {
  title: "Technik Setup für Online Coaches: Equipment, das Vertrauen aufbaut",
  description: "Warum deine energetische Präsenz als Online-Coach vom Equipment abhängt. Das perfekte Hardware- und Tool-Setup für ortsunabhängiges Arbeiten.",
  openGraph: {
    title: "Technik Setup für Online Coaches · Sabala Mentoring",
    description: "Mein mobiles Coaching-Studio: Hardware, Software, Setup. Ortsunabhängig in Premium-Qualität.",
    images: ["/blog/technik-setup-online-coach/cover.jpg"],
    type: "article",
    publishedTime: "2026-01-15",
  },
};

const articleSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Technik Setup für Online Coaches: Warum deine Präsenz am Equipment hängt",
  "description": "Mobiles Premium-Studio für ortsunabhängige Coaches. Hardware, Software, Mindset.",
  "image": "https://sabala-mentoring.com/blog/technik-setup-online-coach/cover.jpg",
  "author": { "@type": "Person", "name": "Ilja Krasevskij", "alternateName": "Sabala", "url": "https://sabala-mentoring.com/ueber-mich", "sameAs": ["https://www.linkedin.com/in/iljakrasevskij/", "https://sabala-mentoring.com"], "jobTitle": "Mentor für Personal Brands", "worksFor": { "@type": "Organization", "name": "Sabala Mentoring" } },
  "publisher": { "@type": "Organization", "name": "Sabala Mentoring", "logo": { "@type": "ImageObject", "url": "https://sabala-mentoring.com/sabala-logo.svg" } },
  "datePublished": "2026-01-15",
  "dateModified": "2026-05-19",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://sabala-mentoring.com/blog/technik-setup-online-coach" }
});

const personSchemaJson = JSON.stringify({
  "@context": "https://schema.org", "@type": "Person",
  "name": "Ilja Krasevskij", "alternateName": "Sabala",
  "url": "https://sabala-mentoring.com/ueber-mich",
  "sameAs": ["https://www.linkedin.com/in/iljakrasevskij/", "https://sabala-mentoring.com"],
  "jobTitle": "Mentor für Personal Brands",
  "worksFor": { "@type": "Organization", "name": "Sabala Mentoring" },
  "knowsAbout": ["Online Coaching Setup", "Premium-Auftritt", "Ortsunabhängiges Arbeiten", "Personal Brand", "E-E-A-T"]
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Welches Mikrofon ist das beste für Online-Coaches?", "acceptedAnswer": { "@type": "Answer", "text": "Das Rode NT-USB ist mein Standard. Es liefert ein klares, warmes Stimmbild für unter 200 Euro. Mit SM-R Spinne und Mikrofonarm wird es zum kompletten Studio-Setup. Wer mobil arbeitet, ergänzt das Magic Mic Funkmikrofon mit Noise-Canceling für laute Umgebungen." } },
    { "@type": "Question", "name": "Reicht die Laptop-Webcam für Zoom-Calls als Coach?", "acceptedAnswer": { "@type": "Answer", "text": "Nein, nicht für Premium-Klienten. Eine Sony ZV-1 mit Elgato Cam Link liefert Tiefenschärfe und Bildqualität, die Vertrauen aufbaut. Die Investition (etwa 800 Euro) refinanziert sich oft mit dem ersten Premium-Klienten, weil das Erscheinungsbild den Preispunkt rechtfertigt." } },
    { "@type": "Question", "name": "Was kostet ein Premium-Setup für Online-Coaches insgesamt?", "acceptedAnswer": { "@type": "Answer", "text": "Realistisch zwischen 2000 und 3500 Euro für das volle Setup: MacBook Pro M2, Rode NT-USB plus Zubehör, Sony ZV-1 mit Cam Link, zweiter Monitor, Licht, Funkmikrofon. Wer ortsunabhängig arbeitet, addiert noch Backup-Hardware. Die Investition zahlt sich durch Vertrauen und Premium-Pricing zurück." } },
    { "@type": "Question", "name": "Welche Software brauche ich als Online-Coach minimum?", "acceptedAnswer": { "@type": "Answer", "text": "Pflicht: Zoom Pro für Calls, Notion oder Trello für Klienten-Verwaltung, Canva Pro für Visuals, TidyCal für Termine. Zusätzlich empfehlenswert: ChatGPT Pro für Konzeptarbeit, OBS Studio für aufwendigere Aufnahmen, Riverside für Podcast." } },
    { "@type": "Question", "name": "Wie wichtig ist Licht beim Online-Coaching?", "acceptedAnswer": { "@type": "Answer", "text": "Licht ist der Faktor mit dem höchsten Return on Investment. Ein Raleno 192 VideoLight für etwa 50 Euro verändert den ersten Eindruck radikal. Naturlicht von links oder vorne reicht oft schon. Gegenlicht und harte Decken-Beleuchtung sind die Killer der Online-Präsenz." } },
    { "@type": "Question", "name": "Brauche ich einen zweiten Monitor als Online-Coach?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, sobald du regelmäßig Klienten begleitest. Ein UPerfect 16 Zoll 2K USB-C Monitor ist kompakt, leicht und reisefähig. Mit iPad-Ständer auf Augenhöhe gehoben, ergonomisch und mobil. Du brauchst den Platz für Notion-Notizen, Zoom-Fenster und ggf. Whiteboard parallel." } },
    { "@type": "Question", "name": "Wie sieht das Setup für Coaches aus, die wirklich nomadisch arbeiten?", "acceptedAnswer": { "@type": "Answer", "text": "Mein komplettes Setup passt in einen Rollei Foto-Liner Ocean L Rucksack (Handgepäck) plus Koffer. MacBook, Rode-Mikrofon, Sony-Kamera, Stativ, Licht, zweiter Monitor, Stream Deck. Voraussetzung: ruhige Unterkünfte für Calls und stabiles WLAN. Wahre Ortsunabhängigkeit erfordert Cashflow und Planung." } },
    { "@type": "Question", "name": "Hängt der Vertrauensaufbau wirklich am Equipment oder ist das übertrieben?", "acceptedAnswer": { "@type": "Answer", "text": "Der erste Eindruck entscheidet in Millisekunden. Bildqualität und Tonqualität signalisieren auf unterbewusster Ebene Wertschätzung, Präsenz und Klarheit. Ein verrauschter Ton oder unscharfes Bild zerstört in Sekunden, was du auf inhaltlicher Ebene aufbauen willst. Equipment ist Substanz-Verstärker, kein Bling." } }
  ]
});

const faq = [
  { q: "Welches Mikrofon ist das beste für Online-Coaches?", a: "Das Rode NT-USB ist mein Standard. Es liefert ein klares, warmes Stimmbild für unter 200 Euro. Mit SM-R Spinne und Mikrofonarm wird es zum kompletten Studio-Setup. Wer mobil arbeitet, ergänzt das Magic Mic Funkmikrofon mit Noise-Canceling für laute Umgebungen." },
  { q: "Reicht die Laptop-Webcam für Zoom-Calls als Coach?", a: "Nein, nicht für Premium-Klienten. Eine Sony ZV-1 mit Elgato Cam Link liefert Tiefenschärfe und Bildqualität, die Vertrauen aufbaut. Die Investition refinanziert sich oft mit dem ersten Premium-Klienten." },
  { q: "Was kostet ein Premium-Setup für Online-Coaches insgesamt?", a: "Realistisch zwischen 2000 und 3500 Euro für das volle Setup: MacBook Pro M2, Rode NT-USB plus Zubehör, Sony ZV-1 mit Cam Link, zweiter Monitor, Licht, Funkmikrofon. Die Investition zahlt sich durch Vertrauen und Premium-Pricing zurück." },
  { q: "Welche Software brauche ich als Online-Coach minimum?", a: "Pflicht: Zoom Pro für Calls, Notion oder Trello für Klienten-Verwaltung, Canva Pro für Visuals, TidyCal für Termine. Zusätzlich empfehlenswert: ChatGPT Pro für Konzeptarbeit, OBS Studio für aufwendigere Aufnahmen." },
  { q: "Wie wichtig ist Licht beim Online-Coaching?", a: "Licht ist der Faktor mit dem höchsten Return on Investment. Ein Raleno 192 VideoLight für etwa 50 Euro verändert den ersten Eindruck radikal. Naturlicht von links oder vorne reicht oft schon. Gegenlicht und harte Decken-Beleuchtung sind die Killer der Online-Präsenz." },
  { q: "Brauche ich einen zweiten Monitor als Online-Coach?", a: "Ja, sobald du regelmäßig Klienten begleitest. Ein UPerfect 16 Zoll 2K USB-C Monitor ist kompakt, leicht und reisefähig. Mit iPad-Ständer auf Augenhöhe gehoben." },
  { q: "Wie sieht das Setup für Coaches aus, die wirklich nomadisch arbeiten?", a: "Mein komplettes Setup passt in einen Rollei Foto-Liner Ocean L Rucksack (Handgepäck) plus Koffer. Voraussetzung: ruhige Unterkünfte für Calls und stabiles WLAN. Wahre Ortsunabhängigkeit erfordert Cashflow und Planung." },
  { q: "Hängt der Vertrauensaufbau wirklich am Equipment oder ist das übertrieben?", a: "Der erste Eindruck entscheidet in Millisekunden. Bildqualität und Tonqualität signalisieren Wertschätzung, Präsenz und Klarheit. Ein verrauschter Ton oder unscharfes Bild zerstört in Sekunden, was du inhaltlich aufbaust. Equipment ist Substanz-Verstärker, kein Bling." },
];

const dropCapClass = "first-letter:font-instrument first-letter:text-[5rem] md:first-letter:text-[6rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-refined-gold";
const proseBlock = "prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:font-instrument prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:leading-[1.15] prose-h3:font-instrument prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-p:mb-8 prose-ul:my-8 prose-li:mb-3 prose-li:leading-[1.7]";

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <blockquote className="not-prose my-20 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
        <div className="border-l-2 border-refined-gold pl-6 md:pl-10 relative">
          <Quote className="absolute -left-3 -top-2 w-6 h-6 text-refined-gold bg-pure-surface" />
          <p className="font-instrument text-2xl md:text-4xl text-deep-charcoal leading-[1.2] italic">{children}</p>
        </div>
      </blockquote>
    </ScrollReveal>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-20 max-w-[820px] mx-auto px-6 sm:px-12 md:px-24 w-full">
      <div className="h-px bg-gradient-to-r from-transparent via-refined-gold/30 to-transparent flex-1"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-refined-gold/40"></div>
      <div className="h-px bg-gradient-to-r from-refined-gold/30 via-transparent to-transparent flex-1"></div>
    </div>
  );
}

export default function BlogPostPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">

      <Script id="schema-article" type="application/ld+json" strategy="beforeInteractive">{articleSchemaJson}</Script>
      <Script id="schema-person" type="application/ld+json" strategy="beforeInteractive">{personSchemaJson}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{faqSchemaJson}</Script>

      {/* HEADER SPACER */}
      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO SECTION */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image
          src="/blog/technik-setup-online-coach/cover.jpg"
          alt="Vintage-Workshop-Cover mit goldenen Equipment-Werkzeugen im Pencil-Style"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pure-surface via-pure-surface/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pure-surface/90 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
             <Link href="/" aria-label="Sabala Mentoring — Startseite" className="inline-block mb-8 transition-opacity hover:opacity-80">
              <SabalaLogo light size={64} />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 text-warm-steel hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
                <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
             </Link>
             
             <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
                <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">Business</span>
                <span className="text-deep-charcoal/80">Januar 2026</span>
                <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
                <span className="text-deep-charcoal/80 hidden sm:inline-block">6 Min Lesezeit</span>
             </div>

             <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.1] max-w-[1000px] mb-6 shadow-sm">
                Technik Setup für Online Coaches: Warum deine Präsenz am Equipment hängt.
             </h1>
             
             <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[700px] leading-relaxed">
                Ein schlechtes Mikrofon zerstört selbst die tiefste energetische Übertragung. Wie du ortsunabhängig arbeitest, ohne dabei an Qualität und Ausstrahlung zu verlieren.
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-6 sm:px-12 md:px-24 pt-16 md:pt-24 max-w-[900px] mx-auto w-full relative">
        <ScrollReveal>
          <div className={proseBlock}>

            <p className={`text-xl md:text-2xl font-light text-deep-charcoal !leading-[1.5] !mb-10 ${dropCapClass}`}>
              Wenn du spürst, dass du sehr fein arbeitest, viel zwischen den Zeilen wahrnimmst und auf einer tiefen, relationalen Ebene mit Menschen in Verbindung trittst, dann weißt du: <strong>Freiheit darf nicht auf Kosten der Professionalität gehen.</strong>
            </p>

            <h2>Der energetische Wert von professioneller Präsenz</h2>
            <p>
              Viele denken: <em>Ich bin ja noch am Anfang, da reicht doch auch das eingebaute Laptopmikrofon.</em> Doch exakt hier beginnt ein massiver Denkfehler. Denn Präsenz ist nichts, was erst mit einem vollen Terminkalender oder fünfstelligen Monatsumsätzen wie durch Zauberhand entsteht. Präsenz beginnt jetzt, in genau dem Moment, in dem du das erste Mal mit jemandem in einem Zoom-Raum sprichst, der dich noch nie gesehen hat.
            </p>
            <p>
              In einer Stimme schwingt Energie mit. Ruhe. Ein sicherer Raum. Subtiles Vertrauen. Ein verrauschter Ton, lauter Hall oder Gegenlicht können in Sekunden alles zunichtemachen, was du auf emotionaler Ebene aufbauen willst. Wer fein und wahrnehmungsbasiert arbeitet, muss sicherstellen, dass das Gefäß (die Technik) dieses Feingefühl auch transportieren kann.
            </p>

</div>
        </ScrollReveal>
      </section>

      <PullQuote>
        Ein gutes Setup ist weit mehr als Technik. Es ist ein unterbewusstes Ja zur Zusammenarbeit. Wertschätzung, Präsenz und Klarheit, alles in einem Frame.
      </PullQuote>

      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[900px] mx-auto w-full relative">
        <ScrollReveal>
          <div className="prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.85] text-warm-steel prose-headings:font-instrument prose-headings:text-deep-charcoal prose-strong:text-deep-charcoal prose-a:text-refined-gold prose-a:no-underline hover:prose-a:underline prose-h2:mt-16 prose-h2:mb-6 prose-p:mb-6">

            <h2>Warum echte Ortsunabhängigkeit Umsatz kostet · und gutes Premium-Setup ihn bringt</h2>
            <p>
              Lassen wir die romantische Illusion der "Strandliege mit Laptop"-Nomaden kurz beiseite: Wahre Ortsunabhängigkeit erfordert Cashflow. Du musst dir Flüge leisten, hochwertige Unterkünfte für ruhige Calls buchen und ein Backup an Finanzen haben, das dir die innere Ruhe gibt, um souverän zu begleiten. Diese Freiheit bedingt also zwingend eine erfolgreiche Business-Struktur und einen gewissen monatlichen Umsatz.
            </p>
            <p>
              Genau hier schließt sich der Kreis zur Technik: Wer hochpreisige Premium-Kunden anziehen und abschließen möchte, <em>muss</em> einen Premium-Raum halten können. Ein unscharfes MacBook-Webcam-Bild und ein scheppernder AirPods-Sound signalisieren dem Gegenüber auf tiefster, unbewusster Ebene: <em>"Hier ist es noch wackelig."</em> 
            </p>
            <p>
              Die Investition in exzellente Technik ist also kein netter Bonus, den man sich "irgendwann mal gönnt". Es ist das absolute Fundament, das dir genau den professionellen Rahmen verleiht, in dem Premium-Preise selbstverständlich wirken. Die Technik refinanziert sich durch das Vertrauen, das du im ersten Zoom-Call ausstrahlst, nahezu von selbst.
            </p>

            <h2>Mein mobiles Coaching-Studio (Hardware & Setup)</h2>
            <p>
               Nach vier Jahren ortsunabhängiger Selbstständigkeit habe ich mein Equipment so kuratiert, dass es in einen Rucksack (Handgepäck) und einen Koffer passt · und dir gleichzeitig die Qualität eines vollwertigen Studios liefert. Hier ist mein exaktes Fundament (alle Links sind meine echten Empfehlungen, ohne Affiliate-Zwang):
            </p>
             
          </div>
        </ScrollReveal>

        {/* HIGH END PRODUCT GRID - HARDWARE */}
        <ScrollReveal delay={0.2}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
              
              <a href="https://www.apple.com/macbook-pro/" target="_blank" rel="noopener noreferrer" className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-refined-gold/50 transition-all group block">
                 <div className="w-12 h-12 bg-warm-canvas rounded-xl flex items-center justify-center mb-6 text-deep-charcoal group-hover:text-refined-gold transition-colors">
                    <MonitorPlay className="w-6 h-6" />
                 </div>
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-3 flex items-center justify-between">
                    MacBook Pro M2 
                    <span className="text-sm font-satoshi text-warm-steel">→</span >
                 </h3>
                 <p className="text-warm-steel text-sm leading-relaxed">
                    Leistungsstark, stabil und zuverlässig. Dazu nutze ich einen faltbaren Alu-Laptop-Ständer mit RGB-Kühlung, der in warmen Ländern die Platine vor Überhitzung schützt.
                 </p>
              </a>

              <a href="https://www.thomann.de/de/rode_nt_usb_554868.htm" target="_blank" rel="noopener noreferrer" className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-refined-gold/50 transition-all group block">
                 <div className="w-12 h-12 bg-warm-canvas rounded-xl flex items-center justify-center mb-6 text-deep-charcoal group-hover:text-refined-gold transition-colors">
                    <Mic className="w-6 h-6" />
                 </div>
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-3 flex items-center justify-between">
                    Rode NT-USB & Zubehör
                    <span className="text-sm font-satoshi text-warm-steel">→</span >
                 </h3>
                 <p className="text-warm-steel text-sm leading-relaxed">
                    Ein klares, warmes Stimmbild. Ergänzt durch die SM-R Spinne und einen Tisch-Mikrofonarm von Rode. (Für unterwegs nutze ich den kleinen mitgelieferten Tischständer).
                 </p>
              </a>

              <a href="https://www.sony.de/compact-cameras/products/zv-1" target="_blank" rel="noopener noreferrer" className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-refined-gold/50 transition-all group block">
                 <div className="w-12 h-12 bg-warm-canvas rounded-xl flex items-center justify-center mb-6 text-deep-charcoal group-hover:text-refined-gold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                 </div>
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-3 flex items-center justify-between">
                    Sony ZV-1 & Elgato Cam Link
                    <span className="text-sm font-satoshi text-warm-steel">→</span >
                 </h3>
                 <p className="text-warm-steel text-sm leading-relaxed">
                    Für meine Zoom-Calls mit unglaublicher Tiefenschärfe. Sie steht auf einem Walimex Pro 2-in-1 Stativ XL und ist via Elgato an meinen Mac gekoppelt.
                 </p>
              </a>

              <a href="https://www.amazon.de/dp/B0B87T6VXT" target="_blank" rel="noopener noreferrer" className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-refined-gold/50 transition-all group block">
                 <div className="w-12 h-12 bg-warm-canvas rounded-xl flex items-center justify-center mb-6 text-deep-charcoal group-hover:text-refined-gold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="M8 21h8"/><path d="M12 19v2"/></svg>
                 </div>
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-3 flex items-center justify-between">
                    Zweiter Monitor (UPerfect 2K)
                    <span className="text-sm font-satoshi text-warm-steel">→</span >
                 </h3>
                 <p className="text-warm-steel text-sm leading-relaxed">
                    Ein 16 Zoll 2K-Monitor (USB-C), der mich überallhin begleitet. Er steht stabil auf Augenhöhe dank des Cooper TabStand iPad-Ständers. Ergonomisch, tragbar und hell.
                 </p>
              </a>
              
              <div className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all group block md:col-span-2">
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-4">Weiteres Must-Have Equipment</h3>
                 <ul className="text-warm-steel text-sm leading-relaxed space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <li>• <a href="https://www.amazon.de/dp/B07PNNTTV1" target="_blank" className="underline hover:text-refined-gold">Licht: Raleno 192 VideoLight</a> auf Manfrotto Mini-Stativ</li>
                    <li>• <a href="https://magic-mic.de/" target="_blank" className="underline hover:text-refined-gold">Magic Mic Funkmikrofon</a> mit Noise-Canceling (perfekt für laute Rollfelder oder Bahnhöfe)</li>
                    <li>• <a href="https://www.smallrig.com/" target="_blank" className="underline hover:text-refined-gold">SmallRig Handy-Käfig</a> für hochqualitative Smartphone Vlogs</li>
                    <li>• <a href="https://www.amazon.de/Elgato-Studio-Controller-ausl%C3%B6sen-Software-20GBA9901-wt/dp/B09RMXK59C" target="_blank" className="underline hover:text-refined-gold">Elgato Stream Deck</a> zur Steuerung von OBS</li>
                    <li>• Kabelgebundene <a href="#" className="underline hover:text-refined-gold">Maus von TECKNET</a> & <a href="#" className="underline hover:text-refined-gold">USB-C Tastatur von Senda</a> (Strahlungsreduziert)</li>
                    <li>• <a href="https://www.rollei.de/collections/rucksacke/products/fotorucksack-fotoliner-ocean-l" target="_blank" className="underline hover:text-refined-gold">Rucksack: Rollei Foto-Liner Ocean L</a> (Mein treuer Raumschaffer)</li>
                 </ul>
              </div>

           </div>
        </ScrollReveal>
      </section>

      <PullQuote>
        Die Technik refinanziert sich durch das Vertrauen, das du im ersten Zoom-Call ausstrahlst, nahezu von selbst.
      </PullQuote>

      <section className="px-6 sm:px-12 md:px-24 pt-4 max-w-[820px] mx-auto w-full">
        <ScrollReveal>
           <div className={proseBlock}>
              <h2>Bonus-Tools und Software: smart und effizient arbeiten</h2>
              <p><strong>Ein Premium-Setup hört nicht bei der Hardware auf.</strong> Als Solopreneur bist du darauf angewiesen, dass deine Prozesse im Hintergrund lautlos und perfekt ineinandergreifen, ohne dass sie dir Energie rauben.</p>
              
              <ul className="list-none pl-0 space-y-4 my-8">
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><a href="https://www.zoom.us/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">Zoom Pro</a> · Für einwandfreie Video-Begleitungen und Breakout-Sessions.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><a href="https://www.canva.com/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">Canva Pro</a> · Alles von Instagram-Posts bis zu professionellen Pitchdecks.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><a href="https://www.notion.so/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">Notion Pro</a> · Mein minimalistisches CRM und Second-Brain.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><a href="https://trello.com/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">Trello</a> · Für Content-Planung und saubere Aufgabenstrukturen.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                     <span><a href="https://chatgpt.com/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">ChatGPT Pro</a> · Der absolute Allrounder für Konzeptarbeit, Gliederungen und strategische Klarheit.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><strong>Weitere Schätze:</strong> Riverside.fm (für den Podcast), OBS Studio (für Setups) & TidyCal (für Termine).</span>
                 </li>
              </ul>

              <h2>Wann "KI-Power" wirklich den Unterschied macht</h2>
              <p>
                 Du musst kein Techniknerd sein, um all diese Systeme zu beherrschen. Wenn du dein ChatGPT richtig konfigurierst · oder noch besser, unsere maßgeschneiderte <strong className="text-deep-charcoal border-b border-refined-gold">Sabala Diamond Force</strong> einsetzt · nimmt sie dir stundenlange Technik- und Konzeptarbeit ab, sodass dir mehr Raum und Kraft für das bleibt, worin du wirklich brillant bist: Die Arbeit mit Menschen.
              </p>

              <h2>Eine Frage der Haltung</h2>
              <p>
                 Investiere früh in dein Setup und deine Systeme. Der erste Eindruck entscheidet oft in Millisekunden über Vertrauen, Sicherheit und eine mögliche, hochpreisige Zusammenarbeit. Genauso wichtig wie Equipment ist <Link href="/blog/seo-und-geo-fuer-personal-brands-2026">eine durchdachte SEO- und GEO-Strategie</Link>, damit deine Premium-Präsenz auch von den richtigen Klienten gefunden wird, und ein <Link href="/blog/chatgpt-custom-gpts-richtig-nutzen">sauberes KI-Team</Link>, das die Reibung im Alltag wegnimmt.
              </p>
           </div>
        </ScrollReveal>

      </section>

      {/* Visueller Anker */}
      <section className="px-6 sm:px-12 md:px-24 pt-12 max-w-[1100px] mx-auto w-full">
        <ScrollReveal>
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-refined-gold/15">
            <Image src="/blog/technik-setup-online-coach/studio.jpg" alt="Skizze: ein aufgeraeumter Home-Studio-Schreibtisch fuer Online-Coaches mit Mikrofon, Ringlicht, Laptop und Kopfhoerern" fill className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[900px] mx-auto w-full">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Häufige Fragen</p>
          <h2 className="font-instrument text-3xl md:text-5xl text-deep-charcoal text-center mb-12 leading-[1.1]">Was Coaches<br/>typischerweise fragen.</h2>
        </ScrollReveal>
        <div className="flex flex-col gap-3">
          {faq.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <details className="group bg-warm-light/30 border border-refined-gold/15 rounded-xl px-6 py-5 hover:border-refined-gold/40 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="font-instrument text-lg md:text-xl text-deep-charcoal pr-6">{f.q}</h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-refined-gold/10 border border-refined-gold/30 flex items-center justify-center text-refined-gold text-xl transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-warm-steel font-satoshi leading-relaxed">{f.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Audit-Lead-Magnet — niedrigschwelliger Einstieg vor dem Premium-CTA */}
      <ScrollReveal>
        <ArticleAuditCTA
          eyebrow="Persönliches Audit — kostenlos"
          headline={<>Steht dein Setup —<br/>aber deine Webseite noch nicht?</>}
          bridge={<>Du hast jetzt die Hardware-Liste, das Tool-Setup, die Premium-Energie für deine Calls. Was fehlt vielleicht noch: ein Online-Auftritt, der zu dieser Qualität passt. Schick mir deine Webseite, ich schaue persönlich drauf und gebe dir drei konkrete Hebel zurück. Ohne Funnel, ohne Sales-Sprech.</>}
        />
      </ScrollReveal>

      {/* CTA SECTION - DIAMOND FORCE / PREMIUM */}
      <section className="px-6 md:px-12 mt-24 max-w-[1000px] mx-auto w-full">
         <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B26] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 group shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
               
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/5 lg:from-refined-gold/10 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>

               <div className="flex-1 relative z-10 text-center md:text-left">
                  <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Lass uns den Raum halten.</h3>
                  <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                     Wenn du spürst, dass du dir ein Premium-Business mit Freiheit und Tiefe aufbauen willst, dir aber das technische und strategische Fundament fehlt: Wir bauen es für dich. Deine Premium-Website, deine Diamond Force KI und dein klares Angebot.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                     <Link href="/webseiten" className="bg-refined-gold hover:bg-white text-deep-charcoal px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto text-center">
                        Zum Premium Mentoring
                     </Link>
                     <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                        Erstgespräch buchen
                     </Link>
                  </div>
               </div>

               <div className="w-full md:w-1/3 flex justify-center shrink-0 relative z-10">
                  <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
                     <Code2 className="w-12 h-12 text-refined-gold" />
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>

      <BlogSpokes slugs={["webseiten-bau-mit-claude-anfaenger", "webseite-mit-ki-bauen-2026", "was-kostet-ki-webseite"]} />
    </main>
  );
}
