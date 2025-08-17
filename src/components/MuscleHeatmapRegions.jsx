// src/components/MuscleHeatmapRegions.jsx
import { useMemo } from "react";
import { REGION_META, SHAPES } from "../data/regions-config.js";

const clamp01 = (v) => Math.max(0, Math.min(1, v ?? 0));

function heatColor(t) {
  // Blue → Red
  const h = 220 - 220 * clamp01(t);
  const s = 85;
  const l = 55 - 15 * clamp01(t);
  return `hsl(${h} ${s}% ${l}%)`;
}

export default function MuscleHeatmapRegions({
  data = {},       // { [regionId]: number }
  view = "front",  // "front" | "back" | "deep"
  side = "front",        // "front" | "back"            (which photo to show)
  onRegionClick,   // (id) => void
  showLegend = true,
  style,
}) {
  // Only normalize values for regions in the current view
    // background image to display
  const base = import.meta.env.BASE_URL || "/";
  const imgHref = `${base}${side === "back" ? "back.png" : "front.png"}`;

  // keep using your 200x420 coordinate system
  const viewBoxStr = "0 0 200 420";

  const { items, normGet } = useMemo(() => {
    const items = Object.values(REGION_META).filter((r) => r.view === view);
    const vals = items.map(({ id }) => (Number.isFinite(data[id]) ? data[id] : 0));
    const min = vals.length ? Math.min(...vals) : 0;
    const max = vals.length ? Math.max(...vals) : 1;
    const span = Math.max(1e-6, max - min);
    const normGet = (id) => clamp01(((Number.isFinite(data[id]) ? data[id] : 0) - min) / span);
    return { items, normGet };
  }, [data, view]);

  const handle = (id) => () => onRegionClick?.(id);

  return (
    <div style={{ width: "100%", maxWidth: 520, margin: "0 auto", ...style }}>
      {showLegend && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 0 12px" }}>
          <span style={{ fontSize: 12, opacity: 0.75 }}>Low</span>
          <svg width="100%" height="12" viewBox="0 0 100 10" preserveAspectRatio="none" style={{ flex: 1 }}>
            <defs>
              <linearGradient id={`legend-${view}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={heatColor(0)} />
                <stop offset="100%" stopColor={heatColor(1)} />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100" height="10" fill={`url(#legend-${view})`} rx="2" />
          </svg>
          <span style={{ fontSize: 12, opacity: 0.75 }}>High</span>
        </div>
      )}

      <svg viewBox={viewBoxStr} width="100%" style={{ display: "block" }}>
      {/* background photo (front/back) */}
      <image
      href={imgHref}
      x={0}
      y={0}
      width={200}
      height={420}
      preserveAspectRatio="xMidYMid slice"
      opacity="0.22"
      pointerEvents="none"   // clicks pass through to your regions
      />

        {/* regions for current view */}
        {items.map((r) => {
          const t = normGet(r.id);
          const fill = heatColor(t);
          const s = SHAPES[r.id];
          if (!s) return null;

          const common = {
            onClick: handle(r.id),
            fill,
            stroke: "#454545",
            cursor: onRegionClick ? "pointer" : "default",
          };

          if (s.type === "path") {
            return (
              <path key={r.id} {...common} d={s.d}>
                <title>{r.label}: {Number.isFinite(data[r.id]) ? data[r.id] : 0}</title>
              </path>
            );
          }
          if (s.type === "rect") {
            return (
              <rect key={r.id} {...common} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx ?? 8}>
                <title>{r.label}: {Number.isFinite(data[r.id]) ? data[r.id] : 0}</title>
              </rect>
            );
          }
          if (s.type === "circle") {
            return (
              <circle key={r.id} {...common} cx={s.cx} cy={s.cy} r={s.r}>
                <title>{r.label}: {Number.isFinite(data[r.id]) ? data[r.id] : 0}</title>
              </circle>
            );
          }
          return null;
        })}
      </svg>

      <div style={{ textAlign: "center", fontSize: 12, opacity: 0.7, marginTop: 6 }}>
        View: <strong>{view}</strong>
      </div>
    </div>
  );
}
