"use client";

import { cn } from "@/lib/utils";
import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  Ref,
  useEffect,
  useRef,
} from "react";
import { Cell, GridData } from "./shared";

/** Index of the grid cell under a pointer, or -1. Works during touch drags too. */
export const cellIndexAt = (x: number, y: number) => {
  const el = document.elementFromPoint(x, y);
  const cell = el instanceof HTMLElement ? el.closest("[data-i]") : null;
  return cell instanceof HTMLElement ? Number(cell.dataset.i) : -1;
};

type GridProps = {
  data: GridData;
  cells: Cell[];
  label: string;
  className?: string;
  gridRef?: Ref<HTMLDivElement>;
  /** Show padding cells as empty squares (game modes play on them). */
  showPads?: boolean;
  footer?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "className">;

/** Horizontal scroller with month labels and the 7-row contribution grid. */
const Grid = ({
  data,
  cells,
  label,
  className,
  gridRef,
  showPads,
  footer,
  ...gridProps
}: GridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Start at the most recent weeks on narrow screens.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="b-ghscroll"
        style={{ "--weeks": data.weeks } as CSSProperties}
      >
        <div className="b-ghinner">
          <div className="b-ghmonths" aria-hidden="true">
            {data.months.map((m) => (
              <span
                key={`${m.label}-${m.week}`}
                style={{ gridColumn: `${m.week + 1} / span 4` }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div
            ref={gridRef}
            className={cn("b-ghgrid", className)}
            role="img"
            aria-label={label}
            {...gridProps}
          >
            {cells.map((c, k) => (
              <i
                key={k}
                data-i={k}
                data-l={c.l < 0 ? (showPads ? 0 : undefined) : c.l}
                data-k={c.k}
                className={c.l < 0 && !showPads ? "pad" : undefined}
                title={c.t}
              />
            ))}
          </div>
        </div>
      </div>
      {footer}
    </>
  );
};

export default Grid;
