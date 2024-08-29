pragma solidity >=0.6.2<0.9.0;
pragma experimental ABIEncoderV2;

import { IMulticall3 } from "./interfaces/IMulticall3.sol";
import { MockERC20 } from "./mocks/MockERC20.sol";
import { MockERC721 } from "./mocks/MockERC721.sol";
import { VmSafe } from "./Vm.sol";

abstract contract StdUtils {
    IMulticall3 private constant multicall = IMulticall3(0xcA11bde05977b3631167028862bE2a173976CA11);
    VmSafe private constant vm = VmSafe(address(uint160(uint256(keccak256("hevm cheat code")))));
    address private constant CONSOLE2_ADDRESS = 0x000000000000000000636F6e736F6c652e6c6f67;
    uint256 private constant INT256_MIN_ABS = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    uint256 private constant SECP256K1_ORDER = 115792089237316195423570985008687907852837564279074904382605163141518161494337;
    uint256 private constant UINT256_MAX = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
    address private constant CREATE2_FACTORY = 0x4e59b44847b379578588920cA78FbF26c0B4956C;

    function _bound(uint256 x, uint256 min, uint256 max) virtual internal pure returns (uint256 result) {
        require(min <= max, "StdUtils bound(uint256,uint256,uint256): Max is less than min.");
        if ((x >= min) && (x <= max)) return x;
        uint256 size = (max - min) + 1;
        if ((x <= 3) && (size > x)) return min + x;
        if ((x >= (UINT256_MAX - 3)) && (size > (UINT256_MAX - x))) return max - (UINT256_MAX - x);
        if (x > max) {
            uint256 diff = x - max;
            uint256 rem = diff % size;
            if (rem == 0) return max;
            result = (min + rem) - 1;
        } else if (x < min) {
            uint256 diff = min - x;
            uint256 rem = diff % size;
            if (rem == 0) return min;
            result = (max - rem) + 1;
        }
    }

    function bound(uint256 x, uint256 min, uint256 max) virtual internal pure returns (uint256 result) {
        result = _bound(x, min, max);
        console2_log_StdUtils("Bound result", result);
    }

    function _bound(int256 x, int256 min, int256 max) virtual internal pure returns (int256 result) {
        require(min <= max, "StdUtils bound(int256,int256,int256): Max is less than min.");
        uint256 _x = (x < 0) ? ((INT256_MIN_ABS - (~uint256(x))) - 1) : (uint256(x) + INT256_MIN_ABS);
        uint256 _min = (min < 0) ? ((INT256_MIN_ABS - (~uint256(min))) - 1) : (uint256(min) + INT256_MIN_ABS);
        uint256 _max = (max < 0) ? ((INT256_MIN_ABS - (~uint256(max))) - 1) : (uint256(max) + INT256_MIN_ABS);
        uint256 y = _bound(_x, _min, _max);
        result = (y < INT256_MIN_ABS) ? int256((~(INT256_MIN_ABS - y)) + 1) : int256(y - INT256_MIN_ABS);
    }

    function bound(int256 x, int256 min, int256 max) virtual internal pure returns (int256 result) {
        result = _bound(x, min, max);
        console2_log_StdUtils("Bound result", vm.toString(result));
    }

    function boundPrivateKey(uint256 privateKey) virtual internal pure returns (uint256 result) {
        result = _bound(privateKey, 1, SECP256K1_ORDER - 1);
    }

    function bytesToUint(bytes memory b) virtual internal pure returns (uint256) {
        require(b.length <= 32, "StdUtils bytesToUint(bytes): Bytes length exceeds 32.");
        return abi.decode(abi.encodePacked(new bytes(32 - b.length), b), (uint256));
    }

    /// @dev Compute the address a contract will be deployed at for a given deployer address and nonce
    ///  @notice adapted from Solmate implementation (https://github.com/Rari-Capital/solmate/blob/main/src/utils/LibRLP.sol)
    function computeCreateAddress(address deployer, uint256 nonce) virtual internal pure returns (address) {
        console2_log_StdUtils("computeCreateAddress is deprecated. Please use vm.computeCreateAddress instead.");
        return vm.computeCreateAddress(deployer, nonce);
    }

    function computeCreate2Address(bytes32 salt, bytes32 initcodeHash, address deployer) virtual internal pure returns (address) {
        console2_log_StdUtils("computeCreate2Address is deprecated. Please use vm.computeCreate2Address instead.");
        return vm.computeCreate2Address(salt, initcodeHash, deployer);
    }

    /// @dev returns the address of a contract created with CREATE2 using the default CREATE2 deployer
    function computeCreate2Address(bytes32 salt, bytes32 initCodeHash) internal pure returns (address) {
        console2_log_StdUtils("computeCreate2Address is deprecated. Please use vm.computeCreate2Address instead.");
        return vm.computeCreate2Address(salt, initCodeHash);
    }

    /// @dev returns an initialized mock ERC20 contract
    function deployMockERC20(string memory name, string memory symbol, uint8 decimals) internal returns (MockERC20 mock) {
        mock = new MockERC20();
        mock.initialize(name, symbol, decimals);
    }

    /// @dev returns an initialized mock ERC721 contract
    function deployMockERC721(string memory name, string memory symbol) internal returns (MockERC721 mock) {
        mock = new MockERC721();
        mock.initialize(name, symbol);
    }

    /// @dev returns the hash of the init code (creation code + no args) used in CREATE2 with no constructor arguments
    ///  @param creationCode the creation code of a contract C, as returned by type(C).creationCode
    function hashInitCode(bytes memory creationCode) internal pure returns (bytes32) {
        return hashInitCode(creationCode, "");
    }

    /// @dev returns the hash of the init code (creation code + ABI-encoded args) used in CREATE2
    ///  @param creationCode the creation code of a contract C, as returned by type(C).creationCode
    ///  @param args the ABI-encoded arguments to the constructor of C
    function hashInitCode(bytes memory creationCode, bytes memory args) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(creationCode, args));
    }

    function getTokenBalances(address token, address[] memory addresses) virtual internal returns (uint256[] memory balances) {
        uint256 tokenCodeSize;
        assembly {
            tokenCodeSize := extcodesize(token)
        }
        require(tokenCodeSize > 0, "StdUtils getTokenBalances(address,address[]): Token address is not a contract.");
        uint256 length = addresses.length;
        IMulticall3.Call[] memory calls = new IMulticall3.Call[](length);
        for (uint256 i = 0; i < length; ++i) {
            calls[i] = IMulticall3.Call({target: token, callData: abi.encodeWithSelector(0x70a08231, (addresses[i]))});
        }
        (, bytes[] memory returnData) = multicall.aggregate(calls);
        balances = new uint256[](length);
        for (uint256 i = 0; i < length; ++i) {
            balances[i] = abi.decode(returnData[i], (uint256));
        }
    }

    function addressFromLast20Bytes(bytes32 bytesValue) private pure returns (address) {
        return address(uint160(uint256(bytesValue)));
    }

    function _castLogPayloadViewToPure(function(bytes memory) internal view fnIn) internal pure returns (function(bytes memory) internal pure fnOut) {
        assembly {
            fnOut := fnIn
        }
    }

    function _sendLogPayload(bytes memory payload) internal pure {
        _castLogPayloadViewToPure(_sendLogPayloadView)(payload);
    }

    function _sendLogPayloadView(bytes memory payload) private view {
        uint256 payloadLength = payload.length;
        address consoleAddress = CONSOLE2_ADDRESS;
        assembly {
            let payloadStart := add(payload, 32)
            let r := staticcall(gas(), consoleAddress, payloadStart, payloadLength, 0, 0)
        }
    }

    function console2_log_StdUtils(string memory p0) private pure {
        _sendLogPayload(abi.encodeWithSignature("log(string)", p0));
    }

    function console2_log_StdUtils(string memory p0, uint256 p1) private pure {
        _sendLogPayload(abi.encodeWithSignature("log(string,uint256)", p0, p1));
    }

    function console2_log_StdUtils(string memory p0, string memory p1) private pure {
        _sendLogPayload(abi.encodeWithSignature("log(string,string)", p0, p1));
    }
}