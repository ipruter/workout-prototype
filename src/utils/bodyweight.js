// src/utils/bodyweight.js
import { CATALOG_BY_ID } from "../data/lifts";

const KEY = "bw-v1";

/** Read bodyweight (lbs) or null if not set/invalid */
export function getBodyweight() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw == null) return null;
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

/** Save bodyweight (lbs). Silently ignores invalid values. */
export function setBodyweight(value) {
  try {
    const n = parseFloat(value);
    if (!Number.isFinite(n) || n <= 0) return;
    localStorage.setItem(KEY, String(n));
  } catch {}
}

/** Optional helpers */
export function clearBodyweight() {
  try { localStorage.removeItem(KEY); } catch {}
}
export function hasBodyweight() {
  return getBodyweight() != null;
}

/**
 * Per-lift bodyweight percentage (0..1).
 * Reads `bwPct` off your lift catalog entry; defaults to 0 if missing.
 */
export function getLiftBodyweightPct(liftId) {
  const pct = CATALOG_BY_ID?.[liftId]?.bwPct;
  return Number.isFinite(pct) && pct > 0 ? pct : 0;
}

/* Back-compat alias if any old code referenced this name */
export const getKnownBodyweight = getBodyweight;

if (typeof window !== "undefined" && !window.getKnownBodyweight) {
  window.getKnownBodyweight = getBodyweight;
}
