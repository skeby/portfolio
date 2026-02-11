import { Project } from "@/types";
import { Options as BlobityOptions } from "blobity/lib/Blobity";
import { Variants } from "motion/react";
import { Syne, Poppins } from "next/font/google";

export const APP_NAME = "Adeyinka Akinsanya";
export const APP_URL = "https://adeyinkaakinsanya.com";
export const ADEYINKA_EMAIL = "akinsanyaadeyinka4166@gmail.com";
export const ADEYINKA_CAL_URL = "https://cal.com/adeyinka/website";
export const ADEYINKA_GITHUB_URL = "https://github.com/skeby";
export const ADEYINKA_LINKEDIN_URL =
  "https://ng.linkedin.com/in/adeyinka-akinsanya-171a4532a";
export const ADEYINKA_TELEGRAM_URL = "https://t.me/staticusername";

export const blobityConfig: Partial<BlobityOptions> = {
  licenseKey: "opensource",
  focusableElementsOffsetX: 5,
  focusableElementsOffsetY: 5,
  color: "#e4ded7",
  dotColor: "#0e1016",
  invert: true,
  focusableElements:
    "[data-blobity], a:not([data-no-blobity]), li:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]",
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
      // github: "https://github.com/skeby/fyp",
      // live: "https://adaptlearn.vercel.app",
      live: "https://learn.adeyinkaakinsanya.com",
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
  {
    title: "Hebron Bites",
    description:
      "A food delivery service for cafeteria vendors at Covenant University",
    urls: {
      live: "https://www.hebronbites.com",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shad CN",
      "Framer Motion",
    ],
  },
  {
    title: "Brillare Inc.",
    description:
      "A software automation company. Brillare owns a flagship product called Unoye, which is an ERP designed to help companies optimize resources by automating business internal operations",
    urls: {
      live: "https://www.brillareinc.com/",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shad CN",
      "Framer Motion",
    ],
  },
  {
    title: "Unoye",
    description:
      "An ERP designed to help companies optimize resources by automating business internal operations",
    urls: {
      live: "https://www.unoye.com/",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shad CN",
      "Framer Motion",
    ],
  },
  {
    title: "DevLinks",
    description: "Link sharing web app for developers",
    urls: {
      github: "https://github.com/skeby/devlinks",
      // live: "https://devlinks-skeby.vercel.app/",
      live: "https://links.adeyinkaakinsanya.com",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "Dnd Kit",
      "Firebase",
    ],
  },
  {
    title: "Portfolio",
    description:
      "A personal portfolio website showcasing my projects and skills",
    urls: {
      github: "https://github.com/skeby/portfolio",
      live: "https://adeyinkaakinsanya.com",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Blobity",
    ],
  },
];
