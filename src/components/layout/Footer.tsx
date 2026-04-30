import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-warm-canvas border-t border-whisper-border py-20 px-6 sm:px-12 md:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-instrument text-3xl tracking-tight text-deep-charcoal">
            Sabala
          </Link>
          <p className="text-warm-steel max-w-sm">
            Premium Brand & Web Partner für reflektierte Unternehmer
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-deep-charcoal mb-2">Navigation</h4>
          <Link href="#angebot" className="text-warm-steel hover:text-deep-charcoal transition-colors">Angebot</Link>
          <Link href="#ueber-mich" className="text-warm-steel hover:text-deep-charcoal transition-colors">Über mich</Link>
          <Link href="#referenzen" className="text-warm-steel hover:text-deep-charcoal transition-colors">Referenzen</Link>
          <Link href="#blog" className="text-warm-steel hover:text-deep-charcoal transition-colors">Blog</Link>
          <Link href="#kontakt" className="text-warm-steel hover:text-deep-charcoal transition-colors">Kontakt</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-deep-charcoal mb-2">Social</h4>
          <a href="#" className="text-warm-steel hover:text-deep-charcoal transition-colors">LinkedIn</a>
          <a href="#" className="text-warm-steel hover:text-deep-charcoal transition-colors">Instagram</a>
          <a href="#" className="text-warm-steel hover:text-deep-charcoal transition-colors">YouTube</a>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-whisper-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-soft-stone">
        <p>&copy; 2026 Ilja Sabala Krasevskij</p>
        <div className="flex gap-6">
          <Link href="/impressum" className="hover:text-warm-steel transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-warm-steel transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-warm-steel transition-colors">AGB</Link>
          <button className="hover:text-warm-steel transition-colors">Cookie-Einstellungen</button>
        </div>
      </div>
    </footer>
  );
}
