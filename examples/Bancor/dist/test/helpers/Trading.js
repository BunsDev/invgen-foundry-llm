"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTestOrder = exports.setConstraint = exports.toFixed = exports.mulDivC = exports.mulDivF = exports.generateStrategyId = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const ethers_1 = require("ethers");
const generateStrategyId = (pairId, strategyIndex) => ethers_1.BigNumber.from(pairId).shl(128).or(strategyIndex);
exports.generateStrategyId = generateStrategyId;
const mulDivF = (x, y, z) => ethers_1.BigNumber.from(x).mul(y).div(z);
exports.mulDivF = mulDivF;
const mulDivC = (x, y, z) => ethers_1.BigNumber.from(x).mul(y).add(z).sub(1).div(z);
exports.mulDivC = mulDivC;
const toFixed = (x) => new decimal_js_1.default(x.toFixed(12)).toFixed();
exports.toFixed = toFixed;
const setConstraint = (constraint, byTargetAmount, expectedResultAmount) => {
    if (!constraint && constraint !== 0) {
        return byTargetAmount ? expectedResultAmount : 1;
    }
    return constraint;
};
exports.setConstraint = setConstraint;
/**
 * generates a test order
 */
const generateTestOrder = () => {
    return {
        y: ethers_1.BigNumber.from(800000),
        z: ethers_1.BigNumber.from(8000000),
        A: ethers_1.BigNumber.from(736899889),
        B: ethers_1.BigNumber.from(12148001999)
    };
};
exports.generateTestOrder = generateTestOrder;
//# sourceMappingURL=Trading.js.map