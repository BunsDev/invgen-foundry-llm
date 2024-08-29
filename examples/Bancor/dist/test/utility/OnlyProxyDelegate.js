"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = __importDefault(require("../../components/Contracts"));
const Constants_1 = require("../../utils/Constants");
const TokenData_1 = require("../../utils/TokenData");
const chai_1 = require("chai");
describe('OnlyProxyDelegate', () => {
    it('reverts when the proxy address was not set', async () => {
        const testOnlyProxyDelegate = await Contracts_1.default.TestOnlyProxyDelegate.deploy(Constants_1.ZERO_ADDRESS);
        const tx = testOnlyProxyDelegate.testOnlyProxyDelegate();
        await (0, chai_1.expect)(tx).to.have.been.revertedWithError('UnknownDelegator');
    });
    it('reverts when the address provided is not equal to the proxy', async () => {
        const testOnlyProxyDelegate = await Contracts_1.default.TestOnlyProxyDelegate.deploy(TokenData_1.NATIVE_TOKEN_ADDRESS);
        const tx = testOnlyProxyDelegate.testOnlyProxyDelegate();
        await (0, chai_1.expect)(tx).to.have.been.revertedWithError('UnknownDelegator');
    });
});
//# sourceMappingURL=OnlyProxyDelegate.js.map