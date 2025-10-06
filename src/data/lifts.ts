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
  dip:          { name: "Dip",                            C: 55, type: "bodyweight", bwPct: 1 },
  seated_french_press: { name: "Seated French Press", C: 8, type: "EZ curl" },
  incline_db: { name: "Incline Bench Press (Dumbbell)", C: 55, type: "dumbbell" },
  chest_press_hs_flat: { name: "Chest Press (Hammer Strength)", C: 50, type: "machine" },
  chest_press_hs_incline: { name: "Chest Press (Hammer Strength, Incline)", C: 50, type: "machine" },
  db_fly_flat: { name: "Dumbbell Fly (Flat)", C: 6, type: "dumbbell" },
  pec_deck_fly: { name: "Pec Deck Fly", C: 5, type: "machine" },
  db_fly_incline: { name: "Incline Dumbbell Fly", C: 6, type: "dumbbell" },

  

  // Shoulders / Delts
  ohp_bb:       { name: "Overhead Press (Barbell)",       C: 60, type: "barbell" },
  ohp_db:       { name: "Overhead Press (Dumbbell)",      C: 55, type: "dumbbell" },
  upright_row:  { name: "Upright Row (Wide)",             C: 25, type: "barbell" },
  lat_raise:    { name: "Lateral Raise",                  C: 3,  type: "dumbbell" },
  front_raise:  { name: "Front Raise",                    C: 3,  type: "dumbbell" },
  rear_delt:    { name: "Reverse Fly",                  C: 3,  type: "dumbbell" },
  face_pull:    { name: "Face Pull",                      C: 3,  type: "cable" },
  shrug: { name: "Barbell Shrug", C: 35, type: "barbell" },
  ohp_bb_seated: { name: "Seated Overhead Press (Barbell)", C: 50, type: "barbell" },
  ohp_db_seated: { name: "Seated Overhead Press (Dumbbell)", C: 48, type: "dumbbell" },
  upright_row_narrow: { name: "Upright Row (Narrow)", C: 25, type: "barbell" },
  lat_raise_db:    { name: "Lateral Raise (Dumbbell)", C: 3, type: "dumbbell" },
lat_raise_cable: { name: "Lateral Raise (Cable)",    C: 3, type: "cable" },



  // Back / Pull
  row_bb:     { name: "Barbell Row", C: 50, type: "barbell" },
  row_db:       { name: "Dumbbell Row",                   C: 45, type: "dumbbell" },
  row_cable:    { name: "Seated Cable Row",               C: 40, type: "machine" },
  pulldown:     { name: "Lat Pulldown",                   C: 45, type: "machine" },
  chinup:       { name: "Chin-Up",                        C: 55, type: "bodyweight", bwPct: 1  },
  pullup:       { name: "Pull-Up",                         C: 55, type: "bodyweight", bwPct: 1  },
  tbar_row:   { name: "T-Bar Row", C: 55, type: "barbell" },
  sa_pulldown: { name: "Straight-Arm Pulldown (Half-Moon)", C: 8, type: "cable" },
  row_bb_yates: { name: "Yates Row (Underhand Barbell Row)", C: 50, type: "barbell" },
  row_bb_underhand: { name: "Underhand Barbell Row", C: 50, type: "barbell" },

  // Squat / Hinge / Lower
  squat_hb:     { name: "Back Squat",          C: 95, type: "barbell", bwPct: 0.82},
  squat_lb:     { name: "Back Squat (Low-Bar)",           C: 95, type: "barbell" },
  front_sqt:    { name: "Front Squat",                    C: 92, type: "barbell", bwPct: 0.82 },
  goblet_sqt:   { name: "Goblet Squat",                   C: 55, type: "dumbbell" },
  dl_conv:      { name: "Conventional Deadlift",          C: 100,type: "barbell", bwPct: 0.82 },
  dl_rdl:       { name: "Romanian Deadlift",              C: 80, type: "barbell", bwPct: 0.82},
  hip_thrust:   { name: "Hip Thrust",                     C: 75, type: "barbell" },
  leg_press:    { name: "Leg Press",                      C: 40, type: "machine" },
  split_sqt:    { name: "Bulgarian Split Squat",          C: 55, type: "dumbbell" },
  lunge_wlk:    { name: "Lunge (Walking)",                C: 45, type: "dumbbell", bwPct: 0.82 },
  step_up:      { name: "Step-Up",                         C: 45, type: "dumbbell" },
  hack_sqt:   { name: "Hack Squat", C: 60, type: "machine" },
  dl_sldl:   { name: "Stiff-Legged Deadlift", C: 82, type: "barbell", bwPct: 0.82 },
  gm_bb:      { name: "Good Morning", C: 65, type: "barbell", bwPct: 0.82 },
  farmers_carry: { name: "Farmer's Carry", C: 65, type: "dumbbell" },




  // Arms
  curl_bb:      { name: "Biceps Curl (Barbell)",          C: 5,  type: "barbell" },
  curl_db:      { name: "Biceps Curl (Dumbbell)",         C: 5,  type: "dumbbell" },
  tri_oh:       { name: "Overhead Triceps Extension",     C: 5,  type: "dumbbell" },
  tri_pushdn_cable: { name: "Triceps Pushdown (Cable)", C: 5, type: "machine" },
  french_press_seated: { name: "French Press (Seated, EZ-Bar)", C: 8, type: "EZ curl" },
  curl_ez: { name: "Biceps Curl (EZ-Bar)", C: 5, type: "EZ curl" },
  bb_wrist_curl_btb: { name: "Wrist Curl (Behind-the-Back, Barbell)", C: 4, type: "barbell" },



  // Legs (isolations)
  leg_curl:     { name: "Seated Leg Curl",                C: 10, type: "machine" },
  leg_ext:      { name: "Leg Extension",                  C: 8,  type: "machine" },
  leg_curl_prone: { name: "Lying Leg Curl", C: 10, type: "machine" },
  hip_abduction_cable_stand: { name: "Cable Hip Abduction (Standing)", C: 6, type: "cable" },


  
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
  crunch: { name: "Crunch", C: 6, type: "bodyweight", bwPct: 0.35 },
  rev_crunch: { name: "Reverse Crunch", C: 6, type: "bodyweight", bwPct: 0.28 },


};



// Derived list for UI (kept in sync automatically)
export const WORKOUTS = Object.entries(CATALOG_BY_ID)
  .map(([id, obj]) => ({ id, ...obj }))
  .sort((a, b) => a.name.localeCompare(b.name));

