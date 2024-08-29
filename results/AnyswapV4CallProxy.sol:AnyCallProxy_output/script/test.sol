pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "src/AnyswapV4CallProxy.sol";

contract InvariantTest is Test {
    AnyCallProxy internal anycallproxy;

    function setUp() public {
        anycallproxy = new AnyCallProxy(address(this));
    }
}