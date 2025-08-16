"use client";

import { handleScroll } from "@/lib/utils";
import {
  ADEYINKA_CAL_URL,
  ADEYINKA_EMAIL,
  ADEYINKA_GITHUB_URL,
  ADEYINKA_LINKEDIN_URL,
} from "@/static";
import { motion } from "motion/react";
import Link from "next/link";
import { LuArrowUp } from "react-icons/lu";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    {
      title: "Home",
      href: "#hero",
    },
    {
      title: "Projects",
      href: "#projects",
    },
    {
      title: "Contact",
      href: "#contact",
    },
    {
      title: "Book a Call",
      href: ADEYINKA_CAL_URL,
    },
  ];

  const connects = [
    {
      title: "GitHub",
      href: ADEYINKA_GITHUB_URL,
    },
    {
      title: "LinkedIn",
      href: ADEYINKA_LINKEDIN_URL,
    },
    {
      title: "Email",
      href: `mailto:${ADEYINKA_EMAIL}`,
    },
  ];

  const animation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <motion.footer
      initial="initial"
      animate="animate"
      className="bg-background border-t-2 border-[#e4ded7]/20 px-6 py-12 sm:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <motion.div variants={animation}>
            <h3 className="mb-4 text-2xl font-bold text-[#e4ded7]">
              Adeyinka Akinsanya
            </h3>
            <p className="leading-relaxed text-[#e4ded7]/70">
              Software Engineer & Frontend Developer passionate about creating
              exceptional digital experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={animation}>
            <h4 className="mb-4 text-lg font-semibold text-[#e4ded7]">
              Quick Links
            </h4>
            <div className="space-y-3">
              {links.map((l, index) => (
                <Link
                  key={index}
                  href={l.href}
                  onClick={
                    l.href.trim().startsWith("#") ? handleScroll : undefined
                  }
                  target={
                    l.href.trim().startsWith("#") ||
                    l.href.trim().startsWith("/") ||
                    l.href.trim().startsWith("mailto:")
                      ? undefined
                      : "_blank"
                  }
                  className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div variants={animation}>
            <h4 className="mb-4 text-lg font-semibold text-[#e4ded7]">
              Connect
            </h4>
            <div className="space-y-3">
              {connects.map((c, index) => (
                <Link
                  key={index}
                  href={c.href}
                  onClick={
                    c.href.trim().startsWith("#") ? handleScroll : undefined
                  }
                  target={
                    c.href.trim().startsWith("#") ||
                    c.href.trim().startsWith("/") ||
                    c.href.trim().startsWith("mailto:")
                      ? undefined
                      : "_blank"
                  }
                  className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
                  rel="noreferrer"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col justify-between border-t-2 border-[#e4ded7]/20 pt-8 sm:flex-row"
          variants={animation}
        >
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[#e4ded7]/70 sm:mb-0">
            Coded in{" "}
            <Link
              data-blobity-magnetic="true"
              href="https://code.visualstudio.com"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
            >
              <span>Visual Studio Code</span>
            </Link>
            and developed by{" "}
            <Link
              data-blobity-magnetic="true"
              href={ADEYINKA_GITHUB_URL}
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
            >
              <span>Adeyinka Akinsanya</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-[#e4ded7]/70">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <button
              data-blobity
              data-blobity-radius="24"
              data-blobity-magnetic="false"
              onClick={scrollToTop}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#e4ded7]/10 transition-colors duration-300 hover:bg-[#e4ded7]/20"
              aria-label="Scroll to top"
            >
              <LuArrowUp className="h-5 w-5 text-[#e4ded7] transition-colors duration-300 group-hover:text-[#e4ded7]" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
