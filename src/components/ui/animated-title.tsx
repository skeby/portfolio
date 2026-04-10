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
            variants={animation.character}
            transition={{
              delay: index * 0.25,
              duration: 1,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className={`inline-block whitespace-nowrap ${wordSpace} ${charSpace}`}
          >
            {word + "\u00A0"}
          </motion.span>
        );
      })}
    </h2>
  );
}
