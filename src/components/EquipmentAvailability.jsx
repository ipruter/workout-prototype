// src/components/EquipmentAvailability.jsx
import { useEffect, useState } from "react";
import { buildBlockedSet } from "../utils/equipmentFallback";

const NEW_KEY = "equipment-unavailable";   // stored as array of strings
const LEGACY_KEY = "equipmentBlocked";     // old object shape
const KEYS = ["barbells", "machines", "dumbbells", "assisted"];

const DEFAULTS = { barbells: false, machines: false, dumbbells: false, assisted: false };

// ----- read once, synchronously, to avoid mount-race overwriting -----
function loadInitialBlocked() {
  try {
    const rawNew = localStorage.getItem(NEW_KEY);
    if (rawNew) {
      const arr = JSON.parse(rawNew);
      if (Array.isArray(arr)) {
        return {
          barbells: arr.includes("barbells"),
          machines: arr.includes("machines"),
          dumbbells: arr.includes("dumbbells"),
          assisted: arr.includes("assisted"),
        };
      }
    }
    // migrate legacy object -> new array
    const rawOld = localStorage.getItem(LEGACY_KEY);
    if (rawOld) {
      const obj = JSON.parse(rawOld) || {};
      const arr = KEYS.filter((k) => !!obj[k]);
      localStorage.setItem(NEW_KEY, JSON.stringify(arr));
      return {
        barbells: !!obj.barbells,
        machines: !!obj.machines,
        dumbbells: !!obj.dumbbells,
        assisted: !!obj.assisted,
      };
    }
  } catch {
    // ignore parse errors; fall back to defaults
  }
  return DEFAULTS;
}

export default function EquipmentAvailability({ onChange }) {
  // Initialize from storage synchronously (prevents the wipe-on-mount bug)
  const [blocked, setBlocked] = useState(loadInitialBlocked);

  // SAVE whenever state changes (this can run on first mount; it's fine)
  useEffect(() => {
    try {
      const arr = KEYS.filter((k) => blocked[k]);
      localStorage.setItem(NEW_KEY, JSON.stringify(arr));
    } catch {}
    onChange?.(buildBlockedSet(blocked));
  }, [blocked, onChange]);

  return (
    <div className="space-y-2">
      <div style={{ fontWeight: 600 }}>Equipment availability</div>

      {KEYS.map((k) => (
        <label key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={!!blocked[k]}
            onChange={(e) => {
              const checked = e.target.checked;
              setBlocked((s) => {
                const next = { ...s, [k]: checked };
                // persist immediately so fast nav can't beat the effect
                try {
                  const arr = KEYS.filter((kk) => next[kk]);
                  localStorage.setItem(NEW_KEY, JSON.stringify(arr));
                } catch {}
                onChange?.(buildBlockedSet(next));
                return next;
              });
            }}
          />
          {k === "assisted"
            ? "Assisted station (if needed for pull ups and dips)"
            : k.charAt(0).toUpperCase() + k.slice(1)}
        </label>
      ))}
    </div>
  );
}
