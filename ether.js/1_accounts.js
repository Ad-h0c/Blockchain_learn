const { ethers } = require("ethers");
require("dotenv").config();

const { ALCHEMY_API_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
);

const address = `0x30AE003d9c29Cd9D403F84312744B0f1abcae95c`;

const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(
    `The balance of ${address}: ${ethers.utils.formatUnits(balance, "wei")}`
  );
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
