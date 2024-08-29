/// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0<0.8.0;

abstract contract Context {
    function _msgSender() virtual internal view returns (address payable) {
        return msg.sender;
    }

    function _msgData() virtual internal view returns (bytes memory) {
        this;
        return msg.data;
    }
}