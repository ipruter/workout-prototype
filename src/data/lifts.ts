export type LiftId = string;

// src/data/workouts.js
// Source of truth: CATALOG_BY_ID
// WORKOUTS is derived from it so lists stay in sync.

export const CATALOG_BY_ID = {
  // Chest / Press
  bb_bench:     { name: "Bench Press (Barbell)",         C: 70, type: "barbell" },
  db_bench:     { name: "Bench Press (Dumbbell)",        C: 60, type: "dumbbell" },
  incline_bb:   { name: "Incline Bench Press (Barbell)", C: 50, type: "barbell" },
  pushup:       { name: "Push-Up",                        C: 35, type: "bodyweight" },
  dip:          { name: "Dip",                            C: 55, type: "bodyweight" },

  // Shoulders / Delts
  ohp_bb:       { name: "Overhead Press (Barbell)",       C: 60, type: "barbell" },
  ohp_db:       { name: "Overhead Press (Dumbbell)",      C: 55, type: "dumbbell" },
  upright_row:  { name: "Upright Row (Wide)",             C: 25, type: "barbell" },
  lat_raise:    { name: "Lateral Raise",                  C: 3,  type: "dumbbell" },
  front_raise:  { name: "Front Raise",                    C: 3,  type: "dumbbell" },
  rear_delt:    { name: "Rear Delt Fly",                  C: 3,  type: "dumbbell" },
  face_pull:    { name: "Face Pull",                      C: 3,  type: "cable" },

  // Back / Pull
  row_bb:       { name: "Barbell Row",                    C: 50, type: "barbell" },
  row_db:       { name: "Dumbbell Row",                   C: 45, type: "dumbbell" },
  row_cable:    { name: "Seated Cable Row",               C: 40, type: "machine" },
  pulldown:     { name: "Lat Pulldown",                   C: 45, type: "machine" },
  chinup:       { name: "Chin-Up",                        C: 55, type: "bodyweight" },
  pullup:       { name: "Pull-Up",                         C: 55, type: "bodyweight" },

  // Squat / Hinge / Lower
  squat_hb:     { name: "Back Squat (High-Bar)",          C: 95, type: "barbell" },
  squat_lb:     { name: "Back Squat (Low-Bar)",           C: 95, type: "barbell" },
  front_sqt:    { name: "Front Squat",                    C: 92, type: "barbell" },
  goblet_sqt:   { name: "Goblet Squat",                   C: 55, type: "dumbbell" },
  dl_conv:      { name: "Conventional Deadlift",          C: 100,type: "barbell" },
  dl_rdl:       { name: "Romanian Deadlift",              C: 80, type: "barbell" },
  hip_thrust:   { name: "Hip Thrust",                     C: 75, type: "barbell" },
  leg_press:    { name: "Leg Press",                      C: 40, type: "machine" },
  split_sqt:    { name: "Bulgarian Split Squat",          C: 55, type: "dumbbell" },
  lunge_wlk:    { name: "Lunge (Walking)",                C: 45, type: "dumbbell" },
  step_up:      { name: "Step-Up",                         C: 45, type: "dumbbell" },

  // Arms
  curl_bb:      { name: "Biceps Curl (Barbell)",          C: 5,  type: "barbell" },
  curl_db:      { name: "Biceps Curl (Dumbbell)",         C: 5,  type: "dumbbell" },
  tri_oh:       { name: "Overhead Triceps Extension",     C: 5,  type: "dumbbell" },
  tri_pushdn:   { name: "Triceps Pushdown",               C: 5,  type: "machine" },

  // Legs (isolations)
  leg_curl:     { name: "Seated Leg Curl",                C: 10, type: "machine" },
  leg_ext:      { name: "Leg Extension",                  C: 8,  type: "machine" },

  // Calves
  calf_stand:   { name: "Calf Raise (Standing)",          C: 8,  type: "barbell" },
  calf_seat:    { name: "Calf Raise (Seated)",            C: 8,  type: "machine" },
  calf_donkey:  { name: "Donkey Calf Raise",              C: 8,  type: "machine" },

  // Core
  ab_roll:      { name: "Ab Wheel Rollout",               C: 10, type: "bodyweight" },
  cable_crunch: { name: "Cable Crunch",                   C: 10, type: "machine" },
  plank:        { name: "Plank",                          C: 5,  type: "bodyweight" },
  hang_leg:     { name: "Hanging Leg Raise",              C: 5,  type: "bodyweight" },
  russian_tw:   { name: "Russian Twist",                  C: 5,  type: "bodyweight" },

  // Hips/Glutes adjunct
  abd_machine:  { name: "Abduction Machine",              C: 5,  type: "machine" },
};

// Derived list for UI (kept in sync automatically)
export const WORKOUTS = Object.entries(CATALOG_BY_ID)
  .map(([id, obj]) => ({ id, ...obj }))
  .sort((a, b) => a.name.localeCompare(b.name));

