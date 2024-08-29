// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;
pragma experimental ABIEncoderV2;


import { Test } from "forge-std/Test.sol";
import "../src/Dao.sol";

contract InvariantTest is Test {
    GovernanceFacet internal dao;
    
    function setUp() public {
        dao = new GovernanceFacet();
    }
}

