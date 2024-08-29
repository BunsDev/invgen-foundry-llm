"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = __importDefault(require("../../components/Contracts"));
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const Constants_1 = require("../../utils/Constants");
const matchers_1 = require("../matchers");
const decimal_js_1 = __importDefault(require("decimal.js"));
const MAX_UINT256 = ethers_1.BigNumber.from(2).pow(256).sub(1);
const mulDivFuncs = {
    mulDivF: (x, y, z) => x.mul(y).div(z),
    mulDivC: (x, y, z) => x.mul(y).add(z).sub(1).div(z)
};
describe('MathEx', () => {
    let mathContract;
    before(async () => {
        mathContract = await Contracts_1.default.TestMathEx.deploy();
    });
    const testMulDivAndMinFactor = (x, y, z) => {
        for (const funcName in mulDivFuncs) {
            it(`${funcName}(${x}, ${y}, ${z})`, async () => {
                const expectedFunc = mulDivFuncs[funcName];
                const actualFunc = mathContract[funcName];
                const expected = expectedFunc(x, y, z);
                if (expected.lte(MAX_UINT256)) {
                    const actual = await actualFunc(x, y, z);
                    (0, chai_1.expect)(actual).to.equal(expected);
                }
                else {
                    await (0, chai_1.expect)(actualFunc(x, y, z)).to.be.revertedWithError('Overflow');
                }
            });
        }
        const tuples = [
            [x, y],
            [x, z],
            [y, z],
            [x, y.add(z)],
            [x.add(z), y],
            [x.add(z), y.add(z)]
        ];
        const values = tuples.filter((tuple) => tuple.every((value) => value.lte(MAX_UINT256)));
        for (const [x, y] of values) {
            it(`minFactor(${x}, ${y})`, async () => {
                const actual = await mathContract.minFactor(x, y);
                (0, chai_1.expect)(mulDivFuncs.mulDivC(x, y, actual)).to.be.lte(MAX_UINT256);
                if (actual.gt(1)) {
                    (0, chai_1.expect)(mulDivFuncs.mulDivC(x, y, actual.sub(1))).to.be.gt(MAX_UINT256);
                }
            });
        }
    };
    const testExp2 = (f, maxRelativeError) => {
        it(`exp2(${f.n} / ${f.d})`, async () => {
            const fVal = new decimal_js_1.default(f.n).div(f.d);
            if (fVal.lt(Constants_1.EXP2_INPUT_TOO_HIGH)) {
                const actual = await mathContract.exp2(f);
                const expected = new decimal_js_1.default(2).pow(fVal);
                await (0, chai_1.expect)(actual).to.almostEqual({ n: expected, d: 1 }, {
                    maxRelativeError,
                    relation: matchers_1.Relation.LesserOrEqual
                });
            }
            else {
                await (0, chai_1.expect)(mathContract.exp2(f)).to.revertedWithError('Overflow');
            }
        });
    };
    describe('quick tests', () => {
        for (const px of [128, 192, 256]) {
            for (const py of [128, 192, 256]) {
                for (const pz of [128, 192, 256]) {
                    for (const ax of [3, 5, 7]) {
                        for (const ay of [3, 5, 7]) {
                            for (const az of [3, 5, 7]) {
                                const x = ethers_1.BigNumber.from(2).pow(px).div(ax);
                                const y = ethers_1.BigNumber.from(2).pow(py).div(ay);
                                const z = ethers_1.BigNumber.from(2).pow(pz).div(az);
                                testMulDivAndMinFactor(x, y, z);
                            }
                        }
                    }
                }
            }
        }
        for (const x of [ethers_1.BigNumber.from(2).pow(255), ethers_1.BigNumber.from(2).pow(256).sub(2)]) {
            for (const y of [ethers_1.BigNumber.from(2), ethers_1.BigNumber.from(2).pow(256).sub(2)]) {
                for (const z of [ethers_1.BigNumber.from(3), ethers_1.BigNumber.from(2).pow(256).sub(3)]) {
                    testMulDivAndMinFactor(x, y, z);
                }
            }
        }
        for (let d = 1000; d < 1000000000; d *= 10) {
            for (let n = Constants_1.EXP2_INPUT_TOO_HIGH.mul(d).sub(10); n.lte(Constants_1.EXP2_INPUT_TOO_HIGH.mul(d).sub(1)); n = n.add(1)) {
                testExp2({ n: n.floor().toNumber(), d }, new decimal_js_1.default('0.000000000000000000000000000000000002'));
            }
        }
        for (let d = 1; d < 1000; d++) {
            testExp2({ n: 1, d }, new decimal_js_1.default('0.00000000000000000000000000000000000002'));
        }
        for (let n = 1; n < 1000; n++) {
            testExp2({ n, d: 1000 }, new decimal_js_1.default('0.0000000000000000000000000000000000001'));
        }
    });
    describe('@stress tests', () => {
        for (const px of [0, 64, 128, 192, 255, 256]) {
            for (const py of [0, 64, 128, 192, 255, 256]) {
                for (const pz of [1, 64, 128, 192, 255, 256]) {
                    for (const ax of px < 256 ? [-1, 0, +1] : [-1]) {
                        for (const ay of py < 256 ? [-1, 0, +1] : [-1]) {
                            for (const az of pz < 256 ? [-1, 0, +1] : [-1]) {
                                const x = ethers_1.BigNumber.from(2).pow(px).add(ax);
                                const y = ethers_1.BigNumber.from(2).pow(py).add(ay);
                                const z = ethers_1.BigNumber.from(2).pow(pz).add(az);
                                testMulDivAndMinFactor(x, y, z);
                            }
                        }
                    }
                }
            }
        }
        for (const px of [64, 128, 192, 256]) {
            for (const py of [64, 128, 192, 256]) {
                for (const pz of [64, 128, 192, 256]) {
                    for (const ax of [ethers_1.BigNumber.from(2).pow(px >> 1), 1]) {
                        for (const ay of [ethers_1.BigNumber.from(2).pow(py >> 1), 1]) {
                            for (const az of [ethers_1.BigNumber.from(2).pow(pz >> 1), 1]) {
                                const x = ethers_1.BigNumber.from(2).pow(px).sub(ax);
                                const y = ethers_1.BigNumber.from(2).pow(py).sub(ay);
                                const z = ethers_1.BigNumber.from(2).pow(pz).sub(az);
                                testMulDivAndMinFactor(x, y, z);
                            }
                        }
                    }
                }
            }
        }
        for (const px of [128, 192, 256]) {
            for (const py of [128, 192, 256]) {
                for (const pz of [128, 192, 256]) {
                    for (const ax of [3, 5, 7]) {
                        for (const ay of [3, 5, 7]) {
                            for (const az of [3, 5, 7]) {
                                const x = ethers_1.BigNumber.from(2).pow(px).div(ax);
                                const y = ethers_1.BigNumber.from(2).pow(py).div(ay);
                                const z = ethers_1.BigNumber.from(2).pow(pz).div(az);
                                testMulDivAndMinFactor(x, y, z);
                            }
                        }
                    }
                }
            }
        }
    });
});
//# sourceMappingURL=MathEx.js.map