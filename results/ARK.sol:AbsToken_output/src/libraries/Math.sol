/// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.8.24;

library Math {
    function min(uint256 x, uint256 y) public pure returns (uint256 z) {
        z = (x < y) ? x : y;
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
}