// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import { BaconToken } from "../src/BaconToken.sol";
import { VestingVault } from "../src/VestingVault.sol";

contract InvariantTest is Test {
    VestingVault internal vestingVault;
    
    function setUp() public {
        vestingVault = new VestingVault(new BaconToken("BaconToken", "BAC", 10000));
    }
}
