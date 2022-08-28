const { ethers } = require("hardhat");
const { upgrades } = require("hardhat");

const proxyAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
async function main() {
  console.log(proxyAddress, " original Box(proxy) address");
  const BoxV4 = await ethers.getContractFactory("BoxV4");
  console.log("Preparing upgrade to BoxV4...");
  const boxV4Address = await upgrades.prepareUpgrade(proxyAddress, BoxV4);
  console.log(boxV4Address, " BoxV4 implementation contract address");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
