/// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2<0.9.0;

library stdMath {
    int256 private constant INT256_MIN = -57896044618658097711785492504343953926634992332820282019728792003956564819968;

    function abs(int256 a) internal pure returns (uint256) {
        if (a == INT256_MIN) {
            return 57896044618658097711785492504343953926634992332820282019728792003956564819968;
        }
        return uint256((a > 0) ? a : (-a));
    }

    function delta(uint256 a, uint256 b) internal pure returns (uint256) {
        return (a > b) ? (a - b) : (b - a);
    }

    function delta(int256 a, int256 b) internal pure returns (uint256) {
        if ((a ^ b) > (-1)) {
            return delta(abs(a), abs(b));
        }
        return abs(a) + abs(b);
    }

    function percentDelta(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 absDelta = delta(a, b);
        return (absDelta * 1e18) / b;
    }

    function percentDelta(int256 a, int256 b) internal pure returns (uint256) {
        uint256 absDelta = delta(a, b);
        uint256 absB = abs(b);
        return (absDelta * 1e18) / absB;
    }
}