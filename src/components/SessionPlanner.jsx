// src/components/SessionPlanner.jsx
import { useEffect, useMemo, useState } from "react";
import { CATALOG_BY_ID } from "../data/lifts";
import {
  estimateExerciseMinutes,
  totalMinutes,
  getKnown1RM,
  estimate1RMFromWeight,
  weightFrom1RM,
  setKnown1RM,
  
} from "../utils/timeBudget";

// ---------- one exercise row card ----------
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

  // quick e1RM readout from whatever is typed
  const e1rm = estimate1RMFromWeight({
    weight: row.weight,
    intensityPct: row.intensityPct,
    sets: row.sets,
  });

  // base 1RM we use to derive a working weight
  const baseOneRM = Number.isFinite(row.orm) ? row.orm : getKnown1RM(row.liftId);

  // derived working weight from (1RM, intensity, sets) — rounds to /5
  const derivedWeight = useMemo(() => {
    return weightFrom1RM({
      oneRM: baseOneRM,
      intensityPct: row.intensityPct,
      sets: row.sets,
    });
  }, [baseOneRM, row.intensityPct, row.sets]);

  // --- Weight input "draft" so typing isn't overridden by derivation ---
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [weightDraft, setWeightDraft] = useState("");

  // Keep the visible text in sync with derived value whenever we're NOT editing
  useEffect(() => {
    if (!isEditingWeight) {
      const current = row.weight ?? derivedWeight ?? "";
      setWeightDraft(current === "" ? "" : String(current));
    }
  }, [row.weight, derivedWeight, isEditingWeight]);

  // Commit draft to state: infer 1RM from typed weight, keep weight derived (null)
  function commitWeightDraft() {
  setIsEditingWeight(false);

  const txt = weightDraft.trim();
  if (txt === "") {
    // cleared -> go back to derived
    onChange({ ...row, weight: null });
    return;
  }

  const w = Number(txt);
  if (Number.isFinite(w) && w > 0) {
    const inferred = estimate1RMFromWeight({
      weight: w,
      intensityPct: row.intensityPct,
      sets: row.sets,
    });
    if (Number.isFinite(inferred)) {
      // ⬅️ persist to global store so all contexts see the updated 1RM
      setKnown1RM(row.liftId, Math.round(inferred));
    }
    // keep weight derived (null), but carry the new 1RM in-row too
    onChange({ ...row, orm: inferred ?? row.orm ?? null, weight: null });
  }
}


  // Any change that should make weight re-derive uses this helper
  function applyRecalcWeight(patch = {}) {
    onChange({ ...row, ...patch, weight: null });
  }

  const minutes = estimateExerciseMinutes({
    liftId: row.liftId,
    sets: row.sets,
    intensityPct: row.intensityPct,
    weight: row.weight,
    orm: row.orm ?? localOrm,
  });

  return (
    <div style={{ border: "1px solid #e3e3e3", borderRadius: 12, padding: 12, marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {withCheckbox && (
            <input
              type="checkbox"
              checked={!!checked}
              onChange={(e) => onToggleCheck?.(e.target.checked)}
            />
          )}
          <div style={{ fontWeight: 600 }}>{lift?.name || row.liftId}</div>
        </div>
        <button onClick={onRemove} aria-label="remove">✕</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: 8,
          marginTop: 10,
        }}
      >
        {/* Sets */}
        <label style={{ fontSize: 12 }}>
          <div>Sets</div>
          <input
            type="number"
            min="1"
            value={row.sets ?? 1}
            onChange={(e) => {
              const sets = Number(e.target.value) || 1;
              applyRecalcWeight({ sets });
            }}
          />
        </label>

        {/* Reps */}
        <label style={{ fontSize: 12 }}>
          <div>Reps</div>
          <input
            type="number"
            min="1"
            value={row.reps ?? 1}
            onChange={(e) => onChange({ ...row, reps: +e.target.value })}
          />
        </label>

        {/* Intensity */}
        <label style={{ display: "grid", gap: 4 }}>
          <div>Intensity %</div>
          <input
            type="number"
            step="1"
            value={row.intensityPct ?? ""}
            onChange={(e) => {
              const intensityPct = Number.isFinite(+e.target.value) ? +e.target.value : null;
              applyRecalcWeight({ intensityPct });
            }}
            style={{ width: 100 }}
          />
        </label>

        {/* Weight — uses local draft while editing */}
        <label style={{ fontSize: 12 }}>
          <div>Weight</div>
          <input
            type="number"
            step="5"
            placeholder="e.g. 225"
            value={weightDraft}
            onFocus={() => {
              setIsEditingWeight(true);
              setWeightDraft(String(row.weight ?? derivedWeight ?? ""));
            }}
            onChange={(e) => setWeightDraft(e.target.value)}
            onBlur={commitWeightDraft}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur(); // triggers onBlur -> commit
            }}
          />
        </label>
        {/* 1RM (manual) */}
        <label style={{ fontSize: 12 }}>
          <div>1RM (manual)</div>
          <input
            type="number"
            placeholder="optional"
            value={row.orm ?? ""}
            onChange={(e) => {
              const nextOrm = e.target.value === "" ? null : +e.target.value;
              applyRecalcWeight({ orm: nextOrm });
                 if (Number.isFinite(nextOrm) && nextOrm > 0) {
               setKnown1RM(row.liftId, Math.round(nextOrm));
                 }
            }}
          />
        </label>

        {/* Time & e1RM readouts */}
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

  useEffect(() => {
    setRows(value || []);
  }, [value]);

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
      weight: knownOrm ? Math.round((knownOrm * 0.75) / 5) * 5 : null,
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

      {rows.map((r, i) => (
        <ExerciseCard
          key={i}
          row={r}
          onChange={(updated) => {
            const next = rows.slice();
            next[i] = updated;
            commit(next);
          }}
          onRemove={() => removeAt(i)}
          withCheckbox={Array.isArray(successMarks)}
          checked={successMarks?.[i] || false}
          onToggleCheck={(val) => onToggleSuccess?.(i, val)}
        />
      ))}
    </section>
  );
}
