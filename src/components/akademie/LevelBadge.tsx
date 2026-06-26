import { LEVELS, levelGold, type Level } from "./levels";

/* Kleines Level-Badge fuer Termin-Karten. Gold in der Intensitaet des Levels. */
export default function LevelBadge({ level, withName = true }: { level: Level; withName?: boolean }) {
  const m = LEVELS[level];
  return (
    <span
      className="font-mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: levelGold(level, 1.15),
        border: `1px solid ${levelGold(level, 0.7)}`,
        background: `rgba(212,174,90,${(m.intensity * 0.1).toFixed(2)})`,
        padding: "4px 9px",
        borderRadius: 2,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: levelGold(level, 1) }} />
      {m.tag}{withName ? ` · ${m.name}` : ""}
    </span>
  );
}
