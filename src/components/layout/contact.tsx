"use client";

import { motion } from "motion/react";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import Link from "next/link";
import { handleScroll } from "@/lib/utils";
import {
  ADEYINKA_CAL_URL,
  ADEYINKA_EMAIL,
  ADEYINKA_GITHUB_URL,
  ADEYINKA_LINKEDIN_URL,
  ADEYINKA_TELEGRAM_URL,
} from "@/static";

const Contact = () => {
  const animation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const links = [
    {
      title: "Email",
      description: ADEYINKA_EMAIL,
      href: `mailto:${ADEYINKA_EMAIL}`,
      icon: LuMail,
    },
    {
      title: "Schedule a Call",
      description: "Available for consultations",
      href: ADEYINKA_CAL_URL,
      icon: LuPhone,
    },
    {
      title: "Location",
      description: "Available for remote work",
      icon: LuMapPin,
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
      title: "Telegram",
      href: ADEYINKA_TELEGRAM_URL,
    },
  ];

  return (
    <motion.section
      id="contact"
      initial="initial"
      animate="animate"
      className="bg-background px-6 py-20 sm:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div className="mb-16 text-center" variants={animation}>
          <h2 className="mb-4 text-4xl font-bold text-[#e4ded7] md:text-5xl">
            Let's Work Together
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#e4ded7]/80">
            Ready to bring your ideas to life? I'm currently available for new
            projects and collaborations.
          </p>
        </motion.div>

        <div className="gap-12">
          {/* Contact Info */}
          <motion.div
            className="flex flex-col gap-x-12 gap-y-16 md:flex-row lg:flex-col"
            variants={animation}
          >
            <div className="flex w-full flex-col justify-between gap-6 lg:flex-row">
              {links.map((l, index) => (
                <Link
                  key={index}
                  data-blobity-radius="12"
                  href={l.href || "#"}
                  onClick={
                    l.href && l.href.trim().startsWith("#")
                      ? handleScroll
                      : undefined
                  }
                  target={
                    (l.href &&
                      (l.href.trim().startsWith("#") ||
                        l.href.trim().startsWith("/") ||
                        l.href.trim().startsWith("mailto:"))) ||
                    !l.href
                      ? undefined
                      : "_blank"
                  }
                  className="flex items-center gap-4 px-1.5 py-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#e4ded7]">
                    <l.icon className="h-6 w-6 text-[#23263a]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#e4ded7]">
                      {l.title}
                    </h3>
                    <p className="overflow-clip text-[#e4ded7]/80">
                      {l.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="w-full">
              <h3 className="mb-4 text-xl font-semibold text-[#e4ded7]">
                Connect with me
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6">
                {connects.map((c, index) => (
                  <Link
                    key={index}
                    href={c.href || "#"}
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
                    className="rounded-md border-2 border-[#e4ded7] px-6 py-3 font-semibold text-[#e4ded7] uppercase"
                    rel="noreferrer"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
