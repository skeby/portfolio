"use client";

import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import Grid from "./grid";
import {
  baseLevels,
  Cell,
  cellCount,
  colOf,
  graphCells,
  GridData,
  rowOf,
  ROWS,
} from "./shared";

type Dir = [dc: number, dr: number];
const TICK_MS = 115;
const BEST_KEY = "gh-snake-best";
const KEYS: Record<string, Dir> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0],
};

type Status = "idle" | "playing" | "over" | "won";

/**
 * Snake on the contribution grid. Contribution days are the food: busier
 * days score more. The grid wraps at the edges; running into yourself ends it.
 */
const Snake = ({ data }: { data: GridData }) => {
  const size = cellCount(data);
  const weeks = data.weeks;
  const gridRef = useRef<HTMLDivElement>(null);
  const snake = useRef<number[]>([]);
  const dir = useRef<Dir>([1, 0]);
  const queued = useRef<Dir[]>([]);
  const food = useRef<number[]>([]);
  const grow = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [, setFrame] = useState(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
    } catch {}
  }, []);

  const at = (c: number, r: number) =>
    ((c + weeks) % weeks) * ROWS + ((r + ROWS) % ROWS);

  const start = () => {
    const r = 3;
    snake.current = [at(2, r), at(3, r), at(4, r)];
    food.current = baseLevels(data).map((l) => Math.max(l, 0));
    snake.current.forEach((k) => (food.current[k] = 0));
    dir.current = [1, 0];
    queued.current = [];
    grow.current = 0;
    setScore(0);
    setStatus("playing");
    gridRef.current?.focus({ preventScroll: true });
  };

  const turn = useCallback((d: Dir) => {
    const last = queued.current.at(-1) ?? dir.current;
    // Ignore reversing straight into yourself and repeats.
    if (last[0] === -d[0] && last[1] === -d[1]) return;
    if (last[0] === d[0] && last[1] === d[1]) return;
    if (queued.current.length < 3) queued.current.push(d);
  }, []);

  const finish = useCallback((final: number, s: Status) => {
    setStatus(s);
    setBest((b) => {
      const next = Math.max(b, final);
      try {
        localStorage.setItem(BEST_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    let points = score;
    const id = window.setInterval(() => {
      const next = queued.current.shift();
      if (next) dir.current = next;
      const body = snake.current;
      const head = body[body.length - 1];
      const nh = at(colOf(head) + dir.current[0], rowOf(head) + dir.current[1]);
      const tailMoves = grow.current === 0;
      const hit = body.slice(tailMoves ? 1 : 0).includes(nh);
      if (hit) {
        window.clearInterval(id);
        finish(points, "over");
        return;
      }
      body.push(nh);
      if (food.current[nh] > 0) {
        points += food.current[nh];
        grow.current += 1;
        food.current[nh] = 0;
        setScore(points);
      }
      if (grow.current > 0) grow.current -= 1;
      else body.shift();
      if (!food.current.some((f) => f > 0)) {
        window.clearInterval(id);
        finish(points, "won");
      }
      // Keep the head in view when the grid scrolls sideways.
      const scroller = gridRef.current?.closest(".b-ghscroll");
      const cell = gridRef.current?.children[nh] as HTMLElement | undefined;
      if (scroller && cell) {
        const s = scroller.getBoundingClientRect();
        const c = cell.getBoundingClientRect();
        if (c.left < s.left + 24 || c.right > s.right - 24)
          scroller.scrollLeft += c.left - (s.left + s.width / 2);
      }
      setFrame((f) => f + 1);
    }, TICK_MS);
    return () => window.clearInterval(id);
    // at/score are stable for the life of a game
  }, [status, finish]);

  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const d = KEYS[e.key] ?? KEYS[e.key.toLowerCase()];
      if (!d) return;
      e.preventDefault();
      turn(d);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, turn]);

  const onPointerDown = (e: PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s || status !== "playing") return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    turn(Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx), 0] : [0, Math.sign(dy)]);
  };

  let cells: Cell[];
  if (status === "idle") cells = graphCells(data);
  else {
    const body = new Set(snake.current);
    const head = snake.current[snake.current.length - 1];
    cells = Array.from({ length: size }, (_, k) =>
      k === head
        ? { l: 4, k: "head" }
        : body.has(k)
          ? { l: 4, k: "snake" }
          : { l: Math.min(food.current[k], 3) },
    );
  }

  return (
    <Grid
      data={data}
      cells={cells}
      gridRef={gridRef}
      showPads={status !== "idle"}
      className={status === "playing" ? "playing" : undefined}
      label="Snake game on the contribution grid"
      tabIndex={status === "playing" ? 0 : -1}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      footer={
        <div className="b-ghbar">
          <span aria-live="polite">
            {status === "idle"
              ? "Eat your contribution days. Busier days score more."
              : status === "over"
                ? `Game over · score ${score}`
                : status === "won"
                  ? `You ate the whole year · score ${score}`
                  : `Score ${score} · arrow keys, WASD or swipe`}
            {best > 0 && ` · best ${best}`}
          </span>
          <div className="b-ghbtns">
            {status !== "playing" && (
              <button type="button" className="b-ghbtn primary" onClick={start}>
                {status === "idle" ? "Play" : "Play again"}
              </button>
            )}
            {status === "playing" && (
              <button
                type="button"
                className="b-ghbtn"
                onClick={() => finish(score, "over")}
              >
                Stop
              </button>
            )}
          </div>
        </div>
      }
    />
  );
};

export default Snake;
