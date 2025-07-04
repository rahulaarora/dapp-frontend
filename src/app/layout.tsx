import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { WalletProvider } from "@/contexts/wallet";

export const metadata: Metadata = {
  title: "Cross-Chain Messaging Frontend",
  description: "DApp - Cross-Chain Messaging Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`antialiased`}>
        <WalletProvider>
          <Navbar />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
