const { ethers } = require("ethers");
require("dotenv").config();

const abi = require("./pancakeswap.json");
const erc20 = require("./erc20.json");

const { QUICKNODE_API_KEY, GOERLI_PRIVATE_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(
  `https://radial-wispy-dinghy.bsc-testnet.discover.quiknode.pro/${QUICKNODE_API_KEY}`
);

const address = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"; //Pancakeswap router address

const pancakeswap = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"; //pancakeswap erc20 address

const myAdd = "0xe515E4883c503584e2DfbdAF60149DAbc123657b"; //It is my address, you can swap it to yours

const routerContract = new ethers.Contract(address, abi, provider);
const erc20Contract = new ethers.Contract(pancakeswap, erc20, provider);

const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);

const busd = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"; //BUSD address
const usdt = "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684"; //USDT address
const arr = [busd, usdt];

const main = async () => {
  const SignIn = routerContract.connect(wallet);
  const SingIn2 = erc20Contract.connect(wallet);
  // console.log(SingIn2);
  // console.log(SignIn);
  //Spender is router contract here.
  const tranx = await SingIn2.approve(address, 100); //Before swapping you need to approve the trans.
  const tx = await SignIn.callStatic.swapTokensForExactTokens(
    1, //The amount should be present before trying to swap.
    1, //You need to calculate it manually because they do it also that way. using x*y=k formula and their present prices.
    arr,
    myAdd,
    "1663953600" //This is unix timestamp. It will work for next two hours. Then you need to update it.
    //unixtimestamp.com You can get unix timestamp in this website.
  );

  console.log(tx);
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});

/*
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = PancakeLibrary.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, PancakeLibrary.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }

    This is the function to swap erc20 to erc20
    You can read more about this function in this link: https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/router-v2#:~:text=transaction%20must%20confirm.-,swapExactTokensForTokens,-function%20swapExactTokensForTokens(

    Lastly, this is just a reference material to show you can do it like this. You need to do like this.
*/
