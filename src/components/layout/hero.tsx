"use client";

import {
  ADEYINKA_CAL_URL,
  ADEYINKA_EMAIL,
  ADEYINKA_GITHUB_URL,
  ADEYINKA_LINKEDIN_URL,
  animation,
} from "@/static";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import profile from "../../../public/images/profile-3-christmas.webp";
import { handleScroll } from "@/lib/utils";

const Hero = () => {
  return (
    <motion.section
      id="hero"
      initial="initial"
      animate="animate"
      className="to-background h-[85vh] bg-radial from-[#23263a] via-[#23263a] min-[1500px]:h-[85vh] sm:h-[90vh] md:h-[100vh]"
    >
      {/* <div className="absolute inset-0 z-0 h-full w-full bg-white/15 mix-blend-color"></div> */}
      <div className="max-w-res flex h-full w-full flex-col justify-between px-6 pt-10 pb-6 sm:px-12 sm:py-10">
        <div className="flex w-full items-center justify-center gap-3 sm:justify-between lg:max-w-[1440px]">
          <div className="flex gap-2 sm:gap-4 md:gap-6">
            <Link
              href="#contact"
              onClick={handleScroll}
              aria-label="SEND A MESSAGE"
            >
              <motion.button
                className="hidden rounded-md border-2 border-[#e4ded7] px-4 py-2 text-[14px] font-semibold text-[#e4ded7] sm:block md:text-[16px] lg:block"
                variants={animation.body}
              >
                SEND A MESSAGE
              </motion.button>
            </Link>
            <Link
              target="_blank"
              href={ADEYINKA_CAL_URL}
              aria-label="BOOK A CALL"
            >
              <motion.button
                className="hidden rounded-md border-2 bg-[#e4ded7] px-4 py-2 text-[14px] font-semibold text-[#23263a] sm:block md:text-[16px] lg:block"
                variants={animation.body}
              >
                BOOK A CALL
              </motion.button>
            </Link>
          </div>

          <div className="flex h-full gap-10 text-[#e4ded7] sm:gap-12 md:gap-14 lg:gap-14">
            <Link
              href={ADEYINKA_GITHUB_URL}
              target="_blank"
              aria-label="View GitHub Profile"
              className="grid place-items-center"
            >
              <motion.p
                className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
                variants={animation.body}
              >
                GITHUB
              </motion.p>
            </Link>
            <Link
              href={ADEYINKA_LINKEDIN_URL}
              target="_blank"
              aria-label="View LinkedIn Profile"
              className="grid place-items-center"
            >
              <motion.p
                className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
                variants={animation.body}
              >
                LINKEDIN
              </motion.p>
            </Link>
            <Link
              href={`mailto:${ADEYINKA_EMAIL}`}
              aria-label="Send an Email"
              className="grid place-items-center"
            >
              <motion.p
                className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
                variants={animation.body}
              >
                EMAIL
              </motion.p>
            </Link>
          </div>
        </div>

        <div className="my-auto flex flex-col items-center justify-center">
          <motion.div className="mb-10" variants={animation.image}>
            <Image
              src={profile}
              width={600}
              height={600}
              priority
              alt="Adeyinka's profile"
              data-blobity-tooltip="Stay Cheesed Up!"
              data-blobity-invert="false"
              className="w-[150px] rounded-[16px] grayscale duration-500 hover:grayscale-0 md:w-[200px] md:rounded-[32px] lg:w-[245px]"
            />
          </motion.div>
          <motion.h1
            className="mb-3 text-center text-4xl font-bold sm:text-5xl"
            variants={animation.body}
          >
            Adeyinka Akinsanya
          </motion.h1>
          <motion.div
            className="max-w-[350px] md:max-w-[400px] lg:max-w-[500px]"
            variants={animation.body}
          >
            <div className="z-50 text-center text-[16px] font-medium text-[#e4ded7] md:text-[20px]">
              <p>Software Engineer and Frontend Developer, </p>
              <p className="">currently available for work.</p>
            </div>
          </motion.div>
        </div>

        {/* <div className="flex w-full items-center justify-center lg:max-w-[1440px]">
          <motion.div
            className="max-w-[350px] md:max-w-[400px] lg:max-w-[500px]"
            variants={animation.body}
          >
            <div className="z-50 text-center text-[16px] font-medium text-[#e4ded7] md:text-[20px]">
              <p>Software Engineer and Frontend Developer, </p>
              <p className="">currently available for work.</p>
            </div>
          </motion.div>
        </div> */}
      </div>
    </motion.section>
  );
};

export default Hero;
