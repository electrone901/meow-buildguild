// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AccessoriesNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  string[] public accessoriesURLList;

  constructor() ERC721("Accessories NFT", "A") {}

  function mint(address to, string memory token_URI) public returns (uint) {
    uint256 newItemId = _tokenIds.current();
    _mint(to, newItemId);
    _setTokenURI(newItemId, token_URI);

    _tokenIds.increment();
    accessoriesURLList.push(token_URI);
    return newItemId;
  }

  function getAccessoriesURLList() external view returns (string[] memory) {
    return accessoriesURLList;
  }

  //  add an array of objects to keep track of accessories

}
