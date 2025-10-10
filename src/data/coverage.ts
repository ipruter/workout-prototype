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

  serratus_l: 0.04, serratus_r: 0.04,

  rectus_abdominis_upper_l: 0.04, rectus_abdominis_upper_r: 0.04,
rectus_abdominis_lower_l: 0.04, rectus_abdominis_lower_r: 0.04,
oblique_ex_l: 0.04, oblique_ex_r: 0.04,
oblique_int_l: 0.04, oblique_int_r: 0.04,
transverse_abs_l: 0.05, transverse_abs_r: 0.05,

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

  serratus_l: 0.04, serratus_r: 0.04,
  rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
rectus_abdominis_lower_l: 0.04, rectus_abdominis_lower_r: 0.04,
oblique_ex_l: 0.05, oblique_ex_r: 0.05,
oblique_int_l: 0.05, oblique_int_r: 0.05,
transverse_abs_l: 0.06, transverse_abs_r: 0.06,

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
  serratus_l: 0.05, serratus_r: 0.05,

  rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
oblique_ex_l: 0.06, oblique_ex_r: 0.06,
oblique_int_l: 0.06, oblique_int_r: 0.06,
transverse_abs_l: 0.07, transverse_abs_r: 0.07,

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

  // Calves (×0.20)
  gastro_med_l: 0.044, gastro_med_r: 0.044,
  gastro_lat_l: 0.044, gastro_lat_r: 0.044,
  soleus_post_l: 0.036, soleus_post_r: 0.036,

  rectus_abdominis_upper_l: 0.08, rectus_abdominis_upper_r: 0.08,
rectus_abdominis_lower_l: 0.10, rectus_abdominis_lower_r: 0.10,
oblique_ex_l: 0.06, oblique_ex_r: 0.06,
oblique_int_l: 0.06, oblique_int_r: 0.06,
transverse_abs_l: 0.08, transverse_abs_r: 0.08,

// Back Squat
glute_min_l: 0.05, glute_min_r: 0.05,
tensor_fascia_lata_l: 0.06, tensor_fascia_lata_r: 0.06,
add_longus_l: 0.22, add_longus_r: 0.22,
add_brevis_l: 0.18, add_brevis_r: 0.18,
pectineus_l: 0.12, pectineus_r: 0.12,
gracilis_l: 0.10, gracilis_r: 0.10,
iliopsoas_l: 0.06, iliopsoas_r: 0.06,
psoas_major_l: 0.06, psoas_major_r: 0.06,
sartorius_l: 0.08, sartorius_r: 0.08,

// Back Squat — erectors (detailed, corrected)
spinalis_thor_l: 0.07, spinalis_thor_r: 0.07,
longissimus_thor_l: 0.07, longissimus_thor_r: 0.07,
iliocostalis_thor_l: 0.07, iliocostalis_thor_r: 0.07,

spinalis_lumb_l: 0.09, spinalis_lumb_r: 0.09,
longissimus_lumb_l: 0.09, longissimus_lumb_r: 0.09,
iliocostalis_lumb_l: 0.09, iliocostalis_lumb_r: 0.09,


// Adductors


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
  soleus_post_l: 0.028,  soleus_post_r: 0.028,

  rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
oblique_ex_l: 0.08, oblique_ex_r: 0.08,
oblique_int_l: 0.07, oblique_int_r: 0.07,
transverse_abs_l: 0.09, transverse_abs_r: 0.09,

// Romanian Deadlift
tensor_fascia_lata_l: 0.04, tensor_fascia_lata_r: 0.04,
add_longus_l: 0.22, add_longus_r: 0.22,
add_brevis_l: 0.18, add_brevis_r: 0.18,
pectineus_l: 0.12, pectineus_r: 0.12,
gracilis_l: 0.10, gracilis_r: 0.10,
iliopsoas_l: 0.04, iliopsoas_r: 0.04,
psoas_major_l: 0.04, psoas_major_r: 0.04,
sartorius_l: 0.06, sartorius_r: 0.06,

// Romanian Deadlift — erectors (detailed, corrected)
spinalis_thor_l: 0.084, spinalis_thor_r: 0.084,
longissimus_thor_l: 0.084, longissimus_thor_r: 0.084,
iliocostalis_thor_l: 0.084, iliocostalis_thor_r: 0.084,

spinalis_lumb_l: 0.12, spinalis_lumb_r: 0.12,
longissimus_lumb_l: 0.12, longissimus_lumb_r: 0.12,
iliocostalis_lumb_l: 0.12, iliocostalis_lumb_r: 0.12,

},

  "Leg Extension": {
  // Quads (isolation focus)
  quads_rf_upper_l: 0.28, quads_rf_upper_r: 0.28,   // RF contributes, reduced by hip flexion
  quads_rf_lower_l: 0.32, quads_rf_lower_r: 0.32,
  quads_vl_l: 0.90,       quads_vl_r: 0.90,
  quads_vm_l: 0.95,       quads_vm_r: 0.95,
  quads_vi_l: 0.85,       quads_vi_r: 0.85,
 },

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
  soleus_post_l: 0.016, soleus_post_r: 0.016, // 0.08 × 0.20

  // Seated Leg Curl — erectors (detailed)
// (was: erectors_thor_*: 0.02, erectors_lum_*: 0.02 per side)
spinalis_thor_l: 0.006, spinalis_thor_r: 0.006,
longissimus_thor_l: 0.010, longissimus_thor_r: 0.010,
iliocostalis_thor_l: 0.005, iliocostalis_thor_r: 0.005,

spinalis_lumb_l: 0.005, spinalis_lumb_r: 0.005,
longissimus_lumb_l: 0.011, longissimus_lumb_r: 0.011,
iliocostalis_lumb_l: 0.005, iliocostalis_lumb_r: 0.005,

},

  "Calf Raise (Standing)": {
  // Gastroc (standing bias; knee extended)
  gastro_med_l: 0.88, gastro_med_r: 0.88,
  gastro_lat_l: 0.88, gastro_lat_r: 0.88,

  // Soleus (secondary with straight knee)
  soleus_post_l: 0.30, soleus_post_r: 0.30
},
  "Calf Raise (Seated)": {
  // Soleus (knee flexed → prime mover)
  soleus_post_l: 0.92, soleus_post_r: 0.92,

  // Gastrocnemius (reduced with knee flexion)
  gastro_med_l: 0.38, gastro_med_r: 0.38,
  gastro_lat_l: 0.38, gastro_lat_r: 0.38
},

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
  cranial_glute_max_l: 0.20, cranial_glute_max_r: 0.20, // 0.25 × 0.8
  // Abduction Machine
tensor_fascia_lata_l: 0.66, tensor_fascia_lata_r: 0.66,  // mirrors your TFL intent
sartorius_l: 0.12, sartorius_r: 0.12,                     // minor hip abduction assist

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


  rectus_abdominis_upper_l: 0.03, rectus_abdominis_upper_r: 0.03,
rectus_abdominis_lower_l: 0.03, rectus_abdominis_lower_r: 0.03,
oblique_ex_l: 0.03, oblique_ex_r: 0.03,
oblique_int_l: 0.03, oblique_int_r: 0.03,
transverse_abs_l: 0.05, transverse_abs_r: 0.05,

// Seated Cable Row — erectors (detailed, corrected)
spinalis_thor_l: 0.04, spinalis_thor_r: 0.04,
longissimus_thor_l: 0.04, longissimus_thor_r: 0.04,
iliocostalis_thor_l: 0.04, iliocostalis_thor_r: 0.04,

spinalis_lumb_l: 0.03, spinalis_lumb_r: 0.03,
longissimus_lumb_l: 0.03, longissimus_lumb_r: 0.03,
iliocostalis_lumb_l: 0.03, iliocostalis_lumb_r: 0.03,


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

  // Calves
  gastro_med_l: 0.04, gastro_med_r: 0.04,
  gastro_lat_l: 0.04, gastro_lat_r: 0.04,
  soleus_post_l: 0.024, soleus_post_r: 0.024,

  rectus_abdominis_upper_l: 0.10, rectus_abdominis_upper_r: 0.10,
rectus_abdominis_lower_l: 0.08, rectus_abdominis_lower_r: 0.08,
oblique_ex_l: 0.06, oblique_ex_r: 0.06,
oblique_int_l: 0.06, oblique_int_r: 0.06,
transverse_abs_l: 0.08, transverse_abs_r: 0.08,

// Front Squat

tensor_fascia_lata_l: 0.06, tensor_fascia_lata_r: 0.06,
add_longus_l: 0.20, add_longus_r: 0.20,
add_brevis_l: 0.18, add_brevis_r: 0.18,
pectineus_l: 0.12, pectineus_r: 0.12,
gracilis_l: 0.10, gracilis_r: 0.10,
iliopsoas_l: 0.06, iliopsoas_r: 0.06,
psoas_major_l: 0.06, psoas_major_r: 0.06,
sartorius_l: 0.08, sartorius_r: 0.08,

// Front Squat — erectors (detailed, corrected)
spinalis_thor_l: 0.096, spinalis_thor_r: 0.096,
longissimus_thor_l: 0.096, longissimus_thor_r: 0.096,
iliocostalis_thor_l: 0.096, iliocostalis_thor_r: 0.096,

spinalis_lumb_l: 0.064, spinalis_lumb_r: 0.064,
longissimus_lumb_l: 0.064, longissimus_lumb_r: 0.064,
iliocostalis_lumb_l: 0.064, iliocostalis_lumb_r: 0.064,

},
"Seated French Press": {
  // Triceps (×1.0)
  triceps_long_l: 0.90, triceps_long_r: 0.90,
  triceps_med_l:  0.66, triceps_med_r:  0.66,
  triceps_lat_l:  0.60, triceps_lat_r:  0.60,

  // Stabilizers (minimal ROM 0.5 × no stretch 0.8 × stabilizer 0.5 = ×0.20)
  ant_delt_l: 0.044,  ant_delt_r: 0.044,
  serratus_l: 0.044,  serratus_r: 0.044,
  traps_upper_l: 0.048, traps_upper_r: 0.048,
  traps_lower_l: 0.040, traps_lower_r: 0.040,
  traps_mid_l:   0.028, traps_mid_r:   0.028,

  forearm_flex_l: 0.06, forearm_flex_r: 0.06
},

"Reverse Fly": {
  // Lats (minimal)
  lats_costal_l: 0.06, lats_costal_r: 0.06,
  lats_iliac_l:  0.05, lats_iliac_r:  0.05,
  lats_vertebral_l: 0.06, lats_vertebral_r: 0.06,

  // Teres major (stabilizer)
  teres_major_l: 0.25, teres_major_r: 0.25,

  // Scapular retractors/depressors
  rhomboids_l: 0.70, rhomboids_r: 0.70,
  traps_mid_l: 0.60, traps_mid_r: 0.60,
  traps_lower_l: 0.30, traps_lower_r: 0.30,

  // Posterior delts (prime mover)
  rear_delt_l: 0.85, rear_delt_r: 0.85,

  // Elbow flexors (minimal, static)
  bicep_short_l: 0.10, bicep_short_r: 0.10,
  bicep_long_l:  0.10, bicep_long_r:  0.10,
  brachialis_l:  0.10, brachialis_r:  0.10,

  // Grip (isometric)
  forearm_flex_l: 0.05, forearm_flex_r: 0.05,

  // Spinal erectors (isometric)
  erectors_thor_l: 0.03, erectors_thor_r: 0.03,
  erectors_lum_l:  0.02, erectors_lum_r:  0.02
},

"Face Pull": {
  // Lats (minimal)
  lats_costal_l: 0.08, lats_costal_r: 0.08,
  lats_iliac_l:  0.08, lats_iliac_r:  0.08,
  lats_vertebral_l: 0.10, lats_vertebral_r: 0.10,

  // Teres major (light)
  teres_major_l: 0.20, teres_major_r: 0.20,

  // Scapular retractors/depressors (big focus, incl. external rotation cue)
  rhomboids_l: 0.75, rhomboids_r: 0.75,
  traps_mid_l: 0.65, traps_mid_r: 0.65,
  traps_lower_l: 0.55, traps_lower_r: 0.55,

  // Posterior delts (major)
  rear_delt_l: 0.80, rear_delt_r: 0.80,

  // Elbow flexors (minor)
  bicep_short_l: 0.12, bicep_short_r: 0.12,
  bicep_long_l:  0.10, bicep_long_r:  0.10,
  brachialis_l:  0.10, brachialis_r:  0.10,

  // Grip (isometric)
  forearm_flex_l: 0.06, forearm_flex_r: 0.06,

  // Spinal erectors (isometric)
  erectors_thor_l: 0.03, erectors_thor_r: 0.03,
  erectors_lum_l:  0.02, erectors_lum_r:  0.02
},

"Barbell Shrug": {
  // Upper traps (prime mover)
  traps_upper_l: 0.95, traps_upper_r: 0.95,

  // Scapular retractors (assist/stabilize)
  traps_mid_l: 0.35,  traps_mid_r: 0.35,
  rhomboids_l: 0.25,  rhomboids_r: 0.25,
  traps_lower_l: 0.12, traps_lower_r: 0.12, // upward rotation/stability

  // Posterior delts (minor stabilization)
  rear_delt_l: 0.08, rear_delt_r: 0.08,

  // Lats (negligible)
  lats_costal_l: 0.03,  lats_costal_r: 0.03,
  lats_iliac_l:  0.02,  lats_iliac_r:  0.02,
  lats_vertebral_l: 0.03, lats_vertebral_r: 0.03,

  // Elbow flexors (isometric carry)
  bicep_short_l: 0.06, bicep_short_r: 0.06,
  bicep_long_l:  0.06, bicep_long_r:  0.06,
  brachialis_l:  0.06, brachialis_r:  0.06,

  // Grip (isometric)
  forearm_flex_l: 0.14, forearm_flex_r: 0.14,

  // Spinal erectors (standing support)
  erectors_thor_l: 0.06, erectors_thor_r: 0.06,
  erectors_lum_l:  0.07, erectors_lum_r:  0.07
},

"Leg Press": {
  // Quads
  quads_rf_upper_l: 0.36, quads_rf_upper_r: 0.36,
  quads_rf_lower_l: 0.40, quads_rf_lower_r: 0.40,
  quads_vl_l:       0.82, quads_vl_r:       0.82,
  quads_vm_l:       0.88, quads_vm_r:       0.88,
  quads_vi_l:       0.76, quads_vi_r:       0.76,

  // Glutes / adductors
  caudal_glute_max_l: 0.66, caudal_glute_max_r: 0.66,
  cranial_glute_max_l: 0.40, cranial_glute_max_r: 0.40,
  adductor_mag_l:      0.60, adductor_mag_r:      0.60,
  glute_med_l:         0.06, glute_med_r:         0.06,   // machine/stability reduced
  glute_min_l:         0.04, glute_min_r:         0.04,

  // Hamstrings (knee-dominant; minimal lengthening)
  ham_bf_long_l:  0.02, ham_bf_long_r:  0.02,
  ham_semimem_l:  0.02, ham_semimem_r:  0.02,
  ham_semitend_l: 0.02, ham_semitend_r: 0.02,

  // Calves (isometric assist through footplate)
  gastro_med_l: 0.04, gastro_med_r: 0.04,
  gastro_lat_l: 0.04, gastro_lat_r: 0.04,
  soleus_post_l: 0.03, soleus_post_r: 0.03,

  rectus_abdominis_upper_l: 0.02, rectus_abdominis_upper_r: 0.02,
rectus_abdominis_lower_l: 0.02, rectus_abdominis_lower_r: 0.02,
oblique_ex_l: 0.02, oblique_ex_r: 0.02,
oblique_int_l: 0.02, oblique_int_r: 0.02,
transverse_abs_l: 0.03, transverse_abs_r: 0.03,

// Leg Press

tensor_fascia_lata_l: 0.05, tensor_fascia_lata_r: 0.05,
add_longus_l: 0.18, add_longus_r: 0.18,
add_brevis_l: 0.16, add_brevis_r: 0.16,
pectineus_l: 0.10, pectineus_r: 0.10,
gracilis_l: 0.08, gracilis_r: 0.08,
iliopsoas_l: 0.04, iliopsoas_r: 0.04,
psoas_major_l: 0.04, psoas_major_r: 0.04,
sartorius_l: 0.06, sartorius_r: 0.06,

// Leg Press — erectors (detailed, corrected)
spinalis_thor_l: 0.02, spinalis_thor_r: 0.02,
longissimus_thor_l: 0.02, longissimus_thor_r: 0.02,
iliocostalis_thor_l: 0.02, iliocostalis_thor_r: 0.02,

spinalis_lumb_l: 0.02, spinalis_lumb_r: 0.02,
longissimus_lumb_l: 0.02, longissimus_lumb_r: 0.02,
iliocostalis_lumb_l: 0.02, iliocostalis_lumb_r: 0.02,


},

"Lunge (Walking)": {
  // Quads
  quads_rf_upper_l: 0.34, quads_rf_upper_r: 0.34,
  quads_rf_lower_l: 0.38, quads_rf_lower_r: 0.38,
  quads_vl_l:       0.74, quads_vl_r:       0.74,
  quads_vm_l:       0.78, quads_vm_r:       0.78,
  quads_vi_l:       0.62, quads_vi_r:       0.62,

  // Glutes / adductors
  caudal_glute_max_l: 0.58, caudal_glute_max_r: 0.58,
  cranial_glute_max_l: 0.34, cranial_glute_max_r: 0.34,
  adductor_mag_l:      0.56, adductor_mag_r:      0.56,
  glute_med_l:         0.10, glute_med_r:         0.10,

  // Hamstrings (knee-dominant; modest stretch on trailing leg)
  ham_bf_long_l:  0.05, ham_bf_long_r:  0.05,
  ham_semimem_l:  0.05, ham_semimem_r:  0.05,
  ham_semitend_l: 0.05, ham_semitend_r: 0.05,

  // Calves (foot stabilization)
  gastro_med_l: 0.05, gastro_med_r: 0.05,
  gastro_lat_l: 0.05, gastro_lat_r: 0.05,
  soleus_post_l: 0.04, soleus_post_r: 0.04,

  rectus_abdominis_upper_l: 0.06, rectus_abdominis_upper_r: 0.06,
rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
oblique_ex_l: 0.10, oblique_ex_r: 0.10,
oblique_int_l: 0.10, oblique_int_r: 0.10,
transverse_abs_l: 0.08, transverse_abs_r: 0.08,

// Lunge (Walking)
glute_min_l: 0.06, glute_min_r: 0.06,
tensor_fascia_lata_l: 0.08, tensor_fascia_lata_r: 0.08,
add_longus_l: 0.20, add_longus_r: 0.20,
add_brevis_l: 0.18, add_brevis_r: 0.18,
pectineus_l: 0.12, pectineus_r: 0.12,
gracilis_l: 0.10, gracilis_r: 0.10,
iliopsoas_l: 0.10, iliopsoas_r: 0.10,
psoas_major_l: 0.10, psoas_major_r: 0.10,
sartorius_l: 0.12, sartorius_r: 0.12,

// Lunge (Walking) — erectors (detailed, corrected)
spinalis_thor_l: 0.04, spinalis_thor_r: 0.04,
longissimus_thor_l: 0.04, longissimus_thor_r: 0.04,
iliocostalis_thor_l: 0.04, iliocostalis_thor_r: 0.04,

spinalis_lumb_l: 0.05, spinalis_lumb_r: 0.05,
longissimus_lumb_l: 0.05, longissimus_lumb_r: 0.05,
iliocostalis_lumb_l: 0.05, iliocostalis_lumb_r: 0.05,

},

"Hack Squat": {
  // Quads
  quads_rf_upper_l: 0.38, quads_rf_upper_r: 0.38,
  quads_rf_lower_l: 0.42, quads_rf_lower_r: 0.42,
  quads_vl_l:       0.82, quads_vl_r:       0.82,
  quads_vm_l:       0.88, quads_vm_r:       0.88,
  quads_vi_l:       0.72, quads_vi_r:       0.72,

  // Glutes / adductors (upright, knee-dominant; a bit less than leg press)
  caudal_glute_max_l: 0.56, caudal_glute_max_r: 0.56,
  cranial_glute_max_l: 0.32, cranial_glute_max_r: 0.32,
  adductor_mag_l:      0.62, adductor_mag_r:      0.62,
  glute_med_l:         0.06, glute_med_r:         0.06,
  glute_min_l:         0.04, glute_min_r:         0.04,

  // Hamstrings (minimal in this pattern)
  ham_bf_long_l:  0.02, ham_bf_long_r:  0.02,
  ham_semimem_l:  0.02, ham_semimem_r:  0.02,
  ham_semitend_l: 0.02, ham_semitend_r: 0.02,

   // Calves (footplate isometric)
  gastro_med_l: 0.04, gastro_med_r: 0.04,
  gastro_lat_l: 0.04, gastro_lat_r: 0.04,
  soleus_post_l: 0.03, soleus_post_r: 0.03,

  rectus_abdominis_upper_l: 0.02, rectus_abdominis_upper_r: 0.02,
rectus_abdominis_lower_l: 0.02, rectus_abdominis_lower_r: 0.02,
oblique_ex_l: 0.02, oblique_ex_r: 0.02,
oblique_int_l: 0.02, oblique_int_r: 0.02,
transverse_abs_l: 0.03, transverse_abs_r: 0.03,

// Hack Squat
tensor_fascia_lata_l: 0.05, tensor_fascia_lata_r: 0.05,
add_longus_l: 0.20, add_longus_r: 0.20,
add_brevis_l: 0.16, add_brevis_r: 0.16,
pectineus_l: 0.10, pectineus_r: 0.10,
gracilis_l: 0.08, gracilis_r: 0.08,
iliopsoas_l: 0.04, iliopsoas_r: 0.04,
psoas_major_l: 0.04, psoas_major_r: 0.04,
sartorius_l: 0.06, sartorius_r: 0.06,

// Hack Squat — erectors (detailed, corrected)
spinalis_thor_l: 0.02, spinalis_thor_r: 0.02,
longissimus_thor_l: 0.02, longissimus_thor_r: 0.02,
iliocostalis_thor_l: 0.02, iliocostalis_thor_r: 0.02,

spinalis_lumb_l: 0.02, spinalis_lumb_r: 0.02,
longissimus_lumb_l: 0.02, longissimus_lumb_r: 0.02,
iliocostalis_lumb_l: 0.02, iliocostalis_lumb_r: 0.02,

},

"Conventional Deadlift": {
  // Hamstrings (less than RDL, still high)
  ham_bf_long_l: 0.64, ham_bf_long_r: 0.64,
  ham_semimem_l: 0.60, ham_semimem_r: 0.60,
  ham_semitend_l: 0.56, ham_semitend_r: 0.56,
  ham_bf_short_l: 0.14, ham_bf_short_r: 0.14,

  // Glutes / adductors (very high)
  caudal_glute_max_l: 0.78, caudal_glute_max_r: 0.78,
  cranial_glute_max_l: 0.52, cranial_glute_max_r: 0.52,
  adductor_mag_l: 0.70,     adductor_mag_r: 0.70,

  // Quads (knee extension off the floor; moderate-low)
  quads_rf_upper_l: 0.10, quads_rf_upper_r: 0.10,
  quads_rf_lower_l: 0.12, quads_rf_lower_r: 0.12,
  quads_vl_l:       0.28, quads_vl_r:       0.28,
  quads_vm_l:       0.30, quads_vm_r:       0.30,
  quads_vi_l:       0.22, quads_vi_r:       0.22,

 // Conventional Deadlift — erectors (detailed, corrected)
spinalis_thor_l: 0.16, spinalis_thor_r: 0.16,
longissimus_thor_l: 0.16, longissimus_thor_r: 0.16,
iliocostalis_thor_l: 0.16, iliocostalis_thor_r: 0.16,

spinalis_lumb_l: 0.22, spinalis_lumb_r: 0.22,
longissimus_lumb_l: 0.22, longissimus_lumb_r: 0.22,
iliocostalis_lumb_l: 0.22, iliocostalis_lumb_r: 0.22,


  // Lats / traps (isometric bracing and scapular depression)
  lats_vertebral_l: 0.08, lats_vertebral_r: 0.08,
  lats_costal_l:    0.06, lats_costal_r:    0.06,
  lats_iliac_l:     0.05, lats_iliac_r:     0.05,
  traps_upper_l:    0.10, traps_upper_r:    0.10,
  traps_mid_l:      0.12, traps_mid_r:      0.12,
  traps_lower_l:    0.12, traps_lower_r:    0.12,
  rhomboids_l:      0.10, rhomboids_r:      0.10,

  // Forearms (static grip)
  forearm_flex_l: 0.20, forearm_flex_r: 0.20,

  // Calves (minimal isometric)
  gastro_med_l: 0.03, gastro_med_r: 0.03,
  gastro_lat_l: 0.03, gastro_lat_r: 0.03,
  soleus_post_l: 0.03, soleus_post_r: 0.03,

  rectus_abdominis_upper_l: 0.06, rectus_abdominis_upper_r: 0.06,
rectus_abdominis_lower_l: 0.08, rectus_abdominis_lower_r: 0.08,
oblique_ex_l: 0.10, oblique_ex_r: 0.10,
oblique_int_l: 0.08, oblique_int_r: 0.08,
transverse_abs_l: 0.10, transverse_abs_r: 0.10,

// Conventional Deadlift
glute_min_l: 0.05, glute_min_r: 0.05,
tensor_fascia_lata_l: 0.05, tensor_fascia_lata_r: 0.05,
add_longus_l: 0.22, add_longus_r: 0.22,
add_brevis_l: 0.18, add_brevis_r: 0.18,
pectineus_l: 0.12, pectineus_r: 0.12,
gracilis_l: 0.10, gracilis_r: 0.10,
iliopsoas_l: 0.04, iliopsoas_r: 0.04,
psoas_major_l: 0.04, psoas_major_r: 0.04,
sartorius_l: 0.06, sartorius_r: 0.06,
},

"Stiff-Legged Deadlift": {
  // Hamstrings (↑ vs RDL; greater long-length tension)
  ham_bf_long_l: 0.88, ham_bf_long_r: 0.88,
  ham_semimem_l: 0.84, ham_semimem_r: 0.84,
  ham_semitend_l: 0.80, ham_semitend_r: 0.80,
  ham_bf_short_l: 0.18, ham_bf_short_r: 0.18,

  // Glutes / adductors (slightly ↓ vs RDL due to straighter knee)
  caudal_glute_max_l: 0.68, caudal_glute_max_r: 0.68,
  cranial_glute_max_l: 0.40, cranial_glute_max_r: 0.40,
  adductor_mag_l: 0.60,     adductor_mag_r: 0.60,

  // Quads (minimal)
  quads_rf_upper_l: 0.02, quads_rf_upper_r: 0.02,
  quads_rf_lower_l: 0.02, quads_rf_lower_r: 0.02,
  quads_vl_l:       0.06, quads_vl_r:       0.06,
  quads_vm_l:       0.06, quads_vm_r:       0.06,
  quads_vi_l:       0.05, quads_vi_r:       0.05,

  // Upper back / lats (isometric bracing)
  traps_mid_l: 0.06,   traps_mid_r: 0.06,
  traps_upper_l: 0.04, traps_upper_r: 0.04,
  traps_lower_l: 0.06, traps_lower_r: 0.06,
  lats_vertebral_l: 0.04, lats_vertebral_r: 0.04,
  lats_costal_l:    0.03, lats_costal_r:    0.03,
  lats_iliac_l:     0.024, lats_iliac_r:    0.024,

  // Forearms / calves (isometric)
  forearm_flex_l: 0.16, forearm_flex_r: 0.16,
  gastro_med_l: 0.02,  gastro_med_r: 0.02,
  gastro_lat_l: 0.02,  gastro_lat_r: 0.02,
  soleus_post_l: 0.024, soleus_post_r: 0.024,

  rectus_abdominis_upper_l: 0.06, rectus_abdominis_upper_r: 0.06,
rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
oblique_ex_l: 0.09, oblique_ex_r: 0.09,
oblique_int_l: 0.08, oblique_int_r: 0.08,
transverse_abs_l: 0.10, transverse_abs_r: 0.10,

// Stiff-Legged Deadlift
glute_min_l: 0.04, glute_min_r: 0.04,
tensor_fascia_lata_l: 0.04, tensor_fascia_lata_r: 0.04,
add_longus_l: 0.20, add_longus_r: 0.20,
add_brevis_l: 0.16, add_brevis_r: 0.16,
pectineus_l: 0.10, pectineus_r: 0.10,
gracilis_l: 0.08, gracilis_r: 0.08,
iliopsoas_l: 0.04, iliopsoas_r: 0.04,
psoas_major_l: 0.04, psoas_major_r: 0.04,
sartorius_l: 0.06, sartorius_r: 0.06,

// Stiff-Legged Deadlift — erectors (detailed, corrected)
spinalis_thor_l: 0.12, spinalis_thor_r: 0.12,
longissimus_thor_l: 0.12, longissimus_thor_r: 0.12,
iliocostalis_thor_l: 0.12, iliocostalis_thor_r: 0.12,

spinalis_lumb_l: 0.16, spinalis_lumb_r: 0.16,
longissimus_lumb_l: 0.16, longissimus_lumb_r: 0.16,
iliocostalis_lumb_l: 0.16, iliocostalis_lumb_r: 0.16,

},

"Good Morning": {
  // Hamstrings (strong long-length tension; a touch below SLDL, near RDL)
  ham_bf_long_l: 0.80, ham_bf_long_r: 0.80,
  ham_semimem_l: 0.76, ham_semimem_r: 0.76,
  ham_semitend_l: 0.72, ham_semitend_r: 0.72,
  ham_bf_short_l: 0.16, ham_bf_short_r: 0.16,

  // Glutes / adductors (moderate; hinge-dominant with fixed knees)
  caudal_glute_max_l: 0.64, caudal_glute_max_r: 0.64,
  cranial_glute_max_l: 0.38, cranial_glute_max_r: 0.38,
  adductor_mag_l:     0.56, adductor_mag_r:     0.56,

  // Quads (minimal)
  quads_rf_upper_l: 0.03, quads_rf_upper_r: 0.03,
  quads_rf_lower_l: 0.03, quads_rf_lower_r: 0.03,
  quads_vl_l:       0.06, quads_vl_r:       0.06,
  quads_vm_l:       0.06, quads_vm_r:       0.06,
  quads_vi_l:       0.05, quads_vi_r:       0.05,

  // Upper back / lats / traps (isometric bracing with bar on back)
  traps_mid_l: 0.08,   traps_mid_r: 0.08,
  traps_upper_l: 0.06, traps_upper_r: 0.06,
  traps_lower_l: 0.06, traps_lower_r: 0.06,
  lats_vertebral_l: 0.04, lats_vertebral_r: 0.04,
  lats_costal_l:    0.03, lats_costal_r:    0.03,
  lats_iliac_l:     0.024, lats_iliac_r:    0.024,

  // Forearms (bar on back; negligible grip), calves (minimal isometric)
  forearm_flex_l: 0.02, forearm_flex_r: 0.02,
  gastro_med_l: 0.02,  gastro_med_r: 0.02,
  gastro_lat_l: 0.02,  gastro_lat_r: 0.02,
  soleus_post_l: 0.02, soleus_post_r: 0.02,

  rectus_abdominis_upper_l: 0.06, rectus_abdominis_upper_r: 0.06,
rectus_abdominis_lower_l: 0.07, rectus_abdominis_lower_r: 0.07,
oblique_ex_l: 0.08, oblique_ex_r: 0.08,
oblique_int_l: 0.08, oblique_int_r: 0.08,
transverse_abs_l: 0.10, transverse_abs_r: 0.10,

// Good Morning
glute_min_l: 0.04, glute_min_r: 0.04,
tensor_fascia_lata_l: 0.04, tensor_fascia_lata_r: 0.04,
add_longus_l: 0.18, add_longus_r: 0.18,
add_brevis_l: 0.16, add_brevis_r: 0.16,
pectineus_l: 0.10, pectineus_r: 0.10,
gracilis_l: 0.08, gracilis_r: 0.08,
iliopsoas_l: 0.04, iliopsoas_r: 0.04,
psoas_major_l: 0.04, psoas_major_r: 0.04,
sartorius_l: 0.06, sartorius_r: 0.06,

// Good Morning — erectors (detailed, corrected)
spinalis_thor_l: 0.14, spinalis_thor_r: 0.14,
longissimus_thor_l: 0.14, longissimus_thor_r: 0.14,
iliocostalis_thor_l: 0.14, iliocostalis_thor_r: 0.14,

spinalis_lumb_l: 0.20, spinalis_lumb_r: 0.20,
longissimus_lumb_l: 0.20, longissimus_lumb_r: 0.20,
iliocostalis_lumb_l: 0.20, iliocostalis_lumb_r: 0.20,


},

"Lying Leg Curl": {
  // Hamstrings (slightly ↓ vs seated curl due to less long-length tension)
  ham_bf_long_l: 0.80, ham_bf_long_r: 0.80,
  ham_semimem_l: 0.76, ham_semimem_r: 0.76,
  ham_semitend_l: 0.74, ham_semitend_r: 0.74,
  ham_bf_short_l: 0.66, ham_bf_short_r: 0.66,

  // Calves (gastroc assists knee flexion; modest, often reduced if plantarflexed)
  gastro_med_l: 0.10, gastro_med_r: 0.10,
  gastro_lat_l: 0.10, gastro_lat_r: 0.10,
  soleus_post_l: 0.012, soleus_post_r: 0.012,

  // Quads (antagonists; negligible)
  quads_rf_upper_l: 0.01, quads_rf_upper_r: 0.01,
  quads_rf_lower_l: 0.01, quads_rf_lower_r: 0.01,

  // Seated Leg Curl — erectors (detailed)
// (was: erectors_thor_*: 0.02, erectors_lum_*: 0.02 per side)
spinalis_thor_l: 0.006, spinalis_thor_r: 0.006,
longissimus_thor_l: 0.010, longissimus_thor_r: 0.010,
iliocostalis_thor_l: 0.005, iliocostalis_thor_r: 0.005,

spinalis_lumb_l: 0.005, spinalis_lumb_r: 0.005,
longissimus_lumb_l: 0.011, longissimus_lumb_r: 0.011,
iliocostalis_lumb_l: 0.005, iliocostalis_lumb_r: 0.005,

},

"Bench Press (Dumbbell)": {
  // Pecs (DB > BB due to ROM + loaded stretch)
  clavicular_l: 0.48, clavicular_r: 0.48,
  sternal_upper_l: 0.70, sternal_upper_r: 0.70,
  sternal_lower_l: 0.42, sternal_lower_r: 0.42,

  // Anterior delts (slightly ↑ vs BB)
  ant_delt_l: 0.28, ant_delt_r: 0.28,

  // Triceps (slightly ↓ vs BB)
  triceps_long_l: 0.20, triceps_long_r: 0.20,
  triceps_med_l:  0.32, triceps_med_r:  0.32,
  triceps_lat_l:  0.36, triceps_lat_r:  0.36,

  // Scapular stabilizers
  serratus_l: 0.05, serratus_r: 0.05,

rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
rectus_abdominis_lower_l: 0.05, rectus_abdominis_lower_r: 0.05,
oblique_ex_l: 0.05, oblique_ex_r: 0.05,
oblique_int_l: 0.05, oblique_int_r: 0.05,
transverse_abs_l: 0.06, transverse_abs_r: 0.06,

},

"Incline Bench Press (Dumbbell)": {
  // Pecs (DB > BB due to ROM + loaded stretch; incline biases clavicular)
  clavicular_l:     0.82, clavicular_r:     0.82,
  sternal_upper_l:  0.62, sternal_upper_r:  0.62,
  sternal_lower_l:  0.32, sternal_lower_r:  0.32,

  // Delts
  ant_delt_l: 0.40, ant_delt_r: 0.40,
  lat_delt_l: 0.08, lat_delt_r: 0.08,

  // Triceps (slightly ↓ vs barbell incline)
  triceps_long_l: 0.18, triceps_long_r: 0.18,
  triceps_med_l:  0.40, triceps_med_r:  0.40,
  triceps_lat_l:  0.36, triceps_lat_r:  0.36,

  // Scapular stabilizer
  serratus_l: 0.05, serratus_r: 0.05,

  rectus_abdominis_upper_l: 0.06, rectus_abdominis_upper_r: 0.06,
rectus_abdominis_lower_l: 0.05, rectus_abdominis_lower_r: 0.05,
oblique_ex_l: 0.06, oblique_ex_r: 0.06,
oblique_int_l: 0.06, oblique_int_r: 0.06,
transverse_abs_l: 0.07, transverse_abs_r: 0.07,

},

"Chest Press (Hammer Strength)": {
  // Pecs (machine path → a bit below DB, a touch above BB on mid-pec)
  clavicular_l:     0.45, clavicular_r:     0.45,
  sternal_upper_l:  0.66, sternal_upper_r:  0.66,
  sternal_lower_l:  0.40, sternal_lower_r:  0.40,

  // Anterior delts (between BB and DB)
  ant_delt_l: 0.26, ant_delt_r: 0.26,

  // Triceps (similar to DB/BB range; machine slightly lowers demand)
  triceps_long_l: 0.21, triceps_long_r: 0.21,
  triceps_med_l:  0.34, triceps_med_r:  0.34,
  triceps_lat_l:  0.36, triceps_lat_r:  0.36,

  // Scapular stabilizer (minimal on machine)
  serratus_l: 0.04, serratus_r: 0.04,

  rectus_abdominis_upper_l: 0.03, rectus_abdominis_upper_r: 0.03,
rectus_abdominis_lower_l: 0.03, rectus_abdominis_lower_r: 0.03,
oblique_ex_l: 0.03, oblique_ex_r: 0.03,
oblique_int_l: 0.03, oblique_int_r: 0.03,
transverse_abs_l: 0.04, transverse_abs_r: 0.04,

},

"Chest Press (Hammer Strength, Incline)": {
  // Pecs (incline biases clavicular; machine path < DB, ≈ or slightly > BB)
  clavicular_l:     0.80, clavicular_r:     0.80,  // DB incline 0.82, BB incline 0.78
  sternal_upper_l:  0.60, sternal_upper_r:  0.60,  // between DB 0.62 and BB 0.58
  sternal_lower_l:  0.31, sternal_lower_r:  0.31,  // between DB 0.32 and BB 0.30

  // Delts
  ant_delt_l: 0.38, ant_delt_r: 0.38,               // between DB 0.40 and BB 0.372
  lat_delt_l: 0.075, lat_delt_r: 0.075,

  // Triceps (machine slightly ↓ vs barbell, slightly ↑ vs DB for long head)
  triceps_long_l: 0.19, triceps_long_r: 0.19,       // between DB 0.18 and BB 0.20
  triceps_med_l:  0.42, triceps_med_r:  0.42,       // between DB 0.40 and BB 0.44
  triceps_lat_l:  0.38, triceps_lat_r:  0.38,       // between DB 0.36 and BB 0.40

  // Scapular stabilizer (machine support)
  serratus_l: 0.04, serratus_r: 0.04,

  rectus_abdominis_upper_l: 0.04, rectus_abdominis_upper_r: 0.04,
rectus_abdominis_lower_l: 0.03, rectus_abdominis_lower_r: 0.03,
oblique_ex_l: 0.04, oblique_ex_r: 0.04,
oblique_int_l: 0.04, oblique_int_r: 0.04,
transverse_abs_l: 0.05, transverse_abs_r: 0.05,

},

"Wrist Roller": {
  // Primary movers — forearms (both directions in each set)
  forearm_flex_l: 0.88, forearm_flex_r: 0.88,   // palms-up phase (concentric) + controlled eccentric
  forearm_ext_l:  0.88, forearm_ext_r:  0.88,   // palms-down phase and the reverse eccentric

  // Elbow/forearm stabilizers (minor dynamic assist)
  // (If you track these, keep modest; if not in your model, you can omit)
  // brachioradialis_l: 0.16, brachioradialis_r: 0.16,
  // pronator_teres_l:  0.12, pronator_teres_r:  0.12,
  // supinator_l:       0.12, supinator_r:       0.12,

  // Scapular/shoulder posture (arms held at shoulder height)
  traps_upper_l: 0.14, traps_upper_r: 0.14,
  traps_mid_l:   0.08, traps_mid_r:   0.08,
  traps_lower_l: 0.06, traps_lower_r: 0.06,
  rhomboids_l:   0.06, rhomboids_r:  0.06,
  serratus_l:    0.06, serratus_r:    0.06,

  // Spinal erectors (anti-extension/anti-flexion while standing)
  erectors_thor_l: 0.06, erectors_thor_r: 0.06,
  erectors_lum_l:  0.08, erectors_lum_r:  0.08,

  // Core wall (brace while resisting sway)
  rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
  rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
  oblique_ex_l: 0.06, oblique_ex_r: 0.06,
  oblique_int_l: 0.06, oblique_int_r: 0.06,
  transverse_abs_l: 0.08, transverse_abs_r: 0.08,

  // Wrist Roller — erectors (detailed)
  spinalis_thor_l:      0.017, spinalis_thor_r:      0.017,
  longissimus_thor_l:   0.030, longissimus_thor_r:   0.030,
  iliocostalis_thor_l:  0.013, iliocostalis_thor_r:  0.013,

  spinalis_lumb_l:      0.019, spinalis_lumb_r:      0.019,
  longissimus_lumb_l:   0.041, longissimus_lumb_r:   0.041,
  iliocostalis_lumb_l:  0.020, iliocostalis_lumb_r:  0.020,
},

"Barbell Row (Bent-Over)": {
  // Lats (moderate; less than Chin-Up, a touch around/below cable row bias)
  lats_costal_l:    0.36, lats_costal_r:    0.36,
  lats_iliac_l:     0.34, lats_iliac_r:     0.34,
  lats_vertebral_l: 0.48, lats_vertebral_r: 0.48,

  // Teres major (strong synergist with shoulder extension)
  teres_major_l: 0.46, teres_major_r: 0.46,

  // Scapular retractors/depressors (row bias < seated cable row’s peak)
  rhomboids_l: 0.70, rhomboids_r: 0.70,
  traps_mid_l: 0.60, traps_mid_r: 0.60,
  traps_lower_l: 0.30, traps_lower_r: 0.30,

  // Posterior delts (free-weight row tends to be higher than cable)
  rear_delt_l: 0.50, rear_delt_r: 0.50,

  // Upper traps (carry/anti-shear; modest)
  traps_upper_l: 0.10, traps_upper_r: 0.10,

  // Elbow flexors (overhand grip → slightly ↓ vs cable/neutral)
  bicep_short_l: 0.40, bicep_short_r: 0.40,
  bicep_long_l:  0.36, bicep_long_r:  0.36,
  brachialis_l:  0.44, brachialis_r:  0.44,

  // Grip (free-weight > cable seated)
  forearm_flex_l: 0.10, forearm_flex_r: 0.10,

  // Serratus (minor stabilization)
  serratus_l: 0.04, serratus_r: 0.04,

  rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
oblique_ex_l: 0.06, oblique_ex_r: 0.06,
oblique_int_l: 0.06, oblique_int_r: 0.06,
transverse_abs_l: 0.08, transverse_abs_r: 0.08,

// Barbell Row (Bent-Over) — erectors (detailed, corrected)
spinalis_thor_l: 0.14, spinalis_thor_r: 0.14,
longissimus_thor_l: 0.14, longissimus_thor_r: 0.14,
iliocostalis_thor_l: 0.14, iliocostalis_thor_r: 0.14,

spinalis_lumb_l: 0.18, spinalis_lumb_r: 0.18,
longissimus_lumb_l: 0.18, longissimus_lumb_r: 0.18,
iliocostalis_lumb_l: 0.18, iliocostalis_lumb_r: 0.18,

},

"T-Bar Row": {
  // Lats (neutral/close grip bias; < Chin-Up, ≈/↑ vs cable row on vertebral fibers)
  lats_costal_l:    0.40, lats_costal_r:    0.40,
  lats_iliac_l:     0.38, lats_iliac_r:     0.38,
  lats_vertebral_l: 0.52, lats_vertebral_r: 0.52,

  // Teres major (strong synergist with shoulder extension)
  teres_major_l: 0.48, teres_major_r: 0.48,

  // Scapular retractors/depressors (row bias; a touch < your seated cable row peak)
  rhomboids_l: 0.74, rhomboids_r: 0.74,
  traps_mid_l: 0.64, traps_mid_r: 0.64,
  traps_lower_l: 0.34, traps_lower_r: 0.34,

  // Posterior delts (free-weight row → higher than cable)
  rear_delt_l: 0.46, rear_delt_r: 0.46,

  // Upper traps (carry/anti-shear; modest)
  traps_upper_l: 0.10, traps_upper_r: 0.10,

  // Elbow flexors (neutral/close grip → ↑ brachialis/short head vs BB row)
  bicep_short_l: 0.44, bicep_short_r: 0.44,
  bicep_long_l:  0.40, bicep_long_r:  0.40,
  brachialis_l:  0.52, brachialis_r:  0.52,

  // Grip (free-weight handling)
  forearm_flex_l: 0.10, forearm_flex_r: 0.10,

  // Serratus (minor stabilization)
  serratus_l: 0.04, serratus_r: 0.04,

  rectus_abdominis_upper_l: 0.04, rectus_abdominis_upper_r: 0.04,
rectus_abdominis_lower_l: 0.05, rectus_abdominis_lower_r: 0.05,
oblique_ex_l: 0.05, oblique_ex_r: 0.05,
oblique_int_l: 0.05, oblique_int_r: 0.05,
transverse_abs_l: 0.07, transverse_abs_r: 0.07,

// T-Bar Row — erectors (detailed, corrected)
spinalis_thor_l: 0.12, spinalis_thor_r: 0.12,
longissimus_thor_l: 0.12, longissimus_thor_r: 0.12,
iliocostalis_thor_l: 0.12, iliocostalis_thor_r: 0.12,

spinalis_lumb_l: 0.16, spinalis_lumb_r: 0.16,
longissimus_lumb_l: 0.16, longissimus_lumb_r: 0.16,
iliocostalis_lumb_l: 0.16, iliocostalis_lumb_r: 0.16,

},

"Pull-Up": {
  // Lats (very high; close to Chin-Up but slightly different distribution)
  lats_costal_l:    0.78, lats_costal_r:    0.78,  // Chin-Up 0.80
  lats_iliac_l:     0.70, lats_iliac_r:     0.70,  // Chin-Up 0.72
  lats_vertebral_l: 0.64, lats_vertebral_r: 0.64,  // Chin-Up 0.65

  // Teres major
  teres_major_l: 0.58, teres_major_r: 0.58,        // Chin-Up 0.60

  // Elbow flexors (pronated ↓ vs Chin-Up)
  bicep_short_l: 0.55, bicep_short_r: 0.55,        // Chin-Up 0.75
  bicep_long_l:  0.50, bicep_long_r:  0.50,        // Chin-Up 0.60
  brachialis_l:  0.60, brachialis_r:  0.60,        // Chin-Up 0.70

  // Scapular retractors/depressors (slightly ↑ lower traps vs Chin-Up)
  traps_lower_l: 0.58, traps_lower_r: 0.58,        // Chin-Up 0.55
  traps_mid_l:   0.46, traps_mid_r:   0.46,        // Chin-Up 0.45
  rhomboids_l:   0.44, rhomboids_r:   0.44,        // Chin-Up 0.45

  // Posterior delts (slightly ↓ vs Chin-Up)
  rear_delt_l: 0.18, rear_delt_r: 0.18,            // Chin-Up 0.20

  // Serratus (stabilizer penalty retained)
  serratus_l: 0.05, serratus_r: 0.05,

  // Grip (isometric)
  forearm_flex_l: 0.08, forearm_flex_r: 0.08,

  rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
oblique_ex_l: 0.06, oblique_ex_r: 0.06,
oblique_int_l: 0.06, oblique_int_r: 0.06,
transverse_abs_l: 0.07, transverse_abs_r: 0.07,

},

"Hip Thrust": {
  // Glutes (primary)
  caudal_glute_max_l: 0.82, caudal_glute_max_r: 0.82,  // ≈ your prior 0.80
  cranial_glute_max_l: 0.62, cranial_glute_max_r: 0.62, // ≈ your prior 0.60
  glute_med_l:        0.10, glute_med_r:        0.10,
  glute_min_l:        0.08, glute_min_r:        0.08,

  // Adductors (assist hip ext.)
  adductor_mag_l: 0.40, adductor_mag_r: 0.40,

  // Hamstrings (knee flexed → moderate/low)
  ham_bf_long_l:  0.22, ham_bf_long_r:  0.22,  // matches your prior 0.20-ish
  ham_semimem_l:  0.18, ham_semimem_r:  0.18,
  ham_semitend_l: 0.18, ham_semitend_r: 0.18,
  ham_bf_short_l: 0.08, ham_bf_short_r: 0.08,

  // Quads (minimal; mostly isometric)
  quads_vm_l: 0.06, quads_vm_r: 0.06,
  quads_vl_l: 0.06, quads_vl_r: 0.06,
  quads_vi_l: 0.05, quads_vi_r: 0.05,
  quads_rf_upper_l: 0.04, quads_rf_upper_r: 0.04,
  quads_rf_lower_l: 0.04, quads_rf_lower_r: 0.04,


  // Calves (foot pressure on floorplate)
  gastro_med_l: 0.03, gastro_med_r: 0.03,
  gastro_lat_l: 0.03, gastro_lat_r: 0.03,
  soleus_post_l: 0.02, soleus_post_r: 0.02,

  rectus_abdominis_upper_l: 0.03, rectus_abdominis_upper_r: 0.03,
rectus_abdominis_lower_l: 0.03, rectus_abdominis_lower_r: 0.03,
oblique_ex_l: 0.03, oblique_ex_r: 0.03,
oblique_int_l: 0.03, oblique_int_r: 0.03,
transverse_abs_l: 0.04, transverse_abs_r: 0.04,

// Hip Thrust
tensor_fascia_lata_l: 0.08, tensor_fascia_lata_r: 0.08,
add_longus_l: 0.16, add_longus_r: 0.16,
add_brevis_l: 0.14, add_brevis_r: 0.14,
pectineus_l: 0.12, pectineus_r: 0.12,
gracilis_l: 0.10, gracilis_r: 0.10,
iliopsoas_l: 0.04, iliopsoas_r: 0.04,
psoas_major_l: 0.04, psoas_major_r: 0.04,
sartorius_l: 0.06, sartorius_r: 0.06,

// Hip Thrust — erectors (detailed)
// Hip Thrust — erectors (detailed, corrected)
spinalis_thor_l: 0.05, spinalis_thor_r: 0.05,
longissimus_thor_l: 0.05, longissimus_thor_r: 0.05,
iliocostalis_thor_l: 0.05, iliocostalis_thor_r: 0.05,

spinalis_lumb_l: 0.06, spinalis_lumb_r: 0.06,
longissimus_lumb_l: 0.06, longissimus_lumb_r: 0.06,
iliocostalis_lumb_l: 0.06, iliocostalis_lumb_r: 0.06,

},

"Dumbbell Fly (Flat)": {
  // Pecs (isolation; huge ROM + loaded stretch)
  sternal_upper_l: 0.86, sternal_upper_r: 0.86,
  sternal_lower_l: 0.82, sternal_lower_r: 0.82,
  clavicular_l:    0.42, clavicular_r:    0.42,

  // Anterior delts (assist, but less than presses)
  ant_delt_l: 0.18, ant_delt_r: 0.18,

  // Triceps (minimal elbow moment)
  triceps_long_l: 0.06, triceps_long_r: 0.06,
  triceps_med_l:  0.06, triceps_med_r:  0.06,
  triceps_lat_l:  0.06, triceps_lat_r:  0.06,

  // Scapular stabilizers (small)
  serratus_l: 0.04, serratus_r: 0.04
},

"Pec Deck Fly": {
  // Pecs (machine isolation; big ROM + stretch, fixed path)
  sternal_upper_l: 0.84, sternal_upper_r: 0.84,
  sternal_lower_l: 0.80, sternal_lower_r: 0.80,
  clavicular_l:    0.40, clavicular_r:    0.40,

  // Anterior delts (assist, a hair below DB fly)
  ant_delt_l: 0.16, ant_delt_r: 0.16,

  // Triceps (minimal elbow torque)
  triceps_long_l: 0.04, triceps_long_r: 0.04,
  triceps_med_l:  0.04, triceps_med_r:  0.04,
  triceps_lat_l:  0.04, triceps_lat_r:  0.04,

  // Scapular stabilizers (machine support)
  serratus_l: 0.03, serratus_r: 0.03
},

"Incline Dumbbell Fly": {
  // Pecs (incline biases clavicular; DB = big ROM + loaded stretch)
  clavicular_l:     0.88, clavicular_r:     0.88,
  sternal_upper_l:  0.70, sternal_upper_r:  0.70,
  sternal_lower_l:  0.30, sternal_lower_r:  0.30,

  // Anterior delts (a bit ↑ vs flat fly)
  ant_delt_l: 0.22, ant_delt_r: 0.22,

  // Triceps (minimal elbow torque)
  triceps_long_l: 0.05, triceps_long_r: 0.05,
  triceps_med_l:  0.05, triceps_med_r:  0.05,
  triceps_lat_l:  0.05, triceps_lat_r:  0.05,

  // Scapular stabilizers
  serratus_l: 0.04, serratus_r: 0.04
},

"Straight-Arm Pulldown (Half-Moon)": {
  // Lats (high, but < Chin-Up)
  lats_costal_l:    0.70, lats_costal_r:    0.70,
  lats_iliac_l:     0.64, lats_iliac_r:     0.64,
  lats_vertebral_l: 0.58, lats_vertebral_r: 0.58,

  // Teres major (strong synergist)
  teres_major_l: 0.50, teres_major_r: 0.50,

  // Scapular depression/retraction contributors
  traps_lower_l: 0.40, traps_lower_r: 0.40,
  traps_mid_l:   0.25, traps_mid_r:   0.25,
  rhomboids_l:   0.20, rhomboids_r:   0.20,

  // Serratus (scap control)
  serratus_l: 0.08, serratus_r: 0.08,

  // Posterior delts (minor)
  rear_delt_l: 0.15, rear_delt_r: 0.15,

  // Elbow flexors (kept minimal—arms straight)
  bicep_short_l: 0.06, bicep_short_r: 0.06,
  bicep_long_l:  0.06, bicep_long_r:  0.06,
  brachialis_l:  0.06, brachialis_r:  0.06,

  // Grip (isometric)
  forearm_flex_l: 0.05, forearm_flex_r: 0.05,

  rectus_abdominis_upper_l: 0.04, rectus_abdominis_upper_r: 0.04,
rectus_abdominis_lower_l: 0.04, rectus_abdominis_lower_r: 0.04,
oblique_ex_l: 0.05, oblique_ex_r: 0.05,
oblique_int_l: 0.05, oblique_int_r: 0.05,
transverse_abs_l: 0.06, transverse_abs_r: 0.06,

},

"Seated Overhead Press (Barbell)": {
  // Delts
  ant_delt_l: 0.72, ant_delt_r: 0.72,          // slightly ↑ vs standing due to torso support
  lat_delt_l: 0.38, lat_delt_r: 0.38,

  // Triceps (lateral ≥ medial > long, as in your pressing patterns)
  triceps_lat_l: 0.40, triceps_lat_r: 0.40,
  triceps_med_l: 0.38, triceps_med_r: 0.38,
  triceps_long_l: 0.28, triceps_long_r: 0.28,

  // Traps & scapular mechanics (reduced stabilization vs standing)
  traps_upper_l: 0.18, traps_upper_r: 0.18,
  traps_mid_l:   0.10, traps_mid_r:   0.10,
  traps_lower_l: 0.08, traps_lower_r: 0.08,

  // Upper chest assist (minimal on overhead)
  clavicular_l: 0.10, clavicular_r: 0.10,

  // Serratus (scapular upward rotation control)
  serratus_l: 0.05, serratus_r: 0.05,

  // Seated Overhead Press (Barbell) — erectors (detailed)
// (was: erectors_thor_*: 0.04, erectors_lum_*: 0.05)
spinalis_thor_l: 0.011, spinalis_thor_r: 0.011,
longissimus_thor_l: 0.020, longissimus_thor_r: 0.020,
iliocostalis_thor_l: 0.009, iliocostalis_thor_r: 0.009,

spinalis_lumb_l: 0.012, spinalis_lumb_r: 0.012,
longissimus_lumb_l: 0.028, longissimus_lumb_r: 0.028,
iliocostalis_lumb_l: 0.012, iliocostalis_lumb_r: 0.012,


  rectus_abdominis_upper_l: 0.03, rectus_abdominis_upper_r: 0.03,
rectus_abdominis_lower_l: 0.03, rectus_abdominis_lower_r: 0.03,
oblique_ex_l: 0.03, oblique_ex_r: 0.03,
oblique_int_l: 0.03, oblique_int_r: 0.03,
transverse_abs_l: 0.04, transverse_abs_r: 0.04,

},

"Seated Overhead Press (Dumbbell)": {
  // Delts (DB = ROM/stability ↑; seated = trunk stability ↓)
  ant_delt_l: 0.70, ant_delt_r: 0.70,
  lat_delt_l: 0.40, lat_delt_r: 0.40,

  // Triceps (lateral ≥ medial > long, slightly ↓ vs barbell)
  triceps_lat_l: 0.38, triceps_lat_r: 0.38,
  triceps_med_l: 0.36, triceps_med_r: 0.36,
  triceps_long_l: 0.26, triceps_long_r: 0.26,

  // Scapular mechanics (seated reduces stabilizer demand vs standing)
  traps_upper_l: 0.16, traps_upper_r: 0.16,
  traps_mid_l:   0.09, traps_mid_r:   0.09,
  traps_lower_l: 0.08, traps_lower_r: 0.08,

  // Upper chest assist (minimal on overhead)
  clavicular_l: 0.10, clavicular_r: 0.10,

  // Serratus (upward rotation control)
  serratus_l: 0.05, serratus_r: 0.05,

  // Seated Overhead Press (Dumbbell) — erectors (detailed)
// (was: erectors_thor_*: 0.03, erectors_lum_*: 0.04)
spinalis_thor_l: 0.008, spinalis_thor_r: 0.008,
longissimus_thor_l: 0.015, longissimus_thor_r: 0.015,
iliocostalis_thor_l: 0.007, iliocostalis_thor_r: 0.007,

spinalis_lumb_l: 0.009, spinalis_lumb_r: 0.009,
longissimus_lumb_l: 0.023, longissimus_lumb_r: 0.023,
iliocostalis_lumb_l: 0.009, iliocostalis_lumb_r: 0.009,


  rectus_abdominis_upper_l: 0.03, rectus_abdominis_upper_r: 0.03,
rectus_abdominis_lower_l: 0.03, rectus_abdominis_lower_r: 0.03,
oblique_ex_l: 0.03, oblique_ex_r: 0.03,
oblique_int_l: 0.03, oblique_int_r: 0.03,
transverse_abs_l: 0.04, transverse_abs_r: 0.04,



},

"Triceps Pushdown (Cable)": {
  // Triceps (long head less biased without shoulder flexion/overhead stretch)
  triceps_lat_l: 0.92, triceps_lat_r: 0.92,
  triceps_med_l: 0.88, triceps_med_r: 0.88,
  triceps_long_l: 0.50, triceps_long_r: 0.50,

  // Minimal helpers / stabilizers
  ant_delt_l: 0.04, ant_delt_r: 0.04,
  clavicular_l: 0.03, clavicular_r: 0.03,

  // Scapular/torso stabilizers (small)
  traps_mid_l: 0.02, traps_mid_r: 0.02,
  traps_lower_l: 0.02, traps_lower_r: 0.02,
  serratus_l: 0.02, serratus_r: 0.02,

  // Grip (isometric)
  forearm_flex_l: 0.10, forearm_flex_r: 0.10
},

"Upright Row (Narrow)": {
  // Delts (narrow → less lateral, a bit more anterior vs wide)
  lat_delt_l: 0.60, lat_delt_r: 0.60,
  ant_delt_l: 0.36, ant_delt_r: 0.36,
  post_delt_l: 0.24, post_delt_r: 0.24,

  // Traps & scapular upward rotation (↑ vs wide)
  traps_upper_l: 0.72, traps_upper_r: 0.72,
  traps_mid_l:   0.28, traps_mid_r:   0.28,
  traps_lower_l: 0.22, traps_lower_r: 0.22,
  rhomboids_l:   0.22, rhomboids_r:  0.22,

  // Elbow flexors (slightly ↑ with narrow path; still isometric)
  bicep_short_l: 0.06, bicep_short_r: 0.06
},

"Lateral Raise (Dumbbell)": {
  // Prime
  lat_delt_l: 0.96, lat_delt_r: 0.96,

  // Synergists / posture control
  ant_delt_l: 0.12, ant_delt_r: 0.12,
  post_delt_l: 0.10, post_delt_r: 0.10,

  // Scapular elevators & upward rotators (keep moderate to avoid shrug bias)
  traps_upper_l: 0.22, traps_upper_r: 0.22,
  traps_mid_l:   0.08, traps_mid_r:   0.08,
  traps_lower_l: 0.06, traps_lower_r: 0.06,
  rhomboids_l:   0.06, rhomboids_r:  0.06,

  // Scapular protraction control
  serratus_l: 0.04, serratus_r: 0.04
},

"Lateral Raise (Cable)": {
  // Constant tension + slight behind-the-body setup → very delt-focused
  lat_delt_l: 0.98, lat_delt_r: 0.98,

  // Synergists (similar, sometimes a touch more posterior delt)
  ant_delt_l: 0.10, ant_delt_r: 0.10,
  post_delt_l: 0.12, post_delt_r: 0.12,

  // Less shrugging than DB for many lifters
  traps_upper_l: 0.18, traps_upper_r: 0.18,
  traps_mid_l:   0.08, traps_mid_r:   0.08,
  traps_lower_l: 0.06, traps_lower_r: 0.06,
  rhomboids_l:   0.06, rhomboids_r:  0.06,
  serratus_l:    0.04, serratus_r:    0.04
},

"Cable Hip Abduction (Standing)": {
  // Primary abductors
  glute_med_l: 0.70, glute_med_r: 0.70,
  glute_min_l: 0.60, glute_min_r: 0.60,
  tensor_fasciae_l: 0.60, tensor_fasciae_r: 0.60,

  // Upper glute max fibers contribute to abduction from neutral
  cranial_glute_max_l: 0.22, cranial_glute_max_r: 0.22,

  // Light trunk/hip stabilization (standing, unilateral)
  erectors_thor_l: 0.03, erectors_thor_r: 0.03,
  erectors_lum_l:  0.03, erectors_lum_r:  0.03,

  // Cable Hip Abduction (Standing)
tensor_fascia_lata_l: 0.60, tensor_fascia_lata_r: 0.60,  // matches your note
sartorius_l: 0.12, sartorius_r: 0.12,

},


"French Press (Seated, EZ-Bar)": {
  // Triceps (overhead position biases long head)
  triceps_long_l: 0.90, triceps_long_r: 0.90,
  triceps_med_l:  0.66, triceps_med_r:  0.66,
  triceps_lat_l:  0.60, triceps_lat_r:  0.60,

  // Stabilizers (minimal; seated overhead)
  ant_delt_l: 0.044,  ant_delt_r: 0.044,
  serratus_l: 0.044,  serratus_r: 0.044,
  traps_upper_l: 0.048, traps_upper_r: 0.048,
  traps_lower_l: 0.040, traps_lower_r: 0.040,
  traps_mid_l:   0.028, traps_mid_r:   0.028,

  // Grip/forearm (holding EZ bar)
  forearm_flex_l: 0.06, forearm_flex_r: 0.06
},

"Farmer's Carry": {
  // Grip / wrist & finger flexors (dominant driver)
  forearm_flex_l: 0.90, forearm_flex_r: 0.90,

  // Traps & scapular stabilizers (heavy anti-depression/anti-tilt)
  traps_upper_l: 0.92, traps_upper_r: 0.92,
  traps_mid_l:   0.36, traps_mid_r:   0.36,
  traps_lower_l: 0.26, traps_lower_r: 0.26,
  rhomboids_l:   0.42, rhomboids_r:  0.42,

  // Core wall (brace + anti-rotation)
  rectus_abdominis_upper_l: 0.10, rectus_abdominis_upper_r: 0.10,
  rectus_abdominis_lower_l: 0.12, rectus_abdominis_lower_r: 0.12,
  oblique_ex_l: 0.16, oblique_ex_r: 0.16,
  oblique_int_l: 0.16, oblique_int_r: 0.16,
  transverse_abs_l: 0.18, transverse_abs_r: 0.18,

  // Delts (posture/arm position stabilization)
  ant_delt_l: 0.10, ant_delt_r: 0.10,
  lat_delt_l: 0.12, lat_delt_r: 0.12,
  post_delt_l: 0.06, post_delt_r: 0.06,

  // Lats (isometric depression/brace)
  lats_vertebral_l: 0.08, lats_vertebral_r: 0.08,

  // Lower-body isometric support during steps
  caudal_glute_max_l: 0.06, caudal_glute_max_r: 0.06,
  ham_bf_long_l: 0.05, ham_bf_long_r: 0.05,
  quads_vl_l: 0.05, quads_vl_r: 0.05,

  // Calves (stance stiffness)
  gastro_med_l: 0.08, gastro_med_r: 0.08,
  gastro_lat_l: 0.08, gastro_lat_r: 0.08,
  soleus_post_l: 0.06, soleus_post_r: 0.06,

// Farmer's Carry — erectors (detailed, corrected)
spinalis_thor_l: 0.22, spinalis_thor_r: 0.22,
longissimus_thor_l: 0.22, longissimus_thor_r: 0.22,
iliocostalis_thor_l: 0.22, iliocostalis_thor_r: 0.22,

spinalis_lumb_l: 0.28, spinalis_lumb_r: 0.28,
longissimus_lumb_l: 0.28, longissimus_lumb_r: 0.28,
iliocostalis_lumb_l: 0.28, iliocostalis_lumb_r: 0.28,


},

"Wrist Curl (Behind-the-Back, Barbell)": {
  // Primary movers — wrist/finger flexors (big stretch at bottom)
  forearm_flex_l: 0.96, forearm_flex_r: 0.96,

  // Posture/bracing (tiny, standing)
  erectors_thor_l: 0.02, erectors_thor_r: 0.02,
  erectors_lum_l:  0.02, erectors_lum_r:  0.02
},

"Crunch": {
  // Rectus abdominis (upper-biased but both sections work)
  rectus_abdominis_upper_l: 0.86, rectus_abdominis_upper_r: 0.86,
  rectus_abdominis_lower_l: 0.72, rectus_abdominis_lower_r: 0.72,

  // Obliques (stabilize ribcage/pelvis; no big rotation)
  oblique_ex_l: 0.18, oblique_ex_r: 0.18,
  oblique_int_l: 0.16, oblique_int_r: 0.16,

  // Deep core bracing
  transverse_abs_l: 0.12, transverse_abs_r: 0.12,

  iliopsoas_l: 0.06, iliopsoas_r: 0.06,
psoas_major_l: 0.06, psoas_major_r: 0.06,
sartorius_l: 0.03, sartorius_r: 0.03,

},
"Sit-Up": {
  // Rectus abdominis (more whole-trunk ROM than a crunch)
  rectus_abdominis_lower_l: 0.76, rectus_abdominis_lower_r: 0.76,
  rectus_abdominis_upper_l: 0.70, rectus_abdominis_upper_r: 0.70,

  // Obliques & deep core
  oblique_ex_l: 0.18, oblique_ex_r: 0.18,
  oblique_int_l: 0.16, oblique_int_r: 0.16,
  transverse_abs_l: 0.14, transverse_abs_r: 0.14,

  // Hip flexors (sit-up uses notable hip flexion vs. a crunch)
  iliopsoas_l: 0.72, iliopsoas_r: 0.72,
  psoas_major_l: 0.68, psoas_major_r: 0.68,
  quads_rf_upper_l: 0.28, quads_rf_upper_r: 0.28,   // rectus femoris (proximal)
  quads_rf_lower_l: 0.34, quads_rf_lower_r: 0.34,   // rectus femoris (distal)
  sartorius_l: 0.24, sartorius_r: 0.24,
  pectineus_l: 0.20, pectineus_r: 0.20
},


"Adduction Machine": {
  // Primary adductors (strong, controlled ROM; big end-range tension)
  adductor_mag_l: 0.82, adductor_mag_r: 0.82,   // magnus: primary engine
  add_longus_l:   0.72, add_longus_r:   0.72,   // longus: very high
  add_brevis_l:   0.64, add_brevis_r:   0.64,   // brevis: deep, strongly hit

  // Hip-flexion adductor (more bias with seated/hip-flexed setup)
  pectineus_l:    0.58, pectineus_r:    0.58,

  // Biarticular adductor (reduced when knee is flexed; still contributes)
  gracilis_l:     0.24, gracilis_r:     0.24
},

"Hanging Leg Raise (Straight-Leg)": {
  // Abs (posterior pelvic tilt at top)
  rectus_abdominis_lower_l: 0.78, rectus_abdominis_lower_r: 0.78,
  rectus_abdominis_upper_l: 0.44, rectus_abdominis_upper_r: 0.44,
  transverse_abs_l: 0.24,         transverse_abs_r: 0.24,

  // Hip flexors
  iliopsoas_l: 0.70, iliopsoas_r: 0.70,
  psoas_major_l: 0.66, psoas_major_r: 0.66,
  sartorius_l: 0.28, sartorius_r: 0.28,

  // Rectus femoris contribution (knee extended lever)
  quads_rf_upper_l: 0.28, quads_rf_upper_r: 0.28,
  quads_rf_lower_l: 0.34, quads_rf_lower_r: 0.34,

  // Scapular/lats/bracing (anti-swing, depression)
  lats_vertebral_l: 0.12, lats_vertebral_r: 0.12,
  traps_lower_l:    0.10, traps_lower_r:    0.10,
  traps_mid_l:      0.08, traps_mid_r:      0.08,
  rhomboids_l:      0.08, rhomboids_r:      0.08,
  serratus_l:       0.10, serratus_r:       0.10,

  // Grip
  forearm_flex_l: 0.20, forearm_flex_r: 0.20,

  // Low spinal support (anti-extension control)
  erectors_thor_l: 0.06, erectors_thor_r: 0.06,
  erectors_lum_l:  0.06, erectors_lum_r:  0.06
},
"Biceps Curl (EZ-Bar)": {
  // Elbow flexors
  bicep_short_l: 0.96, bicep_short_r: 0.96,
  bicep_long_l:  0.90, bicep_long_r:  0.90,
  brachialis_l:  0.40, brachialis_r:  0.40,

  // Grip/forearm (isometric)
  forearm_flex_l: 0.20, forearm_flex_r: 0.20,

  // Stabilizers (minimal)
  ant_delt_l: 0.04, ant_delt_r: 0.04
},

"Reverse Crunch": {
  // Rectus abdominis (pelvic tuck → lower bias)
  rectus_abdominis_lower_l: 0.88, rectus_abdominis_lower_r: 0.88,
  rectus_abdominis_upper_l: 0.68, rectus_abdominis_upper_r: 0.68,

  // Obliques (stabilize; minimal rotation)
  oblique_ex_l: 0.14, oblique_ex_r: 0.14,
  oblique_int_l: 0.12, oblique_int_r: 0.12,

  // Deep core (posterior pelvic tilt control)
  transverse_abs_l: 0.16, transverse_abs_r: 0.16,

  iliopsoas_l: 0.04, iliopsoas_r: 0.04,
psoas_major_l: 0.04, psoas_major_r: 0.04,
sartorius_l: 0.02, sartorius_r: 0.02,

},

"Yates Row (Underhand Barbell Row)": {
  // Lats (underhand, torso more upright → lat/teres bias > rear-delt)
  lats_costal_l:    0.68, lats_costal_r:    0.68,
  lats_iliac_l:     0.62, lats_iliac_r:     0.62,
  lats_vertebral_l: 0.58, lats_vertebral_r: 0.58,
  teres_major_l:    0.44, teres_major_r:    0.44,

  // Mid-back (a bit less than your overhand BB row)
  rhomboids_l: 0.45, rhomboids_r: 0.45,
  traps_mid_l: 0.30, traps_mid_r: 0.30,
  traps_lower_l: 0.24, traps_lower_r: 0.24,

  // Posterior delts (reduced vs overhand row)
  rear_delt_l: 0.28, rear_delt_r: 0.28,

  // Elbow flexors (higher with underhand grip/path)
  bicep_short_l: 0.52, bicep_short_r: 0.52,
  bicep_long_l:  0.46, bicep_long_r:  0.46,
  brachialis_l:  0.48, brachialis_r:  0.48,

  forearm_flex_l:  0.10, forearm_flex_r:  0.10,
  rectus_abdominis_upper_l: 0.04, rectus_abdominis_upper_r: 0.04,
rectus_abdominis_lower_l: 0.05, rectus_abdominis_lower_r: 0.05,
oblique_ex_l: 0.05, oblique_ex_r: 0.05,
oblique_int_l: 0.05, oblique_int_r: 0.05,
transverse_abs_l: 0.07, transverse_abs_r: 0.07,

// --- Spine muscles (detail) ---
// Yates Row (Underhand Barbell Row) — erectors (detailed, corrected)
spinalis_thor_l: 0.08, spinalis_thor_r: 0.08,
longissimus_thor_l: 0.08, longissimus_thor_r: 0.08,
iliocostalis_thor_l: 0.08, iliocostalis_thor_r: 0.08,

spinalis_lumb_l: 0.10, spinalis_lumb_r: 0.10,
longissimus_lumb_l: 0.10, longissimus_lumb_r: 0.10,
iliocostalis_lumb_l: 0.10, iliocostalis_lumb_r: 0.10,

},

"Underhand Barbell Row": {
  // Lats / teres (underhand bias; elbows tuck)
  lats_costal_l:    0.68, lats_costal_r:    0.68,
  lats_iliac_l:     0.62, lats_iliac_r:     0.62,
  lats_vertebral_l: 0.58, lats_vertebral_r: 0.58,
  teres_major_l:    0.44, teres_major_r:    0.44,

  // Mid-back (a bit lower than overhand BB row)
  rhomboids_l: 0.45, rhomboids_r: 0.45,
  traps_mid_l: 0.30, traps_mid_r: 0.30,
  traps_lower_l: 0.24, traps_lower_r: 0.24,

  // Posterior delts (reduced vs overhand)
  rear_delt_l: 0.28, rear_delt_r: 0.28,

  // Elbow flexors (higher with supinated grip)
  bicep_short_l: 0.52, bicep_short_r: 0.52,
  bicep_long_l:  0.46, bicep_long_r:  0.46,
  brachialis_l:  0.48, brachialis_r:  0.48,

  // Stabilizers
  erectors_thor_l: 0.08, erectors_thor_r: 0.08,
  erectors_lum_l:  0.10, erectors_lum_r:  0.10,
  forearm_flex_l:  0.10, forearm_flex_r:  0.10,

  rectus_abdominis_upper_l: 0.04, rectus_abdominis_upper_r: 0.04,
rectus_abdominis_lower_l: 0.05, rectus_abdominis_lower_r: 0.05,
oblique_ex_l: 0.05, oblique_ex_r: 0.05,
oblique_int_l: 0.05, oblique_int_r: 0.05,
transverse_abs_l: 0.07, transverse_abs_r: 0.07,

},


"Biceps Curl (Dumbbell)": {
  // Elbow flexors (DB allows full supination → strong both heads)
  bicep_short_l: 0.94, bicep_short_r: 0.94,
  bicep_long_l:  0.92, bicep_long_r:  0.92,
  brachialis_l:  0.42, brachialis_r:  0.42,

  // Grip/forearm (isometric hold)
  forearm_flex_l: 0.20, forearm_flex_r: 0.20,

  // Stabilizer/positioning (minimal)
  ant_delt_l: 0.04, ant_delt_r: 0.04
},

"Lat Pulldown (Pronated, Wide/Medium)": {
  // Lats (very high; close to Pull-Up, a touch more stable/seated)
  lats_costal_l:    0.76, lats_costal_r:    0.76,
  lats_iliac_l:     0.70, lats_iliac_r:     0.70,
  lats_vertebral_l: 0.62, lats_vertebral_r: 0.62,

  // Teres major (strong shoulder extension synergist)
  teres_major_l: 0.52, teres_major_r: 0.52,

  // Scapular retractors/depressors
  traps_lower_l: 0.52, traps_lower_r: 0.52,
  traps_mid_l:   0.42, traps_mid_r:   0.42,
  rhomboids_l:   0.42, rhomboids_r:   0.42,

  // Posterior delts (minor–moderate on pronated path)
  rear_delt_l: 0.20, rear_delt_r: 0.20,

  // Elbow flexors (pronated ↓ vs chin-up; similar to pull-up)
  bicep_short_l: 0.55, bicep_short_r: 0.55,
  bicep_long_l:  0.50, bicep_long_r:  0.50,
  brachialis_l:  0.60, brachialis_r:  0.60,

  // Serratus (scap control) & grip
  serratus_l: 0.06, serratus_r: 0.06,
  forearm_flex_l: 0.07, forearm_flex_r: 0.07,

  // Core (seated support → small)
  rectus_abdominis_upper_l: 0.04, rectus_abdominis_upper_r: 0.04,
  rectus_abdominis_lower_l: 0.04, rectus_abdominis_lower_r: 0.04,
  oblique_ex_l: 0.04, oblique_ex_r: 0.04,
  oblique_int_l: 0.04, oblique_int_r: 0.04,
  transverse_abs_l: 0.05, transverse_abs_r: 0.05,

  // Erectors (seated; low—values are absolute, not divided)
  spinalis_thor_l: 0.010, spinalis_thor_r: 0.010,
  longissimus_thor_l: 0.018, longissimus_thor_r: 0.018,
  iliocostalis_thor_l: 0.008, iliocostalis_thor_r: 0.008,

  spinalis_lumb_l: 0.010, spinalis_lumb_r: 0.010,
  longissimus_lumb_l: 0.024, longissimus_lumb_r: 0.024,
  iliocostalis_lumb_l: 0.010, iliocostalis_lumb_r: 0.010,
},

// WORKOUT_TARGETS_BY_NAME
"Lat Pulldown (Underhand/Chin-Grip)": {
  // Lats (slight ↑ vs pronated due to elbow path)
  lats_costal_l:    0.78, lats_costal_r:    0.78,
  lats_iliac_l:     0.72, lats_iliac_r:     0.72,
  lats_vertebral_l: 0.66, lats_vertebral_r: 0.66,

  // Teres major (strong synergist with shoulder extension)
  teres_major_l: 0.54, teres_major_r: 0.54,

  // Scapular retractors/depressors
  traps_lower_l: 0.50, traps_lower_r: 0.50,
  traps_mid_l:   0.42, traps_mid_r:   0.42,
  rhomboids_l:   0.44, rhomboids_r:   0.44,

  // Posterior delts (slightly ↓ vs rows)
  rear_delt_l: 0.18, rear_delt_r: 0.18,

  // Elbow flexors (↑ with supinated grip)
  bicep_short_l: 0.68, bicep_short_r: 0.68,
  bicep_long_l:  0.58, bicep_long_r:  0.58,
  brachialis_l:  0.66, brachialis_r:  0.66,

  // Serratus & grip
  serratus_l: 0.06, serratus_r: 0.06,
  forearm_flex_l: 0.07, forearm_flex_r: 0.07,

  // Core (seated; light)
  rectus_abdominis_upper_l: 0.04, rectus_abdominis_upper_r: 0.04,
  rectus_abdominis_lower_l: 0.04, rectus_abdominis_lower_r: 0.04,
  oblique_ex_l: 0.04, oblique_ex_r: 0.04,
  oblique_int_l: 0.04, oblique_int_r: 0.04,
  transverse_abs_l: 0.05, transverse_abs_r: 0.05,

  // Erectors (seated; low — absolute values, not divided)
  spinalis_thor_l: 0.010, spinalis_thor_r: 0.010,
  longissimus_thor_l: 0.018, longissimus_thor_r: 0.018,
  iliocostalis_thor_l: 0.008, iliocostalis_thor_r: 0.008,

  spinalis_lumb_l: 0.010, spinalis_lumb_r: 0.010,
  longissimus_lumb_l: 0.022, longissimus_lumb_r: 0.022,
  iliocostalis_lumb_l: 0.010, iliocostalis_lumb_r: 0.010,
},

// WORKOUT_TARGETS_BY_NAME
"Bent-Over Row (Dumbbell)": {
  // Lats (BB-row–like; slight neutral-grip bias with DBs)
  lats_costal_l:    0.38, lats_costal_r:    0.38,
  lats_iliac_l:     0.36, lats_iliac_r:     0.36,
  lats_vertebral_l: 0.48, lats_vertebral_r: 0.48,

  // Teres major
  teres_major_l: 0.46, teres_major_r: 0.46,

  // Scapular retractors/depressors
  rhomboids_l: 0.70, rhomboids_r: 0.70,
  traps_mid_l: 0.60, traps_mid_r: 0.60,
  traps_lower_l: 0.30, traps_lower_r: 0.30,

  // Posterior delts
  rear_delt_l: 0.48, rear_delt_r: 0.48,

  // Elbow flexors (neutral handles → ↑ brachialis/short head vs BB row)
  bicep_short_l: 0.46, bicep_short_r: 0.46,
  bicep_long_l:  0.40, bicep_long_r:  0.40,
  brachialis_l:  0.52, brachialis_r:  0.52,

  // Grip (isometric)
  forearm_flex_l: 0.10, forearm_flex_r: 0.10,

  // Serratus (minor stabilization)
  serratus_l: 0.04, serratus_r: 0.04,

  // Core / bracing (unsupported torso)
  rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
  rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
  oblique_ex_l: 0.06, oblique_ex_r: 0.06,
  oblique_int_l: 0.06, oblique_int_r: 0.06,
  transverse_abs_l: 0.08, transverse_abs_r: 0.08,

  // Erectors — detailed (absolute values; not divided)
  spinalis_thor_l: 0.039, spinalis_thor_r: 0.039,
  longissimus_thor_l: 0.070, longissimus_thor_r: 0.070,
  iliocostalis_thor_l: 0.031, iliocostalis_thor_r: 0.031,

  spinalis_lumb_l: 0.040, spinalis_lumb_r: 0.040,
  longissimus_lumb_l: 0.099, longissimus_lumb_r: 0.099,
  iliocostalis_lumb_l: 0.041, iliocostalis_lumb_r: 0.041,
},

// WORKOUT_TARGETS_BY_NAME
"Dumbbell Squat": {
  // Quads
  quads_rf_upper_l: 0.38, quads_rf_upper_r: 0.38,
  quads_rf_lower_l: 0.44, quads_rf_lower_r: 0.44,
  quads_vl_l:       0.76, quads_vl_r:       0.76,
  quads_vm_l:       0.80, quads_vm_r:       0.80,
  quads_vi_l:       0.68, quads_vi_r:       0.68,

  // Glutes / abductors / adductors
  caudal_glute_max_l: 0.60,  caudal_glute_max_r: 0.60,
  cranial_glute_max_l: 0.34, cranial_glute_max_r: 0.34,
  glute_med_l: 0.09,         glute_med_r: 0.09,
  glute_min_l: 0.06,         glute_min_r: 0.06,
  adductor_mag_l: 0.58,      adductor_mag_r: 0.58,

  // Minor adductors / hip flexors
  add_longus_l: 0.19, add_longus_r: 0.19,
  add_brevis_l: 0.16, add_brevis_r: 0.16,
  pectineus_l:  0.10, pectineus_r:  0.10,
  gracilis_l:   0.08, gracilis_r:   0.08,
  iliopsoas_l:  0.06, iliopsoas_r:  0.06,
  psoas_major_l:0.06, psoas_major_r:0.06,
  sartorius_l:  0.08, sartorius_r:  0.08,
  tensor_fascia_lata_l: 0.06, tensor_fascia_lata_r: 0.06,

  // Hamstrings (low)
  ham_bf_long_l:  0.04, ham_bf_long_r:  0.04,
  ham_semimem_l:  0.04, ham_semimem_r:  0.04,
  ham_semitend_l: 0.04, ham_semitend_r: 0.04,

  // Core (slightly less anterior loading than goblet; still solid brace)
  rectus_abdominis_upper_l: 0.10, rectus_abdominis_upper_r: 0.10,
  rectus_abdominis_lower_l: 0.09, rectus_abdominis_lower_r: 0.09,
  oblique_ex_l: 0.09, oblique_ex_r: 0.09,
  oblique_int_l: 0.09, oblique_int_r: 0.09,
  transverse_abs_l: 0.11, transverse_abs_r: 0.11,

  // Calves
  gastro_med_l: 0.04, gastro_med_r: 0.04,
  gastro_lat_l: 0.04, gastro_lat_r: 0.04,
  soleus_post_l: 0.024, soleus_post_r: 0.024,

  // Erectors — detailed (absolute; not divided/averaged)
  spinalis_thor_l: 0.022, spinalis_thor_r: 0.022,
  longissimus_thor_l: 0.038, longissimus_thor_r: 0.038,
  iliocostalis_thor_l: 0.017, iliocostalis_thor_r: 0.017,

  spinalis_lumb_l: 0.014, spinalis_lumb_r: 0.014,
  longissimus_lumb_l: 0.034, longissimus_lumb_r: 0.034,
  iliocostalis_lumb_l: 0.015, iliocostalis_lumb_r: 0.015,
},

// WORKOUT_TARGETS_BY_NAME
"Smith Machine Deadlift": {
  // Hamstrings (slightly ↓ vs barbell conventional due to guided path)
  ham_bf_long_l: 0.60, ham_bf_long_r: 0.60,
  ham_semimem_l: 0.56, ham_semimem_r: 0.56,
  ham_semitend_l: 0.52, ham_semitend_r: 0.52,
  ham_bf_short_l: 0.12, ham_bf_short_r: 0.12,

  // Glutes / adductors (still very high hip extension demand)
  caudal_glute_max_l: 0.74,  caudal_glute_max_r: 0.74,
  cranial_glute_max_l: 0.48, cranial_glute_max_r: 0.48,
  adductor_mag_l:      0.66, adductor_mag_r:      0.66,

  // Quads (often a touch ↑ with Smith setup)
  quads_rf_upper_l: 0.12, quads_rf_upper_r: 0.12,
  quads_rf_lower_l: 0.14, quads_rf_lower_r: 0.14,
  quads_vl_l:       0.30, quads_vl_r:       0.30,
  quads_vm_l:       0.32, quads_vm_r:       0.32,
  quads_vi_l:       0.24, quads_vi_r:       0.24,

  // Lats / traps (isometric bracing ↓ vs free bar)
  lats_vertebral_l: 0.06, lats_vertebral_r: 0.06,
  lats_costal_l:    0.05, lats_costal_r:    0.05,
  lats_iliac_l:     0.04, lats_iliac_r:     0.04,
  traps_upper_l:    0.08, traps_upper_r:    0.08,
  traps_mid_l:      0.10, traps_mid_r:      0.10,
  traps_lower_l:    0.10, traps_lower_r:    0.10,
  rhomboids_l:      0.08, rhomboids_r:      0.08,

  // Grip
  forearm_flex_l: 0.16, forearm_flex_r: 0.16,

  // Calves (minimal isometric)
  gastro_med_l: 0.03, gastro_med_r: 0.03,
  gastro_lat_l: 0.03, gastro_lat_r: 0.03,
  soleus_post_l: 0.03, soleus_post_r: 0.03,

  // Core (slightly ↓ vs free bar)
  rectus_abdominis_upper_l: 0.05, rectus_abdominis_upper_r: 0.05,
  rectus_abdominis_lower_l: 0.06, rectus_abdominis_lower_r: 0.06,
  oblique_ex_l: 0.08, oblique_ex_r: 0.08,
  oblique_int_l: 0.07, oblique_int_r: 0.07,
  transverse_abs_l: 0.09, transverse_abs_r: 0.09,

  // Abductors / smaller adductors / hip flexors
  glute_med_l: 0.05, glute_med_r: 0.05,
  glute_min_l: 0.04, glute_min_r: 0.04,
  tensor_fascia_lata_l: 0.05, tensor_fascia_lata_r: 0.05,
  add_longus_l: 0.20, add_longus_r: 0.20,
  add_brevis_l: 0.16, add_brevis_r: 0.16,
  pectineus_l: 0.12, pectineus_r: 0.12,
  gracilis_l: 0.10, gracilis_r: 0.10,
  iliopsoas_l: 0.04, iliopsoas_r: 0.04,
  psoas_major_l: 0.04, psoas_major_r: 0.04,
  sartorius_l: 0.06, sartorius_r: 0.06,

  // --- Erectors (detailed; not aggregated) ---
  // Slightly ↓ vs barbell due to guided bar path
  // Thoracic total ≈0.12 distributed by typical proportions
  spinalis_thor_l: 0.034, spinalis_thor_r: 0.034,
  longissimus_thor_l: 0.058, longissimus_thor_r: 0.058,
  iliocostalis_thor_l: 0.026, iliocostalis_thor_r: 0.026,

  // Lumbar total ≈0.16 distributed by typical proportions
  spinalis_lumb_l: 0.036, spinalis_lumb_r: 0.036,
  longissimus_lumb_l: 0.086, longissimus_lumb_r: 0.086,
  iliocostalis_lumb_l: 0.038, iliocostalis_lumb_r: 0.038,
},

// WORKOUT_TARGETS_BY_NAME
"Dumbbell Shrug": {
  // Upper traps (prime mover)
  traps_upper_l: 0.95, traps_upper_r: 0.95,

  // Scapular retractors / upward rotators
  traps_mid_l: 0.32,  traps_mid_r: 0.32,
  rhomboids_l: 0.24,  rhomboids_r: 0.24,
  traps_lower_l: 0.12, traps_lower_r: 0.12,

  // Posterior delts (minor stabilization)
  rear_delt_l: 0.10, rear_delt_r: 0.10,

  // Lats (negligible; arm hangs)
  lats_costal_l: 0.03,  lats_costal_r: 0.03,
  lats_iliac_l:  0.02,  lats_iliac_r:  0.02,
  lats_vertebral_l: 0.03, lats_vertebral_r: 0.03,

  // Elbow/hand—grip demand higher with DBs vs barbell
  forearm_flex_l: 0.18, forearm_flex_r: 0.18,

  // Core / posture (small but present)
  rectus_abdominis_upper_l: 0.03, rectus_abdominis_upper_r: 0.03,
  rectus_abdominis_lower_l: 0.03, rectus_abdominis_lower_r: 0.03,
  oblique_ex_l: 0.04, oblique_ex_r: 0.04,
  oblique_int_l: 0.04, oblique_int_r: 0.04,
  transverse_abs_l: 0.05, transverse_abs_r: 0.05,

  // --- Erectors (detailed; no aggregated fields) ---
  // Totals ≈ thor 0.06, lum 0.07; distributed by typical proportions
  spinalis_thor_l: 0.017, spinalis_thor_r: 0.017,
  longissimus_thor_l: 0.030, longissimus_thor_r: 0.030,
  iliocostalis_thor_l: 0.013, iliocostalis_thor_r: 0.013,

  spinalis_lumb_l: 0.018, spinalis_lumb_r: 0.018,
  longissimus_lumb_l: 0.038, longissimus_lumb_r: 0.038,
  iliocostalis_lumb_l: 0.014, iliocostalis_lumb_r: 0.014,
},

// WORKOUT_TARGETS_BY_NAME
"Smith Machine Shrug": {
  // Upper traps (prime mover; fixed path lets you overload)
  traps_upper_l: 0.97, traps_upper_r: 0.97,

  // Scapular retractors / upward rotators (slightly ↓ vs DB due to guidance)
  traps_mid_l: 0.28,  traps_mid_r: 0.28,
  rhomboids_l: 0.20,  rhomboids_r: 0.20,
  traps_lower_l: 0.12, traps_lower_r: 0.12,

  // Posterior delts (minor stabilization)
  rear_delt_l: 0.08, rear_delt_r: 0.08,

  // Lats (negligible)
  lats_costal_l: 0.02,  lats_costal_r: 0.02,
  lats_iliac_l:  0.02,  lats_iliac_r:  0.02,
  lats_vertebral_l: 0.02, lats_vertebral_r: 0.02,

  // Grip (less than DB; bar is fixed)
  forearm_flex_l: 0.10, forearm_flex_r: 0.10,

  // Core / posture (small)
  rectus_abdominis_upper_l: 0.02, rectus_abdominis_upper_r: 0.02,
  rectus_abdominis_lower_l: 0.02, rectus_abdominis_lower_r: 0.02,
  oblique_ex_l: 0.03, oblique_ex_r: 0.03,
  oblique_int_l: 0.03, oblique_int_r: 0.03,
  transverse_abs_l: 0.04, transverse_abs_r: 0.04,

  // --- Erectors (detailed; no aggregated fields) ---
  // Totals ≈ thor 0.05, lum 0.06 with Smith support
  spinalis_thor_l: 0.014, spinalis_thor_r: 0.014,
  longissimus_thor_l: 0.024, longissimus_thor_r: 0.024,
  iliocostalis_thor_l: 0.012, iliocostalis_thor_r: 0.012,

  spinalis_lumb_l: 0.016, spinalis_lumb_r: 0.016,
  longissimus_lumb_l: 0.032, longissimus_lumb_r: 0.032,
  iliocostalis_lumb_l: 0.012, iliocostalis_lumb_r: 0.012,
},

// WORKOUT_TARGETS_BY_NAME
"Goblet Squat": {
  // Quads (upright, knee-dominant)
  quads_rf_upper_l: 0.40, quads_rf_upper_r: 0.40,
  quads_rf_lower_l: 0.46, quads_rf_lower_r: 0.46,
  quads_vl_l:       0.78, quads_vl_r:       0.78,
  quads_vm_l:       0.82, quads_vm_r:       0.82,
  quads_vi_l:       0.70, quads_vi_r:       0.70,

  // Glutes / abductors / adductors
  caudal_glute_max_l: 0.58,  caudal_glute_max_r: 0.58,
  cranial_glute_max_l: 0.32, cranial_glute_max_r: 0.32,
  glute_med_l: 0.10,         glute_med_r: 0.10,
  glute_min_l: 0.06,         glute_min_r: 0.06,
  adductor_mag_l: 0.60,      adductor_mag_r: 0.60,

  // Minor adductors/hip flexors
  add_longus_l: 0.20, add_longus_r: 0.20,
  add_brevis_l: 0.16, add_brevis_r: 0.16,
  pectineus_l:  0.10, pectineus_r:  0.10,
  gracilis_l:   0.08, gracilis_r:   0.08,
  iliopsoas_l:  0.06, iliopsoas_r:  0.06,
  psoas_major_l:0.06, psoas_major_r:0.06,
  sartorius_l:  0.08, sartorius_r:  0.08,
  tensor_fascia_lata_l: 0.06, tensor_fascia_lata_r: 0.06,

  // Hamstrings (low in this pattern)
  ham_bf_long_l:  0.04, ham_bf_long_r:  0.04,
  ham_semimem_l:  0.04, ham_semimem_r:  0.04,
  ham_semitend_l: 0.04, ham_semitend_r: 0.04,

  // Core (anterior load → higher brace)
  rectus_abdominis_upper_l: 0.12, rectus_abdominis_upper_r: 0.12,
  rectus_abdominis_lower_l: 0.10, rectus_abdominis_lower_r: 0.10,
  oblique_ex_l: 0.10, oblique_ex_r: 0.10,
  oblique_int_l: 0.10, oblique_int_r: 0.10,
  transverse_abs_l: 0.12, transverse_abs_r: 0.12,

  // Calves (stance stiffness)
  gastro_med_l: 0.04, gastro_med_r: 0.04,
  gastro_lat_l: 0.04, gastro_lat_r: 0.04,
  soleus_post_l: 0.024, soleus_post_r: 0.024,

  // Erectors — detailed (absolute values; not divided by categories)
  spinalis_thor_l: 0.020, spinalis_thor_r: 0.020,
  longissimus_thor_l: 0.036, longissimus_thor_r: 0.036,
  iliocostalis_thor_l: 0.016, iliocostalis_thor_r: 0.016,

  spinalis_lumb_l: 0.012, spinalis_lumb_r: 0.012,
  longissimus_lumb_l: 0.030, longissimus_lumb_r: 0.030,
  iliocostalis_lumb_l: 0.013, iliocostalis_lumb_r: 0.013,
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
  // already present mappings (keep yours)
  "incline bench press": "incline bench press (barbell)",
  "overhead press": "overhead press (barbell)",
  "donkey calf raises": "donkey calf raise",
  "upright rows (wide)": "upright row (wide)",
  "barbell row (bent-over)": "barbell row",
  "lat pulldown (pronated, wide/medium)": "lat pulldown",

  // keep any others you had:
  "incline bench press (dumbbell)": "incline bench press (dumbbell)", // example passthrough
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
