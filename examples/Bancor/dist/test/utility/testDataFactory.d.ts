export interface ExpectedOrder {
    liquidity: string;
    lowestRate: string;
    highestRate: string;
    marginalRate: string;
}
export interface TestOrder {
    token: string;
    liquidity: string;
    lowestRate: string;
    highestRate: string;
    marginalRate: string;
    expected: ExpectedOrder;
}
export interface TestStrategy {
    orders: TestOrder[];
}
export interface TestTradeActions {
    strategyId: string;
    amount: string;
}
export interface FactoryOptions {
    sourceSymbol: string;
    targetSymbol: string;
    byTargetAmount: boolean;
    inverseOrders?: boolean;
    equalHighestAndMarginalRate?: boolean;
}
export interface TestData {
    sourceSymbol: string;
    targetSymbol: string;
    strategies: TestStrategy[];
    tradeActions: TestTradeActions[];
    byTargetAmount: boolean;
    sourceAmount: string;
    targetAmount: string;
}
export declare const testCaseFactory: (options: FactoryOptions) => TestData;
//# sourceMappingURL=testDataFactory.d.ts.map