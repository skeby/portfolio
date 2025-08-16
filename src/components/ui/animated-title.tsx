import { useEffect } from "react";
import { useAnimation, motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { animation } from "@/static";

export default function AnimatedTitle({
  text,
  className,
  wordSpace,
  charSpace,
}: {
  text: string;
  className: string;
  wordSpace: string;
  charSpace: string;
  delay?: number;
}) {
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  return (
    <h2 aria-label={text} role="heading" className={className}>
      {text.split(" ").map((word, index) => {
        return (
          <motion.span
            ref={ref}
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.25,
              staggerChildren: 0.05,
            }}
            className={`inline-block whitespace-nowrap ${wordSpace}`}
          >
            {word.split("").map((character, index) => {
              return (
                <motion.span
                  aria-hidden="true"
                  key={index}
                  variants={animation.character}
                  className={`inline-block ${charSpace}`}
                >
                  {character}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
    </h2>
  );
}
