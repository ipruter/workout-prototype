// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get("code")) {
          // PKCE flow (?code=...)
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (error) throw error;
        } else {
          // token-in-hash flow
          await supabase.auth.getSession();
        }
        nav("/", { replace: true });
      } catch {
        nav("/signin", { replace: true });
      }
    })();
  }, [nav]);

  return (
    <div style={{ padding: 16 }}>
      <p>Signing you in… If prompted, tap <b>“Open in browser”</b>.</p>
    </div>
  );
}
