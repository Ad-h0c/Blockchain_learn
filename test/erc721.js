const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Unit test for gene battles", () => {
  let deployer;
  let addrs;

  let ERC721;

  beforeEach(async () => {
    [deployer, ...addrs] = await ethers.getSigners();
    const erc721 = await ethers.getContractFactory("erc721");
    ERC721 = await erc721.deploy();
  });

  describe("Deployment", () => {
    it("Returns the owner name!", async () => {
      expect(await ERC721.owner()).to.equal(deployer.address);
    });
    it("Creating the users", async () => {
      expect(
        await ERC721.createUser("Aryan", addrs[5].address, {
          from: deployer.address,
        })
      );
      expect(
        await ERC721.createUser("Dyran", addrs[6].address, {
          from: deployer.address,
        })
      );
      // expect(await ERC721.users().length).to.equal(2);
    });
    it("Expect the user name", async () => {
      // expect(await ERC721.checkTheUser(0)).to.equal("Aryan");
      assert.equal(await ERC721.checkTheUser(1), "Dyran");
    });
  });
});
