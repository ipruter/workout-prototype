/* =========================
   utils/metrics.js
   Bonus-only G model (graded), realistic defaults
   ========================= */

const clamp01 = (x) => Math.max(0, Math.min(1, Number(x) || 0));

export function normalizeCeiling(C) {
  const n = Number(C);
  if (!Number.isFinite(n)) return 0;
  return clamp01(n / 100); // 0..1
}

/** Activation → set equivalents (unchanged) */
export function activationToSetEq(act) {
  const a = clamp01(act);
  if (a < 0.60) return a / 0.60;               // 0.60 → 1.00 set
  const bonus = ((a - 0.60) / 0.40) * 0.20;    // up to +0.20 at full activation
  return 1 + bonus;                             // 1.00..1.20
}

/** Example effort weighting */
export function defaultEffortWeight(RIR) {
  if (!Number.isFinite(RIR)) return 1;
  if (RIR <= 0) return 1.1;
  if (RIR <= 1) return 1.05;
  if (RIR <= 2) return 1.0;
  if (RIR <= 3) return 0.95;
  return 0.9;
}

/** Example hypertrophy rep-quality weighting */
export function defaultHypertrophyWeight(reps) {
  if (!Number.isFinite(reps)) return 1;
  if (reps >= 5 && reps <= 12) return 1.0;
  if (reps < 5) return 0.95;
  return 0.95;
}

/** Bonus grows with compound share up to threshold; never penalizes. */
function compoundBuffFraction(share, threshold = 0.40) {
  const s = clamp01(share);
  const t = Math.max(0.05, Math.min(0.95, threshold));
  return Math.min(1, s / t); // 0..1
}

/** Graded "compoundness" weight from lift C (0..100), baseline C0.
 *  Optional soft strength bias: reps ≤6 count fully; by 15 reps ~0.5.
 */
function compoundWeightFromLift(lift, reps, C0 = 50, strengthBias = false) {
  const C = Number(lift?.C ?? lift?.ceiling ?? 0);
  // map C to 0..1 where C<=C0 => 0, C>=100 => 1
  let w = clamp01((normalizeCeiling(C) - normalizeCeiling(C0)) /
                  (1 - normalizeCeiling(C0)));
  if (strengthBias) {
    const r = Number(reps);
    const repFactor =
      Number.isFinite(r) && r > 6
        ? Math.max(0.5, 1 - ((r - 6) / 9) * 0.5) // 6→1.0, 15→0.5
        : 1;
    w *= repFactor;
  }
  return w; // 0..1
}

/** Main: compute modified sets per region (bonus-only G model).
 *  - Base = activation-derived effective sets
 *  - G bonus = +gBoost * min(1, share/threshold), share is graded by C
 *  Defaults chosen to match realistic effects (~5–10% when compounds are a solid chunk).
 */
export function computeModifiedSets({
  catalogById = {},
  weeklySets = [],
  coverageByLR = {},
  wEffort = defaultEffortWeight,
  wHyp    = defaultHypertrophyWeight,

  // Graded G settings (calibrated)
  C0 = 50,               // lifts with C <= 50 give no G credit
  strengthBias = false,  // set true if you want slight bias to ≤6 reps
  threshold = 0.40,      // full bonus once ~40% of region volume is high-G
  gBoost = 0.10,         // max +10% region-wide bonus

  // Compatibility: accepted but unused (kept to avoid breaking callers)
  // eslint-disable-next-line no-unused-vars
  floor, isCompoundish, includeStrengthOnly, isStrengthRep,
} = {}) {
  const total = {};        // base effective sets per region
  const gWeighted = {};    // base effective sets * graded G weight

  for (const row of weeklySets) {
    const { liftId, sets = 0, reps, RIR } = row;
    const lift = catalogById[liftId];
    if (!lift) continue;

    const actMap = coverageByLR[liftId] || {};
    const eW = wEffort(RIR);
    const hW = wHyp(reps);
    const s  = Number(sets) || 0;
    if (s <= 0) continue;

    const gW = compoundWeightFromLift(lift, reps, C0, strengthBias); // 0..1

    for (const R in actMap) {
      const act = Number(actMap[R] || 0);
      const eff = activationToSetEq(act) * s * eW * hW;

      total[R]     = (total[R] || 0) + eff;
      gWeighted[R] = (gWeighted[R] || 0) + eff * gW;
    }
  }

  const modified = {};
  const debug = {};
  for (const R in total) {
    const T  = total[R] || 0;
    const Gw = gWeighted[R] || 0;
    const share = T > 0 ? clamp01(Gw / T) : 0;

    const frac   = compoundBuffFraction(share, threshold); // 0..1
    const factor = 1 + gBoost * frac;                      // ≥1
    const out    = T * factor;

    // tidy rounding for UI stability
    modified[R] = Math.round(out * 100) / 100;
    debug[R] = {
      total: Math.round(T * 100) / 100,
      gWeighted: Math.round(Gw * 100) / 100,
      share, threshold, gBoost,
      bonusFraction: frac, appliedFactor: factor,
      C0, strengthBias,
    };
  }

  return { modifiedSets: modified, totalSets: total, compoundSets: gWeighted, debug };
}
