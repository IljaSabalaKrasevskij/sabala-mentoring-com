"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { clamp, windowView, EXHIBITS, type HoverAnchor, type Room } from "./studio-journey";
import { cinemaShot, filmAt, LONDON_ASSETS, LONDON_FILMS, stillShot, WINDOW_OBJECTS } from "./studio-cinema";
import styles from "./StudioCinema.module.css";
import { DISPLAY_DETAILS } from "./studio-concierge";

type Props = {
  progress: RefObject<number>; distance: RefObject<number>; exploring: boolean; room: Room; flat: boolean; reduced: boolean;
  selected: number | null; interactive: boolean;
  onSelect: (index: number) => void;
  onHover: (index: number | null, anchor?: HoverAnchor) => void;
  onDoor: () => void; onReady: () => void; onFailure: () => void;
  onInvalidate: (callback: (() => void) | null) => void;
  project: { image: string; title: string; url: string };
};

export default function StudioCinema({ progress, distance, exploring, room, flat, reduced, selected, interactive, onSelect, onHover, onDoor, onReady, onFailure, onInvalidate, project }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const plates = useRef<(HTMLDivElement | null)[]>([]);
  const door = useRef<HTMLSpanElement>(null);
  const aperture = useRef<HTMLSpanElement>(null);
  const films = useRef<(HTMLVideoElement | null)[]>([]);
  const refresh = useRef<(() => void) | null>(null);
  const failedFilms = useRef(new Set<number>());
  const pointer = useRef(0);
  const targetPointer = useRef(0);
  const animation = useRef<number | null>(null);
  const labels = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const paint = () => {
      pointer.current += (targetPointer.current - pointer.current) * .14;
      const mobile = (root.current?.clientWidth ?? 1280) < 651;
      const view = windowView(flat ? 1 : distance.current, flat ? 0 : progress.current, pointer.current, reduced, mobile);
      const shot = cinemaShot(progress.current, reduced);
      const still = stillShot(room);
      (["window", "reception", "gallery"] as const).forEach((key, i) => {
        const plate = plates.current[i];
        if (!plate) return;
        const s = shot[key];
        plate.style.opacity = String(flat ? still[key] : s.opacity);
        plate.style.visibility = (flat ? still[key] : s.opacity) < .001 ? "hidden" : "visible";
        plate.style.transform = key === "window"
          ? `translate3d(${(flat ? 0 : s.x) + view.x}%,${view.y}%,0) scale(${(flat ? 1 : s.scale) * view.scale})`
          : flat ? "none" : `translate3d(${s.x}%,0,0) scale(${s.scale})`;
      });
      if (door.current) door.current.style.transform = `perspective(900px) rotateY(${-shot.door * 82}deg)`;
      if (aperture.current) aperture.current.style.opacity = flat ? "0" : String(Math.min(1, shot.door * 12));
      if (labels.current) labels.current.style.opacity = exploring && room === "window" ? String(view.strength) : "0";
      const moment = filmAt(progress.current);
      films.current.forEach((video, index) => {
        if (!video) return;
        const visible = !flat && !reduced && moment.active && moment.index === index && !failedFilms.current.has(index);
        video.style.transform = index === 0 ? `translate3d(${view.x}%,${view.y}%,0) scale(${view.scale})` : "none";
        video.style.opacity = visible && video.readyState >= 2 ? String(moment.opacity) : "0";
        if (!visible || !Number.isFinite(video.duration)) return;
        const time = Math.min(video.duration - .04, moment.time * video.duration);
        // Only one seek in flight; seeked catches up even after scrolling stops.
        if (!video.seeking && Math.abs(video.currentTime - time) > .035) video.currentTime = time;
      });
      if (Math.abs(targetPointer.current - pointer.current) > .001 && animation.current === null) {
        animation.current = requestAnimationFrame(() => { animation.current = null; paint(); });
      }
    };
    refresh.current = paint;
    onInvalidate(paint);
    paint();
    return () => { refresh.current = null; onInvalidate(null); if (animation.current !== null) cancelAnimationFrame(animation.current); animation.current = null; };
  }, [progress, distance, exploring, room, flat, reduced, onInvalidate]);

  const focusObject = (index: number, element: HTMLElement) => {
    targetPointer.current = pointer.current;
    const bounds = element.getBoundingClientRect();
    const scene = root.current?.getBoundingClientRect();
    if (!scene) return;
    onHover(index, { x: (bounds.left + bounds.width / 2 - scene.left) / scene.width * 100, y: (bounds.top - scene.top) / scene.height * 100 });
  };

  return <div ref={root} className={styles.cinema} data-room={room} data-flat={flat} onPointerMove={event => {
    if (event.pointerType !== "mouse" || !exploring || !interactive || room !== "window" || reduced || selected !== null) return;
    const rect = event.currentTarget.getBoundingClientRect();
    targetPointer.current = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
    refresh.current?.();
  }} onPointerLeave={() => { targetPointer.current = 0; refresh.current?.(); }}>
    <div className={styles.plane}>
      {(["window", "reception", "gallery"] as const).map((key, i) => <div key={key} ref={node => { plates.current[i] = node; }} className={styles.plate} style={{ opacity: key === room ? 1 : 0 }}>
        <Image src={LONDON_ASSETS[key]} alt={key === "window" ? "Sabala Studios: ein Londoner Laden mit schwarzer Fassade, Messing und sechs Exponaten" : key === "reception" ? "Der Sabala-Adler hinter dem Empfangstresen aus Walnuss und schwarzem Marmor" : "Der Sabala-Adler präsentiert ausgewählte Arbeiten im Londoner Atelier"} fill sizes="(max-width: 650px) 160vw, 100vw" unoptimized onLoad={key === "window" ? onReady : undefined} onError={onFailure} loading={key === "window" ? "eager" : "lazy"} className={styles.photograph} />
        {key === "window" && <>
          <span ref={aperture} className={styles.aperture} aria-hidden="true"><span className={styles.inside} /><span ref={door} className={styles.doorLeaf} /></span>
          {WINDOW_OBJECTS.map((object, index) => <button key={EXHIBITS[index].id} className={styles.object} style={{ left: `${object.x}%`, top: `${object.y}%`, width: `${object.w}%`, height: `${object.h}%`, "--object-shape": object.shape, "--crop-size": `${10000 / object.w}% ${10000 / object.h}%`, "--crop-position": `${object.x / (100 - object.w) * 100}% ${object.y / (100 - object.h) * 100}%` } as CSSProperties} type="button" aria-label={`${EXHIBITS[index].object}: ${EXHIBITS[index].label}`} aria-pressed={selected === index} tabIndex={-1} disabled={room !== "window" || !interactive} onPointerEnter={event => focusObject(index, event.currentTarget)} onPointerLeave={() => onHover(null)} onFocus={event => focusObject(index, event.currentTarget)} onBlur={() => onHover(null)} onClick={event => { focusObject(index, event.currentTarget); onSelect(index); }}><span aria-hidden="true" /></button>)}
          <div ref={labels} className={styles.labels}>
            {WINDOW_OBJECTS.map((object, index) => <button key={EXHIBITS[index].id} className={styles.priceTag} type="button" style={{ left: `${object.x + object.w / 2}%`, top: `${[65.8, 61.8, 67.8, 61.8, 65.8, 66.8][index]}%` }} aria-label={`${EXHIBITS[index].label}: ${DISPLAY_DETAILS[index].price}`} aria-pressed={selected === index} disabled={!interactive || room !== "window"} tabIndex={interactive && room === "window" ? 0 : -1} onPointerEnter={event => focusObject(index, event.currentTarget)} onPointerLeave={() => onHover(null)} onFocus={event => focusObject(index, event.currentTarget)} onBlur={() => onHover(null)} onClick={event => { focusObject(index, event.currentTarget); onSelect(index); }}><span>{EXHIBITS[index].label}</span><strong>{DISPLAY_DETAILS[index].price}</strong></button>)}
          </div>
          <button className={styles.doorTarget} aria-label="Die Ladentür öffnen und eintreten" type="button" onClick={onDoor} tabIndex={room === "window" && interactive ? 0 : -1} disabled={room !== "window" || !interactive} />
        </>}
        {key === "gallery" && <a className={styles.work} href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: Arbeit ansehen`} tabIndex={room === "gallery" && interactive ? 0 : -1} style={{ pointerEvents: room === "gallery" && interactive ? "auto" : "none" }}><Image key={project.image} src={project.image} alt={project.title} fill sizes="(max-width: 650px) 60vw, 40vw" className={styles.workImage} /></a>}
      </div>)}
      {!flat && !reduced && LONDON_FILMS.map((src, i) => <video key={src} ref={node => { films.current[i] = node; }} className={styles.film} src={src} muted playsInline preload="auto" disablePictureInPicture aria-hidden="true" tabIndex={-1} onLoadedData={() => refresh.current?.()} onSeeked={() => refresh.current?.()} onError={() => { failedFilms.current.add(i); refresh.current?.(); }} />)}
    </div>
  </div>;
}
