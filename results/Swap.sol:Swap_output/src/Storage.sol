/// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "./Constants.sol";

abstract contract Storage is Constants {
    struct TrustedSenderInfo {
        uint32 moduleId;
        address moduleImpl;
    }

    struct AccountStorage {
        uint8 deferLiquidityStatus;
        uint40 lastAverageLiquidityUpdate;
        uint32 numMarketsEntered;
        address firstMarketEntered;
        uint averageLiquidity;
        address averageLiquidityDelegate;
    }

    struct AssetConfig {
        address eTokenAddress;
        bool borrowIsolated;
        uint32 collateralFactor;
        uint32 borrowFactor;
        uint24 twapWindow;
    }

    struct UserAsset {
        uint112 balance;
        uint144 owed;
        uint interestAccumulator;
    }

    struct AssetStorage {
        uint40 lastInterestAccumulatorUpdate;
        uint8 underlyingDecimals;
        uint32 interestRateModel;
        int96 interestRate;
        uint32 reserveFee;
        uint16 pricingType;
        uint32 pricingParameters;
        address underlying;
        uint96 reserveBalance;
        address dTokenAddress;
        uint112 totalBalances;
        uint144 totalBorrows;
        uint interestAccumulator;
        mapping(address => UserAsset) users;
        mapping(address => mapping(address => uint)) eTokenAllowance;
        mapping(address => mapping(address => uint)) dTokenAllowance;
    }

    uint internal reentrancyLock;
    address internal upgradeAdmin;
    address internal governorAdmin;
    mapping(uint => address) internal moduleLookup;
    mapping(uint => address) internal proxyLookup;
    mapping(address => TrustedSenderInfo) internal trustedSenders;
    mapping(address => AccountStorage) internal accountLookup;
    mapping(address => address[MAX_POSSIBLE_ENTERED_MARKETS]) internal marketsEntered;
    mapping(address => AssetConfig) internal underlyingLookup;
    mapping(address => AssetStorage) internal eTokenLookup;
    mapping(address => address) internal dTokenLookup;
    mapping(address => address) internal pTokenLookup;
    mapping(address => address) internal reversePTokenLookup;
    mapping(address => address) internal chainlinkPriceFeedLookup;
}