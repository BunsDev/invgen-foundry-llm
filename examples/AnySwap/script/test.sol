 pragma solidity ^0.8.0;
 
 import "forge-std/Test.sol";
 import "src/AnyswapV4Router.sol";
 
 contract InvariantTest is Test {
    AnyswapV4Router anyswapRouter;
    
    function setUp() public {
        anyswapRouter = new AnyswapV4Router(0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac,0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,0x8b44a687224496276811555EFa3f2d0Acd667a72);
    }
 }
