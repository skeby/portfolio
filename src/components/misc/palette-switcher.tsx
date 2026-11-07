"use client";

import { DEFAULT_PALETTE, PALETTE_STORAGE_KEY, palettes } from "@/static";
import { PaletteId } from "@/types";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { LuCheck, LuPalette } from "react-icons/lu";

const isPalette = (v: unknown): v is PaletteId =>
  palettes.some((p) => p.id === v);

const swatchStyle = (id: PaletteId) => {
  const [a, b] = palettes.find((p) => p.id === id)!.swatch;
  return { "--sw-a": a, "--sw-b": b } as CSSProperties;
};

/**
 * Colour palette menu in the navbar. The choice is stored in localStorage and
 * applied before first paint by the inline script in app/layout.tsx.
 */
const PaletteSwitcher = () => {
  const [active, setActive] = useState<PaletteId>(DEFAULT_PALETTE);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const current = document.documentElement.dataset.palette;
    if (isPalette(current)) setActive(current);
  }, []);

  // Close on outside click; focus the current option when the menu opens.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    itemRefs.current[palettes.findIndex((p) => p.id === active)]?.focus();
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const apply = (id: PaletteId) => {
    setActive(id);
    setOpen(false);
    document.documentElement.dataset.palette = id;
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, id);
    } catch {}
  };

  // The new palette is revealed through a circle that grows out of the
  // clicked option, softening from a slight blur (View Transitions API).
  const choose = (id: PaletteId, event: MouseEvent<HTMLButtonElement>) => {
    if (id === active) {
      setOpen(false);
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!document.startViewTransition || reduced) {
      apply(id);
      return;
    }
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const transition = document.startViewTransition(() =>
      flushSync(() => apply(id)),
    );
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
            filter: ["blur(4px)", "blur(0px)"],
          },
          {
            duration: 500,
            easing: "ease-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    const step = { ArrowDown: 1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const i = itemRefs.current.findIndex((el) => el === document.activeElement);
    const next = (i + step + palettes.length) % palettes.length;
    itemRefs.current[next]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="b-palette" ref={rootRef}>
        <button
          ref={triggerRef}
          type="button"
          className="b-palette-trigger"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Change colour palette"
          title="Change colour palette"
          onClick={() => setOpen((o) => !o)}
        >
          <LuPalette aria-hidden="true" size={17} />
          <span className="b-swatch" style={swatchStyle(active)} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="b-palette-menu"
              role="menu"
              aria-label="Colour palette"
              onKeyDown={onMenuKeyDown}
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <p className="b-palette-title">Colour palette</p>
              {palettes.map((p, i) => (
                <button
                  key={p.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active === p.id}
                  onClick={(e) => choose(p.id, e)}
                >
                  <span className="b-swatch" style={swatchStyle(p.id)} />
                  <span className="b-palette-name">{p.name}</span>
                  {active === p.id && (
                    <LuCheck aria-hidden="true" className="b-palette-check" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

export default PaletteSwitcher;
