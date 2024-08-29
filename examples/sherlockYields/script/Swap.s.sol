// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import "../src/Swap.sol";

contract InvariantTest is Test {
    Swap internal swap;
    
    function setUp() public {
        swap = new Swap(0x00000000000000000000000071da8fd0181f9713e22f826f79d407105f4fdbab, address(0x00), address(0x00));
    }
}
