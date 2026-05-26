"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";

type SubmitState = "idle" | "loading" | "success" | "error";

interface AuditRequestFormProps {
  onSuccess?: () => void;
}

export function AuditRequestForm({ onSuccess }: AuditRequestFormProps = {}) {
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
      onSuccess?.();
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Verbindungsproblem. Versuch es bitte später.");
    }
  };

  if (state === "success") {
    return (
      <div className="bg-pure-surface/5 border border-refined-gold/30 rounded-2xl p-10 md:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-refined-gold/20 border border-refined-gold/40 flex items-center justify-center">
          <Check className="w-8 h-8 text-refined-gold" />
        </div>
        <h3 className="font-instrument text-3xl md:text-4xl text-white mb-4">Danke. Wir schauen drauf.</h3>
        <p className="text-white/70 font-satoshi leading-relaxed max-w-[500px] mx-auto">
          Du bekommst dein Premium-Webseiten-Audit in den kommenden Tagen per Email. Persönlich, mit Substanz, ohne Funnel-Sprech. Schau in deinen Posteingang (und ggf. den Spam-Ordner).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-5">
      <div>
        <label htmlFor="audit-url" className="block font-mono text-xs uppercase tracking-widest text-refined-gold/80 mb-2">
          Deine Webseite
        </label>
        <input
          id="audit-url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="deine-webseite.com"
          required
          autoComplete="url"
          className="w-full bg-pure-surface/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-refined-gold focus:bg-pure-surface/10 transition-colors font-satoshi"
        />
      </div>

      <div>
        <label htmlFor="audit-email" className="block font-mono text-xs uppercase tracking-widest text-refined-gold/80 mb-2">
          Deine Email
        </label>
        <input
          id="audit-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="du@deine-webseite.com"
          required
          autoComplete="email"
          className="w-full bg-pure-surface/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-refined-gold focus:bg-pure-surface/10 transition-colors font-satoshi"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 w-4 h-4 rounded border-white/30 bg-pure-surface/5 text-refined-gold focus:ring-refined-gold focus:ring-offset-0 cursor-pointer"
        />
        <span className="text-white/60 text-sm font-satoshi leading-relaxed group-hover:text-white/80 transition-colors">
          Ich bin damit einverstanden, dass meine Daten verarbeitet werden, um mir das Audit per Email zu senden. Details in der <a href="/datenschutz" className="text-refined-gold hover:underline">Datenschutzerklärung</a>. Abmeldung jederzeit möglich.
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
  );
}
