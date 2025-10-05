// src/components/ProgramSelector.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { PROGRAMS, PROGRAM_KEYS } from "../data/program-registry";

export default function ProgramSelector() {
  const [value, setValue] = useState("default");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setError("");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // load
const { data, error } = await supabase
  .from("profiles")
  .select("selected_program")
  .eq("id", user.id)
  .maybeSingle();               // <-- was .single()

if (!error && data?.selected_program) {
  setValue(data.selected_program);
} else if (!error && !data) {
  // no profile row yet — create one with default
  await supabase
  .from("profiles")
  .upsert({ id: user.id, selected_program: next }, { onConflict: "id" }); // upsert instead of update

  setValue("default");
}


        
      if (error) { setError(error.message); return; }
      if (isMounted && data?.selected_program) setValue(data.selected_program);
    })();
    return () => { isMounted = false; };
  }, []);

  async function onSelect(next) {
    setSaving(true);
    setError("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1) save preference on profile
      const { error: upErr } = await supabase
        .from("profiles")
        .update({ selected_program: next })
        .eq("id", user.id);
      if (upErr) throw upErr;

      // 2) ensure a state row exists for this program (pointer starts at 0 if new)
      const { error: stErr } = await supabase
        .from("user_program_state")
        .upsert(
          { user_id: user.id, program_key: next, pointer: 0 },
          { onConflict: "user_id,program_key" }
        );
      if (stErr) throw stErr;

      setValue(next);
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
