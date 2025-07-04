"use client";

import { ethers } from "ethers";
import { ReactNode, useState, useContext, createContext } from "react";

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

export interface WalletContextType {
  address: string | null;
  setAddress: (address: string | null) => void;
  connectWallet: () => Promise<void>;
  connecting: boolean;
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        alert("MetaMask is not installed");
        setConnecting(false);
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      alert("Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{ address, setAddress, connectWallet, connecting }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
