"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

type PE = { score: string; reviews: string; rate: number; url: string };

/* Kontakt-Block — global im Layout, erscheint unten auf jeder Seite.
   Schickt an /api/kontakt (Notion + WhatsApp). Faellt sichtbar auf mailto
   zurueck, falls das Backend (noch) nicht konfiguriert ist. */
export default function Kontakt({ pe }: { pe?: PE }) {
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
        // Backend nicht bereit oder Fehler → mailto, damit nichts verloren geht
        setStatus("mailto");
        mailtoFallback();
      }
    } catch {
      setStatus("mailto");
      mailtoFallback();
    }
  };

  const field = "w-full rounded-lg border bg-white/[0.06] px-4 py-3.5 text-[1rem] text-cream outline-none transition-colors placeholder:text-warm-light/40 focus:border-[var(--gold)]";
  const fieldStyle = { borderColor: "rgba(184,150,62,0.25)" } as const;
  const done = status === "done" || status === "mailto";

  return (
    <section id="kontakt" className="relative overflow-hidden px-6 py-[15vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.1), transparent 70%)" }} />

      <div className="relative mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold">// kontakt</p>
          <h2 className="mt-5 font-serif leading-[1.05] text-cream" style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", letterSpacing: "-0.015em" }}>
            Was ist dein Wunsch?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[1.2rem] leading-relaxed text-warm-light/80">
            Erzähl mir, woran du gerade arbeitest oder wo du feststeckst, und ich melde mich mit einem Terminvorschlag.
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

        {done ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(184,150,62,0.3)", background: "rgba(255,255,255,0.03)" }}>
            <p className="font-serif text-[1.6rem] text-cream">Danke, ich hab deine Anfrage.</p>
            <p className="mt-3 text-warm-light/70">
              {status === "mailto"
                ? "Dein Mailprogramm hat sich geöffnet, schick die Mail einfach ab. Ich melde mich mit einem Terminvorschlag."
                : "Ich melde mich zeitnah mit einem Terminvorschlag bei dir."}
            </p>
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
              <input className={field} style={fieldStyle} placeholder="Vorname" required value={form.vorname} onChange={set("vorname")} />
              <input className={field} style={fieldStyle} placeholder="Nachname" required value={form.nachname} onChange={set("nachname")} />
            </div>
            <input type="email" required className={field} style={fieldStyle} placeholder="E-Mail" value={form.email} onChange={set("email")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} style={fieldStyle} placeholder="Unternehmen (optional)" value={form.unternehmen} onChange={set("unternehmen")} />
              <input className={field} style={fieldStyle} placeholder="Deine Webseite (optional)" value={form.webseite} onChange={set("webseite")} />
            </div>
            <textarea className={field} style={fieldStyle} rows={5} required placeholder="Was ist dein Wunsch? Woran steckst du fest? Schreib einfach drauflos." value={form.anliegen} onChange={set("anliegen")} />

            {/* Honeypot — fuer Menschen unsichtbar */}
            <input type="text" name="fax" tabIndex={-1} autoComplete="off" value={form.fax} onChange={set("fax")} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
              <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold disabled:opacity-60 sm:w-auto">
                {status === "sending" ? "Sende …" : "Anfrage senden"}
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
