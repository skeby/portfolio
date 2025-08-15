"use client";

import { animation, poppins } from "@/static";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import profile from "../../../public/images/profile-3.webp";

const Hero = () => {
  return (
    <motion.section
      id="hero"
      initial="initial"
      animate="animate"
      className="h-[85vh] bg-radial from-[#23263a] via-[#23263a] to-[#020618] min-[1500px]:h-[85vh] sm:h-[90vh] md:h-[100vh]"
    >
      {/* <div className="absolute inset-0 z-0 h-full w-full bg-white/15 mix-blend-color"></div> */}
      <div className="max-w-res flex h-full w-full flex-col justify-between px-6 pt-10 pb-16 sm:px-12 sm:py-10">
        <div className="flex w-full items-center justify-center gap-3 sm:justify-between lg:max-w-[1440px]">
          <div className="flex gap-2 sm:gap-4 md:gap-6">
            <Link href="#contact" aria-label="SEND A MESSAGE">
              <motion.button
                className="hidden rounded-md border-2 border-[#e4ded7] px-4 py-2 text-[14px] font-semibold text-[#e4ded7] sm:block md:text-[16px] lg:block"
                variants={animation.body}
              >
                SEND A MESSAGE
              </motion.button>
            </Link>
            <Link
              target="_blank"
              href="https://cal.com/adeyinka/website"
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
              href="https://github.com/skeby"
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
              href="https://ng.linkedin.com/in/adeyinka-akinsanya-171a4532a"
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
              href="mailto:akinsanyaadeyinka4166@gmail.com"
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

        <div className="flex flex-col items-center justify-center">
          <div
            className={`relative flex flex-col items-center justify-center ${poppins.className}`}
          >
            {/* <AnimatedWords
              title="ADEYINKA AKINSANYA"
              style="inline-block pt-1 -mr-4 sm:-mr-5 md:-mr-7 lg:-mr-9 -mb-1 sm:-mb-2 md:-mb-3 lg:-mb-4"
            /> */}
            <motion.div className="" variants={animation.image}>
              <Image
                src={profile}
                width={600}
                height={600}
                priority
                alt="Adeyinka's profile"
                data-blobity-tooltip="Adeyinka Akinsanya"
                data-blobity-invert="false"
                className="w-[150px] rounded-[16px] grayscale duration-500 hover:grayscale-0 md:w-[200px] md:rounded-[32px] lg:w-[245px]"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:max-w-[1440px]">
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
      </div>
    </motion.section>
  );
};

export default Hero;
