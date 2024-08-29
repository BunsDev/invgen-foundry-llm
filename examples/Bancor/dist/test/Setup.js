"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matchers_1 = require("./matchers");
require("@nomiclabs/hardhat-waffle");
const chai_1 = __importDefault(require("chai"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const config_1 = require("hardhat/config");
// configure the global Decimal object
decimal_js_1.default.set({ precision: 100, rounding: decimal_js_1.default.ROUND_HALF_DOWN });
(0, config_1.extendEnvironment)(() => {
    chai_1.default.use(matchers_1.customChai);
});
//# sourceMappingURL=Setup.js.map