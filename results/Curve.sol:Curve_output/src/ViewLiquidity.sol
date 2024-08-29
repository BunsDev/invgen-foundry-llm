/// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "./Storage.sol";
import "./Assimilators.sol";
import "./ABDKMath64x64.sol";

library ViewLiquidity {
    using ABDKMath64x64 for int128;

    function viewLiquidity(Storage.Curve storage curve) external view returns (uint256 total_, uint256[] memory individual_) {
        uint256 _length = curve.assets.length;
        individual_ = new uint256[](_length);
        for (uint256 i = 0; i < _length; i++) {
            uint256 _liquidity = Assimilators.viewNumeraireBalance(curve.assets[i].addr).mulu(1e18);
            total_ += _liquidity;
            individual_[i] = _liquidity;
        }
        return (total_, individual_);
    }
}