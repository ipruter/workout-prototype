// src/utils/week.js
export function getWeekBounds(d = new Date()) {
  // Sunday 00:00 local → next Sunday 00:00
  const day = d.getDay(); // 0 = Sun
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - day);
  sunday.setHours(0, 0, 0, 0);
  const nextSunday = new Date(sunday);
  nextSunday.setDate(sunday.getDate() + 7);
  return {
    startIso: sunday.toISOString(),
    endIso: nextSunday.toISOString(),
    sunday,
    nextSunday,
  };
}

export const fmtDate = (dt) => new Date(dt).toLocaleString();
