import { Project } from "@/types";
import { Options as BlobityOptions } from "blobity/lib/Blobity";
import { Variants } from "framer-motion";
import { Syne, Poppins } from "next/font/google";

export const APP_NAME = "Adeyinka Akinsanya";
export const APP_URL = "https://skeby.vercel.app";

export const blobityConfig: Partial<BlobityOptions> = {
  licenseKey: "opensource",
  focusableElementsOffsetX: 5,
  focusableElementsOffsetY: 5,
  color: "#e4ded7",
  dotColor: "#0e1016",
  invert: true,
  focusableElements:
    "[data-blobity], a:not([data-no-blobity]), h4:not([data-no-blobity]), li:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]",
  font: "'Montserrat','Source Sans Pro',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
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
        delay: 6.5,
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
        delay: 5.5,
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

export const syne = Syne({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "600", "700", "800"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "600", "700", "800"],
});

export const projects: Project[] = [
  {
    title: "AdaptLearn",
    description:
      "An adaptive learning platform for learning data structure concepts",
    urls: {
      github: "https://github.com/skeby/fyp",
      live: "https://adaptlearn.vercel.app",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "Flask",
      "Express",
      "Node.js",
    ],
  },
];
