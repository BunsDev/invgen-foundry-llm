"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCaseFactory = void 0;
const tradeTestDataHardhat_json_1 = require("../helpers/data/tradeTestDataHardhat.json");
const testCaseFactory = (options) => {
    const { sourceSymbol, targetSymbol, byTargetAmount, inverseOrders, equalHighestAndMarginalRate } = options;
    let testCase;
    if (equalHighestAndMarginalRate) {
        testCase = byTargetAmount
            ? JSON.parse(JSON.stringify(tradeTestDataHardhat_json_1.testCaseTemplateByTargetAmountEqualHighestAndMarginalRate))
            : JSON.parse(JSON.stringify(tradeTestDataHardhat_json_1.testCaseTemplateBySourceAmountEqualHighestAndMarginalRate));
    }
    else {
        testCase = byTargetAmount
            ? JSON.parse(JSON.stringify(tradeTestDataHardhat_json_1.testCaseTemplateByTargetAmount))
            : JSON.parse(JSON.stringify(tradeTestDataHardhat_json_1.testCaseTemplateBySourceAmount));
    }
    testCase.sourceSymbol = sourceSymbol;
    testCase.targetSymbol = targetSymbol;
    testCase.strategies.forEach((s, i) => {
        s.orders[0].token = sourceSymbol;
        s.orders[1].token = targetSymbol;
        if (inverseOrders) {
            if (i % 2 === 0) {
                const temp = s.orders[0];
                s.orders[0] = s.orders[1];
                s.orders[1] = temp;
            }
        }
    });
    return testCase;
};
exports.testCaseFactory = testCaseFactory;
//# sourceMappingURL=testDataFactory.js.map