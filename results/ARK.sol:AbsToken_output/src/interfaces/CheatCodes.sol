/// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.8.24;

interface CheatCodes {
    struct Log {
        bytes32[] topics;
        bytes data;
    }

    function warp(uint256) external;

    function roll(uint256) external;

    function fee(uint256) external;

    function coinbase(address) external;

    function load(address, bytes32) external returns (bytes32);

    function store(address, bytes32, bytes32) external;

    function sign(uint256, bytes32) external returns (uint8, bytes32, bytes32);

    function addr(uint256) external returns (address);

    function deriveKey(string calldata, uint32) external returns (uint256);

    function deriveKey(string calldata, string calldata, uint32) external returns (uint256);

    function ffi(string[] calldata) external returns (bytes memory);

    function setEnv(string calldata, string calldata) external;

    function envBool(string calldata) external returns (bool);

    function envUint(string calldata) external returns (uint256);

    function envInt(string calldata) external returns (int256);

    function envAddress(string calldata) external returns (address);

    function envBytes32(string calldata) external returns (bytes32);

    function envString(string calldata) external returns (string memory);

    function envBytes(string calldata) external returns (bytes memory);

    function envBool(string calldata, string calldata) external returns (bool[] memory);

    function envUint(string calldata, string calldata) external returns (uint256[] memory);

    function envInt(string calldata, string calldata) external returns (int256[] memory);

    function envAddress(string calldata, string calldata) external returns (address[] memory);

    function envBytes32(string calldata, string calldata) external returns (bytes32[] memory);

    function envString(string calldata, string calldata) external returns (string[] memory);

    function envBytes(string calldata, string calldata) external returns (bytes[] memory);

    function prank(address) external;

    function startPrank(address) external;

    function prank(address, address) external;

    function startPrank(address, address) external;

    function stopPrank() external;

    function deal(address, uint256) external;

    function etch(address, bytes calldata) external;

    function expectRevert() external;

    function expectRevert(bytes calldata) external;

    function expectRevert(bytes4) external;

    function record() external;

    function accesses(address) external returns (bytes32[] memory reads, bytes32[] memory writes);

    function recordLogs() external;

    function getRecordedLogs() external returns (Log[] memory);

    function expectEmit(bool, bool, bool, bool) external;

    function expectEmit(bool, bool, bool, bool, address) external;

    function mockCall(address, bytes calldata, bytes calldata) external;

    function mockCall(address, uint256, bytes calldata, bytes calldata) external;

    function clearMockedCalls() external;

    function expectCall(address, bytes calldata) external;

    function expectCall(address, uint256, bytes calldata) external;

    function getCode(string calldata) external returns (bytes memory);

    function label(address, string calldata) external;

    function assume(bool) external;

    function setNonce(address, uint64) external;

    function getNonce(address) external returns (uint64);

    function chainId(uint256) external;

    function broadcast() external;

    function broadcast(address) external;

    function startBroadcast() external;

    function startBroadcast(address) external;

    function stopBroadcast() external;

    function readFile(string calldata) external returns (string memory);

    function readLine(string calldata) external returns (string memory);

    function writeFile(string calldata, string calldata) external;

    function writeLine(string calldata, string calldata) external;

    function closeFile(string calldata) external;

    function removeFile(string calldata) external;

    function toString(address) external returns (string memory);

    function toString(bytes calldata) external returns (string memory);

    function toString(bytes32) external returns (string memory);

    function toString(bool) external returns (string memory);

    function toString(uint256) external returns (string memory);

    function toString(int256) external returns (string memory);

    function snapshot() external returns (uint256);

    function revertTo(uint256) external returns (bool);

    function createFork(string calldata, uint256) external returns (uint256);

    function createFork(string calldata) external returns (uint256);

    function createSelectFork(string calldata, uint256) external returns (uint256);

    function createSelectFork(string calldata) external returns (uint256);

    function selectFork(uint256) external;

    /// Returns the currently active fork
    ///  Reverts if no fork is currently active
    function activeFork() external returns (uint256);

    function rollFork(uint256) external;

    function rollFork(uint256 forkId, uint256 blockNumber) external;

    /// Returns the RPC url for the given alias
    function rpcUrl(string calldata) external returns (string memory);

    /// Returns all rpc urls and their aliases `[alias, url][]`
    function rpcUrls() external returns (string[2][] memory);

    function makePersistent(address account) external;
}