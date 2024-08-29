/// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

interface IAssimilator {
    function getRate() external view returns (uint256);

    function intakeRaw(uint256 amount) external returns (int128);

    function intakeRawAndGetBalance(uint256 amount) external returns (int128, int128);

    function intakeNumeraire(int128 amount) external returns (uint256);

    function intakeNumeraireLPRatio(uint256, uint256, address, int128) external returns (uint256);

    function outputRaw(address dst, uint256 amount) external returns (int128);

    function outputRawAndGetBalance(address dst, uint256 amount) external returns (int128, int128);

    function outputNumeraire(address dst, int128 amount) external returns (uint256);

    function viewRawAmount(int128) external view returns (uint256);

    function viewRawAmountLPRatio(uint256, uint256, address, int128) external view returns (uint256);

    function viewNumeraireAmount(uint256) external view returns (int128);

    function viewNumeraireBalanceLPRatio(uint256, uint256, address) external view returns (int128);

    function viewNumeraireBalance(address) external view returns (int128);

    function viewNumeraireAmountAndBalance(address, uint256) external view returns (int128, int128);
}