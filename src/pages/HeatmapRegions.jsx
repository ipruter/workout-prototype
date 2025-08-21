// src/pages/HeatmapRegions.jsx
import { Fragment, useEffect, useMemo, useState } from "react";
import WeeklyPlanner from "../components/WeeklyPlanner.jsx";
import MuscleHeatmapRegions from "../components/MuscleHeatmapRegions.jsx";
import { REGION_META, SHAPES } from "../data/regions-config.js";
import { WORKOUT_TARGETS } from "../data/workout-targets.js";

// --- helpers ---
function idsFor(view) {
  return Object.values(REGION_META).filter(r => r.view === view).map(r => r.id);
}
const seed = Object.fromEntries(Object.values(REGION_META).map(r => [r.id, 0]));
const loadPlan = () => {
  try { return JSON.parse(localStorage.getItem("planner-v1")) || {}; }
  catch { return {}; }
};
function computeRegionSets(plan) {
  const totals = {};
  for (const day of Object.keys(plan)) {
    for (const w of plan[day]) {
      const sets = Math.max(0, Number(w.sets) || 0);
      const map  = WORKOUT_TARGETS[w.name];
      if (!map || sets <= 0) continue;
      for (const id of Object.keys(map)) {
        totals[id] = (totals[id] ?? 0) + sets * map[id];
      }
    }
  }
  return totals;
}

export default function HeatmapRegions() {
  // which photo to show / which layer to color
  const [side,  setSide]  = useState("front");     // 'front' | 'back'
  const [layer, setLayer] = useState("front");     // 'front' | 'back' | 'deep'
  const view = layer;

  // safe lookup for labels even if key !== id in REGION_META
  const META_BY_ID = useMemo(
    () => Object.fromEntries(Object.values(REGION_META).map(m => [m.id, m])),
    []
  );

  const visibleIds = useMemo(() => idsFor(view), [view]);

  // integers for right panel; normalized 0..1 for coloring
  const [counts, setCounts] = useState({});
  const [data,   setData]   = useState(seed);
  const [maxInView, setMaxInView] = useState(1);

  // recompute from planner
  useEffect(() => {
    const recompute = () => {
      const plan   = loadPlan();
      const totals = computeRegionSets(plan);

      // integers for display
      setCounts(Object.fromEntries(Object.entries(totals).map(([k,v]) => [k, Math.round(v)])));

      // normalize for current view
      const max = Math.max(1, ...visibleIds.map(id => totals[id] ?? 0));
      setMaxInView(Math.round(max));
      const next = { ...seed };
      for (const id of visibleIds) next[id] = (totals[id] ?? 0) / max;
      setData(next);
    };

    recompute();
    window.addEventListener("planner-updated", recompute);
    window.addEventListener("storage", recompute);
    return () => {
      window.removeEventListener("planner-updated", recompute);
      window.removeEventListener("storage", recompute);
    };
  }, [view, visibleIds]);

  // dev guard to catch any stray ids
  useEffect(() => {
    const shapeIds = new Set(Object.keys(SHAPES));
    visibleIds.forEach(id => {
      if (!META_BY_ID[id]) console.warn("No REGION_META for id:", id);
      if (!shapeIds.has(id)) console.warn("No SHAPES entry for id:", id);
    });
  }, [visibleIds, META_BY_ID]);

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
      {/* ===== WEEKLY PLANNER ON TOP ===== */}
      <WeeklyPlanner />
      <hr style={{ margin: "28px 0" }} />

      {/* ===== HEATMAP SECTION ===== */}
      <h1>Muscle Region Heatmaps</h1>

      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        <button onClick={() => { setSide("front"); setLayer("front"); }}
                disabled={side==="front" && layer==="front"}>Front (surface)</button>
        <button onClick={() => { setSide("back"); setLayer("back"); }}
                disabled={side==="back" && layer==="back"}>Back (surface)</button>
        <button onClick={() => { setSide("front"); setLayer("deep"); }}
                disabled={side==="front" && layer==="deep"}>Deep (front)</button>
        <button onClick={() => { setSide("back"); setLayer("deep"); }}
                disabled={side==="back" && layer==="deep"}>Deep (back)</button>
      </div>

      <div style={{ fontSize:12, opacity:.75, marginBottom:8 }}>
        Coloring is normalized within the current view. Max in view: <strong>{maxInView}</strong> sets/week.
      </div>

      {/* Two-column layout: heatmap (left) + integer list (right) */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
        <MuscleHeatmapRegions
          data={data}        // normalized 0..1 from planner
          view={view}
          side={side}
          onRegionClick={undefined} // no manual editing
          showLegend={true}
        />

        <div>
          <h3 style={{ marginTop: 0 }}>Sets/week — {view} regions</h3>
          <div style={{ display:"grid", gridTemplateColumns:"auto auto", gap:8 }}>
            {visibleIds.map((id) => {
              const meta = META_BY_ID[id];
              const n = counts[id] ?? 0;
              return (
                <Fragment key={id}>
                  <div style={{ fontSize:13, opacity:.85 }}>{meta?.label ?? id}</div>
                  <div style={{ width:60, textAlign:"right", fontWeight:600 }}>{n}</div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
