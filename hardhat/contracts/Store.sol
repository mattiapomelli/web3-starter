//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Store {
    string private data;

    constructor(string memory _data) {
        console.log("Deploying Store with data:", _data);
        data = _data;
    }

    function getData() public view returns (string memory) {
        return data;
    }

    function setData(string memory _data) public {
        console.log("Changing data from '%s' to '%s'", data, _data);
        data = _data;
    }
}
