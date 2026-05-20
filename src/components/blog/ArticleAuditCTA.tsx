"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check, Loader2, AlertCircle, Sparkles } from "lucide-react";

type SubmitState = "idle" | "loading" | "success" | "error";

interface ArticleAuditCTAProps {
  /**
   * Eyebrow-Text (kleine Überschrift über der Headline)
   * Default: "Persönliches Audit"
   */
  eyebrow?: string;
  /**
   * Hauptüberschrift im Block
   */
  headline?: React.ReactNode;
  /**
   * Bridge-Text unter der Headline (max 3 Sätze)
   */
  bridge?: React.ReactNode;
}

/**
 * Article-Audit-CTA: Kompakter Lead-Magnet-Block für unter Blog-Beiträge.
 * Embedded Audit-Form, identische Voice + Visual wie die existing CTA-Cards.
 * POST gegen /api/audit-request (Notion + ntfy-Push).
 */
export function ArticleAuditCTA({
  eyebrow = "Persönliches Audit",
  headline,
  bridge,
}: ArticleAuditCTAProps) {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateUrl = (raw: string) => {
    try {
      const normalized = raw.startsWith("http") ? raw : `https://${raw}`;
      new URL(normalized);
      return normalized;
    } catch {
      return null;
    }
  };

  const validateEmail = (raw: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const normalizedUrl = validateUrl(url.trim());
    if (!normalizedUrl) {
      setErrorMessage("Bitte gib eine gültige Webseiten-URL ein.");
      return;
    }
    if (!validateEmail(email.trim())) {
      setErrorMessage("Bitte gib eine gültige Email-Adresse ein.");
      return;
    }
    if (!consent) {
      setErrorMessage("Bitte bestätige die Datenschutzhinweise.");
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl, email: email.trim(), consent: true }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Etwas ist schiefgelaufen.");
      }
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Verbindungsproblem. Versuch es bitte später.");
    }
  };

  return (
    <section className="px-6 md:px-12 mt-24 max-w-[1000px] mx-auto w-full">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B26] border border-white/10 p-10 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/5 lg:from-refined-gold/10 pointer-events-none"></div>

        <div className="relative z-10">
          {state === "success" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-refined-gold/20 border border-refined-gold/40 flex items-center justify-center">
                <Check className="w-8 h-8 text-refined-gold" />
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-4">Danke. Wir schauen drauf.</h3>
              <p className="text-white/70 font-satoshi leading-relaxed max-w-[500px] mx-auto">
                Du bekommst dein Premium-Webseiten-Audit in den kommenden Tagen per Email. Persönlich, mit Substanz, ohne Funnel-Sprech. Schau in deinen Posteingang (und ggf. den Spam-Ordner).
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-refined-gold" />
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">{eyebrow}</span>
              </div>

              <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6 leading-[1.1]">
                {headline ?? <>Bereit zu sehen,<br/>wo deine Seite wirklich steht?</>}
              </h3>

              <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8 max-w-[680px]">
                {bridge ?? (
                  <>
                    Ich schaue mir deine Webseite persönlich an. Substanz, Voice, Sichtbarkeit, Trust-Elemente. Du bekommst eine ehrliche Einschätzung mit drei konkreten Hebeln — kein Marketing-Sprech, kein Funnel.
                  </>
                )}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-[680px]">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="deine-webseite.com"
                    required
                    autoComplete="url"
                    aria-label="Deine Webseite"
                    className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-refined-gold focus:bg-white/10 transition-colors font-satoshi"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="du@deine-webseite.com"
                    required
                    autoComplete="email"
                    aria-label="Deine Email"
                    className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-refined-gold focus:bg-white/10 transition-colors font-satoshi"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5 text-refined-gold focus:ring-refined-gold focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-white/60 text-sm font-satoshi leading-relaxed group-hover:text-white/80 transition-colors">
                    Einverstanden, dass meine Daten verarbeitet werden, um mir das Audit per Email zu senden. Details in der <a href="/datenschutz" className="text-refined-gold hover:underline">Datenschutzerklärung</a>. Abmeldung jederzeit möglich.
                  </span>
                </label>

                {errorMessage && (
                  <div className="flex items-center gap-2 text-red-300 text-sm font-satoshi">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-refined-gold hover:bg-white text-deep-charcoal px-8 py-4 rounded-full font-medium font-satoshi transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Wird gesendet...
                    </>
                  ) : (
                    <>
                      Mein Audit anfordern <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
