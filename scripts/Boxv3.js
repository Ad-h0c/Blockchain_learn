const { ethers } = require("hardhat");
const { upgrades } = require("hardhat");

const proxyAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
// const proxyAddress = '0x1CD0c84b7C7C1350d203677Bb22037A92Cc7e268'
async function main() {
  console.log(proxyAddress, " original Box(proxy) address");
  const BoxV3 = await ethers.getContractFactory("BoxV3");
  console.log("upgrade to BoxV3...");
  const boxV3 = await upgrades.upgradeProxy(proxyAddress, BoxV3);
  console.log(boxV3.address, " BoxV3 address(should be the same)");

  console.log(
    await upgrades.erc1967.getImplementationAddress(boxV3.address),
    " getImplementationAddress"
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(boxV3.address),
    " getAdminAddress"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function getZkSyncProvider(zksync, networkName) {
  let zkSyncProvider;
  try {
    zkSyncProvider = await zksync.getDefaultProvider(networkName);
  } catch (error) {
    console.log("Unable to connect to zkSync.");
    console.log(error);
  }
  return zkSyncProvider;
}
