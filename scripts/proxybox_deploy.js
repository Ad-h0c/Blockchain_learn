const { ethers } = require("hardhat");
const { upgrades } = require("hardhat");

const proxyAddress = "0x2839BB6346AaA2414291C1d6415532d1Bef7522A";

main = async () => {
  console.log("Proxy address is:", proxyAddress);

  const BOXV2 = await ethers.getContractFactory("BoxV2");
  console.log("Upgrading to BoxV2...");
  const boxv2 = await upgrades.upgradeProxy(proxyAddress, BOXV2);
  console.log("Boxv2 address should be same", boxv2.address);

  // console.log(
  //   "Get implementation address",
  //   await upgrades.erc1967.getImplementationAddress(boxv2.address)
  // );

  // console.log(
  //   "Get admin address",
  //   await upgrades.erc1967.getAdminAddress(boxv2.address)
  // );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
