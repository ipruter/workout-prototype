// src/pages/TodaysWorkout.jsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import SessionPlanner from "../components/SessionPlanner";
import { PROGRAMS } from "../data/program-registry";
import { resolveExercise } from "../utils/equipmentFallback";
import { getBodyweight as getKnownBodyweight } from "../utils/bodyweight";
import { getWeekBounds } from "../utils/week";
import {
  totalMinutes,
  estimateExerciseMinutes,
  getKnown1RM,            // still reads localStorage; we seed it from DB below
  estimate1RMFromWeight,
  weightFrom1RM,     // keeps local copy in sync when we overload
  setKnown1RM,            // for local mirror after DB upsert
} from "../utils/timeBudget";
import { bumpWithPropagation } from "../lib/overload-propagation";
import { CATALOG_BY_ID as LIFT_CATALOG } from "../data/lifts";

const LS_KEY = "selected-program";
const CATALOG_BY_ID = LIFT_CATALOG;
const LOCAL_PROGRAM_KEY = "selected-program";
// ---- inline draft persistence (per-day) ----
const LS_DRAFT_KEY = "tw-pending-plan-v1";
const todayStr = () => new Date().toISOString().slice(0, 10);

// ---------- small helpers ----------
function nowLabel(min) {
  const d = new Date();
  const wd = d.toLocaleDateString(undefined, { weekday: "short" });
  const mo = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `Today ${wd}, ${mo} (${min}m)`;
}

// Merge incoming 1RM map into localStorage (key: "orm-v1")
function seedLocalOrms(ormMap = {}) {
  try {
    const key = "orm-v1";
    const current = JSON.parse(localStorage.getItem(key) || "{}");
    const next = { ...current, ...ormMap };
    localStorage.setItem(key, JSON.stringify(next));
  } catch {}
}

// Fetch user's 1RMs from DB and seed localStorage so getKnown1RM works everywhere
async function syncOrmsFromDb() {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return;

  const { data, error } = await supabase
    .from("user_orms")
    .select("lift_id, one_rm")
    .eq("user_id", userId);

  if (error || !data) return;

  const map = {};
  for (const row of data) {
    if (row?.lift_id && Number.isFinite(+row.one_rm)) {
      map[row.lift_id] = +row.one_rm;
    }
  }
  seedLocalOrms(map);
}

// Upsert a single 1RM to Supabase and keep local mirror in sync
async function upsertOrm(liftId, oneRM) {
  if (!liftId || !Number.isFinite(oneRM)) return;
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return;

  await supabase
    .from("user_orms")
    .upsert([{ user_id: userId, lift_id: liftId, one_rm: Math.round(oneRM) }], {
      onConflict: "user_id,lift_id",
    });

  // Mirror to local so planner & metrics stay instant
  setKnown1RM(liftId, Math.round(oneRM));
}

async function getConsumedIndexThisWeek({ supabase }) {
  const { startIso, endIso } = getWeekBounds();
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return 0;

  const { data: routines, error: rErr } = await supabase
    .from("routines")
    .select("id")
    .gte("created_at", startIso)
    .lt("created_at", endIso)
    .eq("user_id", userId)
    .ilike("name", "Today%");

  if (rErr || !routines?.length) return 0;

  const routineIds = routines.map((r) => r.id);

  const { data: items, error: iErr } = await supabase
    .from("routine_items")
    .select("id")
    .in("routine_id", routineIds)
    .eq("user_id", userId);

  if (iErr) return 0;
  return items?.length ?? 0;
}

function generateFromMinutes(minutes, startIndex, sequence) {
  const rows = [];
  let used = 0;
  let i = startIndex;

  // Read equipment prefs once per generation (supports old & new keys)
  let blockedSet;
  try {
    const rawNew = localStorage.getItem("equipment-unavailable");
    const rawOld = localStorage.getItem("equipmentBlocked");
    let arr = [];
    if (rawNew) {
      const maybe = JSON.parse(rawNew);
      arr = Array.isArray(maybe) ? maybe : [];
    } else if (rawOld) {
      const obj = JSON.parse(rawOld) || {};
      arr = Object.keys(obj).filter((k) => !!obj[k]);
    }
    blockedSet = new Set(arr);
  } catch {
    blockedSet = new Set();
  }

  while (i < sequence.length) {
    const spec = sequence[i];

    // Resolve the spec.liftId using class-aware fallback rules.
    const resolved = resolveExercise(
      { id: spec.liftId, type: CATALOG_BY_ID?.[spec.liftId]?.type },
      blockedSet,
      CATALOG_BY_ID
    );
    if (!resolved) { i += 1; continue; }
    const resolvedId = resolved.id;

    const draft = {
      liftId: resolvedId,
      sets: spec.sets,
      reps: spec.reps,
      intensityPct: spec.intensityPct,
      weight: null,
      orm: getKnown1RM(resolvedId) ?? null,
    };

    const rawCost = Number(estimateExerciseMinutes(draft));
const cost = Number.isFinite(rawCost) ? rawCost : 8;

// STRICT order: if the next item doesn't fit, stop — no exceptions, no skipping
if (used + cost > minutes) break;

rows.push(draft);
used += cost;
i += 1;

  }

  return { rows, nextIndex: i };
}

export default function TodaysWorkout() {
  const [minutes, setMinutes] = useState(60);
  const [rows, setRows] = useState([]);
  const [successMarks, setSuccessMarks] = useState([]);
  const [open, setOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const [sequence, setSequence] = useState(PROGRAMS.default.list || []);
  const used = useMemo(() => totalMinutes(rows), [rows]);
  const [consumedIdx, setConsumedIdx] = useState(0);
  const [remaining, setRemaining] = useState((PROGRAMS.default.list || []).length);
  const [baseConsumedIdx, setBaseConsumedIdx] = useState(0);

  useEffect(() => {
  (async () => {
    await syncOrmsFromDb();

    // 1) Load user's selected program
    let key = "default";
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("selected_program")
          .eq("id", user.id)
          .maybeSingle();
        if (!error && data?.selected_program && PROGRAMS[data.selected_program]) {
          key = data.selected_program;
        }
      }
    } catch (e) {
      console.error(e);
    }
    const chosenList = PROGRAMS[key]?.list || [];
    setSequence(chosenList);

    // 2) Get base index from DB
    const idx = await getConsumedIndexThisWeek({ supabase });
    setBaseConsumedIdx(idx);
    setConsumedIdx(idx);
    setRemaining(Math.max(0, chosenList.length - idx));

    // 3) See if there’s a pending draft for today
    try {
      const raw = JSON.parse(localStorage.getItem(LS_DRAFT_KEY) || "null");

      if (raw && raw.date === todayStr()) {
        // Restore draft
        setMinutes(Number.isFinite(raw.minutes) ? raw.minutes : 60);
        setRows(Array.isArray(raw.rows) ? raw.rows : []);
        setSuccessMarks(Array.isArray(raw.successMarks) ? raw.successMarks : []);
        if (Number.isFinite(raw.consumedIdxNext)) setConsumedIdx(raw.consumedIdxNext);
        if (Number.isFinite(raw.baseConsumedIdx)) setBaseConsumedIdx(raw.baseConsumedIdx);
        setRemaining(Math.max(0, chosenList.length - (raw.consumedIdxNext ?? idx)));
      }
    } catch {}
  })();
}, []);

useEffect(() => {
  setRemaining(Math.max(0, sequence.length - consumedIdx));
}, [sequence, consumedIdx]);

useEffect(() => {
  if (!rows.length) return; // nothing to persist
  try {
    const raw = JSON.parse(localStorage.getItem(LS_DRAFT_KEY) || "{}");
    localStorage.setItem(LS_DRAFT_KEY, JSON.stringify({

      date: todayStr(),
      minutes,
      rows,
      successMarks,
      baseConsumedIdx: raw.baseConsumedIdx ?? baseConsumedIdx,
      consumedIdxNext: consumedIdx
    }));
  } catch {}
}, [rows, successMarks, minutes, consumedIdx, baseConsumedIdx]);


  function generateForMinutes() {
  const target = Math.max(10, Number(minutes) || 0);
  if (consumedIdx >= sequence.length) {
    alert("You’ve reached this week’s volume. Nice work!");
    return;
  }
  const { rows: planRows, nextIndex } = generateFromMinutes(target, consumedIdx, sequence);
  if (!planRows.length) {
    alert("Nothing fits in the selected time. Try a larger time window.");
    return;
  }

  setRows(planRows);
  setSuccessMarks(planRows.map(() => false));
  setIsCompleting(false);
  setHasCompleted(false);

  // reflect the hypothetical pointer advance in the UI
  setConsumedIdx(nextIndex);
  setRemaining(Math.max(0, sequence.length - nextIndex));

  // persist draft to LS
  try {
    localStorage.setItem(LS_DRAFT_KEY, JSON.stringify({

      date: todayStr(),
      minutes: target,
      rows: planRows,
      successMarks: planRows.map(() => false),
      baseConsumedIdx,        // so we can restore on cancel
      consumedIdxNext: nextIndex
    }));
  } catch {}
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
       const typedOne = estimate1RMFromWeight({
        weight: rw.weight,                 // BAR weight if user typed one
        intensityPct: rw.intensityPct,
        sets: rw.sets,
        liftId: rw.liftId,
        bodyweight: getKnownBodyweight() ?? 0,
      });

      const oneRM = Number.isFinite(rw.orm)
        ? rw.orm
        : Number.isFinite(typedOne)
        ? typedOne
        : getKnown1RM(rw.liftId) ?? null;

      const target_weight =
        rw.weight ??
        weightFrom1RM({
          oneRM,
          intensityPct: rw.intensityPct,
          sets: rw.sets,
          liftId: rw.liftId,
          bodyweight: getKnownBodyweight() ?? 0,
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

  // === draft helpers (inline panel) ===
function cancelDraft() {
  setRows([]);
  setSuccessMarks([]);
  setIsCompleting(false);
  setHasCompleted(false);
  setConsumedIdx(baseConsumedIdx);
  setRemaining(Math.max(0, sequence.length - baseConsumedIdx));
  try { localStorage.removeItem(LS_DRAFT_KEY); } catch {}
}


  function startComplete() {
  // Only allow one completion per opened modal
  if (isCompleting || hasCompleted) return;
  if (!rows.length) return;

  setIsCompleting(true);
  setHasCompleted(true);
  setOpen(false); // close immediately so extra clicks can’t happen

  (async () => {
    try {
      await handleComplete();
    } finally {
      // Keep hasCompleted=true so the same plan can't be re-saved
      setIsCompleting(false);
    }
  })();
}

  async function handleComplete() {
  if (hasCompleted || isCompleting) return;

  try {
    await saveToDb();

    // 1) Persist a baseline 1RM for every row we generated (new lifts will now get saved)
    rows.forEach((rw) => {
      const baseline =
        (Number.isFinite(rw.orm) ? rw.orm : null) ??
        estimate1RMFromWeight({
          weight: rw.weight,
          intensityPct: rw.intensityPct,
          sets: rw.sets,
          liftId: rw.liftId,
        });

      if (Number.isFinite(baseline) && baseline > 0) {
        setKnown1RM(rw.liftId, Math.round(baseline));
      }
    });

    // 2) Apply progressive overload for checked rows (this also calls setKnown1RM under the hood)
    rows.forEach((rw, idx) => {
      if (!successMarks[idx]) return;
      const base =
        (Number.isFinite(rw.orm) ? rw.orm : null) ??
        getKnown1RM(rw.liftId) ??
        estimate1RMFromWeight({
          weight: rw.weight,
          intensityPct: rw.intensityPct,
          sets: rw.sets,
          liftId: rw.liftId,
        });

      if (Number.isFinite(base)) {
        bumpWithPropagation(rw.liftId);
      }
    });

    // keep your max_lifts log behavior for the primary lift(s)
    for (let idx = 0; idx < rows.length; idx++) {
      if (!successMarks[idx]) continue;
      const rw = rows[idx];
      const base =
        (Number.isFinite(rw.orm) ? rw.orm : null) ??
        getKnown1RM(rw.liftId) ??
        estimate1RMFromWeight({
          weight: rw.weight,
          intensityPct: rw.intensityPct,
          sets: rw.sets,
        });

      if (Number.isFinite(base)) {
        const bumped = Math.round(base * 1.025);
        await upsertOrm(rw.liftId, bumped);
      }
    }

    const newIdx = await getConsumedIndexThisWeek({ supabase });
    setBaseConsumedIdx(newIdx);
    setConsumedIdx(newIdx);
    setRemaining(Math.max(0, sequence.length - newIdx));

    // clear inline draft + planner rows
    try { localStorage.removeItem(LS_DRAFT_KEY); } catch {}
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

      {/* Inline planner panel (persists as draft until Complete or Cancel) */}
<div
  style={{
    marginTop: 12,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  {rows.length === 0 ? (
    <div style={{ opacity: 0.8 }}>No workout created yet today.</div>
  ) : (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Today’s workout (draft)</h3>
        <div style={{ fontWeight: 600 }}>Used: {used.toFixed(1)} / {minutes} min</div>
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
          onClick={cancelDraft}
        >
          Cancel
        </button>
        <button
          onMouseDown={() => document.activeElement?.blur()}
          onClick={startComplete}
          disabled={isCompleting || hasCompleted}
          style={{
            background: "#0a7",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: 8,
            opacity: (isCompleting || hasCompleted) ? 0.6 : 1,
            cursor: (isCompleting || hasCompleted) ? "not-allowed" : "pointer",
          }}
        >
          {isCompleting ? "Saving…" : "Complete workout"}
        </button>
      </div>
    </>
  )}
</div>

    </div>
  );
}
