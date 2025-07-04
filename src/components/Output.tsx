import { Card, CardContent } from "./ui/card";

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
    <Card className="w-full max-w-sm">
      <CardContent className="px-6 space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium mb-1">Source Hash</h3>
            <p className="text-sm font-mono p-2 rounded border break-all">
              {sourceHash || "No source hash available"}
            </p>
          </div>

          {destinationHash && (
            <div>
              <h3 className="text-sm font-medium mb-1">Destination Hash</h3>
              <p className="text-sm font-mono p-2 rounded border break-all">
                {destinationHash || "Loading..."}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium mb-1">Received Message</h3>
            <p className="text-sm p-2 rounded border">
              {receivedMessage || "Loading..."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
