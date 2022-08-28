const { ethers } = require("ethers");
require("dotenv").config();

const { ALCHEMY_API_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
);

const ERC20_ABI = [
  "function name() view returns(string)",
  "function symbol() view returns(string)",
  "function totalSupply() view returns(uint256)",
  "function balanceOf(address) view returns(uint)",
];

const address = "0xCc7bb2D219A0FC08033E130629C2B854b7bA9195";

const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const balance = await contract.balanceOf(
    "0xb25A7ba7C6e0dAc2e7A685BE3986503C12Def933"
  );

  console.log(`\nThe name of the contract is: ${name}\n`);
  console.log(`The symbol of the contract is: ${symbol}\n`);
  console.log(
    `The totalSupply of the coins are: ${ethers.utils.formatUnits(
      totalSupply,
      "ether"
    )}\n`
  );
  console.log(
    `Number of ${name} coins the address holds are  ${ethers.utils.formatUnits(
      balance,
      "ether"
    )}`
  );
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
