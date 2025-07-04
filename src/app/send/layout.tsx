"use client";

import { useWallet } from "@/contexts/wallet";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { address } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  if (!address) {
    return (
      <section className="flex flex-col items-center justify-center h-[calc(100vh-75px)]">
        <p className="text-sm text-muted-foreground">
          Connect your wallet to send messages. Redirecting to home...
        </p>
      </section>
    );
  }

  return <section>{children}</section>;
}
