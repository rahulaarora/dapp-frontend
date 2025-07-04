"use client";

import { MoveRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useWallet } from "@/contexts/wallet";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  const { address, connectWallet, connecting } = useWallet();
  const router = useRouter();

  return (
    <motion.main
      className="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center bg-background text-foreground dark px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl text-center font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Cross-Chain Messaging DApp
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="lg"
          disabled={connecting}
          onClick={async () => {
            if (!address) {
              await connectWallet().then(() => {
                router.push("/send");
              });
            } else {
              router.push("/send");
            }
          }}
        >
          {address ? "Send Message" : "Get Started"}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <MoveRight />
          </motion.div>
        </Button>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p
          key={address ? "connected" : "disconnected"}
          className="text-sm text-muted-foreground mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          {address
            ? "Connected to " +
              address.slice(0, 6) +
              "..." +
              address.slice(address.length - 4)
            : "Connect your wallet to get started"}
        </motion.p>
      </AnimatePresence>
    </motion.main>
  );
}
