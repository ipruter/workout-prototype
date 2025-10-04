// src/main.jsx
import React, { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { supabase } from "./lib/supabaseClient";
import { setBodyweight } from "./utils/bodyweight";
import { setKnown1RM } from "./utils/timeBudget"; // non-hook util, safe

function Root() {
  // Do all startup/hydration work **inside** useEffect of a component
  useEffect(() => {
    const onFocus = async () => {
      // hydrate bodyweight from DB
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("bodyweight_lb")
            .eq("id", user.id)
            .maybeSingle();

          if (!error && data?.bodyweight_lb != null) {
            setBodyweight(Number(data.bodyweight_lb));
          }
        }
      } catch (e) {
        console.warn("[main] hydrateBodyweight failed:", e?.message || e);
      }

      // (optional) any other one-time “pull from DB and cache” work
      // e.g., hydrate some ORMs if you have an endpoint for that
    };

    window.addEventListener("focus", onFocus);
    onFocus(); // run once immediately

    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
