"use client";

import { TOUCH_QUERY, useMediaQuery } from "@/lib/use-media-query";
import { PointerEvent, useRef, useState } from "react";
import Grid, { cellElement, cellIndexAt } from "./grid";
import { graphCells, GridData } from "./shared";

const EASE = "cubic-bezier(0.2, 0.65, 0.3, 0.9)";

/**
 * Tactile mode: hovering ripples nearby squares, clicking or tapping sends a
 * wave across the whole year, dragging (mouse or finger) paints squares until
 * "Clear". Waves spread by on-screen distance, so they also read correctly
 * when the year is stacked into rows on phones.
 */
const Ripple = ({ data }: { data: GridData }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const touch = useMediaQuery(TOUCH_QUERY);
  const lastHover = useRef(-1);
  const painting = useRef(false);
  const moved = useRef(false);
  const downAt = useRef(-1);
  const [painted, setPainted] = useState<Set<number>>(new Set());

  const pulse = (
    origin: number,
    reach: number,
    delayPerStep: number,
    strength: number,
  ) => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const glow = getComputedStyle(grid).getPropertyValue("--g4").trim();
    const originEl = cellElement(grid, origin);
    if (!originEl) return;
    const o = originEl.getBoundingClientRect();
    const pitch = o.width + 3;
    const ox = o.left + o.width / 2;
    const oy = o.top + o.height / 2;
    grid.querySelectorAll<HTMLElement>("[data-i]").forEach((el) => {
      if (el.classList.contains("pad")) return;
      const r = el.getBoundingClientRect();
      const d =
        Math.hypot(r.left + r.width / 2 - ox, r.top + r.height / 2 - oy) /
        pitch;
      if (d > reach) return;
      const falloff = 1 - d / (reach + 1);
      el.animate(
        [
          { transform: "scale(1)" },
          {
            transform: `scale(${1 + 0.45 * strength * falloff})`,
            backgroundColor: glow,
            offset: 0.35,
          },
          { transform: "scale(1)" },
        ],
        { duration: 520, delay: d * delayPerStep, easing: EASE },
      );
    });
  };

  const paint = (k: number) => {
    if (k < 0) return;
    setPainted((prev) => (prev.has(k) ? prev : new Set(prev).add(k)));
  };

  const onPointerMove = (e: PointerEvent) => {
    const k = cellIndexAt(e.clientX, e.clientY);
    if (painting.current) {
      // A drag starts once the pointer leaves the square it pressed.
      if (k !== downAt.current || moved.current) {
        if (!moved.current) paint(downAt.current);
        moved.current = true;
        paint(k);
      }
      return;
    }
    if (k >= 0 && k !== lastHover.current && e.pointerType === "mouse") {
      lastHover.current = k;
      pulse(k, 2, 45, 0.7);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    // Stop the drag from selecting text (month labels, the hint line).
    if (e.pointerType === "mouse") e.preventDefault();
    painting.current = true;
    moved.current = false;
    downAt.current = cellIndexAt(e.clientX, e.clientY);
  };

  const onPointerUp = (e: PointerEvent) => {
    const wasDrag = painting.current && moved.current;
    painting.current = false;
    if (wasDrag) return;
    const k = cellIndexAt(e.clientX, e.clientY);
    if (k >= 0) pulse(k, 80, 18, 1);
  };

  const cells = graphCells(data).map((c, k) =>
    painted.has(k) && c.l >= 0 ? { ...c, l: 4, k: "paint" } : c,
  );

  return (
    <Grid
      data={data}
      cells={cells}
      gridRef={gridRef}
      className="paintable"
      label="Interactive contribution grid"
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        painting.current = false;
      }}
      onPointerLeave={() => {
        painting.current = false;
        lastHover.current = -1;
      }}
      footer={
        <div className="b-ghbar">
          <span>
            {touch
              ? "Tap for a wave, drag to draw."
              : "Hover to ripple, click for a wave, drag to draw."}
          </span>
          <div className="b-ghbtns">
            <button
              type="button"
              className="b-ghbtn"
              onClick={() => setPainted(new Set())}
              disabled={painted.size === 0}
            >
              Clear
            </button>
          </div>
        </div>
      }
    />
  );
};

export default Ripple;
