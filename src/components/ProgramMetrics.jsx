// ProgramMetrics.jsx
// Renders a single “Modified Sets” box per region using your new metrics pipeline.

import React, { useMemo, useState } from "react";
import { coverageByLR } from "../data/coverage";
import { CATALOG_BY_ID } from "../data/lifts";

// TODO: fix these import paths to match your project structure:
import {
  computeModifiedSets,
  defaultEffortWeight,
  defaultHypertrophyWeight,
} from "../utils/metrics"; // <-- adjust path if needed

// Small helpers
const fmt1 = (n) => (Number.isFinite(n) ? n.toFixed(1) : "0.0");
const fmt2 = (n) => (Number.isFinite(n) ? n.toFixed(2) : "0.00");
const pct0 = (x) => `${Math.round((x || 0) * 100)}%`;

export default function ProgramMetrics({
  catalogById,
  weeklySets,
  coverageByLR,
  // Optional overrides:
  wEffort = defaultEffortWeight,
  wHyp = defaultHypertrophyWeight,
  isCompoundish,          // (lift) => boolean; defaults to C>=0.5 inside metrics if omitted
  includeStrengthOnly,    // boolean
  isStrengthRep,          // (reps) => boolean; defaults to reps<=6 if omitted
  threshold = 0.40,
  floor = 0.30,
  gBoost = 0.12,
  // Region ordering / labels (optional):
  regionOrder,            // e.g., ["chest","triceps","quads",...]
  regionLabel = (r) => r, // map id -> display label
}) {
  // Compute everything once per input change
  const { modifiedSets, totalSets, compoundSets, debug } = useMemo(() => {
    return computeModifiedSets({
      catalogById,
      weeklySets,
      coverageByLR,
      wEffort,
      wHyp,
      isCompoundish,
      includeStrengthOnly,
      isStrengthRep,
      threshold,
      floor,
      gBoost,
    });
  }, [
    catalogById,
    weeklySets,
    coverageByLR,
    wEffort,
    wHyp,
    isCompoundish,
    includeStrengthOnly,
    isStrengthRep,
    threshold,
    floor,
    gBoost,
  ]);

  // Build list of regions present
  const regions = useMemo(() => {
    const keys = new Set([
      ...Object.keys(modifiedSets || {}),
      ...Object.keys(totalSets || {}),
    ]);
    const arr = Array.from(keys);
    if (Array.isArray(regionOrder) && regionOrder.length) {
      // Sort by provided order, then append any stragglers
      const orderIdx = Object.fromEntries(regionOrder.map((k, i) => [k, i]));
      arr.sort((a, b) => {
        const ia = orderIdx[a] ?? Number.POSITIVE_INFINITY;
        const ib = orderIdx[b] ?? Number.POSITIVE_INFINITY;
        return ia - ib || a.localeCompare(b);
      });
    } else {
      // default: sort by modified sets desc
      arr.sort((a, b) => (modifiedSets[b] || 0) - (modifiedSets[a] || 0));
    }
    return arr;
  }, [modifiedSets, totalSets, regionOrder]);

  // simple hover state for details popover
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full">
      {/* Header / controls (optional; minimal for now) */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold">Program Metrics</h2>
        <div className="text-xs opacity-70">
          threshold {Math.round(threshold * 100)}% &middot; floor {pct0(floor)} &middot; G boost up to {pct0(gBoost)}
        </div>
      </div>

      {/* Grid of one box per region */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
        {regions.map((rid) => {
          const mod = modifiedSets[rid] || 0;
          const tot = totalSets[rid] || 0;
          const comp = compoundSets[rid] || 0;
          const d = debug?.[rid] || {};
          const share = d.share ?? (tot > 0 ? comp / tot : 0);

          // color intensity based on modified sets (soft clamp)
          const intensity = Math.min(1, (mod || 0) / 12); // ~12 sets = near full tint
          const bg = `rgba(59, 130, 246, ${0.10 + 0.35 * intensity})`; // Tailwind blue-500-ish base

          return (
            <div
              key={rid}
              onMouseEnter={() => setHovered(rid)}
              onMouseLeave={() => setHovered((h) => (h === rid ? null : h))}
              className="relative rounded-2xl border border-black/5 shadow-sm p-3 transition-transform hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: bg }}
            >
              <div className="text-xs uppercase tracking-wide opacity-75 mb-1">
                {regionLabel(rid)}
              </div>

              {/* The ONE number we care about now */}
              <div className="text-2xl font-semibold">
                {fmt1(mod)}
                <span className="text-sm font-normal opacity-70 ml-1">sets</span>
              </div>

              {/* Light subtext for quick context */}
              <div className="mt-1 text-[11px] opacity-70">
                total {fmt1(tot)} • compound {pct0(share)}
              </div>

              {/* Hover details card */}
              {hovered === rid && (
                <div className="absolute z-10 top-2 right-2 w-64 rounded-xl border border-black/10 bg-white/95 backdrop-blur p-3 shadow-lg text-[11px]">
                  <div className="font-semibold text-xs mb-1">
                    {regionLabel(rid)} details
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <div className="opacity-70">Effective (total)</div>
                    <div className="text-right">{fmt2(d.total ?? tot)}</div>

                    <div className="opacity-70">Compound share</div>
                    <div className="text-right">{pct0(d.share ?? share)}</div>

                    <div className="opacity-70">Threshold</div>
                    <div className="text-right">{pct0(d.threshold ?? threshold)}</div>

                    <div className="opacity-70">Floor (surplus)</div>
                    <div className="text-right">{pct0(d.floor ?? floor)}</div>

                    <div className="opacity-70">Tapered subtotal</div>
                    <div className="text-right">{fmt2(d.tapered ?? 0)}</div>

                    <div className="opacity-70">G boost factor</div>
                    <div className="text-right">
                      {fmt2(1 + (d.gBoost ?? gBoost) * (d.share ?? share))}
                    </div>

                    <div className="opacity-70">Final (modified)</div>
                    <div className="text-right">{fmt2(d.boosted ?? mod)}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* tiny legend */}
      <div className="mt-4 text-[11px] opacity-70">
        Single-box = <strong>Modified Sets</strong> (activation-based effective sets → taper above {pct0(threshold)} compound share → mild G boost).
      </div>
    </div>
  );
}
