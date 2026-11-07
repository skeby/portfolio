import { Palette, PaletteId, Project } from "@/types";
import { Options as BlobityOptions } from "blobity/lib/Blobity";
import { Variants } from "motion/react";

export const APP_NAME = "Adeyinka Akinsanya";
// The primary domain on Vercel (the bare domain redirects here). Link previews
// must point straight at it: WhatsApp won't follow a redirect to the image.
export const APP_URL = "https://www.adeyinkaakinsanya.com";
export const SITE_DESCRIPTION =
  "Software engineer and frontend developer, currently available for work. Projects include Checkmeout, AstroPay and AdaptLearn.";
export const ADEYINKA_EMAIL = "akinsanyaadeyinka4166@gmail.com";
export const ADEYINKA_CAL_URL = "https://cal.com/adeyinka/website";
export const ADEYINKA_GITHUB_URL = "https://github.com/skeby";
export const ADEYINKA_LINKEDIN_URL =
  "https://ng.linkedin.com/in/adeyinka-akinsanya-171a4532a";
export const ADEYINKA_TELEGRAM_URL = "https://t.me/staticusername";
export const ADEYINKA_RESUME_URL =
  "https://drive.google.com/file/d/1E0RnAwpz2KiZWyKcYoAuBJgSlXOSIVZv/preview";
export const GITHUB_USERNAME = "skeby";
export const MONKEYTYPE_USERNAME = "skeby";
export const MONKEYTYPE_PROFILE_URL = `https://monkeytype.com/profile/${MONKEYTYPE_USERNAME}`;

export const blobityConfig: Partial<BlobityOptions> = {
  licenseKey: "opensource",
  focusableElementsOffsetX: 5,
  focusableElementsOffsetY: 5,
  color: "#e4e4e4",
  dotColor: "#0e1016",
  invert: true,
  focusableElements:
    "[data-blobity]:not(.checkmeout-popup *), a:not([data-no-blobity]):not(.checkmeout-popup *), li:not([data-no-blobity]):not(.checkmeout-popup *), button:not([data-no-blobity]):not(.checkmeout-trigger):not(.checkmeout-popup *), [data-blobity-tooltip]:not(.checkmeout-popup *)",
  font: "'Syne','Source Sans Pro',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
  fontSize: 16,
  fontWeight: 500,
  opacity: 1,
  fontColor: "#0e1016",
  zIndex: 100,
  size: 40,
  radius: 4,
  magnetic: true,
};

export const animation: { [key: string]: Variants } = {
  image: {
    initial: {
      y: 50,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: "0em",
      transition: {
        delay: 0.5,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  },
  word: {
    initial: {
      opacity: 0,
      y: 150,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
        duration: 1,
      },
    },
  },
  word2: {
    initial: {
      opacity: 0,
      y: 150,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        // delay: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
        duration: 1,
      },
    },
  },
  body: {
    initial: {
      opacity: 0,
      y: "1em",
    },
    animate: {
      opacity: 1,
      y: "0em",
      transition: {
        delay: 1,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  },
  staggerChildren: {
    animate: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1,
      },
    },
  },
  character: {
    hidden: {
      opacity: 0,
      y: "0.25em",
    },
    visible: {
      opacity: 1,
      y: "0em",
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  },
};

export const projects: Project[] = [
  {
    title: "Checkmeout",
    description: "Your buy me a coffee. Your link in bio. All in one place.",
    live: "https://checkmeout.me",
  },
  {
    title: "AstroPay",
    description:
      "Spend-limited wallets for AI agents. Fund a wallet, set budgets, connect any MCP agent, and approve every payment it makes.",
    live: "https://astropay.checkmeout.me",
  },
  {
    title: "Portfolio",
    description: "A personal portfolio showcasing projects and skills.",
    live: "https://adeyinkaakinsanya.com",
    github: "https://github.com/skeby/portfolio",
  },
  {
    title: "AdaptLearn",
    description:
      "An adaptive learning platform for learning data structure concepts.",
    live: "https://learn.adeyinkaakinsanya.com",
    github: "https://github.com/skeby/fyp",
  },
  {
    title: "Brillare Inc",
    description:
      "Site for a software automation company whose flagship product, Unoye, automates internal business operations.",
    live: "https://www.brillareinc.com",
  },
  {
    title: "Unoye",
    description:
      "An ERP that helps companies optimize resources by automating internal operations.",
    live: "https://www.unoye.com",
  },
  {
    title: "P@ssword",
    description:
      "An AI-powered password strength checker that uses an XGBoost model to rate passwords and recommend improvements.",
    live: "https://password.adeyinkaakinsanya.com",
  },
  {
    title: "Liveness",
    description:
      "Liveness detection for identity verification, inspired by OPay's liveness check.",
    live: "https://liveness.adeyinkaakinsanya.com",
  },
];

/** Skills from the résumé, shown in the scrolling ticker. */
export const skills = [
  "TypeScript",
  "JavaScript",
  "Python",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "Express.js",
  "Flask",
  "Redux Toolkit",
  "TanStack Query",
  "Tailwind CSS",
  "ShadCN",
  "Framer Motion",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "GCP",
  "Git",
  "Jest",
  "Vitest",
  "Figma",
];

/**
 * Colour palettes visitors can switch between from the navbar.
 * Tokens live in app/globals.css under :root[data-palette="…"].
 * `swatch` is the two colours shown in the switcher dot.
 */
export const palettes: Palette[] = [
  { id: "black", name: "Black", swatch: ["#000000", "#E4E4E4"] },
  { id: "charcoal", name: "Charcoal", swatch: ["#161618", "#8E8E93"] },
  { id: "hint", name: "Black with blue", swatch: ["#000000", "#6F95FF"] },
];
export const DEFAULT_PALETTE: PaletteId = "black";
export const PALETTE_STORAGE_KEY = "palette";
