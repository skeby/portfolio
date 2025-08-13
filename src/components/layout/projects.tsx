"use client"; //TODO: Consider making this server component and moving project card into a separate client component

import { projects } from "@/static";
import { Project } from "@/types";
import { motion } from "framer-motion";
import { url } from "inspector";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa6";
import AnimatedTitle from "../ui/animated-title";
import AnimatedBody from "../ui/animated-body";

const Projects = () => {
  return (
    <section id="projects">
      <div className="max-w-res flex flex-col gap-10 px-6 py-16 sm:px-12 sm:py-20">
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
      className={`bg-card relative z-10 h-[550px] w-full items-stretch justify-center overflow-hidden rounded-3xl bg-center px-8 py-6 sm:h-[700px] sm:w-[100%] md:h-[650px] md:w-[100%] lg:h-[500px] lg:px-14 lg:py-10`}
      initial="initial"
      animate="animate"
    >
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
        <div className="mt-9 flex gap-4">
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
    </motion.div>
  );
};

export default Projects;
