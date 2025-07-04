"use client";

import { MoveRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useWallet } from "@/contexts/wallet";
import { useRouter } from "next/navigation";

export default function Home() {
  const { address, connectWallet, connecting } = useWallet();
  const router = useRouter();

  return (
    <main className="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center bg-background text-foreground dark">
      <h1 className="text-4xl font-bold mb-8">Cross-Chain Messaging DApp</h1>
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
        <MoveRight />
      </Button>
      <p className="text-sm text-muted-foreground mt-4">
        {address
          ? "Connected to " +
            address.slice(0, 6) +
            "..." +
            address.slice(address.length - 4)
          : "Connect your wallet to get started"}
      </p>
    </main>
  );
}
