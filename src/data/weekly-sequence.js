// Order matters. Duplicates are fine. Do NOT exceed what you want per week.
// Each entry is its own prescription regardless of having the same liftId elsewhere.
export const WEEKLY_SEQUENCE = [
  // Example — replace with your list & prescriptions
  { liftId: "calf_donkey", sets: 3, reps: 16, intensityPct: 60 },
  { liftId: "abd_machine", sets: 3, reps: 16, intensityPct: 60 },
  { liftId: "upright_row", sets: 3, reps: 13, intensityPct: 60 },
  { liftId: "sa_pulldown", sets: 3, reps: 13, intensityPct: 60 },
  { liftId: "chest_press_hs_incline", sets: 3, reps: 13, intensityPct: 60},

  { liftId: "leg_curl", sets: 3, reps: 13, intensityPct: 60},
  { liftId: "leg_press",  sets: 3, reps: 13, intensityPct: 60},
  { liftId: "calf_donkey", sets: 3, reps: 16, intensityPct: 60 },
  { liftId: "abd_machine", sets: 3, reps: 16, intensityPct: 60 },
  { liftId: "upright_row_narrow", sets: 3, reps: 13, intensityPct: 60 },

  { liftId: "row_cable", sets: 3, reps: 13, intensityPct: 60},
  { liftId: "dip", sets: 3, reps: 13, intensityPct: 60},
  { liftId: "leg_curl", sets: 3, reps: 13, intensityPct: 60},
  { liftId: "hack_sqt",  sets: 3, reps: 13, intensityPct: 60},
  { liftId: "abd_machine", sets: 3, reps: 16, intensityPct: 60 },

  { liftId: "upright_row", sets: 3, reps: 13, intensityPct: 60 },
  { liftId: "chinup", sets: 3, reps: 8, intensityPct: 71},
  { liftId: "bb_bench", sets: 3, reps: 8, intensityPct: 71 },
  { liftId: "squat_hb",      sets: 3, reps: 6, intensityPct: 71 },
  { liftId: "dl_conv", sets: 3, reps: 6, intensityPct: 71 },

  { liftId: "upright_row_narrow", sets: 3, reps: 16, intensityPct: 60 },
  { liftId: "sa_pulldown", sets: 3, reps: 16, intensityPct: 60 },
  { liftId: "dip", sets: 3, reps: 16, intensityPct: 60},
  { liftId: "leg_curl", sets: 3, reps: 16, intensityPct: 60},
  { liftId: "row_cable", sets: 3, reps: 16, intensityPct: 60},

  { liftId: "incline_db", sets: 3, reps: 16, intensityPct: 60},

  // add more… repeat squat/bench/etc anywhere you want,
  // the generator consumes by list POSITION, not by name
];
