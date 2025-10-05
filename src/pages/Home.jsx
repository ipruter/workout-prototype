import { useEffect, useState } from "react";
import { getBodyweight, setBodyweight } from "../utils/bodyweight";
import { supabase } from "../lib/supabaseClient";
import ProgramSelector from "../components/ProgramSelector"; // <-- add this

export default function Home() {
  const [bwText, setBwText] = useState("");

  useEffect(() => {
    const bw = getBodyweight();
    setBwText(bw != null ? String(bw) : "");
  }, []);

  function commit() {
    const n = parseFloat(bwText);
    if (!Number.isFinite(n) || n <= 0) {
      alert("Enter a valid bodyweight (e.g., 185).");
      return;
    }
    setBodyweight(n);
    console.log("[Home] Bodyweight saved:", n);
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      {/* NEW: program selector */}
      <ProgramSelector />

      <h2>Home</h2>
      <div style={{ display: "grid", gap: 12, maxWidth: 380 }}>
        <label style={{ fontSize: 14 }}>
          <div style={{ marginBottom: 4 }}>Bodyweight (lb)</div>
          <input
            type="number"
            step="0.5"
            min="1"
            placeholder="e.g. 185"
            value={bwText}
            onChange={(e) => setBwText(e.target.value)}
            onBlur={commit}
            style={{ width: 160 }}
          />
        </label>

        <div style={{ fontSize: 13, opacity: 0.8 }}>
          Bodyweight is used in the background for lifts that include a bodyweight component (e.g., Squat, Pull-Up).
          We still display <em>bar weight</em> in the planner.
        </div>
      </div>
    </div>
  );
}
