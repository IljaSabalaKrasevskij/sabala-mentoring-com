"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Coffee, MoveUpRight, Scan } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CASE_STUDIES } from "@/lib/case-studies";
import { type Lang } from "./studio-texte";
import { ART_SIZE, artworkMatrix, cssMatrix, galleryCamera, GALLERY_COPY, GALLERY_STATIONS, nextStation, SALON } from "./studio-gallery";
import styles from "./StudioGallery.module.css";

const WORKS=GALLERY_STATIONS.map(station=>CASE_STUDIES.find(project=>project.id===station.id)!);

export default function StudioGallery({ lang, reduced, onBack, onConsult, paused = false }: { lang: Lang; reduced: boolean; onBack: () => void; onConsult: () => void; paused?: boolean }) {
  const T=GALLERY_COPY[lang];
  const root=useRef<HTMLDivElement>(null);
  const world=useRef<HTMLDivElement>(null);
  const thumbnails=useRef<HTMLDivElement>(null);
  const current=useRef<number[] | null>(null);
  const [size,setSize]=useState({width:0,height:0});
  const [index,setIndex]=useState<number | null>(0);
  const [departure,setDeparture]=useState<"overview" | null>(null);
  const project=index===null?null:WORKS[index];
  const step=useCallback((delta:number)=>setIndex(value=>nextStation(value,delta)),[]);

  useEffect(()=>{
    const strip=thumbnails.current;
    if(index===null || !strip) return;
    const selected=strip.children[index] as HTMLElement | undefined;
    if(!selected) return;
    const stripRect=strip.getBoundingClientRect();
    const selectedRect=selected.getBoundingClientRect();
    // Scroll only the thumbnail strip; native focus scrolling can move the whole room.
    strip.scrollTo({left:strip.scrollLeft+selectedRect.left-stripRect.left-(strip.clientWidth-selectedRect.width)/2,behavior:reduced?"instant":"smooth"});
  },[index,reduced]);

  useEffect(()=>{
    if(!root.current) return;
    const observer=new ResizeObserver(([entry])=>setSize({width:entry.contentRect.width,height:entry.contentRect.height}));
    observer.observe(root.current);
    return ()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    const node=world.current, stage=root.current;
    if(!node || !stage || !size.width) return;
    const target=galleryCamera(departure === "overview" || paused ? null : index,size.width,size.height);
    // Continue from the film's wide view straight to RFQ to PO on arrival.
    const from=current.current ?? galleryCamera(null,size.width,size.height);
    const duration=reduced || paused ? 0 : departure === "overview" ? 850 : 1300;
    const started=performance.now();
    let frame=0;
    const paint=(now:number)=>{
      const t=duration?Math.min(1,(now-started)/duration):1;
      const eased=t*t*(3-2*t);
      const matrix=from.map((value,i)=>value+(target[i]-value)*eased);
      current.current=matrix;
      node.style.transform=cssMatrix(matrix);
      node.style.visibility="visible";
      stage.dataset.moving=String(t<1);
      if(t<1) frame=requestAnimationFrame(paint);
    };
    frame=requestAnimationFrame(paint);
    return ()=>cancelAnimationFrame(frame);
  },[index,size,reduced,departure,paused]);

  useEffect(() => {
    if (!departure) return;
    const timer = window.setTimeout(() => {
      onConsult(); setDeparture(null);
    }, reduced ? 0 : 850);
    return () => window.clearTimeout(timer);
  }, [departure, onConsult, reduced]);

  useEffect(()=>{
    const keydown=(event:KeyboardEvent)=>{
      if(paused || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if(event.target instanceof HTMLElement && event.target.closest("input,textarea,select,[contenteditable=true]")) return;
      const rect=root.current?.getBoundingClientRect();
      if(!rect || rect.top>=window.innerHeight || rect.bottom<=0) return;
      if(departure) { if(event.key==="Escape") { event.preventDefault(); setDeparture(null); } return; }
      if(event.key==="ArrowLeft" || event.key==="ArrowRight") { event.preventDefault(); step(event.key==="ArrowRight"?1:-1); }
      if(event.key==="Escape") { event.preventDefault(); setIndex(null); }
    };
    window.addEventListener("keydown",keydown);
    return ()=>window.removeEventListener("keydown",keydown);
  },[step,paused,departure]);

  return <div ref={root} className={styles.gallery} data-gallery-version="salon" data-departure={departure ?? "none"} inert={paused} data-work={project?.id ?? "overview"} data-side={index===null?"left":GALLERY_STATIONS[index].wall}>
    <link rel="preload" as="image" href="/webseiten/studio-consultation-v1/consultation.webp" />
    <link rel="preload" as="image" href="/webseiten/studio-consultation-v1/gallery-coffee.webp" />
    <div className={styles.backdrop} aria-hidden="true" />
    <div className={styles.viewport}>
      <div ref={world} className={styles.world}>
        <Image src="/webseiten/studio-salon-v2/salon-clean.webp" alt={lang==="de"?"Londoner Galeriesaal mit sechs beleuchteten Werken.":"London gallery with six illuminated works."} fill sizes="100vw" unoptimized priority />
        <Image src={SALON.image} alt="" fill sizes="100vw" unoptimized className={styles.hostPlate} style={{ opacity: index === null || departure || paused ? 1 : 0 }} />
        {GALLERY_STATIONS.map((station,i)=><button type="button" key={station.id} className={styles.artwork} style={{width:ART_SIZE[0],height:ART_SIZE[1],transform:cssMatrix(artworkMatrix(station.corners))}} aria-label={`${WORKS[i].title[lang].split(":")[0]}: ${T.details}`} aria-pressed={index===i} tabIndex={-1} onClick={()=>setIndex(i)}>
          <Image src={WORKS[i].image!} alt="" fill sizes="(max-width: 700px) 90vw, 700px" loading="eager" className={styles.artImage} />
          <span className={styles.glazing} aria-hidden="true" />
        </button>)}
        {/* The photograph supplies the foreground silhouette so his hand stays in front of the work. */}
        <div className={styles.host} style={{ opacity: index === null || departure || paused ? 1 : 0 }} aria-hidden="true" />
      </div>
    </div>
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.heading}><button type="button" aria-label={T.back} onClick={onBack} disabled={!!departure}><ArrowLeft size={15} /></button><h2>{T.title}</h2><button type="button" onClick={()=>setIndex(null)} aria-pressed={index===null}><Scan size={14} />{T.overview}</button></div>
    {index===null ? <div className={styles.welcome}><p>{T.welcome}</p><span>{T.invitation}</span></div> : <article className={styles.label} aria-live="polite" aria-atomic="true" data-lenis-prevent tabIndex={0}>
      <span className={styles.number}>{String(index+1).padStart(2,"0")} / {String(WORKS.length).padStart(2,"0")}</span>
      <p className={styles.industry}>{project!.industry[lang]}</p>
      <h3>{project!.title[lang].split(":")[0]}</h3>
      <p className={styles.note}>{T.notes[index]}</p>
      <a href={project!.url ?? "/case-studies"} target="_blank" rel="noopener noreferrer">{project!.url?T.live:T.caseStudy}<MoveUpRight size={14} /></a>
    </article>}
    <nav className={styles.selection} aria-label={T.select}>
      <button className={styles.step} type="button" aria-label={T.previous} onClick={()=>step(-1)}><ChevronLeft size={20} /></button>
      <div ref={thumbnails} className={styles.works}>{WORKS.map((work,i)=><button type="button" key={work.id} aria-label={work.title[lang].split(":")[0]} aria-pressed={index===i} onClick={()=>setIndex(i)}><Image src={work.image!} alt="" width={140} height={79} sizes="100px" /><span>{work.title[lang].split(":")[0]}</span></button>)}</div>
      <button className={styles.step} type="button" aria-label={T.next} onClick={()=>step(1)}><ChevronRight size={20} /></button>
    </nav>
    <p className={styles.keyHint}>{T.hint}</p>
    <div className={styles.footer}><a href="#hebel">{lang === "de" ? "Weiterstöbern" : "Keep exploring"}<ArrowRight size={14} /></a><button type="button" className={styles.consult} data-open-consultation aria-haspopup="dialog" disabled={!!departure} onClick={() => reduced ? onConsult() : setDeparture("overview")}><Coffee size={18} aria-hidden /><span>{lang === "de" ? "Auf einen Kaffee?" : "Join me for a coffee?"}<small>{lang === "de" ? "Lass uns über dein Projekt sprechen." : "Let’s talk about your project."}</small></span><ArrowRight size={17} aria-hidden /></button></div>
    {departure && <p className={styles.departureHint} role="status">{lang === "de" ? "Darf ich dich auf einen Kaffee einladen?" : "May I invite you for a coffee?"}</p>}
  </div>;
}
