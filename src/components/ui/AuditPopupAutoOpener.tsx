"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X } from "lucide-react";
import { AuditRequestForm } from "@/components/blog/AuditRequestForm";

const STORAGE_KEY = "sabala_audit_popup_v1";
const COOLDOWN_DAYS = 30;
const TIME_TRIGGER_MS = 35_000;
const SCROLL_TRIGGER_PCT = 0.6;

type Trigger = "time" | "scroll" | "exit";

type StoredState =
  | { status: "dismissed"; until: number }
  | { status: "submitted" };

function readState(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : null;
  } catch {
    return null;
  }
}

function writeState(s: StoredState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore (private mode / disabled storage)
  }
}

function shouldSuppress(): boolean {
  const s = readState();
  if (!s) return false;
  if (s.status === "submitted") return true;
  if (s.status === "dismissed" && Date.now() < s.until) return true;
  return false;
}

function track(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const umami = (window as unknown as { umami?: { track?: (e: string, d?: Record<string, unknown>) => void } }).umami;
  umami?.track?.(event, data);
}

export function AuditPopupAutoOpener() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const triggeredRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fire = useCallback((trigger: Trigger) => {
    if (triggeredRef.current) return;
    if (shouldSuppress()) return;
    triggeredRef.current = true;
    setOpen(true);
    track("audit_popup_open", { trigger });
  }, []);

  // Trigger-Listener: Zeit + Scroll + Exit-Intent
  useEffect(() => {
    if (!mounted) return;
    if (shouldSuppress()) return;

    const timer = window.setTimeout(() => fire("time"), TIME_TRIGGER_MS);

    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = doc.scrollTop / total;
      if (pct >= SCROLL_TRIGGER_PCT) fire("scroll");
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) fire("exit");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [mounted, fire]);

  const dismiss = useCallback(() => {
    setOpen(false);
    if (!submittedRef.current) {
      writeState({
        status: "dismissed",
        until: Date.now() + COOLDOWN_DAYS * 24 * 60 * 60 * 1000,
      });
      track("audit_popup_dismiss");
    }
  }, []);

  const handleSuccess = useCallback(() => {
    submittedRef.current = true;
    writeState({ status: "submitted" });
    track("audit_popup_submit");
  }, []);

  // ESC + Body-Scroll-Lock während Modal offen
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dismiss]);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes sabalaAuditFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sabalaAuditModalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        style={{ animation: "sabalaAuditFadeIn 220ms ease-out both" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dismiss();
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-deep-charcoal/80 backdrop-blur-sm"
          onClick={dismiss}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="audit-popup-title"
          className="relative z-10 w-full max-w-[640px] max-h-[92vh] overflow-y-auto bg-[#2E2B26] border border-white/10 rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          style={{ animation: "sabalaAuditModalIn 320ms cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <button
            onClick={dismiss}
            aria-label="Schließen"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative p-8 sm:p-12 pt-14">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/10 pointer-events-none rounded-b-[2rem]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="w-4 h-4 text-refined-gold" />
                <span className="text-xs font-mono tracking-widest uppercase text-refined-gold">
                  Kostenfreies Webseiten-Audit
                </span>
              </div>

              <h2
                id="audit-popup-title"
                className="font-instrument text-3xl sm:text-4xl text-white leading-[1.1] mb-5"
              >
                Ein persönlicher Blick auf deine Seite — mit drei konkreten Hebeln.
              </h2>

              <p className="text-white/60 font-satoshi text-base sm:text-lg leading-relaxed mb-8">
                Ich schaue mir deine Webseite an: Substanz, Voice, Sichtbarkeit, Trust. Du bekommst eine ehrliche Einschätzung per Email — kein Funnel, kein Pitch, kein Verkaufsgespräch im Anschluss. Du entscheidest, was du daraus machst.
              </p>

              <AuditRequestForm onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
