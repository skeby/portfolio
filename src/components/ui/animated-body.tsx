import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { animation } from "@/static";

type AnimatedBodyProps = {
  text: string;
  className?: string;
  wordSpace?: string;
  charSpace?: string;
};

export default function AnimatedBody({
  text,
  className,
  wordSpace,
  charSpace,
}: AnimatedBodyProps) {
  //   const text = "Animated Text"; // This would normally be passed into this component as a prop!

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
    <motion.p
      aria-label={text}
      role="heading"
      className={className}
      ref={ref}
      aria-hidden="true"
      initial="hidden"
      animate={ctrls}
      variants={animation.body}
    >
      {text}
    </motion.p>
  );
}
