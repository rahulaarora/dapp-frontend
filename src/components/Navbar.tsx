"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useWallet } from "@/contexts/wallet";

export default function Navbar() {
  const { address, connectWallet, connecting, setAddress } = useWallet();

  const disconnectWallet = () => {
    setAddress(null);
  };

  return (
    <nav className="w-full sticky top-0 bg-background">
      <div className="flex justify-between items-center p-4">
        <Link href="/" className="text-base md:text-lg font-bold">
          Cross-Chain Messaging
        </Link>
        <div className="space-x-4">
          {address ? (
            <Button
              className="text-sm"
              variant="outline"
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </Button>
          ) : (
            <Button onClick={connectWallet} disabled={connecting}>
              {connecting ? "Connecting..." : "Connect Wallet"}
              <Image
                src={"/MetaMask-icon-fox.svg"}
                alt="MetaMask"
                width={20}
                height={20}
              />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
