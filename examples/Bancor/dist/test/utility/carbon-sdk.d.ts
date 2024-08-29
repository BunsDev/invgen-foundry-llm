import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
export type DecodedOrder = {
    liquidity: Decimal;
    lowestRate: Decimal;
    highestRate: Decimal;
    marginalRate: Decimal;
};
export type EncodedOrder = {
    y: BigNumber;
    z: BigNumber;
    A: BigNumber;
    B: BigNumber;
};
export declare const encodeOrder: (order: DecodedOrder) => EncodedOrder;
export declare const decodeOrder: (order: EncodedOrder) => DecodedOrder;
//# sourceMappingURL=carbon-sdk.d.ts.map