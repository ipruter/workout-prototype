// Order matters. Duplicates are fine. Do NOT exceed what you want per week.
// Each entry is its own prescription regardless of having the same liftId elsewhere.
export const WEEKLY_SEQUENCE = [
  // Example — replace with your list & prescriptions
  { liftId: "leg_press",  sets: 3, reps: 10, intensityPct: 71},
  { liftId: "leg_curl", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "pulldown_sup", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "chest_press_hs_flat", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "upright_row", sets: 3, reps: 10, intensityPct: 71 },

  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "leg_press",  sets: 3, reps: 10, intensityPct: 71},
  { liftId: "leg_curl", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "row_cable", sets: 3, reps: 10, intensityPct: 71},

  { liftId: "chest_press_hs_incline", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "upright_row_narrow", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "sit_up", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "leg_press",  sets: 3, reps: 10, intensityPct: 71},

  { liftId: "leg_curl", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "sa_pulldown", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "dip", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "upright_row", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },

  { liftId: "calf_seat", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "curl_ez", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "seated_french_press",  sets: 3, reps: 10, intensityPct: 71},
  { liftId: "sit_up", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "leg_press",  sets: 3, reps: 10, intensityPct: 71},
  
  { liftId: "leg_curl", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "row_cable", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "chest_press_hs_incline", sets: 3, reps: 10, intensityPct: 71},
  { liftId: "upright_row_narrow", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },

  { liftId: "calf_seat", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "sit_up", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "hip_thrust", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "sa_pulldown", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "dip", sets: 3, reps: 10, intensityPct: 71},

  { liftId: "calf_seat", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "sit_up", sets: 3, reps: 10, intensityPct: 71 },

  // add more… repeat squat/bench/etc anywhere you want,
  // the generator consumes by list POSITION, not by name
];
