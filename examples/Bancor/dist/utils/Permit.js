"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permitSignature = exports.permitCustomSignature = exports.permitData = exports.domainSeparator = void 0;
const Contracts_1 = __importDefault(require("../components/Contracts"));
const Constants_1 = require("./Constants");
const TokenData_1 = require("./TokenData");
const eth_sig_util_1 = require("@metamask/eth-sig-util");
const ethereumjs_util_1 = require("ethereumjs-util");
const ethers_1 = require("ethers");
const VERSION = '1';
const HARDHAT_CHAIN_ID = 31337;
const PERMIT_TYPE = 'Permit';
const EIP712_DOMAIN = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
];
const PERMIT = [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' }
];
const domainSeparator = (name, verifyingContract) => {
    return ('0x' +
        eth_sig_util_1.TypedDataUtils.hashStruct('EIP712Domain', { name, version: VERSION, chainId: HARDHAT_CHAIN_ID, verifyingContract }, { EIP712Domain: EIP712_DOMAIN }, eth_sig_util_1.SignTypedDataVersion.V4).toString('hex'));
};
exports.domainSeparator = domainSeparator;
const permitData = (name, verifyingContract, owner, spender, amount, nonce, deadline = Constants_1.MAX_UINT256) => ({
    primaryType: PERMIT_TYPE,
    types: { EIP712Domain: EIP712_DOMAIN, Permit: PERMIT },
    domain: { name, version: VERSION, chainId: HARDHAT_CHAIN_ID, verifyingContract },
    message: { owner, spender, value: amount.toString(), nonce: nonce.toString(), deadline: deadline.toString() }
});
exports.permitData = permitData;
const permitCustomSignature = async (wallet, name, verifyingContract, spender, amount, nonce, deadline) => {
    const data = (0, exports.permitData)(name, verifyingContract, await wallet.getAddress(), spender, amount, nonce, deadline);
    const signedData = (0, eth_sig_util_1.signTypedData)({
        privateKey: Buffer.from(wallet.privateKey.slice(2), 'hex'),
        data,
        version: eth_sig_util_1.SignTypedDataVersion.V4
    });
    return (0, ethereumjs_util_1.fromRpcSig)(signedData);
};
exports.permitCustomSignature = permitCustomSignature;
const permitSignature = async (owner, tokenAddress, spender, amount, deadline) => {
    if (tokenAddress === TokenData_1.NATIVE_TOKEN_ADDRESS || tokenAddress === Constants_1.ZERO_ADDRESS) {
        return {
            v: 0,
            r: Constants_1.ZERO_BYTES32,
            s: Constants_1.ZERO_BYTES32
        };
    }
    const token = await Contracts_1.default.TestERC20Token.attach(tokenAddress);
    const nonce = await token.nonces(owner.address);
    return (0, exports.permitCustomSignature)(owner, await token.name(), tokenAddress, spender.address, ethers_1.BigNumber.from(amount), nonce.toNumber(), ethers_1.BigNumber.from(deadline));
};
exports.permitSignature = permitSignature;
//# sourceMappingURL=Permit.js.map