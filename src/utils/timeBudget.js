// --- Per-set intensity decay ---
// Your table matches ~exp(-0.1*(n-1)) ≈ 0.905^(n-1)
// n=1 → 1.000, n=2 → 0.905, n=3 → 0.819, n=4 → 0.741, n=5 → 0.670, n=6 → 0.607
import { getKnownBodyweight, getLiftBodyweightPct } from "./bodyweight";

export function setDecayFactor(n = 1) {
  const k = -0.1; // tweak if you want closer to 0.905 exactly
  return Math.exp(k * (Math.max(1, n) - 1));
}

export function roundTo(x, inc = 5) {
  if (!Number.isFinite(x)) return null;
  return Math.round(x / inc) * inc;
}

// Warm-up sets scale with **working weight** (not 1RM)
export function warmupSetsForWeight(W, { a = 0.5, b = 0.8, Smax = 7 } = {}) {
  if (!Number.isFinite(W) || W <= 0) return 1;
  const s = Math.floor(a * Math.log2(W) + b);
  return Math.max(1, Math.min(Smax, s));
}

/* ------------------------------ 1RM + Bodyweight ----------------------------- */

function bodyweightContribution(liftId, overrideBW = null) {
  const bw = Number.isFinite(overrideBW) ? overrideBW : getKnownBodyweight();
  const pct = getLiftBodyweightPct(liftId);
  if (!Number.isFinite(bw) || bw <= 0 || !Number.isFinite(pct) || pct <= 0) return 0;
  return bw * pct;
}

/**
 * Estimate 1RM from a single session prescription.
 * BAR weight is what the user typed; we add BW% behind the scenes.
 * 1RM ≈ (bar + bwPct*BW) / ( intensity% * decay(sets) )
 */
export function estimate1RMFromWeight({
  weight,           // BAR weight user entered
  intensityPct = 75,
  sets = 1,
  liftId = null,    // used for bw% lookup
  bodyweight = null // optional override
}) {
  const bar = Number(weight);
  const ip = Number(intensityPct);
  const s  = Math.max(1, Number(sets) || 1);
  if (!Number.isFinite(bar) || bar <= 0 || !Number.isFinite(ip) || ip <= 0) return null;

  const decay = setDecayFactor(s);
  const eff = bar + bodyweightContribution(liftId, bodyweight); // working weight moved
  const frac = (ip / 100) * decay;
  if (frac <= 0) return null;
  return eff / frac;
}

/**
 * Convert 1RM → BAR weight for a given sets/intensity, accounting for BW%.
 * BAR ≈ (1RM * intensity% * decay(sets)) - (bwPct * BW)
 */
export function weightFrom1RM({
  oneRM,
  intensityPct,
  sets,
  liftId = null,
  bodyweight = null
}) {
  if (!Number.isFinite(oneRM) || !Number.isFinite(intensityPct) || !Number.isFinite(sets)) {
    return null;
  }
  const fatigue = setDecayFactor(sets); // same attenuation
  const working = oneRM * (intensityPct / 100) * fatigue;  // total moved
  const bar = working - bodyweightContribution(liftId, bodyweight);
  const barPos = Math.max(0, bar);
  return roundTo(barPos, 5);
}

/* ----------------------------- Catalog 1RM store ----------------------------- */
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

/* ----------------------------- Time budgeting ------------------------------- */
/**
 * Prefer explicit BAR weight; fall back to 1RM→BAR; else default 15 min.
 * Warmups are computed from **working** (bar + bw%) weight.
 */
export function estimateExerciseMinutes({
  liftId,
  sets = 3,
  intensityPct = 75,
  weight = null, // BAR (typed) if present
  orm = null,
}) {
  const s = Math.max(1, Number(sets) || 1);
  const ip = Number(intensityPct);

  // 1) Try explicit BAR weight
  let bar = Number(weight);
  if (!Number.isFinite(bar) || bar <= 0) {
    // 2) Derive BAR weight from 1RM if we have one
    const knownOrm = Number.isFinite(orm) ? orm : getKnown1RM(liftId);
    if (Number.isFinite(knownOrm) && Number.isFinite(ip)) {
      const maybeBar = weightFrom1RM({ oneRM: knownOrm, intensityPct: ip, sets: s, liftId });
      if (Number.isFinite(maybeBar)) bar = maybeBar;
    }
  }
  if (!Number.isFinite(bar) || bar <= 0) return 15; // fallback when unknown

  // Warmups depend on **working** weight (bar + BW%)
  const working = bar + bodyweightContribution(liftId);
  const wu = warmupSetsForWeight(working);
  return wu * 1.5 + s * 3.0;
}

export function totalMinutes(rows = []) {
  return rows.reduce((acc, r) => acc + estimateExerciseMinutes(r), 0);
}

/* ------------------------------ Legacy helpers ------------------------------ */
export function setAttenuation(sets) {
  const n = Math.max(1, Number(sets) || 1);
  return Math.exp(-0.1 * (n - 1));
}
