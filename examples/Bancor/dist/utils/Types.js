"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = exports.min = exports.toCents = exports.percentsToPPM = exports.fromPPM = exports.toPPM = exports.toWei = exports.toString = exports.toDecimal = exports.toBigNumber = exports.isFraction = void 0;
const Constants_1 = require("./Constants");
const TokenData_1 = require("./TokenData");
const decimal_js_1 = __importDefault(require("decimal.js"));
const ethers_1 = require("ethers");
// eslint-disable-next-line no-prototype-builtins
const isFraction = (v) => v.hasOwnProperty('n') && v.hasOwnProperty('d');
exports.isFraction = isFraction;
const toBigNumber = (v) => {
    if (ethers_1.BigNumber.isBigNumber(v)) {
        return v;
    }
    if ((0, exports.isFraction)(v)) {
        return {
            n: ethers_1.BigNumber.from(v.n.toFixed()),
            d: ethers_1.BigNumber.from(v.d.toFixed())
        };
    }
    if (decimal_js_1.default.isDecimal(v)) {
        return ethers_1.BigNumber.from(v.toFixed());
    }
    return ethers_1.BigNumber.from(v);
};
exports.toBigNumber = toBigNumber;
const toDecimal = (v) => {
    if (decimal_js_1.default.isDecimal(v)) {
        return v;
    }
    if ((0, exports.isFraction)(v)) {
        return {
            n: new decimal_js_1.default(v.n.toString()),
            d: new decimal_js_1.default(v.d.toString())
        };
    }
    if (ethers_1.BigNumber.isBigNumber(v)) {
        return new decimal_js_1.default(v.toString());
    }
    return new decimal_js_1.default(v.toString());
};
exports.toDecimal = toDecimal;
const toString = (fraction) => {
    if (decimal_js_1.default.isDecimal(fraction.n)) {
        return `{n: ${fraction.n.toFixed()}, d: ${fraction.d.toFixed()}}`;
    }
    return `{n: ${fraction.n.toString()}, d: ${fraction.d.toString()}}`;
};
exports.toString = toString;
const toWei = (v, decimals = TokenData_1.DEFAULT_DECIMALS) => {
    if (decimal_js_1.default.isDecimal(v)) {
        return ethers_1.BigNumber.from(v.mul(new decimal_js_1.default(10).pow(decimals)).toFixed());
    }
    return ethers_1.BigNumber.from(v).mul(ethers_1.BigNumber.from(10).pow(decimals));
};
exports.toWei = toWei;
const toPPM = (percent) => (percent ? percent * (Constants_1.PPM_RESOLUTION / 100) : 0);
exports.toPPM = toPPM;
const fromPPM = (ppm) => (ppm ? ppm / (Constants_1.PPM_RESOLUTION / 100) : 0);
exports.fromPPM = fromPPM;
const percentsToPPM = (percents) => {
    let value;
    if (typeof percents === 'string') {
        value = Number(percents.endsWith('%') ? percents.slice(0, -1) : percents);
    }
    else {
        value = percents;
    }
    return (value * Constants_1.PPM_RESOLUTION) / 100;
};
exports.percentsToPPM = percentsToPPM;
const toCents = (dollars) => Math.ceil(dollars * 100);
exports.toCents = toCents;
const min = (a, b) => ethers_1.BigNumber.from(a).lt(b) ? ethers_1.BigNumber.from(a) : ethers_1.BigNumber.from(b);
exports.min = min;
const max = (a, b) => ethers_1.BigNumber.from(a).gt(b) ? ethers_1.BigNumber.from(a) : ethers_1.BigNumber.from(b);
exports.max = max;
//# sourceMappingURL=Types.js.map