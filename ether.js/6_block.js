const { ethers } = require("ethers");
require("dotenv").config();

const { ALCHEMY_API_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
);

const main = async () => {
  const blockNumber = await provider.getBlockNumber();

  const tx = await provider.getBlockWithTransactions(blockNumber);

  console.log(tx);
};

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
