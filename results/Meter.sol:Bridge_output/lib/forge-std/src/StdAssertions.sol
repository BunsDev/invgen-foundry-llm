pragma solidity >=0.6.2<0.9.0;
pragma experimental ABIEncoderV2;

import { Vm } from "./Vm.sol";

abstract contract StdAssertions {
    event log(string);

    event logs(bytes);

    event log_address(address);

    event log_bytes32(bytes32);

    event log_int(int256);

    event log_uint(uint256);

    event log_bytes(bytes);

    event log_string(string);

    event log_named_address(string key, address val);

    event log_named_bytes32(string key, bytes32 val);

    event log_named_decimal_int(string key, int256 val, uint256 decimals);

    event log_named_decimal_uint(string key, uint256 val, uint256 decimals);

    event log_named_int(string key, int256 val);

    event log_named_uint(string key, uint256 val);

    event log_named_bytes(string key, bytes val);

    event log_named_string(string key, string val);

    event log_array(uint256[] val);

    event log_array(int256[] val);

    event log_array(address[] val);

    event log_named_array(string key, uint256[] val);

    event log_named_array(string key, int256[] val);

    event log_named_array(string key, address[] val);

    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
    bool private _failed;

    function failed() public view returns (bool) {
        if (_failed) {
            return _failed;
        } else {
            return vm.load(address(vm), bytes32("failed")) != bytes32(0);
        }
    }

    function fail() virtual internal {
        vm.store(address(vm), bytes32("failed"), bytes32(uint256(1)));
        _failed = true;
    }

    function assertTrue(bool data) virtual internal pure {
        vm.assertTrue(data);
    }

    function assertTrue(bool data, string memory err) virtual internal pure {
        vm.assertTrue(data, err);
    }

    function assertFalse(bool data) virtual internal pure {
        vm.assertFalse(data);
    }

    function assertFalse(bool data, string memory err) virtual internal pure {
        vm.assertFalse(data, err);
    }

    function assertEq(bool left, bool right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(bool left, bool right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(uint256 left, uint256 right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(uint256 left, uint256 right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEqDecimal(uint256 left, uint256 right, uint256 decimals) virtual internal pure {
        vm.assertEqDecimal(left, right, decimals);
    }

    function assertEqDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertEqDecimal(left, right, decimals, err);
    }

    function assertEq(int256 left, int256 right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(int256 left, int256 right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEqDecimal(int256 left, int256 right, uint256 decimals) virtual internal pure {
        vm.assertEqDecimal(left, right, decimals);
    }

    function assertEqDecimal(int256 left, int256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertEqDecimal(left, right, decimals, err);
    }

    function assertEq(address left, address right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(address left, address right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(bytes32 left, bytes32 right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(bytes32 left, bytes32 right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq32(bytes32 left, bytes32 right) virtual internal pure {
        assertEq(left, right);
    }

    function assertEq32(bytes32 left, bytes32 right, string memory err) virtual internal pure {
        assertEq(left, right, err);
    }

    function assertEq(string memory left, string memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(string memory left, string memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(bytes memory left, bytes memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(bytes memory left, bytes memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(bool[] memory left, bool[] memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(bool[] memory left, bool[] memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(uint256[] memory left, uint256[] memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(uint256[] memory left, uint256[] memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(int256[] memory left, int256[] memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(int256[] memory left, int256[] memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(address[] memory left, address[] memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(address[] memory left, address[] memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(bytes32[] memory left, bytes32[] memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(bytes32[] memory left, bytes32[] memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(string[] memory left, string[] memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(string[] memory left, string[] memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEq(bytes[] memory left, bytes[] memory right) virtual internal pure {
        vm.assertEq(left, right);
    }

    function assertEq(bytes[] memory left, bytes[] memory right, string memory err) virtual internal pure {
        vm.assertEq(left, right, err);
    }

    function assertEqUint(uint256 left, uint256 right) virtual internal pure {
        assertEq(left, right);
    }

    function assertNotEq(bool left, bool right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(bool left, bool right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(uint256 left, uint256 right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(uint256 left, uint256 right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEqDecimal(uint256 left, uint256 right, uint256 decimals) virtual internal pure {
        vm.assertNotEqDecimal(left, right, decimals);
    }

    function assertNotEqDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertNotEqDecimal(left, right, decimals, err);
    }

    function assertNotEq(int256 left, int256 right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(int256 left, int256 right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEqDecimal(int256 left, int256 right, uint256 decimals) virtual internal pure {
        vm.assertNotEqDecimal(left, right, decimals);
    }

    function assertNotEqDecimal(int256 left, int256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertNotEqDecimal(left, right, decimals, err);
    }

    function assertNotEq(address left, address right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(address left, address right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(bytes32 left, bytes32 right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(bytes32 left, bytes32 right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq32(bytes32 left, bytes32 right) virtual internal pure {
        assertNotEq(left, right);
    }

    function assertNotEq32(bytes32 left, bytes32 right, string memory err) virtual internal pure {
        assertNotEq(left, right, err);
    }

    function assertNotEq(string memory left, string memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(string memory left, string memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(bytes memory left, bytes memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(bytes memory left, bytes memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(bool[] memory left, bool[] memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(bool[] memory left, bool[] memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(uint256[] memory left, uint256[] memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(uint256[] memory left, uint256[] memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(int256[] memory left, int256[] memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(int256[] memory left, int256[] memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(address[] memory left, address[] memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(address[] memory left, address[] memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(bytes32[] memory left, bytes32[] memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(bytes32[] memory left, bytes32[] memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(string[] memory left, string[] memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(string[] memory left, string[] memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertNotEq(bytes[] memory left, bytes[] memory right) virtual internal pure {
        vm.assertNotEq(left, right);
    }

    function assertNotEq(bytes[] memory left, bytes[] memory right, string memory err) virtual internal pure {
        vm.assertNotEq(left, right, err);
    }

    function assertLt(uint256 left, uint256 right) virtual internal pure {
        vm.assertLt(left, right);
    }

    function assertLt(uint256 left, uint256 right, string memory err) virtual internal pure {
        vm.assertLt(left, right, err);
    }

    function assertLtDecimal(uint256 left, uint256 right, uint256 decimals) virtual internal pure {
        vm.assertLtDecimal(left, right, decimals);
    }

    function assertLtDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertLtDecimal(left, right, decimals, err);
    }

    function assertLt(int256 left, int256 right) virtual internal pure {
        vm.assertLt(left, right);
    }

    function assertLt(int256 left, int256 right, string memory err) virtual internal pure {
        vm.assertLt(left, right, err);
    }

    function assertLtDecimal(int256 left, int256 right, uint256 decimals) virtual internal pure {
        vm.assertLtDecimal(left, right, decimals);
    }

    function assertLtDecimal(int256 left, int256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertLtDecimal(left, right, decimals, err);
    }

    function assertGt(uint256 left, uint256 right) virtual internal pure {
        vm.assertGt(left, right);
    }

    function assertGt(uint256 left, uint256 right, string memory err) virtual internal pure {
        vm.assertGt(left, right, err);
    }

    function assertGtDecimal(uint256 left, uint256 right, uint256 decimals) virtual internal pure {
        vm.assertGtDecimal(left, right, decimals);
    }

    function assertGtDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertGtDecimal(left, right, decimals, err);
    }

    function assertGt(int256 left, int256 right) virtual internal pure {
        vm.assertGt(left, right);
    }

    function assertGt(int256 left, int256 right, string memory err) virtual internal pure {
        vm.assertGt(left, right, err);
    }

    function assertGtDecimal(int256 left, int256 right, uint256 decimals) virtual internal pure {
        vm.assertGtDecimal(left, right, decimals);
    }

    function assertGtDecimal(int256 left, int256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertGtDecimal(left, right, decimals, err);
    }

    function assertLe(uint256 left, uint256 right) virtual internal pure {
        vm.assertLe(left, right);
    }

    function assertLe(uint256 left, uint256 right, string memory err) virtual internal pure {
        vm.assertLe(left, right, err);
    }

    function assertLeDecimal(uint256 left, uint256 right, uint256 decimals) virtual internal pure {
        vm.assertLeDecimal(left, right, decimals);
    }

    function assertLeDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertLeDecimal(left, right, decimals, err);
    }

    function assertLe(int256 left, int256 right) virtual internal pure {
        vm.assertLe(left, right);
    }

    function assertLe(int256 left, int256 right, string memory err) virtual internal pure {
        vm.assertLe(left, right, err);
    }

    function assertLeDecimal(int256 left, int256 right, uint256 decimals) virtual internal pure {
        vm.assertLeDecimal(left, right, decimals);
    }

    function assertLeDecimal(int256 left, int256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertLeDecimal(left, right, decimals, err);
    }

    function assertGe(uint256 left, uint256 right) virtual internal pure {
        vm.assertGe(left, right);
    }

    function assertGe(uint256 left, uint256 right, string memory err) virtual internal pure {
        vm.assertGe(left, right, err);
    }

    function assertGeDecimal(uint256 left, uint256 right, uint256 decimals) virtual internal pure {
        vm.assertGeDecimal(left, right, decimals);
    }

    function assertGeDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertGeDecimal(left, right, decimals, err);
    }

    function assertGe(int256 left, int256 right) virtual internal pure {
        vm.assertGe(left, right);
    }

    function assertGe(int256 left, int256 right, string memory err) virtual internal pure {
        vm.assertGe(left, right, err);
    }

    function assertGeDecimal(int256 left, int256 right, uint256 decimals) virtual internal pure {
        vm.assertGeDecimal(left, right, decimals);
    }

    function assertGeDecimal(int256 left, int256 right, uint256 decimals, string memory err) virtual internal pure {
        vm.assertGeDecimal(left, right, decimals, err);
    }

    function assertApproxEqAbs(uint256 left, uint256 right, uint256 maxDelta) virtual internal pure {
        vm.assertApproxEqAbs(left, right, maxDelta);
    }

    function assertApproxEqAbs(uint256 left, uint256 right, uint256 maxDelta, string memory err) virtual internal pure {
        vm.assertApproxEqAbs(left, right, maxDelta, err);
    }

    function assertApproxEqAbsDecimal(uint256 left, uint256 right, uint256 maxDelta, uint256 decimals) virtual internal pure {
        vm.assertApproxEqAbsDecimal(left, right, maxDelta, decimals);
    }

    function assertApproxEqAbsDecimal(uint256 left, uint256 right, uint256 maxDelta, uint256 decimals, string memory err) virtual internal pure {
        vm.assertApproxEqAbsDecimal(left, right, maxDelta, decimals, err);
    }

    function assertApproxEqAbs(int256 left, int256 right, uint256 maxDelta) virtual internal pure {
        vm.assertApproxEqAbs(left, right, maxDelta);
    }

    function assertApproxEqAbs(int256 left, int256 right, uint256 maxDelta, string memory err) virtual internal pure {
        vm.assertApproxEqAbs(left, right, maxDelta, err);
    }

    function assertApproxEqAbsDecimal(int256 left, int256 right, uint256 maxDelta, uint256 decimals) virtual internal pure {
        vm.assertApproxEqAbsDecimal(left, right, maxDelta, decimals);
    }

    function assertApproxEqAbsDecimal(int256 left, int256 right, uint256 maxDelta, uint256 decimals, string memory err) virtual internal pure {
        vm.assertApproxEqAbsDecimal(left, right, maxDelta, decimals, err);
    }

    function assertApproxEqRel(uint256 left, uint256 right, uint256 maxPercentDelta) virtual internal pure {
        vm.assertApproxEqRel(left, right, maxPercentDelta);
    }

    function assertApproxEqRel(uint256 left, uint256 right, uint256 maxPercentDelta, string memory err) virtual internal pure {
        vm.assertApproxEqRel(left, right, maxPercentDelta, err);
    }

    function assertApproxEqRelDecimal(uint256 left, uint256 right, uint256 maxPercentDelta, uint256 decimals) virtual internal pure {
        vm.assertApproxEqRelDecimal(left, right, maxPercentDelta, decimals);
    }

    function assertApproxEqRelDecimal(uint256 left, uint256 right, uint256 maxPercentDelta, uint256 decimals, string memory err) virtual internal pure {
        vm.assertApproxEqRelDecimal(left, right, maxPercentDelta, decimals, err);
    }

    function assertApproxEqRel(int256 left, int256 right, uint256 maxPercentDelta) virtual internal pure {
        vm.assertApproxEqRel(left, right, maxPercentDelta);
    }

    function assertApproxEqRel(int256 left, int256 right, uint256 maxPercentDelta, string memory err) virtual internal pure {
        vm.assertApproxEqRel(left, right, maxPercentDelta, err);
    }

    function assertApproxEqRelDecimal(int256 left, int256 right, uint256 maxPercentDelta, uint256 decimals) virtual internal pure {
        vm.assertApproxEqRelDecimal(left, right, maxPercentDelta, decimals);
    }

    function assertApproxEqRelDecimal(int256 left, int256 right, uint256 maxPercentDelta, uint256 decimals, string memory err) virtual internal pure {
        vm.assertApproxEqRelDecimal(left, right, maxPercentDelta, decimals, err);
    }

    function checkEq0(bytes memory left, bytes memory right) internal pure returns (bool) {
        return keccak256(left) == keccak256(right);
    }

    function assertEq0(bytes memory left, bytes memory right) virtual internal pure {
        assertEq(left, right);
    }

    function assertEq0(bytes memory left, bytes memory right, string memory err) virtual internal pure {
        assertEq(left, right, err);
    }

    function assertNotEq0(bytes memory left, bytes memory right) virtual internal pure {
        assertNotEq(left, right);
    }

    function assertNotEq0(bytes memory left, bytes memory right, string memory err) virtual internal pure {
        assertNotEq(left, right, err);
    }

    function assertEqCall(address target, bytes memory callDataA, bytes memory callDataB) virtual internal {
        assertEqCall(target, callDataA, target, callDataB, true);
    }

    function assertEqCall(address targetA, bytes memory callDataA, address targetB, bytes memory callDataB) virtual internal {
        assertEqCall(targetA, callDataA, targetB, callDataB, true);
    }

    function assertEqCall(address target, bytes memory callDataA, bytes memory callDataB, bool strictRevertData) virtual internal {
        assertEqCall(target, callDataA, target, callDataB, strictRevertData);
    }

    function assertEqCall(address targetA, bytes memory callDataA, address targetB, bytes memory callDataB, bool strictRevertData) virtual internal {
        (bool successA, bytes memory returnDataA) = address(targetA).call(callDataA);
        (bool successB, bytes memory returnDataB) = address(targetB).call(callDataB);
        if (successA && successB) {
            assertEq(returnDataA, returnDataB, "Call return data does not match");
        }
        if (((!successA) && (!successB)) && strictRevertData) {
            assertEq(returnDataA, returnDataB, "Call revert data does not match");
        }
        if ((!successA) && successB) {
            emit log("Error: Calls were not equal");
            emit log_named_bytes("  Left call revert data", returnDataA);
            emit log_named_bytes(" Right call return data", returnDataB);
            revert("assertion failed");
        }
        if (successA && (!successB)) {
            emit log("Error: Calls were not equal");
            emit log_named_bytes("  Left call return data", returnDataA);
            emit log_named_bytes(" Right call revert data", returnDataB);
            revert("assertion failed");
        }
    }
}