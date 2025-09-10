// src/data/workout-targets.js
/* data prompt:

“Use realistic, literature-supported raw EMG baselines that respect biomechanics (e.g., flat bench favors mid-sternal pec, incline favors clavicular, dips favor lower sternal; lateral > medial ≥ long head in triceps for pressing). Distribute values accordingly before applying my modifiers.”
“Use literature-consistent raw EMG baselines that reflect biomechanics (flat bench: sternal > clavicular > lower; triceps lateral ≥ medial > long; anterior delt ≥ long head). State raw baselines first, then apply my modifiers.”

Using these emg numbers, adjust each muscle's effective hypertrophy contribution per set using the following scoring system:
Step 1 — ROM Adjustment
If the muscle works through a full range of motion: ×1
If partial ROM: ×0.75
If minimal ROM or isometric: ×0.5
Step 2 — Stretch Adjustment
If the muscle is loaded in a lengthened (stretched) position: ×1
If no meaningful stretch: ×0.8
Step 3 — Synergist Role Adjustment
If the muscle is a prime mover: ×1
If it’s an active synergist: ×1
If it's a passive stabilizer or works isometrically only: ×0.5
Apply these multipliers to the raw EMG percentage and return the final adjusted value for each involved muscle.
Do NOT cap the values, even if they exceed 100%. Just return the adjusted percentages.
Assume I will apply my own normalization where the prime mover’s adjusted value becomes 0.6 productive sets, and other muscles are scaled relative to that, with a hard cap of 1.25 after normalization.
Your only job is to give me the raw EMG × the above modifiers, per muscle, per exercise. Let’s start with [INSERT LIFT NAME HERE].
*/
// 1) Keep your original name-keyed targets here (easy to tweak):
export const WORKOUT_TARGETS_BY_NAME = {
  "Bench Press (Barbell)": {
  clavicular_l: 0.42, clavicular_r: 0.42,
  sternal_upper_l: 0.62, sternal_upper_r: 0.62,
  sternal_lower_l: 0.38, sternal_lower_r: 0.38,

  ant_delt_l: 0.24, ant_delt_r: 0.24,

  triceps_long_l: 0.224, triceps_long_r: 0.224,
  triceps_med_l: 0.344, triceps_med_r: 0.344,
  triceps_lat_l: 0.384, triceps_lat_r: 0.384,

  serratus_l: 0.04, serratus_r: 0.04
},
  "Incline Bench Press": {
  clavicular_l: 0.78, clavicular_r: 0.78,
  sternal_upper_l: 0.58, sternal_upper_r: 0.58,
  sternal_lower_l: 0.30, sternal_lower_r: 0.30,

  ant_delt_l: 0.372, ant_delt_r: 0.372,
  lat_delt_l: 0.072, lat_delt_r: 0.072,

  triceps_long_l: 0.20, triceps_long_r: 0.20,
  triceps_med_l: 0.44, triceps_med_r: 0.44,
  triceps_lat_l: 0.40, triceps_lat_r: 0.40,

  serratus_l: 0.04, serratus_r: 0.04
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
   // Lats
  lats_costal_l: 0.80,  lats_costal_r: 0.80,
  lats_iliac_l: 0.72,   lats_iliac_r: 0.72,
  lats_vertebral_l: 0.65, lats_vertebral_r: 0.65,

  // Teres major
  teres_major_l: 0.60, teres_major_r: 0.60,

  // Elbow flexors
  bicep_short_l: 0.75, bicep_short_r: 0.75,
  bicep_long_l: 0.60,  bicep_long_r: 0.60,
  brachialis_l: 0.70,  brachialis_r: 0.70,

  // Forearm/finger flexors (isometric penalty ×0.20)
  forearm_flex_l: 0.08, forearm_flex_r: 0.08,

  // Scapular retractors/depressors
  traps_lower_l: 0.55, traps_lower_r: 0.55,
  traps_mid_l:   0.45, traps_mid_r:   0.45,
  rhomboids_l:   0.45, rhomboids_r:  0.45,

  // Rear delts (corrected lower value)
  rear_delt_l: 0.20, rear_delt_r: 0.20,

  // Serratus (stabilizer penalty ×0.20)
  serratus_l: 0.05, serratus_r: 0.05
},
  "Back Squat": {
   // Quads (×1.0)
  quads_rf_upper_l: 0.38, quads_rf_upper_r: 0.38,
  quads_rf_lower_l: 0.42, quads_rf_lower_r: 0.42,
  quads_vl_l: 0.80,       quads_vl_r: 0.80,
  quads_vm_l: 0.85,       quads_vm_r: 0.85,
  quads_vi_l: 0.70,       quads_vi_r: 0.70,

  // Glutes / adductors (×1.0 except glute med)
  caudal_glute_max_l: 0.75,  caudal_glute_max_r: 0.75,
  cranial_glute_max_l: 0.60, cranial_glute_max_r: 0.60,
  glute_med_l: 0.08,         glute_med_r: 0.08,       // 0.40 × 0.20
  adductor_mag_l: 0.80,      adductor_mag_r: 0.80,

  // Hamstrings (×0.20)
  ham_bf_long_l: 0.04, ham_bf_long_r: 0.04,
  ham_semimem_l: 0.04, ham_semimem_r: 0.04,
  ham_semitend_l: 0.04, ham_semitend_r: 0.04,

  // Spinal erectors (×0.20)
  erectors_thor_l: 0.07, erectors_thor_r: 0.07,
  erectors_lum_l:  0.09, erectors_lum_r:  0.09,

  // Calves (×0.20)
  gastro_med_l: 0.044, gastro_med_r: 0.044,
  gastro_lat_l: 0.044, gastro_lat_r: 0.044,
  soleus_post_l: 0.036, soleus_post_r: 0.036
},
  "Romanian Deadlift": {
   // Hamstrings (×1.0)
  ham_bf_long_l: 0.84, ham_bf_long_r: 0.84,
  ham_semimem_l: 0.80, ham_semimem_r: 0.80,
  ham_semitend_l: 0.76, ham_semitend_r: 0.76,
  ham_bf_short_l: 0.16, ham_bf_short_r: 0.16,

  // Glutes / adductors (×1.0 except med/min)
  caudal_glute_max_l: 0.76, caudal_glute_max_r: 0.76,
  cranial_glute_max_l: 0.46, cranial_glute_max_r: 0.46,
  glute_med_l: 0.056,       glute_med_r: 0.056,   // 0.28 × 0.20
  glute_min_l: 0.040,       glute_min_r: 0.040,   // 0.20 × 0.20
  adductor_mag_l: 0.62,     adductor_mag_r: 0.62,

  // Spinal erectors (×0.20)
  erectors_lum_l: 0.12,  erectors_lum_r: 0.12,
  erectors_thor_l: 0.084, erectors_thor_r: 0.084,

  // Upper back / lats / traps (×0.20)
  traps_mid_l: 0.052,   traps_mid_r: 0.052,
  traps_upper_l: 0.036, traps_upper_r: 0.036,
  traps_lower_l: 0.044, traps_lower_r: 0.044,
  lats_vertebral_l: 0.032, lats_vertebral_r: 0.032,
  lats_costal_l: 0.024,    lats_costal_r: 0.024,
  lats_iliac_l: 0.020,     lats_iliac_r: 0.020,

  // Forearms / calves (×0.20)
  forearm_flex_l: 0.164, forearm_flex_r: 0.164,
  gastro_med_l: 0.024,   gastro_med_r: 0.024,
  gastro_lat_l: 0.024,   gastro_lat_r: 0.024,
  soleus_post_l: 0.028,  soleus_post_r: 0.028
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
  "Seated Leg Curl": {
  // Hamstrings (×1.0)
  ham_bf_long_l: 0.88, ham_bf_long_r: 0.88,
  ham_semimem_l: 0.84, ham_semimem_r: 0.84,
  ham_semitend_l: 0.82, ham_semitend_r: 0.82,
  ham_bf_short_l: 0.72, ham_bf_short_r: 0.72,

  // Calves
  gastro_med_l: 0.12, gastro_med_r: 0.12,   // 0.20 × 0.60
  gastro_lat_l: 0.12, gastro_lat_r: 0.12,   // 0.20 × 0.60
  soleus_post_l: 0.016, soleus_post_r: 0.016 // 0.08 × 0.20
},

  "Calf Raise (Standing)":  {
    gastro_med_l: 0.7, gastro_med_r: 0.7,
    gastro_lat_l: 0.7, gastro_lat_r: 0.7,
    soleus_post_l: 0.4, soleus_post_r: 0.4,
  },
  "Plank":                  { transverse_abs: 1 },

  // plurals/variants handled by alias map below:
  "Donkey Calf Raises": {
  gastro_med_l: 0.92, gastro_med_r: 0.92,
  gastro_lat_l: 0.92, gastro_lat_r: 0.92,
  soleus_post_l: 0.208, soleus_post_r: 0.208 // 0.52 × 0.40
},
  "Abduction Machine": {
  glute_med_l: 0.704, glute_med_r: 0.704,       // 0.88 × 0.8
  glute_min_l: 0.592, glute_min_r: 0.592,       // 0.74 × 0.8
  tensor_fasciae_l: 0.528, tensor_fasciae_r: 0.528, // 0.66 × 0.8
  cranial_glute_max_l: 0.20, cranial_glute_max_r: 0.20 // 0.25 × 0.8
},
  "Upright Rows (wide)": {
  lat_delt_l: 0.80, lat_delt_r: 0.80,
  ant_delt_l: 0.30, ant_delt_r: 0.30,
  post_delt_l: 0.35, post_delt_r: 0.35,

  // Traps & scapular upward rotation (×1.0)
  traps_upper_l: 0.52, traps_upper_r: 0.52,
  traps_mid_l:   0.20, traps_mid_r:   0.20,
  traps_lower_l: 0.18, traps_lower_r: 0.18,
  rhomboids_l:   0.18, rhomboids_r:   0.18,

  // Elbow flexors (isometric ×0.20)
  bicep_short_l: 0.03, bicep_short_r: 0.03
},
  "Dip": {
  clavicular_l: 0.22, clavicular_r: 0.22,
  sternal_upper_l: 0.58, sternal_upper_r: 0.58,
  sternal_lower_l: 0.90, sternal_lower_r: 0.90,

  // Triceps (after ×0.8)
  triceps_long_l: 0.256, triceps_long_r: 0.256,
  triceps_med_l: 0.48,  triceps_med_r: 0.48,
  triceps_lat_l: 0.44,  triceps_lat_r: 0.44,

  // Delts (after ×0.60)
  ant_delt_l: 0.096, ant_delt_r: 0.096,

  // Scapular stabilizers (after ×0.20)
  serratus_l: 0.05,    serratus_r: 0.05,
  traps_lower_l: 0.048, traps_lower_r: 0.048,
  traps_mid_l: 0.024,   traps_mid_r: 0.024,
  rhomboids_l: 0.02,    rhomboids_r: 0.02
},
  "Seated Cable Row": {
  // Lats (after ×0.8)
  lats_costal_l: 0.44, lats_costal_r: 0.44,
  lats_iliac_l: 0.40,  lats_iliac_r: 0.40,
  lats_vertebral_l: 0.42, lats_vertebral_r: 0.42,

  // Teres major (after ×0.8)
  teres_major_l: 0.44, teres_major_r: 0.44,

  // Scapular retractors/depressors
  rhomboids_l: 0.80, rhomboids_r: 0.80,
  traps_mid_l: 0.70, traps_mid_r: 0.70,
  traps_lower_l: 0.40, traps_lower_r: 0.40,

  // Posterior delts
  rear_delt_l: 0.60, rear_delt_r: 0.60,

  // Elbow flexors
  bicep_short_l: 0.48, bicep_short_r: 0.48,
  bicep_long_l: 0.42,  bicep_long_r: 0.42,
  brachialis_l: 0.52,  brachialis_r: 0.52,

  // Grip (isometric ×0.20)
  forearm_flex_l: 0.07, forearm_flex_r: 0.07,

  // Spinal erectors (isometric ×0.20)
  erectors_thor_l: 0.04, erectors_thor_r: 0.04,
  erectors_lum_l: 0.03, erectors_lum_r: 0.03
},
  "Front Squat": {
   // Quads
  quads_rf_upper_l: 0.42, quads_rf_upper_r: 0.42,
  quads_rf_lower_l: 0.48, quads_rf_lower_r: 0.48,
  quads_vl_l: 0.85,       quads_vl_r: 0.85,
  quads_vm_l: 0.90,       quads_vm_r: 0.90,
  quads_vi_l: 0.75,       quads_vi_r: 0.75,

  // Glutes / adductors
  caudal_glute_max_l: 0.62,  caudal_glute_max_r: 0.62,
  cranial_glute_max_l: 0.35, cranial_glute_max_r: 0.35,
  glute_med_l: 0.076,        glute_med_r: 0.076,
  glute_min_l: 0.044,        glute_min_r: 0.044,
  adductor_mag_l: 0.70,      adductor_mag_r: 0.70,

  // Hamstrings
  ham_bf_long_l: 0.03, ham_bf_long_r: 0.03,
  ham_semimem_l: 0.03, ham_semimem_r: 0.03,
  ham_semitend_l: 0.03, ham_semitend_r: 0.03,

  // Spinal erectors
  erectors_thor_l: 0.096, erectors_thor_r: 0.096,
  erectors_lum_l:  0.064, erectors_lum_r:  0.064,

  // Calves
  gastro_med_l: 0.04, gastro_med_r: 0.04,
  gastro_lat_l: 0.04, gastro_lat_r: 0.04,
  soleus_post_l: 0.024, soleus_post_r: 0.024
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
