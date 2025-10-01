// src/main.jsx
import { StrictMode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";

// ---- Inline 1RM context/provider (no separate import needed) ----
const OneRMContext = createContext(null);
const KEY = "orm-v1"; // same key your code already uses

function OneRMProvider({ children }) {
  const [orms, setOrms] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const obj = raw ? JSON.parse(raw) : {};
      return obj && typeof obj === "object" ? obj : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(orms));
    } catch {}
  }, [orms]);

  const api = useMemo(
    () => ({
      // read a single lift’s 1RM
      get: (liftId) =>
        Number.isFinite(Number(orms?.[liftId])) ? Number(orms[liftId]) : null,
      // set a single lift’s 1RM
      set: (liftId, value) =>
        setOrms((prev) => ({ ...prev, [liftId]: Number(value) })),
      // merge many values at once
      bulkSet: (map) => setOrms((prev) => ({ ...prev, ...(map || {}) })),
      // read all
      all: orms,
    }),
    [orms]
  );

  return <OneRMContext.Provider value={api}>{children}</OneRMContext.Provider>;
}

// Optional hook if you want to use it elsewhere
export function useOneRM() {
  const ctx = useContext(OneRMContext);
  if (!ctx) throw new Error("useOneRM must be used within OneRMProvider");
  return ctx;
}

// ---- App bootstrap ----
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OneRMProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </OneRMProvider>
  </StrictMode>
);
