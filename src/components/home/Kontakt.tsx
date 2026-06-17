"use client";

import { useState } from "react";
import { motion } from "motion/react";

type PE = { score: string; reviews: string; rate: number; url: string };

/* Kontaktformular unten auf der Startseite. pe = serverseitig geholte ProvenExpert-Werte. */
export default function Kontakt({ pe }: { pe?: PE }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", firma: "", anliegen: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [`Name: ${form.name}`, `E-Mail: ${form.email}`, `Firma: ${form.firma}`, "", "Anliegen:", form.anliegen].join("\n");
    window.location.href = `mailto:sabala@sabala-mentoring.com?subject=${encodeURIComponent(`Kontakt: ${form.name || form.firma}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = "w-full rounded-lg border bg-white/[0.06] px-4 py-3.5 text-[1rem] text-cream outline-none transition-colors placeholder:text-warm-light/40 focus:border-[var(--gold)]";
  const fieldStyle = { borderColor: "rgba(184,150,62,0.25)" } as const;

  return (
    <section id="kontakt" className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.1), transparent 70%)" }} />

      <div className="relative mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">// kontakt</p>
          <h2 className="mt-5 font-serif leading-[1.05] text-cream" style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", letterSpacing: "-0.015em" }}>
            Lass uns reden.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[1.2rem] leading-relaxed text-warm-light/80">
            Erzähl mir kurz, wo du stehst und was du dir wünschst, dann melde ich mich mit einem Terminvorschlag.
          </p>
        </motion.div>

        {pe && (
          <div className="mt-10 flex justify-center">
            <a href={pe.url} target="_blank" rel="noopener noreferrer" className="group inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full px-5 py-2.5" style={{ border: "1px solid rgba(184,150,62,0.3)", background: "rgba(255,255,255,0.03)" }}>
              <span className="text-gold-light tracking-[0.1em]" aria-hidden>★★★★★</span>
              <span className="font-serif text-[1.05rem] text-cream">{pe.score} <span className="text-warm-light/50">/ 5,00</span></span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-warm-light/55 transition-colors group-hover:text-gold-light">· {pe.reviews} Bewertungen · ProvenExpert</span>
            </a>
          </div>
        )}

        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(184,150,62,0.3)", background: "rgba(255,255,255,0.03)" }}>
            <p className="font-serif text-[1.6rem] text-cream">Danke, das ist unterwegs.</p>
            <p className="mt-3 text-warm-light/70">Dein Mailprogramm sollte sich geöffnet haben. Ich melde mich mit einem Terminvorschlag.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mt-12 space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} style={fieldStyle} placeholder="Name" value={form.name} onChange={set("name")} />
              <input type="email" required className={field} style={fieldStyle} placeholder="E-Mail" value={form.email} onChange={set("email")} />
            </div>
            <input className={field} style={fieldStyle} placeholder="Firma (optional)" value={form.firma} onChange={set("firma")} />
            <textarea className={field} style={fieldStyle} rows={5} placeholder="Was wünschst du dir? Ein paar Sätze reichen." value={form.anliegen} onChange={set("anliegen")} />

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
              <button type="submit" className="w-full rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold sm:w-auto">
                Anfrage senden
              </button>
              <a href="https://wa.me/995591443665" className="font-mono text-[12px] uppercase tracking-[0.18em] text-warm-light/60 transition-colors hover:text-gold">
                oder schreib mir auf WhatsApp →
              </a>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
