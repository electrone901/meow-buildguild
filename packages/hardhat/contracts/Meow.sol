// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./XPToken.sol";
import "./CatNFT.sol";
import "./AccessoriesNFT.sol";

contract Meow {

  XPToken public xptoken;
  CatNFT public catNFT;
  AccessoriesNFT public accessoriesNFT;

  //  struct Cat {
  //   uint id;
  //   uint totalDonations;
  //   uint targetDonations;
  //   string description;
  //   string breed;
  //   uint weight;
  //   uint height;
  // }

  struct Cat {
    uint id;
    string name;
    uint totalDonations;
    uint targetDonations;
    string description;
    string reason;
    string breed;
    string traits;
    uint weight;
    uint height;
  }

  mapping(address => Cat) public catOwners;
  mapping(uint => Cat) public cats;
  mapping(address => uint) public ownerToPetID;
  mapping(address => uint) public ownerToAccessoryID;
  mapping(address => string) public ownerToBackground;

  constructor(address token_address, address cats_address, address accessories_address) {
    xptoken = XPToken(token_address);
    catNFT = CatNFT(cats_address);
    accessoriesNFT = AccessoriesNFT(accessories_address);
  }

  /**
    * Create and mint Cat NFT
    */
  function createCat(
    string memory token_URI,
    string memory name,
    uint targetDonations,
    string memory description,
    string memory reason,
    string memory breed,
    string memory traits,
    uint weight,
    uint height
) external {
    uint nft_id = catNFT.mint(msg.sender, token_URI);
    Cat memory newCat = Cat({
        id: nft_id,
        name: name,
        totalDonations: 0,
        targetDonations: targetDonations,
        description: description, // Provide an argument for the description field
        reason: reason,
        breed: breed,
        traits: traits,
        weight: weight,
        height: height
    });
    catOwners[msg.sender] = newCat;
    cats[nft_id] = newCat;
}



  function getCat(uint catId) external view returns (uint id, string memory name,  uint totalDonations, uint targetDonations, string memory reason, string memory breed, string memory traits, uint weight, uint height) {
    Cat storage cat = cats[catId];
    require(cat.id != 0, "Cat not found");
    return (cat.id, cat.name, cat.totalDonations, cat.targetDonations, cat.reason, cat.breed, cat.traits, cat.weight, cat.height);
  }

  /**
    * Donate function to add amount to total donations
    */
  function donate(uint catId, uint amount, address sender) external {
    Cat storage cat = cats[catId];
    // require(cat.id != 0, "Cat not found");
    cat.totalDonations += amount;
    // xptoken.transferFrom(sender, address(this), amount); // Assuming XPToken is ERC20 compliant
  }

  /**
    * Earn XP
    */
  function earnXP(uint amount) external {
   xptoken.mint(msg.sender, amount);
  }

   /**
    * Purchase accessory and mint it as NFT
    */
  function purchaseAccessory(string memory token_URI) external {
    uint nft_id = accessoriesNFT.mint(msg.sender, token_URI);
    ownerToAccessoryID[msg.sender] = nft_id;
    xptoken.burn(msg.sender, 1000000000000000000);
  }

   /**
    * Buy and set background
    */
  function setBackground(string memory backgroundURI) external {
    ownerToBackground[msg.sender] = backgroundURI;
    xptoken.burn(msg.sender, 100000000000000000000);
  }

}
