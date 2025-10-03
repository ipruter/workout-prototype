// src/main.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { supabase } from "./lib/supabaseClient";

const ORM_KEY = "orm-v1";
const BW_KEY  = "bw-v1";

// --- DB -> localStorage hydration (non-blocking) -----------------------------
async function hydrateOrms(userId) {
  try {
    const { data, error } = await supabase
      .from("user_orms")
      .select("lift_id, one_rm")
      .eq("user_id", userId);

    if (error) throw error;

    const map = {};
    for (const r of data || []) {
      if (r?.lift_id && Number.isFinite(+r.one_rm)) {
        map[r.lift_id] = Math.round(+r.one_rm);
      }
    }
    localStorage.setItem(ORM_KEY, JSON.stringify(map));
    console.log("[main] ORMs hydrated:", map);
  } catch (e) {
    console.warn("[main] hydrateOrms failed:", e.message || e);
  }
}

async function hydrateBodyweight(userId) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("bodyweight_lb, bodyweight_kg")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;

    let lbs = null;
    if (data) {
      if (Number.isFinite(+data.bodyweight_lb)) lbs = +data.bodyweight_lb;
      else if (Number.isFinite(+data.bodyweight_kg))
        lbs = Math.round(+data.bodyweight_kg * 2.20462);
    }

    if (Number.isFinite(lbs)) {
      localStorage.setItem(BW_KEY, JSON.stringify({ unit: "lb", value: lbs }));
      console.log("[main] Bodyweight hydrated (lb):", lbs);
    } else {
      localStorage.removeItem(BW_KEY);
      console.log("[main] No bodyweight set yet");
    }
  } catch (e) {
    console.warn("[main] hydrateBodyweight failed:", e.message || e);
  }
}

function clearLocalCaches() {
  localStorage.removeItem(ORM_KEY);
  localStorage.removeItem(BW_KEY);
  console.log("[main] Cleared local 1RM/bodyweight caches");
}

// --- Root wrapper: keep your working HashRouter, hydrate in background -------
function Root() {
  useEffect(() => {
    // 1) Read *local* session immediately so UI doesn’t block
    (async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data?.session?.user?.id;
      if (uid) {
        // fire-and-forget: no awaiting so render isn't blocked
        hydrateOrms(uid);
        hydrateBodyweight(uid);
      } else {
        clearLocalCaches();
      }
    })();

    // 2) Keep caches in sync with auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      const uid = session?.user?.id;
      if (uid) {
        hydrateOrms(uid);
        hydrateBodyweight(uid);
      } else {
        clearLocalCaches();
      }
    });

    // 3) Optional: refresh when user returns to the tab
    const onFocus = async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data?.session?.user?.id;
      if (uid) {
        hydrateOrms(uid);
        hydrateBodyweight(uid);
      }
    };
    window.addEventListener("focus", onFocus);

    return () => {
      sub?.subscription?.unsubscribe?.();
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Your original routing “workaround” preserved
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
