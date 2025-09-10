// src/data/workout-targets.js
// 1) Keep your original name-keyed targets here (easy to tweak):
export const WORKOUT_TARGETS_BY_NAME = {
  "Bench Press (Barbell)": {
    clavicular_l: 0.3, clavicular_r: 0.3,
    sternal_upper_l: 0.5, sternal_upper_r: 0.5,
    sternal_lower_l: 0.4, sternal_lower_r: 0.4,
    ant_delt_l: 0.3, ant_delt_r: 0.3,
    triceps_long_l: 0.2, triceps_long_r: 0.2,
    triceps_med_l: 0.4,  triceps_med_r: 0.4,
    triceps_lat_l: 0.3,  triceps_lat_r: 0.3,
  },
  "Incline Bench Press": {
    clavicular_l: 0.6, clavicular_r: 0.6,
    sternal_upper_l: 0.4, sternal_upper_r: 0.4,
    sternal_lower_l: 0.2, sternal_lower_r: 0.2,
    ant_delt_l: 0.35, ant_delt_r: 0.35,
    lat_delt_l: 0.1,  lat_delt_r: 0.1,
    triceps_long_l: 0.2, triceps_long_r: 0.2,
    triceps_med_l: 0.35,  triceps_med_r: 0.35,
    triceps_lat_l: 0.25,  triceps_lat_r: 0.25,
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
  "Chin-Up": {
    lats_costal_l: 0.9, lats_costal_r: 0.9,
    lats_iliac_l: 0.9,  lats_iliac_r: 0.9,
    lats_vertebral_l: 0.75, lats_vertebral_r: 0.75,
    bicep_long_l: 0.7, bicep_long_r: 0.7,
    bicep_short_l: 1, bicep_short_r: 1,
    brachialis_l: 0.9, brachialis_r: 0.9,
    forearm_flex_l: 0.3, forearm_flex_r: 0.3,
    traps_lower_l: 0.5, traps_lower_r: 0.5,
    traps_mid_l: 0.5, traps_mid_r: 0.5,
    rhomboids_l: 0.5, rhomboids_r: 0.5,
    rear_delt_l: 0.4, rear_delt_r: 0.4,
  },
  "Back Squat": {
    quads_rf_upper_l: 0.25, quads_rf_upper_r: 0.25,
    quads_rf_lower_l: 0.35, quads_rf_lower_r: 0.35,
    quads_vl_l: 0.6, quads_vl_r: 0.6,
    quads_vm_l: 0.6, quads_vm_r: 0.6,
    quads_vi_l: 0.5, quads_vi_r: 0.5,
    caudal_glute_max_l: 0.85, caudal_glute_max_r: 0.85,
    cranial_glute_max_l: 0.35, cranial_glute_max_r: 0.35,
    glute_med_l: 0.3, glute_med_r: 0.3,
    erectors_thor_l: 0.25, erectors_thor_r: 0.25,
    erectors_lum_l: 0.55, erectors_lum_r: 0.55,
  },
  "Romanian Deadlift": {
    ham_bf_long_l: 0.6, ham_bf_long_r: 0.6,
    ham_semimem_l: 0.6, ham_semimem_r: 0.6,
    ham_semitend_l: 0.6, ham_semitend_r: 0.6,
    erectors_lum_l: 0.5, erectors_lum_r: 0.5,
    erectors_thor_l: 0.2, erectors_thor_r: 0.2,
    glute_med_l: 0.25, glute_med_r: 0.25,
    caudal_glute_max_l: 0.75, caudal_glute_max_r: 0.75,
    cranial_glute_max_l: 0.25, cranial_glute_max_r: 0.25,
    traps_mid_l: 0.2, traps_mid_r: 0.2,
    traps_upper_l: 0.1, traps_upper_r: 0.1,
    traps_lower_l: 0.15, traps_lower_r: 0.15,
    lats_vertebral_l: 0.15, lats_vertebral_r: 0.15,
    lats_costal_l: 0.1, lats_costal_r: 0.1,
    lats_iliac_l: 0.05, lats_iliac_r: 0.05,
    forearm_flex_l: 0.75, forearm_flex_r: 0.75,
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

  // NOTE: leading space fixed below via sanitizer; leaving as-is here:
  " Seated Leg Curl": {
    ham_bf_long_l: 0.8, ham_bf_long_r: 0.8,
    ham_semimem_l: 0.7, ham_semimem_r: 0.7,
    ham_semitend_l: 0.7, ham_semitend_r: 0.7,
    ham_bf_short_l: 0.6, ham_bf_short_r: 0.6,
    gastroc_med_l: 0.25, gastro_med_r: 0.25,
    gastroc_lat_l: 0.25, gastro_lat_r: 0.25,
  },

  "Calf Raise (Standing)":  {
    gastro_med_l: 0.7, gastro_med_r: 0.7,
    gastro_lat_l: 0.7, gastro_lat_r: 0.7,
    soleus_post_l: 0.4, soleus_post_r: 0.4,
  },
  "Plank":                  { transverse_abs: 1 },

  // plurals/variants handled by alias map below:
  "Donkey Calf Raises": {
    gastro_med_l: 0.95, gastro_med_r: 0.95,
    gastro_lat_l: 0.95, gastro_lat_r: 0.95,
    soleus_post_l: 0.6, soleus_post_r: 0.6,
  },
  "Abduction Machine": {
    glute_med_l: 0.95, glute_med_r: 0.95,
    glute_min_l: 0.6, glute_min_r: 0.6,
    tensor_fasciae_l: 0.65, tensor_fasciae_r: 0.65,
  },
  "Upright Rows (wide)": {
    traps_upper_l: 0.65, traps_upper_r: 0.65,
    lat_delt_l: 0.45, lat_delt_r: 0.45,
    ant_delt_l: 0.1, ant_delt_r: 0.1,
    post_delt_l: 0.45, post_delt_r: 0.45,
    bicep_short_l: 0.2, bicep_short_r: 0.2,
  },
  "Dip": {
    triceps_long_l: 0.35, triceps_long_r: 0.35,
    triceps_med_l: 0.55,  triceps_med_r: 0.55,
    triceps_lat_l: 0.45,  triceps_lat_r: 0.45,
    ant_delt_l: 0.2, ant_delt_r: 0.2,
    sternal_upper_l: 0.45, sternal_upper_r: 0.45,
    sternal_lower_l: 0.75, sternal_lower_r: 0.75,
    serratus_l: 0.15, serratus_r: 0.15,
  },
  "Seated Cable Row": {
    lats_vertebral_l: 0.7, lats_vertebral_r: 0.7,
    lats_costal_l: 0.7, lats_costal_r: 0.7,
    lats_iliac_l: 0.6,  lats_iliac_r: 0.6,
    rear_delt_l: 0.55, rear_delt_r: 0.55,
    bicep_long_l: 0.25, bicep_long_r: 0.25,
    bicep_short_l: 0.3, bicep_short_r: 0.3,
    brachialis_l: 0.25, brachialis_r: 0.25,
    forearm_flex_l: 0.45, forearm_flex_r: 0.45,
    traps_lower_l: 0.4, traps_lower_r: 0.4,
    rhomboids_l: 0.7, rhomboids_r: 0.7,
    traps_mid_l: 0.6, traps_mid_r: 0.6,
  },
  "Front Squat": {
  quads_rf_upper_l: 0.35, quads_rf_upper_r: 0.35,
  quads_rf_lower_l: 0.45, quads_rf_lower_r: 0.45,
  quads_vl_l: 0.75, quads_vl_r: 0.75,
  quads_vm_l: 0.80, quads_vm_r: 0.80,
  quads_vi_l: 0.65, quads_vi_r: 0.65,
  caudal_glute_max_l: 0.55, caudal_glute_max_r: 0.55,
  cranial_glute_max_l: 0.30, cranial_glute_max_r: 0.30,
  glute_med_l: 0.35, glute_med_r: 0.35,
  erectors_thor_l: 0.45, erectors_thor_r: 0.45,
  erectors_lum_l: 0.35, erectors_lum_r: 0.35,
}
    
};

// 2) Build coverageByLR keyed by lift IDs using your catalog.
//    This ensures metrics get { [liftId]: { [regionId]: activation_0..1 } }.
import { CATALOG_BY_ID } from "./lifts"; // adjust path if needed

const NAME_TO_ID = Object.fromEntries(
  Object.entries(CATALOG_BY_ID).map(([id, o]) => [o.name.trim().toLowerCase(), id])
);

// Fix common name variants → canonical catalog names:
const NAME_ALIASES = {
  "incline bench press": "incline bench press (barbell)",  // map to your incline_bb
  "overhead press": "overhead press (barbell)",            // prefer barbell by default
  "back squat": "back squat (high-bar)",                   // prefer HB by default
  "donkey calf raises": "donkey calf raise",               // plural → singular
  "upright rows (wide)": "upright row (wide)",             // plural → singular
  " seated leg curl": "seated leg curl",                   // trim leading space
};

// If your catalog names differ, update the alias targets to match CATALOG_BY_ID values.
function canonicalKey(name) {
  const k = String(name || "").trim().toLowerCase();
  return NAME_ALIASES[k] || k;
}

export const coverageByLR = Object.fromEntries(
  Object.entries(WORKOUT_TARGETS_BY_NAME).flatMap(([dispName, regions]) => {
    const canonical = canonicalKey(dispName);
    const id = NAME_TO_ID[canonical];
    if (!id) {
      console.warn("[coverage] No catalog match for workout name:", dispName);
      return []; // skip unknown names
    }
    return [[id, regions]];
  })
);
