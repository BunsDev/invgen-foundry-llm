/// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "./Storage.sol";
import "./Events.sol";
import "./Proxy.sol";

abstract contract Base is Storage, Events {
    modifier nonReentrant() {
        require(reentrancyLock == REENTRANCYLOCK__UNLOCKED, "e/reentrancy");
        reentrancyLock = REENTRANCYLOCK__LOCKED;
        _;
        reentrancyLock = REENTRANCYLOCK__UNLOCKED;
    }

    modifier reentrantOK() {
        _;
    }

    modifier staticDelegate() {
        _;
    }

    modifier FREEMEM() {
        uint origFreeMemPtr;
        assembly {
            origFreeMemPtr := mload(0x40)
        }
        _;
        assembly {
            mstore(0x40, origFreeMemPtr)
        }
    }

    function _createProxy(uint proxyModuleId) internal returns (address) {
        require(proxyModuleId != 0, "e/create-proxy/invalid-module");
        require(proxyModuleId <= MAX_EXTERNAL_MODULEID, "e/create-proxy/internal-module");
        if (proxyLookup[proxyModuleId] != address(0)) return proxyLookup[proxyModuleId];
        address proxyAddr = address(new Proxy());
        if (proxyModuleId <= MAX_EXTERNAL_SINGLE_PROXY_MODULEID) proxyLookup[proxyModuleId] = proxyAddr;
        trustedSenders[proxyAddr] = TrustedSenderInfo({moduleId: uint32(proxyModuleId), moduleImpl: address(0)});
        emit ProxyCreated(proxyAddr, proxyModuleId);
        return proxyAddr;
    }

    function callInternalModule(uint moduleId, bytes memory input) internal returns (bytes memory) {
        (bool success, bytes memory result) = moduleLookup[moduleId].delegatecall(input);
        if (!success) revertBytes(result);
        return result;
    }

    function revertBytes(bytes memory errMsg) public pure {
        if (errMsg.length > 0) {
            assembly {
                revert(add(32, errMsg), mload(errMsg))
            }
        }
        revert("e/empty-error");
    }
}