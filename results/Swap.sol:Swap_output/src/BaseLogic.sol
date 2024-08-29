/// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "./BaseModule.sol";
import "./BaseIRM.sol";
import "./Interfaces.sol";
import "./Utils.sol";
import "./RPow.sol";
import "./IRiskManager.sol";

abstract contract BaseLogic is BaseModule {
    struct AssetCache {
        address underlying;
        uint112 totalBalances;
        uint144 totalBorrows;
        uint96 reserveBalance;
        uint interestAccumulator;
        uint40 lastInterestAccumulatorUpdate;
        uint8 underlyingDecimals;
        uint32 interestRateModel;
        int96 interestRate;
        uint32 reserveFee;
        uint16 pricingType;
        uint32 pricingParameters;
        uint poolSize;
        uint underlyingDecimalsScaler;
        uint maxExternalAmount;
    }

    constructor(uint moduleId_, bytes32 moduleGitCommit_) BaseModule(moduleId_,moduleGitCommit_) {}

    function getSubAccount(address primary, uint subAccountId) public pure returns (address) {
        require(subAccountId < 256, "e/sub-account-id-too-big");
        return address(uint160(primary) ^ uint160(subAccountId));
    }

    function isSubAccountOf(address primary, address subAccount) public pure returns (bool) {
        return (uint160(primary) | 0xFF) == (uint160(subAccount) | 0xFF);
    }

    function getEnteredMarketsArray(address account) public view returns (address[] memory) {
        uint32 numMarketsEntered = accountLookup[account].numMarketsEntered;
        address firstMarketEntered = accountLookup[account].firstMarketEntered;
        address[] memory output = new address[](numMarketsEntered);
        if (numMarketsEntered == 0) return output;
        address[MAX_POSSIBLE_ENTERED_MARKETS] storage markets = marketsEntered[account];
        output[0] = firstMarketEntered;
        for (uint i = 1; i < numMarketsEntered; ++i) {
            output[i] = markets[i];
        }
        return output;
    }

    function isEnteredInMarket(address account, address underlying) public view returns (bool) {
        uint32 numMarketsEntered = accountLookup[account].numMarketsEntered;
        address firstMarketEntered = accountLookup[account].firstMarketEntered;
        if (numMarketsEntered == 0) return false;
        if (firstMarketEntered == underlying) return true;
        address[MAX_POSSIBLE_ENTERED_MARKETS] storage markets = marketsEntered[account];
        for (uint i = 1; i < numMarketsEntered; ++i) {
            if (markets[i] == underlying) return true;
        }
        return false;
    }

    function doEnterMarket(address account, address underlying) internal {
        AccountStorage storage accountStorage = accountLookup[account];
        uint32 numMarketsEntered = accountStorage.numMarketsEntered;
        address[MAX_POSSIBLE_ENTERED_MARKETS] storage markets = marketsEntered[account];
        if (numMarketsEntered != 0) {
            if (accountStorage.firstMarketEntered == underlying) return;
            for (uint i = 1; i < numMarketsEntered; i++) {
                if (markets[i] == underlying) return;
            }
        }
        require(numMarketsEntered < MAX_ENTERED_MARKETS, "e/too-many-entered-markets");
        if (numMarketsEntered == 0) accountStorage.firstMarketEntered = underlying; else markets[numMarketsEntered] = underlying;
        accountStorage.numMarketsEntered = numMarketsEntered + 1;
        emit EnterMarket(underlying, account);
    }

    function doExitMarket(address account, address underlying) internal {
        AccountStorage storage accountStorage = accountLookup[account];
        uint32 numMarketsEntered = accountStorage.numMarketsEntered;
        address[MAX_POSSIBLE_ENTERED_MARKETS] storage markets = marketsEntered[account];
        uint searchIndex = type(uint).max;
        if (numMarketsEntered == 0) return;
        if (accountStorage.firstMarketEntered == underlying) {
            searchIndex = 0;
        } else {
            for (uint i = 1; i < numMarketsEntered; i++) {
                if (markets[i] == underlying) {
                    searchIndex = i;
                    break;
                }
            }
            if (searchIndex == type(uint).max) return;
        }
        uint lastMarketIndex = numMarketsEntered - 1;
        if (searchIndex != lastMarketIndex) {
            if (searchIndex == 0) accountStorage.firstMarketEntered = markets[lastMarketIndex]; else markets[searchIndex] = markets[lastMarketIndex];
        }
        accountStorage.numMarketsEntered = uint32(lastMarketIndex);
        if (lastMarketIndex != 0) markets[lastMarketIndex] = address(0);
        emit ExitMarket(underlying, account);
    }

    function resolveAssetConfig(address underlying) public view returns (AssetConfig memory) {
        AssetConfig memory config = underlyingLookup[underlying];
        require(config.eTokenAddress != address(0), "e/market-not-activated");
        if (config.borrowFactor == type(uint32).max) config.borrowFactor = DEFAULT_BORROW_FACTOR;
        if (config.twapWindow == type(uint24).max) config.twapWindow = DEFAULT_TWAP_WINDOW_SECONDS;
        return config;
    }

    function initAssetCache(address underlying, AssetStorage storage assetStorage, AssetCache memory assetCache) public view returns (bool dirty) {
        dirty = false;
        assetCache.underlying = underlying;
        assetCache.lastInterestAccumulatorUpdate = assetStorage.lastInterestAccumulatorUpdate;
        uint8 underlyingDecimals = assetCache.underlyingDecimals = assetStorage.underlyingDecimals;
        assetCache.interestRateModel = assetStorage.interestRateModel;
        assetCache.interestRate = assetStorage.interestRate;
        assetCache.reserveFee = assetStorage.reserveFee;
        assetCache.pricingType = assetStorage.pricingType;
        assetCache.pricingParameters = assetStorage.pricingParameters;
        assetCache.reserveBalance = assetStorage.reserveBalance;
        assetCache.totalBalances = assetStorage.totalBalances;
        assetCache.totalBorrows = assetStorage.totalBorrows;
        assetCache.interestAccumulator = assetStorage.interestAccumulator;
        unchecked {
            assetCache.underlyingDecimalsScaler = 10 ** (18 - underlyingDecimals);
            assetCache.maxExternalAmount = MAX_SANE_AMOUNT / assetCache.underlyingDecimalsScaler;
        }
        uint poolSize = callBalanceOf(assetCache, address(this));
        if (poolSize <= assetCache.maxExternalAmount) {
            unchecked {
                assetCache.poolSize = poolSize * assetCache.underlyingDecimalsScaler;
            }
        } else {
            assetCache.poolSize = 0;
        }
        if (block.timestamp != assetCache.lastInterestAccumulatorUpdate) {
            dirty = true;
            uint deltaT = block.timestamp - assetCache.lastInterestAccumulatorUpdate;
            uint newInterestAccumulator = (RPow.rpow(uint(int(assetCache.interestRate) + 1e27), deltaT, 1e27) * assetCache.interestAccumulator) / 1e27;
            uint newTotalBorrows = (assetCache.totalBorrows * newInterestAccumulator) / assetCache.interestAccumulator;
            uint newReserveBalance = assetCache.reserveBalance;
            uint newTotalBalances = assetCache.totalBalances;
            uint feeAmount = ((newTotalBorrows - assetCache.totalBorrows) * ((assetCache.reserveFee == type(uint32).max) ? DEFAULT_RESERVE_FEE : assetCache.reserveFee)) / (RESERVE_FEE_SCALE * INTERNAL_DEBT_PRECISION);
            if (feeAmount != 0) {
                uint poolAssets = assetCache.poolSize + (newTotalBorrows / INTERNAL_DEBT_PRECISION);
                newTotalBalances = (poolAssets * newTotalBalances) / (poolAssets - feeAmount);
                newReserveBalance += newTotalBalances - assetCache.totalBalances;
            }
            if ((newTotalBalances <= MAX_SANE_AMOUNT) && (newTotalBorrows <= MAX_SANE_DEBT_AMOUNT)) {
                assetCache.totalBorrows = encodeDebtAmount(newTotalBorrows);
                assetCache.interestAccumulator = newInterestAccumulator;
                assetCache.lastInterestAccumulatorUpdate = uint40(block.timestamp);
                if (newTotalBalances != assetCache.totalBalances) {
                    assetCache.reserveBalance = encodeSmallAmount(newReserveBalance);
                    assetCache.totalBalances = encodeAmount(newTotalBalances);
                }
            }
        }
    }

    function loadAssetCache(address underlying, AssetStorage storage assetStorage) internal returns (AssetCache memory assetCache) {
        if (initAssetCache(underlying, assetStorage, assetCache)) {
            assetStorage.lastInterestAccumulatorUpdate = assetCache.lastInterestAccumulatorUpdate;
            assetStorage.underlying = assetCache.underlying;
            assetStorage.reserveBalance = assetCache.reserveBalance;
            assetStorage.totalBalances = assetCache.totalBalances;
            assetStorage.totalBorrows = assetCache.totalBorrows;
            assetStorage.interestAccumulator = assetCache.interestAccumulator;
        }
    }

    function loadAssetCacheRO(address underlying, AssetStorage storage assetStorage) public view returns (AssetCache memory assetCache) {
        initAssetCache(underlying, assetStorage, assetCache);
    }

    function decodeExternalAmount(AssetCache memory assetCache, uint externalAmount) public pure returns (uint scaledAmount) {
        require(externalAmount <= assetCache.maxExternalAmount, "e/amount-too-large");
        unchecked {
            scaledAmount = externalAmount * assetCache.underlyingDecimalsScaler;
        }
    }

    function encodeAmount(uint amount) public pure returns (uint112) {
        require(amount <= MAX_SANE_AMOUNT, "e/amount-too-large-to-encode");
        return uint112(amount);
    }

    function encodeSmallAmount(uint amount) public pure returns (uint96) {
        require(amount <= MAX_SANE_SMALL_AMOUNT, "e/small-amount-too-large-to-encode");
        return uint96(amount);
    }

    function encodeDebtAmount(uint amount) public pure returns (uint144) {
        require(amount <= MAX_SANE_DEBT_AMOUNT, "e/debt-amount-too-large-to-encode");
        return uint144(amount);
    }

    function computeExchangeRate(AssetCache memory assetCache) public pure returns (uint) {
        uint totalAssets = assetCache.poolSize + (assetCache.totalBorrows / INTERNAL_DEBT_PRECISION);
        if ((totalAssets == 0) || (assetCache.totalBalances == 0)) return 1e18;
        return (totalAssets * 1e18) / assetCache.totalBalances;
    }

    function underlyingAmountToBalance(AssetCache memory assetCache, uint amount) public pure returns (uint) {
        uint exchangeRate = computeExchangeRate(assetCache);
        return (amount * 1e18) / exchangeRate;
    }

    function underlyingAmountToBalanceRoundUp(AssetCache memory assetCache, uint amount) public pure returns (uint) {
        uint exchangeRate = computeExchangeRate(assetCache);
        return ((amount * 1e18) + (exchangeRate - 1)) / exchangeRate;
    }

    function balanceToUnderlyingAmount(AssetCache memory assetCache, uint amount) public pure returns (uint) {
        uint exchangeRate = computeExchangeRate(assetCache);
        return (amount * exchangeRate) / 1e18;
    }

    function callBalanceOf(AssetCache memory assetCache, address account) public view FREEMEM() returns (uint) {
        (bool success, bytes memory data) = assetCache.underlying.staticcall{gas: 200000}(abi.encodeWithSelector(IERC20.balanceOf.selector, account));
        if ((!success) || (data.length < 32)) return 0;
        return abi.decode(data, (uint256));
    }

    function updateInterestRate(AssetStorage storage assetStorage, AssetCache memory assetCache) internal {
        uint32 utilisation;
        {
            uint totalBorrows = assetCache.totalBorrows / INTERNAL_DEBT_PRECISION;
            uint poolAssets = assetCache.poolSize + totalBorrows;
            if (poolAssets == 0) utilisation = 0; else utilisation = uint32(((totalBorrows * (uint(type(uint32).max) * 1e18)) / poolAssets) / 1e18);
        }
        bytes memory result = callInternalModule(assetCache.interestRateModel, abi.encodeWithSelector(BaseIRM.computeInterestRate.selector, assetCache.underlying, utilisation));
        int96 newInterestRate = abi.decode(result, (int96));
        assetStorage.interestRate = assetCache.interestRate = newInterestRate;
    }

    function logAssetStatus(AssetCache memory a) internal {
        emit AssetStatus(a.underlying, a.totalBalances, a.totalBorrows / INTERNAL_DEBT_PRECISION, a.reserveBalance, a.poolSize, a.interestAccumulator, a.interestRate, block.timestamp);
    }

    function increaseBalance(AssetStorage storage assetStorage, AssetCache memory assetCache, address eTokenAddress, address account, uint amount) internal {
        assetStorage.users[account].balance = encodeAmount(assetStorage.users[account].balance + amount);
        assetStorage.totalBalances = assetCache.totalBalances = encodeAmount(uint(assetCache.totalBalances) + amount);
        updateInterestRate(assetStorage, assetCache);
        emit Deposit(assetCache.underlying, account, amount);
        emitViaProxy_Transfer(eTokenAddress, address(0), account, amount);
    }

    function decreaseBalance(AssetStorage storage assetStorage, AssetCache memory assetCache, address eTokenAddress, address account, uint amount) internal {
        uint origBalance = assetStorage.users[account].balance;
        require(origBalance >= amount, "e/insufficient-balance");
        assetStorage.users[account].balance = encodeAmount(origBalance - amount);
        assetStorage.totalBalances = assetCache.totalBalances = encodeAmount(assetCache.totalBalances - amount);
        updateInterestRate(assetStorage, assetCache);
        emit Withdraw(assetCache.underlying, account, amount);
        emitViaProxy_Transfer(eTokenAddress, account, address(0), amount);
    }

    function transferBalance(AssetStorage storage assetStorage, AssetCache memory assetCache, address eTokenAddress, address from, address to, uint amount) internal {
        uint origFromBalance = assetStorage.users[from].balance;
        require(origFromBalance >= amount, "e/insufficient-balance");
        uint newFromBalance;
        unchecked {
            newFromBalance = origFromBalance - amount;
        }
        assetStorage.users[from].balance = encodeAmount(newFromBalance);
        assetStorage.users[to].balance = encodeAmount(assetStorage.users[to].balance + amount);
        emit Withdraw(assetCache.underlying, from, amount);
        emit Deposit(assetCache.underlying, to, amount);
        emitViaProxy_Transfer(eTokenAddress, from, to, amount);
    }

    function withdrawAmounts(AssetStorage storage assetStorage, AssetCache memory assetCache, address account, uint amount) public view returns (uint, uint) {
        uint amountInternal;
        if (amount == type(uint).max) {
            amountInternal = assetStorage.users[account].balance;
            amount = balanceToUnderlyingAmount(assetCache, amountInternal);
        } else {
            amount = decodeExternalAmount(assetCache, amount);
            amountInternal = underlyingAmountToBalanceRoundUp(assetCache, amount);
        }
        return (amount, amountInternal);
    }

    function getCurrentOwedExact(AssetStorage storage assetStorage, AssetCache memory assetCache, address account, uint owed) public view returns (uint) {
        if (owed == 0) return 0;
        return (owed * assetCache.interestAccumulator) / assetStorage.users[account].interestAccumulator;
    }

    function roundUpOwed(AssetCache memory assetCache, uint owed) public pure returns (uint) {
        if (owed == 0) return 0;
        unchecked {
            uint scale = INTERNAL_DEBT_PRECISION * assetCache.underlyingDecimalsScaler;
            return (((owed + scale) - 1) / scale) * scale;
        }
    }

    function getCurrentOwed(AssetStorage storage assetStorage, AssetCache memory assetCache, address account) public view returns (uint) {
        return roundUpOwed(assetCache, getCurrentOwedExact(assetStorage, assetCache, account, assetStorage.users[account].owed)) / INTERNAL_DEBT_PRECISION;
    }

    function updateUserBorrow(AssetStorage storage assetStorage, AssetCache memory assetCache, address account) private returns (uint newOwedExact, uint prevOwedExact) {
        prevOwedExact = assetStorage.users[account].owed;
        newOwedExact = getCurrentOwedExact(assetStorage, assetCache, account, prevOwedExact);
        assetStorage.users[account].owed = encodeDebtAmount(newOwedExact);
        assetStorage.users[account].interestAccumulator = assetCache.interestAccumulator;
    }

    function logBorrowChange(AssetCache memory assetCache, address dTokenAddress, address account, uint prevOwed, uint owed) private {
        prevOwed = roundUpOwed(assetCache, prevOwed) / INTERNAL_DEBT_PRECISION;
        owed = roundUpOwed(assetCache, owed) / INTERNAL_DEBT_PRECISION;
        if (owed > prevOwed) {
            uint change = owed - prevOwed;
            emit Borrow(assetCache.underlying, account, change);
            emitViaProxy_Transfer(dTokenAddress, address(0), account, change / assetCache.underlyingDecimalsScaler);
        } else if (prevOwed > owed) {
            uint change = prevOwed - owed;
            emit Repay(assetCache.underlying, account, change);
            emitViaProxy_Transfer(dTokenAddress, account, address(0), change / assetCache.underlyingDecimalsScaler);
        }
    }

    function increaseBorrow(AssetStorage storage assetStorage, AssetCache memory assetCache, address dTokenAddress, address account, uint amount) internal {
        amount *= INTERNAL_DEBT_PRECISION;
        require((assetCache.pricingType != PRICINGTYPE__FORWARDED) || (pTokenLookup[assetCache.underlying] == address(0)), "e/borrow-not-supported");
        (uint owed, uint prevOwed) = updateUserBorrow(assetStorage, assetCache, account);
        if (owed == 0) doEnterMarket(account, assetCache.underlying);
        owed += amount;
        assetStorage.users[account].owed = encodeDebtAmount(owed);
        assetStorage.totalBorrows = assetCache.totalBorrows = encodeDebtAmount(assetCache.totalBorrows + amount);
        updateInterestRate(assetStorage, assetCache);
        logBorrowChange(assetCache, dTokenAddress, account, prevOwed, owed);
    }

    function decreaseBorrow(AssetStorage storage assetStorage, AssetCache memory assetCache, address dTokenAddress, address account, uint origAmount) internal {
        uint amount = origAmount * INTERNAL_DEBT_PRECISION;
        (uint owed, uint prevOwed) = updateUserBorrow(assetStorage, assetCache, account);
        uint owedRoundedUp = roundUpOwed(assetCache, owed);
        require(amount <= owedRoundedUp, "e/repay-too-much");
        uint owedRemaining;
        unchecked {
            owedRemaining = owedRoundedUp - amount;
        }
        if (owed > assetCache.totalBorrows) owed = assetCache.totalBorrows;
        assetStorage.users[account].owed = encodeDebtAmount(owedRemaining);
        assetStorage.totalBorrows = assetCache.totalBorrows = encodeDebtAmount((assetCache.totalBorrows - owed) + owedRemaining);
        updateInterestRate(assetStorage, assetCache);
        logBorrowChange(assetCache, dTokenAddress, account, prevOwed, owedRemaining);
    }

    function transferBorrow(AssetStorage storage assetStorage, AssetCache memory assetCache, address dTokenAddress, address from, address to, uint origAmount) internal {
        uint amount = origAmount * INTERNAL_DEBT_PRECISION;
        (uint fromOwed, uint fromOwedPrev) = updateUserBorrow(assetStorage, assetCache, from);
        (uint toOwed, uint toOwedPrev) = updateUserBorrow(assetStorage, assetCache, to);
        if (toOwed == 0) doEnterMarket(to, assetCache.underlying);
        if ((amount > fromOwed) && ((amount - fromOwed) < (INTERNAL_DEBT_PRECISION * assetCache.underlyingDecimalsScaler))) amount = fromOwed;
        require(fromOwed >= amount, "e/insufficient-balance");
        unchecked {
            fromOwed -= amount;
        }
        if (fromOwed < INTERNAL_DEBT_PRECISION) {
            amount += fromOwed;
            fromOwed = 0;
        }
        toOwed += amount;
        assetStorage.users[from].owed = encodeDebtAmount(fromOwed);
        assetStorage.users[to].owed = encodeDebtAmount(toOwed);
        logBorrowChange(assetCache, dTokenAddress, from, fromOwedPrev, fromOwed);
        logBorrowChange(assetCache, dTokenAddress, to, toOwedPrev, toOwed);
    }

    function increaseReserves(AssetStorage storage assetStorage, AssetCache memory assetCache, uint amount) internal {
        assetStorage.reserveBalance = assetCache.reserveBalance = encodeSmallAmount(assetCache.reserveBalance + amount);
        assetStorage.totalBalances = assetCache.totalBalances = encodeAmount(assetCache.totalBalances + amount);
    }

    function pullTokens(AssetCache memory assetCache, address from, uint amount) internal returns (uint amountTransferred) {
        uint poolSizeBefore = assetCache.poolSize;
        Utils.safeTransferFrom(assetCache.underlying, from, address(this), amount / assetCache.underlyingDecimalsScaler);
        uint poolSizeAfter = assetCache.poolSize = decodeExternalAmount(assetCache, callBalanceOf(assetCache, address(this)));
        require(poolSizeAfter >= poolSizeBefore, "e/negative-transfer-amount");
        unchecked {
            amountTransferred = poolSizeAfter - poolSizeBefore;
        }
    }

    function pushTokens(AssetCache memory assetCache, address to, uint amount) internal returns (uint amountTransferred) {
        uint poolSizeBefore = assetCache.poolSize;
        Utils.safeTransfer(assetCache.underlying, to, amount / assetCache.underlyingDecimalsScaler);
        uint poolSizeAfter = assetCache.poolSize = decodeExternalAmount(assetCache, callBalanceOf(assetCache, address(this)));
        require(poolSizeBefore >= poolSizeAfter, "e/negative-transfer-amount");
        unchecked {
            amountTransferred = poolSizeBefore - poolSizeAfter;
        }
    }

    function getAssetPrice(address asset) internal returns (uint) {
        bytes memory result = callInternalModule(MODULEID__RISK_MANAGER, abi.encodeWithSelector(IRiskManager.getPrice.selector, asset));
        return abi.decode(result, (uint));
    }

    function getAccountLiquidity(address account) internal returns (uint collateralValue, uint liabilityValue) {
        bytes memory result = callInternalModule(MODULEID__RISK_MANAGER, abi.encodeWithSelector(IRiskManager.computeLiquidity.selector, account));
        IRiskManager.LiquidityStatus memory status = abi.decode(result, (IRiskManager.LiquidityStatus));
        collateralValue = status.collateralValue;
        liabilityValue = status.liabilityValue;
    }

    function checkLiquidity(address account) internal {
        uint8 status = accountLookup[account].deferLiquidityStatus;
        if (status == DEFERLIQUIDITY__NONE) {
            callInternalModule(MODULEID__RISK_MANAGER, abi.encodeWithSelector(IRiskManager.requireLiquidity.selector, account));
        } else if (status == DEFERLIQUIDITY__CLEAN) {
            accountLookup[account].deferLiquidityStatus = DEFERLIQUIDITY__DIRTY;
        }
    }

    function computeNewAverageLiquidity(address account, uint deltaT) private returns (uint) {
        uint currDuration = (deltaT >= AVERAGE_LIQUIDITY_PERIOD) ? AVERAGE_LIQUIDITY_PERIOD : deltaT;
        uint prevDuration = AVERAGE_LIQUIDITY_PERIOD - currDuration;
        uint currAverageLiquidity;
        {
            (uint collateralValue, uint liabilityValue) = getAccountLiquidity(account);
            currAverageLiquidity = (collateralValue > liabilityValue) ? (collateralValue - liabilityValue) : 0;
        }
        return ((accountLookup[account].averageLiquidity * prevDuration) / AVERAGE_LIQUIDITY_PERIOD) + ((currAverageLiquidity * currDuration) / AVERAGE_LIQUIDITY_PERIOD);
    }

    function getUpdatedAverageLiquidity(address account) internal returns (uint) {
        uint lastAverageLiquidityUpdate = accountLookup[account].lastAverageLiquidityUpdate;
        if (lastAverageLiquidityUpdate == 0) return 0;
        uint deltaT = block.timestamp - lastAverageLiquidityUpdate;
        if (deltaT == 0) return accountLookup[account].averageLiquidity;
        return computeNewAverageLiquidity(account, deltaT);
    }

    function getUpdatedAverageLiquidityWithDelegate(address account) internal returns (uint) {
        address delegate = accountLookup[account].averageLiquidityDelegate;
        return ((delegate != address(0)) && (accountLookup[delegate].averageLiquidityDelegate == account)) ? getUpdatedAverageLiquidity(delegate) : getUpdatedAverageLiquidity(account);
    }

    function updateAverageLiquidity(address account) internal {
        uint lastAverageLiquidityUpdate = accountLookup[account].lastAverageLiquidityUpdate;
        if (lastAverageLiquidityUpdate == 0) return;
        uint deltaT = block.timestamp - lastAverageLiquidityUpdate;
        if (deltaT == 0) return;
        accountLookup[account].lastAverageLiquidityUpdate = uint40(block.timestamp);
        accountLookup[account].averageLiquidity = computeNewAverageLiquidity(account, deltaT);
    }
}