// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import "../src/Dodo.sol";

contract InvariantTest is Test {
    DVM internal dvm;
    
    function setUp() public {
        dvm = new DVM();
    }
}
