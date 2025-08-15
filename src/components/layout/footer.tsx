"use client";

import { motion } from "framer-motion";
import Link from "next/dist/client/link";
import { LuArrowUp, LuHeart } from "react-icons/lu";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          {/* Brand */}
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
              <a
                href="#hero"
                className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
              >
                Home
              </a>
              <a
                href="#projects"
                className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
              >
                Contact
              </a>
              <a
                href="https://cal.com/adeyinka/website"
                target="_blank"
                className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
                rel="noreferrer"
              >
                Book a Call
              </a>
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div variants={animation}>
            <h4 className="mb-4 text-lg font-semibold text-[#e4ded7]">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="https://github.com/skeby"
                target="_blank"
                className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://ng.linkedin.com/in/adeyinka-akinsanya-171a4532a"
                target="_blank"
                className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="mailto:akinsanyaadeyinka4166@gmail.com"
                className="block text-[#e4ded7]/70 transition-colors duration-300 hover:text-[#e4ded7]"
              >
                Email
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col items-center justify-between border-t-2 border-[#e4ded7]/20 pt-8 sm:flex-row"
          variants={animation}
        >
          <div className="mb-4 flex items-center gap-2 text-[#e4ded7]/70 sm:mb-0">
            Development by{" "}
            <Link
              data-blobity-magnetic="true"
              href="https://github.com/skeby"
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
