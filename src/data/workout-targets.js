// src/data/workout-targets.js
// How much each workout hits each region (per set).
// Weights can be tweaked anytime; they’ll be multiplied by the set count.
export const WORKOUT_TARGETS = {
  "Bench Press (Barbell)": {
    clavicular_l: 0.3, clavicular_r: 0.3,
    sternal_upper_l: 0.5, sternal_upper_r: 0.5,
    sternal_lower_l: 0.4, sternal_lower_r: 0.4,
    ant_delt_l: 0.3, ant_delt_r: 0.3,
    triceps_long_l: 0.25, triceps_long_r: 0.25,
    triceps_med_l: 0.25,  triceps_med_r: 0.25,
    triceps_lat_l: 0.25,  triceps_lat_r: 0.25,
  },
  "Incline Bench Press": {
    clavicular_l: 0.6, clavicular_r: 0.6,
    sternal_upper_l: 0.4, sternal_upper_r: 0.4,
    ant_delt_l: 0.35, ant_delt_r: 0.35,
    triceps_long_l: 0.2, triceps_long_r: 0.2,
  },
  "Overhead Press": {
    ant_delt_l: 0.7, ant_delt_r: 0.7,
    lat_delt_l: 0.4,  lat_delt_r: 0.4,
    traps_upper_l: 0.25, traps_upper_r: 0.25,
    triceps_long_l: 0.3, triceps_long_r: 0.3,
  },
  "Barbell Row": {
    lats_vertebral_l: 0.6, lats_vertebral_r: 0.6,
    rhomboids_l: 0.5, rhomboids_r: 0.5,
    traps_mid_l: 0.35, traps_mid_r: 0.35,
    rear_delt_l: 0.35, rear_delt_r: 0.35,
  },
  "Pull-Up": {
    lats_costal_l: 0.7, lats_costal_r: 0.7,
    lats_iliac_l: 0.5,  lats_iliac_r: 0.5,
    bicep_long_l: 0.25, bicep_long_r: 0.25,
    brachialis_l: 0.25, brachialis_r: 0.25,
  },
  "Back Squat": {
    quads_rf_upper_l: 0.5, quads_rf_upper_r: 0.5,
    quads_rf_lower_l: 0.5, quads_rf_lower_r: 0.5,
    quads_vl_l: 0.6, quads_vl_r: 0.6,
    quads_vm_l: 0.6, quads_vm_r: 0.6,
    quads_vi_l: 0.5, quads_vi_r: 0.5,
    glute_med_l: 0.3, glute_med_r: 0.3,
    erectors_thor_l: 0.25, erectors_thor_r: 0.25,
  },
  "Romanian Deadlift": {
    ham_bf_long_l: 0.6, ham_bf_long_r: 0.6,
    ham_bf_short_l: 0.5, ham_bf_short_r: 0.5,
    ham_semimem_l: 0.6, ham_semimem_r: 0.6,
    ham_semitend_l: 0.6, ham_semitend_r: 0.6,
    erectors_lum_l: 0.5, erectors_lum_r: 0.5,
    glute_med_l: 0.3, glute_med_r: 0.3,
  },
  "Hip Thrust": {
    caudal_glute_max_l: 0.8, caudal_glute_max_r: 0.8,
    cranial_glute_max_l: 0.6, cranial_glute_max_r: 0.6,
    ham_bf_long_l: 0.2, ham_bf_long_r: 0.2,
  },
  "Lateral Raise": { lat_delt_l: 1, lat_delt_r: 1 },
  "Rear Delt Fly":  { rear_delt_l: 1, rear_delt_r: 1 },
  "Biceps Curl (Dumbbell)": { bicep_short_l: 1, bicep_short_r: 1 },
  "Triceps Pushdown":       { triceps_lat_l: 1, triceps_lat_r: 1 },
  "Leg Extension":          { quads_rf_upper_l: 0.7, quads_rf_upper_r: 0.7, quads_vi_l: 0.6, quads_vi_r: 0.6 },
  "Leg Curl":               { ham_bf_long_l: 0.7, ham_bf_long_r: 0.7, ham_semimem_l: 0.6, ham_semimem_r: 0.6 },
  "Calf Raise (Standing)":  { gastro_med_l: 0.7, gastro_med_r: 0.7, gastro_lat_l: 0.7, gastro_lat_r: 0.7, soleus_post_l: 0.4, soleus_post_r: 0.4 },
  "Plank":                  { transverse_abs: 1 },
};
