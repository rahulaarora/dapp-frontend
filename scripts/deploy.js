const hre = require("hardhat");

// ref: https://docs.hyperlane.xyz/docs/reference/addresses/deployments/mailbox
const HYPERLANE_MAILBOX_ADDRESSES = {
  holesky: "0x46f7C5D896bbeC89bE1B19e4485e59b4Be49e9Cc",
  sepolia: "0xfFAEF09B3cd11D9b20d1a19bECca54EEC2884766",
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const networkName = hre.network.name;
  const mailboxAddress = HYPERLANE_MAILBOX_ADDRESSES[networkName];

  if (!mailboxAddress) {
    console.error(`Mailbox address not found for network: ${networkName}`);
    process.exit(1);
  }

  const InterchainReceiver = await hre.ethers.getContractFactory(
    "InterchainReceiver"
  );
  const receiver = await InterchainReceiver.deploy(mailboxAddress);

  await receiver.waitForDeployment();

  console.log(
    `InterchainReceiver deployed to ${receiver.target} on ${networkName}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
