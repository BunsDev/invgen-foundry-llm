import Decimal from 'decimal.js';
export declare enum Relation {
    LesserOrEqual = 0,
    GreaterOrEqual = 1
}
export interface AlmostEqualOptions {
    maxAbsoluteError?: Decimal;
    maxRelativeError?: Decimal;
    relation?: Relation;
}
declare global {
    export namespace Chai {
        interface Assertion {
            almostEqual(expected: any, options: AlmostEqualOptions): void;
            revertedWithError(reason: string): AsyncAssertion;
        }
    }
}
export declare const customChai: (chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) => void;
//# sourceMappingURL=index.d.ts.map