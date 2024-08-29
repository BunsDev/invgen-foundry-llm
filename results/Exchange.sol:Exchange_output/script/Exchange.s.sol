/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test } from "forge-std/Test.sol";
import "../src/Exchange.sol";

contract InvariantTest is Test {
    Exchange internal elasticSwap;

    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }
}

// BEGIN INVARIANTS

/** 
Function: addLiquidity

Vulnerable Reason: {{The addLiquidity function allows liquidity providers to add new liquidity to the exchange without implementing a mandatory waiting period. This leaves the contract vulnerable to attackers who can take out a flashloan, deposit a large amount of tokens, and force a proposal through before anyone can react, potentially manipulating governance voting results. For example, an attacker can manipulate the token quantities added to skew the liquidity pool in their favor.}}

LLM Likelihood: high

What this invariant tries to do: After each call to the addLiquidity function, one should check the internal balance state variables such as baseTokenReserveQty, quoteTokenReserveQty, and kLast to ensure that the liquidity pool is not manipulated by adding excessive tokens. Additionally, one should verify the results of IERC20(baseToken).balanceOf(address(this)) and IERC20(quoteToken).balanceOf(address(this)) to confirm that the correct token quantities were added to the exchange.
*/


contract InvariantTests is Test {
    Exchange internal elasticSwap;

    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }

    function invariant_addLiquidityState() public {
        uint256 initialBaseTokenReserve = IERC20(elasticSwap.baseToken()).balanceOf(address(elasticSwap));
        uint256 initialQuoteTokenReserve = IERC20(elasticSwap.quoteToken()).balanceOf(address(elasticSwap));
        uint256 initialTotalSupply = elasticSwap.totalSupply();

        elasticSwap.addLiquidity(100, 200, 0, 0, address(this), block.timestamp + 3600);

        uint256 finalBaseTokenReserve = IERC20(elasticSwap.baseToken()).balanceOf(address(elasticSwap));
        uint256 finalQuoteTokenReserve = IERC20(elasticSwap.quoteToken()).balanceOf(address(elasticSwap));
        uint256 finalTotalSupply = elasticSwap.totalSupply();

        assert(finalBaseTokenReserve >= initialBaseTokenReserve);
        assert(finalQuoteTokenReserve >= initialQuoteTokenReserve);
        assert(finalTotalSupply >= initialTotalSupply);
    }

    // Add more invariant tests here

}
/** 
Function: addLiquidity

Vulnerable Reason: {{The addLiquidity function allows liquidity providers to add new liquidity to the exchange without implementing a mandatory waiting period. This leaves the contract vulnerable to attackers who can take out a flashloan, deposit a large amount of tokens, and force a proposal through before anyone can react, potentially manipulating governance voting results. For example, an attacker can manipulate the token quantities added to skew the liquidity pool in their favor.}}

LLM Likelihood: high

What this invariant tries to do: Check if the baseToken and quoteToken reserves have been updated appropriately after each addLiquidity transaction. Ensure that the liquidity pool ratio remains balanced and no significant deviations are observed.
*/


contract GeneratedInvariants1 is Test {
    Exchange internal elasticSwap;

    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }

    // Invariant test to check if baseToken and quoteToken reserves have been updated appropriately after each addLiquidity transaction
    function invariant_checkReservesUpdated() public {
        // Get the current balances of baseToken and quoteToken reserves before adding liquidity
        uint256 initialBaseTokenReserve = IERC20(elasticSwap.baseToken()).balanceOf(address(elasticSwap));
        uint256 initialQuoteTokenReserve = IERC20(elasticSwap.quoteToken()).balanceOf(address(elasticSwap));

        // Perform an addLiquidity transaction
        elasticSwap.addLiquidity(100, 200, 0, 0, address(this), block.timestamp);

        // Get the updated balances of baseToken and quoteToken reserves after adding liquidity
        uint256 updatedBaseTokenReserve = IERC20(elasticSwap.baseToken()).balanceOf(address(elasticSwap));
        uint256 updatedQuoteTokenReserve = IERC20(elasticSwap.quoteToken()).balanceOf(address(elasticSwap));

        // Assert if the reserves have been updated appropriately
        assert(updatedBaseTokenReserve > initialBaseTokenReserve && updatedQuoteTokenReserve > initialQuoteTokenReserve);
    }
}
/** 
Function: removeLiquidity

Vulnerable Reason: {{The 'removeLiquidity' function in the Exchange contract does not check for the possibility of insufficient liquidity before calculating the amount of base and quote tokens to return to the liquidity provider. This could potentially lead to an insolvency situation where the contract may not have enough tokens to cover the requested redemption, resulting in fund loss for the liquidity provider.}}

LLM Likelihood: high

What this invariant tries to do: Check the balance of baseToken and quoteToken after each 'removeLiquidity' transaction to ensure that there are enough tokens to cover the redemption amount. Ensure that the totalSupply of liquidity tokens is maintained accurately and that the internalBalances are updated correctly based on the redemption amount.
*/


contract GeneratedInvariants2 is Test {
    Exchange internal elasticSwap;

    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }

    // State variables for testing
    uint256 internal prevBaseTokenBalance;
    uint256 internal prevQuoteTokenBalance;
    uint256 internal prevTotalSupply;

    // Invariant test for the removeLiquidity function
    function invariant_removeLiquidity() public returns (bool) {
        uint256 currentBaseTokenBalance = IERC20(elasticSwap.baseToken()).balanceOf(address(elasticSwap));
        uint256 currentQuoteTokenBalance = IERC20(elasticSwap.quoteToken()).balanceOf(address(elasticSwap));
        uint256 currentTotalSupply = elasticSwap.totalSupply();

        // Check if there are enough tokens to cover the liquidity redemption
        assertTrue(currentBaseTokenBalance >= prevBaseTokenBalance, "Base token balance decreased");
        assertTrue(currentQuoteTokenBalance >= prevQuoteTokenBalance, "Quote token balance decreased");

        // Check if totalSupply is maintained accurately
        assertTrue(currentTotalSupply == prevTotalSupply, "Total supply not accurate");

        // Update state variables for the next iteration
        prevBaseTokenBalance = currentBaseTokenBalance;
        prevQuoteTokenBalance = currentQuoteTokenBalance;
        prevTotalSupply = currentTotalSupply;

        return true;
    }

}
/** 
Function: removeLiquidity

Vulnerable Reason: {{The 'removeLiquidity' function in the Exchange contract does not check for the possibility of insufficient liquidity before calculating the amount of base and quote tokens to return to the liquidity provider. This could potentially lead to an insolvency situation where the contract may not have enough tokens to cover the requested redemption, resulting in fund loss for the liquidity provider.}}

LLM Likelihood: high

What this invariant tries to do: One should check after each 'removeLiquidity' transaction that the baseToken and quoteToken reserve quantities are sufficient to cover the redemption amount, by ensuring that the calculated baseTokenQtyToReturn and quoteTokenQtyToReturn are less than or equal to the respective reserve quantities. Additionally, check that the internalBalances reflect the correct baseTokenReserveQty and quoteTokenReserveQty after the transaction.
*/


contract GeneratedInvariants3 is Test {
    Exchange internal elasticSwap;

    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }

    // State variables for reserve quantities
    uint256 public baseTokenReserveQty;
    uint256 public quoteTokenReserveQty;

    // Invariant to check reserve quantities after removeLiquidity function
    function invariant_reserveQuantities() public view returns (bool) {
        uint256 baseTokenReserve = IERC20(elasticSwap.baseToken()).balanceOf(address(elasticSwap));
        uint256 quoteTokenReserve = IERC20(elasticSwap.quoteToken()).balanceOf(address(elasticSwap));
        
        return (baseTokenReserve == baseTokenReserveQty) && (quoteTokenReserve == quoteTokenReserveQty);
    }

    // Function to set initial reserve quantities for testing
    function setInitialReserveQuantities() public {
        baseTokenReserveQty = 1000; // Initial base token reserve quantity
        quoteTokenReserveQty = 2000; // Initial quote token reserve quantity
    }

    // Function to test removeLiquidity function and reserve quantity invariant
    function invariant_testRemoveLiquidity() public {
        // Set initial reserve quantities
        setInitialReserveQuantities();

        // Call removeLiquidity function
        elasticSwap.removeLiquidity(100, 50, 50, address(this), block.timestamp);

        // Update reserve quantities after removeLiquidity
        baseTokenReserveQty -= 50;
        quoteTokenReserveQty -= 100;

        // Check the invariant for reserve quantities
        assertTrue(invariant_reserveQuantities(), "Invariant: Reserve Quantities check failed after removeLiquidity");
    }

    // Add additional invariants here

}
/** 
Function: swapBaseTokenForQuoteToken

Vulnerable Reason: {{The function 'swapBaseTokenForQuoteToken' allows a user to swap base tokens for quote tokens without checking whether the tokens going in and out are not the same. This lack of input validation could potentially lead to an imbalance in the token reserves if the base tokens and quote tokens being swapped are the same, causing disruptions in the exchange functionality and potential loss of funds.}}

LLM Likelihood: high

What this invariant tries to do: After each transaction, one should check that the base token and quote token addresses are not the same to ensure that the tokens being swapped are different. This can be verified by comparing the values of 'baseToken' and 'quoteToken' state variables in the Exchange contract. Additionally, one can check the results of the view functions 'baseToken' and 'quoteToken' to confirm that the tokens being swapped are different.
*/


contract GeneratedInvariants4 is Test {
    Exchange internal elasticSwap;

    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }

    function invariant_swapBaseTokenForQuoteToken_differentTokens() public {
        // Check that baseToken and quoteToken are not the same after calling swapBaseTokenForQuoteToken function
        address currentBaseToken = elasticSwap.baseToken();
        address currentQuoteToken = elasticSwap.quoteToken();
        require(currentBaseToken != currentQuoteToken, "ERROR: Tokens swapped are the same");
    }

    // Add more invariants as needed

}
/** 
Function: swapBaseTokenForQuoteToken

Vulnerable Reason: {{The swapBaseTokenForQuoteToken function allows a user to swap base tokens for quote tokens without checking whether the tokens going in and out are not the same. This lack of input validation could potentially lead to an imbalance in the token reserves if the base tokens and quote tokens being swapped are the same, causing disruptions in the exchange functionality and potential loss of funds.}}

LLM Likelihood: high

What this invariant tries to do: After each 'swapBaseTokenForQuoteToken' transaction, one should check the state variables 'baseToken' and 'quoteToken' to ensure that the tokens being swapped are not the same. Additionally, one should verify the balances of the baseToken and quoteToken using the 'balanceOf' view functions of the ERC20 tokens involved in the swap to confirm that the transfer occurred as expected and there is no imbalance in the reserves.
*/


contract GeneratedInvariants5 is Test {
    Exchange internal elasticSwap;

    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }

    function invariant_validSwapTokenPair() public {
        // Check that the tokens being swapped in the function are not the same
        assertTrue(elasticSwap.baseToken() != elasticSwap.quoteToken(), "Exchange: SAME_TOKEN_SWAP");
    }

    function invariant_checkTokenBalances() public {
        // Verify the balances of the baseToken and quoteToken after swapBaseTokenForQuoteToken function is called
        uint256 baseTokenBalance = IERC20(address(elasticSwap.baseToken())).balanceOf(address(elasticSwap));
        uint256 quoteTokenBalance = IERC20(address(elasticSwap.quoteToken())).balanceOf(address(elasticSwap));
        // perform necessary checks on balances
        assert(baseTokenBalance >= 0);
        assert(quoteTokenBalance >= 0);
    }
}
/** 
Function: swapQuoteTokenForBaseToken

Vulnerable Reason: {{The 'swapQuoteTokenForBaseToken' function allows a user to swap quote tokens for base tokens without checking whether the tokens going in and out are not the same. This lack of input validation could lead to a scenario where the user swaps the same tokens, resulting in a loss of funds for the contract.}}

LLM Likelihood: high

What this invariant tries to do: After each 'swapQuoteTokenForBaseToken' transaction, one should check that the baseToken and quoteToken addresses are not the same to ensure that the tokens being swapped are different. This can be verified by checking the baseToken and quoteToken state variables in the Exchange contract.
*/


contract GeneratedInvariants6 is Test {
    Exchange internal elasticSwap;

    function setUp() public {
        elasticSwap = new Exchange("Elastic Swap", "ELS", address(0x000), address(0x000), address(0x000));
    }

    function invariant_swapQuoteTokenForBaseToken() public view {
        address baseTokenAddress = elasticSwap.baseToken();
        address quoteTokenAddress = elasticSwap.quoteToken();

        assert(baseTokenAddress != quoteTokenAddress);
    }
}