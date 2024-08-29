/// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "./Base.sol";

abstract contract BaseModule is Base {
    uint public immutable moduleId;
    bytes32 public immutable moduleGitCommit;

    constructor(uint moduleId_, bytes32 moduleGitCommit_) {
        moduleId = moduleId_;
        moduleGitCommit = moduleGitCommit_;
    }

    function unpackTrailingParamMsgSender() public pure returns (address msgSender) {
        assembly {
            msgSender := shr(96, calldataload(sub(calldatasize(), 40)))
        }
    }

    function unpackTrailingParams() public pure returns (address msgSender, address proxyAddr) {
        assembly {
            msgSender := shr(96, calldataload(sub(calldatasize(), 40)))
            proxyAddr := shr(96, calldataload(sub(calldatasize(), 20)))
        }
    }

    function emitViaProxy_Transfer(address proxyAddr, address from, address to, uint value) internal FREEMEM() {
        (bool success, ) = proxyAddr.call(abi.encodePacked(uint8(3), keccak256(bytes("Transfer(address,address,uint256)")), bytes32(uint(uint160(from))), bytes32(uint(uint160(to))), value));
        require(success, "e/log-proxy-fail");
    }

    function emitViaProxy_Approval(address proxyAddr, address owner, address spender, uint value) internal FREEMEM() {
        (bool success, ) = proxyAddr.call(abi.encodePacked(uint8(3), keccak256(bytes("Approval(address,address,uint256)")), bytes32(uint(uint160(owner))), bytes32(uint(uint160(spender))), value));
        require(success, "e/log-proxy-fail");
    }
}