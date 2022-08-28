const { ethers } = require("ethers");
require("dotenv").config();

const { GOERLI_PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
);

const abi = [
  "function balanceOf(address) view returns(uint)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const address = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

const contract = new ethers.Contract(address, abi, provider);

const main = async () => {
  const block = await provider.getBlockNumber();

  const eventListener = await contract.queryFilter(
    "Transfer",
    block - 20,
    block
  );

  console.log(eventListener);
};

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
