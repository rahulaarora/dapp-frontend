require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.8.20",
      },
      {
        version: "0.8.28",
      },
    ],
  },
  networks: {
    holesky: {
      url: `https://eth-holesky.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 17000,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};
