// src/context/OneRMContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const OneRMContext = createContext(null);
const KEY = "orm-v1"; // same key you already use elsewhere

function readFromStorage() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

export function OneRMProvider({ children }) {
  const [orms, setOrms] = useState(() => readFromStorage());

  // keep localStorage in sync
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(orms));
    } catch {}
  }, [orms]);

  const api = useMemo(
    () => ({
      // get one value; returns number or null
      get: (liftId) =>
        Number.isFinite(Number(orms?.[liftId])) ? Number(orms[liftId]) : null,
      // set/update a single lift 1RM
      set: (liftId, value) =>
        setOrms((prev) => ({ ...prev, [liftId]: Number(value) })),
      // merge many at once
      bulkSet: (map) => setOrms((prev) => ({ ...prev, ...(map || {}) })),
      // read all (object map)
      all: orms,
    }),
    [orms]
  );

  return <OneRMContext.Provider value={api}>{children}</OneRMContext.Provider>;
}

export function useOneRM() {
  const ctx = useContext(OneRMContext);
  if (!ctx) throw new Error("useOneRM must be used within OneRMProvider");
  return ctx;
}
