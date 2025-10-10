// src/utils/equipmentFallback.js
//
// One-stop fallback logic for your Workout Generator.
// - Global replacement order: barbell > machine > dumbbell
// - Special rule for BODYWEIGHT pull-ups/chin-ups/dips:
//     If user checks "no assisted", treat BODYWEIGHT versions as BLOCKED
//     and only fall back to Assisted → Machine (e.g., Pulldown).
// - We never replace an exercise unless it's blocked by the homepage checkboxes.
//
// Usage tip:
//   import { applyFallbackToList } from "@/utils/equipmentFallback";
//   const filtered = applyFallbackToList(planExercises, blockedKeysSet, CATALOG_BY_ID);
//
// Where:
//   - planExercises: [{ id, type } ...] from your generator
//   - blockedKeysSet: Set(["barbells","machines","dumbbells","assisted"]) based on homepage
//   - CATALOG_BY_ID: your catalog { [id]: { id, name, type, ... } }
//
// -----------------------------------------------------------------------------


// --- Public helpers ----------------------------------------------------------

export const CHECKBOX_KEYS = Object.freeze({
  barbells: "barbells",
  machines: "machines",
  dumbbells: "dumbbells",
  assisted: "assisted", // (if needed for pull ups and dips)
});

export function normalizeBlocked(setOrArray) {
  if (!setOrArray) return new Set();
  return setOrArray instanceof Set ? setOrArray : new Set(setOrArray);
}


// --- Type/block mapping ------------------------------------------------------

function typeToBlockKey(type) {
  if (type === "barbell")   return CHECKBOX_KEYS.barbells;
  if (type === "machine")   return CHECKBOX_KEYS.machines;
  if (type === "cable")     return CHECKBOX_KEYS.machines; // treat cable as machine
  if (type === "dumbbell")  return CHECKBOX_KEYS.dumbbells;
  if (type === "assisted")  return CHECKBOX_KEYS.assisted;
  if (type === "bodyweight") return null; // handled by special rule below
  return null;
}

function isTypeBlocked(type, blocked) {
  const key = typeToBlockKey(type);
  return key ? blocked.has(key) : false;
}


// --- Classes & priorities ----------------------------------------------------

// Classes that behave as if BODYWEIGHT requires assisted access when "assisted" is blocked.
const BW_NEEDS_ASSIST_CLASSES = new Set([
  "lat_pulldown",      // pull-up tree
  "lat_pulldown_sup",  // chin-up tree
  "dip",               // dips tree
]);

// Global default replacement order (used when an exercise is blocked).
const DEFAULT_PRIORITY = ["barbell", "machine", "dumbbell"];

// Override order ONLY for the BW pulls/dips classes when a BW item is blocked by "no assisted".
const BW_PULLS_DIPS_PRIORITY = ["assisted", "machine"];

function getPriorityFor(liftId, liftType) {
  const klass = LIFT_TO_CLASS[liftId];
  if (liftType === "bodyweight" && klass && BW_NEEDS_ASSIST_CLASSES.has(klass)) {
    return BW_PULLS_DIPS_PRIORITY;
  }
  return DEFAULT_PRIORITY;
}

function isBodyweightTreatedAsBlocked(liftId, liftType, blocked) {
  if (liftType !== "bodyweight") return false;
  const klass = LIFT_TO_CLASS[liftId];
  if (!klass) return false;
  if (!BW_NEEDS_ASSIST_CLASSES.has(klass)) return false;
  return blocked.has(CHECKBOX_KEYS.assisted);
}


// --- Variant catalogs (align these IDs with your CATALOG_BY_ID) --------------
//
// Order within each class is from most- to least-preferred (for *that class*).
// We still filter by availability and then apply the class-specific or default priority.

// src/config/lift-classes.js

// Replacement priority (your generator already enforces “only replace if blocked”):
//   1) barbell  >  2) machine/cable  >  3) dumbbell
// Special case for pulls/dips: BODYWEIGHT blocked by “assisted” → fall back to machine/cable.

export const LIFT_CLASS_VARIANTS = {
  // --- Vertical pulls (pronated) ---
  lat_pulldown: [
    "pullup",        // bodyweight
    "pulldown",      // machine/cable
  ],

  // --- Vertical pulls (supinated) ---
  lat_pulldown_sup: [
    "chinup",        // bodyweight
    "pulldown_sup",  // machine/cable (supinated)
  ],

  // --- Straight-arm pulldown stays its own tree (unique pattern) ---
  sa_pulldown: ["sa_pulldown"],

  // --- Rows (horizontal pulls) ---
  row_barbell: [
    "row_bb",        // barbell row (overhand)
    "tbar_row",      // T-bar row (barbell/landmine)
    "row_cable",     // seated cable row (machine)
    "row_db",        // bent-over row (dumbbell)
  ],

  row_underhand: [
    "row_bb_underhand", // barbell underhand
    "row_bb_yates",     // Yates row
    "row_cable",        // seated cable row
    "row_db",           // DB row
  ],

  // --- Reverse fly / face pull (keep separate, different scapular mechanics) ---
  reverse_fly: ["reverse_fly"],
  face_pull: ["face_pull"],

  // --- Dips (special BW→assisted→machine/pulldown rule handled by your generator) ---
  dip: [
    "dip_bw",       // bodyweight
    "dip_machine",  // machine
  ],

  // --- Chest press families ---
  flat_press: [
    "bench_bb",         // barbell bench
    "chest_press_hs",   // Hammer Strength chest press (machine)
    "bench_db",         // dumbbell bench
  ],

  incline_press: [
    "incline_bb",           // barbell incline
    "incline_press_hs",     // Hammer Strength incline (machine)
    "incline_db",           // dumbbell incline
  ],

  overhead_press: [
    "ohp_seated_bb",    // seated barbell OHP
    "ohp_seated_db",    // seated DB OHP
  ],

  // --- Chest fly family ---
  chest_fly: [
    "fly_db",          // DB fly (flat)
    "pec_deck",        // pec deck (machine)
    "fly_db_incline",  // incline DB fly
  ],

  // --- Upright rows (two grip-width flavors; keep together) ---
  upright_row: [
    "upright_row_wide",
    "upright_row_narrow",
  ],

  // --- Lateral raises ---
  lateral_raise: [
    "lat_raise_db",       // DB lateral raise
    "lat_raise_cable",    // cable lateral raise
  ],

  // --- Shrugs ---
  shrug: [
    "shrug_bb",       // barbell shrug
    "shrug_smith",    // Smith shrug (machine)
    "shrug_db",       // dumbbell shrug
  ],

  // --- Squat family (knee-dominant) ---
  squat: [
    "squat_hb",       // back squat (barbell)
    "squat_fs",       // front squat (barbell)
    "hack_squat",     // hack squat (machine)
    "leg_press",      // leg press (machine)
    "squat_db",       // dumbbell squat (two DBs at sides)
    "squat_goblet",   // goblet squat (DB)
  ],

  // --- Lunges ---
  lunge: [
    "lunge_walk",     // walking lunge (free weight)
    "lunge_db",       // DB lunge variant (if you keep separate id)
    "lunge_smith",    // Smith/static lunge (machine-ish)
  ],

  // --- Hip hinge / deadlift family ---
  deadlift: [
    "deadlift",         // conventional DL (barbell)
    "deadlift_rdl",     // Romanian DL (barbell)
    "deadlift_sldl",    // stiff-legged DL (barbell)
    "good_morning",     // barbell good morning
    "deadlift_smith",   // Smith DL (machine)
    "deadlift_db",      // dumbbell deadlift
  ],

  // --- Hip thrust / bridge (keep as its own family) ---
  hip_thrust: [
    "hip_thrust",       // barbell hip thrust
    // add "hip_thrust_machine" here if you add one later
  ],

  // --- Knee extensions / leg curls ---
  knee_extension: ["leg_extension"],

  knee_flexion: [
    "seated_leg_curl",
    "lying_leg_curl",
  ],

  // --- Calves ---
  calf_raise: [
    "calf_raise_standing", // standing (barbell/machine)
    "donkey_calf_raise",   // donkey (machine)
    "calf_raise_seated",   // seated (machine)
  ],

  // --- Adductors / abductors / hip abd cable ---
  adduction: ["adduction_machine"],
  abduction: ["abduction_machine"],
  hip_abduction_cable: ["hip_abduction_cable_stand"],

  // --- Biceps curls ---
  curl: [
    "curl_ez",   // EZ-bar curl
    "curl_db",   // DB curl
    "row_cable", // (very rough machine fallback if both missing)
  ],

  // --- Triceps isolation ---
  triceps_extension: [
    "french_press_seated_ez", // seated EZ French press
    "seated_french_press",    // alt id you used
    "pushdown_cable",         // cable pushdown (machine)
  ],

  // --- Core: crunch / reverse / sit-up / hanging LR (keep separate trees) ---
  crunch_core: ["crunch", "situp"],
  reverse_crunch_core: ["reverse_crunch"],
  hanging_lr_core: ["hang_leg_raise_sl"],

  // --- Grip / forearms ---
  grip_dynamic: [
    "wrist_curl_btb_bb", // behind-the-back BB wrist curl
    "wrist_roller",      // wrist roller
  ],
  grip_carry: ["farmers_carry"],

  // --- Odds & ends you might keep stand-alone ---
  barbell_row_classic: ["row_bb"], // if you want a single-item class hook
};

// Map each lift ID in your catalog to its class.
// If an ID here doesn’t exist in your CATALOG_BY_ID, it’s harmless and skipped by your loader.
export const LIFT_TO_CLASS = Object.freeze({
  // Vertical pulls
  pullup: "lat_pulldown",
  pulldown: "lat_pulldown",
  chinup: "lat_pulldown_sup",
  pulldown_sup: "lat_pulldown_sup",
  sa_pulldown: "sa_pulldown",

  // Rows
  row_bb: "row_barbell",
  tbar_row: "row_barbell",
  row_cable: "row_barbell",
  row_db: "row_barbell",
  row_bb_underhand: "row_underhand",
  row_bb_yates: "row_underhand",

  // Reverse fly / Face pull
  reverse_fly: "reverse_fly",
  face_pull: "face_pull",

  // Dips
  dip_bw: "dip",
  dip_machine: "dip",

  // Presses
  bench_bb: "flat_press",
  chest_press_hs: "flat_press",
  bench_db: "flat_press",

  incline_bb: "incline_press",
  incline_press_hs: "incline_press",
  incline_db: "incline_press",

  ohp_bb: "overhead_press",
  ohp_seated_bb: "overhead_press",
  ohp_seated_db: "overhead_press",

  // Chest fly
  fly_db: "chest_fly",
  pec_deck: "chest_fly",
  fly_db_incline: "chest_fly",

  // Upright row
  upright_row_wide: "upright_row",
  upright_row_narrow: "upright_row",

  // Laterals
  lat_raise_db: "lateral_raise",
  lat_raise_cable: "lateral_raise",

  // Shrugs
  shrug_bb: "shrug",
  shrug_smith: "shrug",
  shrug_db: "shrug",

  // Squats / leg press / goblet / DB
  squat_hb: "squat",
  squat_fs: "squat",
  hack_squat: "squat",
  leg_press: "squat",
  squat_db: "squat",
  squat_goblet: "squat",

  // Lunges
  lunge_walk: "lunge",
  lunge_db: "lunge",
  lunge_smith: "lunge",

  // Deadlifts / hinge
  deadlift: "deadlift",
  deadlift_rdl: "deadlift",
  deadlift_sldl: "deadlift",
  good_morning: "deadlift",
  deadlift_smith: "deadlift",
  deadlift_db: "deadlift",

  // Hip thrust
  hip_thrust: "hip_thrust",

  // Knee ext / flex
  leg_extension: "knee_extension",
  seated_leg_curl: "knee_flexion",
  lying_leg_curl: "knee_flexion",

  // Calves
  calf_raise_standing: "calf_raise",
  donkey_calf_raise: "calf_raise",
  calf_raise_seated: "calf_raise",

  // Adduction / abduction
  adduction_machine: "adduction",
  abduction_machine: "abduction",
  hip_abduction_cable_stand: "hip_abduction_cable",

  // Arms
  curl_ez: "curl",
  curl_db: "curl",
  pushdown_cable: "triceps_extension",
  french_press_seated_ez: "triceps_extension",
  seated_french_press: "triceps_extension",

  // Core
  crunch: "crunch_core",
  situp: "crunch_core",
  reverse_crunch: "reverse_crunch_core",
  hang_leg_raise_sl: "hanging_lr_core",

  // Grip / forearms
  wrist_curl_btb_bb: "grip_dynamic",
  wrist_roller: "grip_dynamic",
  farmers_carry: "grip_carry",

  // Stand-alone alias hook if needed
  barbell_row_classic: "barbell_row_classic",
});



// --- Core selection logic ----------------------------------------------------

/**
 * Decide if a current {id,type} is available. Includes assisted special case.
 */
export function isExerciseAvailable(currentLift, blockedSet, catalogById) {
  const blocked = normalizeBlocked(blockedSet);
  const { id, type } = currentLift || {};
  if (!id || !catalogById?.[id]) return false;

  if (isTypeBlocked(type, blocked)) return false;
  if (isBodyweightTreatedAsBlocked(id, type, blocked)) return false;

  return true;
}

/**
 * Choose an available variant in the same class when the original is blocked.
 * - NEVER replaces when the original is available.
 * - Replaces ONLY within the same class.
 * - Applies class-specific priority overrides for BW pull-up/chin-up/dip trees.
 * - Returns `null` if nothing is available (caller should drop the item).
 */
export function chooseAvailableVariant(currentLift, blockedSet, catalogById) {
  const blocked = normalizeBlocked(blockedSet);
  const { id, type } = currentLift || {};
  if (!id || !catalogById?.[id]) return currentLift;

  const klass = LIFT_TO_CLASS[id];
  const currentIsBlocked =
    isTypeBlocked(type, blocked) || isBodyweightTreatedAsBlocked(id, type, blocked);

  if (!currentIsBlocked) return currentLift; // keep original if available

  const variants = klass ? LIFT_CLASS_VARIANTS[klass] : null;
  if (!variants || variants.length === 0) return null;

  const priority = getPriorityFor(id, type);

  // Iterate priority buckets; within each, respect the class order.
  for (const pType of priority) {
    for (const vid of variants) {
      if (vid === id) continue;
      const v = catalogById[vid];
      if (!v) continue;
      if (v.type !== pType) continue;
      if (isTypeBlocked(v.type, blocked)) continue;
      // found a valid swap
      return { id: vid, type: v.type, ...v };
    }
  }

  // No acceptable replacement available.
  return null;
}

export function resolveExercise(currentLift, blockedSet, catalogById) {
  const blocked = normalizeBlocked(blockedSet);
  if (!currentLift || !currentLift.id || !catalogById?.[currentLift.id]) return null;

  if (isExerciseAvailable(currentLift, blocked, catalogById)) {
    return currentLift;
  }
  return chooseAvailableVariant(currentLift, blocked, catalogById);
}

/**
 * Bulk-apply fallback to a list of planned exercises.
 * Each item should at least have { id, type }. We return a new list.
 */
export function applyFallbackToList(exerciseList, blockedSet, catalogById) {
  const blocked = normalizeBlocked(blockedSet);
  if (!Array.isArray(exerciseList)) return [];

  return exerciseList
    .map(item => {
      // Keep full object (sets/reps etc.), but ensure id/type exist.
      const { id, type, ...rest } = item || {};
      if (!id || !type) return null;

      if (isExerciseAvailable({ id, type }, blocked, catalogById)) {
        // keep original
        const cat = catalogById[id] || {};
        return { id, type, name: cat.name, ...cat, ...rest };
      }

      // attempt replacement
      const swap = chooseAvailableVariant({ id, type }, blocked, catalogById);
      if (!swap) return null; // drop it
      const cat = catalogById[swap.id] || {};
      return { id: swap.id, type: swap.type, name: cat.name, ...cat, ...rest };
    })
    .filter(Boolean);
}


// --- Optional: tiny convenience to build the blocked set from homepage state -

/**
 * buildBlockedSet({ barbells: true/false, machines: true/false, dumbbells: true/false, assisted: true/false })
 * - true means "user does NOT have this", thus it's BLOCKED.
 */
export function buildBlockedSet(state) {
  const s = state || {};
  const out = new Set();
  if (s.barbells)  out.add(CHECKBOX_KEYS.barbells);
  if (s.machines)  out.add(CHECKBOX_KEYS.machines);
  if (s.dumbbells) out.add(CHECKBOX_KEYS.dumbbells);
  if (s.assisted)  out.add(CHECKBOX_KEYS.assisted);
  return out;
}
