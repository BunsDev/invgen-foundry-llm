// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import "../src/GYMNetwork.sol";

contract InvariantTest is Test {
    GymSinglePool internal gymSinglePool;
    
    function setUp() public {
        gymSinglePool = new GymSinglePool();
    }
}
