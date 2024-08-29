/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IOracle.sol";

interface IAggregator {
    function latestAnswer() external view returns (int256 answer);
}

interface IJoePair {
    function getReserves() external view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast);

    function totalSupply() external view returns (uint256);
}

contract JLPWAVAXUSDCOracle is IOracle {
    IJoePair public constant joePair = IJoePair(0xf4003F4efBE8691B60249E6afbD307aBE7758adb);
    IAggregator public constant AVAX = IAggregator(0x0A77230d17318075983913bC2145DB16C7366156);
    IAggregator public constant USDC = IAggregator(0xF096872672F44d6EBA71458D74fe67F9a77a23B9);

    function _get() public view returns (uint256) {
        uint256 usdcPrice = uint256(USDC.latestAnswer());
        uint256 avaxPrice = uint256(AVAX.latestAnswer());
        (uint112 wavaxReserve, uint112 usdcReserve, ) = joePair.getReserves();
        uint256 price = ((wavaxReserve * avaxPrice) + ((usdcReserve * usdcPrice) * 1e12)) / uint256(joePair.totalSupply());
        return 1e26 / price;
    }

    /// @inheritdoc IOracle
    function get(bytes calldata) override public view returns (bool, uint256) {
        return (true, _get());
    }

    /// @inheritdoc IOracle
    function peek(bytes calldata) override public view returns (bool, uint256) {
        return (true, _get());
    }

    /// @inheritdoc IOracle
    function peekSpot(bytes calldata data) override external view returns (uint256 rate) {
        (, rate) = peek(data);
    }

    /// @inheritdoc IOracle
    function name(bytes calldata) override public pure returns (string memory) {
        return "Chainlink WAVAX-USDC JLP";
    }

    /// @inheritdoc IOracle
    function symbol(bytes calldata) override public pure returns (string memory) {
        return "WAVAX-USDC JLP/USD";
    }
}