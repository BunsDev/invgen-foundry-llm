// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import "../src/melo.sol";

contract InvariantTest is Test {
    cERC20 internal melo;
    
    function setUp() public {
        melo = new cERC20("Melo", "MEL", 5, msg.sender, 10000);
    }
}
