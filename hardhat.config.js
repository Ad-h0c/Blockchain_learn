require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");

const {
  GOERLI_PRIVATE_KEY,
  ALCHEMY_API_KEY,
  YOUR_ETHERSCAN_API_KEY,
  QUICKNODE_API_KEY,
} = process.env;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    bsctest: {
      url: `https://radial-wispy-dinghy.bsc-testnet.discover.quiknode.pro/${QUICKNODE_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: YOUR_ETHERSCAN_API_KEY,
  },
};
