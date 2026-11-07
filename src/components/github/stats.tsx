"use client";

import { PointerEvent, useMemo, useState } from "react";
import Grid, { cellIndexAt } from "./grid";
import {
  colOf,
  dayAt,
  formatDay,
  formatRange,
  graphCells,
  GridData,
  plural,
} from "./shared";

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Default view: the real graph. Hovering or dragging reads out daily and
 * weekly totals; headline stats sit below.
 */
const Stats = ({ data }: { data: GridData }) => {
  const [hover, setHover] = useState(-1);

  const stats = useMemo(() => {
    const { days } = data;
    let longest = 0;
    let longestEnd = -1;
    let run = 0;
    days.forEach((d, i) => {
      run = d.count > 0 ? run + 1 : 0;
      if (run > longest) {
        longest = run;
        longestEnd = i;
      }
    });
    const longestRange =
      longest > 0
        ? formatRange(
            days[longestEnd - longest + 1].date,
            days[longestEnd].date,
          )
        : null;
    // Current streak may end yesterday if today has nothing yet.
    let current = 0;
    let i = days.length - 1;
    if (days[i]?.count === 0) i--;
    const currentEnd = i;
    while (i >= 0 && days[i].count > 0) {
      current++;
      i--;
    }
    const currentRange =
      current > 0 ? formatRange(days[i + 1].date, days[currentEnd].date) : null;
    const busiest = days.reduce((a, b) => (b.count > a.count ? b : a));
    const byMonth = new Map<string, number>();
    days.forEach((d) => {
      const m = d.date.slice(0, 7);
      byMonth.set(m, (byMonth.get(m) ?? 0) + d.count);
    });
    const [topMonth, topMonthCount] = [...byMonth].reduce((a, b) =>
      b[1] > a[1] ? b : a,
    );
    const active = days.filter((d) => d.count > 0).length;
    return {
      longest,
      longestRange,
      current,
      currentRange,
      busiest,
      topMonth: monthFormat.format(new Date(`${topMonth}-01T00:00:00Z`)),
      topMonthCount,
      active,
    };
  }, [data]);

  const weekOf = (k: number) => colOf(k);
  const weekTotal = (w: number) => {
    let sum = 0;
    for (let r = 0; r < 7; r++) sum += dayAt(data, w * 7 + r)?.count ?? 0;
    return sum;
  };

  const hoveredDay = hover >= 0 ? dayAt(data, hover) : undefined;
  const cells = graphCells(data).map((c, k) =>
    hover >= 0 && weekOf(k) === weekOf(hover)
      ? { ...c, k: k === hover ? "hover" : "week", t: undefined }
      : { ...c, t: undefined },
  );

  const track = (e: PointerEvent) =>
    setHover(cellIndexAt(e.clientX, e.clientY));

  return (
    <Grid
      data={data}
      cells={cells}
      className={hover >= 0 ? "scrub" : undefined}
      label="Contribution grid with weekly totals"
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={() => setHover(-1)}
      footer={
        <>
          <div className="b-ghbar">
            <span aria-live="polite">
              {hoveredDay
                ? `${formatDay(hoveredDay.date)} · ${plural(hoveredDay.count, "contribution")} · week total ${weekTotal(weekOf(hover))}`
                : "Hover or drag across the grid for daily and weekly totals."}
            </span>
            <div className="b-ghlegend" aria-hidden="true">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <i key={l} style={{ background: `var(--g${l})` }} />
              ))}
              <span>More</span>
            </div>
          </div>
          <div className="b-ghstats">
            <div className="b-ghstat">
              <b>{plural(stats.longest, "day")}</b>
              <span>
                Longest streak
                {stats.longestRange && ` · ${stats.longestRange}`}
              </span>
            </div>
            <div className="b-ghstat">
              <b>{plural(stats.current, "day")}</b>
              <span>
                Current streak
                {stats.currentRange && ` · ${stats.currentRange}`}
              </span>
            </div>
            <div className="b-ghstat">
              <b>{stats.busiest.count}</b>
              <span>Busiest day · {formatDay(stats.busiest.date)}</span>
            </div>
            <div className="b-ghstat">
              <b>{stats.topMonthCount.toLocaleString("en-US")}</b>
              <span>Busiest month · {stats.topMonth}</span>
            </div>
            <div className="b-ghstat">
              <b>{stats.active}</b>
              <span>Active days this year</span>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Stats;
