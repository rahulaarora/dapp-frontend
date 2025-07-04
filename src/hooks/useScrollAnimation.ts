"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef(null);
  const { threshold = 0.1, triggerOnce = true } = options;

  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  });

  return { ref, isInView };
}

export function useStaggeredAnimation(
  itemCount: number,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isInView } = useScrollAnimation(options);

  const staggeredVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return {
    ref,
    isInView,
    staggeredVariants,
    itemVariants,
    containerProps: {
      initial: "hidden",
      animate: isInView ? "visible" : "hidden",
      variants: staggeredVariants,
    },
  };
}
