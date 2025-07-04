import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";

interface OutputProps {
  sourceHash?: string | null;
  destinationHash?: string | null;
  receivedMessage?: string | null;
}

export default function Output({
  sourceHash,
  destinationHash,
  receivedMessage,
}: OutputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-sm">
        <CardContent className="px-6 space-y-4">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-sm font-medium mb-1">Source Hash</h3>
              <motion.p
                className="text-sm font-mono p-2 rounded border break-all"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {sourceHash || "No source hash available"}
              </motion.p>
            </motion.div>

            {destinationHash && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-sm font-medium mb-1">Destination Hash</h3>
                <motion.p
                  className="text-sm font-mono p-2 rounded border break-all"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {destinationHash || "Loading..."}
                </motion.p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="text-sm font-medium mb-1">Received Message</h3>
              <motion.p
                className="text-sm p-2 rounded border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {receivedMessage || "Loading..."}
              </motion.p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
