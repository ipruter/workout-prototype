import { useMemo, useState } from "react";
import MuscleHeatmapRegions from "../components/MuscleHeatmapRegions.jsx";
import { REGION_META } from "../data/regions-config.js";

function idsFor(view) {
  return Object.values(REGION_META).filter(r => r.view === view).map(r => r.id);
}

const seed = Object.fromEntries(Object.values(REGION_META).map(r => [r.id, 0]));

export default function HeatmapRegions() {
  const side = "front";                   // hardcode the background photo for now
  const [view, setView] = useState("front");   // front | back | deep
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
      <h1>Muscle Region Heatmaps</h1>

      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        <button onClick={() => setView("front")} disabled={view==="front"}>Surface Front</button>
        <button onClick={() => setView("back")}  disabled={view==="back"}>Surface Back</button>
        <button onClick={() => setView("deep")}  disabled={view==="deep"}>Deep</button>
        <button onClick={() => setAll(0)} style={{ marginLeft:16 }}>Clear</button>
        <button onClick={() => setAll(1)}>Max</button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
        <MuscleHeatmapRegions
          data={data}
          view={view}
          side={side}   // <<< background photo (front) for now
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
