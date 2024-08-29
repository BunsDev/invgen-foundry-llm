/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

library LibSwap {
    event AssetSwapped(bytes32 transactionId, address dex, address fromAssetId, address toAssetId, uint256 fromAmount, uint256 toAmount, uint256 timestamp);

    struct SwapData {
        address callTo;
        address approveTo;
        address sendingAssetId;
        address receivingAssetId;
        uint256 fromAmount;
        bytes callData;
    }

    uint256 public constant MAX_INT = (2 ** 256) - 1;

    function swap(bytes32 transactionId, SwapData calldata _swapData) public {
        uint256 fromAmount = _swapData.fromAmount;
        uint256 toAmount = LibAsset.getOwnBalance(_swapData.receivingAssetId);
        address fromAssetId = _swapData.sendingAssetId;
        if ((!LibAsset.isNativeAsset(fromAssetId)) && (LibAsset.getOwnBalance(fromAssetId) < fromAmount)) {
            LibAsset.transferFromERC20(_swapData.sendingAssetId, msg.sender, address(this), fromAmount);
        }
        if (!LibAsset.isNativeAsset(fromAssetId)) {
            LibAsset.approveERC20(IERC20(fromAssetId), _swapData.approveTo, fromAmount);
        }
        (bool success, bytes memory res) = _swapData.callTo.call{value: msg.value}(_swapData.callData);
        if (!success) {
            string memory reason = LibUtil.getRevertMsg(res);
            revert(reason);
        }
        toAmount = LibAsset.getOwnBalance(_swapData.receivingAssetId) - toAmount;
        emit AssetSwapped(transactionId, _swapData.callTo, _swapData.sendingAssetId, _swapData.receivingAssetId, fromAmount, toAmount, block.timestamp);
    }
}

library LibUtil {
    using LibBytes for bytes;

    function getRevertMsg(bytes memory _res) public pure returns (string memory) {
        if (_res.length < 68) return "Transaction reverted silently";
        bytes memory revertData = _res.slice(4, _res.length - 4);
        return abi.decode(revertData, (string));
    }
}

library LibBytes {
    function concat(bytes memory _preBytes, bytes memory _postBytes) public pure returns (bytes memory) {
        bytes memory tempBytes;
        assembly {
            tempBytes := mload(0x40)
            let length := mload(_preBytes)
            mstore(tempBytes, length)
            let mc := add(tempBytes, 0x20)
            let end := add(mc, length)
            for {
                let cc := add(_preBytes, 0x20)
            } lt(mc, end) {
                mc := add(mc, 0x20)
                cc := add(cc, 0x20)
            } {
                mstore(mc, mload(cc))
            }
            length := mload(_postBytes)
            mstore(tempBytes, add(length, mload(tempBytes)))
            mc := end
            end := add(mc, length)
            for {
                let cc := add(_postBytes, 0x20)
            } lt(mc, end) {
                mc := add(mc, 0x20)
                cc := add(cc, 0x20)
            } {
                mstore(mc, mload(cc))
            }
            mstore(0x40, and(add(add(end, iszero(add(length, mload(_preBytes)))), 31), not(31)))
        }
        return tempBytes;
    }

    function concatStorage(bytes storage _preBytes, bytes memory _postBytes) internal {
        assembly {
            let fslot := sload(_preBytes.slot)
            let slength := div(and(fslot, sub(mul(0x100, iszero(and(fslot, 1))), 1)), 2)
            let mlength := mload(_postBytes)
            let newlength := add(slength, mlength)
            switch add(lt(slength, 32), lt(newlength, 32))
            case 2 {
                sstore(_preBytes.slot, add(fslot, add(mul(div(mload(add(_postBytes, 0x20)), exp(0x100, sub(32, mlength))), exp(0x100, sub(32, newlength))), mul(mlength, 2))))
            }
            case 1 {
                mstore(0x0, _preBytes.slot)
                let sc := add(keccak256(0x0, 0x20), div(slength, 32))
                sstore(_preBytes.slot, add(mul(newlength, 2), 1))
                let submod := sub(32, slength)
                let mc := add(_postBytes, submod)
                let end := add(_postBytes, mlength)
                let mask := sub(exp(0x100, submod), 1)
                sstore(sc, add(and(fslot, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00), and(mload(mc), mask)))
                for {
                    mc := add(mc, 0x20)
                    sc := add(sc, 1)
                } lt(mc, end) {
                    sc := add(sc, 1)
                    mc := add(mc, 0x20)
                } {
                    sstore(sc, mload(mc))
                }
                mask := exp(0x100, sub(mc, end))
                sstore(sc, mul(div(mload(mc), mask), mask))
            }
            default {
                mstore(0x0, _preBytes.slot)
                let sc := add(keccak256(0x0, 0x20), div(slength, 32))
                sstore(_preBytes.slot, add(mul(newlength, 2), 1))
                let slengthmod := mod(slength, 32)
                let submod := sub(32, slengthmod)
                let mc := add(_postBytes, submod)
                let end := add(_postBytes, mlength)
                let mask := sub(exp(0x100, submod), 1)
                sstore(sc, add(sload(sc), and(mload(mc), mask)))
                for {
                    sc := add(sc, 1)
                    mc := add(mc, 0x20)
                } lt(mc, end) {
                    sc := add(sc, 1)
                    mc := add(mc, 0x20)
                } {
                    sstore(sc, mload(mc))
                }
                mask := exp(0x100, sub(mc, end))
                sstore(sc, mul(div(mload(mc), mask), mask))
            }
        }
    }

    function slice(bytes memory _bytes, uint256 _start, uint256 _length) public pure returns (bytes memory) {
        require((_length + 31) >= _length, "slice_overflow");
        require(_bytes.length >= (_start + _length), "slice_outOfBounds");
        bytes memory tempBytes;
        assembly {
            switch iszero(_length)
            case 0 {
                tempBytes := mload(0x40)
                let lengthmod := and(_length, 31)
                let mc := add(add(tempBytes, lengthmod), mul(0x20, iszero(lengthmod)))
                let end := add(mc, _length)
                for {
                    let cc := add(add(add(_bytes, lengthmod), mul(0x20, iszero(lengthmod))), _start)
                } lt(mc, end) {
                    mc := add(mc, 0x20)
                    cc := add(cc, 0x20)
                } {
                    mstore(mc, mload(cc))
                }
                mstore(tempBytes, _length)
                mstore(0x40, and(add(mc, 31), not(31)))
            }
            default {
                tempBytes := mload(0x40)
                mstore(tempBytes, 0)
                mstore(0x40, add(tempBytes, 0x20))
            }
        }
        return tempBytes;
    }

    function toAddress(bytes memory _bytes, uint256 _start) public pure returns (address) {
        require(_bytes.length >= (_start + 20), "toAddress_outOfBounds");
        address tempAddress;
        assembly {
            tempAddress := div(mload(add(add(_bytes, 0x20), _start)), 0x1000000000000000000000000)
        }
        return tempAddress;
    }

    function toUint8(bytes memory _bytes, uint256 _start) public pure returns (uint8) {
        require(_bytes.length >= (_start + 1), "toUint8_outOfBounds");
        uint8 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0x1), _start))
        }
        return tempUint;
    }

    function toUint16(bytes memory _bytes, uint256 _start) public pure returns (uint16) {
        require(_bytes.length >= (_start + 2), "toUint16_outOfBounds");
        uint16 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0x2), _start))
        }
        return tempUint;
    }

    function toUint32(bytes memory _bytes, uint256 _start) public pure returns (uint32) {
        require(_bytes.length >= (_start + 4), "toUint32_outOfBounds");
        uint32 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0x4), _start))
        }
        return tempUint;
    }

    function toUint64(bytes memory _bytes, uint256 _start) public pure returns (uint64) {
        require(_bytes.length >= (_start + 8), "toUint64_outOfBounds");
        uint64 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0x8), _start))
        }
        return tempUint;
    }

    function toUint96(bytes memory _bytes, uint256 _start) public pure returns (uint96) {
        require(_bytes.length >= (_start + 12), "toUint96_outOfBounds");
        uint96 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0xc), _start))
        }
        return tempUint;
    }

    function toUint128(bytes memory _bytes, uint256 _start) public pure returns (uint128) {
        require(_bytes.length >= (_start + 16), "toUint128_outOfBounds");
        uint128 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0x10), _start))
        }
        return tempUint;
    }

    function toUint256(bytes memory _bytes, uint256 _start) public pure returns (uint256) {
        require(_bytes.length >= (_start + 32), "toUint256_outOfBounds");
        uint256 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
        return tempUint;
    }

    function toBytes32(bytes memory _bytes, uint256 _start) public pure returns (bytes32) {
        require(_bytes.length >= (_start + 32), "toBytes32_outOfBounds");
        bytes32 tempBytes32;
        assembly {
            tempBytes32 := mload(add(add(_bytes, 0x20), _start))
        }
        return tempBytes32;
    }

    function equal(bytes memory _preBytes, bytes memory _postBytes) public pure returns (bool) {
        bool success = true;
        assembly {
            let length := mload(_preBytes)
            switch eq(length, mload(_postBytes))
            case 1 {
                let cb := 1
                let mc := add(_preBytes, 0x20)
                let end := add(mc, length)
                for {
                    let cc := add(_postBytes, 0x20)
                } eq(add(lt(mc, end), cb), 2) {
                    mc := add(mc, 0x20)
                    cc := add(cc, 0x20)
                } {
                    if iszero(eq(mload(mc), mload(cc))) {
                        success := 0
                        cb := 0
                    }
                }
            }
            default {
                success := 0
            }
        }
        return success;
    }

    function equalStorage(bytes storage _preBytes, bytes memory _postBytes) public view returns (bool) {
        bool success = true;
        assembly {
            let fslot := sload(_preBytes.slot)
            let slength := div(and(fslot, sub(mul(0x100, iszero(and(fslot, 1))), 1)), 2)
            let mlength := mload(_postBytes)
            switch eq(slength, mlength)
            case 1 {
                if iszero(iszero(slength)) {
                    switch lt(slength, 32)
                    case 1 {
                        fslot := mul(div(fslot, 0x100), 0x100)
                        if iszero(eq(fslot, mload(add(_postBytes, 0x20)))) {
                            success := 0
                        }
                    }
                    default {
                        let cb := 1
                        mstore(0x0, _preBytes.slot)
                        let sc := keccak256(0x0, 0x20)
                        let mc := add(_postBytes, 0x20)
                        let end := add(mc, mlength)
                        for {} eq(add(lt(mc, end), cb), 2) {
                            sc := add(sc, 1)
                            mc := add(mc, 0x20)
                        } {
                            if iszero(eq(sload(sc), mload(mc))) {
                                success := 0
                                cb := 0
                            }
                        }
                    }
                }
            }
            default {
                success := 0
            }
        }
        return success;
    }
}

library LibAsset {
    uint256 public constant MAX_INT = (2 ** 256) - 1;
    ///  @dev All native assets use the empty address for their asset id
    ///       by convention
    address internal constant NATIVE_ASSETID = address(0);

    ///  @notice Determines whether the given assetId is the native asset
    ///  @param assetId The asset identifier to evaluate
    ///  @return Boolean indicating if the asset is the native asset
    function isNativeAsset(address assetId) public pure returns (bool) {
        return assetId == NATIVE_ASSETID;
    }

    ///  @notice Gets the balance of the inheriting contract for the given asset
    ///  @param assetId The asset identifier to get the balance of
    ///  @return Balance held by contracts using this library
    function getOwnBalance(address assetId) public view returns (uint256) {
        return isNativeAsset(assetId) ? address(this).balance : IERC20(assetId).balanceOf(address(this));
    }

    ///  @notice Transfers ether from the inheriting contract to a given
    ///          recipient
    ///  @param recipient Address to send ether to
    ///  @param amount Amount to send to given recipient
    function transferNativeAsset(address payable recipient, uint256 amount) internal {
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "#TNA:028");
    }

    ///  @notice Gives approval for another address to spend tokens
    ///  @param assetId Token address to transfer
    ///  @param spender Address to give spend approval to
    ///  @param amount Amount to approve for spending
    function approveERC20(IERC20 assetId, address spender, uint256 amount) internal {
        if (isNativeAsset(address(assetId))) return;
        uint256 allowance = assetId.allowance(address(this), spender);
        if (allowance < amount) {
            if (allowance > 0) SafeERC20.safeApprove(IERC20(assetId), spender, 0);
            SafeERC20.safeApprove(IERC20(assetId), spender, MAX_INT);
        }
    }

    ///  @notice Transfers tokens from the inheriting contract to a given
    ///          recipient
    ///  @param assetId Token address to transfer
    ///  @param recipient Address to send ether to
    ///  @param amount Amount to send to given recipient
    function transferERC20(address assetId, address recipient, uint256 amount) internal {
        SafeERC20.safeTransfer(IERC20(assetId), recipient, amount);
    }

    ///  @notice Transfers tokens from a sender to a given recipient
    ///  @param assetId Token address to transfer
    ///  @param from Address of sender/owner
    ///  @param to Address of recipient/spender
    ///  @param amount Amount to transfer from owner to spender
    function transferFromERC20(address assetId, address from, address to, uint256 amount) internal {
        SafeERC20.safeTransferFrom(IERC20(assetId), from, to, amount);
    }

    ///  @notice Increases the allowance of a token to a spender
    ///  @param assetId Token address of asset to increase allowance of
    ///  @param spender Account whos allowance is increased
    ///  @param amount Amount to increase allowance by
    function increaseERC20Allowance(address assetId, address spender, uint256 amount) internal {
        require(!isNativeAsset(assetId), "#IA:034");
        SafeERC20.safeIncreaseAllowance(IERC20(assetId), spender, amount);
    }

    ///  @notice Decreases the allowance of a token to a spender
    ///  @param assetId Token address of asset to decrease allowance of
    ///  @param spender Account whos allowance is decreased
    ///  @param amount Amount to decrease allowance by
    function decreaseERC20Allowance(address assetId, address spender, uint256 amount) internal {
        require(!isNativeAsset(assetId), "#DA:034");
        SafeERC20.safeDecreaseAllowance(IERC20(assetId), spender, amount);
    }

    ///  @notice Wrapper function to transfer a given asset (native or erc20) to
    ///          some recipient. Should handle all non-compliant return value
    ///          tokens as well by using the SafeERC20 contract by open zeppelin.
    ///  @param assetId Asset id for transfer (address(0) for native asset,
    ///                 token address for erc20s)
    ///  @param recipient Address to send asset to
    ///  @param amount Amount to send to given recipient
    function transferAsset(address assetId, address payable recipient, uint256 amount) internal {
        isNativeAsset(assetId) ? transferNativeAsset(recipient, amount) : transferERC20(assetId, recipient, amount);
    }
}