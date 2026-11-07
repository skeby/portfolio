"use client";

import { cn } from "@/lib/utils";
import { NARROW_QUERY, useMediaQuery } from "@/lib/use-media-query";
import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  Ref,
  useEffect,
  useRef,
} from "react";
import { Cell, dayAt, GridData, monthLabel, ROWS } from "./shared";

/** Weeks per row when the year is stacked on narrow screens. */
const NARROW_BLOCK = 18;

/** Index of the grid cell under a pointer, or -1. Works during touch drags too. */
export const cellIndexAt = (x: number, y: number) => {
  const el = document.elementFromPoint(x, y);
  const cell = el instanceof HTMLElement ? el.closest("[data-i]") : null;
  return cell instanceof HTMLElement ? Number(cell.dataset.i) : -1;
};

/** The rendered cell element for index k inside a grid wrapper. */
export const cellElement = (root: HTMLElement | null, k: number) =>
  root?.querySelector<HTMLElement>(`[data-i="${k}"]`) ?? null;

type GridProps = {
  data: GridData;
  cells: Cell[];
  label: string;
  className?: string;
  gridRef?: Ref<HTMLDivElement>;
  /** Show padding cells as empty squares (game modes play on them). */
  showPads?: boolean;
  /** Render only these weeks: [first, last) column. Defaults to the whole year. */
  weekRange?: [number, number];
  footer?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "className">;

/**
 * Month labels and the 7-row contribution grid. On wide screens the year is
 * one row (scrolling sideways if needed); on narrow screens it is stacked into
 * rows of about 18 weeks so the whole year fits.
 */
const Grid = ({
  data,
  cells,
  label,
  className,
  gridRef,
  showPads,
  weekRange,
  footer,
  ...gridProps
}: GridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const narrow = useMediaQuery(NARROW_QUERY);
  const [from, to] = weekRange ?? [0, data.weeks];
  const span = to - from;

  const blocks: [number, number][] = [];
  if (narrow && span > NARROW_BLOCK) {
    const count = Math.ceil(span / NARROW_BLOCK);
    const size = Math.ceil(span / count);
    for (let b = from; b < to; b += size)
      blocks.push([b, Math.min(to, b + size)]);
  } else blocks.push([from, to]);

  // Start at the most recent weeks if the row scrolls.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [narrow]);

  return (
    <>
      <div ref={scrollRef} className="b-ghscroll">
        <div
          ref={gridRef}
          className={cn("b-ghblocks", className)}
          role="img"
          aria-label={label}
          {...gridProps}
        >
          {blocks.map(([b0, b1]) => {
            const months = data.months.filter(
              (m) => m.week >= b0 && m.week < b1,
            );
            // Label where a stacked row starts mid-month.
            const first = dayAt(data, Math.max(b0 * ROWS, data.lead));
            const startLabel =
              first && !months.some((m) => m.week - b0 < 3)
                ? monthLabel(first.date)
                : null;
            return (
              <div
                key={b0}
                className="b-ghinner"
                style={{ "--weeks": b1 - b0 } as CSSProperties}
              >
                <div className="b-ghmonths" aria-hidden="true">
                  {startLabel && (
                    <span style={{ gridColumn: "1 / span 3" }}>
                      {startLabel}
                    </span>
                  )}
                  {months.map((m) => (
                    <span
                      key={`${m.label}-${m.week}`}
                      style={{ gridColumn: `${m.week - b0 + 1} / span 4` }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>
                <div className="b-ghgrid">
                  {cells.slice(b0 * ROWS, b1 * ROWS).map((c, j) => {
                    const k = b0 * ROWS + j;
                    return (
                      <i
                        key={k}
                        data-i={k}
                        data-l={c.l < 0 ? (showPads ? 0 : undefined) : c.l}
                        data-k={c.k}
                        className={c.l < 0 && !showPads ? "pad" : undefined}
                        title={c.t}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {footer}
    </>
  );
};

export default Grid;
