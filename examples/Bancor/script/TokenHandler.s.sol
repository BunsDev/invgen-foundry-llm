// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import "../src/TokenHandler.sol";

contract InvariantTest is Test {
    TokenHandler internal tokenHandler;
    
    function setUp() public {
        tokenHandler = new TokenHandler();
    }
}
