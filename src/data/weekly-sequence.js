// Order matters. Duplicates are fine. Do NOT exceed what you want per week.
// Each entry is its own prescription regardless of having the same liftId elsewhere.
export const WEEKLY_SEQUENCE = [
  // Example — replace with your list & prescriptions
  { liftId: "squat_hb",      sets: 3, reps: 5, intensityPct: 75 },
  { liftId: "dl_rdl", sets: 1, reps: 5, intensityPct: 80 },
  { liftId: "bb_bench",      sets: 3, reps: 5, intensityPct: 75 },
  { liftId: "row_bb",        sets: 3, reps: 8, intensityPct: 70 },
  { liftId: "squat_hb",      sets: 3, reps: 5, intensityPct: 75 },

  // add more… repeat squat/bench/etc anywhere you want,
  // the generator consumes by list POSITION, not by name
];
