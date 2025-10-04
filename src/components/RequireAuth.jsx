// src/components/RequireAuth.jsx
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function RequireAuth() {
  const nav = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let unsub;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        nav("/signin", { replace: true });
        setChecking(false);
      } else {
        setChecking(false);
      }

      const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
        if (!s) nav("/signin", { replace: true });
      });
      unsub = () => sub.subscription.unsubscribe();
    })();

    return () => { if (unsub) unsub(); };
  }, [nav]);

  // render nothing (or a spinner) while deciding
  if (checking) return null;
  return <Outlet />;
}
