"use client";

import { ReactNode, useEffect } from "react";
import useBlobity from "blobity/lib/react/useBlobity";
import { blobityConfig } from "@/static";

const Providers = ({ children }: { children: ReactNode }) => {
  const blobity = useBlobity(blobityConfig);

  useEffect(() => {
    if (blobity.current) {
      // @ts-ignore for debugging purposes or playing around
      window.blobity = blobity.current;

      // Fix deprecated API: Blobity sets overflow: visible on its canvas,
      // which is deprecated for canvas elements. Override to 'clip'.
      const canvas = document.querySelector(
        'canvas[style*="overflow: visible"]',
      ) as HTMLCanvasElement | null;
      if (canvas) {
        canvas.style.overflow = "clip";
      }
    }
  }, [blobity]);

  // Match the blob's corners to whatever element it wraps. The blob is the
  // element's box grown by the focus offset on each side, so its radius is the
  // element's own radius plus that offset (capped at a full pill). Runs in the
  // capture phase so the attribute is set before Blobity's own mouseover reads it.
  //
  // It also marks the wrapped element with data-blob-on, which drops the
  // element's outline and hard shadow (see globals.css). Inverting a flat
  // shape reads cleanly; inverting an outlined sticker gives a double edge.
  useEffect(() => {
    const selector = blobityConfig.focusableElements;
    if (!selector) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let current: HTMLElement | null = null;
    const release = () => {
      current?.removeAttribute("data-blob-on");
      current = null;
    };
    const onOut = (event: MouseEvent) => {
      const next = event.relatedTarget as Node | null;
      if (current && !(next && current.contains(next))) release();
    };
    const syncRadius = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest?.(selector);
      if (!(el instanceof HTMLElement)) return;
      if (finePointer.matches && el !== current) {
        release();
        current = el;
        el.setAttribute("data-blob-on", "");
      }
      const box = el.getBoundingClientRect();
      const offsetX = Number(
        el.dataset.blobityOffsetX ??
          blobityConfig.focusableElementsOffsetX ??
          0,
      );
      const offsetY = Number(
        el.dataset.blobityOffsetY ??
          blobityConfig.focusableElementsOffsetY ??
          0,
      );
      const own = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      const pill =
        Math.min(box.width + offsetX * 2, box.height + offsetY * 2) / 2;
      el.dataset.blobityRadius = String(
        Math.min(
          Math.round(own + Math.min(offsetX, offsetY)),
          Math.floor(pill),
        ),
      );
    };
    document.addEventListener("mouseover", syncRadius, true);
    document.addEventListener("mouseout", onOut, true);
    return () => {
      document.removeEventListener("mouseover", syncRadius, true);
      document.removeEventListener("mouseout", onOut, true);
      release();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);
  return <>{children}</>;
};

export default Providers;
