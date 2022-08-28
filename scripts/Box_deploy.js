const { ethers } = require("hardhat");

const { upgrades } = require("hardhat");
main = async () => {
  const Box = await ethers.getContractFactory("Box");
  console.log("Deploying Box...");
  const box = await upgrades.deployProxy(Box, [50], { initializer: "store" });
  console.log("Box proxy address:", box.address);
  // const proxyAddress = box.address;
  // const impaddress = await upgrades.erc1967.getImplementationAddress(
  //   proxyAddress
  // );
  // console.log("Implementation address:", impaddress);
  // console.log(
  //   "Admin addresss:",
  //   await upgrades.erc1967.getAdminAddress(proxyAddress)
  // );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
