// src/components/MuscleHeatmapRegions.jsx
import { useMemo, useRef, useState } from "react";
import { REGION_META, SHAPES } from "../data/regions-config.js";
import { coverageByLR } from "../data/coverage";
import { CATALOG_BY_ID } from "../data/lifts";


export default function MuscleHeatmapRegions({
  data = {},            // { [regionId]: 0..1 }
  view = "front",       // 'front' | 'back' | 'deep'  (which regions to show)
  side = "front",       // 'front' | 'back'           (which photo to show)
  onRegionClick,        // optional (we disable it from the page now)
  showLegend = true,
  style,
}) {
  // ---- Tracer (dev) ----
  const [traceOn, setTraceOn] = useState(false);
  const [tracePts, setTracePts] = useState([]);
  const svgRef = useRef(null);

  function svgCoords(evt) {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: Number(p.x.toFixed(1)), y: Number(p.y.toFixed(1)) };
  }
  function onSvgClick(evt) {
    if (!traceOn) return;
    const p = svgCoords(evt);
    setTracePts((arr) => [...arr, p]);
  }
  const traceD = tracePts.length
    ? `M ${tracePts[0].x} ${tracePts[0].y} ` + tracePts.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
    : "";
  function undoPt()   { setTracePts((arr) => arr.slice(0, -1)); }
  function clearPts() { setTracePts([]); }
  function finishPath(close = true) {
    const d = traceD + (tracePts.length >= 3 && close ? " Z" : "");
    navigator.clipboard?.writeText(d);
    console.log("PATH d=", d);
    alert("Copied path d to clipboard:\n" + d);
  }

  // ---- Background image chosen by `side` ----
  const base = import.meta.env.BASE_URL || "/";
  const imgHref = `${base}${side === "back" ? "back.png" : "front.png"}`; // use .jpg if that’s your files
  const viewBoxStr = "0 0 200 420";

  // ---- Data helpers ----
  const items = useMemo(
  () => Object.values(REGION_META)
        .filter(m => m.view === view && (!m.side || m.side === side)),
  [view, side]
);
  const normGet = (id) => {
    const v = data?.[id];
    return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0;
  };
  function heatColor(t) {
    // opaque, high-contrast ramp
    const x = Math.pow(t, 0.7);
    const h = 220 - 220 * x;    // blue -> red
    const s = 85;
    const l = 55 - 10 * x;
    return `hsl(${h} ${s}% ${l}%)`;
  }
  const handle = (id) => (onRegionClick ? () => onRegionClick(id) : undefined);

  return (
    <div style={style}>
      {/* Legend (optional) */}
      {showLegend && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 0 12px" }}>
          <div style={{ width: 160, height: 10, background: "linear-gradient(90deg, hsl(220 85% 55%), hsl(0 85% 45%))", borderRadius: 6 }} />
          <span style={{ fontSize: 12, opacity: .7 }}>Cool → Hot</span>
        </div>
      )}

      {/* Tracer UI (dev) */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={traceOn} onChange={e => setTraceOn(e.target.checked)} />
          Trace mode
        </label>
        <button onClick={undoPt}  disabled={!tracePts.length}>Undo</button>
        <button onClick={() => finishPath(true)} disabled={!tracePts.length}>Finish + Copy</button>
        <button onClick={clearPts} disabled={!tracePts.length}>Clear</button>
        <div style={{ fontSize: 12, opacity: .7 }}>Points: {tracePts.length}</div>
      </div>

      {/* SVG */}
      <svg
        ref={svgRef}
        onClick={onSvgClick}
        viewBox={viewBoxStr}
        width="100%"
        style={{ display: "block" }}
      >
        <image
          href={imgHref}
          x={0} y={0} width={200} height={420}
          preserveAspectRatio="xMidYMid slice"
          opacity="0.75"
          pointerEvents="none"
        />
        {/* live preview of trace */}
        {tracePts.length > 0 && (
          <polyline
            points={tracePts.map(p => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#0070f3"
            strokeDasharray="4 3"
            strokeWidth="1.5"
            pointerEvents="none"
          />
        )}

        {/* Regions */}
        {items.map((r) => {
          const s = SHAPES[r.id];
          if (!s) return null;
          const t = normGet(r.id);
          const fill = heatColor(t);
          const common = {
            onClick: traceOn ? undefined : handle(r.id),
            fill,
            fillOpacity: 0.25,
            opacity: 1,
            stroke: "#454545",
            strokeOpacity: 0.25,
            strokeWidth: 1.2,
            cursor: traceOn ? "crosshair" : (onRegionClick ? "pointer" : "default"),
          };
          if (s.type === "path")   return <path   key={r.id} {...common} d={s.d} transform={s.transform}><title>{r.label}</title></path>;
          if (s.type === "rect")   return <rect   key={r.id} {...common} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx ?? 8}><title>{r.label}</title></rect>;
          if (s.type === "circle") return <circle key={r.id} {...common} cx={s.cx} cy={s.cy} r={s.r}><title>{r.label}</title></circle>;
          return null;
        })}
      </svg>
    </div>
  );
}
