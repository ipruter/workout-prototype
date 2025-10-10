import { useEffect, useMemo, useState } from "react";

const NEW_KEY = "equipment-unavailable";   // array: ["barbells", "machines", ...]
const LEGACY_KEY = "equipmentBlocked";     // object: { barbells: true, ... }

function readFromStorage() {
  try {
    // Prefer new format
    const rawNew = localStorage.getItem(NEW_KEY);
    if (rawNew) {
      const parsed = JSON.parse(rawNew);
      return Array.isArray(parsed) ? new Set(parsed) : new Set();
    }

    // Fallback to legacy format once (migrate)
    const rawOld = localStorage.getItem(LEGACY_KEY);
    if (rawOld) {
      const obj = JSON.parse(rawOld) || {};
      const arr = Object.keys(obj).filter((k) => !!obj[k]);
      // migrate to new format
      localStorage.setItem(NEW_KEY, JSON.stringify(arr));
      return new Set(arr);
    }
  } catch {}
  return new Set();
}

function writeToStorage(setLike) {
  try {
    const arr = Array.from(setLike || []);
    localStorage.setItem(NEW_KEY, JSON.stringify(arr));
  } catch {}
}

/**
 * Returns:
 *  - blocked: Set<string>  (e.g., "barbells", "dumbbells", "machines", "cables", "racks", "bands", "pullup_bar", etc.)
 *  - toggle(k): flips one item and persists
 *  - setChecked(k, bool): explicit setter and persists
 *  - isBlocked(k): convenience
 *  - clear(): empties the set
 */
export default function usePersistentEquipmentPrefs() {
  const [blocked, setBlocked] = useState(() => readFromStorage());

  // Persist on every change
  useEffect(() => {
    writeToStorage(blocked);
  }, [blocked]);

  const api = useMemo(() => {
    const toggle = (k) => {
      setBlocked((prev) => {
        const next = new Set(prev);
        next.has(k) ? next.delete(k) : next.add(k);
        return next;
      });
    };
    const setChecked = (k, on) => {
      setBlocked((prev) => {
        const next = new Set(prev);
        on ? next.add(k) : next.delete(k);
        return next;
      });
    };
    const isBlocked = (k) => blocked.has(k);
    const clear = () => setBlocked(new Set());
    return { blocked, toggle, setChecked, isBlocked, clear };
  }, [blocked]);

  return api;
}
