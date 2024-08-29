// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import { Test } from "forge-std/Test.sol";
import "../src/Monoswap.sol";

contract InvariantTest is Test {
    Monoswap internal monoSwap;
    
    function setUp() public {
        monoSwap = new Monoswap();
    }
}
