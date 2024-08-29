/// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2<0.9.0;
pragma experimental ABIEncoderV2;

import { StdStorage, stdStorage } from "./StdStorage.sol";
import { console2 } from "./console2.sol";
import { Vm } from "./Vm.sol";

abstract contract StdCheatsSafe {
    enum AddressType {
        Payable,
        NonPayable,
        ZeroAddress,
        Precompile,
        ForgeAddress
    }

    struct RawTx1559 {
        string[] arguments;
        address contractAddress;
        string contractName;
        string functionSig;
        bytes32 hash;
        RawTx1559Detail txDetail;
        string opcode;
    }

    struct RawTx1559Detail {
        AccessList[] accessList;
        bytes data;
        address from;
        bytes gas;
        bytes nonce;
        address to;
        bytes txType;
        bytes value;
    }

    struct Tx1559 {
        string[] arguments;
        address contractAddress;
        string contractName;
        string functionSig;
        bytes32 hash;
        Tx1559Detail txDetail;
        string opcode;
    }

    struct Tx1559Detail {
        AccessList[] accessList;
        bytes data;
        address from;
        uint256 gas;
        uint256 nonce;
        address to;
        uint256 txType;
        uint256 value;
    }

    struct TxLegacy {
        string[] arguments;
        address contractAddress;
        string contractName;
        string functionSig;
        string hash;
        string opcode;
        TxDetailLegacy transaction;
    }

    struct TxDetailLegacy {
        AccessList[] accessList;
        uint256 chainId;
        bytes data;
        address from;
        uint256 gas;
        uint256 gasPrice;
        bytes32 hash;
        uint256 nonce;
        bytes1 opcode;
        bytes32 r;
        bytes32 s;
        uint256 txType;
        address to;
        uint8 v;
        uint256 value;
    }

    struct AccessList {
        address accessAddress;
        bytes32[] storageKeys;
    }

    struct RawReceipt {
        bytes32 blockHash;
        bytes blockNumber;
        address contractAddress;
        bytes cumulativeGasUsed;
        bytes effectiveGasPrice;
        address from;
        bytes gasUsed;
        RawReceiptLog[] logs;
        bytes logsBloom;
        bytes status;
        address to;
        bytes32 transactionHash;
        bytes transactionIndex;
    }

    struct Receipt {
        bytes32 blockHash;
        uint256 blockNumber;
        address contractAddress;
        uint256 cumulativeGasUsed;
        uint256 effectiveGasPrice;
        address from;
        uint256 gasUsed;
        ReceiptLog[] logs;
        bytes logsBloom;
        uint256 status;
        address to;
        bytes32 transactionHash;
        uint256 transactionIndex;
    }

    struct EIP1559ScriptArtifact {
        string[] libraries;
        string path;
        string[] pending;
        Receipt[] receipts;
        uint256 timestamp;
        Tx1559[] transactions;
        TxReturn[] txReturns;
    }

    struct RawEIP1559ScriptArtifact {
        string[] libraries;
        string path;
        string[] pending;
        RawReceipt[] receipts;
        TxReturn[] txReturns;
        uint256 timestamp;
        RawTx1559[] transactions;
    }

    struct RawReceiptLog {
        address logAddress;
        bytes32 blockHash;
        bytes blockNumber;
        bytes data;
        bytes logIndex;
        bool removed;
        bytes32[] topics;
        bytes32 transactionHash;
        bytes transactionIndex;
        bytes transactionLogIndex;
    }

    struct ReceiptLog {
        address logAddress;
        bytes32 blockHash;
        uint256 blockNumber;
        bytes data;
        uint256 logIndex;
        bytes32[] topics;
        uint256 transactionIndex;
        uint256 transactionLogIndex;
        bool removed;
    }

    struct TxReturn {
        string internalType;
        string value;
    }

    struct Account {
        address addr;
        uint256 key;
    }

    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
    uint256 private constant UINT256_MAX = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
    bool private gasMeteringOff;

    modifier skipWhenForking() {
        if (!isFork()) {
            _;
        }
    }

    modifier skipWhenNotForking() {
        if (isFork()) {
            _;
        }
    }

    modifier noGasMetering() {
        vm.pauseGasMetering();
        bool gasStartedOff = gasMeteringOff;
        gasMeteringOff = true;
        _;
        if (!gasStartedOff) {
            gasMeteringOff = false;
            vm.resumeGasMetering();
        }
    }

    function assumeNotBlacklisted(address token, address addr) virtual internal view {
        uint256 tokenCodeSize;
        assembly {
            tokenCodeSize := extcodesize(token)
        }
        require(tokenCodeSize > 0, "StdCheats assumeNotBlacklisted(address,address): Token address is not a contract.");
        bool success;
        bytes memory returnData;
        (success, returnData) = token.staticcall(abi.encodeWithSelector(0xfe575a87, addr));
        vm.assume((!success) || (abi.decode(returnData, (bool)) == false));
        (success, returnData) = token.staticcall(abi.encodeWithSelector(0xe47d6060, addr));
        vm.assume((!success) || (abi.decode(returnData, (bool)) == false));
    }

    function assumeNoBlacklisted(address token, address addr) virtual internal view {
        assumeNotBlacklisted(token, addr);
    }

    function assumeAddressIsNot(address addr, AddressType addressType) virtual internal {
        if (addressType == AddressType.Payable) {
            assumeNotPayable(addr);
        } else if (addressType == AddressType.NonPayable) {
            assumePayable(addr);
        } else if (addressType == AddressType.ZeroAddress) {
            assumeNotZeroAddress(addr);
        } else if (addressType == AddressType.Precompile) {
            assumeNotPrecompile(addr);
        } else if (addressType == AddressType.ForgeAddress) {
            assumeNotForgeAddress(addr);
        }
    }

    function assumeAddressIsNot(address addr, AddressType addressType1, AddressType addressType2) virtual internal {
        assumeAddressIsNot(addr, addressType1);
        assumeAddressIsNot(addr, addressType2);
    }

    function assumeAddressIsNot(address addr, AddressType addressType1, AddressType addressType2, AddressType addressType3) virtual internal {
        assumeAddressIsNot(addr, addressType1);
        assumeAddressIsNot(addr, addressType2);
        assumeAddressIsNot(addr, addressType3);
    }

    function assumeAddressIsNot(address addr, AddressType addressType1, AddressType addressType2, AddressType addressType3, AddressType addressType4) virtual internal {
        assumeAddressIsNot(addr, addressType1);
        assumeAddressIsNot(addr, addressType2);
        assumeAddressIsNot(addr, addressType3);
        assumeAddressIsNot(addr, addressType4);
    }

    function _isPayable(address addr) private returns (bool) {
        require(addr.balance < UINT256_MAX, "StdCheats _isPayable(address): Balance equals max uint256, so it cannot receive any more funds");
        uint256 origBalanceTest = address(this).balance;
        uint256 origBalanceAddr = address(addr).balance;
        vm.deal(address(this), 1);
        (bool success, ) = payable(addr).call{value: 1}("");
        vm.deal(address(this), origBalanceTest);
        vm.deal(addr, origBalanceAddr);
        return success;
    }

    function assumePayable(address addr) virtual internal {
        vm.assume(_isPayable(addr));
    }

    function assumeNotPayable(address addr) virtual internal {
        vm.assume(!_isPayable(addr));
    }

    function assumeNotZeroAddress(address addr) virtual internal pure {
        vm.assume(addr != address(0));
    }

    function assumeNotPrecompile(address addr) virtual internal pure {
        assumeNotPrecompile(addr, _pureChainId());
    }

    function assumeNotPrecompile(address addr, uint256 chainId) virtual internal pure {
        vm.assume((addr < address(0x1)) || (addr > address(0x9)));
        if ((chainId == 10) || (chainId == 420)) {
            vm.assume((addr < address(0x4200000000000000000000000000000000000000)) || (addr > address(0x4200000000000000000000000000000000000800)));
        } else if ((chainId == 42161) || (chainId == 421613)) {
            vm.assume((addr < address(0x0000000000000000000000000000000000000064)) || (addr > address(0x0000000000000000000000000000000000000068)));
        } else if ((chainId == 43114) || (chainId == 43113)) {
            vm.assume((addr < address(0x0100000000000000000000000000000000000000)) || (addr > address(0x01000000000000000000000000000000000000ff)));
            vm.assume((addr < address(0x0200000000000000000000000000000000000000)) || (addr > address(0x02000000000000000000000000000000000000FF)));
            vm.assume((addr < address(0x0300000000000000000000000000000000000000)) || (addr > address(0x03000000000000000000000000000000000000Ff)));
        }
    }

    function assumeNotForgeAddress(address addr) virtual internal pure {
        vm.assume(((addr != address(vm)) && (addr != 0x000000000000000000636F6e736F6c652e6c6f67)) && (addr != 0x4e59b44847b379578588920cA78FbF26c0B4956C));
    }

    function readEIP1559ScriptArtifact(string memory path) virtual internal view returns (EIP1559ScriptArtifact memory) {
        string memory data = vm.readFile(path);
        bytes memory parsedData = vm.parseJson(data);
        RawEIP1559ScriptArtifact memory rawArtifact = abi.decode(parsedData, (RawEIP1559ScriptArtifact));
        EIP1559ScriptArtifact memory artifact;
        artifact.libraries = rawArtifact.libraries;
        artifact.path = rawArtifact.path;
        artifact.timestamp = rawArtifact.timestamp;
        artifact.pending = rawArtifact.pending;
        artifact.txReturns = rawArtifact.txReturns;
        artifact.receipts = rawToConvertedReceipts(rawArtifact.receipts);
        artifact.transactions = rawToConvertedEIPTx1559s(rawArtifact.transactions);
        return artifact;
    }

    function rawToConvertedEIPTx1559s(RawTx1559[] memory rawTxs) virtual internal pure returns (Tx1559[] memory) {
        Tx1559[] memory txs = new Tx1559[](rawTxs.length);
        for (uint256 i; i < rawTxs.length; i++) {
            txs[i] = rawToConvertedEIPTx1559(rawTxs[i]);
        }
        return txs;
    }

    function rawToConvertedEIPTx1559(RawTx1559 memory rawTx) virtual internal pure returns (Tx1559 memory) {
        Tx1559 memory transaction;
        transaction.arguments = rawTx.arguments;
        transaction.contractName = rawTx.contractName;
        transaction.functionSig = rawTx.functionSig;
        transaction.hash = rawTx.hash;
        transaction.txDetail = rawToConvertedEIP1559Detail(rawTx.txDetail);
        transaction.opcode = rawTx.opcode;
        return transaction;
    }

    function rawToConvertedEIP1559Detail(RawTx1559Detail memory rawDetail) virtual internal pure returns (Tx1559Detail memory) {
        Tx1559Detail memory txDetail;
        txDetail.data = rawDetail.data;
        txDetail.from = rawDetail.from;
        txDetail.to = rawDetail.to;
        txDetail.nonce = _bytesToUint(rawDetail.nonce);
        txDetail.txType = _bytesToUint(rawDetail.txType);
        txDetail.value = _bytesToUint(rawDetail.value);
        txDetail.gas = _bytesToUint(rawDetail.gas);
        txDetail.accessList = rawDetail.accessList;
        return txDetail;
    }

    function readTx1559s(string memory path) virtual internal view returns (Tx1559[] memory) {
        string memory deployData = vm.readFile(path);
        bytes memory parsedDeployData = vm.parseJson(deployData, ".transactions");
        RawTx1559[] memory rawTxs = abi.decode(parsedDeployData, (RawTx1559[]));
        return rawToConvertedEIPTx1559s(rawTxs);
    }

    function readTx1559(string memory path, uint256 index) virtual internal view returns (Tx1559 memory) {
        string memory deployData = vm.readFile(path);
        string memory key = string(abi.encodePacked(".transactions[", vm.toString(index), "]"));
        bytes memory parsedDeployData = vm.parseJson(deployData, key);
        RawTx1559 memory rawTx = abi.decode(parsedDeployData, (RawTx1559));
        return rawToConvertedEIPTx1559(rawTx);
    }

    function readReceipts(string memory path) virtual internal view returns (Receipt[] memory) {
        string memory deployData = vm.readFile(path);
        bytes memory parsedDeployData = vm.parseJson(deployData, ".receipts");
        RawReceipt[] memory rawReceipts = abi.decode(parsedDeployData, (RawReceipt[]));
        return rawToConvertedReceipts(rawReceipts);
    }

    function readReceipt(string memory path, uint256 index) virtual internal view returns (Receipt memory) {
        string memory deployData = vm.readFile(path);
        string memory key = string(abi.encodePacked(".receipts[", vm.toString(index), "]"));
        bytes memory parsedDeployData = vm.parseJson(deployData, key);
        RawReceipt memory rawReceipt = abi.decode(parsedDeployData, (RawReceipt));
        return rawToConvertedReceipt(rawReceipt);
    }

    function rawToConvertedReceipts(RawReceipt[] memory rawReceipts) virtual internal pure returns (Receipt[] memory) {
        Receipt[] memory receipts = new Receipt[](rawReceipts.length);
        for (uint256 i; i < rawReceipts.length; i++) {
            receipts[i] = rawToConvertedReceipt(rawReceipts[i]);
        }
        return receipts;
    }

    function rawToConvertedReceipt(RawReceipt memory rawReceipt) virtual internal pure returns (Receipt memory) {
        Receipt memory receipt;
        receipt.blockHash = rawReceipt.blockHash;
        receipt.to = rawReceipt.to;
        receipt.from = rawReceipt.from;
        receipt.contractAddress = rawReceipt.contractAddress;
        receipt.effectiveGasPrice = _bytesToUint(rawReceipt.effectiveGasPrice);
        receipt.cumulativeGasUsed = _bytesToUint(rawReceipt.cumulativeGasUsed);
        receipt.gasUsed = _bytesToUint(rawReceipt.gasUsed);
        receipt.status = _bytesToUint(rawReceipt.status);
        receipt.transactionIndex = _bytesToUint(rawReceipt.transactionIndex);
        receipt.blockNumber = _bytesToUint(rawReceipt.blockNumber);
        receipt.logs = rawToConvertedReceiptLogs(rawReceipt.logs);
        receipt.logsBloom = rawReceipt.logsBloom;
        receipt.transactionHash = rawReceipt.transactionHash;
        return receipt;
    }

    function rawToConvertedReceiptLogs(RawReceiptLog[] memory rawLogs) virtual internal pure returns (ReceiptLog[] memory) {
        ReceiptLog[] memory logs = new ReceiptLog[](rawLogs.length);
        for (uint256 i; i < rawLogs.length; i++) {
            logs[i].logAddress = rawLogs[i].logAddress;
            logs[i].blockHash = rawLogs[i].blockHash;
            logs[i].blockNumber = _bytesToUint(rawLogs[i].blockNumber);
            logs[i].data = rawLogs[i].data;
            logs[i].logIndex = _bytesToUint(rawLogs[i].logIndex);
            logs[i].topics = rawLogs[i].topics;
            logs[i].transactionIndex = _bytesToUint(rawLogs[i].transactionIndex);
            logs[i].transactionLogIndex = _bytesToUint(rawLogs[i].transactionLogIndex);
            logs[i].removed = rawLogs[i].removed;
        }
        return logs;
    }

    function deployCode(string memory what, bytes memory args) virtual internal returns (address addr) {
        bytes memory bytecode = abi.encodePacked(vm.getCode(what), args);
        assembly {
            addr := create(0, add(bytecode, 0x20), mload(bytecode))
        }
        require(addr != address(0), "StdCheats deployCode(string,bytes): Deployment failed.");
    }

    function deployCode(string memory what) virtual internal returns (address addr) {
        bytes memory bytecode = vm.getCode(what);
        assembly {
            addr := create(0, add(bytecode, 0x20), mload(bytecode))
        }
        require(addr != address(0), "StdCheats deployCode(string): Deployment failed.");
    }

    /// @dev deploy contract with value on construction
    function deployCode(string memory what, bytes memory args, uint256 val) virtual internal returns (address addr) {
        bytes memory bytecode = abi.encodePacked(vm.getCode(what), args);
        assembly {
            addr := create(val, add(bytecode, 0x20), mload(bytecode))
        }
        require(addr != address(0), "StdCheats deployCode(string,bytes,uint256): Deployment failed.");
    }

    function deployCode(string memory what, uint256 val) virtual internal returns (address addr) {
        bytes memory bytecode = vm.getCode(what);
        assembly {
            addr := create(val, add(bytecode, 0x20), mload(bytecode))
        }
        require(addr != address(0), "StdCheats deployCode(string,uint256): Deployment failed.");
    }

    function makeAddrAndKey(string memory name) virtual internal returns (address addr, uint256 privateKey) {
        privateKey = uint256(keccak256(abi.encodePacked(name)));
        addr = vm.addr(privateKey);
        vm.label(addr, name);
    }

    function makeAddr(string memory name) virtual internal returns (address addr) {
        (addr, ) = makeAddrAndKey(name);
    }

    function destroyAccount(address who, address beneficiary) virtual internal {
        uint256 currBalance = who.balance;
        vm.etch(who, abi.encode());
        vm.deal(who, 0);
        vm.resetNonce(who);
        uint256 beneficiaryBalance = beneficiary.balance;
        vm.deal(beneficiary, currBalance + beneficiaryBalance);
    }

    function makeAccount(string memory name) virtual internal returns (Account memory account) {
        (account.addr, account.key) = makeAddrAndKey(name);
    }

    function deriveRememberKey(string memory mnemonic, uint32 index) virtual internal returns (address who, uint256 privateKey) {
        privateKey = vm.deriveKey(mnemonic, index);
        who = vm.rememberKey(privateKey);
    }

    function _bytesToUint(bytes memory b) private pure returns (uint256) {
        require(b.length <= 32, "StdCheats _bytesToUint(bytes): Bytes length exceeds 32.");
        return abi.decode(abi.encodePacked(new bytes(32 - b.length), b), (uint256));
    }

    function isFork() virtual internal view returns (bool status) {
        try vm.activeFork() {
            status = true;
        } catch (bytes memory) {}
    }

    function _viewChainId() private view returns (uint256 chainId) {
        assembly {
            chainId := chainid()
        }
        address(this);
    }

    function _pureChainId() private pure returns (uint256 chainId) {
        function() internal view returns (uint256) fnIn = _viewChainId;
        function() internal pure returns (uint256) pureChainId;
        assembly {
            pureChainId := fnIn
        }
        chainId = pureChainId();
    }
}

abstract contract StdCheats is StdCheatsSafe {
    using stdStorage for StdStorage;

    StdStorage private stdstore;
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
    address private constant CONSOLE2_ADDRESS = 0x000000000000000000636F6e736F6c652e6c6f67;

    function skip(uint256 time) virtual internal {
        vm.warp(block.timestamp + time);
    }

    function rewind(uint256 time) virtual internal {
        vm.warp(block.timestamp - time);
    }

    function hoax(address msgSender) virtual internal {
        vm.deal(msgSender, 1 << 128);
        vm.prank(msgSender);
    }

    function hoax(address msgSender, uint256 give) virtual internal {
        vm.deal(msgSender, give);
        vm.prank(msgSender);
    }

    function hoax(address msgSender, address origin) virtual internal {
        vm.deal(msgSender, 1 << 128);
        vm.prank(msgSender, origin);
    }

    function hoax(address msgSender, address origin, uint256 give) virtual internal {
        vm.deal(msgSender, give);
        vm.prank(msgSender, origin);
    }

    function startHoax(address msgSender) virtual internal {
        vm.deal(msgSender, 1 << 128);
        vm.startPrank(msgSender);
    }

    function startHoax(address msgSender, uint256 give) virtual internal {
        vm.deal(msgSender, give);
        vm.startPrank(msgSender);
    }

    function startHoax(address msgSender, address origin) virtual internal {
        vm.deal(msgSender, 1 << 128);
        vm.startPrank(msgSender, origin);
    }

    function startHoax(address msgSender, address origin, uint256 give) virtual internal {
        vm.deal(msgSender, give);
        vm.startPrank(msgSender, origin);
    }

    function changePrank(address msgSender) virtual internal {
        console2_log_StdCheats("changePrank is deprecated. Please use vm.startPrank instead.");
        vm.stopPrank();
        vm.startPrank(msgSender);
    }

    function changePrank(address msgSender, address txOrigin) virtual internal {
        vm.stopPrank();
        vm.startPrank(msgSender, txOrigin);
    }

    function deal(address to, uint256 give) virtual internal {
        vm.deal(to, give);
    }

    function deal(address token, address to, uint256 give) virtual internal {
        deal(token, to, give, false);
    }

    function dealERC1155(address token, address to, uint256 id, uint256 give) virtual internal {
        dealERC1155(token, to, id, give, false);
    }

    function deal(address token, address to, uint256 give, bool adjust) virtual internal {
        (, bytes memory balData) = token.staticcall(abi.encodeWithSelector(0x70a08231, to));
        uint256 prevBal = abi.decode(balData, (uint256));
        stdstore.target(token).sig(0x70a08231).with_key(to).checked_write(give);
        if (adjust) {
            (, bytes memory totSupData) = token.staticcall(abi.encodeWithSelector(0x18160ddd));
            uint256 totSup = abi.decode(totSupData, (uint256));
            if (give < prevBal) {
                totSup -= (prevBal - give);
            } else {
                totSup += (give - prevBal);
            }
            stdstore.target(token).sig(0x18160ddd).checked_write(totSup);
        }
    }

    function dealERC1155(address token, address to, uint256 id, uint256 give, bool adjust) virtual internal {
        (, bytes memory balData) = token.staticcall(abi.encodeWithSelector(0x00fdd58e, to, id));
        uint256 prevBal = abi.decode(balData, (uint256));
        stdstore.target(token).sig(0x00fdd58e).with_key(to).with_key(id).checked_write(give);
        if (adjust) {
            (, bytes memory totSupData) = token.staticcall(abi.encodeWithSelector(0xbd85b039, id));
            require(totSupData.length != 0, "StdCheats deal(address,address,uint,uint,bool): target contract is not ERC1155Supply.");
            uint256 totSup = abi.decode(totSupData, (uint256));
            if (give < prevBal) {
                totSup -= (prevBal - give);
            } else {
                totSup += (give - prevBal);
            }
            stdstore.target(token).sig(0xbd85b039).with_key(id).checked_write(totSup);
        }
    }

    function dealERC721(address token, address to, uint256 id) virtual internal {
        (bool successMinted, bytes memory ownerData) = token.staticcall(abi.encodeWithSelector(0x6352211e, id));
        require(successMinted, "StdCheats deal(address,address,uint,bool): id not minted.");
        (, bytes memory fromBalData) = token.staticcall(abi.encodeWithSelector(0x70a08231, abi.decode(ownerData, (address))));
        uint256 fromPrevBal = abi.decode(fromBalData, (uint256));
        (, bytes memory toBalData) = token.staticcall(abi.encodeWithSelector(0x70a08231, to));
        uint256 toPrevBal = abi.decode(toBalData, (uint256));
        stdstore.target(token).sig(0x70a08231).with_key(abi.decode(ownerData, (address))).checked_write(--fromPrevBal);
        stdstore.target(token).sig(0x70a08231).with_key(to).checked_write(++toPrevBal);
        stdstore.target(token).sig(0x6352211e).with_key(id).checked_write(to);
    }

    function deployCodeTo(string memory what, address where) virtual internal {
        deployCodeTo(what, "", 0, where);
    }

    function deployCodeTo(string memory what, bytes memory args, address where) virtual internal {
        deployCodeTo(what, args, 0, where);
    }

    function deployCodeTo(string memory what, bytes memory args, uint256 value, address where) virtual internal {
        bytes memory creationCode = vm.getCode(what);
        vm.etch(where, abi.encodePacked(creationCode, args));
        (bool success, bytes memory runtimeBytecode) = where.call{value: value}("");
        require(success, "StdCheats deployCodeTo(string,bytes,uint256,address): Failed to create runtime bytecode.");
        vm.etch(where, runtimeBytecode);
    }

    function console2_log_StdCheats(string memory p0) private view {
        (bool status, ) = address(CONSOLE2_ADDRESS).staticcall(abi.encodeWithSignature("log(string)", p0));
        status;
    }
}