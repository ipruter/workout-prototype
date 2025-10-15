import React, { Fragment, useEffect, useMemo, useState } from "react";
import WeeklyPlanner from "../components/WeeklyPlanner";
import MuscleHeatmapRegions from "../components/MuscleHeatmapRegions";
import ProgramMetrics from "../components/ProgramMetrics";
import { REGION_META, SHAPES } from "../data/regions-config";
import { CATALOG_BY_ID } from "../data/lifts";           // omit .ts
import { coverageByLR } from "../data/coverage";         // omit .ts
import {
 computeModifiedSets,
 defaultEffortWeight as wEffort,
 defaultHypertrophyWeight as wHyp,
 } from "../utils/metrics";    // new metrics core

// Accept rows with {name,...} or {liftId,...} and normalize to {liftId,...}
function normalizeWeeklySets(raw = [], nameToId = {}) {
  const out = [];
  for (const row of raw || []) {
    if (!row) continue;
    let { liftId, name, sets, reps, RIR } = row;

    // Map display name -> id if needed
    if (!liftId && typeof name === "string") {
      liftId = nameToId[name.trim().toLowerCase()];
    }

    const s = Number(sets) || 0;
    if (!liftId || s <= 0) continue; // drop invalid rows

    out.push({
      liftId,
      sets: s,
      reps: Number.isFinite(+reps) ? +reps : undefined,
      RIR: Number.isFinite(+RIR) ? +RIR : undefined,
    });
  }
  return out;
}

// --- helpers -------------------------------------------------
const META_BY_ID = Object.fromEntries(Object.values(REGION_META).map(m => [m.id, m]));
const seed = Object.fromEntries(Object.values(REGION_META).map(r => [r.id, 0]));

function idsFor(view, side) {
  return Object.values(REGION_META)
    .filter(r => r.view === view && (!r.side || r.side === side))
    .map(r => r.id);
}
function groupKey(id) {
  return id.endsWith("_l") || id.endsWith("_r") ? id.slice(0, -2) : id;
}

const NAME_TO_ID = Object.fromEntries(
  Object.entries(CATALOG_BY_ID).map(([id, o]) => [o.name.trim().toLowerCase(), id])
);

// legacy WeeklyPlanner support (localStorage + event)
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function loadLegacyPlannerPlan() {
  try { return JSON.parse(localStorage.getItem("planner-v1")) || {}; }
  catch { return {}; }
}

function flattenPlanToRows(plan) {
  // produces rows shaped like { name, sets, reps, RIR }
  const rows = [];
  for (const d of DAYS) {
    for (const e of plan[d] || []) {
      rows.push({
        name: e.name || e.liftName || e.lift || "",   // be forgiving
        sets: e.sets,
        reps: e.reps,
        RIR:  e.RIR,
      });
    }
  }
  return rows;
}

export function WeeklyPlannerPanel({ onPlanChange }) {
  return (
    <section>
      <h1>Weekly Workout Builder</h1>
      <p style={{ marginTop: 6, opacity: 0.8 }}>
        Select a workout for each day. Weight = <em>Intensity&nbsp;% × 1RM</em> (rounded to 5).
        Set a 1RM per lift once and it’s remembered.
      </p>
      <WeeklyPlanner onPlanChange={onPlanChange} />
    </section>
  );
}

export function MetricsHeatmap({
  side, setSide,
  layer, setLayer,
  view,
  heatData, maxInView,
  groups, groupCounts,
  weeklySets,
  labelForGroup
}) {
    // Legend rows (per-region weekly % change) + formatters
  const legendRows = [
    { name: "blue",   color: "#3b82f6", pct: [-0.6,  0.2],  label: "Loss → Maint / Small Gains" },
    { name: "green",  color: "#22c55e", pct: [-0.1,  0.5],  label: "Threshold: Maint → Gains" },
    { name: "yellow", color: "#eab308", pct: [ 0.2,  0.9],  label: "Maintenance → Gains" },
    { name: "orange", color: "#f97316", pct: [ 0.4,  1.2],  label: "Sweet-Spot Gains" },
    { name: "red",    color: "#ef4444", pct: [ 0.5,  1.4],  label: "Diminishing Returns (↑ total)" },
    { name: "purple", color: "#a855f7", pct: [ 0.6,  1.6],  label: "Hard Diminishing (↑ total)" },
  ];
  const fmt = (v) => `${v >= 0 ? "+" : ""}${Number(v).toFixed(1)}%`;
  const fmtRange = ([lo, hi]) => `${fmt(lo)} – ${fmt(hi)} / wk`;

  return (
    <section>
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

      
      <div
        style={{
          display: "grid",
          // Force a wider heatmap column so it stays large on mobile and induces horizontal scroll
          gridTemplateColumns: "minmax(320px, 1fr) minmax(170px, 420px)",
          gap: 24,
          alignItems: "start",
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >


        <MuscleHeatmapRegions
          data={heatData}
          view={view}
          side={side}
          onRegionClick={undefined}
          showLegend={false}
        />

                

        <div>
          <h3 style={{ marginTop: 0 }}>Modified sets/week — {view} regions</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 36px", columnGap: 6, rowGap: 6 }}>
            {Array.from(groups.entries()).map(([k, ids]) => (
              <React.Fragment key={k}>
                <div style={{ fontSize:13, opacity:.85 }}>{labelForGroup(k, ids)}</div>
                <div style={{ width:36, textAlign:"right", fontWeight:600 }}>
                  {groupCounts[k] ?? 0}
                </div>
              </React.Fragment>
            ))}
          </div>

            <h4 style={{ margin: "16px 0 8px" }}>Percentage of muscle lost or gained</h4>
        <div
          style={{
            display: "grid",
            gap: 8,
            marginTop: 4,
            maxWidth: 560,
          }}
          aria-label="Heatmap legend for weekly percent change per muscle region"
        >
          {legendRows.map((row) => (
            <div
              key={row.name}
              style={{
                display: "grid",
                gridTemplateColumns: "18px 1fr",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: row.color,
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
                }}
              />
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    fontSize: 14,
                    lineHeight: "18px",
                    color: "#111",
                  }}
                >
                  {fmtRange(row.pct)}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    opacity: 0.75,
                    whiteSpace: "nowrap",
                  }}
                >
                  • {row.label}
                </span>
              </div>
            </div>
          ))}
        </div>
         {/* <div style={{ marginTop: 24 }}>
            <ProgramMetrics
              catalogById={CATALOG_BY_ID}
              weeklySets={weeklySets}
              coverageByLR={coverageByLR}
              wEffort={wEffort}
              wHyp={wHyp}
              regionOrder={Array.from(groups.keys())}
              regionLabel={(rid) => labelForGroup(rid, groups.get(rid) || [rid])}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}

// --- page ----------------------------------------------------
export default function HeatmapRegions({ showPlanner = true, externalWeeklySets = null }) {
  // which photo / which layer
  const [side,  setSide]  = useState("front");   // 'front' | 'back'
  const [layer, setLayer] = useState("front");   // 'front' | 'back' | 'deep'
  const view = layer;

  // Raw planner rows (either via onPlanChange or legacy localStorage)
const [weeklySetsRaw, setWeeklySetsRaw] = useState([]);

const usingExternal = externalWeeklySets !== null;

// If parent supplies DB-driven sets, use them as the only source
useEffect(() => {
  if (usingExternal) setWeeklySetsRaw(externalWeeklySets || []);
}, [usingExternal, externalWeeklySets]);

// If the planner isn't calling onPlanChange, pull from legacy storage + event
useEffect(() => {
  if (usingExternal || !showPlanner) return;
  const syncFromLS = () => {
    const plan = loadLegacyPlannerPlan();
    const rows = flattenPlanToRows(plan);
    if (rows.length) setWeeklySetsRaw(rows);
  };

  // initial load
  if (!weeklySetsRaw.length) syncFromLS();

  // keep in sync with old event + storage changes
  window.addEventListener("planner-updated", syncFromLS);
  window.addEventListener("storage", syncFromLS);
  return () => {
    window.removeEventListener("planner-updated", syncFromLS);
    window.removeEventListener("storage", syncFromLS);
  };
}, [weeklySetsRaw.length, usingExternal, showPlanner]);

// Build name -> id map safely (once)
const nameToId = useMemo(() => {
  const entries = Object.entries(CATALOG_BY_ID || {}).filter(
    ([, lift]) => lift && typeof lift.name === "string"
  );
  return Object.fromEntries(entries.map(([id, lift]) => [lift.name.trim().toLowerCase(), id]));
}, []);

// Normalize rows to { liftId, sets, reps, RIR }
// Normalize rows to { liftId, sets, reps, RIR }.
// If parent passes externalWeeklySets, use that instead of the planner.
const weeklySets = useMemo(() => {
  if (externalWeeklySets !== null) {
    return externalWeeklySets;  // authoritative source for ThisWeeksWorkout
  }
  return normalizeWeeklySets(weeklySetsRaw, nameToId);
}, [externalWeeklySets, weeklySetsRaw, nameToId]);


// Optional: dev sanity logs
useEffect(() => {
  console.log("[Heatmap] weeklySetsRaw:", weeklySetsRaw);
  console.log("[Heatmap] weeklySets (normalized):", weeklySets);
  weeklySets.forEach(r => {
    if (!CATALOG_BY_ID[r.liftId]) console.warn("[Heatmap] unknown liftId:", r.liftId, r);
    if (!coverageByLR[r.liftId])  console.warn("[Heatmap] no coverage for:", r.liftId, CATALOG_BY_ID[r.liftId]?.name);
  });
}, [weeklySetsRaw, weeklySets]);


  // visible ids for this layer
  const visibleIds = useMemo(() => idsFor(view, side), [view, side]);

  // === Metrics (single source of truth) ======================
  // Compute modified sets per region using our new pipeline.
  const metrics = useMemo(() => {
    return computeModifiedSets({
      catalogById: CATALOG_BY_ID,
      weeklySets,
      coverageByLR,
      wEffort,
      wHyp,
      threshold: 0.40,
      floor: 0.30,
      gBoost: 0.12,
    });
  }, [weeklySets]);

  const modifiedSets = metrics.modifiedSets || {};

  // Build group totals for the view (sum left/right)
  const groups = useMemo(() => {
    const g = new Map();
    for (const id of visibleIds) {
      const k = groupKey(id);
      if (!g.has(k)) g.set(k, []);
      g.get(k).push(id);
    }
    return g; // Map<string, string[]>
  }, [visibleIds]);

  const { groupCounts, heatData, maxInView } = useMemo(() => {
    const gc = {};
    for (const [k, ids] of groups.entries()) {
      const sum = ids.reduce((acc, id) => acc + (modifiedSets[id] || 0), 0);
      const val = ids.length > 1 ? sum / ids.length : sum; // 👈 average L/R
      gc[k] = Math.round(val);
    }
    const maxGroup = Math.max(1, ...Object.values(gc));
    const nextHeat = { ...seed };
    for (const [k, ids] of groups.entries()) {
      const norm = (gc[k] || 0) / maxGroup;
      ids.forEach(id => { nextHeat[id] = norm; });
    }
  return { groupCounts: gc, heatData: nextHeat, maxInView: maxGroup };
  }, [groups, modifiedSets]);

  // label for a group: use the first member's label and strip (L)/(R)
  function labelForGroup(k, ids) {
    const meta = META_BY_ID[ids[0]];
    return (meta?.label ?? k).replace(/\s*\((L|R)\)\s*$/i, "");
  }

  // dev warnings to catch stray ids
  useMemo(() => {
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
    {showPlanner && !usingExternal && (
      <>
        <WeeklyPlannerPanel onPlanChange={setWeeklySetsRaw} />
        <hr style={{ margin: "28px 0" }} />
      </>
    )}

    <MetricsHeatmap
      side={side} setSide={setSide}
      layer={layer} setLayer={setLayer}
      view={view}
      heatData={heatData}
      maxInView={maxInView}
      groups={groups}
      groupCounts={groupCounts}
      weeklySets={weeklySets}
      labelForGroup={labelForGroup}
    />
  </div>
);
}
