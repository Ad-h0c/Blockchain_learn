const { ethers } = require("ethers");
require("dotenv").config();

const { GOERLI_PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
);

const sender = "0xe515E4883c503584e2DfbdAF60149DAbc123657b";
const receiver = "0x2F600dFC67E8AFDbCb650790c13cB94178871C7B";

const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);

const main = async () => {
  // Before the transfer
  const senderBefore = await provider.getBalance(sender);
  const receiverBefore = await provider.getBalance(receiver);

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

  const tx = await wallet.sendTransaction({
    to: receiver,
    value: ethers.utils.parseEther("0.05"),
  });

  await tx.wait();

  console.log(tx);

  const senderAfter = await provider.getBalance(sender);
  const receiverAfter = await provider.getBalance(receiver);

  console.log(
    `Sender balance after the transfer is: ${ethers.utils.formatEther(
      senderAfter
    )}`
  );

  console.log(
    `Receiver balance after the transfer is: ${ethers.utils.formatUnits(
      receiverAfter,
      "ether"
    )}`
  );
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
