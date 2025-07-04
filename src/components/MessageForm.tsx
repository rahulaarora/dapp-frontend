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
    <section className="w-full flex flex-col items-center gap-3">
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
            <div className="flex flex-col gap-6">
              <div className="grid w-full gap-3">
                <Label htmlFor="message">
                  Your message (max 500 characters)
                </Label>
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
              </div>
            </div>
            <div className="grid w-full gap-3">
              <Label htmlFor="sourceChain">Source Chain</Label>
              <Select
                value={formState.sourceChain}
                required
                onValueChange={(value) =>
                  setFormState({
                    ...formState,
                    sourceChain: value,
                    destinationChain:
                      CHAINS.filter((c) => c.value !== value)[0]?.value ?? "",
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
            </div>
            <div className="grid w-full gap-3">
              <Label htmlFor="destinationChain">Destination Chain</Label>
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
            </div>
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
              {formState.isLoading && (
                <span className="ml-2 animate-spin">
                  <LoaderCircle />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {output.sourceHash && (
        <Output
          sourceHash={output.sourceHash}
          destinationHash={output.destinationHash}
          receivedMessage={output.receivedMessage}
        />
      )}
    </section>
  );
}
