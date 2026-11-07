"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import Life from "./life";
import Ripple from "./ripple";
import { GridData } from "./shared";
import Snake from "./snake";
import Stats from "./stats";

/**
 * Temporary: every interactive mode behind tabs so one can be picked.
 * Once chosen, render that mode directly and delete the rest.
 */
const MODES = [
  { id: "graph", label: "Graph" },
  { id: "life", label: "Life" },
  { id: "snake", label: "Snake" },
  { id: "ripple", label: "Ripple" },
] as const;
type Mode = (typeof MODES)[number]["id"];

const Playground = ({ data }: { data: GridData }) => {
  const [mode, setMode] = useState<Mode>("graph");

  return (
    <MotionConfig reducedMotion="user">
      <div className="b-ghcard">
        <div className="b-ghtop">
          <p className="b-ghtotal">
            <b>{data.total.toLocaleString("en-US")}</b>contributions in the last
            year
          </p>
          <div className="b-view b-view-sm" role="group" aria-label="Grid mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={mode === m.id}
                onClick={() => setMode(m.id)}
              >
                {mode === m.id && (
                  <motion.span
                    layoutId="gh-mode-pill"
                    className="b-view-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="b-view-label">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            {mode === "graph" && <Stats data={data} />}
            {mode === "life" && <Life data={data} />}
            {mode === "snake" && <Snake data={data} />}
            {mode === "ripple" && <Ripple data={data} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

export default Playground;
