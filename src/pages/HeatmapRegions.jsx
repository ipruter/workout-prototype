// src/pages/HeatmapRegions.jsx
import { Fragment, useEffect, useMemo, useState } from "react";
import WeeklyPlanner from "../components/WeeklyPlanner.jsx";
import MuscleHeatmapRegions from "../components/MuscleHeatmapRegions.jsx";
import { REGION_META, SHAPES } from "../data/regions-config.js";
import { WORKOUT_TARGETS } from "../data/workout-targets.js";

// --- helpers -------------------------------------------------
const seed = Object.fromEntries(Object.values(REGION_META).map(r => [r.id, 0]));

function idsFor(view, side) {
  return Object.values(REGION_META)
    .filter(r => r.view === view && (!r.side || r.side === side))
    .map(r => r.id);
}


// ...

function groupKey(id) {
  return id.endsWith("_l") || id.endsWith("_r") ? id.slice(0, -2) : id;
}
function loadPlan() {
  try { return JSON.parse(localStorage.getItem("planner-v1")) || {}; }
  catch { return {}; }
}
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
  return totals; // raw (may be fractional); we round for display
}
const META_BY_ID = Object.fromEntries(Object.values(REGION_META).map(m => [m.id, m]));

// --- page ----------------------------------------------------
export default function HeatmapRegions() {
  // which photo / which layer
  const [side,  setSide]  = useState("front");   // 'front' | 'back'
  const [layer, setLayer] = useState("front");   // 'front' | 'back' | 'deep'
  const view = layer;

  // visible ids for this layer
  const visibleIds = useMemo(() => idsFor(view, side), [view, side]);

  // build groups for this layer: { baseKey -> [ids...] }
  const groups = useMemo(() => {
    const g = new Map();
    for (const id of visibleIds) {
      const k = groupKey(id);
      if (!g.has(k)) g.set(k, []);
      g.get(k).push(id);
    }
    return g; // Map<string, string[]>
  }, [visibleIds]);

  // counts for display (by group), normalized colors for shapes (by id)
  const [groupCounts, setGroupCounts] = useState({});  // { baseKey: integer }
  const [data, setData] = useState(seed);              // { id: 0..1 }
  const [maxInView, setMaxInView] = useState(1);

  // recompute from planner whenever plan or view changes
  useEffect(() => {
    const recompute = () => {
      const plan = loadPlan();
      const totals = computeRegionSets(plan);   // per-id totals

      // aggregate by group
      const gc = {};
      for (const [k, ids] of groups.entries()) {
        gc[k] = Math.round(ids.reduce((sum, id) => sum + (totals[id] ?? 0), 0));
      }
      setGroupCounts(gc);

      // normalize using group totals; assign same value to both sides
      const maxGroup = Math.max(1, ...Object.values(gc));
      setMaxInView(maxGroup);

      const next = { ...seed };
      for (const [k, ids] of groups.entries()) {
        const norm = (gc[k] ?? 0) / maxGroup;
        for (const id of ids) next[id] = norm;
      }
      setData(next);
    };

    recompute();
    window.addEventListener("planner-updated", recompute);
    window.addEventListener("storage", recompute);
    return () => {
      window.removeEventListener("planner-updated", recompute);
      window.removeEventListener("storage", recompute);
    };
  }, [groups]);

  // label for a group: use the first member's label and strip (L)/(R)
  function labelForGroup(k, ids) {
    const meta = META_BY_ID[ids[0]];
    return (meta?.label ?? k).replace(/\s*\((L|R)\)\s*$/i, "");
  }

  // dev warnings to catch stray ids
  useEffect(() => {
    const shapeIds = new Set(Object.keys(SHAPES));
    for (const [k, ids] of groups.entries()) {
      ids.forEach(id => {
        if (!META_BY_ID[id]) console.warn("No REGION_META for id:", id);
        if (!shapeIds.has(id)) console.warn("No SHAPES entry for id:", id);
      });
    }
  }, [groups]);

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

      {/* Two-column layout: heatmap (left) + group list (right) */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
        <MuscleHeatmapRegions
          data={data}        // normalized 0..1 from grouped totals
          view={view}
          side={side}        // <-- ensures back image shows on back/deep(back)
          onRegionClick={undefined}
          showLegend={true}
        />

        <div>
          <h3 style={{ marginTop: 0 }}>Sets/week — {view} regions</h3>
          <div style={{ display:"grid", gridTemplateColumns:"auto auto", gap:8 }}>
            {Array.from(groups.entries()).map(([k, ids]) => (
              <Fragment key={k}>
                <div style={{ fontSize:13, opacity:.85 }}>{labelForGroup(k, ids)}</div>
                <div style={{ width:60, textAlign:"right", fontWeight:600 }}>
                  {groupCounts[k] ?? 0}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
