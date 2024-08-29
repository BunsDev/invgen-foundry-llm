// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.4;
pragma experimental ABIEncoderV2;

import { Test } from "forge-std/Test.sol";
import "../src/Meter.sol";

contract InvariantTest is Test {
    Bridge internal meterBridge;
    
    function setUp() public {
        address[] memory addr = new address[](1);
        addr[0] = 0xf6C75eA68BeC6205deF2C5a4043ab9f4f85bb9ea;
        meterBridge = new Bridge(4, addr, 1, 0, 28800);
    }
}

