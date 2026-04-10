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
        'canvas[style*="overflow: visible"]'
      ) as HTMLCanvasElement | null;
      if (canvas) {
        canvas.style.overflow = "clip";
      }
    }
  }, [blobity]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);
  return <>{children}</>;
};

export default Providers;
