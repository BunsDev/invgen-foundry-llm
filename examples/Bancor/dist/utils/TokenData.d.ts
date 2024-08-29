export declare const DEFAULT_DECIMALS = 18;
export declare const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export declare enum TokenSymbol {
    ETH = "ETH",
    BNT = "BNT",
    USDC = "USDC",
    DAI = "DAI",
    WBTC = "wBTC",
    TKN = "TKN",
    TKN0 = "TKN0",
    TKN1 = "TKN1",
    TKN2 = "TKN2"
}
interface Errors {
    exceedsAllowance?: string;
    exceedsBalance?: string;
    burnExceedsBalance?: string;
}
export declare class TokenData {
    private readonly _symbol;
    private readonly _name;
    private readonly _decimals;
    private readonly _errors;
    constructor(symbol: TokenSymbol);
    name(): string;
    symbol(): TokenSymbol;
    decimals(): number;
    errors(): NonNullable<{
        exceedsAllowance: string;
        exceedsBalance: string;
        burnExceedsBalance: string;
    } & Errors>;
    isDefaultDecimals(): boolean;
    isNative(): boolean;
}
export {};
//# sourceMappingURL=TokenData.d.ts.map