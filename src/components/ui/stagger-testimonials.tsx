"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Ich habe die Diamond-Agenten von Sabala in den letzten Tagen intensiv für meine Angebots- und Produktentwicklung genutzt – und war ehrlich überrascht, wie spezifisch und präzise diese Agenten arbeiten. Vor allem die Zusammenarbeit mit „Lia“ hat für mich einen klaren Unterschied gemacht. Statt mir direkt Antworten zu liefern, hat sie begonnen, die richtigen Fragen zu stellen. Sie hat mein Konzept hinterfragt, blinde Flecken sichtbar gemacht und mich gezielt durch die entscheidenden Punkte geführt. Genau das hat dazu geführt, dass ich nicht einfach nur „optimiert“ habe, sondern mein Angebot wirklich durchdrungen und neu ausgerichtet habe. Das Ergebnis ist ein Produkt, das sich für mich klar, stimmig und kraftvoll anfühlt. Was diese Agenten besonders macht: Sie bleiben nicht an der Oberfläche. Sie gehen in die Tiefe, arbeiten fokussiert in ihrem jeweiligen Bereich und sind spürbar darauf ausgerichtet, echte unternehmerische Fragestellungen zu durchdringen – gerade für Selbstständige ein echter Mehrwert. Für mich ist das kein klassischer Chat, sondern eine strukturierte, klärende Begleitung im Denkprozess. Klare Empfehlung für alle, die ihr Business nicht nur weiterentwickeln, sondern wirklich schärfen wollen.",
    by: "Dr. Dr. Hanna Budig, 1:1 Körper-Mentoring",
    imgSrc: "/images/Dr.Dr. Hanna Budig.png"
  },
  {
    tempId: 1,
    testimonial: "Ich durfte die umfangreiche und breit aufgesetzte AI Diamond Force gleich für Praxisanwendungen nutzen. Gerade die juristischen Grundlagen haben sehr geholfen, auf Punkte zu achten, die direkt auf mein Angebot zugeschnitten sind. Hinweise auf was zu achten ist, was für 'Gefahren' entstehen können, wenn ich etwas nicht regele. Es erfolgt immer wieder eine Prüfschleife – macht Vorschläge mit Aufzählung der Vor- und Nachteile.",
    by: "Stefanie Lommel, Organisationsentwicklerin und Coach für Geschäftsführer",
    imgSrc: "/images/Testimonial Stefanie Lommel.jpeg"
  },
  {
    tempId: 2,
    testimonial: "Das Interagieren ist flüssig, nicht so oberflächlich, wie wenn man nur einen Chat startet. Man kann diskutieren und vor allem: Sie verstehen auch gleich, um was es geht. Hilfreich finde ich, dass ich meinen eigenen Text nicht perfekt oder ganz exakt formulieren muss. Mir gefallen die kleinen Persönlichkeiten 😉",
    by: "Sylvia Kirchner, Backoffice-Unterstützung & Business-Organisation",
    imgSrc: "/images/Testimonial Syllvia Kirchner.jpeg"
  },
  {
    tempId: 3,
    testimonial: "Was Ilja da gezaubert hat, ist krass. Ich habe mir die ChatGPT-Bots geholt – die Installation und Anwendung ist mehr als user-friendly. Vor allem mag ich Lia, die mir geholfen hat, mein kreatives Chaos und meine Ideen in ein Angebot zu bringen. Siris ist der Oberhammer: den habe ich über meine Seite laufen lassen und konstruktives Feedback bekommen, keine Schonkost sondern Wahrheit, die mich weiterbringt. Danach war meine Positionierung nochmal stärker. Und ich habe gesehen, man kann sogar seinen eigenen ChatGPT-Bot bauen, wie cool ist das denn? Holt euch dieses Geschenk!",
    by: "Elaine Puhek, Brand Designerin",
    imgSrc: "/images/Testimonial Elaine Puhek.jpeg"
  },
  {
    tempId: 4,
    testimonial: "Einfach wundervoll, wie du mich in der Umsetzung meiner neuen Ausrichtung begleitest – Branding und Sichtbarkeit. Deine wundervollen KI-Bots haben mir in kurzer Zeit neue Impulse und Wege aufgezeigt. Herzensdank dafür.",
    by: "Stefan Pons, Klangtherapeut & Resilienzcoach",
    imgSrc: "/images/Testimonial Stefan Pons.jpeg"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col overflow-hidden rounded-[2rem]",
        isCenter 
          ? "z-10 bg-[#020202]/95 text-white border border-refined-gold/40 shadow-[0_20px_60px_-10px_rgba(184,150,62,0.3)] ring-1 ring-refined-gold/30 backdrop-blur-2xl" 
          : "z-0 bg-[#050505]/90 text-white/50 border border-white/5 hover:border-refined-gold/30 hover:bg-[#0A0806] backdrop-blur-md"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.9})
        `,
      }}
    >
      {/* Marvel Tech / HUD Elements for Active Card */}
      {isCenter && (
        <>
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-refined-gold/15 blur-[60px] pointer-events-none rounded-full"></div>
          
          {/* Top Laser Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-refined-gold/60 to-transparent shadow-[0_0_15px_rgba(184,150,62,0.8)]"></div>
          
          {/* Tech Brackets */}
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-refined-gold/30 pointer-events-none"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-refined-gold/30 pointer-events-none"></div>
          
          {/* Scanlines Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(184,150,62,1)_1px,transparent_1px),linear-gradient(90deg,rgba(184,150,62,1)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none"></div>
        </>
      )}

      {/* Content Container (to stay above absolute backgrounds) */}
      <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
        
        {/* HUD Verified Tag */}
        {isCenter && (
           <div className="absolute top-0 right-0 flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-refined-gold animate-pulse shadow-[0_0_8px_rgba(184,150,62,1)]"></span>
              <span className="text-[9px] text-refined-gold/80 uppercase tracking-widest font-mono">SYS.VERIFIED</span>
           </div>
        )}

        <div 
          className={cn(
            "relative mb-8 h-16 w-16 shrink-0 overflow-hidden rounded-full border transition-colors duration-500",
            isCenter ? "border-refined-gold/40 shadow-[0_0_20px_rgba(184,150,62,0.2)]" : "border-white/10"
          )}
        >
          <Image
            src={testimonial.imgSrc}
            alt={testimonial.by.split(',')[0]}
            fill
            className={cn(
              "object-cover filter grayscale-[20%] contrast-110 transition-transform duration-500",
              testimonial.imgSrc.includes('Syllvia') ? "scale-[1.35] object-center" : "object-top"
            )}
          />
        </div>
        <div className="overflow-y-auto flex-1 pr-4 pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <h3 className={cn(
            "text-base sm:text-lg font-instrument mb-4 leading-relaxed",
            isCenter ? "text-white" : "text-white/60"
          )}>
            "{testimonial.testimonial}"
          </h3>
        </div>
        
        <p className={cn(
          "mt-6 text-[11px] md:text-xs font-mono uppercase tracking-widest shrink-0 border-t pt-4",
          isCenter ? "text-refined-gold border-refined-gold/20" : "text-white/40 border-white/5"
        )}>
          {testimonial.by}
        </p>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 460 : 340);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 650 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = index - Math.floor(testimonialsList.length / 2);
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-xl transition-all duration-300 rounded-full",
            "bg-[#0A0A0A] border border-white/10 text-white/70 hover:bg-refined-gold hover:text-[#050505] hover:border-refined-gold",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-refined-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-xl transition-all duration-300 rounded-full",
            "bg-[#0A0A0A] border border-white/10 text-white/70 hover:bg-refined-gold hover:text-[#050505] hover:border-refined-gold",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-refined-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
