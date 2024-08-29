/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test } from "forge-std/Test.sol";
import { AbsToken } from "../src/ARK.sol";
import { CheatCodes } from "../src/interfaces/CheatCodes.sol";
import { StdInvariant } from "forge-std/StdInvariant.sol";

contract InvariantTest is StdInvariant, Test {
    AbsToken internal absToken;
    CheatCodes internal cheats = CheatCodes(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    function setUp() public {
        cheats.createSelectFork("bsc", 39898477);
        absToken = new AbsToken();
        deal(address(absToken), address(absToken._mainPair()), 4 ether);
    }
}