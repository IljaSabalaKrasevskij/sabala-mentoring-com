"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { EMPTY_PROJECT, type ProjectDraft } from "@/lib/audit-request";

function useSessionState() {
  const [draft, setDraft] = useState<ProjectDraft>({ ...EMPTY_PROJECT });
  const [step, setStep] = useState(0);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sendingRef = useRef(false);
  return { draft, setDraft, step, setStep, state, setState, sendingRef };
}

const AnalysisContext = createContext<ReturnType<typeof useSessionState> | null>(null);

/** One in-memory enquiry across the page and the room. Never persisted in the browser. */
export function AnalysisSessionProvider({ children }: { children: ReactNode }) {
  const session = useSessionState();
  return <AnalysisContext.Provider value={session}>{children}</AnalysisContext.Provider>;
}

export function useAnalysisSession() {
  const session = useContext(AnalysisContext);
  if (!session) throw new Error("AnalysisForm requires AnalysisSessionProvider");
  return session;
}
