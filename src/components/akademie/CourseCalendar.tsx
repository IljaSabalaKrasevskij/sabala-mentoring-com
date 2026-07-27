"use client";

import { useState } from "react";
import { Reveal } from "./shared";
import LevelBadge from "./LevelBadge";
import type { Level } from "./levels";

/* ─────────────────────────────────────────────────────────────────────────
   CourseCalendar — Monatssicht Juni + Juli 2026.
   Hervorgehobener „Nächster Termin"-Banner + klickbare Kurs-Termine.
   Klick auf einen Termin → Sales-Page des aktiven Kurses (/akademie).
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#D4AE5A";

type CourseEvent = {
  day: number;
  month: number; // 6 = Juni, 7 = Juli
  year: number;
  level: Level;
  title: string;
  sub?: string;
  time: string;
  label: string;
  href: string;
  spots?: number;
  done?: boolean; // bereits gelaufen → nicht mehr buchbar
};

const SECOND_BRAIN_SUB = "Deine lokale Datenbasis, mit der Claude niemals vergisst";

const EVENTS: CourseEvent[] = [
  { day: 26, month: 6, year: 2026, level: 2, title: "Dein Second Brain", sub: SECOND_BRAIN_SUB, time: "15:00 MEZ", label: "Erster Lauf", href: "/akademie", done: true },
  { day: 21, month: 8, year: 2026, level: 2, title: "Dein Second Brain", sub: SECOND_BRAIN_SUB, time: "Session 1: 21.8. · Session 2: 28.8. · 15-17:30 Uhr", label: "Nächster Lauf", href: "/akademie", spots: 10 },
];

// Nächster Termin für den Highlight-Banner = erster noch nicht gelaufener.
const NEXT = EVENTS.find((e) => !e.done) ?? EVENTS[EVENTS.length - 1];

const MONTHS = [
  { month: 6, year: 2026, name: "Juni 2026" },
  { month: 8, year: 2026, name: "August 2026" },
];

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const monthName = (m: number) => (m === 6 ? "Juni" : m === 8 ? "August" : "Juli");

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}
function getFirstWeekday(month: number, year: number) {
  const d = new Date(year, month - 1, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export default function CourseCalendar() {
  const [activeEvent, setActiveEvent] = useState<CourseEvent | null>(null);
  const today = new Date();

  return (
    <section
      id="kalender"
      style={{
        position: "relative",
        background: "radial-gradient(120% 80% at 50% 100%, #17110a 0%, #0b0805 55%, #080604 100%)",
        padding: "96px 0 104px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <Reveal>
          <p className="font-mono" style={{ fontSize: 13, letterSpacing: "0.24em", textTransform: "uppercase", color: gold, marginBottom: 18 }}>
            Kurs-Kalender
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 400,
              color: "#FAF8F5",
              lineHeight: 1.08,
              marginBottom: 12,
            }}
          >
            Wann findet was statt?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontSize: 15, color: "rgba(250,248,245,0.5)", marginBottom: 44, maxWidth: 480, lineHeight: 1.6 }}>
            Klick auf einen Termin für Details und Buchung. Jeder Termin ist einzeln und live buchbar, mit eigenem Level.
          </p>
        </Reveal>

        {/* Nächster-Termin-Banner */}
        <Reveal delay={0.08}>
          <a
            href={NEXT.href}
            className="group"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              textDecoration: "none",
              background: "linear-gradient(135deg, rgba(212,174,90,0.18) 0%, rgba(18,13,8,0.9) 60%)",
              border: "1px solid rgba(212,174,90,0.5)",
              borderRadius: 4,
              padding: "24px 30px",
              marginBottom: 52,
              boxShadow: "0 24px 70px -40px rgba(212,174,90,0.6)",
              transition: "border-color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = gold;
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(212,174,90,0.5)";
              el.style.transform = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              {/* Datums-Chip */}
              <div style={{ textAlign: "center", lineHeight: 1, flexShrink: 0 }}>
                <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 44, color: gold }}>{NEXT.day}</div>
                <div className="font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(250,248,245,0.6)", marginTop: 4 }}>
                  {monthName(NEXT.month)}
                </div>
              </div>
              <div style={{ width: 1, height: 46, background: "rgba(212,174,90,0.3)" }} />
              <div>
                <p className="font-mono" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: 7 }}>
                  Nächster Termin · {NEXT.label}
                </p>
                <p style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 24, color: "#FAF8F5", lineHeight: 1.15 }}>
                  {NEXT.title}
                </p>
                {NEXT.sub && <p style={{ fontSize: 13.5, color: "rgba(250,248,245,0.62)", lineHeight: 1.5, marginTop: 5, maxWidth: 360 }}>{NEXT.sub}</p>}
                <div style={{ marginTop: 9 }}><LevelBadge level={NEXT.level} /></div>
                <p className="font-mono" style={{ fontSize: 13, color: "rgba(250,248,245,0.6)", marginTop: 9 }}>
                  {NEXT.time}
                  {NEXT.spots !== undefined && <span style={{ color: "#E8A87C", marginLeft: 14 }}>· {NEXT.spots} Plätze frei</span>}
                </p>
              </div>
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: gold,
                color: "#0a0806",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "14px 26px",
                borderRadius: 2,
              }}
            >
              Platz sichern
              <svg width="16" height="11" viewBox="0 0 20 12" fill="none">
                <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </Reveal>

        {/* Zwei-Monats-Grid */}
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 36 }}>
            {MONTHS.map(({ month, year, name }) => (
              <MonthView
                key={`${year}-${month}`}
                month={month}
                year={year}
                name={name}
                events={EVENTS.filter((e) => e.month === month && e.year === year)}
                today={today}
                activeEvent={activeEvent}
                onSelect={setActiveEvent}
              />
            ))}
          </div>
        </Reveal>

        {/* Event-Popover */}
        {activeEvent && (
          <div
            style={{
              marginTop: 28,
              padding: "26px 30px",
              background: "linear-gradient(135deg, rgba(212,174,90,0.12) 0%, rgba(12,9,6,0.96) 60%)",
              border: "1px solid rgba(212,174,90,0.4)",
              borderRadius: 4,
              display: "flex",
              flexWrap: "wrap",
              gap: 22,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p className="font-mono" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: 8 }}>
                {activeEvent.label} · {activeEvent.day}. {monthName(activeEvent.month)} {activeEvent.year}
              </p>
              <h3 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 24, fontWeight: 400, color: "#FAF8F5", marginBottom: 6 }}>
                {activeEvent.title}
              </h3>
              {activeEvent.sub && <p style={{ fontSize: 13.5, color: "rgba(250,248,245,0.6)", lineHeight: 1.5, marginBottom: 10, maxWidth: 380 }}>{activeEvent.sub}</p>}
              <div style={{ marginBottom: 10 }}><LevelBadge level={activeEvent.level} /></div>
              <p className="font-mono" style={{ fontSize: 13, color: "rgba(250,248,245,0.55)" }}>
                {activeEvent.time}
                {activeEvent.done ? (
                  <span style={{ marginLeft: 16, color: "rgba(250,248,245,0.45)" }}>· gelaufen</span>
                ) : activeEvent.spots !== undefined ? (
                  <span style={{ marginLeft: 16, color: activeEvent.spots <= 3 ? "#E8A87C" : "rgba(250,248,245,0.55)" }}>· {activeEvent.spots} Plätze frei</span>
                ) : null}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {activeEvent.done ? (
                <span className="font-mono" style={{ padding: "13px 24px", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(250,248,245,0.5)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: 2 }}>
                  Gelaufen
                </span>
              ) : (
                <a href={activeEvent.href} style={{ padding: "13px 30px", background: gold, color: "#0A0806", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none", borderRadius: 2 }}>
                  Jetzt buchen
                </a>
              )}
              <button
                onClick={() => setActiveEvent(null)}
                aria-label="Schließen"
                style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 20, cursor: "pointer", padding: "4px 8px", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Legende */}
        <div style={{ marginTop: 28, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <Legend dot={gold} glow label="Kurs-Termin" />
          <Legend dot="rgba(255,255,255,0.18)" label="Heute" ring />
        </div>
      </div>
    </section>
  );
}

function Legend({ dot, label, glow, ring }: { dot: string; label: string; glow?: boolean; ring?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: dot,
          boxShadow: glow ? `0 0 10px ${dot}` : "none",
          border: ring ? "1px solid rgba(255,255,255,0.4)" : "none",
        }}
      />
      <span className="font-mono" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{label}</span>
    </div>
  );
}

function MonthView({
  month, year, name, events, today, activeEvent, onSelect,
}: {
  month: number; year: number; name: string;
  events: CourseEvent[]; today: Date;
  activeEvent: CourseEvent | null;
  onSelect: (e: CourseEvent | null) => void;
}) {
  const firstWd = getFirstWeekday(month, year);
  const daysInM = getDaysInMonth(month, year);
  const cells = Array.from({ length: firstWd + daysInM });

  return (
    <div
      style={{
        background: "rgba(255,250,242,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 4,
        padding: "26px 24px 28px",
      }}
    >
      <p className="font-mono" style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,248,245,0.62)", marginBottom: 20 }}>
        {name}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
        {WEEKDAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 11.5, fontFamily: "monospace", letterSpacing: "0.06em", color: "rgba(255,255,255,0.38)", paddingBottom: 6 }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {cells.map((_, i) => {
          const day = i < firstWd ? null : i - firstWd + 1;
          if (!day) return <div key={i} />;

          const event = events.find((e) => e.day === day);
          const isToday = today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day;
          const isActive = activeEvent?.day === day && activeEvent?.month === month;

          return (
            <button
              key={i}
              onClick={() => (event ? onSelect(isActive ? null : event) : undefined)}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                fontSize: 13.5,
                fontFamily: "monospace",
                cursor: event ? "pointer" : "default",
                background: isActive ? gold : event ? "rgba(212,174,90,0.16)" : isToday ? "rgba(255,255,255,0.08)" : "transparent",
                color: isActive ? "#0A0806" : event ? gold : isToday ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.34)",
                border: event ? `1px solid ${isActive ? gold : "rgba(212,174,90,0.45)"}` : isToday ? "1px solid rgba(255,255,255,0.32)" : "1px solid transparent",
                fontWeight: event ? 600 : 400,
                boxShadow: event && !isActive ? "0 0 18px -6px rgba(212,174,90,0.6)" : "none",
                transition: "all 0.15s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!event || isActive) return;
                (e.currentTarget as HTMLElement).style.background = "rgba(212,174,90,0.28)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,174,90,0.7)";
              }}
              onMouseLeave={(e) => {
                if (!event || isActive) return;
                (e.currentTarget as HTMLElement).style.background = "rgba(212,174,90,0.16)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,174,90,0.45)";
              }}
            >
              {day}
              {event && !isActive && (
                <span style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: gold }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
