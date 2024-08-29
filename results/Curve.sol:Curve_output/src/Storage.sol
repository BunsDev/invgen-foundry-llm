/// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "./IOracle.sol";
import "./Assimilators.sol";

contract Storage {
    struct Curve {
        int128 alpha;
        int128 beta;
        int128 delta;
        int128 epsilon;
        int128 lambda;
        int128[] weights;
        Assimilator[] assets;
        mapping(address => Assimilator) assimilators;
        mapping(address => IOracle) oracles;
        uint256 totalSupply;
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
    }

    struct Assimilator {
        address addr;
        uint8 ix;
    }

    Curve public curve;
    address public owner;
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;
    address[] public derivatives;
    address[] public numeraires;
    address[] public reserves;
    bool public frozen = false;
    bool public emergency = false;
    bool public whitelistingStage = true;
    bool internal notEntered = true;
    mapping(address => uint256) public whitelistedDeposited;
}