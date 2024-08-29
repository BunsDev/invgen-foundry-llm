/// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.8.24;

library UQ112x112 {
    uint224 internal constant Q112 = 2 ** 112;

    function encode(uint112 y) public pure returns (uint224 z) {
        z = uint224(y) * Q112;
    }

    function uqdiv(uint224 x, uint112 y) public pure returns (uint224 z) {
        z = x / uint224(y);
    }
}