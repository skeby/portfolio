"use client";

import { cn } from "@/lib/utils";
import { projects } from "@/static";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type View = "cards" | "panels";
const VIEWS: { id: View; label: string }[] = [
  { id: "cards", label: "Cards" },
  { id: "panels", label: "Panels" },
];
const VIEW_STORAGE_KEY = "project-view";

const SHADOWS = ["var(--accent)", "var(--a2)", "var(--a3)"];
const TILT = ["-1.2deg", "0.9deg", "-0.5deg", "1.2deg"];
const EASE = [0.2, 0.65, 0.3, 0.9] as const;

const host = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const Projects = () => {
  const [view, setView] = useState<View>("cards");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VIEW_STORAGE_KEY);
      if (saved === "cards" || saved === "panels") setView(saved);
    } catch {}
  }, []);

  const choose = (v: View) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, v);
    } catch {}
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="wrap b-work" id="work">
        <div className="b-headrow">
          <h2 className="site-h2">Things I&apos;ve built</h2>
          <div className="b-view" role="group" aria-label="Project layout">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={view === v.id}
                onClick={() => choose(v.id)}
              >
                {view === v.id && (
                  <motion.span
                    layoutId="project-view-pill"
                    className="b-view-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="b-view-label">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {view === "cards" ? <Cards /> : <Panels />}
          </motion.div>
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
};

const Cards = () => {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  // Touch screens have no hover, so a tap flips the card instead.
  const onCardClick = (i: number) => (e: MouseEvent) => {
    if ((e.target as Element).closest("a")) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="b-cards">
      {projects.map((p, i) => (
        <motion.article
          key={p.title}
          className={cn("b-card", flipped.has(i) && "flipped")}
          style={
            {
              "--sh": SHADOWS[i % SHADOWS.length],
              "--r": TILT[i % TILT.length],
            } as CSSProperties
          }
          onClick={onCardClick(i)}
          // Opacity only: a motion transform would override the CSS tilt.
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
        >
          <div className="b-inner">
            <div className="b-face b-front">
              <h3>{p.title}</h3>
              <div className="b-cap">
                <span className="b-host">{host(p.live)}</span>
                <span className="b-hint" aria-hidden="true">
                  <span className="h">Hover ↻</span>
                  <span className="t">Tap ↻</span>
                </span>
              </div>
            </div>
            <div className="b-face b-back">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <a
                className="b-go"
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                {host(p.live)} ↗
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

/**
 * Accordion of vertical strips. The open strip's progress bar is a CSS
 * animation; when it ends the next strip opens. Hovering, focusing or
 * scrolling away pauses the bar, which pauses the sequence with it.
 */
const Panels = () => {
  const [current, setCurrent] = useState(0);
  const [offscreen, setOffscreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fixed content width so text doesn't reflow while a strip opens or closes.
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth - (projects.length - 1) * 72 - 4;
      el.style.setProperty("--open-w", `${Math.max(w, 0)}px`);
    });
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const onKeyDown = (i: number) => (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
      e.key
    ];
    if (!step) return;
    e.preventDefault();
    items.current[(i + step + projects.length) % projects.length]?.focus();
  };

  return (
    <div
      ref={ref}
      className={cn("b-panels", offscreen && "offscreen")}
      onAnimationEnd={(e) => {
        if (e.animationName === "b-prog")
          setCurrent((c) => (c + 1) % projects.length);
      }}
    >
      {projects.map((p, i) => (
        <article
          key={p.title}
          ref={(el) => {
            items.current[i] = el;
          }}
          className={cn("b-panel", i === current && "on")}
          style={{ "--sh": SHADOWS[i % SHADOWS.length] } as CSSProperties}
          tabIndex={0}
          aria-label={p.title}
          onFocus={() => setCurrent(i)}
          onClick={(e) => {
            if (!(e.target as Element).closest("a")) setCurrent(i);
          }}
          onKeyDown={onKeyDown(i)}
        >
          <span className="b-pv" aria-hidden="true">
            {p.title}
          </span>
          <span className="b-pi" aria-hidden="true">
            {p.title[0]}
          </span>
          <span className="b-prog" aria-hidden="true" />
          <div className="b-pc">
            <h3>{p.title}</h3>
            <div className="b-pfoot">
              <p>{p.description}</p>
              <a href={p.live} target="_blank" rel="noopener noreferrer">
                {host(p.live)} ↗
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Projects;
