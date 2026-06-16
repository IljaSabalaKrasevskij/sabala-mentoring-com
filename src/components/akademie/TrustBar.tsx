"use client";

/* ─────────────────────────────────────────────────────────────────────────
   TrustBar — schmaler dunkler Streifen direkt nach dem Hero. Sofort-Glaubwürdigkeit.
   ───────────────────────────────────────────────────────────────────────── */

const ITEMS = ["Zertifizierter Digitaler Trainer", "KIfiziert · KI-Dozent", "Sabala Academy · Praktische KI-Ausbildung"];

export default function TrustBar() {
  return (
    <div className="border-y px-6 py-5" style={{ background: "#0a0806", borderColor: "rgba(184,150,62,0.15)" }}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {ITEMS.map((t, i) => (
          <span key={t} className="flex items-center gap-3">
            {i > 0 && <span className="hidden h-1 w-1 rounded-full sm:block" style={{ background: "rgba(184,150,62,0.4)" }} />}
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(250,248,245,0.6)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: "var(--gold)" }}>
                <path d="M12 2l2.4 6.9H22l-5.8 4.3 2.2 7-6.4-4.6L5.6 20l2.2-7L2 8.9h7.6z" fill="currentColor" opacity="0.9" />
              </svg>
              {t}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
