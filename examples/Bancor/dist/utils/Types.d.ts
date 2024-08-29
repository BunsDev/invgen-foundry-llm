import Decimal from 'decimal.js';
import { BigNumber, BigNumberish } from 'ethers';
export type Addressable = {
    address: string;
};
export interface Fraction<T = number> {
    n: T;
    d: T;
}
export interface BigNumberFraction {
    n: BigNumber;
    d: BigNumber;
}
type ToBigNumberInput = Fraction<Decimal> | Decimal | BigNumber | number;
type ToBigNumberReturn<T> = T extends Fraction<Decimal> ? Fraction<BigNumber> : T extends Decimal ? BigNumber : T extends BigNumber ? BigNumber : T extends number ? BigNumber : never;
type ToDecimalInput = Fraction<BigNumber> | Decimal | BigNumber | number;
type ToDecimalReturn<T> = T extends Fraction<BigNumber> ? Fraction<Decimal> : T extends BigNumber ? Decimal : T extends Decimal ? Decimal : T extends number ? Decimal : never;
export declare const isFraction: (v: any) => any;
export declare const toBigNumber: <T extends ToBigNumberInput>(v: T) => ToBigNumberReturn<T>;
export declare const toDecimal: <T extends ToDecimalInput>(v: T) => ToDecimalReturn<T>;
export declare const toString: <T extends BigNumber | Decimal | number>(fraction: Fraction<T>) => string;
type ToWeiInput = Decimal | BigNumberish;
export declare const toWei: <T extends ToWeiInput>(v: T, decimals?: number) => BigNumber;
export declare const toPPM: (percent: number | undefined) => number;
export declare const fromPPM: (ppm: number | undefined) => number;
export declare const percentsToPPM: (percents: number | string) => number;
export declare const toCents: (dollars: number) => number;
export declare const min: (a: BigNumberish, b: BigNumberish) => BigNumber;
export declare const max: (a: BigNumberish, b: BigNumberish) => BigNumber;
export {};
//# sourceMappingURL=Types.d.ts.map