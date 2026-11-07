"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Grid from "./grid";
import {
  baseLevels,
  Cell,
  cellCount,
  colOf,
  graphCells,
  GridData,
  plural,
  rowOf,
  ROWS,
} from "./shared";

const TICK_MS = 140;

/**
 * Conway's Game of Life seeded from the real year: days with 3+
 * contributions start alive. The grid wraps at the edges.
 */
const Life = ({ data }: { data: GridData }) => {
  const size = cellCount(data);
  const seed = useMemo(() => baseLevels(data).map((l) => l >= 2), [data]);
  const [alive, setAlive] = useState<boolean[]>(seed);
  const [prev, setPrev] = useState<boolean[] | null>(null);
  const [gen, setGen] = useState(0);
  const [running, setRunning] = useState(false);
  const [settled, setSettled] = useState(false);
  const history = useRef<string[]>([]);
  // Mirror of `alive` so the interval always steps from the latest generation.
  const aliveRef = useRef(alive);
  aliveRef.current = alive;

  const step = useCallback(() => {
    const cur = aliveRef.current;
    const next = cur.map((isAlive, k) => {
      const c = colOf(k);
      const r = rowOf(k);
      let n = 0;
      for (let dc = -1; dc <= 1; dc++)
        for (let dr = -1; dr <= 1; dr++) {
          if (!dc && !dr) continue;
          const cc = (c + dc + data.weeks) % data.weeks;
          const rr = (r + dr + ROWS) % ROWS;
          if (cur[cc * ROWS + rr]) n++;
        }
      return isAlive ? n === 2 || n === 3 : n === 3;
    });
    // Stop once the pattern is still or flips between two states.
    const key = next.map((b) => (b ? 1 : 0)).join("");
    if (history.current.includes(key)) {
      setRunning(false);
      setSettled(true);
    }
    history.current = [...history.current.slice(-1), key];
    aliveRef.current = next;
    setPrev(cur);
    setAlive(next);
    setGen((g) => g + 1);
  }, [data.weeks]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(step, TICK_MS);
    return () => window.clearInterval(id);
  }, [running, step]);

  const reset = () => {
    setRunning(false);
    setSettled(false);
    setAlive(seed);
    setPrev(null);
    setGen(0);
    history.current = [];
  };

  const count = alive.filter(Boolean).length;
  const cells: Cell[] =
    gen === 0
      ? graphCells(data)
      : Array.from({ length: size }, (_, k) =>
          alive[k]
            ? { l: 4, k: "alive" }
            : prev?.[k]
              ? { l: 1, k: "trail" }
              : { l: 0 },
        );

  return (
    <Grid
      data={data}
      cells={cells}
      showPads={gen > 0}
      label={`Game of Life on the contribution grid, generation ${gen}`}
      footer={
        <div className="b-ghbar">
          <span aria-live="polite">
            {gen === 0
              ? "Days with 3+ contributions start alive."
              : settled
                ? `Settled at generation ${gen} · ${plural(count, "cell")} alive`
                : `Generation ${gen} · ${plural(count, "cell")} alive`}
          </span>
          <div className="b-ghbtns">
            <button
              type="button"
              className="b-ghbtn primary"
              onClick={() => (settled ? reset() : setRunning((r) => !r))}
            >
              {running ? "Pause" : settled ? "Restart" : "Play"}
            </button>
            <button
              type="button"
              className="b-ghbtn"
              onClick={step}
              disabled={running || settled}
            >
              Step
            </button>
            <button
              type="button"
              className="b-ghbtn"
              onClick={reset}
              disabled={gen === 0}
            >
              Reset
            </button>
          </div>
        </div>
      }
    />
  );
};

export default Life;
