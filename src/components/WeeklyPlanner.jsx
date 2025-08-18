// src/components/WeeklyPlanner.jsx
import { useEffect, useState } from "react";
import { WORKOUTS } from "../data/workouts.js";

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
const STORAGE_PLAN = "planner-v1";
const STORAGE_1RM  = "one-rep-max-v1";
const round5 = (x) => Math.round(x/5)*5;

export default function WeeklyPlanner() {
  // plan: { Mon: [ {id,name,sets,reps,intensity} ], ... }
  const empty = Object.fromEntries(DAYS.map(d => [d, []]));
  const [plan, setPlan] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_PLAN)) ?? empty; } catch { return empty; }
  });

  // global 1RM map by workout slug
  const [oneRM, setOneRM] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_1RM)) ?? {}; } catch { return {}; }
  });

  useEffect(()=>localStorage.setItem(STORAGE_PLAN, JSON.stringify(plan)), [plan]);
  useEffect(()=>localStorage.setItem(STORAGE_1RM, JSON.stringify(oneRM)), [oneRM]);

  const addWorkout = (day, name) => {
    if (!name) return;
    const id = (crypto.randomUUID?.() ?? String(Date.now()+Math.random()));
    setPlan(p => ({ ...p, [day]: [...p[day], { id, name, sets:3, reps:6, intensity:75 }] }));
  };

  const updateWorkout = (day, id, patch) =>
    setPlan(p => ({ ...p, [day]: p[day].map(w => w.id===id ? { ...w, ...patch } : w) }));

  const removeWorkout = (day, id) =>
    setPlan(p => ({ ...p, [day]: p[day].filter(w => w.id !== id) }));

  const calcWeight = (name, intensity) => {
    const rm = Number(oneRM[slug(name)]);
    if (!Number.isFinite(rm) || rm <= 0) return "—";
    return round5(rm * (Number(intensity)||0) / 100);
  };

  const setRM = (name, val) =>
    setOneRM(m => ({ ...m, [slug(name)]: Math.max(0, Number(val)||0) }));

  const card = { border:"1px solid #eee", borderRadius:12, padding:10, background:"#fff" };

  return (
    <section>
      <h2 style={{ marginBottom: 8 }}>Weekly Workout Builder</h2>
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>
        Select a workout for each day. Weight = <em>Intensity % × 1RM</em> (rounded to 5). Set a 1RM per lift once and it’s remembered.
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:12 }}>
        {DAYS.map(day => (
          <div key={day} style={card}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <strong>{day}</strong>
              <select
                value=""
                onChange={(e)=>{ addWorkout(day, e.target.value); e.target.selectedIndex = 0; }}
                style={{ marginLeft:"auto" }}
              >
                <option value="" disabled>Add workout…</option>
                {WORKOUTS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* Day list (scrollable) */}
            <div style={{ maxHeight: 280, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 }}>
              {plan[day].map(w => (
                <div key={w.id} style={{ border:"1px solid #f2f2f2", borderRadius:10, padding:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <div style={{ fontWeight:600, flex:1, minWidth:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }} title={w.name}>
                      {w.name}
                    </div>
                    <button onClick={()=>removeWorkout(day, w.id)} title="Remove">✕</button>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:8, alignItems:"center" }}>
                    <label style={{ fontSize:12, opacity:0.8 }}>Sets
                      <input type="number" min={0} max={20} value={w.sets}
                        onChange={e=>updateWorkout(day, w.id, { sets: Math.max(0, Number(e.target.value)||0) })}
                        style={{ width:"100%", padding:"6px 8px", border:"1px solid #ddd", borderRadius:8 }} />
                    </label>

                    <label style={{ fontSize:12, opacity:0.8 }}>Reps
                      <input type="number" min={0} max={50} value={w.reps}
                        onChange={e=>updateWorkout(day, w.id, { reps: Math.max(0, Number(e.target.value)||0) })}
                        style={{ width:"100%", padding:"6px 8px", border:"1px solid #ddd", borderRadius:8 }} />
                    </label>

                    <label style={{ fontSize:12, opacity:0.8 }}>Intensity %
                      <input type="number" min={0} max={120} value={w.intensity}
                        onChange={e=>updateWorkout(day, w.id, { intensity: Math.max(0, Math.min(120, Number(e.target.value)||0)) })}
                        style={{ width:"100%", padding:"6px 8px", border:"1px solid #ddd", borderRadius:8 }} />
                    </label>

                    <label style={{ fontSize:12, opacity:0.8 }}>1RM
                      <input type="number" min={0} value={oneRM[slug(w.name)] ?? ""}
                        onChange={e=>setRM(w.name, e.target.value)}
                        placeholder="e.g. 225"
                        style={{ width:"100%", padding:"6px 8px", border:"1px solid #ddd", borderRadius:8 }} />
                    </label>

                    <div style={{ fontSize:12, opacity:0.8 }}>
                      Weight<br/>
                      <div style={{ fontWeight:600, fontSize:14 }}>{calcWeight(w.name, w.intensity)}</div>
                    </div>
                  </div>
                </div>
              ))}

              {plan[day].length === 0 && (
                <div style={{ opacity:0.6, fontSize:12 }}>No workouts yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
