"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../utils/Types");
const matchers_1 = require("../matchers");
const chai_1 = require("chai");
const decimal_js_1 = __importDefault(require("decimal.js"));
const ethers_1 = require("ethers");
const supportBigNumber = (Assertion, utils) => {
    Assertion.overwriteMethod('equals', override('equal', utils));
    Assertion.overwriteMethod('equal', override('equal', utils));
    Assertion.overwriteMethod('eq', override('equal', utils));
    Assertion.overwriteMethod('almostEqual', overrideAlmostEqual(utils));
};
const override = (name, utils) => {
    return (_super) => overwriteBigNumberFunction(name, _super, utils);
};
const overwriteBigNumberFunction = (readableName, _super, chaiUtils) => {
    return function (...args) {
        const [expected] = args;
        const actual = chaiUtils.flag(this, 'object');
        if (ethers_1.BigNumber.isBigNumber(actual) || ethers_1.BigNumber.isBigNumber(expected)) {
            const actualBN = (0, Types_1.toBigNumber)(actual);
            const expectedBN = (0, Types_1.toBigNumber)(expected);
            this.assert(actualBN.eq(expectedBN), `Expected ${actualBN} to be ${readableName} ${expectedBN}`, `Expected ${actualBN} NOT to be ${readableName} ${expectedBN}`, expectedBN.toString(), actualBN.toString());
        }
        else {
            _super.apply(this, args);
        }
    };
};
const overrideAlmostEqual = (utils) => {
    return (_super) => overwriteBigNumberAlmostEqual(_super, utils);
};
const overwriteBigNumberAlmostEqual = (_super, chaiUtils) => {
    return function (...args) {
        const [expected, { maxAbsoluteError = new decimal_js_1.default(0), maxRelativeError = new decimal_js_1.default(0), relation = undefined }] = args;
        const actual = chaiUtils.flag(this, 'object');
        (0, chai_1.expect)(maxAbsoluteError).to.be.instanceOf(decimal_js_1.default);
        (0, chai_1.expect)(maxRelativeError).to.be.instanceOf(decimal_js_1.default);
        if (ethers_1.BigNumber.isBigNumber(actual) || ethers_1.BigNumber.isBigNumber(expected)) {
            const actualDec = new decimal_js_1.default(actual.toString());
            const expectedDec = new decimal_js_1.default(expected.toString());
            if (actualDec.eq(expectedDec)) {
                return;
            }
            switch (relation) {
                case matchers_1.Relation.LesserOrEqual:
                    this.assert(actualDec.lte(expectedDec), `Expected ${actualDec} to be lesser than or equal to ${expectedDec}`, `Expected ${actualDec} NOT to be lesser than or equal to ${expectedDec}`, expectedDec.toString(), actualDec.toString());
                    break;
                case matchers_1.Relation.GreaterOrEqual:
                    this.assert(actualDec.gte(expectedDec), `Expected ${actualDec} to be greater than or equal to ${expectedDec}`, `Expected ${actualDec} NOT to be greater than or equal to ${expectedDec}`, expectedDec.toString(), actualDec.toString());
                    break;
            }
            const absoluteError = actualDec.sub(expectedDec).abs();
            const relativeError = absoluteError.div(expectedDec);
            this.assert(absoluteError.lte(maxAbsoluteError) || relativeError.lte(maxRelativeError), `Expected ${actualDec.toFixed()} to be almost equal to ${expectedDec.toFixed()}:'
                '- absoluteError = ${absoluteError.toFixed()}'
                '- relativeError = ${relativeError.toFixed()}`, `Expected ${actualDec.toFixed()} NOT to be almost equal to ${expectedDec.toFixed()}:'
                '- absoluteError = ${absoluteError.toFixed()}'
                '- relativeError = ${relativeError.toFixed()}`, expectedDec.toFixed(), actualDec.toFixed());
        }
        else {
            _super.apply(this, args);
        }
    };
};
exports.default = supportBigNumber;
//# sourceMappingURL=BigNumber.js.map