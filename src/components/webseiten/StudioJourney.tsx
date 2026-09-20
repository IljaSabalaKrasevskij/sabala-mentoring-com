"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MoveUpRight, X } from "lucide-react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { StudioSoundControl } from "./StudioSound";
import { CASE_STUDIES } from "@/lib/case-studies";
import { caseSlot, ease, EXHIBITS, GALLERY_IDS, ROOM_PROGRESS, roomAt, type HoverAnchor, type Room } from "./studio-journey";
import styles from "./StudioJourney.module.css";

import StudioCinema from "./StudioCinema";
import StudioGallery from "./StudioGallery";
import StudioConsultation from "./StudioConsultation";
import { LONDON_ASSETS } from "./studio-cinema";
import { STUDIO_TEXTE, type Lang } from "./studio-texte";
const CASES = GALLERY_IDS.flatMap(id => { const c = CASE_STUDIES.find(item => item.id === id); return c?.image ? [c] : []; });
/* Nur die Kennungen, die Beschriftung kommt beim Rendern aus der Sprachdatei. */
const ROOM_IDS: Room[] = ["window", "reception", "gallery"];
const subscribeMotion = (callback: () => void) => {
  const m = window.matchMedia("(prefers-reduced-motion: reduce)"); m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
};

function ScrollCue() {
  return <span className={styles.scrollCue} aria-hidden="true"><span className={styles.scrollMouse}><span /></span><ArrowDown size={12} /></span>;
}

export default function StudioJourney({ lang = "de", galleryVariant = "classic" }: { lang?: Lang; galleryVariant?: "classic" | "salon" }) {
  const S = STUDIO_TEXTE[lang];
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const distance = useRef(0);
  const invalidate = useRef<(() => void) | null>(null);
  const frame = useRef<number | null>(null);
  const navigationFrame = useRef<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const enteredRef = useRef(false);
  const historySession = useRef("");
  const historyDepth = useRef(0);
  const exitTarget = useRef<"window" | "page">("window");
  const pendingExit = useRef<"window" | "page" | null>(null);
  const [entered, setEntered] = useState(false);
  const [returned, setReturned] = useState(false);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [room, setRoom] = useState<Room>("window");
  const [travelling, setTravelling] = useState(false);
  const [close, setClose] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<HoverAnchor>({ x: 50, y: 52 });
  const [pinned, setPinned] = useState<number | null>(null);
  const [service, setService] = useState<number | null>(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(0);
  const [consultation, setConsultation] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const flat = unavailable || quiet;
  const selected = pinned ?? hovered;
  const exhibit = selected === null ? null : { ...EXHIBITS[selected], ...S.exponate[selected] };
  const project = CASES[caseIndex];
  const stepCase = (delta: number) => setCaseIndex(i => (i + delta + CASES.length) % CASES.length);
  const display = selected === null ? null : S.schilder[selected];
  const exploring = entered || returned || flat || close;

  // Page scrolling only approaches the window. Entering a room is always deliberate.
  const update = useCallback(() => {
    if (!section.current || enteredRef.current) return;
    const screens = Math.max(0, -section.current.getBoundingClientRect().top / window.innerHeight);
    distance.current = returned || flat ? 1 : Math.min(1, screens);
    progress.current = 0;
    setClose(distance.current >= .72);
    section.current.style.setProperty("--invitation-opacity", String(1 - ease(distance.current / .6)));
    invalidate.current?.();
  }, [returned, flat]);
  const lenis = useLenis(update);
  useEffect(() => {
    const s = section.current;
    if (!s) return;
    const lazy = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setNear(true); }, { rootMargin: "600px" });
    const visible = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    lazy.observe(s); visible.observe(s);
    return () => { lazy.disconnect(); visible.disconnect(); };
  }, []);
  useEffect(() => {
    const schedule = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => { frame.current = null; update(); });
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [update]);

  const focusRoom = useCallback(() => {
    const heading = stage.current?.querySelector<HTMLElement>("[data-room-heading]") ?? stage.current?.querySelector<HTMLElement>("h2");
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  }, []);
  const moveTo = useCallback((destination: Room, instant = false) => {
    if (navigationFrame.current !== null) cancelAnimationFrame(navigationFrame.current);
    setPinned(null); setHovered(null); setService(null);
    const from = progress.current;
    const to = ROOM_PROGRESS[destination];
    // Reverse trips are immediate; the introduction only plays on the way in.
    const duration = instant || flat || reduced || to <= from ? 0 : destination === "gallery" ? 1600 : 1800;
    distance.current = 1;
    const finish = () => {
      progress.current = to; setRoom(destination); setTravelling(false);
      invalidate.current?.();
      navigationFrame.current = requestAnimationFrame(() => { focusRoom(); navigationFrame.current = null; });
    };
    if (!duration) { finish(); return; }
    setTravelling(true);
    const started = performance.now();
    const paint = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      progress.current = from + (to - from) * ease(t);
      setRoom(roomAt(progress.current));
      invalidate.current?.();
      if (t < 1) navigationFrame.current = requestAnimationFrame(paint);
      else finish();
    };
    navigationFrame.current = requestAnimationFrame(paint);
  }, [flat, reduced, focusRoom]);

  const closeTour = useCallback(() => {
    if (navigationFrame.current !== null) cancelAnimationFrame(navigationFrame.current);
    navigationFrame.current = null;
    enteredRef.current = false;
    setConsultation(false); setEntered(false); setReturned(true); setRoom("window"); setTravelling(false);
    setPinned(null); setHovered(null);
    progress.current = 0; distance.current = 1;
    requestAnimationFrame(() => {
      const target = exitTarget.current === "page" ? document.getElementById("hebel") : section.current;
      if (!target) return;
      if (lenis) { lenis.resize(); lenis.scrollTo(target, { immediate: true, force: true }); }
      else target.scrollIntoView({ behavior: "instant", block: "start" });
      const focus = exitTarget.current === "page" ? target.querySelector<HTMLElement>("h2") : target.querySelector<HTMLElement>("[data-enter-studio]");
      if (focus) { focus.tabIndex = focus.tagName === "H2" ? -1 : 0; focus.focus({ preventScroll: true }); }
    });
  }, [lenis]);

  // Keep the router's own state. Back traverses rooms; Forward restores them.
  const record = useCallback((destination: "reception" | "gallery" | "coffee") => {
    const previous = window.history.state?.sabalaStudio;
    if (previous?.session === historySession.current && previous.room === destination) return;
    historyDepth.current += 1;
    window.history.pushState({ ...window.history.state, sabalaStudio: {
      session: historySession.current, depth: historyDepth.current, room: destination,
    } }, "");
  }, []);
  const exit = useCallback((target: "window" | "page") => {
    if (pendingExit.current) return;
    exitTarget.current = target;
    const depth = historyDepth.current;
    if (depth > 0) { pendingExit.current = target; window.history.go(-depth); }
    else closeTour();
  }, [closeTour]);
  const go = useCallback((destination: Room, instant = false) => {
    if (destination === "window") { exit("window"); return; }
    if (!enteredRef.current) {
      historySession.current = crypto.randomUUID(); historyDepth.current = 0;
      enteredRef.current = true; setEntered(true); setNear(true);
    }
    record(destination);
    setConsultation(false);
    moveTo(destination, instant);
  }, [exit, record, moveTo]);
  const openConsultation = useCallback(() => { record("coffee"); setConsultation(true); }, [record]);
  const closeConsultation = useCallback(() => window.history.back(), []);
  const browseOn = useCallback(() => exit("page"), [exit]);
  const onDoor = useCallback(() => go("reception"), [go]);
  const chooseQuestion = (index: number, instant = false) => {
    if (index === 2) go("gallery", instant);
    else setService(index);
  };

  useEffect(() => {
    const pop = () => {
      const entry = window.history.state?.sabalaStudio;
      if (pendingExit.current) {
        exitTarget.current = pendingExit.current; pendingExit.current = null;
        historyDepth.current = 0; closeTour(); return;
      }
      if (entry?.session === historySession.current && ["reception", "gallery", "coffee"].includes(entry.room)) {
        historyDepth.current = entry.depth;
        enteredRef.current = true; setEntered(true); setNear(true);
        moveTo(entry.room === "coffee" ? "gallery" : entry.room, true);
        setConsultation(entry.room === "coffee");
      } else if (enteredRef.current) {
        historyDepth.current = 0; exitTarget.current = "window"; closeTour();
      }
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, [moveTo, closeTour]);

  useLayoutEffect(() => {
    if (!entered || !dialog.current) return;
    const node = dialog.current;
    const previousOverflow = document.documentElement.style.overflow;
    const wasStopped = lenis?.isStopped;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    lenis?.stop(); document.documentElement.style.overflow = "hidden";
    node.showModal();
    return () => {
      node.close(); document.documentElement.style.overflow = previousOverflow;
      window.history.scrollRestoration = previousRestoration;
      if (!wasStopped) lenis?.start();
    };
  }, [entered, lenis]);
  useEffect(() => () => { if (navigationFrame.current !== null) cancelAnimationFrame(navigationFrame.current); }, []);
  const onInvalidate = useCallback((callback: (() => void) | null) => { invalidate.current = callback; }, []);
  const onReady = useCallback(() => { setReady(true); invalidate.current?.(); }, []);
  const onFailure = useCallback(() => { setUnavailable(true); setReady(false); setTravelling(false); }, []);
  const onSelect = useCallback((i: number | null) => setPinned(current => current === i ? null : i), []);
  const onHover = useCallback((i: number | null, point?: HoverAnchor) => {
    setHovered(i);
    if (i !== null && pinned === null) setAnchor(point ?? { x: 26 + i * 8, y: 53 });
  }, [pinned]);
  const switchMode = () => { setQuiet(!quiet); if (entered) moveTo(room, true); };

  const content = <div ref={stage} className={styles.stage} data-entered={entered} data-consulting={consultation}>
      <header className={styles.topbar}>
        {entered ? <button type="button" className={styles.back} onClick={() => exit("window")}><ArrowLeft size={16} aria-hidden />{S.zurueck}</button> : <span className={styles.wordmark}>{S.marke}</span>}
        <nav className={styles.roomnav} aria-label={S.raeume}>{ROOM_IDS.map((id, i) => <button key={id} type="button" onClick={event => go(id, event.detail === 0)} aria-current={room === id ? "step" : undefined}><span>{String(i + 1).padStart(2, "0")}</span>{S.raum[id]}</button>)}</nav>
        {entered && <StudioSoundControl lang={lang} inline />}
      </header>
      <h2 id={titleId} className={styles.srOnly}>{S.bereich}</h2>
      <div className={styles.scene} style={{ cursor: hovered !== null ? "pointer" : "auto" }}>
        {unavailable || !near ? <div className={styles.poster}><Image src={unavailable ? "/webseiten/schaufenster/master.jpg" : LONDON_ASSETS.window} alt={S.bildAlt.poster} fill sizes="100vw" /></div> : <StudioCinema galleryVariant={galleryVariant} lang={lang} progress={progress} distance={distance} exploring={exploring} room={room} flat={flat} reduced={reduced} selected={selected} interactive={(!travelling || flat) && (room !== "window" || exploring)} onSelect={onSelect} onHover={onHover} onDoor={onDoor} onReady={onReady} onFailure={onFailure} onInvalidate={onInvalidate} project={{ image: project.image!, title: project.title.de, url: project.url ?? "/case-studies" }} />}
        <div className={styles.vignette} aria-hidden="true" />
      </div>

      {!ready && !flat && <div className={styles.loading} role="status"><span />{S.laedt}<button type="button" onClick={() => setQuiet(true)}>{S.alsUebersicht}</button></div>}

      {room === "window" && !exploring && <div className={styles.invitation}>
        <h2>{S.naeher}</h2><ScrollCue /><span className={styles.srOnly}>{S.naeherHinweis}</span>
      </div>}
      {room === "window" && exploring && <h2 className={styles.srOnly}>Das Schaufenster von Sabala Studios</h2>}
      {travelling && !flat && <div className={styles.travelHint} aria-live="polite">{room === "window" ? S.willkommen : S.arbeitenTitel}</div>}

      {room === "window" && !travelling && <button type="button" data-enter-studio className={styles.entryCue} onClick={event => go("reception", event.detail === 0)}><span>{S.eintreten}</span><ArrowRight size={18} aria-hidden="true" /></button>}
      {room === "window" && !travelling && exploring && <>
        {exhibit && display && <article key={exhibit.id} className={`${styles.digitalPanel} ${pinned !== null ? styles.panelPinned : ""}`} aria-live="polite" style={{
          left: `clamp(18px, calc(${anchor.x}% + ${anchor.x > 56 ? "-310px" : "28px"}), calc(100% - 328px))`,
          top: `clamp(110px, calc(${anchor.y}% - 240px), calc(100% - 390px))`,
          pointerEvents: pinned !== null ? "auto" : "none",
          transformOrigin: anchor.x > 56 ? "right bottom" : "left bottom",
        }}>
          <div className={styles.digitalTop}><span>{S.kicker}</span>{pinned !== null && <button type="button" onClick={() => { setPinned(null); setHovered(null); }} aria-label={S.erklaerungSchliessen}><X size={14} /></button>}</div>
          <h3>{exhibit.label}</h3><p className={styles.digitalBenefit}>{display.title}</p>
          <ul>{display.features.map((feature, i) => <li key={feature} style={{ animationDelay: `${i * 55 + 80}ms` }}>{feature}</li>)}</ul>
          <p className={styles.digitalResult}>{display.benefit}</p>
          {pinned !== null && <small className={styles.digitalProof}>{exhibit.proof}</small>}
        </article>}
        <div className={styles.windowBottom}>
          <details className={styles.exhibitMenu}>
            <summary>{S.exponateEntdecken}<span aria-hidden="true">+</span></summary>
            <div className={styles.exhibitNav} aria-label={S.dingeImFenster}>
              {S.exponate.map((e, i) => <button key={e.label} type="button" aria-pressed={selected === i} onMouseEnter={() => onHover(i)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(i)} onBlur={() => onHover(null)} onClick={(event) => { onSelect(i); const menu = event.currentTarget.closest("details"); menu?.removeAttribute("open"); menu?.querySelector("summary")?.focus({ preventScroll: true }); }}>{e.label}</button>)}
            </div>
          </details>
        </div>
      </>}

      {room === "reception" && !travelling && <div className={styles.concierge}>
        <article id="studio-answer" className={styles.speech} role="status" aria-live="polite" aria-atomic="true" key={service ?? "greeting"}>
          {service === null ? <h2 data-room-heading>{S.wieHelfen}</h2> : <>
            <p>{S.fragen[service].answer}</p>
          </>}
        </article>
        <div className={styles.questionRow} aria-label={S.fragenAnGastgeber}>{S.fragen.map((q, i) => <button key={q.question} type="button" aria-pressed={service === i} aria-controls="studio-answer" onClick={event => chooseQuestion(i, event.detail === 0)}><span>{q.question}</span><MoveUpRight size={16} aria-hidden="true" /></button>)}</div>
      </div>}

      {room === "gallery" && !travelling && (galleryVariant === "salon" ? <StudioGallery lang={lang} reduced={reduced || flat} index={galleryIndex} onSelect={setGalleryIndex} onBack={() => go("reception", true)} onConsult={openConsultation} paused={consultation} /> : <div className={styles.gallery}>
        <div className={styles.galleryHeading}><h2>{S.ausgewaehlteArbeiten}</h2></div>
        <article className={styles.casePanel} key={project.id}>
          <p className={styles.caseIndustry}>{project.industry.de}</p><h3>{project.title.de.split(":")[0]}</h3>
          <a href={project.url ?? "/case-studies"} target="_blank" rel="noopener noreferrer">{project.url ? S.liveAnsehen : S.caseStudy}<MoveUpRight size={16} /></a>
        </article>
        <div className={styles.caseRail} aria-label={S.arbeitWaehlen}>
          <button type="button" className={styles.railStep} aria-label={S.vorherige} onClick={() => stepCase(-1)}><ChevronLeft size={17} aria-hidden="true" /></button>
          <div className={styles.railTrack}>{CASES.map((c, i) => {
            const slot = caseSlot(i, caseIndex, CASES.length);
            const off = Math.abs(slot) > 1;
            return <button type="button" key={c.id} data-slot={off ? "far" : slot} aria-pressed={caseIndex === i} aria-hidden={off} tabIndex={off ? -1 : 0} onClick={() => setCaseIndex(i)}><Image src={c.image!} alt="" width={336} height={189} sizes="(max-width: 1200px) 140px, 180px" /><span>{c.title.de.split(":")[0]}</span></button>;
          })}</div>
          <button type="button" className={styles.railStep} aria-label={S.naechste} onClick={() => stepCase(1)}><ChevronRight size={17} aria-hidden="true" /></button>
        </div>
        <div className={styles.galleryFooter}><button type="button" onClick={() => go("reception")}><ArrowLeft size={15} />{S.raum.reception}</button><button type="button" onClick={openConsultation}>{S.projektBesprechen}<ArrowRight size={16} /></button></div>
      </div>)}

      <footer className={styles.bottomBar}>
        <span>{entered ? S.navigationHinweis : S.hinweis.entdecken}</span>
        {!unavailable && <button type="button" className={styles.motionToggle} onClick={switchMode}>{quiet ? S.mitFahrt : S.ohneFahrt}</button>}
        <button type="button" className={styles.exit} onClick={browseOn}>{S.weiterlesen}<ArrowRight size={16} aria-hidden /></button>
      </footer>
    </div>;

  return <>
    <section id="schaufenster" ref={section} className={styles.journey} style={{ height: returned || flat ? "100svh" : "200svh" }} aria-label={S.bereich} data-room={room} data-ready={ready} data-active={active} data-window-phase={exploring ? "explore" : "approach"}>
      {!entered && content}
    </section>
    {entered && createPortal(<dialog ref={dialog} className={`${styles.journey} ${styles.dialog}`} aria-labelledby={titleId} data-studio-tour data-room={room} data-travelling={travelling} data-lenis-prevent onCancel={event => {
      event.preventDefault();
      if (pinned !== null) { setPinned(null); setHovered(null); }
      else exit("window");
    }}>{content}</dialog>, document.body)}
    {consultation && <StudioConsultation lang={lang} reduced={reduced || flat} scrollLocked onClose={closeConsultation} onBrowse={browseOn} />}
  </>;
}
