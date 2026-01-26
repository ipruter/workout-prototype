// Order matters. Duplicates are fine. Do NOT exceed what you want per week.
// Each entry is its own prescription regardless of having the same liftId elsewhere.
export const WEEKLY_SEQUENCE = [
  // Example — replace with your list & prescriptions
  { liftId: "dl_conv", sets: 3, reps: 4, intensityPct: 89 },       
  { liftId: "squat_hb",      sets: 3, reps: 4, intensityPct: 89 },
  { liftId: "bb_bench", sets: 3, reps: 4, intensityPct: 89 },
  { liftId: "chinup", sets: 3, reps: 4, intensityPct: 89 },
  { liftId: "ohp_bb_seated", sets: 3, reps: 4, intensityPct: 89 },

  { liftId: "front_sqt",  sets: 3, reps: 8, intensityPct: 75},     
  { liftId: "leg_curl", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "incline_bb", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "row_cable", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "dip", sets: 3, reps: 8, intensityPct: 75},
  
  { liftId: "dl_conv", sets: 3, reps: 5, intensityPct: 86 },      
  { liftId: "squat_hb", sets: 3, reps: 5, intensityPct: 86 },
  { liftId: "bb_bench", sets: 3, reps: 5, intensityPct: 86 },
  { liftId: "chinup", sets: 3, reps: 5, intensityPct: 86 },
  { liftId: "ohp_bb_seated", sets: 3, reps: 5, intensityPct: 86 },
  
  { liftId: "front_sqt",  sets: 3, reps: 8, intensityPct: 75},    
  { liftId: "leg_curl", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "incline_bb", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "row_cable", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "dip", sets: 3, reps: 13, intensityPct: 65},
  
  { liftId: "front_sqt",  sets: 3, reps: 8, intensityPct: 75},   
  { liftId: "leg_curl", sets: 3, reps: 13, intensityPct: 65},
  { liftId: "chinup", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "bb_bench", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "ohp_bb_seated", sets: 3, reps: 8, intensityPct: 75},

  { liftId: "leg_curl", sets: 3, reps: 8, intensityPct: 75},  
  { liftId: "bb_bench", sets: 3, reps: 8, intensityPct: 75},  
  { liftId: "chinup", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "ohp_bb_seated", sets: 3, reps: 8, intensityPct: 75},
  { liftId: "row_cable", sets: 3, reps: 13, intensityPct: 65},

  { liftId: "upright_row", sets: 3, reps: 8, intensityPct: 75 },
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "hip_abduction_cable_stand", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "row_cable", sets: 3, reps: 8, intensityPct: 75},  
  
  { liftId: "upright_row", sets: 3, reps: 8, intensityPct: 75 },
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "shrug", sets: 3, reps: 10, intensityPct: 71 },  
  { liftId: "hip_abduction_cable_stand", sets: 3, reps: 10, intensityPct: 71 },
  
  { liftId: "shrug", sets: 3, reps: 10, intensityPct: 71 },    
  { liftId: "calf_seat", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },   
  { liftId: "calf_seat", sets: 3, reps: 10, intensityPct: 71 },

  { liftId: "abd_machine", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_donkey", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "hip_abduction_cable_stand", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "farmers_carryb", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_seat", sets: 3, reps: 10, intensityPct: 71 },

  { liftId: "Sit-Up", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "crunch", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "farmers_carryb", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "calf_seat", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "Sit-Up", sets: 3, reps: 10, intensityPct: 71 },

  { liftId: "farmers_carryb", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "crunch", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "Sit-Up", sets: 3, reps: 10, intensityPct: 71 },
  { liftId: "farmers_carryb", sets: 3, reps: 10, intensityPct: 71 },
  
  // add more… repeat squat/bench/etc anywhere you want,
  // the generator consumes by list POSITION, not by name
];
