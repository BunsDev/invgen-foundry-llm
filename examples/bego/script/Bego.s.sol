// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "src/Bego.sol";

contract InvariantTest is Script {
    BEP20 bep20;
    function setUp() public {
        bep20 = new BEP20("TokenName", "TKN");
    }
}