/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import { BecToken } from "../src/bectoken.sol";

contract InvariantTest is Test {
    BecToken internal becToken;

    function setUp() public {
        becToken = new BecToken();
    }
}