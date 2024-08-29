//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

interface IExchangeFactory {
    function feeAddress() external view returns (address);
}
