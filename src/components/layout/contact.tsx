"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LuMail, LuMapPin, LuPhone, LuSend } from "react-icons/lu";
import Link from "next/link";

const Contact = () => {
  const animation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const links = [
    {
      title: "Email",
      description: "akinsanyaadeyinka4166@gmail.com",
      href: "mailto:akinsanyaadeyinka4166@gmail.com",
      icon: LuMail,
    },
    {
      title: "Schedule a Call",
      description: "Available for consultations",
      href: "https://cal.com/adeyinka/website",
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
      href: "https://github.com/skeby",
    },
    {
      title: "LinkedIn",
      href: "https://ng.linkedin.com/in/adeyinka-akinsanya-171a4532a",
    },
    {
      title: "Telegram",
      href: "https://t.me/staticusername",
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
              {links.map((link, index) => (
                <Link
                  key={index}
                  data-blobity-radius="12"
                  href={link.href || "#"}
                  target={link.href ? "_blank" : undefined}
                  className="flex items-center gap-4 px-1.5 py-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e4ded7]">
                    <link.icon className="h-6 w-6 text-[#23263a]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#e4ded7]">
                      {link.title}
                    </h3>
                    <p className="text-[#e4ded7]/80">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="w-full">
              <h3 className="mb-4 text-xl font-semibold text-[#e4ded7]">
                Connect with me
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6">
                {connects.map((connect, index) => (
                  <Link
                    key={index}
                    href={connect.href || "#"}
                    target={connect.href ? "_blank" : undefined}
                    className="rounded-md border-2 border-[#e4ded7] px-6 py-3 font-semibold text-[#e4ded7] uppercase"
                    rel="noreferrer"
                  >
                    {connect.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          {/* <motion.div
            className="rounded-2xl border border-[#e4ded7]/20 bg-[#e4ded7]/5 p-8 backdrop-blur-sm"
            variants={animation}
          >
            <form className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-[#e4ded7]">
                    Name
                  </label>
                  <Input
                    className="border-[#e4ded7]/30 bg-[#e4ded7]/10 text-[#e4ded7] placeholder:text-[#e4ded7]/50 focus:border-[#e4ded7]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-medium text-[#e4ded7]">
                    Email
                  </label>
                  <Input
                    type="email"
                    className="border-[#e4ded7]/30 bg-[#e4ded7]/10 text-[#e4ded7] placeholder:text-[#e4ded7]/50 focus:border-[#e4ded7]"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#e4ded7]">
                  Subject
                </label>
                <Input
                  className="border-[#e4ded7]/30 bg-[#e4ded7]/10 text-[#e4ded7] placeholder:text-[#e4ded7]/50 focus:border-[#e4ded7]"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#e4ded7]">
                  Message
                </label>
                <Textarea
                  rows={5}
                  className="resize-none border-[#e4ded7]/30 bg-[#e4ded7]/10 text-[#e4ded7] placeholder:text-[#e4ded7]/50 focus:border-[#e4ded7]"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                variants={animation}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#e4ded7] px-4 py-3 font-semibold text-[#23263a] hover:bg-[#e4ded7]/90"
              >
                <LuSend className="h-4 w-4" />
                Send Message
              </motion.button>
            </form>
          </motion.div> */}
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
