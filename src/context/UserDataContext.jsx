// src/context/UserDataContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// local cache keys (kept for offline/compat)
const LOCAL_ORM_KEY = "orm-v1";
const LOCAL_BW_KEY  = "bodyweight-v1";

function readLocalORMs() {
  try { return JSON.parse(localStorage.getItem(LOCAL_ORM_KEY) || "{}"); } catch { return {}; }
}
function writeLocalORMs(map) {
  try { localStorage.setItem(LOCAL_ORM_KEY, JSON.stringify(map || {})); } catch {}
}
function readLocalBW() {
  try {
    const v = JSON.parse(localStorage.getItem(LOCAL_BW_KEY) || "null");
    return (Number.isFinite(+v) && +v > 0) ? +v : null;
  } catch { return null; }
}
function writeLocalBW(v) {
  try { localStorage.setItem(LOCAL_BW_KEY, JSON.stringify(v ?? null)); } catch {}
}

const Ctx = createContext(null);
export function useUserData() {
  return useContext(Ctx);
}

export function UserDataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bodyweight, setBodyweightState] = useState(readLocalBW());
  const [orms, setOrms] = useState(readLocalORMs());
  const [loading, setLoading] = useState(true);

  // Watch auth and load from DB
  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      const u = data?.user ?? null;
      if (!mounted) return;
      setUser(u);

      if (u) {
        // load profile
        const { data: prof } = await supabase
          .from("profiles")
          .select("bodyweight")
          .eq("id", u.id)
          .maybeSingle();

        if (mounted) {
          const bw = prof?.bodyweight ?? readLocalBW();
          setBodyweightState(bw ?? null);
          // write local for timeBudget fallback
          writeLocalBW(bw ?? null);
        }

        // load orms
        const { data: rows } = await supabase
          .from("user_orms")
          .select("lift_id, one_rm")
          .eq("user_id", u.id);

        if (mounted) {
          const map = { ...readLocalORMs() };
          (rows || []).forEach(r => { if (r.lift_id && r.one_rm) map[r.lift_id] = +r.one_rm; });
          setOrms(map);
          writeLocalORMs(map);
        }
      } else {
        // signed out → keep local cache only
        setBodyweightState(readLocalBW());
        setOrms(readLocalORMs());
      }
      setLoading(false);
    }

    bootstrap();
    const { data: sub } = supabase.auth.onAuthStateChange(() => bootstrap());

    return () => { mounted = false; sub?.subscription?.unsubscribe?.(); };
  }, []);
  // Upserts
  async function saveBodyweight(next) {
    setBodyweightState(next ?? null);
    writeLocalBW(next ?? null);

    if (user) {
      await supabase
        .from("profiles")
        .upsert({ id: user.id, bodyweight: next ?? null, updated_at: new Date().toISOString() })
        .select()
        .maybeSingle();
    }
  }

  async function setOrm(liftId, oneRm) {
    if (!liftId || !Number.isFinite(+oneRm) || +oneRm <= 0) return;
    const next = { ...orms, [liftId]: Math.round(+oneRm) };
    setOrms(next);
    writeLocalORMs(next);

    if (user) {
      await supabase.from("user_orms").upsert({
        user_id: user.id,
        lift_id: String(liftId),
        one_rm: Math.round(+oneRm),
        updated_at: new Date().toISOString(),
      });
    }
  }

  async function bumpOrm(liftId, base, pct = 2.5) {
    if (!Number.isFinite(base) || base <= 0) return;
    const bumped = Math.round(base * (1 + pct / 100));
    await setOrm(liftId, bumped);
  }

  const value = useMemo(() => ({
    loading, user,
    bodyweight, saveBodyweight,
    orms, setOrm, bumpOrm,
  }), [loading, user, bodyweight, orms]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
