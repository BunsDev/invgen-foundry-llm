// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test } from "forge-std/Test.sol";
import "../src/Exchange.sol";

contract InvariantTest is Test {
    Exchange internal elasticSwap;
    
    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }
}
