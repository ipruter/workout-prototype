// src/pages/TodaysWorkout.jsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import SessionPlanner from "../components/SessionPlanner";
import { WEEKLY_SEQUENCE } from "../data/weekly-sequence";
import { getWeekBounds } from "../utils/week";
import {
  totalMinutes,
  estimateExerciseMinutes,
  getKnown1RM,
  estimate1RMFromWeight,
  weightFrom1RM,
  bumpOneRMPercent,
  setKnown1RM,
} from "../utils/timeBudget";

// ---------- helpers ----------
function nowLabel(min) {
  const d = new Date();
  const wd = d.toLocaleDateString(undefined, { weekday: "short" });
  const mo = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `Today ${wd}, ${mo} (${min}m)`;
}

async function getConsumedIndexThisWeek({ supabase }) {
  const { startIso, endIso } = getWeekBounds();
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return 0;

  // Get routines from this week created by “Today’s workout”
  const { data: routines, error: rErr } = await supabase
    .from("routines")
    .select("id")
    .gte("created_at", startIso)
    .lt("created_at", endIso)
    .eq("user_id", userId)
    .ilike("name", "Today%");

  if (rErr || !routines?.length) return 0;

  const routineIds = routines.map((r) => r.id);

  // Count all routine_items in those routines
  const { data: items, error: iErr } = await supabase
    .from("routine_items")
    .select("id")
    .in("routine_id", routineIds)
    .eq("user_id", userId);

  if (iErr) return 0;
  return items?.length ?? 0;
}

// Build rows to fit into target minutes, starting at weekly index
function generateFromMinutes(minutes, startIndex) {
  const rows = [];
  let used = 0;
  let i = startIndex;

  while (i < WEEKLY_SEQUENCE.length) {
    const spec = WEEKLY_SEQUENCE[i]; // { liftId, sets, reps, intensityPct }

    // Draft row; keep weight derived (null) and seed with known 1RM if we have it
    const draft = {
      liftId: spec.liftId,
      sets: spec.sets,
      reps: spec.reps,
      intensityPct: spec.intensityPct,
      weight: null,
      orm: getKnown1RM(spec.liftId) ?? null,
    };

    const cost = estimateExerciseMinutes(draft);

    if (rows.length === 0 || used + cost <= minutes) {
      rows.push(draft);
      used += cost;
      i += 1;
    } else {
      break;
    }
  }

  return { rows, nextIndex: i };
}

// ---------- modal ----------
function PlanModal({
  open,
  minutes,
  rows,
  setRows,
  successMarks,
  setSuccessMarks,
  onCancel,
  onComplete,
}) {
  useEffect(() => {
    if (open) setSuccessMarks(rows.map((_, i) => successMarks?.[i] || false));
  }, [open, rows, setSuccessMarks, successMarks]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "grid",
        placeItems: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "min(840px, 94vw)",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Today’s workout</h3>
          <button onClick={onCancel} aria-label="close">✕</button>
        </div>

        <SessionPlanner
          targetMinutes={minutes}
          value={rows}
          onChange={(next) => {
            setRows(next);
            setSuccessMarks((prev = []) => next.map((_, i) => prev[i] || false));
          }}
          hidePicker
          successMarks={successMarks}
          onToggleSuccess={(i, val) =>
            setSuccessMarks((prev) => {
              const arr = prev.slice();
              arr[i] = val;
              return arr;
            })
          }
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <button
  onMouseDown={() => document.activeElement?.blur()}
  onClick={onCancel}
  aria-label="close"
>
  ✕
</button>
          <button
  onMouseDown={() => {
    // Ensure any focused weight input blurs *before* click
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  }}
  onClick={() => {
    // Let the onBlur commit update state first, then save
    setTimeout(onComplete, 0);
  }}
  style={{ background: "#0a7", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8 }}
>
  Complete workout
</button>

        </div>
      </div>
    </div>
  );
}

// ---------- page ----------
export default function TodaysWorkout() {
  const [minutes, setMinutes] = useState(60);
  const [rows, setRows] = useState([]);
  const [successMarks, setSuccessMarks] = useState([]);
  const [open, setOpen] = useState(false);

  const used = useMemo(() => totalMinutes(rows), [rows]);
  const [consumedIdx, setConsumedIdx] = useState(0);
  const [remaining, setRemaining] = useState(WEEKLY_SEQUENCE.length);

  useEffect(() => {
    (async () => {
      const idx = await getConsumedIndexThisWeek({ supabase });
      setConsumedIdx(idx);
      setRemaining(Math.max(0, WEEKLY_SEQUENCE.length - idx));
    })();
  }, []);

  function generateForMinutes() {
    const target = Math.max(10, Number(minutes) || 0);
    if (consumedIdx >= WEEKLY_SEQUENCE.length) {
      alert("You’ve reached this week’s volume. Nice work!");
      return;
    }
    const { rows: planRows, nextIndex } = generateFromMinutes(target, consumedIdx);
    if (!planRows.length) {
      alert("Nothing fits in the selected time. Try a larger time window.");
      return;
    }
    setRows(planRows);
    setSuccessMarks(planRows.map(() => false));
    setOpen(true);

    // optimistic advance; confirmed after save
    setConsumedIdx(nextIndex);
    setRemaining(Math.max(0, WEEKLY_SEQUENCE.length - nextIndex));
  }

  async function saveToDb() {
    const name = nowLabel(minutes);

    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;
    if (!user) {
      alert("Please sign in first.");
      return;
    }

    const { data: routine, error: rErr } = await supabase
      .from("routines")
      .insert([{ name, user_id: user.id }])
      .select()
      .single();

    if (rErr) throw rErr;

    const items = rows.map((rw) => {
      // If user typed weight, infer 1RM from it; otherwise use row.orm or stored 1RM
      const typedOne = estimate1RMFromWeight({
        weight: rw.weight,
        intensityPct: rw.intensityPct,
        sets: rw.sets,
      });

      const oneRM = Number.isFinite(rw.orm)
        ? rw.orm
        : Number.isFinite(typedOne)
        ? typedOne
        : getKnown1RM(rw.liftId) ?? null;

      // Persist concrete working weight (typed or derived)
      const target_weight = Number.isFinite(rw.weight)
        ? rw.weight
        : weightFrom1RM({
            oneRM,
            intensityPct: rw.intensityPct,
            sets: rw.sets,
          });

      return {
        routine_id: routine.id,
        user_id: user.id,
        lift_id: rw.liftId,
        target_sets: rw.sets,
        target_reps: rw.reps,
        intensity_pct: rw.intensityPct,
        target_weight: Number.isFinite(target_weight) ? target_weight : null,
        one_rm: Number.isFinite(oneRM) ? Math.round(oneRM) : null,
      };
    });

    const { error: iErr } = await supabase.from("routine_items").insert(items);
    if (iErr) throw iErr;
  }

  async function handleComplete() {
    try {
      // Save this session
      await saveToDb();
      rows.forEach((rw) => {
  if (Number.isFinite(rw.orm) && rw.orm > 0) {
    setKnown1RM(rw.liftId, Math.round(rw.orm));
  }
});

      // Apply overload to checked lifts
      rows.forEach((rw, idx) => {
        if (!successMarks[idx]) return;

        const base =
          (Number.isFinite(rw.orm) ? rw.orm : null) ??
          getKnown1RM(rw.liftId) ??
          estimate1RMFromWeight({
            weight: rw.weight,
            intensityPct: rw.intensityPct,
            sets: rw.sets,
          });

        if (Number.isFinite(base)) bumpOneRMPercent(rw.liftId, base, 2.5);
      });

      // Refresh position based on DB
      const newIdx = await getConsumedIndexThisWeek({ supabase });
      setConsumedIdx(newIdx);
      setRemaining(Math.max(0, WEEKLY_SEQUENCE.length - newIdx));

      // Reset UI
      setOpen(false);
      setRows([]);
      setSuccessMarks([]);
      alert("Workout saved and overloads applied.");
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to complete workout.");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h2>Today’s workout</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <label>
          How many minutes?
          <input
            type="number"
            min="10"
            step="5"
            value={minutes}
            onChange={(e) => setMinutes(+e.target.value)}
            style={{ marginLeft: 8, width: 90 }}
          />
        </label>
        <button onClick={generateForMinutes} style={{ marginLeft: 8 }}>
          Generate plan
        </button>
        <div style={{ marginLeft: "auto", fontWeight: 600 }}>
          Used: {used.toFixed(1)} / {minutes} min
        </div>
      </div>

      <PlanModal
        open={open}
        minutes={minutes}
        rows={rows}
        setRows={setRows}
        successMarks={successMarks}
        setSuccessMarks={setSuccessMarks}
        onCancel={() => setOpen(false)}
        onComplete={handleComplete}
      />
    </div>
  );
}