// src/utils/bodyweight.js
import { CATALOG_BY_ID } from "../data/lifts";

const KEY = "bw-v1";

/**
 * Read the user's bodyweight (lbs) from localStorage.
 * Returns a positive number, or null if unknown.
 */
export function getKnownBodyweight() {
  try {
    const v = localStorage.getItem(KEY);
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

/**
 * Persist the user's bodyweight (lbs) to localStorage.
 * Pass null/empty/invalid to clear it.
 */
export function setKnownBodyweight(v) {
  try {
    const n = Number(v);
    if (Number.isFinite(n) && n > 0) {
      localStorage.setItem(KEY, String(n));
    } else {
      localStorage.removeItem(KEY);
    }
  } catch {}
}

/**
 * Per-lift bodyweight percentage (0..1) from your catalog.
 * Falls back to 0 if not present.
 */
export function getLiftBodyweightPct(liftId) {
  try {
    const pct = CATALOG_BY_ID?.[liftId]?.bwPct;
    const n = Number(pct);
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

