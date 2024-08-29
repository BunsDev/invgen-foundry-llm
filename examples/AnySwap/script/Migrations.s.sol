pragma solidity >=0.4.22 <0.8.0;
pragma abicoder v2;

import { Test } from "forge-std/Test.sol";
import { Migrations } from "../src/Migrations.sol";

contract InvariantTest is Test {
    Migrations internal migrations;
    
    function setUp() public {
        migrations = new Migrations();
    }
}

