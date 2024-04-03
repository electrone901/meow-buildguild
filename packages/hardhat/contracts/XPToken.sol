// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XPToken is ERC20 {

  constructor() payable ERC20("XP Token", "XP") {}

  function mint(address account, uint amount) public {
    _mint(account, amount);
  }

  function burn(address account, uint amount) public {
    _burn(account, amount);
  }
}