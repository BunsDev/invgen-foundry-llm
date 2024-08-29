"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenData = exports.TokenSymbol = exports.NATIVE_TOKEN_ADDRESS = exports.DEFAULT_DECIMALS = void 0;
const lodash_1 = require("lodash");
exports.DEFAULT_DECIMALS = 18;
exports.NATIVE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
var TokenSymbol;
(function (TokenSymbol) {
    TokenSymbol["ETH"] = "ETH";
    TokenSymbol["BNT"] = "BNT";
    TokenSymbol["USDC"] = "USDC";
    TokenSymbol["DAI"] = "DAI";
    TokenSymbol["WBTC"] = "wBTC";
    TokenSymbol["TKN"] = "TKN";
    TokenSymbol["TKN0"] = "TKN0";
    TokenSymbol["TKN1"] = "TKN1";
    TokenSymbol["TKN2"] = "TKN2";
})(TokenSymbol || (exports.TokenSymbol = TokenSymbol = {}));
const DEFAULT_ERRORS = {
    exceedsAllowance: 'ERC20: insufficient allowance',
    exceedsBalance: 'ERC20: transfer amount exceeds balance',
    burnExceedsBalance: 'ERC20: burn amount exceeds balance'
};
const TOKEN_DATA = {
    [TokenSymbol.ETH]: {
        name: 'Ethereum',
        decimals: exports.DEFAULT_DECIMALS,
        errors: {
            exceedsBalance: 'Address: insufficient balance'
        }
    },
    [TokenSymbol.BNT]: {
        name: 'Bancor Network Token',
        decimals: exports.DEFAULT_DECIMALS,
        errors: DEFAULT_ERRORS
    },
    [TokenSymbol.USDC]: {
        name: 'USDC Token',
        decimals: 6,
        errors: DEFAULT_ERRORS
    },
    [TokenSymbol.TKN]: {
        name: 'Test Token',
        decimals: exports.DEFAULT_DECIMALS,
        errors: DEFAULT_ERRORS
    },
    [TokenSymbol.TKN0]: {
        name: 'Test Token 0',
        decimals: exports.DEFAULT_DECIMALS,
        errors: DEFAULT_ERRORS
    },
    [TokenSymbol.TKN1]: {
        name: 'Test Token 1',
        decimals: exports.DEFAULT_DECIMALS,
        errors: DEFAULT_ERRORS
    },
    [TokenSymbol.TKN2]: {
        name: 'Test Token 2',
        decimals: exports.DEFAULT_DECIMALS,
        errors: DEFAULT_ERRORS
    }
};
class TokenData {
    _symbol;
    _name;
    _decimals;
    _errors;
    constructor(symbol) {
        this._symbol = symbol;
        const { name, decimals, errors } = TOKEN_DATA[symbol];
        this._name = name;
        this._decimals = decimals;
        this._errors = errors;
    }
    name() {
        return this._name;
    }
    symbol() {
        return this._symbol;
    }
    decimals() {
        return this._decimals;
    }
    errors() {
        return (0, lodash_1.defaults)(this._errors, { exceedsAllowance: '', exceedsBalance: '', burnExceedsBalance: '' });
    }
    isDefaultDecimals() {
        return this._decimals === exports.DEFAULT_DECIMALS;
    }
    isNative() {
        return this._symbol === TokenSymbol.ETH;
    }
}
exports.TokenData = TokenData;
//# sourceMappingURL=TokenData.js.map