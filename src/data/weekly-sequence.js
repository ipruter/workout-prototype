// Order matters. Duplicates are fine. Do NOT exceed what you want per week.
// Each entry is its own prescription regardless of having the same liftId elsewhere.
export const WEEKLY_SEQUENCE = [
  // Example — replace with your list & prescriptions
  { liftId: "squat_hb",      sets: 3, reps: 4, intensityPct: 89 },
  { liftId: "dl_rdl", sets: 3, reps: 4, intensityPct: 89 },
  { liftId: "chinup", sets: 3, reps: 4, intensityPct: 89 },
  { liftId: "bb_bench", sets: 3, reps: 4, intensityPct: 89 },

  { liftId: "upright_row", sets: 3, reps: 5, intensityPct: 86 },
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "dip", sets: 3, reps: 8, intensityPct: 75},

  { liftId: "row_cable", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "incline_bb", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "squat_hb",      sets: 3, reps: 8, intensityPct: 75 },
  { liftId: "leg_curl", sets: 3, reps: 8, intensityPct: 75},

  { liftId: "upright_row", sets: 3, reps: 8, intensityPct: 75 },
  { liftId: "row_cable", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "seated_french_press" , sets: 3, reps: 8, intensityPct: 75 },

  { liftId: "squat_hb",      sets: 3, reps: 8, intensityPct: 75 },
  { liftId: "leg_curl", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "incline_bb", sets: 3, reps: 5, intensityPct: 86},
  { liftId: "chinup", sets: 3, reps: 5, intensityPct: 86 },

  { liftId: "upright_row", sets: 3, reps: 8, intensityPct: 75 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "dip", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "chinup", sets: 3, reps: 8, intensityPct: 75 },

  { liftId: "upright_row", sets: 3, reps: 5, intensityPct: 86 },
  { liftId: "squat_hb",      sets: 3, reps: 5, intensityPct: 86 },
  { liftId: "dl_rdl", sets: 3, reps: 5, intensityPct: 86 },
  { liftId: "incline_bb", sets: 3, reps: 13, intensityPct: 65},

  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "row_cable", sets: 3, reps: 13, intensityPct: 65},
  { liftId: "seated_french_press" , sets: 3, reps: 8, intensityPct: 75 },
  { liftId: "upright_row", sets: 3, reps: 13, intensityPct: 65 },

  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "leg_ext", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "leg_curl", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },

  { liftId: "incline_bb", sets: 3, reps: 5, intensityPct: 86},
  { liftId: "chinup", sets: 3, reps: 5, intensityPct: 86 },
  { liftId: "dip", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "upright_row", sets: 3, reps: 8, intensityPct: 75 },

  { liftId: "rear_delt", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "abd_machine", sets: 3, reps: 13, intensityPct: 65 },
  { liftId: "leg_ext", sets: 3, reps: 8, intensityPct: 75},

  { liftId: "leg_curl", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "shrug", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  

  // add more… repeat squat/bench/etc anywhere you want,
  // the generator consumes by list POSITION, not by name
];
