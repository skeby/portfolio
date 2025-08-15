import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names into a single string with deduplication.
 * It uses `clsx` to combine the classes and `twMerge` to merge Tailwind CSS classes intelligently.
 *
 * @param inputs An array of class values (strings, objects, or arrays) to be combined.
 * @returns A single, deduplicated string of class names.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
