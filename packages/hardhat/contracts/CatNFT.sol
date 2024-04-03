// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CatNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  string[] public catURLList;

  constructor() ERC721("Cat NFT", "CAT") {}

  function mint(address to, string memory token_URI) public returns (uint) {
    uint256 newItemId = _tokenIds.current();
    _mint(to, newItemId);
    _setTokenURI(newItemId, token_URI);

    _tokenIds.increment();
    catURLList.push(token_URI);
    return newItemId;
  }

  function getCatURLList() external view returns (string[] memory) {
    return catURLList;
  }
}