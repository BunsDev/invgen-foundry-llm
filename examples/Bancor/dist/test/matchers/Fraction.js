"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../utils/Types");
const matchers_1 = require("../matchers");
const chai_1 = require("chai");
const decimal_js_1 = __importDefault(require("decimal.js"));
const supportFraction = (Assertion, utils) => {
    Assertion.overwriteMethod('equals', override('equal', utils));
    Assertion.overwriteMethod('equal', override('equal', utils));
    Assertion.overwriteMethod('eq', override('equal', utils));
    Assertion.overwriteMethod('almostEqual', overrideAlmostEqual(utils));
};
const override = (name, utils) => {
    return (_super) => overwriteFractionFunction(name, _super, utils);
};
const overwriteFractionFunction = (readableName, _super, chaiUtils) => {
    return function (...args) {
        const [expected] = args;
        const actual = chaiUtils.flag(this, 'object');
        if ((0, Types_1.isFraction)(actual) && (0, Types_1.isFraction)(expected)) {
            const actualDec = (0, Types_1.toDecimal)(actual);
            const expectedDec = (0, Types_1.toDecimal)(expected);
            // if neither of the denominators are zero - compare the result of the division. Otherwise, co an explicit
            // comparison
            let res;
            if (!actualDec.d.isZero() && !expectedDec.d.isZero()) {
                res = actualDec.n.div(actualDec.d).eq(expectedDec.n.div(expectedDec.d));
            }
            else {
                res = actualDec.n.eq(expectedDec.n) && actualDec.d.eq(expectedDec.d);
            }
            this.assert(res, `Expected ${(0, Types_1.toString)(actualDec)} to be ${readableName} to ${(0, Types_1.toString)(expectedDec)}`, `Expected ${(0, Types_1.toString)(actualDec)} NOT to be ${readableName} to ${(0, Types_1.toString)(expectedDec)}`, (0, Types_1.toString)(expectedDec), (0, Types_1.toString)(actualDec));
        }
        else {
            _super.apply(this, args);
        }
    };
};
const overrideAlmostEqual = (utils) => {
    return (_super) => overwriteFractionAlmostEqual(_super, utils);
};
const overwriteFractionAlmostEqual = (_super, chaiUtils) => {
    return function (...args) {
        const [expected, { maxAbsoluteError = new decimal_js_1.default(0), maxRelativeError = new decimal_js_1.default(0), relation = undefined }] = args;
        const actual = chaiUtils.flag(this, 'object');
        (0, chai_1.expect)(maxAbsoluteError).to.be.instanceOf(decimal_js_1.default);
        (0, chai_1.expect)(maxRelativeError).to.be.instanceOf(decimal_js_1.default);
        let actualFraction;
        let expectedFraction;
        if ((0, Types_1.isFraction)(actual) && (0, Types_1.isFraction)(expected)) {
            actualFraction = (0, Types_1.toDecimal)(actual);
            expectedFraction = (0, Types_1.toDecimal)(expected);
            const x = actualFraction.n.mul(expectedFraction.d);
            const y = actualFraction.d.mul(expectedFraction.n);
            if (x.eq(y)) {
                return;
            }
            const actualDec = actualFraction.n.div(actualFraction.d);
            const expectedDec = expectedFraction.n.div(expectedFraction.d);
            switch (relation) {
                case matchers_1.Relation.LesserOrEqual:
                    this.assert(actualDec.lte(expectedDec), `Expected ${(0, Types_1.toString)(actualFraction)} to be lesser than or equal to ${(0, Types_1.toString)(expectedFraction)}`, `Expected ${(0, Types_1.toString)(actualFraction)} NOT to be lesser than or equal to ${(0, Types_1.toString)(expectedFraction)}`, (0, Types_1.toString)(expectedFraction), (0, Types_1.toString)(actualFraction));
                    break;
                case matchers_1.Relation.GreaterOrEqual:
                    this.assert(actualDec.gte(expectedDec), `Expected ${(0, Types_1.toString)(actualFraction)} to be greater than or equal to ${(0, Types_1.toString)(expectedFraction)}`, `Expected ${(0, Types_1.toString)(actualFraction)} NOT to be greater than or equal to ${(0, Types_1.toString)(expectedFraction)}`, (0, Types_1.toString)(expectedFraction), (0, Types_1.toString)(actualFraction));
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
            return _super.apply(this, args);
        }
    };
};
exports.default = supportFraction;
//# sourceMappingURL=Fraction.js.map