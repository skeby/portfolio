export type Day = { date: string; count: number };

export type GridData = {
  days: Day[];
  /** Empty cells before the first day so it lands on its weekday row. */
  lead: number;
  weeks: number;
  months: { label: string; week: number }[];
  total: number;
};

/** l: shade 0–4, or -1 for an empty padding cell. k: a mode-specific state. */
export type Cell = { l: number; k?: string; t?: string };

export const ROWS = 7;

// Steps follow typical daily counts rather than GitHub's quartiles, which one
// very busy day can flatten.
export const level = (n: number) =>
  n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 8 ? 3 : 4;

export const cellCount = (d: GridData) => d.weeks * ROWS;

export const dayAt = (d: GridData, k: number): Day | undefined =>
  d.days[k - d.lead];

export const colOf = (k: number) => Math.floor(k / ROWS);
export const rowOf = (k: number) => k % ROWS;

export const baseLevels = (d: GridData) =>
  Array.from({ length: cellCount(d) }, (_, k) => {
    const day = dayAt(d, k);
    return day ? level(day.count) : -1;
  });

// Built by hand so months read "Sep", not en-GB's "Sept".
const weekdayFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC",
});
const monthShortFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const toDate = (date: string) => new Date(`${date}T00:00:00Z`);

/** "6 Jul 2026" */
export const formatDate = (date: string) => {
  const d = toDate(date);
  return `${d.getUTCDate()} ${monthShortFormat.format(d)} ${d.getUTCFullYear()}`;
};

/** "Mon, 6 Jul 2026" */
export const formatDay = (date: string) =>
  `${weekdayFormat.format(toDate(date))}, ${formatDate(date)}`;

/** "6 Feb 2026 – 11 Sep 2026" */
export const formatRange = (from: string, to: string) =>
  `${formatDate(from)} – ${formatDate(to)}`;

export const plural = (n: number, word: string) =>
  `${n.toLocaleString("en-US")} ${word}${n === 1 ? "" : "s"}`;

export const titleFor = (day: Day) =>
  `${plural(day.count, "contribution")} · ${formatDay(day.date)}`;

/** The real graph: shade per day, native tooltip per cell. */
export const graphCells = (d: GridData): Cell[] =>
  Array.from({ length: cellCount(d) }, (_, k) => {
    const day = dayAt(d, k);
    return day ? { l: level(day.count), t: titleFor(day) } : { l: -1 };
  });
