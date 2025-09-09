// src/utils/weights.ts
export function wEffort(RIR: number): number {
  // 0–1 RIR = 1.0, 2 = 0.9, 3 = 0.75, 4 = 0.5, >=5 = 0.2
  if (RIR <= 1) return 1.0;
  if (RIR === 2) return 0.9;
  if (RIR === 3) return 0.75;
  if (RIR === 4) return 0.5;
  return 0.2;
}

export function wHyp(reps: number): number {
  // peak around 9–12
  if (reps >= 9 && reps <= 12) return 1.0;
  if (reps >= 6 && reps <= 8)  return 0.9;
  if (reps >= 13 && reps <= 15) return 0.7;
  if (reps >= 16 && reps <= 20) return 0.5;
  if (reps >= 3 && reps <= 5)  return 0.6;
  return 0.3; // very low reps or very high reps
}
