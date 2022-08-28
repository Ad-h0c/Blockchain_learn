const { ethers } = require("ethers");
require("dotenv").config();

const { GOERLI_PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
);

const sender = "0xe515E4883c503584e2DfbdAF60149DAbc123657b";
const receiver = "0x2F600dFC67E8AFDbCb650790c13cB94178871C7B";

const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);

const address = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

const abi = [
  "function balanceOf(address) view returns(uint)",
  "function transfer(address to, uint amount) returns(bool)",
];

const contract = new ethers.Contract(address, abi, provider);

const main = async () => {
  const senderBefore = await contract.balanceOf(sender);
  const receiverBefore = await contract.balanceOf(receiver);

  console.log(
    `Sender balance before the transfer is: ${ethers.utils.formatEther(
      senderBefore
    )}`
  );

  console.log(
    `Receiver balance before the transfer is: ${ethers.utils.formatUnits(
      receiverBefore,
      "ether"
    )}`
  );

  const amount = ethers.utils.parseEther("5");

  const contractWithWallet = contract.connect(wallet);

  const tx = await contractWithWallet.transfer(receiver, amount);

  await tx.wait();

  console.log(tx);

  const senderAfter = await contract.balanceOf(sender);
  const receiverAfter = await contract.balanceOf(receiver);

  console.log(
    `Sender balance before the transfer is: ${ethers.utils.formatEther(
      senderAfter
    )}`
  );

  console.log(
    `Receiver balance before the transfer is: ${ethers.utils.formatUnits(
      receiverAfter,
      "ether"
    )}`
  );
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
