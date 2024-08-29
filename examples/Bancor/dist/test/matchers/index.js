"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customChai = exports.Relation = void 0;
/* eslint-disable @typescript-eslint/no-namespace */
const BigNumber_1 = __importDefault(require("./BigNumber"));
const Fraction_1 = __importDefault(require("./Fraction"));
const RevertedWithError_1 = __importDefault(require("./RevertedWithError"));
var Relation;
(function (Relation) {
    Relation[Relation["LesserOrEqual"] = 0] = "LesserOrEqual";
    Relation[Relation["GreaterOrEqual"] = 1] = "GreaterOrEqual";
})(Relation || (exports.Relation = Relation = {}));
const customChai = (chai, utils) => {
    (0, BigNumber_1.default)(chai.Assertion, utils);
    (0, Fraction_1.default)(chai.Assertion, utils);
    (0, RevertedWithError_1.default)(chai.Assertion);
};
exports.customChai = customChai;
//# sourceMappingURL=index.js.map