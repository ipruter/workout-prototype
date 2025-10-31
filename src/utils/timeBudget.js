// src/lib/timeBudget.js  (or wherever your file currently lives)

// --- Per-set intensity decay ---
// ~exp(-0.1*(n-1)) ≈ 0.905^(n-1)
export function setDecayFactor(n = 1) {
  const k = -0.1;
  return Math.exp(k * (Math.max(1, n) - 1));
}

import { getBodyweight, getLiftBodyweightPct } from "../utils/bodyweight";
import { CATALOG_BY_ID } from "../data/lifts"; // kept for compatibility if you reference ids elsewhere
import { supabase } from "../lib/supabaseClient";
import { PROGRAMS } from "../data/program-registry";

// ---------- bodyweight helpers ----------
function bwComponentForLift(liftId) {
  const bw = getBodyweight() ?? 0;
  const pct = getLiftBodyweightPct(liftId) || 0;
  return bw * pct; // lbs contributed by bodyweight for this lift
}

// convert the bar load the user types/sees → total system load moved
function toSystemLoad(liftId, barWeight) {
  const bar = Number(barWeight);
  if (!Number.isFinite(bar)) return null;
  return bar + bwComponentForLift(liftId);
}

// convert total system load → bar load that should be shown/typed
function toBarLoad(liftId, systemLoad) {
  const sys = Number(systemLoad);
  if (!Number.isFinite(sys)) return null;
  return sys - bwComponentForLift(liftId);
}

export function roundTo(x, inc = 5) {
  if (!Number.isFinite(x)) return null;
  return Math.round(x / inc) * inc;
}

// ---------- 1RM estimation and forward calc ----------
// 1RM ≈ (system load) / (intensity% * decay(sets))
export function estimate1RMFromWeight({
  liftId,
  weight,          // bar weight the user typed
  intensityPct = 75,
  sets = 1,
}) {
  const sys = toSystemLoad(liftId, weight);
  const ip = Number(intensityPct);
  const s = Math.max(1, Number(sets) || 1);

  if (!Number.isFinite(sys) || sys <= 0 || !Number.isFinite(ip) || ip <= 0) {
    return null;
  }

  const decay = setDecayFactor(s);
  const frac = (ip / 100) * decay;
  if (frac <= 0) return null;
  return sys / frac; // 1RM in system-load space
}

// Working weight minutes use **bar weight** for warmups.
export function warmupSetsForWeight(W, { a = 0.5, b = 0.8, Smax = 7 } = {}) {
  const v = Number(W);
  if (!Number.isFinite(v) || v <= 0) return 1;
  const s = Math.floor(a * Math.log2(v) + b);
  return Math.max(1, Math.min(Smax, s));
}

// Prefer explicit bar **weight**; otherwise derive bar weight from 1RM.
export function estimateExerciseMinutes({
  liftId,
  sets = 3,
  intensityPct = 75,
  weight = null,  // bar weight (may be negative for assistance)
  orm = null,     // 1RM (system-load)
}) {
  let workingBar = Number(weight);

  // If no explicit bar weight, derive from 1RM → system target → bar target
  if (!Number.isFinite(workingBar)) {
    const knownOrm =
      Number.isFinite(orm) ? orm : getKnown1RM(liftId); // from local storage
    if (Number.isFinite(knownOrm)) {
      const s = Math.max(1, Number(sets) || 1);
      const ip = Number(intensityPct) || 0;
      const fatigue = Math.exp(-0.1 * (s - 1));
      const systemTarget = knownOrm * (ip / 100) * fatigue;
      const barTarget = toBarLoad(liftId, systemTarget);
      if (Number.isFinite(barTarget)) {
        workingBar = roundTo(barTarget, 5);
      }
    }
  }

  // If still unknown, default 15 min
  if (!Number.isFinite(workingBar)) return 15;

  // No warm-up for negative/assisted “bar” loads
  const wu = warmupSetsForWeight(Math.max(0, workingBar));
  return wu * 1.5 + (Number(sets) || 0) * 3.0;
}

export function totalMinutes(rows = []) {
  return rows.reduce((acc, r) => acc + estimateExerciseMinutes(r), 0);
}

// ---- 1RM persistence helpers (local storage) ----
export function getKnown1RM(liftId) {
  const keys = ["orm-v1", "orms-v1", "one_rep_maxes", "1rm"];
  for (const k of keys) {
    try {
      const m = JSON.parse(localStorage.getItem(k) || "null");
      if (m && Number.isFinite(+m[liftId])) return +m[liftId];
    } catch {}
  }
  return null;
}

/** Load all 1RMs for the signed-in user into localStorage ("orm-v1"). Call once on app start. */
export async function preloadDb1RMs() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return; // not signed in yet
    const { data, error } = await supabase
      .from("user_orms")
      .select("lift_id, one_rm")
      .eq("user_id", user.id);
    if (error) { console.warn("[1RM preload] fetch error", error); return; }

    const map = {};
    for (const row of data || []) {
      const v = Number(row.one_rm);
      if (Number.isFinite(v) && v > 0) map[row.lift_id] = Math.round(v);
    }
    localStorage.setItem("orm-v1", JSON.stringify(map));
  } catch (e) {
    console.warn("[1RM preload] failed", e);
  }
}

/** Write 1RM locally AND upsert to DB (fire-and-forget). API stays synchronous. */
export function setKnown1RM(liftId, value) {
  try {
    const key = "orm-v1";
    const map = JSON.parse(localStorage.getItem(key) || "{}");
    map[liftId] = Math.round(value);
    localStorage.setItem(key, JSON.stringify(map));
  } catch {}

  // Background DB upsert; we don't await to keep callers sync-friendly
  (async () => {
    try {
      const v = Number(value);
      if (!Number.isFinite(v) || v <= 0) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await supabase.from("user_orms").upsert({
        user_id: user.id,
        lift_id: liftId,
        one_rm: Math.round(v),
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("[1RM upsert] failed", e);
    }
  })();
}

export function bumpOneRMPercent(liftId, baseOrm, pct = 1.5) {
  if (!Number.isFinite(baseOrm) || baseOrm <= 0) return null;
  const bumped = Math.round(baseOrm * (1 + pct / 100));
  setKnown1RM(liftId, bumped);
  return bumped;
}

// Per-set attenuation (kept for reference)
export function setAttenuation(sets) {
  const n = Math.max(1, Number(sets) || 1);
  return Math.exp(-0.1 * (n - 1));
}

// Given 1RM (system-load), compute **bar load** to show/type.
// May be negative if bodyweight component exceeds target system load.
export function weightFrom1RM({ liftId, oneRM, intensityPct, sets }) {
  if (
    !Number.isFinite(oneRM) ||
    !Number.isFinite(intensityPct) ||
    !Number.isFinite(sets)
  ) {
    return null;
  }
  const fatigue = Math.exp(-0.1 * (sets - 1));
  const systemTarget = oneRM * (intensityPct / 100) * fatigue; // system load
  const barTarget = toBarLoad(liftId, systemTarget);            // show bar
  return roundTo(barTarget, 5);
}

/* Back-compat alias if some old code imported this name */
export const getKnownBodyweight = getBodyweight;

/* =========================
   Program-aware helpers
   ========================= */

// Read the user’s selected program from profiles; default to 'default'
async function getActiveProgramKey() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return "default";
  const { data, error } = await supabase
    .from("profiles")
    .select("selected_program")
    .eq("id", user.id)
    .single();
  if (error) return "default";
  return data?.selected_program || "default";
}

// Read pointer for (user, program); create row at 0 if missing
async function getProgramPointer(programKey) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data, error } = await supabase
    .from("user_program_state")
    .select("pointer")
    .eq("user_id", user.id)
    .eq("program_key", programKey)
    .single();

  if (error || !data) {
    await supabase.from("user_program_state").upsert(
      { user_id: user.id, program_key: programKey, pointer: 0 },
      { onConflict: "user_id,program_key" }
    );
    return 0;
  }

  return Number(data.pointer) || 0;
}

/**
 * Get the next prescription item for Time Budget based on the
 * user's selected program and that program's pointer.
 * Returns { programKey, pointer, item }.
 */
export async function getNextTimeBudgetItem() {
  const programKey = await getActiveProgramKey();
  const pointer = await getProgramPointer(programKey);
  const list = PROGRAMS[programKey]?.list || [];
  if (!list.length) return { programKey, pointer, item: null };
  const item = list[pointer % list.length];
  return { programKey, pointer, item };
}

/**
 * After a session completes, advance the program pointer by `steps` (default 1).
 * Returns the new pointer value.
 */
export async function advanceProgramPointer(steps = 1) {
  const programKey = await getActiveProgramKey();
  const listLen = (PROGRAMS[programKey]?.list || []).length || 1;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data } = await supabase
    .from("user_program_state")
    .select("pointer")
    .eq("user_id", user.id)
    .eq("program_key", programKey)
    .single();

  const current = Number(data?.pointer) || 0;
  const next = (current + steps) % listLen;

  await supabase.from("user_program_state").upsert(
    {
      user_id: user.id,
      program_key: programKey,
      pointer: next,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,program_key" }
  );

  return next;
}
