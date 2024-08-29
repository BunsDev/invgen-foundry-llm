// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import { Test } from "forge-std/Test.sol";
import "../src/Curve.sol";

contract InvariantTest is Test {
    Curve internal curve;    
    function setUp() public {
       address[] memory t = new address[](2);
       t[0] = 0xB4a925BAe55743AcF3Dc65a8de0b9507F0491617;
       t[1] = 0x288071244112050c93389A950d02c9E626D611dD;
       uint256[] memory weights = new uint256[](2);
       weights[0] = 5;
       weights[1] = 5;       
       curve = new Curve("DFXFinance", "DFX", t, weights);
    }
}

