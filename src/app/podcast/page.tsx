import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { AudioVisualizerBackground } from "@/components/ui/AudioVisualizerBackground";

// Die handverlesenen Schlüssel-Episoden für neue Hörer
const podcastEpisodes = [
  {
    id: 1,
    phase: "#01",
    date: "Die Anfänge",
    title: "Das Warum hinter dem Warum",
    description: "Wie alles begann. Jede Reise braucht ein Fundament, und oft beginnt sie dort, wo man am meisten mit sich und der Welt ringt. Ein ehrlicher Rückblick darauf, wie die Sabala-Vision Form annahm und warum ich den Sprung ins absolute Ungewisse wagen musste.",
    duration: "~ 30 Min",
    embedContainerId: "buzzsprout-player-14821850",
    embedScriptSrc: "https://www.buzzsprout.com/2343663/episodes/14821850-01-vergiss-niemals-dein-warum-hinter-deinem-warum.js?container_id=buzzsprout-player-14821850&player=small"
  },
  {
    id: 19,
    phase: "#19",
    date: "Die Krise & Realness",
    title: "Verkackt und unperfekt",
    description: "Wachstum tut weh. In dieser ungeschönten Folge teile ich einen Moment, in dem einfach alles zu scheitern drohte. Eine Episode darüber, wie man durch eigene Erwartungen tief fällt – und wieso Unperfektheit das wohl stärkste Business-Werkzeug überhaupt ist.",
    duration: "~ 35 Min",
    embedContainerId: "buzzsprout-player-15455457",
    embedScriptSrc: "https://www.buzzsprout.com/2343663/episodes/15455457-19-verka-t-und-unperfekt.js?container_id=buzzsprout-player-15455457&player=small"
  },
  {
    id: 23,
    phase: "#23",
    date: "Der Wendepunkt",
    title: "Der wahre Zweck von Meditation",
    description: "Der Moment des Erwachens. Wie Stille den lauten Lärm im Kopf leiser gemacht hat. Ein Deep Dive in die Welt der Meditation und warum innere Gelassenheit am Ende der stärkste Hebel für äußeren Erfolg ist.",
    duration: "~ 45 Min",
    embedContainerId: "buzzsprout-player-15608795",
    embedScriptSrc: "https://www.buzzsprout.com/2343663/episodes/15608795-23-der-wahre-zweck-von-meditation.js?container_id=buzzsprout-player-15608795&player=small"
  },
  {
    id: 30,
    phase: "#30",
    date: "Die Zukunft",
    title: "Launch Connecting Herzkreative",
    description: "Das nächste große Level. Der Startschuss für eine neue Ära und den Aufbau einer tief verwurzelten Community. Warum ich ein globales Netzwerk ins Leben gerufen habe und wie wir Premium Landingpages auf ein völlig neues Fundament stellen.",
    duration: "~ 40 Min",
    embedContainerId: "buzzsprout-player-17259233",
    embedScriptSrc: "https://www.buzzsprout.com/2343663/episodes/17259233-30-eine-neue-ara-beginnt-connecting-herzkreative-goes-live.js?container_id=buzzsprout-player-17259233&player=small"
  }
];

export default function PodcastPage() {
  return (
    <div className="flex flex-col w-full bg-night-foundation text-night-text min-h-screen">
      
      {/* HEADER HERO SECTION - COVER STYLE */}
      <section className="relative min-h-[85vh] pt-40 pb-20 px-6 sm:px-12 md:px-24 flex items-end bg-night-foundation border-b border-white/5 overflow-hidden">
        
        {/* Background Portrait fading into darkness */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/Bilder Sabala/5 - _MXS8196.jpg" 
            alt="Ilja Sabala Krasevskij"
            fill
            className="object-cover object-[center_30%]"
            priority
          />
          {/* Fading Gradients: left and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-night-foundation via-night-foundation/90 to-transparent md:via-night-foundation/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-night-foundation via-night-foundation/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-night-foundation/30 to-transparent h-40"></div>
        </div>

        {/* Subtle Diamond Accent */}
        <div className="absolute top-[-10%] left-[-5%] w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] border-[2px] border-night-gold/5 -rotate-45 pointer-events-none z-0"></div>

        <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col justify-end">
          <ScrollReveal>
             {/* Typography Group matching Cover */}
             <div className="flex flex-col mb-10 select-none">
               <h1 className="flex flex-col items-start leading-[0.9]">
                 <span className="font-instrument font-normal text-white text-[clamp(4rem,8vw,7rem)] tracking-[-0.02em]">Business</span>
                 <span className="font-instrument italic font-normal text-night-gold text-[clamp(3.5rem,7vw,6rem)] ml-4 md:ml-8 -mt-2 md:-mt-4">beyond</span>
                 <span className="font-satoshi font-bold text-white text-[clamp(5rem,10vw,9.5rem)] uppercase tracking-[0.06em] -mt-2 -ml-1 md:-ml-2">MIND</span>
               </h1>
             </div>
             
             <div className="w-[100px] md:w-[300px] h-[3px] bg-night-gold/30 mb-8"></div>
             
             <div className="mb-10">
               <p className="text-night-secondary font-satoshi text-lg md:text-2xl leading-[1.3]">
                  <span className="block mb-1">Der Podcast</span>
                  <span className="block font-medium text-white/90">mit Ilja 'Sabala' Krasevskij</span>
               </p>
             </div>

             <div className="max-w-[55ch]">
               <p className="text-night-secondary/80 text-base md:text-lg leading-[1.7] font-satoshi">
                 Wachstum verläuft nie absolut linear. Keine polierten Marketing-Phrasen, sondern echte Entwicklungen. Begleite mich auditiv von den holprigen Anfängen bis heute. Ungefiltert und absolut ehrlich.
               </p>
             </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NEW: ABOUT THE PODCAST (DIE REISE) */}
      <section className="py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-night-foundation border-b border-white/5 relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
          
          <ScrollReveal className="w-full md:w-5/12 flex flex-col">
            <h2 className="font-instrument text-night-gold text-4xl md:text-5xl leading-[1.1] mb-6 select-none opacity-80">
              <span className="block opacity-50">&ldquo;</span>
              Nicht linear.<br/>Nicht perfekt.
            </h2>
          </ScrollReveal>
          
          <div className="w-full md:w-7/12 flex flex-col gap-8 md:pt-12">
            <ScrollReveal delay={0.1}>
              <p className="text-night-text text-2xl md:text-3xl font-instrument leading-[1.4]">
                Ganz ehrlich, frei und roh: Dieser Podcast ist die Dokumentation einer intensiven Reise von 2022 bis heute.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="flex flex-col gap-6">
              <p className="text-night-secondary text-lg md:text-xl font-satoshi leading-[1.65]">
                Wachstum bedeutet für mich vor allem eines: ehrlich hinzuschauen. Keine glattpolierte Marketing-Reise, sondern die echte Bereitschaft, sich mit allen Facetten und Verletzlichkeiten zu zeigen.
              </p>
              <p className="text-night-secondary text-lg md:text-xl font-satoshi leading-[1.65]">
                Du erlebst mich hier wirklich als Mensch. Mit Zweifeln, Durchbrüchen und jener Tiefe oder Vielfalt, die viele an der äußeren Oberfläche überhaupt nicht kennenlernen.
              </p>
            </ScrollReveal>
          </div>
          
        </div>
      </section>

      {/* LATEST EPISODE / SUBSCRIBE BUTTONS */}
      <section className="py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-deep-charcoal relative border-y border-white/5 shadow-2xl z-20">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-white mb-4">Aktuellste Folge</h2>
            <p className="text-night-secondary text-lg md:text-xl mb-16">Jetzt die neueste Episode direkt anhören auf deiner Lieblingsplattform.</p>
          </ScrollReveal>

          {/* Subscribe Buttons */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6">
              <Link 
                href="https://open.spotify.com/show/0kW82ffSnaQDlKI5t1qBCT?si=5b13cd13ab3142b8"
                target="_blank"
                className="flex items-center justify-center gap-3 bg-[#1DB954]/10 border border-[#1DB954]/50 text-[#1DB954] hover:bg-[#1DB954] hover:text-night-foundation px-10 py-5 rounded-full font-bold transition-all duration-300 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.56.3z"/></svg>
                Spotify
              </Link>
              <Link 
                href="https://podcasts.apple.com/de/podcast/business-beyond-mind/id1742615614"
                target="_blank"
                className="flex items-center justify-center gap-3 bg-[#b93dcc]/10 border border-[#b93dcc]/50 text-[#b93dcc] hover:bg-[#b93dcc] hover:text-white px-10 py-5 rounded-full font-bold transition-all duration-300 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                Apple Podcasts
              </Link>
              <Link 
                href="https://music.amazon.com/podcasts/e634c525-f477-4bed-b145-1a0a70c11205/business-beyond-mind"
                target="_blank"
                className="flex items-center justify-center gap-3 bg-[#232F3E]/80 border border-[#00A8E1]/50 text-[#00A8E1] hover:bg-[#00A8E1] hover:text-white px-10 py-5 rounded-full font-bold transition-all duration-300 shadow-lg"
              >
                Amazon Music
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* EPISODES TIMELINE (Meilensteine für Neuankömmlinge) */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-night-foundation relative">
        <div className="max-w-[1000px] mx-auto relative">
          
          <ScrollReveal className="mb-20 text-center">
            <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-white mb-4">Meilensteine des Weges</h2>
            <p className="text-night-secondary text-lg">Ein roter Faden für Neu-Einsteiger. Meine Empfehlung: Höre dir diese 4 Highlight-Folgen an.</p>
          </ScrollReveal>

          {/* Vertical Track Line */}
          <div className="absolute left-[24px] md:left-[50px] top-[200px] bottom-10 w-[1px] bg-white/10 hidden md:block"></div>

          <div className="space-y-12 md:space-y-16">
            {podcastEpisodes.map((episode) => (
              <ScrollReveal key={episode.id} className="relative flex flex-col md:flex-row gap-6 md:gap-16 pl-0 md:pl-32 group">
                
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-[44px] top-10 w-3 h-3 bg-night-foundation border-[2px] border-white/30 rounded-full z-10 group-hover:border-night-gold group-hover:bg-night-gold group-hover:scale-150 transition-all duration-500"></div>
                
                {/* Connection Line to Box (Desktop) */}
                <div className="hidden md:block absolute left-[50px] top-[43px] w-[50px] h-[1px] bg-white/10 group-hover:bg-night-gold/50 transition-colors duration-500"></div>

                {/* Date / Phase Tag */}
                <div className="md:w-[200px] flex-shrink-0 pt-8 hidden md:block text-right pr-4 absolute -left-[200px]">
                   <p className="font-mono text-sm tracking-widest uppercase text-night-gold">{episode.phase}</p>
                   <p className="text-white/40 text-xs mt-1">{episode.date}</p>
                </div>

                {/* Mobile Phase Tag */}
                <div className="md:hidden">
                   <p className="font-mono text-sm tracking-widest uppercase text-night-gold bg-white/5 inline-block px-4 py-1 rounded-full border border-white/10">{episode.phase} — {episode.date}</p>
                </div>

                {/* Episode Card */}
                <div className="flex-grow bg-white/[0.02] border border-white/10 rounded-[20px] p-6 md:p-10 hover:bg-white/5 transition-colors duration-500 hover:border-night-gold/50 shadow-lg">
                  <h3 className="font-instrument text-2xl md:text-3xl text-white mb-4 leading-tight">{episode.title}</h3>
                  <p className="text-night-secondary leading-relaxed mb-8">{episode.description}</p>
                  
                  {/* Real Buzzsprout Widget Episode Embed */}
                  <div className="w-full mt-8 overflow-hidden rounded-xl border-white/5 shadow-2xl">
                    <div id={episode.embedContainerId}></div>
                    <Script src={episode.embedScriptSrc} strategy="lazyOnload" />
                  </div>

                </div>

              </ScrollReveal>
            ))}
          </div>
          
        </div>
      </section>

      {/* OUTRO CTA */}
      <section className="py-32 px-6 text-center bg-pure-surface relative z-10 border-t border-whisper-border rounded-t-[40px] shadow-[0_-40px_60px_rgba(26,26,24,0.02)]">
        <ScrollReveal>
          <h2 className="font-instrument text-4xl md:text-5xl text-deep-charcoal mb-8">Bereit für den ersten Klick?</h2>
          <Link 
            href="https://open.spotify.com/show/0kW82ffSnaQDlKI5t1qBCT?si=5b13cd13ab3142b8"
            target="_blank"
            className="inline-flex items-center gap-3 bg-refined-gold text-pure-surface px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-md hover:shadow-xl active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.56.3z"/></svg>
            Gesamten Podcast hören
          </Link>
        </ScrollReveal>
      </section>

    </div>
  );
}
