// src/data/regions-config.js
// Your canonical region map: IDs, labels, and which view they belong to.
// Shapes are simple placeholders you can replace later with precise SVG paths.

export const REGION_META = {
  // --- FRONT (surface) ---
  ant_delts:        { id: "ant_delts",        label: "Anterior Delts",     view: "front" },
  lat_delts:        { id: "lat_delts",        label: "Lateral Delts",      view: "front" },
  pec_upper:        { id: "pec_upper",        label: "Upper Chest",        view: "front" },
  pec_lower:        { id: "pec_lower",        label: "Lower Chest",        view: "front" },
  biceps:           { id: "biceps",           label: "Biceps",             view: "front" },
  forearm_flexors:  { id: "forearm_flexors",  label: "Forearm Flexors",    view: "front" },
  serratus:         { id: "serratus",         label: "Serratus Anterior",  view: "front" },
  rectus_abdominis: { id: "rectus_abdominis", label: "Rectus Abdominis",   view: "front" },
  obliques:         { id: "obliques",         label: "Obliques",           view: "front" },
  quads_rf:         { id: "quads_rf",         label: "Rectus Femoris",     view: "front" },
  quads_vl:         { id: "quads_vl",         label: "Vastus Lateralis",   view: "front" },
  quads_vm:         { id: "quads_vm",         label: "Vastus Medialis",    view: "front" },
  tibialis_ant:     { id: "tibialis_ant",     label: "Tibialis Anterior",  view: "front" },
  gastro_med:       { id: "gastro_med",       label: "Gastrocnemius (Med)", view: "front" },
  gastro_lat:       { id: "gastro_lat",       label: "Gastrocnemius (Lat)", view: "front" },

  // --- BACK (surface) ---
  rear_delts:       { id: "rear_delts",       label: "Rear Delts",         view: "back" },
  traps_upper:      { id: "traps_upper",      label: "Traps (Upper)",      view: "back" },
  traps_mid:        { id: "traps_mid",        label: "Traps (Mid)",        view: "back" },
  traps_lower:      { id: "traps_lower",      label: "Traps (Lower)",      view: "back" },
  lats:             { id: "lats",             label: "Lats",               view: "back" },
  teres_major:      { id: "teres_major",      label: "Teres Major",        view: "back" },
  rhomboids:        { id: "rhomboids",        label: "Rhomboids",          view: "back" },
  erectors_thor:    { id: "erectors_thor",    label: "Erectors (Thor)",    view: "back" },
  erectors_lum:     { id: "erectors_lum",     label: "Erectors (Lum)",     view: "back" },
  forearm_ext:      { id: "forearm_ext",      label: "Forearm Extensors",  view: "back" },
  glute_max:        { id: "glute_max",        label: "Glute Max",          view: "back" },
  ham_bf:           { id: "ham_bf",           label: "Biceps Femoris",     view: "back" },
  ham_semit:        { id: "ham_semit",        label: "Semi-tend./mem.",    view: "back" },
  soleus_post:      { id: "soleus_post",      label: "Soleus (Post)",      view: "back" },

  // --- DEEP / HIDDEN ---
  rotator_cuff_sup: { id: "rotator_cuff_sup", label: "Supraspinatus",       view: "deep" },
  rotator_cuff_inf: { id: "rotator_cuff_inf", label: "Infraspinatus",       view: "deep" },
  rotator_cuff_tm:  { id: "rotator_cuff_tm",  label: "Teres Minor",         view: "deep" },
  subscapularis:    { id: "subscapularis",    label: "Subscapularis",       view: "deep" },
  transverse_abs:   { id: "transverse_abs",   label: "Transverse Abdominis",view: "deep" },
  hip_flexors:      { id: "hip_flexors",      label: "Iliopsoas (Hip Flexors)", view: "deep" },
  adductors:        { id: "adductors",        label: "Adductors",           view: "deep" },
  vastus_intermed:  { id: "vastus_intermed",  label: "Vastus Intermedius",  view: "deep" },
  soleus_ant:       { id: "soleus_ant",       label: "Soleus (Ant/Deep)",   view: "deep" },
};

// Minimal SVG shapes for wiring; swap with precise SVG paths later (keep IDs).
export const SHAPES = {
  // FRONT
  ant_delts:       { type: "circle", cx: 62,  cy: 110, r: 15 },
  lat_delts:       { type: "circle", cx: 136, cy: 110, r: 15 },
  pec_upper:       { type: "rect",   x: 60,  y: 126, w: 80, h: 18, rx: 10 },
  pec_lower:       { type: "rect",   x: 60,  y: 146, w: 80, h: 18, rx: 10 },
  biceps:          { type: "circle", cx: 52,  cy: 160, r: 12 },
  forearm_flexors: { type: "rect",   x: 34,  y: 190, w: 20, h: 60, rx: 6 },
  serratus:        { type: "rect",   x: 60,  y: 168, w: 20, h: 24, rx: 4 },
  rectus_abdominis:{ type: "rect",   x: 84,  y: 170, w: 32, h: 75, rx: 8 },
  obliques:        { type: "rect",   x: 68,  y: 170, w: 12, h: 60, rx: 6 },
  quads_rf:        { type: "rect",   x: 88,  y: 260, w: 24, h: 85, rx: 10 },
  quads_vl:        { type: "rect",   x: 74,  y: 260, w: 14, h: 85, rx: 8 },
  quads_vm:        { type: "rect",   x: 112, y: 260, w: 14, h: 85, rx: 8 },
  tibialis_ant:    { type: "rect",   x: 92,  y: 350, w: 16, h: 55, rx: 8 },
  gastro_med:      { type: "rect",   x: 76,  y: 350, w: 14, h: 55, rx: 8 },
  gastro_lat:      { type: "rect",   x: 112, y: 350, w: 14, h: 55, rx: 8 },

  // BACK
  rear_delts:      { type: "circle", cx: 136, cy: 110, r: 15 },
  traps_upper:     { type: "rect",   x: 84,  y: 85,  w: 32, h: 12, rx: 6 },
  traps_mid:       { type: "rect",   x: 78,  y: 100, w: 44, h: 12, rx: 6 },
  traps_lower:     { type: "rect",   x: 90,  y: 115, w: 20, h: 20, rx: 6 },
  lats:            { type: "rect",   x: 60,  y: 145, w: 80, h: 50, rx: 10 },
  teres_major:     { type: "rect",   x: 60,  y: 135, w: 25, h: 12, rx: 6 },
  rhomboids:       { type: "rect",   x: 78,  y: 130, w: 44, h: 12, rx: 6 },
  erectors_thor:   { type: "rect",   x: 86,  y: 180, w: 28, h: 34, rx: 8 },
  erectors_lum:    { type: "rect",   x: 86,  y: 216, w: 28, h: 28, rx: 8 },
  forearm_ext:     { type: "rect",   x: 146, y: 190, w: 20, h: 60, rx: 6 },
  glute_max:       { type: "rect",   x: 80,  y: 245, w: 40, h: 35, rx: 12 },
  ham_bf:          { type: "rect",   x: 74,  y: 285, w: 26, h: 60, rx: 10 },
  ham_semit:       { type: "rect",   x: 100, y: 285, w: 26, h: 60, rx: 10 },
  soleus_post:     { type: "rect",   x: 92,  y: 350, w: 16, h: 55, rx: 8 },

  // DEEP / HIDDEN (approx placements)
  rotator_cuff_sup:{ type: "rect",   x: 72,  y: 96,  w: 20, h: 10, rx: 4 },
  rotator_cuff_inf:{ type: "rect",   x: 72,  y: 108, w: 24, h: 10, rx: 4 },
  rotator_cuff_tm: { type: "rect",   x: 72,  y: 120, w: 18, h: 8,  rx: 4 },
  subscapularis:   { type: "rect",   x: 110, y: 120, w: 18, h: 10, rx: 4 },
  transverse_abs:  { type: "rect",   x: 80,  y: 170, w: 40, h: 20, rx: 8 },
  hip_flexors:     { type: "rect",   x: 82,  y: 220, w: 36, h: 22, rx: 8 },
  adductors:       { type: "rect",   x: 88,  y: 286, w: 24, h: 50, rx: 10 },
  vastus_intermed: { type: "rect",   x: 100, y: 260, w: 18, h: 85, rx: 8 },
  soleus_ant:      { type: "rect",   x: 108, y: 350, w: 16, h: 55, rx: 8 },
};
