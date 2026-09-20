"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Music2, Volume2 } from "lucide-react";
import type { Lang } from "./studio-texte";
import styles from "./StudioSound.module.css";

const TRACK = "/webseiten/studio-audio/mayfair-at-dusk-v1.mp3";
type Status = "off" | "loading" | "playing" | "paused" | "error";
type Sound = { enabled: boolean; status: Status; toggle: () => void; setQuiet: (quiet: boolean) => void };
const SoundContext = createContext<Sound | null>(null);

/** One recording for the whole visit, including the consultation's native dialog. */
export function StudioSoundProvider({ children }: { children: ReactNode }) {
  const player = useRef<HTMLAudioElement>(null);
  const graph = useRef<{ context: AudioContext; gain: GainNode } | null>(null);
  const wanted = useRef(false);
  const quiet = useRef(false);
  const operation = useRef(0);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<Status>("off");

  const level = useCallback((value: number, seconds = 0.8) => {
    const bus = graph.current;
    if (bus) {
      const now = bus.context.currentTime;
      bus.gain.gain.cancelScheduledValues(now);
      bus.gain.gain.setTargetAtTime(value, now, seconds / 3);
    } else if (player.current) player.current.volume = value;
  }, []);

  const start = useCallback(() => {
    const node = player.current;
    if (!node || !wanted.current || document.hidden) return;
    const request = ++operation.current;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    setStatus("loading");
    if (!node.getAttribute("src")) node.src = TRACK;
    if (node.error) node.load();
    // GainNode also gives iOS a quiet mix; its media-element volume is read-only.
    if (!graph.current && typeof AudioContext !== "undefined") {
      try {
        const context = new AudioContext();
        const gain = context.createGain();
        gain.gain.value = 0;
        context.createMediaElementSource(node).connect(gain).connect(context.destination);
        graph.current = { context, gain };
      } catch {
        wanted.current = false;
        setEnabled(false);
        setStatus("error");
        return;
      }
    }
    level(0);
    // Both calls start in the click gesture, before awaiting either promise.
    Promise.all([graph.current?.context.resume(), node.play()]).then(() => {
      if (request !== operation.current) return;
      if (!wanted.current || document.hidden) { node.pause(); return; }
      level(quiet.current ? 0.16 : 0.3, 1.2);
      setStatus("playing");
    }).catch(() => {
      if (request !== operation.current) return;
      node.pause();
      wanted.current = false;
      setEnabled(false);
      setStatus("error");
    });
  }, [level]);

  const toggle = useCallback(() => {
    wanted.current = !wanted.current;
    setEnabled(wanted.current);
    if (wanted.current) start();
    else {
      ++operation.current;
      level(0, 0.12);
      setStatus("off");
      pauseTimer.current = setTimeout(() => { if (!wanted.current) player.current?.pause(); }, 180);
    }
  }, [level, start]);

  const setQuiet = useCallback((value: boolean) => {
    quiet.current = value;
    if (wanted.current) level(value ? 0.16 : 0.3, 1.4);
  }, [level]);

  useEffect(() => {
    const node = player.current;
    const visibility = () => {
      if (document.hidden) {
        ++operation.current;
        node?.pause();
        if (wanted.current) setStatus("paused");
      } else if (wanted.current) start();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      // Invalidate the latest pending play request, not the token from effect setup.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ++operation.current;
      wanted.current = false;
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      document.removeEventListener("visibilitychange", visibility);
      node?.pause();
      if (graph.current) void graph.current.context.close();
      graph.current = null;
    };
  }, [start]);

  return <SoundContext.Provider value={{ enabled, status, toggle, setQuiet }}>
    {/* No src before an explicit click: no background download or autoplay. */}
    <audio ref={player} loop preload="none" data-studio-audio aria-hidden="true" onWaiting={() => { if (wanted.current) setStatus("loading"); }} onPlaying={() => { if (wanted.current) setStatus("playing"); }} onError={() => {
      wanted.current = false; ++operation.current; setEnabled(false); setStatus("error");
    }} />
    {children}
  </SoundContext.Provider>;
}

export function useStudioSound() { return useContext(SoundContext); }

export function StudioSoundControl({ lang, inRoom = false, inline = false }: { lang: Lang; inRoom?: boolean; inline?: boolean }) {
  const sound = useStudioSound();
  if (!sound) return null;
  const english = lang === "en";
  const label = sound.enabled ? (english ? "Turn music off" : "Musik ausschalten") : (english ? "Turn music on" : "Musik einschalten");
  const text = sound.status === "loading" ? (english ? "Loading…" : "Lädt…") : sound.enabled ? (english ? "Music on" : "Musik an") : (english ? "Music" : "Musik");
  return <div className={`${styles.control} ${inline ? styles.inline : inRoom ? styles.inRoom : styles.floating}`} data-studio-sound={inline || inRoom ? "room" : "page"}>
    <button type="button" className={styles.button} onClick={sound.toggle} aria-label={label} aria-pressed={sound.enabled} title={label} data-playing={sound.status === "playing"}>
      {sound.enabled ? <Volume2 size={16} aria-hidden /> : <Music2 size={16} aria-hidden />}
      <span className={styles.label}>{text}</span>
      <span className={styles.bars} aria-hidden><i /><i /><i /></span>
    </button>
    <span role="status" className={sound.status === "error" ? styles.error : styles.srOnly}>{sound.status === "error" ? (english ? "Could not start. Please try again." : "Start nicht möglich. Bitte erneut versuchen.") : ""}</span>
  </div>;
}
