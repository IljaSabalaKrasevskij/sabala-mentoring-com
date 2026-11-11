"use client";

import { useEffect, useRef } from "react";
import Scheibe, { Pfeil } from "./Scheibe";
import { KOPF_SATZ, KOPF_ZEILE_1, KOPF_ZEILE_2, SCHICHTEN } from "./daten";

/* ─────────────────────────────────────────────────────────────────────────
   SchichtenKopf: der Kopf der Ankündigungsseite als Scroll-Film aus reinem Code.

   Sechs Scheiben schweben als Turm im Raum (sechs Schichten einer Webseite, eine je Kurswoche).
   Beim Scrollen legen sie sich ab, werden ausgeteilt und landen als sechs Kacheln auf einer kleinen
   Webseite. Die Kamera fährt hinein, und die kleine Seite wird ohne Schnitt zum echten Abschnitt
   „Sechs Schichten“ (id="schichten"), der schon unter dem letzten Bild der Bühne liegt.

   Wie das ohne Sprung gelingt:
   - Die kleine Seite ist eine verkleinerte Kopie des echten Abschnitts.
   - Das Ziel der Kamera wird in jedem Bild aus der Lage des echten Abschnitts gerechnet.
   - Alle Maße des Turms sind ganze Pixel. Krumme Lagen rundet der Browser, der Zoom macht daraus einen Sprung.

   Ohne JavaScript, bei „Bewegung reduzieren“ oder wenn der Kopf nicht in ein Fenster passt,
   steht eine ruhige Fassung da: derselbe Turm, kein Film, die Seite scrollt normal.
   ───────────────────────────────────────────────────────────────────────── */

/* Läuft, bevor der Browser das erste Bild zeichnet: Mit JavaScript startet der Kopf gleich im Film-Aufbau, nichts springt.
   Fester Text aus dieser Datei, keine Eingabe von außen. */
const FRUEH = `(function(k){k.dataset.js="";if(!matchMedia("(prefers-reduced-motion: reduce)").matches)k.dataset.modus="film"})(document.currentScript.parentElement)`;

const ADRESSE = "deine-domain.de";
const NEIG_X = 56, NEIG_Z = -34; // Blick auf den Turm, in Grad
const LUFT = 0.16, RUH = 0.012; // Abstand der Scheiben: schwebend (mindestens) und abgelegt, als Anteil der Scheibenbreite

type Platz = { dx: number; dy: number; s: number };
type Geo = { y0: number; plaetze: Platz[]; cx: number; cy: number; ox: number; oy: number; G: number; F: number; px: number; py: number; ruheY: number; ruheS: number };

const klemm = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const weich = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const aus = (t: number) => 1 - Math.pow(1 - t, 3);

export default function SchichtenKopf() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const kopf = ref.current;
    const sektion = document.getElementById("schichten");
    if (!kopf || !sektion) return;

    const $ = (s: string, w: ParentNode = kopf) => w.querySelector<HTMLElement>(s)!;
    const $$ = (s: string, w: ParentNode = kopf) => [...w.querySelectorAll<HTMLElement>(s)];
    const spur = $(".wk-spur"), buehne = $(".wk-buehne"), text = $(".wk-text"), mass = $(".wk-mass");
    const szene = $(".wk-szene"), kamera = $(".wk-kamera"), raum = $(".wk-raum"), stapel = $(".wk-stapel"), guck = $(".wk-guck"), adresse = $(".wk-adresse b");
    const scheiben = $$(".wk-stapel > .wk-scheibe"), marken = $$(".wk-marke:not(.wk-summe)"), schlussMarke = $(".wk-marke.wk-summe");
    const punkte = $$(".wk-punkte i"), unter = $(".wk-unter p"), abspielen = $(".wk-kopfknopf");
    const kacheln = $$(".wk-kachel", sektion);
    const ruhe = matchMedia("(prefers-reduced-motion: reduce)");
    const schmal = matchMedia("(max-width: 899px)");
    const zeiger = matchMedia("(hover: hover) and (pointer: fine)");
    kopf.dataset.js = "";

    /* Nur schreiben, was sich geändert hat. Im Ruhezustand bleibt der Browser so fast ohne Arbeit. */
    const geschrieben = new WeakMap<HTMLElement, Record<string, string>>();
    const setze = (el: HTMLElement, name: string, wert: string) => {
      let alt = geschrieben.get(el);
      if (!alt) geschrieben.set(el, (alt = {}));
      if (alt[name] === wert) return;
      alt[name] = wert;
      if (name === "transform") el.style.transform = wert;
      else el.style.setProperty(name, wert);
    };

    /* Das Blatt zeigt eine verkleinerte Kopie des nächsten Abschnitts. Am Ende der Fahrt liegt sie deckungsgleich auf dem echten.
       Als Funktion, damit die Kopie nach einem Klick auf eine Kachel wieder stimmt. */
    const klon = document.createElement("section");
    klon.className = "wk-schichten wk-klon";
    klon.inert = true;
    guck.append(klon);
    const spiegeln = () => {
      klon.replaceChildren(...[...sektion.childNodes].map((n) => n.cloneNode(true)));
      klon.querySelectorAll("[id]").forEach((e) => e.removeAttribute("id"));
    };
    spiegeln();

    let svh = 0, hs = 0, bw = 0, film = false, platzRechts = 0, luftAnteil = LUFT;
    let geo: Geo | null = null;
    let markenBreite: number[] = [];
    let p = 0, ziel = 0, mx = 0, my = 0, mxs = 0, mys = 0, sichtbar = true, lauf = 0, letzterText = "";
    const start = performance.now();
    let letzte = start;

    /* Einmal messen (Laden, Fenstergröße, Schriften), nie pro Scroll-Schritt. */
    function messen() {
      svh = mass.offsetHeight || innerHeight;
      kopf!.toggleAttribute("data-hoch", schmal.matches && svh >= 720);
      /* Alle Maße des Turms sind ganze Pixel (siehe oben). */
      szene.style.removeProperty("--wk-bw");
      stapel.style.left = stapel.style.top = "";
      bw = Math.max(16, Math.round(parseFloat(getComputedStyle(stapel).width) / 16) * 16);
      szene.style.setProperty("--wk-bw", bw + "px");
      /* Abstand der Scheiben: so weit, wie die Höhe hergibt. Bei schmalen Fenstern ist der Turm klein,
         mit mehr Luft bleiben die Marken daneben lesbar getrennt. 76svh und 860: Höhe der Szene im CSS. */
      luftAnteil = schmal.matches ? LUFT : klemm((Math.min(0.76 * svh, 860) * 0.94 - 0.602 * bw) / (5 * 0.829 * bw), LUFT, 0.22);
      const turm = bw * (0.602 + 5 * luftAnteil * 0.829); // Höhe des Turms am Bildschirm
      const passt = schmal.matches ? 76 + turm + text.offsetHeight + 12 <= svh : Math.max(text.offsetHeight, turm) <= svh - 142;
      if (!passt && !schmal.matches) luftAnteil = 0.2; // flaches Fenster: die ruhige Fassung darf nach unten wachsen
      film = passt && !ruhe.matches;
      kopf!.dataset.modus = film ? "film" : "ruhig";

      const lage = getComputedStyle(stapel);
      const cx = Math.round(parseFloat(lage.left)), cy = Math.round(parseFloat(lage.top)); // Mitte des Turms
      stapel.style.left = cx + "px";
      stapel.style.top = cy + "px";
      raum.style.perspectiveOrigin = kamera.style.transformOrigin = `${cx}px ${cy}px`;
      const br = buehne.getBoundingClientRect(), sr = szene.getBoundingClientRect();
      const ox = Math.round(sr.left - br.left), oy = Math.round(sr.top - br.top); // die Kamera sitzt auf ganzen Pixeln in der Bühne
      const rx0 = ox - (sr.left - br.left), ry0 = oy - (sr.top - br.top);
      kamera.style.inset = `${ry0}px ${-rx0}px ${-ry0}px ${rx0}px`;
      /* Marken dürfen nie über den Rand der Bühne hinaus. */
      platzRechts = br.right - sr.left - 14;
      markenBreite = [...marken, schlussMarke].map((m) => m.offsetWidth);
      if (!film) { geo = null; return; }

      hs = buehne.offsetHeight;
      const W = sektion!.getBoundingClientRect().width, q = bw / W, chrom = Math.round(bw * 0.07);
      const bh = chrom + Math.ceil(q * hs * 1.14), by = Math.round((bw * 0.625 - bh) / 2); // etwas länger als das Fenster: die runden Ecken unten bleiben draußen
      stapel.style.setProperty("--wk-chrom", chrom + "px");
      stapel.style.setProperty("--wk-by", by + "px");
      stapel.style.setProperty("--wk-bh", bh + "px");
      klon.style.width = W + "px";
      klon.style.transform = `scale(${q})`;

      /* Wohin jede Scheibe fliegt: auf ihre Kachel im echten Abschnitt, umgerechnet ins Maß des Blatts. */
      const y0 = by + chrom - bw * 0.3125;
      const zr = sektion!.getBoundingClientRect();
      const plaetze = kacheln.map((k) => {
        const r = k.querySelector(".wk-scheibe")!.getBoundingClientRect();
        return { dx: -bw / 2 + q * (r.left - zr.left + r.width / 2), dy: y0 + q * (r.top - zr.top + r.height / 2), s: r.width / W };
      });
      const hoch = Math.min(sr.height, svh);
      geo = {
        y0, plaetze, cx, cy, ox, oy,
        G: Math.min((0.94 * sr.width) / bw, ((schmal.matches ? 0.66 : 0.8) * hoch) / bh), // das Blatt zeigt sich in dieser Größe
        F: W / bw, // das Blatt füllt das Fenster
        px: sr.width / 2 - cx,
        py: (schmal.matches ? svh * 0.46 : sr.height / 2) - cy,
        ruheY: schmal.matches ? svh * 0.46 - cy : 0,
        ruheS: schmal.matches ? Math.min(1.35, (0.9 * W) / (bw * 1.18), (0.6 * svh) / turm) : 1,
      };
    }

    function zeichnen(jetzt: number) {
      const lin = (ab: number, dauer: number) => klemm((p - ab) / dauer);
      const still = ruhe.matches;
      const intro = film ? aus(klemm((jetzt - start) / 1500)) : 1;
      const ts = scheiben.map((_, k) => weich(lin(0.06 + k * 0.068, 0.08))); // jede Scheibe legt sich ab
      const cRoh = lin(0.55, 0.17), tC = weich(cRoh); // Turm dreht nach vorn, Scheiben verteilen sich
      const tD = lin(0.73, 0.09); // Adresse tippt
      const tE = weich(lin(0.84, 0.125)); // Kamera fährt hinein
      const luft = bw * luftAnteil * (0.25 + 0.75 * intro), ruh = bw * RUH;

      let aktuell = -1, summe = 0, hoechste = 0;
      scheiben.forEach((s, k) => {
        if (ts[k] > 0.1) aktuell = k;
        const platz = geo?.plaetze[k];
        const g = platz ? weich(klemm((cRoh - 0.05 * (5 - k)) / 0.72)) : 0; // die oberste fliegt zuerst, wie beim Austeilen
        const zTurm = k * (luft * (1 - ts[k]) + ruh * ts[k]) * (1 - tC);
        summe += zTurm;
        hoechste = Math.max(hoechste, zTurm);
        /* Im Flug hebt die Scheibe kurz ab. Am Ziel liegt sie einen Hauch über dem Blatt, damit nichts flimmert. */
        const z = zTurm + Math.sin(Math.PI * g) * bw * (0.1 + 0.02 * k) + (0.15 + 0.03 * k) * tC;
        setze(s, "transform", platz
          ? `translate3d(${(platz.dx * g).toFixed(2)}px,${(platz.dy * g).toFixed(2)}px,${z.toFixed(2)}px) scale(${(1 + (platz.s - 1) * g).toFixed(4)})`
          : `translateZ(${z.toFixed(2)}px)`);
        setze(s, "--wk-g", g.toFixed(3));
        setze(s, "--wk-an", Math.max(0, Math.sin(Math.PI * lin(0.05 + k * 0.068, 0.105)) * (1 - cRoh)).toFixed(3));
      });

      const rx = (NEIG_X + mys * 2.2) * (1 - tC);
      const rz = (NEIG_Z + mxs * 3.5 + (still ? 0 : Math.sin(jetzt / 5200) * 2)) * (1 - tC);
      const schweben = still ? 0 : Math.sin(jetzt / 1700) * bw * 0.012 * (1 - tC);
      /* Der Turm bleibt in der Mitte, auch während er zusammensinkt: halb nach Schwerpunkt, halb nach Ober- und Unterkante.
         So ragt die letzte schwebende Scheibe nicht aus dem Bild. */
      const senk = ((summe / scheiben.length + hoechste / 2) / 2) * Math.sin((rx * Math.PI) / 180) + schweben;
      setze(stapel, "--wk-rx", rx.toFixed(3) + "deg");
      setze(stapel, "--wk-rz", rz.toFixed(3) + "deg");
      setze(stapel, "--wk-senk", senk.toFixed(2) + "px");
      setze(stapel, "--wk-boden", ((1 - klemm(cRoh * 2.2)) * intro).toFixed(3));
      /* Sobald gescrollt wird, nie ganz 0: So zeichnet der Browser das Blatt vor und stockt nicht mitten im Film.
         Vor dem ersten Scrollen bleibt es bei 0, sonst hält der Browser die versteckte Kopie am Handy für den größten Inhalt der Seite (LCP). */
      setze(stapel, "--wk-blatt", (p > 0.02 ? Math.max(0.002, klemm((cRoh - 0.12) / 0.4)) : 0).toFixed(3));
      setze(stapel, "--wk-live", klemm((tD - 0.88) / 0.12).toFixed(3));

      const getippt = ADRESSE.slice(0, Math.round(ADRESSE.length * klemm((tD - 0.05) / 0.8)));
      if (getippt !== adresse.textContent) adresse.textContent = getippt;

      if (geo) {
        const anlauf = schmal.matches ? weich(lin(0.005, 0.06)) : 0; // Handy: Text weicht, Turm rückt in die Mitte
        const rS = 1 + (geo.ruheS - 1) * anlauf, rY = geo.ruheY * anlauf;
        let ks = rS + (geo.G - rS) * tC, kx = geo.px * tC, ky = rY + (geo.py - rY) * tC;
        if (tE > 0) {
          /* Ziel der Fahrt ist der echte Abschnitt, dort wo er in diesem Augenblick steht. So passt die Naht auf den Pixel. */
          const zr = sektion!.getBoundingClientRect(), br = buehne.getBoundingClientRect();
          const fx = zr.left - br.left - geo.ox - geo.cx + (geo.F * bw) / 2, fy = zr.top - br.top - geo.oy - geo.cy - geo.F * geo.y0;
          ks = geo.G * Math.pow(geo.F / geo.G, tE);
          kx = geo.px + (fx - geo.px) * tE;
          ky = geo.py + (fy - geo.py) * tE;
        }
        setze(kamera, "--wk-ks", ks.toFixed(5));
        setze(kamera, "--wk-kx", kx.toFixed(2) + "px");
        setze(kamera, "--wk-ky", ky.toFixed(2) + "px");
      }

      const textWeg = !film ? 0 : schmal.matches ? klemm(p / 0.045) : klemm(tE * 2.4);
      setze(buehne, "--wk-text", (1 - textWeg).toFixed(3));
      setze(buehne, "--wk-tw", (schmal.matches ? 0 : tE).toFixed(3));
      setze(buehne, "--wk-cue", (1 - klemm(p / 0.03)).toFixed(3));
      text.classList.toggle("wk-fort", textWeg >= 1);

      const beisammen = ts[5] >= 0.7; // alle sechs liegen aufeinander
      if (schmal.matches) {
        const zeile = aktuell < 0 ? ["Sechs Wochen", "Sechs Schichten"] : beisammen ? ["Sechs Schichten", "Eine Seite"] : ["Woche " + (aktuell + 1), SCHICHTEN[aktuell].name];
        const neu = zeile.join("|");
        if (neu !== letzterText) {
          unter.replaceChildren(Object.assign(document.createElement("small"), { textContent: zeile[0] }), zeile[1]);
          letzterText = neu;
        }
        punkte.forEach((el, k) => el.classList.toggle("wk-an", ts[k] > 0.5));
        setze(szene, "--wk-leg", (klemm((p - 0.035) / 0.03) * (1 - klemm(cRoh * 3))).toFixed(3));
      } else if (cRoh < 1) {
        /* Marken sitzen scharf neben ihrer Scheibe: Lage aus dem gezeichneten Umriss. */
        const sr = szene.getBoundingClientRect();
        scheiben.forEach((s, k) => {
          const b = s.getBoundingClientRect(), m = marken[k];
          setze(m, "transform", `translate(${Math.min(b.right - sr.left + 12, platzRechts - markenBreite[k]).toFixed(1)}px,${(b.top + b.height / 2 - sr.top).toFixed(1)}px) translateY(-50%)`);
          m.classList.toggle("wk-an", k === aktuell && ts[k] < 0.7);
          m.classList.toggle("wk-weg", intro < 0.9 || ts[k] >= 0.7 || cRoh > 0);
        });
        /* Liegt alles beisammen, sagt eine letzte Marke, was daraus geworden ist. */
        const oben = scheiben[5].getBoundingClientRect();
        setze(schlussMarke, "transform", `translate(${Math.min(oben.right - sr.left + 12, platzRechts - markenBreite[6]).toFixed(1)}px,${(oben.top + oben.height / 2 - sr.top).toFixed(1)}px) translateY(-50%)`);
        schlussMarke.classList.toggle("wk-weg", !beisammen || cRoh > 0);
      }

      /* Am Ende gibt die Bühne den echten Abschnitt frei, der schon genau darunter liegt. */
      const durch = film && ziel >= 0.999;
      if (durch !== buehne.classList.contains("wk-durch")) buehne.classList.toggle("wk-durch", durch);
    }

    function bild(jetzt: number) {
      lauf = 0;
      const dt = Math.min(64, Math.max(1, jetzt - letzte));
      letzte = jetzt;
      if (film) {
        const r = spur.getBoundingClientRect(), weg = r.height - hs;
        ziel = weg > 0 ? klemm(-r.top / weg) : 0;
      } else ziel = 0;
      p += (ziel - p) * (1 - Math.exp(-dt / 90)); // weiches Nachziehen, unabhängig von der Bildrate
      if (Math.abs(ziel - p) < 0.0003) p = ziel;
      mxs += (mx - mxs) * 0.07;
      mys += (my - mys) * 0.07;
      zeichnen(jetzt);
      const fertig = film && ziel >= 0.999 && p === ziel; // Bühne ist ausgeblendet, nichts mehr zu tun
      if (sichtbar && !ruhe.matches && !fertig) lauf = requestAnimationFrame(bild);
    }
    const an = () => { if (!lauf) lauf = requestAnimationFrame(bild); };
    const neu = () => { messen(); an(); };
    const zeigerBewegt = (e: PointerEvent) => {
      if (!zeiger.matches || e.pointerType !== "mouse") return;
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
      an();
    };
    const neuSpiegeln = () => { spiegeln(); neu(); };

    /* „Erst ansehen“ spielt den Film ab: Die Seite scrollt von selbst bis zum nächsten Abschnitt. Jede Eingabe hält an. */
    let spielt = false;
    const halt = () => { spielt = false; };
    const HALT = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    const spielen = (e: MouseEvent) => {
      if (!film) return; // ruhige Fassung: der Link springt wie gewohnt
      e.preventDefault();
      const r = spur.getBoundingClientRect(), strecke = r.height - hs, von = scrollY, bis = r.top + scrollY + strecke, t0 = performance.now();
      const dauer = 9000 * Math.max(0.3, (bis - von) / strecke);
      spielt = true;
      HALT.forEach((n) => addEventListener(n, halt, { once: true, passive: true }));
      const schritt = (jetzt: number) => {
        if (!spielt) return;
        const t = klemm((jetzt - t0) / dauer);
        scrollTo({ top: von + (bis - von) * (0.5 - 0.5 * Math.cos(Math.PI * t)), behavior: "instant" });
        if (t < 1) requestAnimationFrame(schritt);
        else spielt = false;
      };
      requestAnimationFrame(schritt);
    };

    addEventListener("scroll", an, { passive: true });
    addEventListener("resize", neu);
    addEventListener("load", neu);
    addEventListener("pointermove", zeigerBewegt, { passive: true });
    addEventListener("wk:schichten", neuSpiegeln);
    ruhe.addEventListener("change", neu);
    abspielen.addEventListener("click", spielen);
    document.fonts?.ready.then(neu);
    const waechter = new IntersectionObserver((e) => { sichtbar = e[0].isIntersecting; if (sichtbar) an(); });
    waechter.observe(kopf);

    /* Für das Prüfskript: Wo steht der Film gerade? */
    const fenster = window as unknown as { __wkStand?: () => object };
    fenster.__wkStand = () => {
      const r = spur.getBoundingClientRect();
      return { p, ziel, film, start: r.top + scrollY, weg: r.height - hs };
    };

    messen();
    bild(performance.now());

    return () => {
      cancelAnimationFrame(lauf);
      halt();
      waechter.disconnect();
      removeEventListener("scroll", an);
      removeEventListener("resize", neu);
      removeEventListener("load", neu);
      removeEventListener("pointermove", zeigerBewegt);
      removeEventListener("wk:schichten", neuSpiegeln);
      HALT.forEach((n) => removeEventListener(n, halt));
      ruhe.removeEventListener("change", neu);
      abspielen.removeEventListener("click", spielen);
      klon.remove();
      delete fenster.__wkStand;
    };
  }, []);

  return (
    <header ref={ref} className="wk-kopf" data-modus="ruhig" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: FRUEH }} />
      <div className="wk-mass" aria-hidden="true" />
      <div className="wk-spur">
        <div className="wk-buehne">
          <div className="wk-licht" aria-hidden="true" />

          <div className="wk-text">
            <p className="wk-zeile wk-steig">
              <span className="wk-punkt" aria-hidden="true" />
              <span>Neuer Live-Kurs · Warteliste offen</span>
            </p>
            <p className="wk-thema wk-steig" style={{ "--wk-d": ".05s" } as React.CSSProperties}>
              Webseiten bauen mit Claude Code
            </p>
            <h1>
              {KOPF_ZEILE_1} <span className="wk-takt2">{KOPF_ZEILE_2}</span>
            </h1>
            <p className="wk-satz wk-steig" style={{ "--wk-d": ".12s" } as React.CSSProperties}>
              {KOPF_SATZ}
            </p>
            <div className="wk-knoepfe wk-steig" style={{ "--wk-d": ".18s" } as React.CSSProperties}>
              <a className="wk-knopf wk-haupt" href="#warteliste">
                <span>Auf die Warteliste</span>
                <Pfeil />
              </a>
              <a className="wk-knopf wk-zweit wk-kopfknopf" href="#schichten">
                <span>Erst ansehen</span>
              </a>
            </div>
            <p className="wk-vermerk wk-steig" style={{ "--wk-d": ".24s" } as React.CSSProperties}>
              Gebaut mit Claude Code. Alles, was du siehst, ist Code.
            </p>
          </div>

          <div className="wk-szene">
            <div className="wk-kamera">
              <div className="wk-raum">
                <div className="wk-stapel" aria-hidden="true">
                  <div className="wk-boden" />
                  <div className="wk-blatt">
                    <div className="wk-chrom">
                      <i />
                      <i />
                      <i />
                      <div className="wk-adresse">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#D4AE5A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="11" width="14" height="9" rx="2" />
                          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                        </svg>
                        <b />
                        <u />
                      </div>
                      <span className="wk-live">live</span>
                    </div>
                    <div className="wk-guck" />
                  </div>
                  {SCHICHTEN.map((_, k) => (
                    <Scheibe key={k} nr={k + 1} style={{ "--wk-k": k } as React.CSSProperties} />
                  ))}
                </div>
              </div>
            </div>

            <div className="wk-marken" aria-hidden="true">
              {SCHICHTEN.map((s, k) => (
                <div key={s.name} className="wk-marke wk-weg">
                  <div>
                    <small>Woche {k + 1}</small>
                    <span>{s.name}</span>
                  </div>
                </div>
              ))}
              <div className="wk-marke wk-summe wk-an wk-weg">
                <div>
                  <small>Sechs Schichten</small>
                  <span>Eine Seite</span>
                </div>
              </div>
            </div>

            <div className="wk-unter" aria-hidden="true">
              <p>
                <small>Sechs Wochen</small>Sechs Schichten
              </p>
              <div className="wk-punkte">
                {SCHICHTEN.map((s) => (
                  <i key={s.name} />
                ))}
              </div>
            </div>
          </div>

          <ol className="wk-liste">
            {SCHICHTEN.map((s, k) => (
              <li key={s.name}>
                <small>Woche {k + 1}</small>
                {s.name}
              </li>
            ))}
          </ol>

          <div className="wk-weiter" aria-hidden="true">
            <i />
            Scrollen
          </div>
        </div>
      </div>
    </header>
  );
}
