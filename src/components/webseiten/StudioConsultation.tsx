"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AnalysisForm from "./AnalysisForm";
import { useAnalysisSession } from "./AnalysisSession";
import type { Lang } from "./studio-texte";
import styles from "./StudioConsultation.module.css";

const COPY = {
  de: {
    room: "Das Beratungsgespräch", back: "Zur Galerie", title: "Nimm Platz.",
    welcome: "Was hast du vor? Lass uns den ersten Schritt zu deiner Webseite gemeinsam vorbereiten.",
    detail: "Mit ein paar Angaben kann Ilja deine Potenzial-Analyse vorbereiten. Er meldet sich persönlich bei dir und stimmt einen Gesprächstermin mit dir ab.",
    start: "Gespräch anfragen", resume: "Anfrage fortsetzen", browse: "Auf der Webseite weiterstöbern",
    note: "Kostenlose Analyse und ein unverbindliches Gespräch mit Ilja.",
    captions: ["Erzähl mir von deinem Unternehmen.", "Was wünschst du dir für deinen Auftritt?", "Ilja meldet sich persönlich bei dir."],
    saved: "Deine Anfrage ist bei uns angekommen.",
    alt: "Der Sabala-Adler sitzt dir an einem Walnussholztisch im Londoner Beratungszimmer gegenüber.",
  },
  en: {
    room: "The conversation", back: "Back to the gallery", title: "Take a seat.",
    welcome: "What do you have in mind? Let us prepare the first step towards your website together.",
    detail: "A few details will help Ilja prepare your potential analysis. He will contact you personally to arrange a time to talk.",
    start: "Request a conversation", resume: "Continue your enquiry", browse: "Keep exploring the website",
    note: "A free analysis and a conversation with Ilja, without obligation.",
    captions: ["Tell me about your company.", "What would you like your website to do?", "Ilja will be in touch personally."],
    saved: "Your enquiry has arrived.",
    alt: "The Sabala eagle sits across from you at a walnut table in a London consultation room.",
  },
};

/** Mounted only after a visitor chooses the room. The native dialog isolates keyboard focus. */
export default function StudioConsultation({ lang, onClose, onBrowse }: { lang: Lang; onClose: () => void; onBrowse: () => void }) {
  const T = COPY[lang];
  const { draft, step, state } = useAnalysisSession();
  const [started, setStarted] = useState(state === "success");
  const [imageFailed, setImageFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const restoreFocusRef = useRef(true);
  const lenis = useLenis();
  const hasDraft = !!(draft.company || draft.industry || draft.url || draft.goal || draft.name);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const previousFocus = document.querySelector<HTMLElement>("[data-open-consultation]") ?? document.activeElement;
    const previousOverflow = document.documentElement.style.overflow;
    const wasStopped = lenis?.isStopped;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    node.showModal();
    heading.current?.focus({ preventScroll: true });
    return () => {
      node.close();
      document.documentElement.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
      // React removes the gallery's inert attribute in the same commit. Restore focus after it.
      requestAnimationFrame(() => {
        if (restoreFocusRef.current && previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
      });
    };
  }, [lenis]);

  const browse = () => { restoreFocusRef.current = false; onBrowse(); };

  const start = () => {
    setStarted(true);
    requestAnimationFrame(() => {
      const target = panel.current?.querySelector<HTMLElement>("h3");
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: "nearest", behavior: "instant" });
    });
  };

  return createPortal(<dialog ref={dialog} className={styles.room} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} data-lenis-prevent data-consultation-state={started ? state === "success" ? "success" : "questions" : "welcome"}>
    <div className={styles.interior}>
      <div className={styles.photograph}>
        <Image src={imageFailed ? "/webseiten/adler-stills/frontal.webp" : "/webseiten/studio-consultation-v1/consultation.webp"} alt={T.alt} fill sizes="100vw" priority unoptimized onError={() => setImageFailed(true)} />
      </div>
      <div className={styles.shade} aria-hidden />
      <header className={styles.header}>
        <div><span>Sabala Studios</span><h2 ref={heading} tabIndex={-1} id={titleId}>{T.room}</h2></div>
        <button type="button" onClick={onClose}><ArrowLeft size={15} aria-hidden />{T.back}</button>
      </header>
      <div className={styles.layout}>
        {started && <aside className={styles.hostNote} aria-live="polite"><p>{state === "success" ? T.saved : T.captions[step]}</p><span>{T.note}</span></aside>}
        <div ref={panel} className={styles.panel} data-lenis-prevent>
          {started ? <AnalysisForm lang={lang} variant="consultation" onContinue={browse} /> : <div className={styles.welcome}>
            <h3>{T.title}</h3>
            <p className={styles.lead}>{T.welcome}</p>
            <p className={styles.detail}>{T.detail}</p>
            <button className={styles.start} type="button" onClick={start}>{hasDraft ? T.resume : T.start}<ArrowRight size={17} aria-hidden /></button>
            <p className={styles.note}>{T.note}</p>
          </div>}
          {state !== "success" && <button className={styles.browse} type="button" onClick={browse}>{T.browse}<ArrowRight size={13} aria-hidden /></button>}
        </div>
      </div>
    </div>
  </dialog>, document.body);
}
