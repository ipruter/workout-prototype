// src/components/RequireAuth.jsx
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function RequireAuth() {
  const nav = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let unsub;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) nav("/signin");
      else setChecked(true);

      const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
        if (!s) nav("/signin");
      });
      unsub = () => sub.subscription.unsubscribe();
    })();

    return () => { if (unsub) unsub(); };
  }, [nav]);

  // Optionally show a tiny loader here
  return checked ? <Outlet /> : null;
}
