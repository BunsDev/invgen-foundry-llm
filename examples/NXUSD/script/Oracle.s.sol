// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import "../src/JLPWAVAXUSDCOracle.sol";

contract InvariantTest is Test {
    JLPWAVAXUSDCOracle internal NXUSDOracle;
    
    function setUp() public {
        NXUSDOracle = new JLPWAVAXUSDCOracle();
    }
}
