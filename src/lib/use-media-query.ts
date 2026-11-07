"use client";

import { useSyncExternalStore } from "react";

/** Live result of a CSS media query. `serverValue` is used while rendering on the server. */
export const useMediaQuery = (query: string, serverValue = false) =>
  useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );

export const NARROW_QUERY = "(max-width: 640px)";
export const TOUCH_QUERY = "(pointer: coarse)";
