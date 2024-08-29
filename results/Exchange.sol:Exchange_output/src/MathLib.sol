/// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./Exchange.sol";

///  @title MathLib
///  @author ElasticDAO
library MathLib {
    struct InternalBalances {
        uint256 baseTokenReserveQty;
        uint256 quoteTokenReserveQty;
        uint256 kLast;
    }

    struct TokenQtys {
        uint256 baseTokenQty;
        uint256 quoteTokenQty;
        uint256 liquidityTokenQty;
        uint256 liquidityTokenFeeQty;
    }

    uint256 public constant BASIS_POINTS = 10000;
    uint256 public constant WAD = 10 ** 18;

    ///  @dev divides two float values, required since solidity does not handle
    ///  floating point values.
    ///  inspiration: https://github.com/dapphub/ds-math/blob/master/src/math.sol
    ///  NOTE: this rounds to the nearest integer (up or down). For example .666666 would end up
    ///  rounding to .66667.
    ///  @return uint256 wad value (decimal with 18 digits of precision)
    function wDiv(uint256 a, uint256 b) public pure returns (uint256) {
        return ((a * WAD) + (b / 2)) / b;
    }

    ///  @dev rounds a integer (a) to the nearest n places.
    ///  IE roundToNearest(123, 10) would round to the nearest 10th place (120).
    function roundToNearest(uint256 a, uint256 n) public pure returns (uint256) {
        return ((a + (n / 2)) / n) * n;
    }

    ///  @dev multiplies two float values, required since solidity does not handle
    ///  floating point values
    ///  inspiration: https://github.com/dapphub/ds-math/blob/master/src/math.sol
    ///  @return uint256 wad value (decimal with 18 digits of precision)
    function wMul(uint256 a, uint256 b) public pure returns (uint256) {
        return ((a * b) + (WAD / 2)) / WAD;
    }

    ///  @dev calculates an absolute diff between two integers. Basically the solidity
    ///  equivalent of Math.abs(a-b);
    function diff(uint256 a, uint256 b) public pure returns (uint256) {
        if (a >= b) {
            return a - b;
        }
        return b - a;
    }

    function sqrt(uint256 y) public pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = (y / 2) + 1;
            while (x < z) {
                z = x;
                x = ((y / x) + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    ///  @dev defines the amount of decay needed in order for us to require a user to handle the
    ///  decay prior to a double asset entry as the equivalent of 1 unit of quote token
    function isSufficientDecayPresent(uint256 _baseTokenReserveQty, InternalBalances memory _internalBalances) public pure returns (bool) {
        return (wDiv(diff(_baseTokenReserveQty, _internalBalances.baseTokenReserveQty) * WAD, wDiv(_internalBalances.baseTokenReserveQty, _internalBalances.quoteTokenReserveQty)) >= WAD);
    }

    ///  @dev used to calculate the qty of token a liquidity provider
    ///  must add in order to maintain the current reserve ratios
    ///  @param _tokenAQty base or quote token qty to be supplied by the liquidity provider
    ///  @param _tokenAReserveQty current reserve qty of the base or quote token (same token as tokenA)
    ///  @param _tokenBReserveQty current reserve qty of the other base or quote token (not tokenA)
    function calculateQty(uint256 _tokenAQty, uint256 _tokenAReserveQty, uint256 _tokenBReserveQty) public pure returns (uint256 tokenBQty) {
        require(_tokenAQty > 0, "MathLib: INSUFFICIENT_QTY");
        require((_tokenAReserveQty > 0) && (_tokenBReserveQty > 0), "MathLib: INSUFFICIENT_LIQUIDITY");
        tokenBQty = (_tokenAQty * _tokenBReserveQty) / _tokenAReserveQty;
    }

    ///  @dev used to calculate the qty of token a trader will receive (less fees)
    ///  given the qty of token A they are providing
    ///  @param _tokenASwapQty base or quote token qty to be swapped by the trader
    ///  @param _tokenAReserveQty current reserve qty of the base or quote token (same token as tokenA)
    ///  @param _tokenBReserveQty current reserve qty of the other base or quote token (not tokenA)
    ///  @param _liquidityFeeInBasisPoints fee to liquidity providers represented in basis points
    function calculateQtyToReturnAfterFees(uint256 _tokenASwapQty, uint256 _tokenAReserveQty, uint256 _tokenBReserveQty, uint256 _liquidityFeeInBasisPoints) public pure returns (uint256 qtyToReturn) {
        uint256 tokenASwapQtyLessFee = _tokenASwapQty * (BASIS_POINTS - _liquidityFeeInBasisPoints);
        qtyToReturn = (tokenASwapQtyLessFee * _tokenBReserveQty) / ((_tokenAReserveQty * BASIS_POINTS) + tokenASwapQtyLessFee);
    }

    ///  @dev used to calculate the qty of liquidity tokens (deltaRo) we will be issued to a supplier
    ///  of a single asset entry when decay is present.
    ///  @param _totalSupplyOfLiquidityTokens the total supply of our exchange's liquidity tokens (aka Ro)
    ///  @param _tokenQtyAToAdd the amount of tokens being added by the caller to remove the current decay
    ///  @param _internalTokenAReserveQty the internal balance (X or Y) of token A as a result of this transaction
    ///  @param _tokenBDecayChange the change that will occur in the decay in the opposite token as a result of
    ///  this transaction
    ///  @param _tokenBDecay the amount of decay in tokenB
    ///  @return liquidityTokenQty qty of liquidity tokens to be issued in exchange
    function calculateLiquidityTokenQtyForSingleAssetEntry(uint256 _totalSupplyOfLiquidityTokens, uint256 _tokenQtyAToAdd, uint256 _internalTokenAReserveQty, uint256 _tokenBDecayChange, uint256 _tokenBDecay) public pure returns (uint256 liquidityTokenQty) {
        uint256 wGamma = (wDiv((wMul(wDiv(_tokenQtyAToAdd, _internalTokenAReserveQty), _tokenBDecayChange * WAD)), _tokenBDecay) / WAD) / 2;
        liquidityTokenQty = wDiv(wMul(_totalSupplyOfLiquidityTokens * WAD, wGamma), WAD - wGamma) / WAD;
    }

    ///  @dev used to calculate the qty of liquidity tokens (deltaRo) we will be issued to a supplier
    ///  of a single asset entry when decay is present.
    ///  @param _totalSupplyOfLiquidityTokens the total supply of our exchange's liquidity tokens (aka Ro)
    ///  @param _quoteTokenQty the amount of quote token the user it adding to the pool (deltaB or deltaY)
    ///  @param _quoteTokenReserveBalance the total balance (external) of quote tokens in our pool (Beta)
    ///  @return liquidityTokenQty qty of liquidity tokens to be issued in exchange
    function calculateLiquidityTokenQtyForDoubleAssetEntry(uint256 _totalSupplyOfLiquidityTokens, uint256 _quoteTokenQty, uint256 _quoteTokenReserveBalance) public pure returns (uint256 liquidityTokenQty) {
        liquidityTokenQty = (_quoteTokenQty * _totalSupplyOfLiquidityTokens) / _quoteTokenReserveBalance;
    }

    ///  @dev used to calculate the qty of quote token required and liquidity tokens (deltaRo) to be issued
    ///  in order to add liquidity and remove base token decay.
    ///  @param _quoteTokenQtyDesired the amount of quote token the user wants to contribute
    ///  @param _quoteTokenQtyMin the minimum amount of quote token the user wants to contribute (allows for slippage)
    ///  @param _baseTokenReserveQty the external base token reserve qty prior to this transaction
    ///  @param _totalSupplyOfLiquidityTokens the total supply of our exchange's liquidity tokens (aka Ro)
    ///  @param _internalBalances internal balances struct from our exchange's internal accounting
    ///  @return quoteTokenQty qty of quote token the user must supply
    ///  @return liquidityTokenQty qty of liquidity tokens to be issued in exchange
    function calculateAddQuoteTokenLiquidityQuantities(uint256 _quoteTokenQtyDesired, uint256 _quoteTokenQtyMin, uint256 _baseTokenReserveQty, uint256 _totalSupplyOfLiquidityTokens, InternalBalances storage _internalBalances) public returns (uint256 quoteTokenQty, uint256 liquidityTokenQty) {
        uint256 baseTokenDecay = _baseTokenReserveQty - _internalBalances.baseTokenReserveQty;
        uint256 wInternalBaseTokenToQuoteTokenRatio = wDiv(_internalBalances.baseTokenReserveQty, _internalBalances.quoteTokenReserveQty);
        uint256 maxQuoteTokenQty = wDiv(baseTokenDecay, wInternalBaseTokenToQuoteTokenRatio);
        require(_quoteTokenQtyMin < maxQuoteTokenQty, "MathLib: INSUFFICIENT_DECAY");
        if (_quoteTokenQtyDesired > maxQuoteTokenQty) {
            quoteTokenQty = maxQuoteTokenQty;
        } else {
            quoteTokenQty = _quoteTokenQtyDesired;
        }
        uint256 baseTokenQtyDecayChange = roundToNearest((quoteTokenQty * wInternalBaseTokenToQuoteTokenRatio), WAD) / WAD;
        require(baseTokenQtyDecayChange > 0, "MathLib: INSUFFICIENT_CHANGE_IN_DECAY");
        _internalBalances.baseTokenReserveQty += baseTokenQtyDecayChange;
        _internalBalances.quoteTokenReserveQty += quoteTokenQty;
        liquidityTokenQty = calculateLiquidityTokenQtyForSingleAssetEntry(_totalSupplyOfLiquidityTokens, quoteTokenQty, _internalBalances.quoteTokenReserveQty, baseTokenQtyDecayChange, baseTokenDecay);
        return (quoteTokenQty, liquidityTokenQty);
    }

    ///  @dev used to calculate the qty of base tokens required and liquidity tokens (deltaRo) to be issued
    ///  in order to add liquidity and remove base token decay.
    ///  @param _baseTokenQtyDesired the amount of base token the user wants to contribute
    ///  @param _baseTokenQtyMin the minimum amount of base token the user wants to contribute (allows for slippage)
    ///  @param _baseTokenReserveQty the external base token reserve qty prior to this transaction
    ///  @param _totalSupplyOfLiquidityTokens the total supply of our exchange's liquidity tokens (aka Ro)
    ///  @param _internalBalances internal balances struct from our exchange's internal accounting
    ///  @return baseTokenQty qty of base token the user must supply
    ///  @return liquidityTokenQty qty of liquidity tokens to be issued in exchange
    function calculateAddBaseTokenLiquidityQuantities(uint256 _baseTokenQtyDesired, uint256 _baseTokenQtyMin, uint256 _baseTokenReserveQty, uint256 _totalSupplyOfLiquidityTokens, InternalBalances memory _internalBalances) public pure returns (uint256 baseTokenQty, uint256 liquidityTokenQty) {
        uint256 maxBaseTokenQty = _internalBalances.baseTokenReserveQty - _baseTokenReserveQty;
        require(_baseTokenQtyMin < maxBaseTokenQty, "MathLib: INSUFFICIENT_DECAY");
        if (_baseTokenQtyDesired > maxBaseTokenQty) {
            baseTokenQty = maxBaseTokenQty;
        } else {
            baseTokenQty = _baseTokenQtyDesired;
        }
        uint256 wInternalQuoteToBaseTokenRatio = wDiv(_internalBalances.quoteTokenReserveQty, _internalBalances.baseTokenReserveQty);
        uint256 quoteTokenQtyDecayChange = roundToNearest((baseTokenQty * wInternalQuoteToBaseTokenRatio), MathLib.WAD) / WAD;
        require(quoteTokenQtyDecayChange > 0, "MathLib: INSUFFICIENT_CHANGE_IN_DECAY");
        uint256 quoteTokenDecay = (maxBaseTokenQty * wInternalQuoteToBaseTokenRatio) / WAD;
        require(quoteTokenDecay > 0, "MathLib: NO_QUOTE_DECAY");
        liquidityTokenQty = calculateLiquidityTokenQtyForSingleAssetEntry(_totalSupplyOfLiquidityTokens, baseTokenQty, _internalBalances.baseTokenReserveQty, quoteTokenQtyDecayChange, quoteTokenDecay);
        return (baseTokenQty, liquidityTokenQty);
    }

    ///  @dev used to calculate the qty of tokens a user will need to contribute and be issued in order to add liquidity
    ///  @param _baseTokenQtyDesired the amount of base token the user wants to contribute
    ///  @param _quoteTokenQtyDesired the amount of quote token the user wants to contribute
    ///  @param _baseTokenQtyMin the minimum amount of base token the user wants to contribute (allows for slippage)
    ///  @param _quoteTokenQtyMin the minimum amount of quote token the user wants to contribute (allows for slippage)
    ///  @param _baseTokenReserveQty the external base token reserve qty prior to this transaction
    ///  @param _quoteTokenReserveQty the external quote token reserve qty prior to this transaction
    ///  @param _totalSupplyOfLiquidityTokens the total supply of our exchange's liquidity tokens (aka Ro)
    ///  @param _internalBalances internal balances struct from our exchange's internal accounting
    ///  @return tokenQtys qty of tokens needed to complete transaction 
    function calculateAddLiquidityQuantities(uint256 _baseTokenQtyDesired, uint256 _quoteTokenQtyDesired, uint256 _baseTokenQtyMin, uint256 _quoteTokenQtyMin, uint256 _baseTokenReserveQty, uint256 _quoteTokenReserveQty, uint256 _totalSupplyOfLiquidityTokens, InternalBalances storage _internalBalances) public returns (TokenQtys memory tokenQtys) {
        if (_totalSupplyOfLiquidityTokens > 0) {
            tokenQtys.liquidityTokenFeeQty = calculateLiquidityTokenFees(_totalSupplyOfLiquidityTokens, _internalBalances);
            _totalSupplyOfLiquidityTokens += tokenQtys.liquidityTokenFeeQty;
            if (isSufficientDecayPresent(_baseTokenReserveQty, _internalBalances)) {
                uint256 baseTokenQtyFromDecay;
                uint256 quoteTokenQtyFromDecay;
                uint256 liquidityTokenQtyFromDecay;
                if (_baseTokenReserveQty > _internalBalances.baseTokenReserveQty) {
                    (quoteTokenQtyFromDecay, liquidityTokenQtyFromDecay) = calculateAddQuoteTokenLiquidityQuantities(_quoteTokenQtyDesired, 0, _baseTokenReserveQty, _totalSupplyOfLiquidityTokens, _internalBalances);
                } else {
                    (baseTokenQtyFromDecay, liquidityTokenQtyFromDecay) = calculateAddBaseTokenLiquidityQuantities(_baseTokenQtyDesired, 0, _baseTokenReserveQty, _totalSupplyOfLiquidityTokens, _internalBalances);
                }
                if ((quoteTokenQtyFromDecay < _quoteTokenQtyDesired) && (baseTokenQtyFromDecay < _baseTokenQtyDesired)) {
                    (tokenQtys.baseTokenQty, tokenQtys.quoteTokenQty, tokenQtys.liquidityTokenQty) = calculateAddTokenPairLiquidityQuantities(_baseTokenQtyDesired - baseTokenQtyFromDecay, _quoteTokenQtyDesired - quoteTokenQtyFromDecay, 0, 0, _quoteTokenReserveQty + quoteTokenQtyFromDecay, _totalSupplyOfLiquidityTokens + liquidityTokenQtyFromDecay, _internalBalances);
                }
                tokenQtys.baseTokenQty += baseTokenQtyFromDecay;
                tokenQtys.quoteTokenQty += quoteTokenQtyFromDecay;
                tokenQtys.liquidityTokenQty += liquidityTokenQtyFromDecay;
                require(tokenQtys.baseTokenQty >= _baseTokenQtyMin, "MathLib: INSUFFICIENT_BASE_QTY");
                require(tokenQtys.quoteTokenQty >= _quoteTokenQtyMin, "MathLib: INSUFFICIENT_QUOTE_QTY");
            } else {
                (tokenQtys.baseTokenQty, tokenQtys.quoteTokenQty, tokenQtys.liquidityTokenQty) = calculateAddTokenPairLiquidityQuantities(_baseTokenQtyDesired, _quoteTokenQtyDesired, _baseTokenQtyMin, _quoteTokenQtyMin, _quoteTokenReserveQty, _totalSupplyOfLiquidityTokens, _internalBalances);
            }
        } else {
            require(_baseTokenQtyDesired > 0, "MathLib: INSUFFICIENT_BASE_QTY_DESIRED");
            require(_quoteTokenQtyDesired > 0, "MathLib: INSUFFICIENT_QUOTE_QTY_DESIRED");
            tokenQtys.baseTokenQty = _baseTokenQtyDesired;
            tokenQtys.quoteTokenQty = _quoteTokenQtyDesired;
            tokenQtys.liquidityTokenQty = sqrt(_baseTokenQtyDesired * _quoteTokenQtyDesired);
            _internalBalances.baseTokenReserveQty += tokenQtys.baseTokenQty;
            _internalBalances.quoteTokenReserveQty += tokenQtys.quoteTokenQty;
        }
    }

    ///  @dev calculates the qty of base and quote tokens required and liquidity tokens (deltaRo) to be issued
    ///  in order to add liquidity when no decay is present.
    ///  @param _baseTokenQtyDesired the amount of base token the user wants to contribute
    ///  @param _quoteTokenQtyDesired the amount of quote token the user wants to contribute
    ///  @param _baseTokenQtyMin the minimum amount of base token the user wants to contribute (allows for slippage)
    ///  @param _quoteTokenQtyMin the minimum amount of quote token the user wants to contribute (allows for slippage)
    ///  @param _quoteTokenReserveQty the external quote token reserve qty prior to this transaction
    ///  @param _totalSupplyOfLiquidityTokens the total supply of our exchange's liquidity tokens (aka Ro)
    ///  @param _internalBalances internal balances struct from our exchange's internal accounting
    ///  @return baseTokenQty qty of base token the user must supply
    ///  @return quoteTokenQty qty of quote token the user must supply
    ///  @return liquidityTokenQty qty of liquidity tokens to be issued in exchange
    function calculateAddTokenPairLiquidityQuantities(uint256 _baseTokenQtyDesired, uint256 _quoteTokenQtyDesired, uint256 _baseTokenQtyMin, uint256 _quoteTokenQtyMin, uint256 _quoteTokenReserveQty, uint256 _totalSupplyOfLiquidityTokens, InternalBalances storage _internalBalances) public returns (uint256 baseTokenQty, uint256 quoteTokenQty, uint256 liquidityTokenQty) {
        uint256 requiredQuoteTokenQty = calculateQty(_baseTokenQtyDesired, _internalBalances.baseTokenReserveQty, _internalBalances.quoteTokenReserveQty);
        if (requiredQuoteTokenQty <= _quoteTokenQtyDesired) {
            require(requiredQuoteTokenQty >= _quoteTokenQtyMin, "MathLib: INSUFFICIENT_QUOTE_QTY");
            baseTokenQty = _baseTokenQtyDesired;
            quoteTokenQty = requiredQuoteTokenQty;
        } else {
            uint256 requiredBaseTokenQty = calculateQty(_quoteTokenQtyDesired, _internalBalances.quoteTokenReserveQty, _internalBalances.baseTokenReserveQty);
            require(requiredBaseTokenQty >= _baseTokenQtyMin, "MathLib: INSUFFICIENT_BASE_QTY");
            baseTokenQty = requiredBaseTokenQty;
            quoteTokenQty = _quoteTokenQtyDesired;
        }
        liquidityTokenQty = calculateLiquidityTokenQtyForDoubleAssetEntry(_totalSupplyOfLiquidityTokens, quoteTokenQty, _quoteTokenReserveQty);
        _internalBalances.baseTokenReserveQty += baseTokenQty;
        _internalBalances.quoteTokenReserveQty += quoteTokenQty;
    }

    ///  @dev calculates the qty of base tokens a user will receive for swapping their quote tokens (less fees)
    ///  @param _quoteTokenQty the amount of quote tokens the user wants to swap
    ///  @param _baseTokenQtyMin the minimum about of base tokens they are willing to receive in return (slippage)
    ///  @param _baseTokenReserveQty the external base token reserve qty prior to this transaction
    ///  @param _liquidityFeeInBasisPoints the current total liquidity fee represented as an integer of basis points
    ///  @param _internalBalances internal balances struct from our exchange's internal accounting
    ///  @return baseTokenQty qty of base token the user will receive back
    function calculateBaseTokenQty(uint256 _quoteTokenQty, uint256 _baseTokenQtyMin, uint256 _baseTokenReserveQty, uint256 _liquidityFeeInBasisPoints, InternalBalances storage _internalBalances) public returns (uint256 baseTokenQty) {
        require((_baseTokenReserveQty > 0) && (_internalBalances.baseTokenReserveQty > 0), "MathLib: INSUFFICIENT_BASE_TOKEN_QTY");
        if (_baseTokenReserveQty < _internalBalances.baseTokenReserveQty) {
            uint256 wPricingRatio = wDiv(_internalBalances.baseTokenReserveQty, _internalBalances.quoteTokenReserveQty);
            uint256 impliedQuoteTokenQty = wDiv(_baseTokenReserveQty, wPricingRatio);
            baseTokenQty = calculateQtyToReturnAfterFees(_quoteTokenQty, impliedQuoteTokenQty, _baseTokenReserveQty, _liquidityFeeInBasisPoints);
        } else {
            baseTokenQty = calculateQtyToReturnAfterFees(_quoteTokenQty, _internalBalances.quoteTokenReserveQty, _internalBalances.baseTokenReserveQty, _liquidityFeeInBasisPoints);
        }
        require(baseTokenQty > _baseTokenQtyMin, "MathLib: INSUFFICIENT_BASE_TOKEN_QTY");
        _internalBalances.baseTokenReserveQty -= baseTokenQty;
        _internalBalances.quoteTokenReserveQty += _quoteTokenQty;
    }

    ///  @dev calculates the qty of quote tokens a user will receive for swapping their base tokens (less fees)
    ///  @param _baseTokenQty the amount of bases tokens the user wants to swap
    ///  @param _quoteTokenQtyMin the minimum about of quote tokens they are willing to receive in return (slippage)
    ///  @param _liquidityFeeInBasisPoints the current total liquidity fee represented as an integer of basis points
    ///  @param _internalBalances internal balances struct from our exchange's internal accounting
    ///  @return quoteTokenQty qty of quote token the user will receive back
    function calculateQuoteTokenQty(uint256 _baseTokenQty, uint256 _quoteTokenQtyMin, uint256 _liquidityFeeInBasisPoints, InternalBalances storage _internalBalances) public returns (uint256 quoteTokenQty) {
        require((_baseTokenQty > 0) && (_quoteTokenQtyMin > 0), "MathLib: INSUFFICIENT_TOKEN_QTY");
        quoteTokenQty = calculateQtyToReturnAfterFees(_baseTokenQty, _internalBalances.baseTokenReserveQty, _internalBalances.quoteTokenReserveQty, _liquidityFeeInBasisPoints);
        require(quoteTokenQty > _quoteTokenQtyMin, "MathLib: INSUFFICIENT_QUOTE_TOKEN_QTY");
        _internalBalances.baseTokenReserveQty += _baseTokenQty;
        _internalBalances.quoteTokenReserveQty -= quoteTokenQty;
    }

    ///  @dev calculates the qty of liquidity tokens that should be sent to the DAO due to the growth in K from trading.
    ///  The DAO takes 1/6 of the total fees (30BP total fee, 25 BP to lps and 5 BP to the DAO)
    ///  @param _totalSupplyOfLiquidityTokens the total supply of our exchange's liquidity tokens (aka Ro)
    ///  @param _internalBalances internal balances struct from our exchange's internal accounting
    ///  @return liquidityTokenFeeQty qty of tokens to be minted to the fee address for the growth in K
    function calculateLiquidityTokenFees(uint256 _totalSupplyOfLiquidityTokens, InternalBalances memory _internalBalances) public pure returns (uint256 liquidityTokenFeeQty) {
        uint256 rootK = sqrt(_internalBalances.baseTokenReserveQty * _internalBalances.quoteTokenReserveQty);
        uint256 rootKLast = sqrt(_internalBalances.kLast);
        if (rootK > rootKLast) {
            uint256 numerator = _totalSupplyOfLiquidityTokens * (rootK - rootKLast);
            uint256 denominator = (rootK * 5) + rootKLast;
            liquidityTokenFeeQty = numerator / denominator;
        }
    }
}