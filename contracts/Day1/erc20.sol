//SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract erc20 is ERC20("ERC20", "ERC20"), Ownable {
    function mint(uint256 amount) public onlyOwner returns (bool) {
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) public onlyOwner returns (bool) {
        _burn(msg.sender, amount);
    }
}
