"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = __importDefault(require("../../components/Contracts"));
const Types_1 = require("../../utils/Types");
const Time_1 = require("../helpers/Time");
const matchers_1 = require("../matchers");
const chai_1 = require("chai");
const decimal_js_1 = __importDefault(require("decimal.js"));
const { seconds, days, minutes, hours, years } = Time_1.duration;
describe('ExpDecayMath', () => {
    let expDecayMath;
    const ONE = new decimal_js_1.default(1);
    const TWO = new decimal_js_1.default(2);
    const MAX = new decimal_js_1.default(129);
    before(async () => {
        expDecayMath = await Contracts_1.default.TestExpDecayMath.deploy();
    });
    const calcExpDecay = (ethAmount, timeElapsed, halfLife) => {
        it(`calcExpDecay(${ethAmount}, ${timeElapsed}, ${halfLife})`, async () => {
            const f = new decimal_js_1.default(timeElapsed).div(halfLife);
            if (f.lt(MAX)) {
                const f = new decimal_js_1.default(timeElapsed).div(halfLife);
                // actual amount calculated in solidity
                const actual = await expDecayMath.calcExpDecay(ethAmount, timeElapsed, halfLife);
                // expected amount calculated using ts Decimal lib
                const expected = new decimal_js_1.default(ethAmount.toString()).mul(ONE.div(TWO.pow(f)));
                (0, chai_1.expect)(actual).to.almostEqual(expected, {
                    maxAbsoluteError: new decimal_js_1.default(1),
                    relation: matchers_1.Relation.LesserOrEqual
                });
            }
            else {
                await (0, chai_1.expect)(expDecayMath.calcExpDecay(ethAmount, timeElapsed, halfLife)).to.revertedWithError('panic code 0x11');
            }
        });
        // verify that after half-life has elapsed, we get half of the amount
        it(`calcExpDecay(${ethAmount}, ${halfLife}, ${halfLife})`, async () => {
            const actual = await expDecayMath.calcExpDecay(ethAmount, halfLife, halfLife);
            const expected = new decimal_js_1.default(ethAmount.toString()).div(TWO);
            (0, chai_1.expect)(actual).to.equal(expected);
        });
    };
    describe('regular tests', () => {
        for (const ethAmount of [50_000_000, (0, Types_1.toWei)(1), (0, Types_1.toWei)(40_000_000)]) {
            for (const timeElapsed of [
                0,
                seconds(1),
                seconds(10),
                minutes(1),
                minutes(10),
                hours(1),
                hours(10),
                days(1),
                days(2),
                days(5),
                days(10),
                days(100),
                years(1),
                years(2)
            ]) {
                for (const halfLife of [days(2), days(5), days(10), days(20)]) {
                    calcExpDecay(ethAmount, timeElapsed, halfLife);
                }
            }
        }
        for (const halfLife of [seconds(1), minutes(2), hours(3), days(2), years(1)]) {
            calcExpDecay(1_000_000, MAX.toNumber() * halfLife - 1, halfLife); // should pass
            calcExpDecay(1_000_000, MAX.toNumber() * halfLife - 0, halfLife); // should fail
        }
    });
    describe('@stress tests', () => {
        for (const ethAmount of [
            40_000_000,
            400_000_000,
            4_000_000_000,
            (0, Types_1.toWei)(50_000_000),
            (0, Types_1.toWei)(500_000_000),
            (0, Types_1.toWei)(5_000_000_000)
        ]) {
            for (let secondsNum = 0; secondsNum < 5; secondsNum++) {
                for (let minutesNum = 0; minutesNum < 5; minutesNum++) {
                    for (let hoursNum = 0; hoursNum < 5; hoursNum++) {
                        for (let daysNum = 0; daysNum < 5; daysNum++) {
                            for (let yearsNum = 0; yearsNum < 5; yearsNum++) {
                                for (const halfLife of [
                                    days(1),
                                    days(30),
                                    years(0.5),
                                    years(1),
                                    years(1.5),
                                    years(2)
                                ]) {
                                    calcExpDecay(ethAmount, seconds(secondsNum) +
                                        minutes(minutesNum) +
                                        hours(hoursNum) +
                                        days(daysNum) +
                                        years(yearsNum), halfLife);
                                }
                            }
                        }
                    }
                }
            }
        }
    });
});
//# sourceMappingURL=ExpDecayMath.js.map