"use client";

import MessageForm from "@/components/MessageForm";
import { motion } from "motion/react";

export default function SendMessage() {
  return (
    <motion.div
      className="px-5 py-10 flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MessageForm />
    </motion.div>
  );
}
