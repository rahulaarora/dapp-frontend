"use client";

import { motion } from "motion/react";

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  amplitude?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  duration = 3,
  delay = 0,
  amplitude = 10,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function PulsingElement({
  children,
  duration = 2,
  delay = 0,
  scale = 1.05,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: [1, scale, 1] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function RotatingElement({
  children,
  duration = 10,
  direction = "clockwise",
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  direction?: "clockwise" | "counterclockwise";
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ rotate: 0 }}
      animate={{ rotate: direction === "clockwise" ? 360 : -360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
}
