/// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0<0.8.0;

import "../proxy/Initializable.sol";

abstract contract ContextUpgradeable is Initializable {
    uint256[50] private __gap;

    function __Context_init() internal initializer() {
        __Context_init_unchained();
    }

    function __Context_init_unchained() internal initializer() {}

    function _msgSender() virtual internal view returns (address payable) {
        return msg.sender;
    }

    function _msgData() virtual internal view returns (bytes memory) {
        this;
        return msg.data;
    }
}