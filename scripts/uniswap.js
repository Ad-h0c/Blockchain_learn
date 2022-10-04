const { ethers } = require("ethers");
require("dotenv").config();

const { ALCHEMY_API_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
);

const mainnetFactoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
// const FactoryDeployedContract = await ethers.getContractAt(
//   "UniswapV3Factory",
//   mainnetFactoryAddress
// );

const main = async () => {
  const instance = await ethers.getContractAt(
    "UniswapV3Factory",
    mainnetFactoryAddress
  );
  const owner = await instance.owner();
  console.log(owner);
};

main();
