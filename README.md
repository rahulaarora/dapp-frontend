# Cross-Chain Messaging DApp

This is a simple DApp that allows users to send messages across different Ethereum chains using Hyperlane. It supports sending messages from Sepolia to Holesky and vice versa.

## To setup locally:

- Clone `.env.example` to `.env`
- Fill in the required environment variables
- Run `npm install` or `yarn install` or `pnpm install` to install dependencies
- Deploy the InterchainReceiver contract on Sepolia and Holesky testnets and set the addresses in `.env`

## Deploy Contract

- `npx hardhat run scripts/deploy.js --network sepolia`
- `npx hardhat run scripts/deploy.js --network holesky`

### NOTE:

- Ensure you have Metamask set up with Sepolia and Holesky testnets.
- Ensure you have the required Alchemy API keys set in `.env`.
