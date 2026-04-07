import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full">
      <nav className="flex items-center justify-between bg-pure-surface/80 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_4px_30px_rgba(26,26,24,0.06)] border border-soft-stone/20 w-full max-w-5xl">
        <Link href="/" className="flex items-center gap-3 text-deep-charcoal group">
          <div className="relative w-8 h-8 md:w-9 md:h-9">
            <Image src="/images/logo-sabala-mentoring.png" alt="Sabala Logo" fill className="object-contain group-hover:scale-105 transition-transform" />
          </div>
          <span className="font-instrument text-2xl md:text-3xl tracking-tight">Sabala</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-warm-steel">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-deep-charcoal transition-colors py-2">
              Angebot
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:rotate-180 transition-transform duration-300"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-pure-surface border border-whisper-border rounded-xl shadow-[0_10px_30px_rgba(26,26,24,0.08)] py-2 min-w-[220px] flex flex-col overflow-hidden">
                <Link href="/premium-angebot" className="px-5 py-2.5 hover:bg-warm-canvas text-deep-charcoal transition-colors text-sm">Premium-Paket</Link>
                <Link href="/meditation" className="px-5 py-2.5 hover:bg-warm-canvas text-deep-charcoal transition-colors text-sm">Meditation</Link>
                <Link href="/ki-assistenten" className="px-5 py-2.5 hover:bg-warm-canvas text-deep-charcoal transition-colors text-sm">KI-Assistenten (inkl. Lia)</Link>
              </div>
            </div>
          </div>
          <Link href="/#referenzen" className="hover:text-deep-charcoal transition-colors">Referenzen</Link>
          <Link href="/ueber-mich" className="hover:text-deep-charcoal transition-colors">About</Link>
          <Link href="/blog" className="hover:text-deep-charcoal transition-colors">Journal</Link>
          <Link href="/podcast" className="flex items-center gap-1.5 hover:text-deep-charcoal transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:text-refined-gold transition-colors"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            Podcast
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="#contact" 
            className="bg-refined-gold hover:bg-refined-gold/90 text-pure-surface px-6 py-2.5 rounded-full font-medium transition-all active:scale-95 shadow-sm"
          >
            Kennenlerngespräch
          </Link>
        </div>
      </nav>
    </div>
  );
}
