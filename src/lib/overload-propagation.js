// --- Overload propagation (compound → isolation OK; isolation → compound minimal) ---
import { coverageByLR } from "../data/coverage";
import { WORKOUTS } from "../data/workouts";
import { getKnown1RM, setKnown1RM } from "../utils/timeBudget";

// Build the catalog-by-id from the WORKOUTS array
const CATALOG_BY_ID = Object.fromEntries(WORKOUTS.map(w => [w.id, w]));


// ---------- Tunables ----------
const PRIME_K    = 3;     // how many of B's prime regions define B
const TAU        = 0.30;  // minimum transfer score to propagate
const T_CAP      = 0.60;  // cap per propagation event (<=60% of donor's base bump)
const BASE_BUMP  = 1.25;  // your canonical per-lift bump
const SELF_MULT  = 2.0;   // self gets 2× base bump → 2.5%

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
export function bumpWithPropagation(primaryLiftId, opts = {}) {
  const base = Number(opts.baseBumpPct ?? BASE_BUMP);   // default 1.25
  const tau  = Number(opts.threshold   ?? TAU);
  const tcap = Number(opts.cap         ?? T_CAP);
  const K    = Number(opts.primeK      ?? PRIME_K);

  // 1) Self bump: +2× base bump (easier than comparing overlap with itself)
  bumpLiftPercent(primaryLiftId, base * SELF_MULT);

  // 2) Compute propagation for all other lifts
  for (const liftB of Object.keys(coverageByLR)) {
    if (liftB === primaryLiftId) continue;
    const T = transferScore(primaryLiftId, liftB, K);   // 0..1
    if (T >= tau) {
      const pct = base * Math.min(T, tcap);             // percent points
      if (pct > 0) bumpLiftPercent(liftB, pct);
    }
  }
}
