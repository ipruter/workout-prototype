// --- Per-set intensity decay ---
// Your table matches ~exp(-0.1*(n-1)) ≈ 0.905^(n-1)
// n=1 → 1.000, n=2 → 0.905, n=3 → 0.819, n=4 → 0.741, n=5 → 0.670, n=6 → 0.607
export function setDecayFactor(n = 1) {
  const k = -0.1; // tweak if you want closer to 0.905 exactly
  return Math.exp(k * (Math.max(1, n) - 1));
}

// Estimate 1RM from a single session prescription
// 1RM ≈ weight / ( intensity% * decay(sets) )
export function estimate1RMFromWeight({
  weight,
  intensityPct = 75,
  sets = 1,
}) {
  const w = Number(weight);
  const ip = Number(intensityPct);
  const s = Math.max(1, Number(sets) || 1);
  if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(ip) || ip <= 0) return null;
  const decay = setDecayFactor(s);           // e.g., 3 sets → 0.819
  const frac = (ip / 100) * decay;           // effective fraction of 1RM for this row
  if (frac <= 0) return null;
  return w / frac;
}

// Warm-up sets scale with **working weight** (not 1RM)
export function warmupSetsForWeight(W, { a = 0.5, b = 0.8, Smax = 7 } = {}) {
  if (!Number.isFinite(W) || W <= 0) return 1;
  const s = Math.floor(a * Math.log2(W) + b);
  return Math.max(1, Math.min(Smax, s));
}

export function roundTo(x, inc = 5) {
  if (!Number.isFinite(x)) return null;
  return Math.round(x / inc) * inc;
}

// Try common stores for known 1RMs
export function getKnown1RM(liftId) {
  const keys = ["orm-v1", "orms-v1", "one_rep_maxes", "1rm"];
  for (const k of keys) {
    try {
      const m = JSON.parse(localStorage.getItem(k) || "null");
      if (m && Number.isFinite(+m[liftId])) return +m[liftId];
    } catch {}
  }
  return null;
}

// Prefer explicit **weight**; fall back to 1RM→weight; else default 15 min.
export function estimateExerciseMinutes({
  liftId,
  sets = 3,
  intensityPct = 75,
  // these may or may not exist on the row:
  weight = null,
  orm = null,
}) {
  let working = Number(weight);

  if (!Number.isFinite(working) || working <= 0) {
    const knownOrm = Number.isFinite(orm) ? orm : getKnown1RM(liftId);
    if (Number.isFinite(knownOrm)) {
      working = roundTo((knownOrm * (Number(intensityPct) || 0)) / 100, 5);
    }
  }

  if (!Number.isFinite(working) || working <= 0) {
    return 15; // fallback when weight is unknown
  }

  const wu = warmupSetsForWeight(working);
  return wu * 1.5 + (Number(sets) || 0) * 3.0;
}

export function totalMinutes(rows = []) {
  return rows.reduce((acc, r) => acc + estimateExerciseMinutes(r), 0);
}

// --- 1RM persistence & overload helpers ---
export function setKnown1RM(liftId, value) {
  try {
    const key = "orm-v1";
    const map = JSON.parse(localStorage.getItem(key) || "{}");
    map[liftId] = value;
    localStorage.setItem(key, JSON.stringify(map));
  } catch {}
}

export function bumpOneRMPercent(liftId, baseOrm, pct = 2.5) {
  if (!Number.isFinite(baseOrm) || baseOrm <= 0) return null;
  const bumped = Math.round(baseOrm * (1 + pct / 100));
  setKnown1RM(liftId, bumped);
  return bumped;
}

// 1 set: 1.00, 2: 0.905, 3: 0.819, 4: 0.741, 5: 0.670, 6: 0.607 ...
export function setAttenuation(sets) {
  const n = Math.max(1, Number(sets) || 1);
  return Math.exp(-0.1 * (n - 1));
}

export function weightFrom1RM({ oneRM, intensityPct, sets }) {
  if (!Number.isFinite(oneRM) || !Number.isFinite(intensityPct) || !Number.isFinite(sets)) {
    return null;
  }
  // per-set fatigue: ~exp(-0.1*(sets-1)) like we discussed
  const fatigue = Math.exp(-0.1 * (sets - 1));   // Set1=1.00, Set3≈0.82, Set6≈0.61
  const raw = oneRM * (intensityPct / 100) * fatigue;
  return Math.round(raw / 5) * 5;                // round to nearest 5
}

