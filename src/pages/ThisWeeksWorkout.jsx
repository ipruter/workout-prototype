// src/pages/ThisWeeksWorkout.jsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import HeatmapRegions from "./HeatmapRegions.jsx";
import { getWeekBounds } from "../utils/week";

function fmtDate(dt) {
  return new Date(dt).toLocaleString();
}

export default function ThisWeeksWorkout() {
  const [sessions, setSessions] = useState([]);
  const [weeklySetsFromDb, setWeeklySetsFromDb] = useState([]); // ← for heatmap
  const [loading, setLoading] = useState(true);
  const { startIso, endIso } = getWeekBounds();

  async function load() {
    setLoading(true);

    // must be signed in for RLS
    const { data: auth } = await supabase.auth.getUser();
    const userId = auth?.user?.id;
    if (!userId) {
      setSessions([]);
      setWeeklySetsFromDb([]);
      setLoading(false);
      return;
    }

    // 1) Fetch this week's routines for the user
    const { data: routines, error: rErr } = await supabase
      .from("routines")
      .select("id,name,created_at")
      .gte("created_at", startIso)
      .lt("created_at", endIso)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (rErr) {
      console.error(rErr);
      setSessions([]);
      setWeeklySetsFromDb([]);
      setLoading(false);
      return;
    }
    setSessions(routines || []);

    // 2) Fetch routine_items for those routines
    const ids = (routines || []).map((r) => r.id);
    if (!ids.length) {
      setWeeklySetsFromDb([]);
      setLoading(false);
      return;
    }

    const { data: items, error: iErr } = await supabase
      .from("routine_items")
      .select("lift_id,target_sets,target_reps")
      .in("routine_id", ids)
      .eq("user_id", userId);

    if (iErr) {
      console.error(iErr);
      setWeeklySetsFromDb([]);
      setLoading(false);
      return;
    }

    // 3) Map DB rows -> heatmap’s expected shape
    const rows = (items || [])
      .map((it) => ({
        liftId: it.lift_id,                   // our string key (e.g., "bb_bench")
        sets: Number(it.target_sets) || 0,    // ignore invalid/zero sets downstream
        reps: Number(it.target_reps) || undefined,
      }))
      .filter((r) => r.liftId && r.sets > 0);

    setWeeklySetsFromDb(rows);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
      <h2>This week’s workout</h2>
      <p style={{ color: "#666", marginTop: -6 }}>
        Sessions created from “Today’s workout” since Sunday. Resets each Sunday.
      </p>

      <button onClick={load} style={{ margin: "8px 0 16px", padding: "8px 12px" }}>
        Refresh
      </button>

      {loading ? (
        <div>Loading…</div>
      ) : sessions.length ? (
        <ol style={{ display: "grid", gap: 8, paddingLeft: 20 }}>
          {sessions.map((s, i) => (
            <li
              key={s.id}
              style={{
                border: "1px solid #e3e3e3",
                borderRadius: 12,
                padding: 12,
                listStyle: "decimal",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  Session {i + 1} — {s.name}
                </div>
                <div style={{ fontSize: 12, color: "#777" }}>{fmtDate(s.created_at)}</div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div style={{ color: "#777" }}>No sessions yet this week.</div>
      )}

      {/* --- Heatmap fed by DB items (planner hidden here) --- */}
      <div style={{ marginTop: 24 }}>
        <HeatmapRegions
  showPlanner={false}
  externalWeeklySets={weeklySetsFromDb}  // <-- use this name
  key={`db-${weeklySetsFromDb?.length ?? 0}`} // force remount when it changes
/>
      </div>
    </div>
  );
}
