"use client";

import {
  NARROW_QUERY,
  TOUCH_QUERY,
  useMediaQuery,
} from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import Grid, { cellElement } from "./grid";
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
const NARROW_TICK_MS = 150;
/** Board width on phones: the latest weeks, sized to fit the screen. */
const NARROW_BOARD_WEEKS = 18;
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
const PAD: { label: string; dir: Dir; area: string }[] = [
  { label: "Up", dir: [0, -1], area: "up" },
  { label: "Left", dir: [-1, 0], area: "left" },
  { label: "Down", dir: [0, 1], area: "down" },
  { label: "Right", dir: [1, 0], area: "right" },
];
const ARROWS: Record<string, string> = {
  up: "↑",
  left: "←",
  down: "↓",
  right: "→",
};

type Status = "idle" | "playing" | "over" | "won";

/**
 * Snake on the contribution grid. Contribution days are the food: busier
 * days score more. The board wraps at the edges; running into yourself ends
 * it. On phones the board is the latest 18 weeks, with swipes and an arrow pad.
 */
const Snake = ({ data }: { data: GridData }) => {
  const narrow = useMediaQuery(NARROW_QUERY);
  const touch = useMediaQuery(TOUCH_QUERY);
  const size = cellCount(data);
  const gridRef = useRef<HTMLDivElement>(null);
  const board = useRef({ weeks: data.weeks, offset: 0 });
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

  // Board column/row -> grid index, wrapping at the edges.
  const at = (c: number, r: number) => {
    const { weeks, offset } = board.current;
    return (
      (offset + (((c % weeks) + weeks) % weeks)) * ROWS +
      (((r % ROWS) + ROWS) % ROWS)
    );
  };
  const boardCol = (k: number) => colOf(k) - board.current.offset;

  const start = () => {
    const weeks = narrow
      ? Math.min(NARROW_BOARD_WEEKS, data.weeks)
      : data.weeks;
    board.current = { weeks, offset: data.weeks - weeks };
    snake.current = [at(2, 3), at(3, 3), at(4, 3)];
    food.current = baseLevels(data).map((l, k) =>
      colOf(k) >= board.current.offset ? Math.max(l, 0) : 0,
    );
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
    let points = 0;
    const id = window.setInterval(
      () => {
        const next = queued.current.shift();
        if (next) dir.current = next;
        const body = snake.current;
        const head = body[body.length - 1];
        const nh = at(
          boardCol(head) + dir.current[0],
          rowOf(head) + dir.current[1],
        );
        const tailMoves = grow.current === 0;
        if (body.slice(tailMoves ? 1 : 0).includes(nh)) {
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
        // Keep the head in view when the board scrolls sideways.
        const scroller = gridRef.current?.closest(".b-ghscroll");
        const cell = cellElement(gridRef.current, nh);
        if (scroller && cell) {
          const s = scroller.getBoundingClientRect();
          const c = cell.getBoundingClientRect();
          if (c.left < s.left + 24 || c.right > s.right - 24)
            scroller.scrollLeft += c.left - (s.left + s.width / 2);
        }
        setFrame((f) => f + 1);
      },
      board.current.weeks < data.weeks ? NARROW_TICK_MS : TICK_MS,
    );
    return () => window.clearInterval(id);
    // at/boardCol read refs; the board is fixed for the life of a game.
  }, [status, finish, data.weeks]);

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
  // Steer as soon as a swipe is long enough, not only on release.
  const onPointerMove = (e: PointerEvent) => {
    const s = swipe.current;
    if (!s || status !== "playing") return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 16) return;
    turn(Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx), 0] : [0, Math.sign(dy)]);
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const endSwipe = () => {
    swipe.current = null;
  };

  const inGame = status !== "idle";
  let cells: Cell[];
  if (!inGame) cells = graphCells(data);
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
  const { weeks, offset } = board.current;

  return (
    <Grid
      data={data}
      cells={cells}
      gridRef={gridRef}
      showPads={inGame}
      weekRange={inGame ? [offset, offset + weeks] : undefined}
      className={cn(status === "playing" && "playing")}
      label="Snake game on the contribution grid"
      tabIndex={status === "playing" ? 0 : -1}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endSwipe}
      onPointerCancel={endSwipe}
      footer={
        <>
          <div className="b-ghbar">
            <span aria-live="polite">
              {status === "idle"
                ? narrow
                  ? "Eat your recent contribution days. Busier days score more."
                  : "Eat your contribution days. Busier days score more."
                : status === "over"
                  ? `Game over · score ${score}`
                  : status === "won"
                    ? `You ate the whole board · score ${score}`
                    : touch
                      ? `Score ${score} · swipe the grid or use the arrows`
                      : `Score ${score} · arrow keys or WASD`}
              {best > 0 && ` · best ${best}`}
            </span>
            <div className="b-ghbtns">
              {status !== "playing" ? (
                <button
                  type="button"
                  className="b-ghbtn primary"
                  onClick={start}
                >
                  {status === "idle" ? "Play" : "Play again"}
                </button>
              ) : (
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
          {touch && status === "playing" && (
            <div className="b-dpad" role="group" aria-label="Steer">
              {PAD.map((p) => (
                <button
                  key={p.area}
                  type="button"
                  className="b-ghbtn"
                  style={{ gridArea: p.area }}
                  aria-label={p.label}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    turn(p.dir);
                  }}
                >
                  {ARROWS[p.area]}
                </button>
              ))}
            </div>
          )}
        </>
      }
    />
  );
};

export default Snake;
