"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.setBalance = exports.getBalances = exports.getEvents = exports.getBalance = exports.getTransactionCost = exports.getTransactionGas = exports.toAddress = void 0;
const Contracts_1 = __importDefault(require("../../components/Contracts"));
const TokenData_1 = require("../../utils/TokenData");
const hardhat_1 = require("hardhat");
const toAddress = (account) => (typeof account === 'string' ? account : account.address);
exports.toAddress = toAddress;
const getTransactionGas = async (res) => {
    const receipt = await res.wait();
    return receipt.cumulativeGasUsed;
};
exports.getTransactionGas = getTransactionGas;
const getTransactionCost = async (res) => {
    const receipt = await res.wait();
    return receipt.effectiveGasPrice.mul(await (0, exports.getTransactionGas)(res));
};
exports.getTransactionCost = getTransactionCost;
const getBalance = async (token, account) => {
    const accountAddress = (0, exports.toAddress)(account);
    const tokenAddress = token.address;
    if (tokenAddress === TokenData_1.NATIVE_TOKEN_ADDRESS) {
        return hardhat_1.ethers.provider.getBalance(accountAddress);
    }
    return await (await Contracts_1.default.ERC20.attach(tokenAddress)).balanceOf(accountAddress);
};
exports.getBalance = getBalance;
/**
 * Get all events with the event name from a transaction
 * @returns array of events
 */
const getEvents = async (tx, eventName) => {
    const events = (await tx.wait()).events ?? [];
    return events.filter((e) => e.event === eventName);
};
exports.getEvents = getEvents;
const getBalances = async (tokens, account) => {
    const balances = {};
    for (const token of tokens) {
        balances[token.address] = await (0, exports.getBalance)(token, account);
    }
    return balances;
};
exports.getBalances = getBalances;
const setBalance = async (account, amount) => {
    await hardhat_1.network.provider.send('hardhat_setBalance', [account, amount.toHexString()]);
};
exports.setBalance = setBalance;
const transfer = async (sourceAccount, token, target, amount) => {
    const targetAddress = (0, exports.toAddress)(target);
    const tokenAddress = token.address;
    if (tokenAddress === TokenData_1.NATIVE_TOKEN_ADDRESS) {
        return await sourceAccount.sendTransaction({ to: targetAddress, value: amount });
    }
    return await (await Contracts_1.default.ERC20.attach(tokenAddress)).connect(sourceAccount).transfer(targetAddress, amount);
};
exports.transfer = transfer;
//# sourceMappingURL=Utils.js.map