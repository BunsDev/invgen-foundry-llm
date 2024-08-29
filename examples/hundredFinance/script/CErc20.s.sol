// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import { Test } from "forge-std/Test.sol";
import "../src/CErc20.sol";

contract InvariantTest is Test {
    CErc20 internal hundredFinance;
    
    function setUp() public {
        hundredFinance = new CErc20();
    }
}
