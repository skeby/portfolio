"use client";

import { handleScroll } from "@/lib/utils";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa6";

const NavBar = () => {
  return (
    <nav className="fixed right-0 bottom-10 left-0 z-50 mx-auto my-0 flex w-[306px] items-center justify-center gap-1 rounded-lg bg-[#07070a]/90 px-1 py-1 text-[#e4ded7] backdrop-blur-md sm:w-[383.3px] md:p-2 lg:w-[391.3px]">
      <Link
        href="/resume.pdf"
        target="_blank"
        aria-label="Open my résumé"
        data-blobity-tooltip="View Résumé"
        data-blobity-magnetic="false"
      >
        <span className="inline-flex items-center justify-center px-2 py-2 sm:px-4 md:py-1">
          <FaFilePdf size={20} className="text-[#e4ded7]" aria-hidden="true" />
        </span>
      </Link>

      <Link
        href="#hero"
        data-blobity-magnetic="false"
        onClick={handleScroll}
        aria-label="Scroll to Home"
      >
        <h4 className="rounded px-2 py-2 text-[12px] sm:px-4 sm:text-[14px] md:px-4 md:py-1">
          Home
        </h4>
      </Link>
      <Link
        href="#projects"
        data-blobity-magnetic="false"
        onClick={handleScroll}
        aria-label="Scroll to Projects"
      >
        <h4 className="rounded px-2 py-2 text-[12px] sm:px-4 sm:text-[14px] md:px-4 md:py-1">
          Projects
        </h4>
      </Link>

      <Link
        href="#about"
        data-blobity-magnetic="false"
        onClick={handleScroll}
        aria-label="Scroll to About Section"
      >
        <h4 className="rounded px-2 py-2 text-[12px] sm:px-4 sm:text-[14px] md:px-4 md:py-1">
          About
        </h4>
      </Link>

      <Link
        href="#contact"
        data-blobity-magnetic="false"
        onClick={handleScroll}
        aria-label="Scroll to Contact"
      >
        <h4 className="rounded px-2 py-2 text-[12px] sm:px-4 sm:text-[14px] md:px-4 md:py-1">
          Contact
        </h4>
      </Link>
    </nav>
  );
};

export default NavBar;
