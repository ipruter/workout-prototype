// src/components/SessionPlanner.jsx
import { useEffect, useMemo, useState } from "react";
import { CATALOG_BY_ID } from "../data/lifts";
import {
  estimateExerciseMinutes,
  totalMinutes,
  getKnown1RM,
  estimate1RMFromWeight,
  weightFrom1RM,
} from "../utils/timeBudget";
import { getBodyweight } from "../utils/bodyweight";




// ---------- helpers ----------
const toNumOrNull = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// ---------- one exercise row ----------
function ExerciseCard({
  row,
  onChange,
  onRemove,
  withCheckbox = false,
  checked = false,
  onToggleCheck = null,
}) {
  const lift = CATALOG_BY_ID[row.liftId];
  const localOrm = getKnown1RM(row.liftId);
  const baseOneRM = Number.isFinite(row.orm) ? row.orm : localOrm;
  const bodyweight = getBodyweight() ?? 0;

  // Derived BAR weight from 1RM (display whenever row.weight is null)
  const derivedWeight = useMemo(() => {
    if (!Number.isFinite(baseOneRM)) return null;
    return weightFrom1RM({
      oneRM: baseOneRM,
      intensityPct: row.intensityPct ?? 75,
      sets: row.sets ?? 1,
      liftId: row.liftId,
      bodyweight,
    });
  }, [baseOneRM, row.intensityPct, row.sets, row.liftId, bodyweight]);

  // Local edit buffers to avoid the "always starts at 1" issue
  const [setsText, setSetsText] = useState(row.sets != null ? String(row.sets) : "");
  const [repsText, setRepsText] = useState(row.reps != null ? String(row.reps) : "");
  const [intensityText, setIntensityText] = useState(
    row.intensityPct != null ? String(row.intensityPct) : ""
  );

  useEffect(() => { setSetsText(row.sets != null ? String(row.sets) : ""); }, [row.sets]);
  useEffect(() => { setRepsText(row.reps != null ? String(row.reps) : ""); }, [row.reps]);
  useEffect(() => {
    setIntensityText(row.intensityPct != null ? String(row.intensityPct) : "");
  }, [row.intensityPct]);

  // Weight editing (BAR weight). While typing we show the raw string; onBlur we infer 1RM.
  const [editingW, setEditingW] = useState(false);
  const [weightText, setWeightText] = useState("");

  // Keep the weight text in sync when NOT editing
  useEffect(() => {
    if (editingW) return;
    const shown = row.weight ?? derivedWeight;
    setWeightText(shown == null ? "" : String(shown));
  }, [editingW, row.weight, derivedWeight]);

  // Quick helpers
  const toNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  // Display helpers
  const e1rm = estimate1RMFromWeight({
    weight: row.weight ?? derivedWeight, // BAR
    intensityPct: row.intensityPct,
    sets: row.sets,
    liftId: row.liftId,
    bodyweight,
  });

  const minutes = estimateExerciseMinutes({
    liftId: row.liftId,
    sets: row.sets,
    intensityPct: row.intensityPct,
    weight: row.weight, // BAR if explicitly set
    orm: row.orm ?? localOrm,
  });

  // Keep weight “derived” whenever set/intensity/1RM change
  function applyRecalcWeight(patch = {}) {
    onChange({ ...row, ...patch, weight: null });
  }

  function commitWeightFromText() {
    setEditingW(false);
    const w = Number(weightText);
    if (!Number.isFinite(w)) {
      // invalid/cleared → go back to derived
      onChange({ ...row, weight: null });
      return;
    }
    // infer 1RM from typed BAR weight using bodyweight-aware math
    const inferred = estimate1RMFromWeight({
      weight: w, // BAR
      intensityPct: row.intensityPct,
      sets: row.sets,
      liftId: row.liftId,
    });
    onChange({
      ...row,
      orm: inferred ? Math.round(inferred) : (row.orm ?? null),
      weight: null, // keep derived going forward
    });
  }

  return (
    <div style={{ border: "1px solid #e3e3e3", borderRadius: 12, padding: 12, marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {withCheckbox && (
            <input
              type="checkbox"
              checked={!!checked}
              onChange={(e) => onToggleCheck?.(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: "#0a7" }}
              aria-label="Mark this exercise successful"
            />
          )}
          <div style={{ fontWeight: 600 }}>{lift?.name || row.liftId}</div>
        </div>
        <button onClick={onRemove} aria-label="remove">✕</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 8, marginTop: 10 }}>
        {/* Sets */}
        <label style={{ fontSize: 12 }}>
          <div>Sets</div>
          <input
            type="number"
            inputMode="numeric"
            value={setsText}
            onChange={(e) => {
              const txt = e.target.value;
              setSetsText(txt);
              const n = toNum(txt);
              if (Number.isFinite(n) && n > 0) applyRecalcWeight({ sets: n });
            }}
            onBlur={() => {
              if (setsText === "") {
                setSetsText(String(row.sets ?? 1));
              }
            }}
          />
        </label>

        {/* Reps */}
        <label style={{ fontSize: 12 }}>
          <div>Reps</div>
          <input
            type="number"
            inputMode="numeric"
            value={repsText}
            onChange={(e) => {
              const txt = e.target.value;
              setRepsText(txt);
              const n = toNum(txt);
              if (Number.isFinite(n) && n > 0) onChange({ ...row, reps: n });
            }}
            onBlur={() => {
              if (repsText === "") {
                setRepsText(String(row.reps ?? 1));
              }
            }}
          />
        </label>

        {/* Intensity */}
        <label style={{ display: "grid", gap: 4 }}>
          <div>Intensity %</div>
          <input
            type="number"
            inputMode="decimal"
            value={intensityText}
            onChange={(e) => {
              const txt = e.target.value;
              setIntensityText(txt);
              const n = toNum(txt);
              // Apply live so weight re-derives as you type valid numbers
              if (Number.isFinite(n) && n >= 0) applyRecalcWeight({ intensityPct: n });
            }}
            onBlur={() => {
              if (intensityText === "") {
                setIntensityText(String(row.intensityPct ?? 75));
              }
            }}
            style={{ width: 100 }}
          />
        </label>

        {/* Weight (BAR) */}
        <label style={{ fontSize: 12 }}>
          <div>Weight</div>
          <input
            type="number"
            step="5"
            placeholder="e.g. 225"
            value={weightText}
            onFocus={() => {
              setEditingW(true);
              const shown = row.weight ?? derivedWeight;
              setWeightText(shown == null ? "" : String(shown));
            }}
            onChange={(e) => setWeightText(e.target.value)}
            onBlur={commitWeightFromText}
          />
        </label>

        {/* 1RM manual */}
        <label style={{ fontSize: 12 }}>
          <div>1RM (manual)</div>
          <input
            type="number"
            placeholder="optional"
            value={row.orm ?? ""}
            onChange={(e) => {
              const nextOrm = e.target.value === "" ? null : +e.target.value;
              // Setting 1RM should keep weight derived from it
              applyRecalcWeight({ orm: nextOrm });
            }}
          />
        </label>

        {/* Readouts */}
        <div style={{ alignSelf: "end", fontSize: 12, textAlign: "right" }}>
          ≈ {minutes.toFixed(1)} min
          <div style={{ opacity: 0.75 }}>
            e1RM: {e1rm ? Math.round(e1rm) : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}


// ---------- planner ----------
export default function SessionPlanner({
  targetMinutes = 45,
  value = [],
  onChange,
  hidePicker = false,
  successMarks = null,
  onToggleSuccess = null,
}) {
  const [rows, setRows] = useState(value);
  const [selectId, setSelectId] = useState("");

  useEffect(() => { setRows(value || []); }, [value]);

  const opts = useMemo(
    () =>
      Object.entries(CATALOG_BY_ID)
        .map(([id, o]) => ({ id, name: o.name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  function commit(next) {
    setRows(next);
    onChange?.(next);
  }

  function addSelected() {
    if (!selectId) return;
    const knownOrm = getKnown1RM(selectId);
    const defaultRow = {
      liftId: selectId,
      sets: 3,
      reps: 6,
      intensityPct: 75,
      weight: null,         // derive from 1RM for display
      orm: knownOrm ?? null,
    };
    commit([...rows, defaultRow]);
    setSelectId("");
  }

  function removeAt(i) {
    const next = rows.slice();
    next.splice(i, 1);
    commit(next);
  }

  const used = totalMinutes(rows);
  const remaining = Math.max(0, targetMinutes - used);

  return (
    <section>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!hidePicker && (
          <>
            <select value={selectId} onChange={(e) => setSelectId(e.target.value)}>
              <option value="">Add workout…</option>
              {opts.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
            <button onClick={addSelected} disabled={!selectId}>
              Add
            </button>
          </>
        )}
        <div style={{ marginLeft: "auto", fontWeight: 600 }}>
          {used.toFixed(1)} / {targetMinutes} min
          {remaining === 0 ? "" : `  (left: ${remaining.toFixed(1)})`}
        </div>
      </div>

      {Array.isArray(successMarks) && (
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6, textAlign: "left" }}>
          <strong>Success?</strong> Check only if you completed <em>all sets & all reps</em>.
          Checked items will increase 1RM by 2.5% after saving.
        </div>
      )}

      {rows.map((r, i) => (
        <ExerciseCard
          key={i}
          row={r}
          onChange={(updated) => {
  const prev = rows[i];
  const next = rows.slice();
  next[i] = updated;

  // If this edit changed the 1RM, propagate to all rows with the same liftId
  if (updated.orm != null && updated.orm !== prev.orm) {
    for (let j = 0; j < next.length; j++) {
      if (j !== i && next[j].liftId === updated.liftId) {
        next[j] = { ...next[j], orm: updated.orm, weight: null }; // keep weight derived
      }
    }
  }

  commit(next);
}}

          onRemove={() => removeAt(i)}
          withCheckbox={Array.isArray(successMarks)}
          checked={!!successMarks?.[i]}
          onToggleCheck={(val) => onToggleSuccess?.(i, val)}
        />
      ))}
    </section>
  );
}
