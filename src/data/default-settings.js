// src/data/heatmap-key.js
// Weekly % change per muscle region (per week), by set bucket & color.
export const HEATMAP_KEY = [
  { color: "#3b82f6", name: "blue",   pct: [-0.6,  0.2],  label: "Loss → Maint / Small Gains" },
  { color: "#22c55e", name: "green",  pct: [-0.1,  0.5],  label: "Threshold: Maint → Gains" },
  { color: "#eab308", name: "yellow", pct: [ 0.2,  0.9],  label: "Maintenance → Gains" },
  { color: "#f97316", name: "orange", pct: [ 0.4,  1.2],  label: "Sweet-Spot Gains" },
  { color: "#ef4444", name: "red",    pct: [ 0.5,  1.4],  label: "Diminishing Returns (↑ total)" },
  { color: "#a855f7", name: "purple", pct: [ 0.6,  1.6],  label: "Hard Diminishing (↑ total)" },
];

export function formatPctRange([lo, hi]) {
  const fmt = (v) => `${v >= 0 ? "+" : ""}${Number(v).toFixed(1)}%`;
  return `${fmt(lo)} – ${fmt(hi)} / wk`;
}
