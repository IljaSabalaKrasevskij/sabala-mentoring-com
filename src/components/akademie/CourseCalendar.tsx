"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   CourseCalendar — Monatssicht Juni + Juli 2026.
   Kurs-Termine sind klickbar und zeigen ein Detail-Popover.
   Später erweiterbar um Warteliste-Formular.
   ───────────────────────────────────────────────────────────────────────── */

type CourseEvent = {
  day: number;
  month: number; // 6 = Juni, 7 = Juli
  year: number;
  title: string;
  time: string;
  label: string;
  session: number;
  href: string;
  spots?: number;
};

const EVENTS: CourseEvent[] = [
  {
    day: 26, month: 6, year: 2026,
    title: "Dein KI-Mitarbeiter",
    time: "15:00–17:00 MEZ",
    label: "Session 1",
    session: 1,
    href: "/akademie",
    spots: 8,
  },
  {
    day: 3, month: 7, year: 2026,
    title: "Dein KI-Mitarbeiter",
    time: "15:00–17:00 MEZ",
    label: "Session 2",
    session: 2,
    href: "/akademie",
    spots: 8,
  },
];

const MONTHS = [
  { month: 6, year: 2026, name: "Juni 2026" },
  { month: 7, year: 2026, name: "Juli 2026" },
];

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

// Returns 0=Mo … 6=So  (ISO weekday)
function getFirstWeekday(month: number, year: number) {
  const d = new Date(year, month - 1, 1).getDay();
  return d === 0 ? 6 : d - 1; // Sun→6, Mon→0
}

export default function CourseCalendar() {
  const [activeEvent, setActiveEvent] = useState<CourseEvent | null>(null);
  const today = new Date();

  return (
    <section
      id="kalender"
      style={{ background: "#06040200", backgroundColor: "#080604", padding: "80px 0 96px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] mb-4" style={{ color: "#C9A656" }}>
          Kurs-Kalender
        </p>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 400,
            color: "#FAF8F5",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          Wann findet was statt?
        </h2>
        <p style={{ fontSize: 15, color: "rgba(250,248,245,0.5)", marginBottom: 48, maxWidth: 480, lineHeight: 1.6 }}>
          Klick auf einen Termin für Details. Kurse sind nur als Paket buchbar.
        </p>

        {/* Two-month grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {MONTHS.map(({ month, year, name }) => (
            <MonthView
              key={`${year}-${month}`}
              month={month}
              year={year}
              name={name}
              events={EVENTS.filter(e => e.month === month && e.year === year)}
              today={today}
              activeEvent={activeEvent}
              onSelect={setActiveEvent}
            />
          ))}
        </div>

        {/* Event popover */}
        {activeEvent && (
          <div
            style={{
              marginTop: 32,
              padding: "28px 32px",
              background: "linear-gradient(135deg, rgba(201,166,86,0.08) 0%, rgba(10,8,6,0.95) 60%)",
              border: "1px solid rgba(201,166,86,0.35)",
              borderRadius: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2"
                style={{ color: "#C9A656" }}
              >
                {activeEvent.label} · {activeEvent.day}. {activeEvent.month === 6 ? "Juni" : "Juli"} {activeEvent.year}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: "#FAF8F5",
                  marginBottom: 6,
                }}
              >
                {activeEvent.title}
              </h3>
              <p style={{ fontSize: 14, color: "rgba(250,248,245,0.55)", fontFamily: "monospace" }}>
                ⏰ {activeEvent.time}
                {activeEvent.spots !== undefined && (
                  <span style={{ marginLeft: 16, color: activeEvent.spots <= 3 ? "#E8A87C" : "rgba(250,248,245,0.55)" }}>
                    · {activeEvent.spots} Plätze frei
                  </span>
                )}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a
                href={activeEvent.href}
                style={{
                  padding: "13px 32px",
                  background: "#C9A656",
                  color: "#0A0806",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Jetzt buchen
              </a>
              <button
                onClick={() => setActiveEvent(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 20,
                  cursor: "pointer",
                  padding: "4px 8px",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={{ marginTop: 28, display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#C9A656" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>Kurs-Termin</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>Heute</span>
          </div>
        </div>
      </div>
    </section>
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
  const firstWd  = getFirstWeekday(month, year);
  const daysInM  = getDaysInMonth(month, year);
  const cells    = Array.from({ length: firstWd + daysInM });

  return (
    <div>
      <p
        className="font-mono text-[11px] uppercase tracking-[0.25em] mb-5"
        style={{ color: "rgba(250,248,245,0.45)" }}
      >
        {name}
      </p>

      {/* Weekday labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
        {WEEKDAYS.map(d => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: 10,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.25)",
              paddingBottom: 6,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {cells.map((_, i) => {
          const day  = i < firstWd ? null : i - firstWd + 1;
          if (!day) return <div key={i} />;

          const event   = events.find(e => e.day === day);
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() + 1 === month &&
            today.getDate() === day;
          const isActive = activeEvent?.day === day && activeEvent?.month === month;

          return (
            <button
              key={i}
              onClick={() => event ? onSelect(isActive ? null : event) : undefined}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                fontSize: 13,
                fontFamily: "monospace",
                cursor: event ? "pointer" : "default",
                background: isActive
                  ? "#C9A656"
                  : event
                  ? "rgba(201,166,86,0.18)"
                  : isToday
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
                color: isActive
                  ? "#0A0806"
                  : event
                  ? "#C9A656"
                  : isToday
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.35)",
                border: event
                  ? `1px solid ${isActive ? "#C9A656" : "rgba(201,166,86,0.35)"}`
                  : isToday
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid transparent",
                fontWeight: event ? 600 : 400,
                transition: "all 0.15s",
                position: "relative",
              }}
              onMouseEnter={e => {
                if (!event || isActive) return;
                (e.currentTarget as HTMLElement).style.background = "rgba(201,166,86,0.28)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,166,86,0.6)";
              }}
              onMouseLeave={e => {
                if (!event || isActive) return;
                (e.currentTarget as HTMLElement).style.background = "rgba(201,166,86,0.18)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,166,86,0.35)";
              }}
            >
              {day}
              {/* Small dot indicator below event days */}
              {event && !isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 3,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#C9A656",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
