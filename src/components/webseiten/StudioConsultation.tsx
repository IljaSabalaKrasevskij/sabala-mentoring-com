"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { ArrowLeft, ArrowRight, Coffee } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AnalysisForm from "./AnalysisForm";
import { useAnalysisSession } from "./AnalysisSession";
import type { Lang } from "./studio-texte";
import { COFFEE_ASSETS, COFFEE_COPY, type CoffeeChoice, type CoffeePhase } from "./studio-coffee";
import styles from "./StudioConsultation.module.css";
import { cssMatrix, galleryCamera } from "./studio-gallery";
import { StudioSoundControl, useStudioSound } from "./StudioSound";

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
export default function StudioConsultation({ lang, reduced = false, onClose, onBrowse }: { lang: Lang; reduced?: boolean; onClose: () => void; onBrowse: () => void }) {
  const T = COPY[lang];
  const C = COFFEE_COPY[lang];
  const [phase, setPhase] = useState<CoffeePhase>("invitation");
  const [coffee, setCoffee] = useState<CoffeeChoice | null>(null);
  const [playing, setPlaying] = useState(false);
  const [tableReady, setTableReady] = useState(false);
  const [mobileFilm] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 699px)").matches);
  const [filmFailed, setFilmFailed] = useState(false);
  const [arrived, setArrived] = useState(false);
  const coffeeStage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const filmProgress = useRef<HTMLSpanElement>(null);
  const lastPlayback = useRef(0);
  const seated = phase === "seated";
  const setQuiet = useStudioSound()?.setQuiet;
  useEffect(() => {
    setQuiet?.(seated);
    return () => setQuiet?.(false);
  }, [seated, setQuiet]);
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
    let arrivalFrame = requestAnimationFrame(() => {
      arrivalFrame = requestAnimationFrame(() => setArrived(true));
    });
    return () => {
      cancelAnimationFrame(arrivalFrame);
      node.close();
      document.documentElement.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
      // React removes the gallery's inert attribute in the same commit. Restore focus after it.
      requestAnimationFrame(() => {
        if (restoreFocusRef.current && previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
      });
    };
  }, [lenis]);

  useEffect(() => {
    const gallery = document.querySelector<HTMLElement>('[data-gallery-version="salon"]');
    const stage = coffeeStage.current;
    if (!stage) return;
    const align = () => {
      const bounds = gallery?.getBoundingClientRect();
      const matrix = galleryCamera(null, bounds?.width ?? window.innerWidth, bounds?.height ?? window.innerHeight);
      matrix[2] += bounds?.left ?? 0;
      matrix[5] += bounds?.top ?? 0;
      stage.style.transform = cssMatrix(matrix);
    };
    align();
    const observer = new ResizeObserver(align);
    if (gallery) observer.observe(gallery);
    window.addEventListener("resize", align);
    return () => { observer.disconnect(); window.removeEventListener("resize", align); };
  }, []);

  useEffect(() => {
    if (phase !== "walking") return;
    const node = video.current;
    if (reduced || filmFailed || !node) {
      const frame = requestAnimationFrame(() => setPhase("seated"));
      return () => cancelAnimationFrame(frame);
    }
    lastPlayback.current = performance.now();
    let cancelled = false;
    let decodedFrame: number | undefined;
    let paintFrame = 0;
    const revealFilm = () => { if (!cancelled) setPlaying(true); };
    // Keep the gallery underneath until the browser has an actual video frame.
    const revealFallback = () => {
      if (node.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        paintFrame = requestAnimationFrame(() => { paintFrame = requestAnimationFrame(revealFilm); });
      }
    };
    if (typeof node.requestVideoFrameCallback === "function") decodedFrame = node.requestVideoFrameCallback(revealFilm);
    else node.addEventListener("playing", revealFallback);
    node.play().catch(() => { if (!cancelled) setPhase("seated"); });
    // A stalled connection must never strand the visitor between the two rooms.
    const watchdog = window.setInterval(() => {
      if (!document.hidden && performance.now() - lastPlayback.current > 8000) setPhase("seated");
    }, 1000);
    const visibility = () => {
      lastPlayback.current = performance.now();
      if (document.hidden) node.pause();
      else node.play().catch(() => { if (!cancelled) setPhase("seated"); });
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelled = true;
      node.pause();
      if (decodedFrame !== undefined) node.cancelVideoFrameCallback(decodedFrame);
      cancelAnimationFrame(paintFrame);
      node.removeEventListener("playing", revealFallback);
      clearInterval(watchdog);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [phase, reduced, filmFailed]);

  useEffect(() => {
    if (seated) heading.current?.focus({ preventScroll: true });
  }, [seated]);

  const takeWalk = (choice: CoffeeChoice) => {
    setCoffee(choice);
    setPhase(reduced || filmFailed ? "seated" : "walking");
    heading.current?.focus({ preventScroll: true });
  };
  const browse = () => { restoreFocusRef.current = false; onBrowse(); };

  const start = () => {
    setStarted(true);
    requestAnimationFrame(() => {
      const target = panel.current?.querySelector<HTMLElement>("h3");
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: "nearest", behavior: "instant" });
    });
  };

  return createPortal(<dialog ref={dialog} className={styles.room} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} data-lenis-prevent data-phase={phase} data-arrived={arrived} data-film-visible={playing} data-table-ready={tableReady} data-quiet={reduced} data-consultation-state={seated ? started ? state === "success" ? "success" : "questions" : "welcome" : phase}>
    <div className={styles.interior}>
      <div className={styles.photograph}>
        <Image src={imageFailed ? "/webseiten/adler-stills/frontal.webp" : COFFEE_ASSETS.table} alt={T.alt} fill sizes="100vw" priority unoptimized onLoad={() => setTableReady(true)} onError={() => setImageFailed(true)} />
      </div>
      <div className={styles.coffeeScene} data-visible={playing && !(seated && tableReady)} aria-hidden="true">
        <div ref={coffeeStage} className={styles.coffeeStage}>
        {!reduced && !filmFailed && <video ref={video} src={mobileFilm ? COFFEE_ASSETS.mobileFilm : COFFEE_ASSETS.film} className={styles.walkFilm} data-playing={playing} muted playsInline preload="auto" poster={COFFEE_ASSETS.gallery} aria-hidden="true" onEnded={() => setPhase("seated")} onError={() => setFilmFailed(true)} onTimeUpdate={event => {
          const node = event.currentTarget;
          lastPlayback.current = performance.now();
          if (filmProgress.current && node.duration) filmProgress.current.style.transform = `scaleX(${Math.min(1, node.currentTime / node.duration)})`;
        }} />}
        </div>
      </div>
      <div className={styles.shade} aria-hidden />
      <header className={styles.header}>
        <div><span>Sabala Studios</span><h2 ref={heading} tabIndex={-1} id={titleId}>{seated ? T.room : C.room}</h2></div>
        <button type="button" onClick={onClose}><ArrowLeft size={15} aria-hidden />{T.back}</button>
      </header>
      <StudioSoundControl lang={lang} inRoom />
      {!seated && <div className={styles.coffeeInvitation} data-visible={arrived && phase === "invitation"} inert={phase !== "invitation"} aria-hidden={phase !== "invitation"}>
        <div className={styles.hostSpeech}>
          <Image className={styles.coffeeCup} src={COFFEE_ASSETS.cup} alt="" width={145} height={121} unoptimized priority aria-hidden="true" />
          <span className={styles.hostEyebrow}>{C.host}</span>
          <h3>{C.title}</h3>
          <p>{C.invitation}</p>
        </div>
        <div className={styles.coffeeControls}>
          <div className={styles.coffeeChoices} role="group" aria-label={C.title}>
            {C.choices.map(option => <button type="button" key={option.id} onClick={() => takeWalk(option.id)}>
              <span className={styles.cupIcon}><Coffee size={21} aria-hidden /></span>
              <span><strong>{option.label}</strong><small>{option.detail}</small></span>
            </button>)}
          </div>
        </div>
      </div>}
      {phase === "walking" && <div className={styles.walkCaption}>
        <p role="status">{C.walking}</p>
        <span className={styles.walkProgress} aria-hidden><span ref={filmProgress} /></span>
        <button type="button" onClick={() => setPhase("seated")}>{C.skip}<ArrowRight size={14} aria-hidden /></button>
      </div>}
      {seated && <div className={styles.layout}>
        <aside className={styles.hostNote} aria-live="polite"><p>{started ? state === "success" ? T.saved : T.captions[step] : coffee ? C.seated[coffee] : T.title}</p>{started && <span>{T.note}</span>}</aside>
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
      </div>}
    </div>
  </dialog>, document.body);
}
