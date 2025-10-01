// src/lib/dbApi.js
import { supabase } from "./supabaseClient";

/* ---------------- helpers ---------------- */

async function currentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export function estimateWeightFrom1RM(oneRepMax, reps = 8) {
  // Epley inverse: 1RM = w * (1 + r/30) → w = 1RM / (1 + r/30)
  if (!oneRepMax) return null;
  return oneRepMax / (1 + reps / 30);
}

export function roundTo5(x) {
  return Math.round(x / 5) * 5;
}

/* ---------------- routine APIs ---------------- */

export async function createRoutine(name, items = []) {
  const user = await currentUser();
  if (!user) throw new Error("Not signed in");

  const { data: routine, error } = await supabase
    .from("routines")
    .insert({ name, user_id: user.id })
    .select()
    .single();
  if (error) throw error;

  if (items.length) {
    const rows = items.map((it, idx) => ({
      user_id: user.id,
      routine_id: routine.id,
      exercise_id: it.exercise_id,
      position: (it.position ?? idx) + 1,
      target_sets: it.target_sets ?? null,
      target_reps: it.target_reps ?? null,
      target_weight: it.target_weight ?? null,
      notes: it.notes ?? null,
    }));
    const { error: e2 } = await supabase.from("routine_items").insert(rows);
    if (e2) throw e2;
  }

  return routine;
}

export async function markRoutineCompleted(routine_id) {
  const { error } = await supabase
    .from("routines")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", routine_id);
  if (error) throw error;
}

export async function getRoutinesBetween({ startIso, endIso }) {
  return supabase
    .from("routines")
    .select("id,name,created_at,completed_at")
    .gte("created_at", startIso)
    .lt("created_at", endIso)
    .order("created_at", { ascending: true });
}

export async function getRoutineItems(routine_id) {
  const { data, error } = await supabase
    .from("routine_items")
    .select("id,exercise_id,target_sets,target_reps,target_weight,position")
    .eq("routine_id", routine_id)
    .order("position", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getExerciseNamesByIds(ids) {
  if (!ids.length) return {};
  const { data, error } = await supabase
    .from("exercises")
    .select("id,name")
    .in("id", ids);
  if (error) throw error;
  const map = {};
  (data || []).forEach((e) => (map[e.id] = e.name));
  return map;
}

/* ---------------- weekly info ---------------- */

export async function getWeeklyExerciseCounts({ startIso, endIso }) {
  const { data: rs } = await supabase
    .from("routines")
    .select("id")
    .gte("created_at", startIso)
    .lt("created_at", endIso);

  const routineIds = (rs || []).map((r) => r.id);
  if (!routineIds.length) return {};

  const { data: items } = await supabase
    .from("routine_items")
    .select("exercise_id")
    .in("routine_id", routineIds);

  const counts = {};
  (items || []).forEach((it) => {
    counts[it.exercise_id] = (counts[it.exercise_id] || 0) + 1;
  });
  return counts;
}

export async function listExercisesByNames(names) {
  const { data, error } = await supabase
    .from("exercises")
    .select("id,name")
    .in("name", names);
  if (error) throw error;
  return data || [];
}

/* ---------------- 1RM / overload ---------------- */

export async function getCurrentMaxMap(exerciseIds) {
  if (!exerciseIds.length) return {};
  const { data, error } = await supabase
    .from("current_maxes")
    .select("exercise_id,one_rep_max");
  if (error) throw error;

  // filter only requested ones
  const map = {};
  (data || []).forEach((row) => {
    if (exerciseIds.includes(row.exercise_id)) map[row.exercise_id] = Number(row.one_rep_max);
  });
  return map;
}

/** When a workout is completed, bump selected exercises' 1RM by +2.5% and record it */
export async function applyOverload(exerciseIds, fallbackEstimates = {}) {
  const user = await currentUser();
  if (!user) throw new Error("Not signed in");

  const current = await getCurrentMaxMap(exerciseIds);

  const rows = exerciseIds.map((exId) => {
    const base =
      current[exId] ??
      (fallbackEstimates[exId] ?? null); // if no current 1RM, use estimated from today’s weight

    if (!base) return null;
    const newMax = base * 1.025; // +2.5%
    return {
      user_id: user.id,
      exercise_id: exId,
      one_rep_max: Number(newMax.toFixed(2)),
      method: "overload",
      measured_at: new Date().toISOString().slice(0, 10),
    };
  }).filter(Boolean);

  if (!rows.length) return;

  const { error } = await supabase.from("max_lifts").insert(rows);
  if (error) throw error;
}
