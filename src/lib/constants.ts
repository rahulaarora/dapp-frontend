export const CHAINS = [
  {
    label: "Ethereum Sepolia",
    value: "sepolia",
    chainId: 11155111,
    rpcURL: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    deployedReceiver:
      process.env.NEXT_PUBLIC_DEPLOYED_SEPOLIA_INTERCHAIN_RECEIVER,
  },
  {
    label: "Holesky",
    value: "holesky",
    chainId: 17000,
    rpcURL: `https://eth-holesky.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    deployedReceiver:
      process.env.NEXT_PUBLIC_DEPLOYED_HOLESKY_INTERCHAIN_RECEIVER,
  },
];

export const INTERCHAIN_MESSAGING_ABI = [
  "function sendMessage(uint32 _destinationDomain, bytes32 _recipientAddress, string memory _message) payable",
  "function handle(uint32 _origin, bytes32 _sender, bytes calldata _body) payable",
  "event SentMessage(uint32 indexed destinationDomain, address indexed sender, string message)",
  "event ReceivedMessage(uint32 indexed originDomain, address indexed sender, string message)",
];
