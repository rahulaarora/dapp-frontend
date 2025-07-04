"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CHAINS } from "@/lib/constants";
import { sendMessage } from "@/lib/contract";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import Output from "./Output";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { motion, AnimatePresence } from "motion/react";

export default function MessageForm() {
  const [formState, setFormState] = useState({
    message: "",
    sourceChain: "",
    destinationChain: "",
    isLoading: false,
  });

  const [output, setOutput] = useState({
    sourceHash: null as string | null,
    destinationHash: null as string | null,
    receivedMessage: null as string | null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // initialize loading state
    setFormState({ ...formState, isLoading: true });

    // check if all fields are filled
    if (
      !formState.sourceChain ||
      !formState.destinationChain ||
      !formState.message
    ) {
      setFormState({ ...formState, isLoading: false });
      return;
    }

    try {
      // send message
      const result = await sendMessage({
        source: formState.sourceChain,
        destination: formState.destinationChain,
        message: formState.message,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to send message");
      }

      // update output state with transaction hashes and received message
      setOutput({
        sourceHash: result.transactionHash,
        destinationHash: null,
        receivedMessage: formState.message,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert(
        "Something went wrong while sending the message. Please try again."
      );
      setFormState({ ...formState, isLoading: false });
      return;
    } finally {
      // reset form state
      setFormState({
        isLoading: false,
        message: "",
        sourceChain: CHAINS[0].value,
        destinationChain: CHAINS[1].value,
      });
    }
  };

  return (
    <motion.section
      className="w-full flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full flex justify-center items-center"
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Send Cross-Chain Message</CardTitle>
            <CardDescription>
              Enter message and select source and destination chain to send
              message
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="grid w-full gap-3">
                  <Label htmlFor="message">
                    Your message (max 500 characters)
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea
                      placeholder="Type your message here."
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      required
                      disabled={formState.isLoading}
                      maxLength={500}
                      className="resize-none h-24"
                    />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="grid w-full gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Label htmlFor="sourceChain">Source Chain</Label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Select
                    value={formState.sourceChain}
                    required
                    onValueChange={(value) =>
                      setFormState({
                        ...formState,
                        sourceChain: value,
                        destinationChain:
                          CHAINS.filter((c) => c.value !== value)[0]?.value ??
                          "",
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a source chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Source Chains</SelectLabel>
                        {CHAINS.map((chain) => (
                          <SelectItem key={chain.value} value={chain.value}>
                            {chain.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </motion.div>
              </motion.div>
              <motion.div
                className="grid w-full gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Label htmlFor="destinationChain">Destination Chain</Label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Select
                    value={formState.destinationChain}
                    required
                    onValueChange={(value) =>
                      setFormState({
                        ...formState,
                        destinationChain: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a destination chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Destination Chains</SelectLabel>
                        {CHAINS.filter(
                          (c) => c.value !== formState.sourceChain
                        ).map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    formState.isLoading ||
                    !formState.sourceChain ||
                    !formState.destinationChain ||
                    !formState.message
                  }
                >
                  Send Message
                  <AnimatePresence>
                    {formState.isLoading && (
                      <motion.span
                        className="ml-2"
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          rotate: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          opacity: { duration: 0.2 },
                        }}
                      >
                        <LoaderCircle />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {output.sourceHash && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Output
              sourceHash={output.sourceHash}
              destinationHash={output.destinationHash}
              receivedMessage={output.receivedMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
