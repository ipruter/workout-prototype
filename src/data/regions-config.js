// src/data/regions-config.js
// Your canonical region map: IDs, labels, and which view they belong to.
// Shapes are simple placeholders you can replace later with precise SVG paths.

export const REGION_META = {
  // --- FRONT (surface) ---
  ant_delt_l: { id: "ant_delt_l", label: "Anterior Deltoid (L)", view: "front" },
  ant_delt_r: { id: "ant_delt_r", label: "Anterior Deltoid (R)", view: "front" },
  lat_delt_l:        { id: "lat_delt_l",        label: "Lateral Deltoid (L)",      view: "front" },
  lat_delt_r:        { id: "lat_delt_r",        label: "Lateral Deltoid (R)",      view: "front" },
  clavicular_l:        { id: "clavicular_l",        label: "Clavicular (L)",        view: "front" },
  clavicular_r:        { id: "clavicular_r",        label: "Clavicular (R)",        view: "front" },
  sternal_upper_l:        { id: "sternal_upper_l",        label: "Sternal Upper (L)",        view: "front" },
  sternal_upper_r:        { id: "sternal_upper_r",        label: "Sternal Upper (R)",        view: "front" },
  sternal_lower_l:        { id: "sternal_lower_l",        label: "Sternal Lower (L)",        view: "front" },
  sternal_lower_r:        { id: "sternal_lower_r",        label: "Sternal Lower (R)",        view: "front" },
  bice_long_l:           { id: "bicep_long_l",           label: "Bicep Long (L)",             view: "front" },
  bicep_long_r:           { id: "bicep_long_r",           label: "Bicep Long (R)",             view: "front" },
    bice_short_l:          { id: "bicep_short_l",          label: "Bicep Short (L)",            view: "front" },
    bice_short_r:          { id: "bicep_short_r",          label: "Bicep Short (R)",            view: "front" },
    brachialis_l:        { id: "brachialis_l",        label: "Brachialis (L)",          view: "front" },
    brachialis_r:        { id: "brachialis_r",        label: "Brachialis (R)",          view: "front" },
  forearm_flexor_l:  { id: "forearm_flexor_l",  label: "Forearm Flexor (L)",    view: "front" },
  forearm_flexor_r:  { id: "forearm_flexor_r",  label: "Forearm Flexor (R)",    view: "front" },
  serratus_l:         { id: "serratus_l",         label: "Serratus Anterior (L)",  view: "front" },
  serratus_r:         { id: "serratus_r",         label: "Serratus Anterior (R)",  view: "front" },
  rectus_abdominis_upper_l: { id: "rectus_abdominis_upper_l", label: "Rectus Abdominis Upper (L)",   view: "front" },
    rectus_abdominis_upper_r: { id: "rectus_abdominis_upper_r", label: "Rectus Abdominis Upper (R)",   view: "front" },
    rectus_abdominis_lower_l: { id: "rectus_abdominis_lower_l", label: "Rectus Abdominis Lower (L)",   view: "front" },
    rectus_abdominis_lower_r: { id: "rectus_abdominis_lower_r", label: "Rectus Abdominis Lower (R)",   view: "front" },
  oblique_ex_l:         { id: "oblique_ex_l",         label: "Oblique External (L)",           view: "front" },
    oblique_ex_r:         { id: "oblique_ex_r",         label: "Oblique External (R)",           view: "front" },
    oblique_int_l:        { id: "oblique_int_l",        label: "Oblique Internal (L)",          view: "front" },
    oblique_int_r:        { id: "oblique_int_r",        label: "Oblique Internal (R)",          view: "front" },
  quads_rf_upper_l:         { id: "quads_rf_upper_l",         label: "Rectus Femoris Upper (L)",     view: "front" },
    quads_rf_upper_r:         { id: "quads_rf_upper_r",         label: "Rectus Femoris Upper (R)",     view: "front" },
    quads_rf_lower_l:         { id: "quads_rf_lower_l",         label: "Rectus Femoris Lower (L)",     view: "front" },
    quads_rf_lower_r:         { id: "quads_rf_lower_r",         label: "Rectus Femoris Lower (R)",     view: "front" },
  quads_vl_l:         { id: "quads_vl_l",         label: "Vastus Lateralis (L)",   view: "front" },
  quads_vl_r:         { id: "quads_vl_r",         label: "Vastus Lateralis (R)",   view: "front" },
  quads_vm_l:         { id: "quads_vm_l",         label: "Vastus Medialis (L)",    view: "front" },
  quads_vm_r:         { id: "quads_vm_r",         label: "Vastus Medialis (R)",    view: "front" },
  quads_vi_l:         { id: "quads_vi_l",         label: "Vastus Intermedius (L)", view: "front" },
    quads_vi_r:         { id: "quads_vi_r",         label: "Vastus Intermedius (R)", view: "front" },
  tibialis_ant_l:     { id: "tibialis_ant_l",     label: "Tibialis Anterior (L)",  view: "front" },
  tibialis_ant_r:     { id: "tibialis_ant_r",     label: "Tibialis Anterior (R)",  view: "front" },
  gastro_med_l:       { id: "gastro_med_l",       label: "Gastrocnemius (Med) (L)", view: "front" },
  gastro_med_r:       { id: "gastro_med_r",       label: "Gastrocnemius (Med) (R)", view: "front" },
  gastro_lat_l:       { id: "gastro_lat_l",       label: "Gastrocnemius (Lat) (L)", view: "front" },
  gastro_lat_r:       { id: "gastro_lat_r",       label: "Gastrocnemius (Lat) (R)", view: "front" },
  iliopsoas_l:       { id: "iliopsoas_l",       label: "Iliopsoas (L)",          view: "front" },
    iliopsoas_r:       { id: "iliopsoas_r",       label: "Iliopsoas (R)",          view: "front" },
  psoas_major_l:       { id: "psoas_major_l",       label: "Psoas Major (L)",        view: "front" },
    psoas_major_r:       { id: "psoas_major_r",       label: "Psoas Major (R)",        view: "front" },
    sartorius_l:        { id: "sartorius_l",        label: "Sartorius (L)",          view: "front" },
    sartorius_r:        { id: "sartorius_r",        label: "Sartorius (R)",          view: "front" },

  // --- BACK (surface) ---
  triceps_long_l:       { id: "triceps_long_l",       label: "Triceps Long (L)",         view: "back" },
  triceps_long_r:       { id: "triceps_long_r",       label: "Triceps Long (R)",         view: "back" },
  triceps_med_l:         { id: "triceps_med_l",         label: "Triceps Medial (L)",       view: "back" },
    triceps_med_r:         { id: "triceps_med_r",         label: "Triceps Medial (R)",       view: "back" },
    triceps_lat_l:          { id: "triceps_lat_l",          label: "Triceps Lateral (L)",      view: "back" },
    triceps_lat_r:          { id: "triceps_lat_r",          label: "Triceps Lateral (R)",      view: "back" },
  rear_delt_l:       { id: "rear_delt_l",       label: "Rear Deltoid (L)",         view: "back" },
  rear_delt_r:       { id: "rear_delt_r",       label: "Rear Deltoid (R)",         view: "back" },
  traps_upper_l:      { id: "traps_upper_l",      label: "Traps (Upper) (L)",      view: "back" },
  traps_upper_r:      { id: "traps_upper_r",      label: "Traps (Upper) (R)",      view: "back" },
  traps_mid_l:        { id: "traps_mid_l",        label: "Traps (Mid) (L)",        view: "back" },
  traps_mid_r:        { id: "traps_mid_r",        label: "Traps (Mid) (R)",        view: "back" },
  traps_lower_l:      { id: "traps_lower_l",      label: "Traps (Lower) (L)",      view: "back" },
  traps_lower_r:      { id: "traps_lower_r",      label: "Traps (Lower) (R)",      view: "back" },
  lats_vertebral_l:             { id: "lats_vertebral_l",             label: "Lats Vrtebral (L)", view: "back" },
  lats_vertebral_r:             { id: "lats_vertebral_r",             label: "Lats Vrtebral (R)",               view: "back" },
  lats_iliac_l:      { id: "lats_iliac_l",      label: "Lats Iliac (L)",        view: "back" },
  lats_iliac_r:      { id: "lats_iliac_r",      label: "Lats Iliac (R)",        view: "back" },
  lats_costal_l:      { id: "lats_costal_l",      label: "Lats Costal (L)",        view: "back" },
  lats_costal_r:      { id: "lats_costal_r",      label: "Lats Costal (R)",        view: "back" },
  teres_major_l:      { id: "teres_major_l",      label: "Teres Major (L)",        view: "back" },
  teres_major_r:      { id: "teres_major_r",      label: "Teres Major (R)",        view: "back" },
  rhomboids_l:        { id: "rhomboids_l",        label: "Rhomboids (L)",          view: "back" },
    rhomboids_r:        { id: "rhomboids_r",        label: "Rhomboids (R)",          view: "back" },
  erectors_thor_l:    { id: "erectors_thor_l",    label: "Erectors (Thor) (L)",    view: "back" },
    erectors_thor_r:    { id: "erectors_thor_r",    label: "Erectors (Thor) (R)",    view: "back" },
  erectors_lum_l:     { id: "erectors_lum_l",     label: "Erectors (Lum) (L)",     view: "back" },
    erectors_lum_r:     { id: "erectors_lum_r",     label: "Erectors (Lum) (R)",     view: "back" },
  forearm_ext_l:      { id: "forearm_ext_l",      label: "Forearm Extensor (L)",  view: "back" },
  forearm_ext_r:      { id: "forearm_ext_r",      label: "Forearm Extensor (R)",  view: "back" },
  cranial_glute_max_l:        { id: "cranial_glute_max_l",        label: "Cranial Glute Max (L)",          view: "back" },
  cranial_glute_max_r:        { id: "cranial_glute_max_r",        label: "Cranial Glute Max (R)",          view: "back" },
  caudal_glute_max_l:        { id: "caudal_glute_max_l",        label: "Caudal Glute Max (L)",          view: "back" },
  caudal_glute_max_r:        { id: "caudal_glute_max_r",        label: "Caudal Glute Max (R)",          view: "back" },
  glute_med_l:        { id: "glute_med_l",        label: "Gluteus Medius (L)",        view: "back" },
  glute_med_r:        { id: "glute_med_r",        label: "Gluteus Medius (R)",        view: "back" },
  glute_min_l:        { id: "glute_min_l",        label: "Gluteus Minimus (L)",        view: "back" },
  glute_min_r:        { id: "glute_min_r",        label: "Gluteus Minimus (R)",        view: "back" },
  tensor_fascia_lata_l:        { id: "tensor_fascia_lata_l",        label: "Tensor Fascia Lata (L)",        view: "back" },
  tensor_fascia_lata_r:        { id: "tensor_fascia_lata_r",        label: "Tensor Fascia Lata (R)",        view: "back" },
  ham_bf_long_l:           { id: "ham_bf_long_l",           label: "Biceps Femori Long(L)",     view: "back" },
    ham_bf_long_r:           { id: "ham_bf_long_r",           label: "Biceps Femori Long(R)",     view: "back" },
    ham_bf_short_l:          { id: "ham_bf_short_l",          label: "Biceps Femori Short(L)",    view: "back" },
    ham_bf_short_r:          { id: "ham_bf_short_r",          label: "Biceps Femori Short(R)",    view: "back" },
  ham_semitend_l:        { id: "ham_semitend_l",        label: "Semi-tend (L)",    view: "back" },
  ham_semitend_r:        { id: "ham_semitend_r",        label: "Semi-tend (R)",    view: "back" },
  ham_semimem_r:        { id: "ham_semimem_r",        label: "Semi-mem (R)",    view: "back" },
    ham_semimem_l:        { id: "ham_semimem_l",        label: "Semi-mem (L)",    view: "back" },
  soleus_post_l:      { id: "soleus_post_l",      label: "Soleus (Post) (L)",      view: "back" },
  soleus_post_r:      { id: "soleus_post_r",      label: "Soleus (Post) (R)",      view: "back" },

  // --- DEEP / HIDDEN ---
  //rotator_cuff_sup: { id: "rotator_cuff_sup", label: "Supraspinatus",       view: "deep" },
 // rotator_cuff_inf: { id: "rotator_cuff_inf", label: "Infraspinatus",       view: "deep" },
  //rotator_cuff_tm:  { id: "rotator_cuff_tm",  label: "Teres Minor",         view: "deep" },
  //subscapularis:    { id: "subscapularis",    label: "Subscapularis",       view: "deep" },
  transverse_abs:   { id: "transverse_abs",   label: "Transverse Abdominis",view: "deep" },
add_longus_l:        { id: "add_longus_l",        label: "Adductor (L)",           view: "deep" },
    add_longus_r:        { id: "add_longus_r",        label: "Adductor (R)",           view: "deep" },
  add_brevis_l:        { id: "add_brevis_l",        label: "Adductor Brevis (L)",     view: "deep" },
    add_brevis_r:        { id: "add_brevis_r",        label: "Adductor Brevis (R)",     view: "deep" },
    add_mag_l:        { id: "add_mag_l",        label: "Adductor Magnus (L)",     view: "deep" },
    add_mag_r:        { id: "add_mag_r",        label: "Adductor Magnus (R)",     view: "deep" },
    pectineus_l:        { id: "pectineus_l",        label: "Pectineus (L)",          view: "deep" },
    pectineus_r:        { id: "pectineus_r",        label: "Pectineus (R)",          view: "deep" },
  gracilis_l:        { id: "gracilis_l",        label: "Gracilis (L)",          view: "deep" },
    gracilis_r:        { id: "gracilis_r",        label: "Gracilis (R)",          view: "deep" },
  soleus_ant_l:       { id: "soleus_ant_l",       label: "Soleus (Ant/Deep) (L)",   view: "deep" },
  soleus_ant_r:       { id: "soleus_ant_r",       label: "Soleus (Ant/Deep) (R)",   view: "deep" },
};
// FRONT
const ANT_DELT_L = "M 54.5 55.8 L 66.4 54 L 52.6 76.2 L 30.8 101.3 L 28 90.9 L 43.1 72.4 Z";
const LAT_DELT_L = "M 54 54.6 L 44.6 67.9 L 28 88.8 L 29.4 78.3 L 35.6 66 L 43.1 59.4 Z";
const CLAVICULAR = "M 64.9 55.8 L 77.7 56.3 L 87.7 57.2 L 93.4 61 L 85.8 65.3 L 73 70.5 L 60.2 77.6 L 50.7 85.7 L 47.9 89.9 L 43.1 89.9 L 50.7 79 L 58.3 69.1 Z";
const STERNAL_UPPER = "M 47.4 89.9 L 54.5 82.3 L 67.8 72.9 L 79.2 68.6 L 89.6 64.3 L 93.8 63.4 L 98.1 67.2 L 97.2 74.3 L 97.6 82.3 L 95.3 88.5 L 83.4 89 L 73.5 88.5 L 60.7 87.1 L 49.8 88.5 Z";
const STERNAL_LOWER = "M 47.4 91.8 L 53.1 88 L 68.3 89 L 83.9 92.3 L 95.7 93.7 L 89.1 98.9 L 81.5 106 L 71.1 104.1 L 60.2 102.7 L 52.6 97.5 Z";
const BICEP_LONG_L = "";
const BICEP_SHORT_L = "";
const BRACHIALIS_L = "";
const FOREARM_L = "";
const SERRATUS_L = ""; 
const RECTUS_ABDOMINIS_UPPER_L = "";  
const RECTUS_ABDOMINIS_LOWER_L = "";
const OBLIQUE_EX_L = ""; 
const OBLIQUE_INT_L = "";
const QUADS_RF_UPPER_L = "";
const QUADS_RF_LOWER_L = "";
const QUADS_VL_L = "";
const QUADS_VM_L = "";
const QUADS_VI_L = "";
const TIBIALIS_ANT_L = "";
const GASTRO_MED_L = "";
const GASTRO_LAT_L = "";
const ILIOPOSOAS_L = "";
const PSOAS_MAJOR_L = "";
const SARTORIUS_L = "";

const TRICEPS_LONG_L = "";
const TRICEPS_MED_L = "";
const TRICEPS_LAT_L = "";
const REAR_DELT_L = "";
const TRAPS_UPPER_L = "";
const TRAPS_MID_L = "";
const TRAPS_LOWER_L = "";
const LATS_VERTEBRAL_L = "";
const LATS_ILIAC_L = "";
const LATS_COSTAL_L = "";
const TERES_MAJOR_L = "";
const RHOMBOIDS_L = "";
const ERECTORS_THOR_L = "";
const ERECTORS_LUM_L = "";
const FOREARM_EXT_L = "";
const CRANIAL_GLUTE_MAX = "";
const CAUDAL_GLUTE_MAX = "";
const GLUTE_MED_L = "";
const GLUTE_MIN_L = "";
const TENSOR_FASCIA_LATA_L = "";
const HAM_BF_LONG_L = "";
const HAM_BF_SHORT_L = "";
const HAM_SEMITEND_L = "";
const HAM_SEMIMEM_L = "";
const HAM_SEMIT_L = "";
const SOLEUS_POST_L = "";

const TRANSVERSE_ABS = "";
const SOLEUS_ANT_L = "";
const ADD_LONGUS_l = "";
const ADD_BREVIS_L = "";
const ADD_MAG_L = "";
const PECTINEUS_L = "";
const GRACILIS_L = "";


// Minimal SVG shapes for wiring; swap with precise SVG paths later (keep IDs).
export const SHAPES = {
  // FRONT
  ant_delt_l: { type: "path", d: ANT_DELT_L },
  ant_delt_r: { type: "path", d: ANT_DELT_L, transform: "scale(-1,1) translate(-200,0)" },
  lat_delt_l:       { type: "path", d: LAT_DELT_L },
  lat_delt_r:       { type: "path", d: LAT_DELT_L, transform: "scale(-1,1) translate(-200,0)" },
  clavicular_l:       { type: "path",   d: CLAVICULAR},
  clavicular_r:       { type: "path",   d: CLAVICULAR, transform: "scale(-1,1) translate(-200,0)"},
  sternal_upper_l:       { type: "path",   d: STERNAL_UPPER },
  sternal_upper_r:       { type: "path",   d: STERNAL_UPPER, transform: "scale(-1,1) translate(-200,0)" },
  sternal_lower_l:       { type: "path",   d: STERNAL_LOWER },
  sternal_lower_r:       { type: "path",   d: STERNAL_LOWER, transform: "scale(-1,1) translate(-200,0)" },
  bicep_long_l:          { type: "path", d: BICEP_LONG_L },
  bicep_long_r:          { type: "path", d: BICEP_LONG_L, transform: "scale(-1,1) translate(-200,0)" },
    bicep_short_l:         { type: "path", d: BICEP_SHORT_L },
    bicep_short_r:         { type: "path", d: BICEP_SHORT_L, transform: "scale(-1,1) translate(-200,0)" },
    brachialis_l:       { type: "path", d: BRACHIALIS_L },
    brachialis_r:       { type: "path", d: BRACHIALIS_L, transform: "scale(-1,1) translate(-200,0)" },
  forearm_flexor_l: { type: "path",   d: FOREARM_L },
  forearm_flexor_r: { type: "path",   d: FOREARM_L, transform: "scale(-1,1) translate(-200,0)"},
  serratus_l:        { type: "path",   d: SERRATUS_L },
  serratus_r:        { type: "path",   d: SERRATUS_L, transform: "scale(-1,1) translate(-200,0)" },
    rectus_abdominis_upper_l: { type: "path",   d: RECTUS_ABDOMINIS_UPPER_L },
    rectus_abdominis_upper_r: { type: "path",   d: RECTUS_ABDOMINIS_UPPER_L, transform: "scale(-1,1) translate(-200,0)" },
    rectus_abdominis_lower_l: { type: "path",   d: RECTUS_ABDOMINIS_LOWER_L },
    rectus_abdominis_lower_r: { type: "path",   d: RECTUS_ABDOMINIS_LOWER_L, transform: "scale(-1,1) translate(-200,0)" },
    oblique_ex_l:        { type: "path",   d: OBLIQUE_EX_L },
    oblique_ex_r:        { type: "path",   d: OBLIQUE_EX_L, transform: "scale(-1,1) translate(-200,0)" },
    oblique_int_l:       { type: "path",   d: OBLIQUE_INT_L },
    oblique_int_r:       { type: "path",   d: OBLIQUE_INT_L, transform: "scale(-1,1) translate(-200,0)" },
  quads_rf_upper_l:        { type: "path",   d: QUADS_RF_UPPER_L },
    quads_rf_upper_r:        { type: "path",   d: QUADS_RF_UPPER_L, transform: "scale(-1,1) translate(-200,0)" },
  quads_rf_lower_l:        { type: "path",   d: QUADS_RF_LOWER_L },
    quads_rf_lower_r:        { type: "path",   d: QUADS_RF_LOWER_L, transform: "scale(-1,1) translate(-200,0)" },
  quads_vl_l:        { type: "path",   d: QUADS_VL_L },
  quads_vl_r:        { type: "path",   d: QUADS_VL_L, transform: "scale(-1,1) translate(-200,0)" },
  quads_vm_l:        { type: "path",   d: QUADS_VM_L },
  quads_vm_r:        { type: "path",   d: QUADS_VM_L, transform: "scale(-1,1) translate(-200,0)" },
    quads_vi_l:        { type: "path",   d: QUADS_VI_L },
    quads_vi_r:        { type: "path",   d: QUADS_VI_L, transform: "scale(-1,1) translate(-200,0)" },
  tibialis_ant_l:    { type: "path",   d: TIBIALIS_ANT_L },
  tibialis_ant_r:    { type: "path",   d: TIBIALIS_ANT_L, transform: "scale(-1,1) translate(-200,0)" },
  gastro_med_l:      { type: "path",   d: GASTRO_MED_L },
  gastro_med_r:      { type: "path",   d: GASTRO_MED_L, transform: "scale(-1,1) translate(-200,0)" },
  gastro_lat_l:      { type: "path",   d: GASTRO_LAT_L },
  gastro_lat_r:      { type: "path",   d: GASTRO_LAT_L, transform: "scale(-1,1) translate(-200,0)" },
    iliopsoas_l:      { type: "path",   d: ILIOPOSOAS_L },
    iliopsoas_r:      { type: "path",   d: ILIOPOSOAS_L, transform: "scale(-1,1) translate(-200,0)" },
    psoas_major_l:      { type: "path",   d: PSOAS_MAJOR_L },
    psoas_major_r:      { type: "path",   d: PSOAS_MAJOR_L, transform: "scale(-1,1) translate(-200,0)" },
    sartorius_l:       { type: "path",   d: SARTORIUS_L },
    sartorius_r:       { type: "path",   d: SARTORIUS_L, transform: "scale(-1,1) translate(-200,0)" },

  // BACK
  triceps_lat_l:       { type: "path", d: TRICEPS_LAT_L },
  triceps_lat_r:       { type: "path", d: TRICEPS_LAT_L, transform: "scale(-1,1) translate(-200,0)" },
  triceps_med_l:         { type: "path", d: TRICEPS_MED_L },
    triceps_med_r:         { type: "path", d: TRICEPS_MED_L, transform: "scale(-1,1) translate(-200,0)" },
    triceps_long_l:       { type: "path", d: TRICEPS_LONG_L },
    triceps_long_r:       { type: "path", d: TRICEPS_LONG_L, transform: "scale(-1,1) translate(-200,0)" },
  rear_delt_l:      { type: "path", d: REAR_DELT_L },
  rear_delt_r:      { type: "path", d: REAR_DELT_L, transform: "scale(-1,1) translate(-200,0)" },
  traps_upper_l:     { type: "path",   d: TRAPS_UPPER_L },
  traps_upper_r:     { type: "path",   d: TRAPS_UPPER_L, transform: "scale(-1,1) translate(-200,0)" },
  traps_mid_l:       { type: "path",   d: TRAPS_MID_L },
  traps_mid_r:       { type: "path",   d: TRAPS_MID_L, transform: "scale(-1,1) translate(-200,0)" },
  traps_lower_l:     { type: "path",   d: TRAPS_LOWER_L },
  traps_lower_r:     { type: "path",   d: TRAPS_LOWER_L, transform: "scale(-1,1) translate(-200,0)" },
  lats_vertebral_l: { type: "path",   d: LATS_VERTEBRAL_L },
    lats_vertebral_r: { type: "path",   d: LATS_VERTEBRAL_L, transform: "scale(-1,1) translate(-200,0)" },
    lats_iliac_l:     { type: "path",   d: LATS_ILIAC_L },
    lats_iliac_r:     { type: "path",   d: LATS_ILIAC_L, transform: "scale(-1,1) translate(-200,0)" },
    lats_costal_l:     { type: "path",   d: LATS_COSTAL_L },
    lats_costal_r:     { type: "path",   d: LATS_COSTAL_L, transform: "scale(-1,1) translate(-200,0)" },
  teres_major_l:     { type: "path",   d: TERES_MAJOR_L },
  teres_major_r:     { type: "path",   d: TERES_MAJOR_L, transform: "scale(-1,1) translate(-200,0)" },
  rhomboids_l:       { type: "path",   d: RHOMBOIDS_L },
  rhomboids_r:       { type: "path",   d: RHOMBOIDS_L, transform: "scale(-1,1) translate(-200,0)" },
  erectors_lum_l:     { type: "path",   d: ERECTORS_LUM_L },
  erectors_lum_r:     { type: "path",   d: ERECTORS_LUM_L, transform: "scale(-1,1) translate(-200,0)" },
  erectors_thor_l:     { type: "path",   d: ERECTORS_THOR_L },
  erectors_thor_r:     { type: "path",   d: ERECTORS_THOR_L, transform: "scale(-1,1) translate(-200,0)" },
  forearm_ext_l:     { type: "path",   d: FOREARM_EXT_L },
  forearm_ext_r:     { type: "path",   d: FOREARM_EXT_L, transform: "scale(-1,1) translate(-200,0)" },
  cranial_glute_max_l:       { type: "path",   d: CRANIAL_GLUTE_MAX },
  cranial_glute_max_r:       { type: "path",   d: CRANIAL_GLUTE_MAX , transform: "scale(-1,1) translate(-200,0)"},
  caudal_glute_max_l:       { type: "path",   d: CAUDAL_GLUTE_MAX },
  caudal_glute_max_r:       { type: "path",   d: CAUDAL_GLUTE_MAX , transform: "scale(-1,1) translate(-200,0)"},
  glute_med_l:       { type: "path",   d: GLUTE_MED_L },
  glute_med_r:       { type: "path",   d: GLUTE_MED_L, transform: "scale(-1,1) translate(-200,0)" },
  glute_min_l:       { type: "path",   d: GLUTE_MED_L },
  glute_min_r:       { type: "path",   d: GLUTE_MED_L, transform: "scale(-1,1) translate(-200,0)" },
    tensor_fascia_lata_l:       { type: "path",   d: TENSOR_FASCIA_LATA_L },
    tensor_fascia_lata_r:       { type: "path",   d: TENSOR_FASCIA_LATA_L, transform: "scale(-1,1) translate(-200,0)" },
  ham_bf_long_l:        { type: "path",   d: HAM_BF_LONG_L },
    ham_bf_long_r:        { type: "path",   d: HAM_BF_LONG_L, transform: "scale(-1,1) translate(-200,0)" },
    ham_bf_short_l:       { type: "path",   d: HAM_BF_SHORT_L },
    ham_bf_short_r:       { type: "path",   d: HAM_BF_SHORT_L, transform: "scale(-1,1) translate(-200,0)" },
    ham_semitend_l:     { type: "path",   d: HAM_SEMITEND_L },
    ham_semitend_r:     { type: "path",   d: HAM_SEMITEND_L, transform: "scale(-1,1) translate(-200,0)" },
    ham_semimem_l:     { type: "path",   d: HAM_SEMIMEM_L },
    ham_semimem_r:     { type: "path",   d: HAM_SEMIMEM_L, transform: "scale(-1,1) translate(-200,0)" },
  soleus_post_l:     { type: "path",   d: SOLEUS_ANT_L },
  soleus_post_r:     { type: "path",   d: SOLEUS_ANT_L, transform: "scale(-1,1) translate(-200,0)" },

  // DEEP / HIDDEN (approx placements)
  //rotator_cuff_sup:{ type: "rect",   x: 72,  y: 96,  w: 20, h: 10, rx: 4 },
  //rotator_cuff_inf:{ type: "rect",   x: 72,  y: 108, w: 24, h: 10, rx: 4 },
  //rotator_cuff_tm: { type: "rect",   x: 72,  y: 120, w: 18, h: 8,  rx: 4 },
  //subscapularis:   { type: "rect",   x: 110, y: 120, w: 18, h: 10, rx: 4 },
  transverse_abs:  { type: "path",   d: TRANSVERSE_ABS },
    add_longus_l:        { type: "path",   d: ADD_LONGUS_l },
    add_longus_r:        { type: "path",   d: ADD_LONGUS_l, transform: "scale(-1,1) translate(-200,0)" },
    add_brevis_l:        { type: "path",   d: ADD_BREVIS_L },
    add_brevis_r:        { type: "path",   d: ADD_BREVIS_L, transform: "scale(-1,1) translate(-200,0)" },
    add_mag_l:        { type: "path",   d: ADD_MAG_L },
    add_mag_r:        { type: "path",   d: ADD_MAG_L, transform: "scale(-1,1) translate(-200,0)" },
    pectineus_l:        { type: "path",   d: PECTINEUS_L },
    pectineus_r:        { type: "path",   d: PECTINEUS_L, transform: "scale(-1,1) translate(-200,0)" },
    gracilis_l:        { type: "path",   d: GRACILIS_L },
    gracilis_r:        { type: "path",   d: GRACILIS_L, transform: "scale(-1,1) translate(-200,0)" },
  soleus_ant_l:      { type: "path",   d: SOLEUS_ANT_L },
  soleus_ant_r:      { type: "path",   d: SOLEUS_ANT_L, transform: "scale(-1,1) translate(-200,0)" },
};
