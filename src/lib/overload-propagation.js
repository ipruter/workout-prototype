// --- Overload propagation (compound → isolation OK; isolation → compound minimal) ---
import { coverageByLR } from "../data/coverage";
import { WORKOUTS } from "../data/workouts";
import { getKnown1RM, setKnown1RM } from "../utils/timeBudget";

// Build the catalog-by-id from the WORKOUTS array
const CATALOG_BY_ID = Object.fromEntries(WORKOUTS.map(w => [w.id, w]));

// ---------- Tunables ----------
const PRIME_K    = 3;
const TAU        = 0.30;
const T_CAP      = 0.60;  // unused, kept
const SELF_MULT  = 2.0;   // primary multiplier (keep for now)

// NEW: C-based smooth-decay bump curve (percent per successful session)
const BUMP_MIN_PCT = 0.45;  // at very high C (DL/squat)
const BUMP_MAX_PCT = 1.85;  // at very low C (isolations)
const BUMP_DECAY_K = 38;    // curve steepness

function baseBumpFromC(C, { minPct = BUMP_MIN_PCT, maxPct = BUMP_MAX_PCT, k = BUMP_DECAY_K } = {}) {
  const c = Number(C || 0);
  return minPct + (maxPct - minPct) * Math.exp(-c / k);
}

function baseBumpForLift(liftId, curveOpts) {
  const C = CATALOG_BY_ID[liftId]?.C ?? 0;
  return baseBumpFromC(C, curveOpts);
}


// ---------- Helpers ----------
function topKRegions(regions, K = PRIME_K) {
  return Object.entries(regions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, K)
    .map(([k]) => k);
}

function overlapScore(A_regions, B_regions, primeB) {
  let num = 0, den = 0;
  for (const r of primeB) {
    const b = Number(B_regions[r] || 0);
    const a = Number(A_regions[r] || 0);
    num += Math.min(a, b);
    den += b;
  }
  return den > 0 ? num / den : 0;     // 0..1
}

function directionality(CA, CB) {
  // More compound donor (A) → stronger transfer; less → very weak.
  const x = (Number(CA || 0) - Number(CB || 0)) / 25;     // scale: ~25 C points
  const v = 0.5 + 0.5 * Math.tanh(x);                     // 0..1
  return Math.min(1.0, Math.max(0.1, v));                 // clamp [0.1, 1.0]
}

function transferScore(liftA, liftB, K = PRIME_K) {
  const A = coverageByLR[liftA] || {};
  const B = coverageByLR[liftB] || {};
  const primeB = topKRegions(B, K);
  const ovl = overlapScore(A, B, primeB);                 // 0..1
  const CA  = CATALOG_BY_ID[liftA]?.C ?? 0;
  const CB  = CATALOG_BY_ID[liftB]?.C ?? 0;
  const dir = directionality(CA, CB);                     // 0.1..1
  return ovl * dir;                                       // 0..1
}

// ---------- Apply / queue bumps ----------
const PENDING_KEY = "bump-queue-v1";

/** Immediately bump a lift's stored 1RM by +pct% if known; else queue it. */
function bumpLiftPercent(liftId, pct) {
  const cur = Number(getKnown1RM(liftId));
  if (Number.isFinite(cur) && cur > 0) {
    const next = Math.round(cur * (1 + pct / 100));
    setKnown1RM(liftId, next);
  } else {
    // queue for later when preloadDb1RMs runs
    const q = JSON.parse(localStorage.getItem(PENDING_KEY) || "{}");
    q[liftId] = (q[liftId] || 0) + pct;
    localStorage.setItem(PENDING_KEY, JSON.stringify(q));
  }
}

/** Call once after preloadDb1RMs to apply any queued bumps. */
export function applyQueuedBumpsIfAny() {
  try {
    const q = JSON.parse(localStorage.getItem(PENDING_KEY) || "{}");
    const ids = Object.keys(q || {});
    if (!ids.length) return;
    for (const id of ids) {
      const pct = Number(q[id] || 0);
      if (!pct) continue;
      bumpLiftPercent(id, pct);
    }
    localStorage.removeItem(PENDING_KEY);
  } catch {}
}

// ---------- Public API ----------
/**
 * Bump a primary lift by +2×BASE_BUMP (e.g., +2.5%), then propagate up to +BASE_BUMP to others.
 * Example: bumpWithPropagation("bb_bench") → bench +2.5%; incline bench spills from bench by rule.
 */
/**
 * Bump a primary lift by +2×BASE_BUMP (→ 1.5%), then propagate a flat +BASE_BUMP (→ 0.75%)
 * to “similar/region” lifts whose transfer score passes the threshold (TAU).
 * Example: bumpWithPropagation("bb_bench") → bench +1.5%; incline bench +0.75% if T ≥ TAU.
 */
export function bumpWithPropagation(primaryLiftId, opts = {}) {
  const tau  = Number(opts.threshold ?? TAU);
  const K    = Number(opts.primeK    ?? PRIME_K);
  const selfMult = Number(opts.selfMult ?? SELF_MULT);

  // Allow override, but default to C-based curve
  const curveOpts = {
    minPct: Number(opts.bumpMinPct ?? BUMP_MIN_PCT),
    maxPct: Number(opts.bumpMaxPct ?? BUMP_MAX_PCT),
    k:      Number(opts.bumpDecayK ?? BUMP_DECAY_K),
  };

  // 1) Self bump uses the PRIMARY lift's own C
  const selfBase = Number.isFinite(opts.baseBumpPct)
    ? Number(opts.baseBumpPct)
    : baseBumpForLift(primaryLiftId, curveOpts);

  bumpLiftPercent(primaryLiftId, selfBase * selfMult);

  // 2) Propagation uses EACH RECEIVER lift's own C (so laterals don't bump like deadlifts)
  for (const liftB of Object.keys(coverageByLR)) {
    if (liftB === primaryLiftId) continue;

    const T = transferScore(primaryLiftId, liftB, K);
    if (T >= tau) {
      const recvBase = Number.isFinite(opts.baseBumpPctSimilar)
        ? Number(opts.baseBumpPctSimilar)
        : baseBumpForLift(liftB, curveOpts);

      bumpLiftPercent(liftB, recvBase);
    }
  }
}


