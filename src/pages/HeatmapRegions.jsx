import { useMemo, useState } from "react";
import MuscleHeatmapRegions from "../components/MuscleHeatmapRegions.jsx";
import { REGION_META } from "../data/regions-config.js";
import WeeklyPlanner from "../components/WeeklyPlanner.jsx";

function idsFor(view) {
  return Object.values(REGION_META).filter(r => r.view === view).map(r => r.id);
}

const seed = Object.fromEntries(Object.values(REGION_META).map(r => [r.id, 0]));


export default function HeatmapRegions() {
  // Which photo to show (front/back)
  const [side, setSide] = useState("front");

  // Which regions to color (front/back/deep)
  const [layer, setLayer] = useState("front");
  const view = layer; // the component expects 'view' = 'front' | 'back' | 'deep'

  const [data, setData] = useState(seed);
  const visibleIds = useMemo(() => idsFor(view), [view]);

  const setAll = (val) =>
    setData(d => {
      const c = { ...d };
      for (const id of visibleIds) c[id] = val;
      return c;
    });

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
      <WeeklyPlanner />
      <hr style={{ margin: "28px 0" }} />
      <h1>Muscle Region Heatmaps</h1>

      {/* Four explicit modes */}
      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        <button onClick={() => { setSide("front"); setLayer("front"); }}
                disabled={side==="front" && layer==="front"}>Front (surface)</button>

        <button onClick={() => { setSide("back"); setLayer("back"); }}
                disabled={side==="back" && layer==="back"}>Back (surface)</button>

        <button onClick={() => { setSide("front"); setLayer("deep"); }}
                disabled={side==="front" && layer==="deep"}>Deep (front)</button>

        <button onClick={() => { setSide("back"); setLayer("deep"); }}
                disabled={side==="back" && layer==="deep"}>Deep (back)</button>

        <button onClick={() => setAll(0)} style={{ marginLeft:16 }}>Clear</button>
        <button onClick={() => setAll(1)}>Max</button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
        <MuscleHeatmapRegions
          data={data}
          view={view}   // which regions to color
          side={side}   // which photo to show
          onRegionClick={(id) =>
            setData(d => ({ ...d, [id]: Math.min(1, (d[id] ?? 0) + 0.1) }))
          }
        />

        <div>
          <h3 style={{ marginTop: 0 }}>Controls — {view} regions</h3>
          <div style={{ display:"grid", gridTemplateColumns:"auto 1fr auto", gap:8 }}>
            {visibleIds.map(id => (
              <div key={id} style={{ display:"contents" }}>
                <div style={{ fontSize:13, opacity:0.85 }}>{REGION_META[id].label}</div>
                <input
                  type="range" min={0} max={1} step={0.01}
                  value={Number.isFinite(data[id]) ? data[id] : 0}
                  onChange={(e) => setData(d => ({ ...d, [id]: Number(e.target.value) }))}
                />
                <div style={{ width:40, textAlign:"right" }}>
                  {(Number.isFinite(data[id]) ? data[id] : 0).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
