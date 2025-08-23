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
    brachialis_l:        { id: "brachialis_l",        label: "Brachialis (L)",          view: "deep", side: "front" },
    brachialis_r:        { id: "brachialis_r",        label: "Brachialis (R)",          view: "deep", side: "front" },
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
  quads_vi_l:         { id: "quads_vi_l",         label: "Vastus Intermedius (L)", view: "front", side: "front" },
    quads_vi_r:         { id: "quads_vi_r",         label: "Vastus Intermedius (R)", view: "front", side: "front" },
  tibialis_ant_l:     { id: "tibialis_ant_l",     label: "Tibialis Anterior (L)",  view: "front" },
  tibialis_ant_r:     { id: "tibialis_ant_r",     label: "Tibialis Anterior (R)",  view: "front" },
  gastro_med_l:       { id: "gastro_med_l",       label: "Gastrocnemius (Med) (L)", view: "back" },
  gastro_med_r:       { id: "gastro_med_r",       label: "Gastrocnemius (Med) (R)", view: "back" },
  gastro_lat_l:       { id: "gastro_lat_l",       label: "Gastrocnemius (Lat) (L)", view: "back" },
  gastro_lat_r:       { id: "gastro_lat_r",       label: "Gastrocnemius (Lat) (R)", view: "back" },
  iliopsoas_l:       { id: "iliopsoas_l",       label: "Iliopsoas (L)",          view: "deep", side: "front" },
    iliopsoas_r:       { id: "iliopsoas_r",       label: "Iliopsoas (R)",          view: "deep", side: "front" },
  psoas_major_l:       { id: "psoas_major_l",       label: "Psoas Major (L)",        view: "deep", side: "front" },
    psoas_major_r:       { id: "psoas_major_r",       label: "Psoas Major (R)",        view: "deep", side: "front" },
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
  rhomboids_l:        { id: "rhomboids_l",        label: "Rhomboids (L)",          view: "deep", side: "back" },
    rhomboids_r:        { id: "rhomboids_r",        label: "Rhomboids (R)",          view: "deep", side: "back" },
  spinalis_thor_l:    { id: "spinalis_thor_l",    label: "Spinalis (Thor) (L)",    view: "deep", side: "back" },
  spinalis_thor_r:    { id: "spinalis_thor_r",    label: "Spinalis (Thor) (R)",    view: "deep", side: "back" },
  spinalis_lumb_l:    { id: "spinalis_lumb_l",    label: "Spinalis (Lumb) (L)",    view: "deep", side: "back" },
  spinalis_lumb_r:    { id: "spinalis_lumb_r",    label: "Spinalis (Lumb) (R)",    view: "deep", side: "back" },
  longissimus_thor_l:    { id: "longissimus_thor_l",    label: "Longissimus (Thor) (L)",    view: "deep", side: "back" },
  longissimus_thor_r:    { id: "longissimus_thor_r",    label: "Longissimus (Thor) (R)",    view: "deep", side: "back" },
  longissimus_lumb_l:    { id: "longissimus_lumb_l",    label: "Longissimus (Lumb) (L)",    view: "deep", side: "back" },
  longissimus_lumb_r:    { id: "longissimus_lumb_r",    label: "Longissimus (Lumb) (R)",    view: "deep", side: "back" },
  iliocostalis_lumb_l:    { id: "iliocostalis_lumb_l",    label: "Iliocostalis (Lumb) (L)",    view: "deep", side: "back" },
  iliocostalis_lumb_r:    { id: "iliocostalis_lumb_r",    label: "Iliocostalis (Lumb) (R)",    view: "deep", side: "back" },
  iliocostalis_thor_l:    { id: "iliocostalis_thor_l",    label: "Iliocostalis (Thor) (L)",    view: "deep", side: "back" },
  iliocostalis_thor_r:    { id: "iliocostalis_thor_r",    label: "Iliocostalis (Thor) (R)",    view: "deep", side: "back" },
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
  soleus_post_l:      { id: "soleus_post_l",      label: "Soleus (Post) (L)",      view: "deep", side: "back" },
  soleus_post_r:      { id: "soleus_post_r",      label: "Soleus (Post) (R)",      view: "deep", side: "back" },

  // --- DEEP / HIDDEN ---
  //rotator_cuff_sup: { id: "rotator_cuff_sup", label: "Supraspinatus",       view: "deep" },
 // rotator_cuff_inf: { id: "rotator_cuff_inf", label: "Infraspinatus",       view: "deep" },
  //rotator_cuff_tm:  { id: "rotator_cuff_tm",  label: "Teres Minor",         view: "deep" },
  //subscapularis:    { id: "subscapularis",    label: "Subscapularis",       view: "deep" },
  transverse_abs_l:   { id: "transverse_abs_l",   label: "Transverse Abdominis (L)",view: "deep", side: "front" },
  transverse_abs_r:   { id: "transverse_abs_r",   label: "Transverse Abdominis (R)",view: "deep", side: "front" },
add_longus_l:        { id: "add_longus_l",        label: "Adductor (L)",           view: "front" },
    add_longus_r:        { id: "add_longus_r",        label: "Adductor (R)",           view: "front" },
  add_brevis_l:        { id: "add_brevis_l",        label: "Adductor Brevis (L)",     view: "deep", side: "front" },
    add_brevis_r:        { id: "add_brevis_r",        label: "Adductor Brevis (R)",     view: "deep", side: "front" },
    add_mag_l:        { id: "add_mag_l",        label: "Adductor Magnus (L)",     view: "deep", side: "front" },
    add_mag_r:        { id: "add_mag_r",        label: "Adductor Magnus (R)",     view: "deep", side: "front" },
    pectineus_l:        { id: "pectineus_l",        label: "Pectineus (L)",          view: "front" },
    pectineus_r:        { id: "pectineus_r",        label: "Pectineus (R)",          view: "front" },
  gracilis_l:        { id: "gracilis_l",        label: "Gracilis (L)",          view: "front" },
    gracilis_r:        { id: "gracilis_r",        label: "Gracilis (R)",          view: "front" },
};
// FRONT
const ANT_DELT_L = "M 54.5 55.8 L 66.4 54 L 52.6 76.2 L 30.8 101.3 L 28 90.9 L 43.1 72.4 Z";
const LAT_DELT_L = "M 54 54.6 L 44.6 67.9 L 28 88.8 L 29.4 78.3 L 35.6 66 L 43.1 59.4 Z";
const CLAVICULAR = "M 64.9 55.8 L 77.7 56.3 L 87.7 57.2 L 93.4 61 L 85.8 65.3 L 73 70.5 L 60.2 77.6 L 50.7 85.7 L 47.9 89.9 L 43.1 89.9 L 50.7 79 L 58.3 69.1 Z";
const STERNAL_UPPER = "M 47.4 89.9 L 54.5 82.3 L 67.8 72.9 L 79.2 68.6 L 89.6 64.3 L 93.8 63.4 L 98.1 67.2 L 97.2 74.3 L 97.6 82.3 L 95.3 88.5 L 83.4 89 L 73.5 88.5 L 60.7 87.1 L 49.8 88.5 Z";
const STERNAL_LOWER = "M 47.4 91.8 L 53.1 88 L 68.3 89 L 83.9 92.3 L 95.7 93.7 L 89.1 98.9 L 81.5 106 L 71.1 104.1 L 60.2 102.7 L 52.6 97.5 Z";
const BICEP_LONG_L = "M 43.1 92.7 L 39.8 103.2 L 35.1 115 L 31.3 126.4 L 30.3 133.5 L 28.9 140.6 L 30.3 145.3 L 31.3 147.7 L 22.8 135.9 L 22.8 125 L 24.2 115.5 L 28.9 105.1 L 35.1 97.5 Z";
const BICEP_SHORT_L = "M 30.8 146.8 L 31.3 134.4 L 33.7 123.5 L 37 110.7 L 39.8 102.2 L 44.6 93.7 L 47.9 100.3 L 46.5 114.5 L 42.2 128.3 L 38.4 137.3 L 35.1 143.4 Z";
const BRACHIALIS_L = "M 25.1 150.9 L 24.2 145.7 L 31.8 147.1 L 35.1 139.1 L 40.3 132.4 L 43.1 124.9 L 44.6 118.7 L 43.1 108.7 L 44.1 100.7 L 42.2 92.2 L 38.4 95 L 34.6 99.3 L 32.2 104.9 L 28.9 109.7 L 26.5 117.7 L 24.2 127.7 L 25.6 132.4 L 23.7 139.1 Z";
const FOREARM_L = "M 24.7 150.9 L 20.9 169.9 L 19.4 181.7 L 18 191.7 L 18 199.7 L 17.5 207.3 L 22.8 188.4 L 25.6 180.8 L 28.9 173.2 L 32.2 165.6 L 33.7 159 L 33.2 151.9 L 31.8 146.2 Z";
const SERRATUS_L = "M 51.7 119.2 L 56.9 119.6 L 56.9 114.9 L 57.4 108.7 L 59.3 102.6 L 55.5 97.8 L 52.1 95.5 L 50.7 102.1 L 49.8 107.3 L 49.8 113.5 Z"; 
const RECTUS_ABDOMINIS_UPPER_L = "M 81.5 106.4 L 88.2 101.2 L 96.2 94.5 L 100 99.7 L 100.5 104 L 101 116.8 L 101.4 127.7 L 101 135.3 L 101 147.1 L 101 153.8 L 100.5 162.8 L 92 160.4 L 85.3 159 L 83.9 154.7 L 83.9 148.5 L 82.9 138.1 L 84.4 133.9 L 82.5 127.7 L 83.4 120.1 L 83.9 116.8 L 82 113.5 Z";  
const RECTUS_ABDOMINIS_LOWER_L = "M 85.3 158.5 L 93.4 160.9 L 100.5 162.8 L 101 172.2 L 100.5 185.5 L 100 196.4 L 99.5 204.5 L 96.2 208.7 L 91.5 203.5 L 86.3 189.8 L 83.4 181.3 L 83.4 174.1 L 83.9 164.7 Z";
const OBLIQUE_EX_L = "M 57.8 131 L 62.1 123.9 L 60.7 117.7 L 63.5 108.7 L 68.7 104.9 L 75.8 106.4 L 80.6 106.4 L 80.6 114 L 83.9 116.8 L 82.5 124.4 L 82.9 130.1 L 84.4 133.9 L 82.5 138.6 L 82.5 146.2 L 84.8 158 L 83.4 165.1 L 81.1 169.9 L 76.3 173.2 L 68.7 177 L 64.5 173.2 L 60.7 168 L 61.1 162.3 L 62.6 155.7 L 63.5 150.4 L 62.1 143.3 L 59.3 135.3 Z"; 
const OBLIQUE_INT_L = "M 84 164.7 L 83.1 173.2 L 83.5 180.8 L 85 188.4 L 86.9 192.2 L 89.2 197.9 L 91.1 203.1 L 82.1 197.9 L 77.9 194.6 L 73.6 186.5 L 69.3 177.5 L 68.4 176.6 L 74.5 173.2 L 80.7 169.9 Z";
const QUADS_RF_UPPER_L = "M 67.4 185.3 L 70.8 200 L 73.1 206.2 L 75 211.4 L 76.9 218 L 80.2 228.4 L 82.1 239.8 L 82.1 246.9 L 71.2 250.2 L 66.5 250.2 L 62.7 250.2 L 60.8 249.3 L 58.9 242.6 L 58.9 236 L 59.4 227 L 61.3 219.4 L 61.7 209.9 L 63.2 204.3 L 65.5 198.6 L 66 191.9 Z";
const QUADS_RF_LOWER_L = "M 82.1 239.7 L 74.5 243.1 L 68.9 243.1 L 63.2 242.1 L 59.4 240.7 L 57.5 246.8 L 59.4 254.9 L 60.8 262 L 63.2 268.6 L 66 279.1 L 66 284.3 L 67 291.9 L 67.4 302.3 L 66.5 318.9 L 69.3 329.3 L 68.9 335.5 L 72.2 332.2 L 73.1 325 L 74.5 321.3 L 77.9 315.6 L 76 309.4 L 74.5 303.7 L 74.1 298 L 76 289 L 78.3 280.5 L 80.7 271 L 81.7 263.9 L 82.1 254.9 L 82.1 247.8 L 82.1 243.1 Z";
const QUADS_VL_L = "M 59.9 213.3 L 61.3 219.5 L 60.8 224.2 L 59.4 230.4 L 58 238.4 L 58.4 245.1 L 58.9 253.1 L 60.8 260.7 L 61.7 267.8 L 64.6 274.9 L 66.5 282.5 L 66.5 293 L 67.4 301.5 L 67.4 304.8 L 65.1 302 L 63.6 295.8 L 62.7 288.2 L 60.3 282.1 L 58 274.9 L 56.1 268.8 L 54.6 260.7 L 54.6 251.2 L 54.6 244.1 L 55.6 237 L 56.1 227.5 L 55.6 218.1 L 58 215.2 Z";
const QUADS_VM_L = "M 82.6 251.1 L 86.4 258.2 L 89.2 264.4 L 89.7 272 L 89.7 281.4 L 89.2 286.2 L 87.3 292.3 L 84 299 L 80.2 304.7 L 76 308.9 L 73.6 301.8 L 75 294.2 L 76.4 285.2 L 79.3 278.1 L 81.2 270.1 L 82.1 262.5 L 82.1 256.3 Z";
const QUADS_VI_L = "M 67 186.3 L 69.8 195.8 L 70.8 198.6 L 72.6 204.8 L 74.5 210 L 76.9 217.6 L 78.8 224.2 L 79.8 230.4 L 81.7 238.9 L 81.7 247.9 L 81.7 257.4 L 81.2 263.1 L 80.2 270.7 L 77.9 279.7 L 76 287.3 L 74.5 293.4 L 73.1 299.6 L 70.8 304.3 L 68.9 297.7 L 67.4 288.7 L 66 280.2 L 64.1 272.6 L 62.7 265 L 59.4 253.6 L 58.4 245.1 L 58.9 236.6 L 60.8 226.1 L 62.2 217.1 L 62.2 208.6 L 63.2 203.4 L 65.1 198.6 L 66 192.5 Z";
const TIBIALIS_ANT_L = "M 66.1 320.2 L 68.1 326.2 L 68.6 330.2 L 69.1 340.7 L 69.1 352.7 L 70.2 364.3 L 70.2 372.3 L 70.2 379.8 L 70.7 388.3 L 67.1 380.3 L 65.1 370.3 L 63.1 359.8 L 61.6 349.2 L 62.1 340.2 L 61.6 334.2 L 62.6 329.2 Z";
const GASTRO_MED_L = "M 78.7 300.6 L 76.7 304.1 L 76.2 309.2 L 74.7 316.2 L 73.2 324.2 L 72.2 330.7 L 71.7 337.2 L 71.2 345.7 L 71.7 352.2 L 72.7 356.3 L 76.7 360.3 L 79.2 362.3 L 82.7 359.8 L 84.2 356.3 L 83.7 348.2 L 82.7 341.2 L 82.7 334.7 L 82.2 327.2 L 81.2 321.2 L 81.2 313.2 L 81.2 307.7 L 80.7 303.6 Z";
const GASTRO_LAT_L = "M 73.2 301.6 L 76.2 308.2 L 74.7 313.7 L 73.2 320.2 L 72.2 327.7 L 71.2 336.7 L 70.2 346.7 L 68.6 353.2 L 65.1 355.8 L 60.6 355.8 L 58.1 350.2 L 58.1 345.2 L 58.6 338.7 L 61.1 330.2 L 62.6 322.7 L 66.1 315.2 L 68.6 309.2 L 70.2 304.6 Z";
const ILIOPOSOAS_L = "M 64.6 175.2 L 70.7 170.1 L 76.2 167.6 L 80.7 169.1 L 83.2 170.1 L 81.2 175.2 L 80.7 180.7 L 77.2 184.2 L 76.2 186.2 L 75.7 188.7 L 74.2 194.2 L 71.2 194.2 L 68.6 199.2 L 63.6 203.7 L 64.1 194.2 L 65.6 189.7 L 66.6 184.7 L 65.6 179.2 Z";
const PSOAS_MAJOR_L = "M 97.7 151.1 L 94.2 156.6 L 92.7 162.1 L 91.7 169.1 L 88.7 175.2 L 88.2 181.2 L 84.7 188.2 L 83.2 193.2 L 79.2 199.7 L 73.7 201.7 L 68.1 207.7 L 68.1 209.2 L 76.2 206.2 L 84.2 201.2 L 90.2 192.2 L 91.7 187.2 L 96.2 181.7 L 95.7 173.1 L 96.7 165.6 L 96.7 160.1 Z";
const SARTORIUS_L = "M 67.1 176.2 L 72.7 184.2 L 76.2 190.7 L 78.2 198.2 L 81.2 207.2 L 82.7 214.2 L 84.7 223.8 L 86.2 232.3 L 87.2 240.3 L 88.7 247.3 L 90.7 255.3 L 91.7 263.3 L 92.2 273.9 L 91.2 281.9 L 91.2 287.4 L 90.7 292.9 L 89.2 299.9 L 87.2 306.4 L 83.7 312.4 L 84.2 303.9 L 84.7 298.4 L 87.7 291.9 L 89.2 281.9 L 89.7 271.9 L 88.2 262.3 L 85.2 254.8 L 83.2 249.8 L 81.7 238.3 L 80.2 227.3 L 76.7 215.7 L 72.7 206.2 L 70.2 196.2 L 68.6 189.2 L 67.6 184.2 Z";

const TRICEPS_LONG_L = "M 28.6 145.5 L 31.6 140 L 33.6 132.5 L 34.6 131 L 40.1 128 L 43.1 121.5 L 47.1 113.4 L 49.1 105.4 L 45.6 104.4 L 41.1 106.4 L 38.1 108.9 L 36.1 112.4 L 32.6 119.5 L 31.1 126.5 L 30.1 134.5 Z";
const TRICEPS_MED_L = "M 31.1 158.5 L 30.1 154.5 L 28.1 147 L 30.6 143 L 34.1 139.5 L 38.1 137.5 L 41.1 139 L 42.1 141 L 42.6 145 L 40.6 149.5 L 37.1 154 Z";
const TRICEPS_LAT_L = "M 40.6 149.6 L 42.1 143.6 L 40.1 139.6 L 39.1 134.6 L 41.1 129.1 L 42.6 124 L 43.1 120.5 L 45.6 116 L 48.1 112.5 L 49.6 108.5 L 50.6 104.5 L 54.1 103.5 L 54.1 110.5 L 54.6 116.5 L 53.1 124 L 52.6 128.6 L 50.6 134.1 L 48.1 139.1 L 46.6 144.1 L 46.1 146.6 Z";
const REAR_DELT_L = "M 38.1 109 L 37.1 105.5 L 36.1 101.5 L 36.1 99.5 L 38.6 94 L 42.1 88 L 46.1 82 L 50.6 78.9 L 55.6 77.4 L 60.6 76.9 L 65.1 78.4 L 70.2 79.4 L 75.7 84 L 72.7 87.5 L 68.1 92.5 L 63.1 97 L 58.1 100 L 52.1 103.5 L 49.6 104.5 L 46.1 104 L 41.6 106.5 Z";
const TRAPS_UPPER_L = "M 98.2 61.4 L 92.7 63.9 L 86.7 65.9 L 81.2 65.9 L 74.7 65.4 L 81.7 60.9 L 87.2 56.9 L 90.2 51.9 L 91.2 43.9 L 93.2 36.9 L 95.7 35.4 L 97.7 36.4 L 98.2 47.4 L 98.7 55.4 Z";
const TRAPS_MID_L = "M 98.2 61.4 L 90.7 62.9 L 84.2 65.4 L 78.7 65.9 L 74.2 65.9 L 67.6 67.9 L 62.6 69.9 L 58.6 70.9 L 59.1 74.9 L 65.1 75.9 L 71.2 79.4 L 75.2 81.5 L 77.7 84 L 83.2 86.5 L 88.7 87.5 L 94.2 87.5 L 96.7 87.5 L 96.2 77.9 L 97.7 70.4 L 97.7 64.9 Z";
const TRAPS_LOWER_L = "M 80.2 85 L 86.7 85.5 L 92.7 85.5 L 97.2 86 L 97.2 97 L 97.2 106 L 97.2 115 L 97.2 123 L 96.7 129.1 L 92.2 120.5 L 88.7 115 L 85.7 109.5 L 83.2 103 L 80.2 94 L 80.2 88 Z";
const LATS_VERTEBRAL_L = "M 56.1 102.7 L 58.1 102.7 L 62.1 105.2 L 67.1 105.7 L 74.2 106.7 L 78.2 105.7 L 82.7 103.2 L 85.7 109.2 L 88.2 114.2 L 91.2 119.7 L 91.2 119.7 L 84.2 119.2 L 75.2 119.2 L 69.6 116.2 L 66.1 114.7 L 60.1 111.2 L 56.1 109.7 Z";
const LATS_ILIAC_L = "M 60.6 136.4 L 70.2 138.4 L 76.2 140.4 L 79.2 142.4 L 81.2 143.9 L 75.7 149 L 72.7 152 L 69.1 153 L 66.6 149 L 62.6 142.4 Z";
const LATS_COSTAL_L = "M 55.1 113.9 L 62.1 115.9 L 71.2 117.4 L 78.2 120.4 L 84.7 120.4 L 90.7 120.9 L 93.2 124.9 L 95.2 129.4 L 95.2 133.9 L 96.2 136.4 L 97.2 136.4 L 88.2 139.4 L 83.2 141.9 L 74.2 136.4 L 67.1 134.4 L 61.6 131.4 L 57.1 129.9 L 56.6 125.4 L 55.6 120.9 Z";
const TERES_MAJOR_L = "M 57 100.8 L 62.5 97.3 L 67.5 105.3 L 62.5 105.3 Z";
const RHOMBOIDS_L = "M 98.6 65.4 L 86.6 72.4 L 83.6 74.9 L 77.1 77.4 L 79.1 82.9 L 79.1 88.9 L 79.1 94.9 L 78.6 99.4 L 78.6 102.9 L 78.6 109.9 L 78.1 114.9 L 85.6 105.4 L 89.6 101.9 L 94.1 99.4 L 98.1 94.9 L 97.6 84.9 L 97.1 73.9 Z";
const SPINALIS_LUMB_L = "M 98.1 81.5 L 98.6 91 L 98.6 102.5 L 98.6 110.5 L 98.6 118.5 L 98.6 126 L 98.6 134 L 99.6 141 L 99.1 147 L 96.1 138 L 94.1 129 L 93.1 120.5 L 93.1 111 L 93.1 103.5 L 93.6 96 L 94.1 90 L 93.6 82.5 Z";
const SPINALIS_THOR_L = "M 100.1 36.9 L 100.1 46 L 99.6 50 L 100.1 52.5 L 99.1 58 L 99.1 60 L 98.6 71.5 L 98.6 76.5 L 98.6 79 L 99.1 82.5 L 94.6 80.5 L 94.6 71.5 L 96.1 64.5 L 98.1 61 L 96.1 55 L 96.1 49.5 L 96.6 44.5 L 97.1 41.9 Z";
const LONGISSIMUS_LUMB_L = "M 91.1 83 L 91.1 89 L 92.1 96.5 L 90.6 102.5 L 92.1 109 L 92.1 116 L 92.1 123 L 92.1 127 L 93.6 135 L 96.6 147 L 98.1 156 L 97.6 166 L 98.6 173.5 L 98.6 181.1 L 97.6 188.6 L 93.6 184.1 L 89.6 180.6 L 88.6 168.5 L 88.1 160 L 88.1 149.5 L 88.6 138 L 87.1 128 L 86.1 120.5 L 85.1 108.5 L 86.1 99 L 86.1 91 L 86.1 85 L 86.1 82 Z";
const LONGISSIMUS_THOR_L = "M 87.1 36.9 L 92.1 38.9 L 96.6 39.9 L 97.1 44.5 L 96.6 49 L 96.1 53.5 L 95.6 58.5 L 96.6 60.5 L 93.1 62.5 L 93.1 70 L 92.1 74.5 L 91.6 81 L 86.6 78.5 L 88.1 69 L 89.6 62.5 L 90.6 58 L 93.1 50.5 L 94.6 44 L 94.1 41.4 L 94.1 41.4 L 89.1 38.9 Z";
const ILIOCOSTALIS_LUMB_L = "M 90.1 82.1 L 90.1 89.6 L 90.1 97.1 L 89.1 103.6 L 89.1 113.6 L 88.6 124.2 L 88.1 134.2 L 88.6 144.2 L 87.1 149.7 L 86.6 157.7 L 86.1 170.7 L 77.1 168.2 L 75.6 156.2 L 75.1 146.2 L 76.1 137.2 L 76.1 123.7 L 75.6 112.6 L 76.6 99.6 L 80.1 90.6 L 80.6 85.1 L 81.1 82.1 Z";
const ILIOCOSTALIS_THOR_L = "M 91.1 50.6 L 91.1 57.1 L 90.6 62.6 L 89.6 69.6 L 90.1 75.6 L 90.1 83.6 L 83.6 81.1 L 85.1 69.1 L 86.1 60.6 L 87.6 55.1 Z";
const FOREARM_EXT_L = "M 30.5 157.7 L 26 166.8 L 25 179.8 L 25 193.8 L 24.5 201.8 L 22.5 210.8 L 19 220.8 L 21 207.8 L 21 200.3 L 22 191.3 L 22 181.8 L 20 171.8 L 19.5 167.3 L 20 160.8 L 21 154.2 L 22 150.7 L 25 148.2 L 26 146.7 L 28.5 152.2 Z";
const CRANIAL_GLUTE_MAX = "M 82.6 172.9 L 88.1 177.9 L 92.6 182.9 L 95.6 188.9 L 85.1 200.4 L 79.1 206.4 L 72.6 216.9 L 69 223.9 L 65 229.4 L 64 236.4 L 61 225.4 L 60.5 217.4 L 60.5 211.9 L 61.5 207.4 L 63 203.4 L 67 197.9 L 72.1 187.4 L 78.1 180.9 L 81.1 175.4 Z";
const CAUDAL_GLUTE_MAX = "M 96.1 189.6 L 88.6 198.1 L 83.6 202.6 L 79.1 207.1 L 75.1 211.1 L 71.6 218.1 L 67 226.6 L 65 232.6 L 64.5 237.1 L 67.5 239.1 L 74.6 232.1 L 80.1 227.6 L 85.6 224.6 L 91.1 221.1 L 94.6 218.6 L 95.1 215.1 L 96.6 210.6 L 97.1 203.1 L 97.6 195.1 L 97.1 190.6 Z";
const GLUTE_MED_L = "M 74.1 172.5 L 78.6 171.5 L 83.1 173 L 86.6 175.5 L 89.1 177 L 86.1 179.5 L 80.6 181.1 L 76.1 182.6 L 71.6 187.1 L 68.5 193.1 L 66.5 196.1 L 67.5 186.1 L 70 178.5 L 73.6 175 Z";
const GLUTE_MIN_L = "M 68 175 L 75.6 176.5 L 79.6 176 L 82.6 180 L 84.6 184.6 L 85.1 192.6 L 80.1 197.1 L 72.1 199.6 L 68 201.6 L 63 203.1 L 65 196.1 L 66.5 189.6 L 67.5 183.1 L 68 182.1 L 67 175 Z";
const TENSOR_FASCIA_LATA_L = "M 64 172.8 L 66 177.3 L 66.5 185.8 L 66 188.8 L 66 196.3 L 64 199.3 L 61 207.8 L 61.5 213.8 L 58.5 213.3 L 56.5 214.3 L 56.5 209.8 L 55 204.3 L 57 197.3 L 60 189.8 L 61.5 182.8 L 63 178.3 Z";
const HAM_BF_LONG_L = "M 80.1 227.9 L 81.1 229.9 L 80.6 237.9 L 79.1 249.5 L 78.6 257.5 L 77.6 268 L 77.1 273.5 L 77.6 280.5 L 77.1 285.5 L 76.6 292 L 75.1 295.5 L 75.1 297.5 L 72.1 302 L 69 304.5 L 68 309 L 66.5 312.5 L 68 302 L 72.6 295.5 L 74.1 290 L 74.1 285 L 73.1 278.5 L 70.6 271 L 68 266 L 66.5 261.5 L 67 251.5 L 68.5 243.5 L 69 238.9 L 72.1 233.9 L 76.1 230.9 Z";
const HAM_BF_SHORT_L = "M 67 264.4 L 69 272.9 L 71.6 279.4 L 73.6 286.4 L 72.6 291.9 L 70 295.4 L 68.5 298.9 L 67 302.4 L 66 303.4 L 64.5 298.4 L 66 291.4 L 66 286.4 L 68 281.9 L 67 278.4 Z";
const HAM_SEMITEND_L = "M 85.1 230.2 L 85.1 239.2 L 86.1 247.2 L 87.1 248.7 L 87.1 253.7 L 86.6 258.2 L 85.6 264.7 L 84.6 271.7 L 84.6 279.7 L 83.6 285.7 L 82.6 292.7 L 82.6 297.7 L 82.6 304.7 L 82.6 310.7 L 81.1 313.2 L 80.1 298.7 L 80.6 291.7 L 80.6 283.2 L 78.6 278.7 L 77.6 275.2 L 78.1 265.2 L 79.6 256.2 L 80.1 244.2 L 81.1 237.2 L 81.1 229.2 Z";
const HAM_SEMIMEM_L = "M 88.6 241.6 L 91.1 246.6 L 91.1 253.1 L 90.6 260.1 L 89.6 269.1 L 87.1 279.1 L 86.1 285.1 L 84.6 292.1 L 85.1 298.1 L 85.1 305.6 L 84.6 310.1 L 82.6 297.6 L 83.6 285.1 L 85.1 273.6 L 85.1 267.1 L 86.1 260.6 L 86.1 252.6 L 87.1 246.6 Z";
const SOLEUS_POST_L = "M 121.6 381.8 L 122.1 371.8 L 122.6 360.3 L 123.1 348.7 L 125.1 336.2 L 125.6 327.2 L 128.1 320.7 L 129.6 312.7 L 130.1 308.2 L 135.1 307.7 L 136.6 316.7 L 138.6 322.2 L 140.1 329.7 L 140.6 335.7 L 139.6 342.2 L 138.6 348.2 L 136.6 354.7 L 135.1 362.8 L 134.6 367.8 L 134.1 375.3 L 133.1 379.8 L 133.1 380.3 Z";

const TRANSVERSE_ABS = "M 56.6 129.8 L 62.6 133.8 L 70.7 135.9 L 76.2 130.8 L 80.7 122.3 L 86.7 115.3 L 92.2 108.3 L 96.2 100.8 L 99.7 97.3 L 101.2 102.8 L 101.2 111.3 L 101.2 121.8 L 101.7 130.3 L 101.2 135.9 L 101.2 143.9 L 102.2 154.9 L 101.7 166.4 L 101.2 182.5 L 101.2 194.5 L 100.7 206.5 L 95.2 207 L 87.7 202 L 82.7 198.5 L 75.2 194.5 L 72.7 189 L 68.6 180.4 L 65.6 174.4 L 61.1 169.4 L 60.6 164.4 L 61.1 160.4 L 63.6 153.9 L 63.6 148.4 L 62.1 141.9 L 58.6 135.4 Z";
const ADD_LONGUS_l = "M 97.2 209 L 97.2 214.5 L 95.7 222.5 L 94.2 231.6 L 92.2 238.1 L 91.7 244.1 L 91.2 249.6 L 91.2 254.6 L 88.7 244.6 L 87.2 236.6 L 87.2 231.1 L 86.7 227.1 L 84.7 222.5 L 88.7 217.5 L 91.7 212 L 93.7 207.5 Z";
const ADD_BREVIS_L = "M 92.7 205.1 L 87.2 209.7 L 83.2 211.2 L 84.7 221.2 L 86.2 225.2 L 92.7 215.2 L 96.7 209.2 L 92.2 206.6 Z";
const ADD_MAG_L = "M 92.7 205.9 L 86.2 208.4 L 81.2 210.4 L 74.2 212.4 L 66.6 214.9 L 67.1 222.9 L 69.1 230.4 L 71.7 237.4 L 72.7 245.4 L 74.7 251.5 L 75.7 260.5 L 77.2 267.5 L 78.2 277.5 L 79.2 284.5 L 79.2 294.1 L 81.2 300.1 L 86.7 304.6 L 89.7 295.6 L 90.7 290.5 L 91.2 284 L 92.7 276.5 L 92.7 269 L 92.7 265 L 95.2 255.5 L 96.2 248 L 96.7 239.4 L 96.7 234.4 L 97.2 228.4 L 97.2 222.4 L 97.2 216.9 L 97.2 214.4 L 98.7 211.9 Z";
const PECTINEUS_L = "M 92.7 206.8 L 88.7 208.3 L 84.2 210.3 L 82.2 210.3 L 84.2 215.8 L 85.2 221.8 L 89.2 216.8 L 92.2 211.3 Z";
const GRACILIS_L = "M 97.2 217.6 L 97.2 225.1 L 98.2 233.1 L 96.7 238.6 L 96.2 246.2 L 95.2 254.2 L 92.7 261.7 L 90.7 254.2 L 91.2 246.2 L 92.2 239.1 L 93.7 232.6 L 94.2 227.1 Z";


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
  spinalis_lumb_l:   { type: "path",   d: SPINALIS_LUMB_L },
  spinalis_lumb_r:   { type: "path",   d: SPINALIS_LUMB_L, transform: "scale(-1,1) translate(-200,0)" },
  spinalis_thor_l:   { type: "path",   d: SPINALIS_THOR_L },
  spinalis_thor_r:   { type: "path",   d: SPINALIS_THOR_L, transform: "scale(-1,1) translate(-200,0)" },
  longissimus_lumb_l:{ type: "path",   d: LONGISSIMUS_LUMB_L },
  longissimus_lumb_r:{ type: "path",   d: LONGISSIMUS_LUMB_L, transform: "scale(-1,1) translate(-200,0)" },
  longissimus_thor_l:{ type: "path",   d: LONGISSIMUS_THOR_L },
  longissimus_thor_r:{ type: "path",   d: LONGISSIMUS_THOR_L, transform: "scale(-1,1) translate(-200,0)" },
  iliocostalis_lumb_l:{ type: "path",   d: ILIOCOSTALIS_LUMB_L },
  iliocostalis_lumb_r:{ type: "path",   d: ILIOCOSTALIS_LUMB_L, transform: "scale(-1,1) translate(-200,0)" },
  iliocostalis_thor_l:{ type: "path",   d: ILIOCOSTALIS_THOR_L },
  iliocostalis_thor_r:{ type: "path",   d: ILIOCOSTALIS_THOR_L, transform: "scale(-1,1) translate(-200,0)" },
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
  soleus_post_l:     { type: "path",   d: SOLEUS_POST_L },
  soleus_post_r:     { type: "path",   d: SOLEUS_POST_L, transform: "scale(-1,1) translate(-200,0)" },

  // DEEP / HIDDEN (approx placements)
  //rotator_cuff_sup:{ type: "rect",   x: 72,  y: 96,  w: 20, h: 10, rx: 4 },
  //rotator_cuff_inf:{ type: "rect",   x: 72,  y: 108, w: 24, h: 10, rx: 4 },
  //rotator_cuff_tm: { type: "rect",   x: 72,  y: 120, w: 18, h: 8,  rx: 4 },
  //subscapularis:   { type: "rect",   x: 110, y: 120, w: 18, h: 10, rx: 4 },
  transverse_abs_l:  { type: "path",   d: TRANSVERSE_ABS },
  transverse_abs_r:  { type: "path",   d: TRANSVERSE_ABS, transform: "scale(-1,1) translate(-200,0)" },
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

};
