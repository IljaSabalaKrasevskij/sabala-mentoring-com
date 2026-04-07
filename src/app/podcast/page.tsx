import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";
import Image from "next/image";

// Die Schlüssel-Episoden, die die Entwicklung zeigen
const podcastEpisodes = [
  {
    id: 1,
    phase: "Die Anfänge",
    date: "2023",
    title: "Der Sprung ins Ungewisse: Warum ich alles hinter mir ließ",
    description: "In dieser primitiven, extrem ehrlichen Aufnahme spreche ich über den Moment, in dem ich erkannte, dass mein altes Leben nicht mehr funktionierte. Voller Zweifel und dem puren Wunsch nach mehr Tiefe.",
    duration: "42:15",
    spotifyId: "PLACEHOLDER_1", 
  },
  {
    id: 2,
    phase: "Die Krise",
    date: "2024",
    title: "Ego zerstört – Meine dunkelste Stunde im Business",
    description: "Wachstum ist schmerzhaft. Ich teile die absolute Tiefphase, in der alles zu scheitern drohte, weil ich im Außen gesucht habe, was mir im Inneren noch fehlte.",
    duration: "38:40",
    spotifyId: "PLACEHOLDER_2",
  },
  {
    id: 3,
    phase: "Die Erkenntnis",
    date: "2025",
    title: "Warum das Innere Fundament der härteste Business-Hebel ist",
    description: "Der Wendepunkt. Wie die Stille den Lärm ersetzte und plötzlich Struktur in das ungesunde Hustle-Chaos einkehrte.",
    duration: "55:10",
    spotifyId: "PLACEHOLDER_3",
  },
  {
    id: 4,
    phase: "Die Gegenwart",
    date: "2026",
    title: "Neuausrichtung & Das nächste große Level",
    description: "Wir stehen an einem komplett neuen Wendepunkt. Ein ehrlicher Blick hinter die Kulissen unserer aktuellen Projekte, Premium Erlebnis Websites und den Auswanderungs-Prozess nach Georgien.",
    duration: "48:05",
    spotifyId: "PLACEHOLDER_4",
  }
];

export default function PodcastPage() {
  return (
    <div className="flex flex-col w-full bg-night-foundation text-night-text min-h-screen">
      
      {/* HEADER HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 sm:px-12 md:px-24 flex items-center bg-night-foundation border-b border-white/5">
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8 z-10">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-2">
                <div className="w-2 h-2 bg-night-gold rounded-full animate-pulse"></div>
                <span className="text-xs font-mono uppercase tracking-widest text-night-gold">Der Audio-Weg</span>
              </div>
              <h1 className="font-instrument text-white leading-[1.1] tracking-[-0.02em] text-[clamp(3.5rem,6vw,5.5rem)] mb-6">
                Die rohe <br/> Reise.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-night-secondary text-lg md:text-xl leading-[1.65] max-w-[50ch] font-satoshi">
                Wachstum verläuft nie absolut linear. Hier findest du keine polierten Marketing-Phrasen, sondern echte Entwicklungen. Begleite mich auditiv von den holprigen Anfängen bis heute. Ungefiltert und ehrlich.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-4 mt-4">
                <Link 
                  href="#episodes"
                  className="bg-night-gold text-night-foundation hover:bg-white px-8 py-4 rounded-full font-medium transition-colors"
                >
                  Die Reise beginnen
                </Link>
                <Link 
                  href="#" // Link to spotify directly
                  className="px-8 py-4 rounded-full font-medium border border-white/20 hover:border-white/50 transition-colors hidden sm:block"
                >
                  Auf Spotify abonnieren
                </Link>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="relative aspect-square w-full max-w-[500px] mx-auto opacity-70">
            <ScrollReveal delay={0.3} className="w-full h-full relative">
              {/* Abstract Mic/Audio Graphic */}
              <div className="absolute inset-0 bg-gradient-to-tr from-night-gold/20 via-transparent to-transparent rounded-[40px] rotate-6 border border-white/5"></div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 flex items-center justify-center p-12 overflow-hidden">
                 <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="absolute scale-[3]"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                <Image 
                  src="https://picsum.photos/seed/podcast_hero/800/800" 
                  alt="Podcast Session" 
                  fill 
                  className="object-cover mix-blend-overlay opacity-80"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* EPISODES TIMELINE */}
      <section id="episodes" className="py-32 px-6 sm:px-12 md:px-24 bg-night-foundation relative">
        <div className="max-w-[1000px] mx-auto relative">
          
          {/* Vertical Track Line */}
          <div className="absolute left-[24px] md:left-[50px] top-4 bottom-10 w-[1px] bg-white/10"></div>

          <div className="space-y-16 md:space-y-24">
            {podcastEpisodes.map((episode, index) => (
              <ScrollReveal key={episode.id} className="relative flex flex-col md:flex-row gap-8 md:gap-16 pl-16 md:pl-32 group">
                
                {/* Timeline Dot */}
                <div className="absolute left-[18px] md:left-[44px] top-6 w-3 h-3 bg-night-foundation border-[2px] border-white/30 rounded-full z-10 group-hover:border-night-gold group-hover:bg-night-gold group-hover:scale-150 transition-all duration-500"></div>
                
                {/* Connection Line to Box (Desktop) */}
                <div className="hidden md:block absolute left-[50px] top-[29px] w-[50px] h-[1px] bg-white/10 group-hover:bg-night-gold/50 transition-colors duration-500"></div>

                {/* Date / Phase Tag */}
                <div className="md:w-[200px] flex-shrink-0 pt-4 hidden md:block text-right pr-4 absolute -left-[200px]">
                   <p className="font-mono text-sm tracking-widest uppercase text-night-gold">{episode.phase}</p>
                   <p className="text-white/40 text-xs mt-1">{episode.date}</p>
                </div>

                {/* Mobile Phase Tag */}
                <div className="md:hidden pt-4">
                   <p className="font-mono text-sm tracking-widest uppercase text-night-gold">{episode.phase} — {episode.date}</p>
                </div>

                {/* Episode Card */}
                <div className="flex-grow bg-white/[0.02] border border-white/10 rounded-[20px] p-6 md:p-8 hover:bg-white/5 transition-colors duration-500 hover:border-white/20">
                  <h3 className="font-instrument text-2xl md:text-3xl text-white mb-4 leading-tight">{episode.title}</h3>
                  <p className="text-night-secondary leading-relaxed mb-8">{episode.description}</p>
                  
                  {/* Fake Audio Player UI */}
                  <div className="bg-black/40 rounded-full h-14 w-full flex items-center px-4 gap-4 border border-white/5 cursor-pointer hover:border-night-gold/30 transition-colors group/player">
                    <button className="w-8 h-8 rounded-full bg-night-gold flex items-center justify-center text-night-foundation group-hover/player:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
                    </button>
                    
                    <div className="flex-grow flex items-center gap-2">
                       <div className="w-full bg-white/10 h-1 rounded-full relative overflow-hidden">
                          <div className="absolute top-0 left-0 h-full w-[0%] bg-night-gold group-hover/player:w-[15%] transition-all duration-1000"></div>
                       </div>
                    </div>
                    
                    <div className="text-xs font-mono text-white/50">{episode.duration}</div>
                    
                    <div className="text-white/30 hover:text-white transition-colors p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                    </div>
                  </div>
                  
                  {/* Option for Real Embed */}
                  <div className="mt-4 text-xs font-mono text-white/30 truncate">
                    // Spotify Embed Placeholder (ID: {episode.spotifyId})
                  </div>
                </div>

              </ScrollReveal>
            ))}
          </div>
          
        </div>
      </section>

      {/* OUTRO CTA */}
      <section className="py-24 px-6 text-center border-t border-white/5 bg-night-foundation relative z-10">
        <ScrollReveal>
          <h2 className="font-instrument text-3xl md:text-5xl text-white mb-8">Alle Episoden hören.</h2>
          <Link 
            href="#" 
            className="inline-flex items-center gap-3 bg-white text-night-foundation px-8 py-4 rounded-full font-medium hover:bg-neutral-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            Gesamter Podcast auf Spotify
          </Link>
        </ScrollReveal>
      </section>

    </div>
  );
}
