// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import { BlackGold } from "../src/BGLD.sol";

contract InvariantTest is Test {
    BlackGold internal blackGold;
    
    function setUp() public {
        blackGold = new BlackGold();
    }
}
