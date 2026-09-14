"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MoveUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CASE_STUDIES } from "@/lib/case-studies";
import { APPROACH_SCREENS, caseSlot, ease, EXHIBITS, GALLERY_IDS, journeyProgress, ROOM_PROGRESS, roomAt, type HoverAnchor, type Room } from "./studio-journey";
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
  const pendingDestination = useRef<Room | null>(null);
  const lastRoom = useRef<Room>("window");
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [room, setRoom] = useState<Room>("window");
  const [travelling, setTravelling] = useState(false);
  const [close, setClose] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<HoverAnchor>({ x: 50, y: 52 });
  const [pinned, setPinned] = useState<number | null>(null);
  const [service, setService] = useState<number | null>(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [consultation, setConsultation] = useState(false);
  const openConsultation = useCallback(() => setConsultation(true), []);
  const closeConsultation = useCallback(() => setConsultation(false), []);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const flat = unavailable || quiet;
  const selected = pinned ?? hovered;
  const exhibit = selected === null ? null : { ...EXHIBITS[selected], ...S.exponate[selected] };
  const project = CASES[caseIndex];
  const stepCase = (delta: number) => setCaseIndex(i => (i + delta + CASES.length) % CASES.length);
  const display = selected === null ? null : S.schilder[selected];
  const exploring = flat || close;

  const update = useCallback(() => {
    if (!section.current || flat) return;
    const rect = section.current.getBoundingClientRect();
    const screens = Math.max(0, -rect.top / window.innerHeight);
    distance.current = screens;
    const p = journeyProgress(screens, expanded);
    setClose(screens >= .72);
    section.current.style.setProperty("--invitation-opacity", String(1 - ease(screens / .6)));
    progress.current = p;
    const next = roomAt(p);
    if (next !== lastRoom.current) { lastRoom.current = next; setRoom(next); setHovered(null); setPinned(null); }
    setTravelling((p > 0.105 && p < 0.405) || (p > 0.535 && p < 0.88));
    invalidate.current?.();
  }, [expanded, flat]);
  const lenis = useLenis(update);
  useEffect(() => {
    const s = section.current;
    if (!s) return;
    const lazy = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setNear(true); }, { rootMargin: "600px" });
    const visible = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 });
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
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); if (frame.current !== null) cancelAnimationFrame(frame.current); frame.current = null; };
  }, [update]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") { setPinned(null); setHovered(null); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => () => { if (navigationFrame.current !== null) cancelAnimationFrame(navigationFrame.current); }, []);

  const scrollToRoom = useCallback((destination: Room) => {
    const s = section.current;
    if (!s) return;
    const top = s.getBoundingClientRect().top + window.scrollY + (destination === "window" ? 0 : APPROACH_SCREENS + ROOM_PROGRESS[destination] * 5) * window.innerHeight;
    if (lenis) { lenis.resize(); lenis.scrollTo(top, { duration: reduced ? 0 : destination === "window" ? 2.4 : destination === "reception" ? 4.8 : 7, immediate: reduced }); }
    else window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
  }, [lenis, reduced]);

  // Expansion is committed before measuring the new scroll destination.
  useEffect(() => {
    if (!expanded || !pendingDestination.current) return;
    const destination = pendingDestination.current; pendingDestination.current = null;
    navigationFrame.current = requestAnimationFrame(() => { scrollToRoom(destination); navigationFrame.current = null; });
  }, [expanded, scrollToRoom]);
  const go = useCallback((destination: Room) => {
    setPinned(null); setHovered(null); setService(null);
    if (flat) {
      setTravelling(false); setRoom(destination); lastRoom.current = destination;
      if (section.current) {
        if (lenis) lenis.scrollTo(section.current, { immediate: true, force: true });
        else section.current.scrollIntoView({ behavior: "instant", block: "start" });
      }
      return;
    }
    if (destination === "gallery" && !expanded) { pendingDestination.current = destination; setExpanded(true); return; }
    scrollToRoom(destination);
  }, [expanded, flat, lenis, scrollToRoom]);
  const chooseQuestion = (index: number) => {
    setService(index);
    if (index !== 2 || expanded) return;
    // Discard scroll accumulated beyond the closed reception before unlocking the next room.
    // The counter stays in view; only a subsequent scroll starts the gallery journey.
    if (!flat && section.current) {
      const top = section.current.getBoundingClientRect().top + window.scrollY
        + (APPROACH_SCREENS + ROOM_PROGRESS.reception * 5) * window.innerHeight;
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo({ top, behavior: "instant" });
    }
    setExpanded(true);
  };
  const browseOn = useCallback(() => {
    setConsultation(false);
    requestAnimationFrame(() => {
      const target = document.getElementById("hebel");
      if (!target) return;
      if (lenis) { lenis.start(); lenis.scrollTo(target, { immediate: true, force: true }); }
      else target.scrollIntoView({ behavior: "instant", block: "start" });
      const heading = target.querySelector("h2");
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    });
  }, [lenis]);
  const onDoor = useCallback(() => go("reception"), [go]);
  const onInvalidate = useCallback((callback: (() => void) | null) => { invalidate.current = callback; }, []);
  const onReady = useCallback(() => { setReady(true); invalidate.current?.(); }, []);
  const onFailure = useCallback(() => { setUnavailable(true); setReady(false); setTravelling(false); }, []);
  const onSelect = useCallback((i: number | null) => setPinned(current => current === i ? null : i), []);
  const onHover = useCallback((i: number | null, point?: HoverAnchor) => {
    setHovered(i);
    if (i !== null && pinned === null) setAnchor(point ?? { x: 26 + i * 8, y: 53 });
  }, [pinned]);
  const switchMode = () => {
    const s = section.current;
    if (!s) return;
    // Keep the chosen room and the section in view when its height changes.
    const targetRoom = room;
    if (quiet && targetRoom === "gallery") setExpanded(true);
    setTravelling(false); setQuiet(!quiet);
    navigationFrame.current = requestAnimationFrame(() => {
      if (quiet) scrollToRoom(targetRoom);
      else if (lenis) { lenis.resize(); lenis.scrollTo(s, { immediate: true, force: true }); }
      else s.scrollIntoView({ behavior: "instant", block: "start" });
      navigationFrame.current = null;
    });
  };

  return <section id="schaufenster" ref={section} className={`${styles.journey} ${flat ? styles.flat : ""}`} style={{ height: flat ? "auto" : `${(APPROACH_SCREENS + (expanded ? 6.1 : 3.4)) * 100}vh` }} aria-label={S.bereich} data-room={room} data-ready={ready} data-active={active} data-visual="london-photographic" data-window-phase={exploring ? "explore" : "approach"} data-gallery-open={expanded}>
    <div className={styles.stage}>
      <header className={styles.topbar}>
        <button type="button" className={styles.wordmark} onClick={() => go("window")} aria-label={S.zurueck}>{S.marke}</button>
        <nav className={styles.roomnav} aria-label={S.raeume}>{ROOM_IDS.map((id, i) => <button key={id} type="button" onClick={() => go(id)} aria-current={room === id ? "step" : undefined}><span>{String(i + 1).padStart(2, "0")}</span>{S.raum[id]}</button>)}</nav>
        <a className={styles.skip} href="#hebel">{S.ueberspringen}<MoveUpRight size={14} /></a>
      </header>

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

      {room === "window" && !travelling && exploring && <>
        <button type="button" className={styles.entryCue} onClick={onDoor}>{flat ? <ArrowRight size={18} aria-hidden="true" /> : <ScrollCue />}<span>{S.eintreten}</span></button>
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
          {service === null ? <h2>{S.wieHelfen}</h2> : <>
            <p>{S.fragen[service].answer}</p>
            {service === 2 && (flat ? <button type="button" onClick={() => go("gallery")}>{S.arbeitenAnsehen}<ArrowRight size={14} /></button> : <span className={styles.scrollInvitation}>{S.weiterScrollen}<ArrowDown size={14} /></span>)}
          </>}
        </article>
        <div className={styles.questionRow} aria-label={S.fragenAnGastgeber}>{S.fragen.map((q, i) => <button key={q.question} type="button" aria-pressed={service === i} aria-controls="studio-answer" onClick={() => chooseQuestion(i)}><span>{q.question}</span><MoveUpRight size={16} aria-hidden="true" /></button>)}</div>
      </div>}

      {room === "gallery" && !travelling && (galleryVariant === "salon" ? <StudioGallery lang={lang} reduced={reduced || flat} onBack={() => go("reception")} onConsult={openConsultation} paused={consultation} /> : <div className={styles.gallery}>
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
        <div className={styles.galleryFooter}><button type="button" onClick={() => go("reception")}><ArrowLeft size={15} />{S.raum.reception}</button><a href="#analyse">{S.projektBesprechen}<ArrowRight size={16} /></a></div>
      </div>)}

      <footer className={styles.bottomBar}><span>{unavailable ? S.hinweis.unavailable : flat ? S.hinweis.flat : room === "window" ? exploring ? S.hinweis.entdecken : S.hinweis.ersterEindruck : room === "reception" && service !== 2 ? S.hinweis.wasWissen : galleryVariant === "salon" && room === "gallery" ? "" : S.hinweis.weitergehen}</span>{!unavailable && <button type="button" onClick={switchMode}>{quiet ? S.mitFahrt : S.ohneFahrt}</button>}</footer>
    </div>
    {consultation && <StudioConsultation lang={lang} onClose={closeConsultation} onBrowse={browseOn} />}
  </section>;
}
