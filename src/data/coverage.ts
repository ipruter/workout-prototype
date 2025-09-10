// src/data/workout-targets.js
/* data prompt:
  Give me estimated raw EMG activation values (%MVIC) for each major muscle involved in [insert exercise], then adjust them ONLY for hypertrophy-relevant factors my program does not handle, including:
Loaded stretch
Active range of motion (ROM)
Contraction quality (e.g., partial vs full shortening)
Stabilizer vs mover role (only if EMG is high but mechanical tension is low)
DO NOT adjust for:
Prime mover status
Relative contribution within the lift
*/
// 1) Keep your original name-keyed targets here (easy to tweak):
export const WORKOUT_TARGETS_BY_NAME = {
  "Bench Press (Barbell)": {
  // Pectoralis major
  clavicular_l: 0.55,      clavicular_r: 0.55,
  sternal_upper_l: 0.72,   sternal_upper_r: 0.72,
  sternal_lower_l: 0.68,   sternal_lower_r: 0.68,

  // Anterior deltoid
  ant_delt_l: 0.50,        ant_delt_r: 0.50,

  // Triceps brachii (heads)
  triceps_long_l: 0.35,    triceps_long_r: 0.35,  // less involved vs lat/med on flat bench
  triceps_med_l: 0.58,     triceps_med_r: 0.58,
  triceps_lat_l: 0.52,     triceps_lat_r: 0.52,

  // Scapular protractors (stabilizer/mover mix)
  serratus_l: 0.18,        serratus_r: 0.18,
},
  "Incline Bench Press": {
  // Pectoralis major (incline bias → clavicular > sternal)
  clavicular_l: 0.78,      clavicular_r: 0.78,
  sternal_upper_l: 0.58,   sternal_upper_r: 0.58,
  sternal_lower_l: 0.30,   sternal_lower_r: 0.30,

  // Delts
  ant_delt_l: 0.62,        ant_delt_r: 0.62,
  lat_delt_l: 0.12,        lat_delt_r: 0.12,

  // Triceps (long head slightly reduced with shoulder flexion)
  triceps_long_l: 0.30,    triceps_long_r: 0.30,
  triceps_med_l: 0.55,     triceps_med_r: 0.55,
  triceps_lat_l: 0.50,     triceps_lat_r: 0.50,

  // Scapular protractor
  serratus_l: 0.20,        serratus_r: 0.20,
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
  // Lats (segment weights; good loaded stretch overhead)
  lats_costal_l:    0.78, lats_costal_r:    0.78,
  lats_iliac_l:     0.70, lats_iliac_r:     0.70,
  lats_vertebral_l: 0.65, lats_vertebral_r: 0.65,

  // Teres major (strong adduction/ext assist — add if you have this region)
  teres_major_l: 0.58, teres_major_r: 0.58,

  // Elbow flexors (supinated bias → short head/brachialis strong; modest long head)
  bicep_short_l: 0.72, bicep_short_r: 0.72,
  bicep_long_l:  0.62, bicep_long_r:  0.62,
  brachialis_l:  0.68, brachialis_r:  0.68,

  // Forearm/finger flexors (grip: high EMG, mostly isometric → discounted)
  forearm_flex_l: 0.38, forearm_flex_r: 0.38,

  // Scapular retractors/depressors (good dynamic ROM + loaded)
  traps_lower_l: 0.55, traps_lower_r: 0.55,
  traps_mid_l:   0.45, traps_mid_r:   0.45,
  rhomboids_l:   0.45, rhomboids_r:   0.45,

  // Posterior delts (modest contribution)
  rear_delt_l: 0.35, rear_delt_r: 0.35,
},
  "Back Squat": {
  // Quads
  quads_rf_upper_l: 0.37, quads_rf_upper_r: 0.37,   // rectus femoris (biarticular; less hypertrophy-relevant)
  quads_rf_lower_l: 0.44, quads_rf_lower_r: 0.44,
  quads_vl_l: 0.77,       quads_vl_r: 0.77,         // vastus lateralis
  quads_vm_l: 0.83,       quads_vm_r: 0.83,         // vastus medialis
  quads_vi_l: 0.68,       quads_vi_r: 0.68,         // vastus intermedius (proxy)

  // Glutes / adductors
  caudal_glute_max_l: 0.72,  caudal_glute_max_r: 0.72,  // lower (hip-ext bias)
  cranial_glute_max_l: 0.62, cranial_glute_max_r: 0.62, // upper
  glute_med_l: 0.40,         glute_med_r: 0.40,
  adductor_mag_l: 0.78,      adductor_mag_r: 0.78,      // posterior fibers act as hip extensors

  // Hamstrings (net small length change in squat)
  ham_bf_long_l: 0.19, ham_bf_long_r: 0.19,
  ham_semimem_l: 0.19, ham_semimem_r: 0.19,
  ham_semitend_l: 0.19, ham_semitend_r: 0.19,

  // Spinal erectors (mostly isometric, still meaningful tension)
  erectors_thor_l: 0.34, erectors_thor_r: 0.34,
  erectors_lum_l: 0.45,  erectors_lum_r: 0.45,

  // Calves (stabilizers)
  gastro_med_l: 0.20, gastro_med_r: 0.20,
  gastro_lat_l: 0.20, gastro_lat_r: 0.20,
  soleus_post_l: 0.16, soleus_post_r: 0.16,
},
  "Romanian Deadlift": {
  // Hamstrings (long-length hinge; strongest hypertrophy signal)
  ham_bf_long_l: 0.82, ham_bf_long_r: 0.82,
  ham_semimem_l: 0.79, ham_semimem_r: 0.79,
  ham_semitend_l: 0.76, ham_semitend_r: 0.76,
  ham_bf_short_l: 0.18, ham_bf_short_r: 0.18,   // knee-only head: minimal in RDL

  // Glutes / adductors
  caudal_glute_max_l: 0.78, caudal_glute_max_r: 0.78,  // lower/caudal fibers bias hip ext.
  cranial_glute_max_l: 0.48, cranial_glute_max_r: 0.48,
  glute_med_l: 0.28,         glute_med_r: 0.28,        // frontal-plane stabilization
  glute_min_l: 0.20,         glute_min_r: 0.20,
  adductor_mag_l: 0.62,      adductor_mag_r: 0.62,     // posterior fibers assist hip ext.

  // Spinal erectors (high tension, mostly isometric → small quality discount)
  erectors_lum_l: 0.62,  erectors_lum_r: 0.62,
  erectors_thor_l: 0.44, erectors_thor_r: 0.44,

  // Upper back / grip stabilizers (modest ROM; postural/isometric)
  traps_mid_l: 0.27,   traps_mid_r: 0.27,
  traps_upper_l: 0.20, traps_upper_r: 0.20,
  traps_lower_l: 0.23, traps_lower_r: 0.23,
  lats_vertebral_l: 0.18, lats_vertebral_r: 0.18,
  lats_costal_l: 0.13,    lats_costal_r: 0.13,
  lats_iliac_l: 0.09,     lats_iliac_r: 0.09,

  // Forearms / calves
  forearm_flex_l: 0.83, forearm_flex_r: 0.83,   // grip-intensive
  gastro_med_l: 0.12,   gastro_med_r: 0.12,
  gastro_lat_l: 0.12,   gastro_lat_r: 0.12,
  soleus_post_l: 0.14,  soleus_post_r: 0.14,
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
  // Hamstrings (high at long length in seated position)
  ham_bf_long_l: 0.86, ham_bf_long_r: 0.86,
  ham_semimem_l: 0.83, ham_semimem_r: 0.83,
  ham_semitend_l: 0.80, ham_semitend_r: 0.80,
  ham_bf_short_l: 0.70, ham_bf_short_r: 0.70, // knee-only head: strong here

  // Calves (gastroc is a knee flexor but biased down if dorsiflexed)
  gastro_med_l: 0.18, gastro_med_r: 0.18,
  gastro_lat_l: 0.18, gastro_lat_r: 0.18,
  soleus_post_l: 0.08, soleus_post_r: 0.08,
},

  "Calf Raise (Standing)":  {
    gastro_med_l: 0.7, gastro_med_r: 0.7,
    gastro_lat_l: 0.7, gastro_lat_r: 0.7,
    soleus_post_l: 0.4, soleus_post_r: 0.4,
  },
  "Plank":                  { transverse_abs: 1 },

  // plurals/variants handled by alias map below:
  "Donkey Calf Raises": {
  gastro_med_l: 0.92, gastro_med_r: 0.92,  // medial gastrocnemius
  gastro_lat_l: 0.92, gastro_lat_r: 0.92,  // lateral gastrocnemius
  soleus_post_l: 0.52, soleus_post_r: 0.52 // soleus (less than seated)
},
  "Abduction Machine": {
  glute_med_l: 0.88, glute_med_r: 0.88,
  glute_min_l: 0.72, glute_min_r: 0.72,
  tensor_fasciae_l: 0.60, tensor_fasciae_r: 0.60,
  cranial_glute_max_l: 0.20, cranial_glute_max_r: 0.20,
},
  "Upright Rows (wide)": {
  // Delts
  lat_delt_l: 0.78, lat_delt_r: 0.78,   // primary target with wide grip
  ant_delt_l: 0.32, ant_delt_r: 0.32,   // some shoulder flexion component
  post_delt_l: 0.38, post_delt_r: 0.38, // posterior fibers assist in abduction path

  // Traps & scapular upward rotation
  traps_upper_l: 0.50, traps_upper_r: 0.50,
  traps_mid_l:   0.22, traps_mid_r:   0.22,
  traps_lower_l: 0.18, traps_lower_r: 0.18,
  rhomboids_l:   0.18, rhomboids_r:   0.18,

  // Elbow flexors (static grip; modest hypertrophy relevance)
  bicep_short_l: 0.15, bicep_short_r: 0.15,
},
  "Dip": {
  // Pectoralis major (deep stretch; sternal > clavicular)
  clavicular_l: 0.26,        clavicular_r: 0.26,
  sternal_upper_l: 0.65,     sternal_upper_r: 0.65,
  sternal_lower_l: 0.88,     sternal_lower_r: 0.88,

  // Triceps (elbow extension; long head discounted slightly for shoulder ext.)
  triceps_long_l: 0.42,      triceps_long_r: 0.42,
  triceps_med_l: 0.64,       triceps_med_r: 0.64,
  triceps_lat_l: 0.56,       triceps_lat_r: 0.56,

  // Delts (anterior acts more as antagonist/positioning here)
  ant_delt_l: 0.18,          ant_delt_r: 0.18,

  // Scapular control (depression/protraction)
  serratus_l: 0.22,          serratus_r: 0.22,
  traps_lower_l: 0.22,       traps_lower_r: 0.22,
  traps_mid_l: 0.14,         traps_mid_r: 0.14,
  rhomboids_l: 0.12,         rhomboids_r: 0.12,
},
  "Seated Cable Row": {
  // Lats (segment weights; good ROM, modest stretch vs overhead pulls)
  lats_costal_l:    0.60, lats_costal_r:    0.60,
  lats_iliac_l:     0.52, lats_iliac_r:     0.52,
  lats_vertebral_l: 0.58, lats_vertebral_r: 0.58,

  // Teres major (if present in your schema)
  teres_major_l: 0.52, teres_major_r: 0.52,

  // Scapular retractors/depressors (prime movers here)
  rhomboids_l:   0.78, rhomboids_r:   0.78,
  traps_mid_l:   0.68, traps_mid_r:   0.68,
  traps_lower_l: 0.42, traps_lower_r: 0.42,

  // Posterior delts
  rear_delt_l: 0.56, rear_delt_r: 0.56,

  // Elbow flexors (dynamic)
  bicep_short_l: 0.50, bicep_short_r: 0.50,
  bicep_long_l:  0.40, bicep_long_r:  0.40,
  brachialis_l:  0.55, brachialis_r:  0.55,

  // Grip (discounted isometric)
  forearm_flex_l: 0.32, forearm_flex_r: 0.32,

  // Spinal erectors (postural)
  erectors_thor_l: 0.18, erectors_thor_r: 0.18,
  erectors_lum_l:  0.12, erectors_lum_r:  0.12,
},
  "Front Squat": {
  // Quads (knee-dominant)
  quads_rf_upper_l: 0.35, quads_rf_upper_r: 0.35,
  quads_rf_lower_l: 0.45, quads_rf_lower_r: 0.45,
  quads_vl_l: 0.75,       quads_vl_r: 0.75,
  quads_vm_l: 0.80,       quads_vm_r: 0.80,
  quads_vi_l: 0.65,       quads_vi_r: 0.65,

  // Glutes / adductors
  caudal_glute_max_l: 0.55,  caudal_glute_max_r: 0.55,
  cranial_glute_max_l: 0.30, cranial_glute_max_r: 0.30,
  glute_med_l: 0.35,         glute_med_r: 0.35,
  glute_min_l: 0.20,         glute_min_r: 0.20,
  adductor_mag_l: 0.68,      adductor_mag_r: 0.68,

  // Hamstrings (minimal net length change in squat)
  ham_bf_long_l: 0.16, ham_bf_long_r: 0.16,
  ham_semimem_l: 0.16, ham_semimem_r: 0.16,
  ham_semitend_l: 0.15, ham_semitend_r: 0.15,

  // Spinal erectors (upright torso → thoracic > lumbar)
  erectors_thor_l: 0.45, erectors_thor_r: 0.45,
  erectors_lum_l: 0.35,  erectors_lum_r: 0.35,

  // Calves (stabilizers)
  gastro_med_l: 0.18, gastro_med_r: 0.18,
  gastro_lat_l: 0.18, gastro_lat_r: 0.18,
  soleus_post_l: 0.10, soleus_post_r: 0.10,
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
