// src/components/ProgramSelector.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { PROGRAMS, PROGRAM_KEYS } from "../data/program-registry";

const LS_KEY = "selected-program";

export default function ProgramSelector() {
  // Initialize from localStorage so it stays sticky across pages
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(LS_KEY) || "default";
    } catch {
      return "default";
    }
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load server preference (if any) on mount and mirror to localStorage
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setError("");
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("selected_program")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          if (isMounted) setError(error.message);
          return;
        }

        // If row exists and key is valid → prefer it
        if (data?.selected_program && PROGRAMS[data.selected_program]) {
          const key = data.selected_program;
          if (isMounted) setValue(key);
          try { localStorage.setItem(LS_KEY, key); } catch {}
        } else if (!data) {
          // No row yet → create with current value (or default)
          const fallback = value || "default";
          const { error: upErr } = await supabase
            .from("profiles")
            .upsert({ id: user.id, selected_program: fallback }, { onConflict: "id" });
          if (upErr) {
            if (isMounted) setError(upErr.message);
            return;
          }
          try { localStorage.setItem(LS_KEY, fallback); } catch {}
          if (isMounted) setValue(fallback);
        }
      } catch (e) {
        if (isMounted) setError(e.message || String(e));
      }
    })();

    return () => { isMounted = false; };
  }, []); // ← mount only

  async function onSelect(nextKey) {
    setSaving(true);
    setError("");
    try {
      // Update UI & localStorage immediately so Today’s page can read it
      setValue(nextKey);
      try { localStorage.setItem(LS_KEY, nextKey); } catch {}

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Upsert profile (handles "no row yet")
        const { error: upErr } = await supabase
          .from("profiles")
          .upsert({ id: user.id, selected_program: nextKey }, { onConflict: "id" });
        if (upErr) throw upErr;

        // Ensure a state row exists for this program
        const { error: stErr } = await supabase
          .from("user_program_state")
          .upsert(
            { user_id: user.id, program_key: nextKey, pointer: 0 },
            { onConflict: "user_id,program_key" }
          );
        if (stErr) throw stErr;
      }
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ marginBottom: 24, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Workout Program</div>
      <div style={{ display: "grid", gap: 8 }}>
        {PROGRAM_KEYS.map((k) => (
          <label key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="radio"
              name="program"
              value={k}
              checked={value === k}
              onChange={() => onSelect(k)}
              disabled={saving}
            />
            <span>{PROGRAMS[k].label}</span>
          </label>
        ))}
      </div>
      {saving && <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>Saving…</div>}
      {error && <div style={{ color: "crimson", fontSize: 12, marginTop: 6 }}>{error}</div>}
    </div>
  );
}
