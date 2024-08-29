"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = __importDefault(require("../../../components/Contracts"));
const carbon_sdk_1 = require("../../utility/carbon-sdk");
const ArbitraryTrade_json_1 = __importDefault(require("./data/ArbitraryTrade.json"));
const EthUsdcTrade_json_1 = __importDefault(require("./data/EthUsdcTrade.json"));
const ExtremeSrcTrade_json_1 = __importDefault(require("./data/ExtremeSrcTrade.json"));
const ExtremeTrgTrade_json_1 = __importDefault(require("./data/ExtremeTrgTrade.json"));
const chai_1 = require("chai");
const decimal_js_1 = __importDefault(require("decimal.js"));
const ethers_1 = require("ethers");
const tests = [...ArbitraryTrade_json_1.default, ...EthUsdcTrade_json_1.default, ...ExtremeSrcTrade_json_1.default, ...ExtremeTrgTrade_json_1.default];
describe('Accuracy stress test', () => {
    let contract;
    before(async () => {
        contract = await Contracts_1.default.TestStrategies.deploy();
    });
    for (let mantissaLength = 0; mantissaLength <= 48; mantissaLength++) {
        for (let exponent = 0; exponent < 64; exponent++) {
            const mantissa = ethers_1.BigNumber.from(1).shl(mantissaLength).sub(1);
            const rate = ethers_1.BigNumber.from(exponent).shl(48).or(mantissa);
            const rateShouldBeValid = rate.lt(ethers_1.BigNumber.from(49).shl(48));
            it(`rate ${rate} should be ${rateShouldBeValid ? '' : 'in'}valid`, async () => {
                (0, chai_1.expect)(await contract.isValidRate(rate)).to.eq(rateShouldBeValid);
                if (rateShouldBeValid) {
                    const expandedRate = await contract.expandedRate(rate);
                    (0, chai_1.expect)(expandedRate).to.be.lt(ethers_1.BigNumber.from(1).shl(96));
                    (0, chai_1.expect)(expandedRate).to.be.eq(mantissa.shl(exponent));
                }
            });
        }
    }
    for (const [index, test] of tests.entries()) {
        it(`test ${index + 1} out of ${tests.length}`, async () => {
            const order = (0, carbon_sdk_1.encodeOrder)({
                liquidity: new decimal_js_1.default(test.liquidity),
                lowestRate: new decimal_js_1.default(test.lowestRate),
                highestRate: new decimal_js_1.default(test.highestRate),
                marginalRate: new decimal_js_1.default(test.marginalRate)
            });
            const amount = ethers_1.BigNumber.from(test.inputAmount);
            const tradeRPC = contract[`tradeBy${test.tradeBy}`](order, amount);
            const expected = ethers_1.BigNumber.from(test.implReturn);
            (0, chai_1.expect)(await tradeRPC).to.eq(expected);
        });
    }
});
//# sourceMappingURL=accuracy.js.map