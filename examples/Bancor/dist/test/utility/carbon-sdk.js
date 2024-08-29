"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeOrder = exports.encodeOrder = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const ethers_1 = require("ethers");
const ONE = 2 ** 48;
const BnToDec = (x) => new decimal_js_1.default(x.toString());
const DecToBn = (x) => ethers_1.BigNumber.from(x.toFixed());
function bitLength(value) {
    return value.gt(0) ? decimal_js_1.default.log2(value.toString()).add(1).floor().toNumber() : 0;
}
function encodeRate(value) {
    const data = DecToBn(value.sqrt().mul(ONE).floor());
    const length = bitLength(data.div(ONE));
    return BnToDec(data.shr(length).shl(length));
}
function decodeRate(value) {
    return value.div(ONE).pow(2);
}
function encodeFloat(value) {
    const exponent = bitLength(value.div(ONE));
    const mantissa = value.shr(exponent);
    return ethers_1.BigNumber.from(ONE).mul(exponent).or(mantissa);
}
function decodeFloat(value) {
    return value.mod(ONE).shl(value.div(ONE).toNumber());
}
const encodeOrder = (order) => {
    const y = DecToBn(order.liquidity);
    const L = DecToBn(encodeRate(order.lowestRate));
    const H = DecToBn(encodeRate(order.highestRate));
    const M = DecToBn(encodeRate(order.marginalRate));
    return {
        y,
        z: H.eq(M) ? y : y.mul(H.sub(L)).div(M.sub(L)),
        A: encodeFloat(H.sub(L)),
        B: encodeFloat(L)
    };
};
exports.encodeOrder = encodeOrder;
const decodeOrder = (order) => {
    const y = BnToDec(order.y);
    const z = BnToDec(order.z);
    const A = BnToDec(decodeFloat(order.A));
    const B = BnToDec(decodeFloat(order.B));
    return {
        liquidity: y,
        lowestRate: decodeRate(B),
        highestRate: decodeRate(B.add(A)),
        marginalRate: decodeRate(y.eq(z) ? B.add(A) : B.add(A.mul(y).div(z)))
    };
};
exports.decodeOrder = decodeOrder;
//# sourceMappingURL=carbon-sdk.js.map