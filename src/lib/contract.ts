import { ethers } from "ethers";
import { CHAINS, INTERCHAIN_MESSAGING_ABI } from "./constants";

export const sendMessage = async ({
  source,
  destination,
  message,
}: {
  source: string;
  destination: string;
  message: string;
}) => {
  const sourceChain = CHAINS.find((chain) => chain.value === source);
  const destinationChain = CHAINS.find((chain) => chain.value === destination);

  if (!sourceChain || !destinationChain) {
    throw new Error("Invalid source or destination chain");
  }

  try {
    // wallet connection check
    if (!(window as any).ethereum) {
      throw new Error("No wallet found. Please install MetaMask.");
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const sourceContractAddress = sourceChain.deployedReceiver;
    const destinationContractAddress = destinationChain.deployedReceiver;
    const protocolFee = ethers.parseEther("0.001"); // sample protocol fee

    if (!sourceContractAddress || !destinationContractAddress) {
      throw new Error("Contract addresses not found for the selected chains");
    }

    const sourceContract = new ethers.Contract(
      sourceContractAddress,
      INTERCHAIN_MESSAGING_ABI,
      signer
    );

    const destinationRecipientAddress = ethers.zeroPadValue(
      destinationContractAddress,
      32
    );

    const tx = await sourceContract.sendMessage(
      destinationChain.chainId,
      destinationRecipientAddress,
      message,
      { value: protocolFee }
    );

    await tx.wait();

    return {
      success: true,
      transactionHash: tx.hash,
    };
  } catch (error: Error | unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send message",
    };
  }
};
