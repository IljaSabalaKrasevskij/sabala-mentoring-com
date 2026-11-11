"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Reveal, SektionsKopf, TEXT_AUF_DUNKEL, Weiter } from "@/components/akademie/shared";

/* Kontakt-Block der Startseite: links die Einladung, rechts das Formular, zusammen in einem Laptop-Fenster.
   Schickt an /api/kontakt (Turso + ntfy-Push). Fällt sichtbar auf mailto zurück, falls das Backend
   nicht antwortet, damit keine Anfrage verloren geht. */
export default function Kontakt() {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "mailto">("idle");
  const [form, setForm] = useState({ vorname: "", nachname: "", email: "", unternehmen: "", webseite: "", anliegen: "", fax: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const mailtoFallback = () => {
    const body = [`Vorname: ${form.vorname}`, `Nachname: ${form.nachname}`, `E-Mail: ${form.email}`, `Unternehmen: ${form.unternehmen}`, `Webseite: ${form.webseite}`, "", form.anliegen].join("\n");
    window.location.href = `mailto:sabala@sabala-mentoring.com?subject=${encodeURIComponent(`Anfrage: ${form.vorname} ${form.nachname}`)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quelle: pathname || "/" }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        // Backend nicht bereit oder Fehler: mailto, damit nichts verloren geht
        setStatus("mailto");
        mailtoFallback();
      }
    } catch {
      setStatus("mailto");
      mailtoFallback();
    }
  };

  const feld = "w-full rounded-lg border bg-white/[0.06] px-4 py-3 text-[1rem] text-cream outline-none transition-colors placeholder:text-[rgba(250,248,245,0.55)] focus:border-[var(--gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light";
  const rand = { borderColor: "rgba(184,150,62,0.35)" } as const;
  const fertig = status === "done" || status === "mailto";

  return (
    <section id="kontakt" className="relative scroll-mt-4 overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.1), transparent 70%)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-9 min-[56.25rem]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[56.25rem]:gap-14">
        <div>
          <SektionsKopf links zeile="Kontakt" titel="Was ist dein Wunsch?" text="Erzähl mir, woran du gerade arbeitest oder wo du feststeckst, und ich melde mich mit einem Terminvorschlag." />
          <p className="mt-4">
            <Weiter href="https://wa.me/995591443665">Oder schreib mir auf WhatsApp</Weiter>
          </p>
        </div>

        <Reveal delay={0.08}>
          {fertig ? (
            <div role="status" className="rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(184,150,62,0.35)", background: "rgba(255,255,255,0.03)" }}>
              <p className="font-serif text-[1.6rem] text-cream">Danke, ich hab deine Anfrage.</p>
              <p className="mt-3 text-[1rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
                {status === "mailto"
                  ? "Dein Mailprogramm hat sich geöffnet, schick die Mail einfach ab. Ich melde mich mit einem Terminvorschlag."
                  : "Ich melde mich zeitnah mit einem Terminvorschlag bei dir."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={feld} style={rand} placeholder="Vorname" aria-label="Vorname" autoComplete="given-name" required value={form.vorname} onChange={set("vorname")} />
                <input className={feld} style={rand} placeholder="Nachname" aria-label="Nachname" autoComplete="family-name" required value={form.nachname} onChange={set("nachname")} />
              </div>
              <input type="email" required className={feld} style={rand} placeholder="E-Mail" aria-label="E-Mail-Adresse" autoComplete="email" value={form.email} onChange={set("email")} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={feld} style={rand} placeholder="Unternehmen (optional)" aria-label="Unternehmen, optional" autoComplete="organization" value={form.unternehmen} onChange={set("unternehmen")} />
                <input className={feld} style={rand} placeholder="Deine Webseite (optional)" aria-label="Deine Webseite, optional" value={form.webseite} onChange={set("webseite")} />
              </div>
              <textarea className={feld} style={rand} rows={4} required placeholder="Was ist dein Wunsch? Woran steckst du fest? Schreib einfach drauflos." aria-label="Dein Wunsch" value={form.anliegen} onChange={set("anliegen")} />

              {/* Honeypot: für Menschen unsichtbar */}
              <input type="text" name="fax" tabIndex={-1} autoComplete="off" value={form.fax} onChange={set("fax")} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-3 bg-gold px-7 py-3 font-sans text-[1rem] font-semibold tracking-[0.05em] text-tech-bg transition-colors duration-300 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sende …" : "Anfrage senden"}
                <ArrowRight aria-hidden size={18} strokeWidth={2.2} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
