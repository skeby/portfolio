"use client"; //TODO: Consider making this server component and moving project card into a separate client component

import { projects } from "@/static";
import { Project } from "@/types";
import { motion } from "motion/react";
import { url } from "inspector";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa6";
import AnimatedTitle from "../ui/animated-title";
import AnimatedBody from "../ui/animated-body";

const Projects = () => {
  return (
    <section id="projects">
      <div className="max-w-res grid grid-cols-1 gap-10 px-6 py-16 sm:px-12 sm:py-20 lg:grid-cols-2">
        {projects.map((p, index) => (
          <ProjectCard key={index} {...p} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ title, description, urls, technologies }: Project) => {
  return (
    <motion.div
      className="flip-card relative z-10"
      initial="initial"
      animate="animate"
    >
      <div className="flip-card-inner bg-card h-[550px] w-full rounded-3xl px-8 py-6 sm:h-[700px] sm:w-[100%] md:h-[650px] md:w-[100%] lg:h-[500px] lg:px-14 lg:py-10">
        <div className="flip-card-front absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4">
          <div className="flex items-center gap-2.5">
            {/* {urls.github && (
              <Link
                href={urls.github}
                target="_blank"
                className="flex size-[64px] items-center justify-center rounded-full bg-[#e4ded7]"
                aria-label="Open GitHub Repo"
                data-blobity
                data-blobity-radius="38"
                data-blobity-offset-x="4"
                data-blobity-offset-y="4"
                data-blobity-magnetic="false"
              >
                <FaGithub className="text-background w-9 rounded-full text-[20px] md:w-10 md:text-[24px] lg:w-12 lg:text-[28px]" />
              </Link>
            )}
            {urls.live && (
              <Link
                href={urls.live}
                target="_blank"
                className="flex size-[64px] items-center justify-center rounded-full bg-[#e4ded7]"
                aria-label="Open GitHub Repo"
                data-blobity
                data-blobity-radius="38"
                data-blobity-offset-x="4"
                data-blobity-offset-y="4"
                data-blobity-magnetic="false"
              >
                <FaLink className="lg:text-[28 px] w-9 rounded-full text-[20px] text-black md:w-10 md:text-[24px] lg:w-12" />
              </Link>
            )} */}
          </div>
          <p className="text-3xl">{title}</p>
        </div>
        <div className="flip-card-back">
          <div className="flex items-center gap-4">
            {urls.github && (
              <Link
                href={urls.github}
                target="_blank"
                className="flex size-[64px] items-center justify-center rounded-full bg-[#e4ded7]"
                aria-label="Open GitHub Repo"
                data-blobity
                data-blobity-radius="38"
                data-blobity-offset-x="4"
                data-blobity-offset-y="4"
                data-blobity-magnetic="false"
              >
                <FaGithub className="text-background w-9 rounded-full text-[20px] md:w-10 md:text-[24px] lg:w-12 lg:text-[28px]" />
              </Link>
            )}
            {urls.live && (
              <Link
                data-blobity
                data-blobity-radius="38"
                data-blobity-offset-x="4"
                data-blobity-offset-y="4"
                data-blobity-magnetic="false"
                href={urls.live}
                target="_blank"
                className="flex size-[64px] items-center justify-center rounded-full bg-[#e4ded7]"
                aria-label="Open GitHub Repo"
              >
                <FaLink className="lg:text-[28 px] w-9 rounded-full text-[20px] text-black md:w-10 md:text-[24px] lg:w-12" />
              </Link>
            )}
          </div>
          <div className="mt-10">
            <AnimatedTitle
              text={title}
              className={
                "max-w-[90%] text-[40px] leading-none text-white md:text-[44px] md:leading-none lg:max-w-[450px] lg:text-[48px] lg:leading-none"
              }
              wordSpace={"mr-[0.25em]"}
              charSpace={"-mr-[0.01em]"}
            />
            <AnimatedBody
              text={description}
              className={
                "mt-4 w-[90%] max-w-[457px] text-[16px] font-semibold text-[#95979D]"
              }
            />
            <div className="mt-9 flex flex-wrap gap-4">
              {technologies.map((tech, index) => (
                <AnimatedTitle
                  text={tech}
                  wordSpace={"mr-[0.25em]"}
                  charSpace={"mr-[0.01em]"}
                  key={index}
                  className={
                    "text-[14px] font-bold uppercase md:text-[16px] lg:text-[18px]"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
