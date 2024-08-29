// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import "../src/EToken.sol";

contract InvariantTest is Test {
    EToken internal EulerFinanceToken;
    
    function setUp() public {
        EulerFinanceToken = new EToken(0x0000000000000000000000000fade57d9ede7b010f943fa8ad3ad74b9c30e283);
    }
}
