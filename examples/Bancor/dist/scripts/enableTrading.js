"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = __importDefault(require("../components/Contracts"));
const Deploy_1 = require("../utils/Deploy");
const Logger_1 = __importDefault(require("../utils/Logger"));
const TokenData_1 = require("../utils/TokenData");
require("@nomiclabs/hardhat-ethers");
require("@typechain/hardhat");
const coingecko_api_v3_1 = require("coingecko-api-v3");
const decimal_js_1 = __importDefault(require("decimal.js"));
const { ENABLE_TRADING: enableTrading } = process.env;
const MAX_PRECISION = 16;
const TOKEN_ADDRESSES = [];
const TOKEN_OVERRIDES = [
    {
        address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        symbol: 'MKR'
    },
    {
        address: '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9',
        symbol: 'FTT'
    }
];
const main = async () => {
    const { deployer } = await (0, Deploy_1.getNamedSigners)();
    const carbonPOL = await Deploy_1.DeployedContracts.CarbonPOL.deployed();
    const client = new coingecko_api_v3_1.CoinGeckoClient({
        timeout: 10000,
        autoRetry: true
    });
    /* eslint-disable camelcase */
    const tokenPrices = {
        ...(await client.simpleTokenPrice({
            id: 'ethereum',
            contract_addresses: [...TOKEN_ADDRESSES].join(','),
            vs_currencies: 'USD'
        }))
    };
    /* eslint-enable camelcase */
    const ethPriceRes = await client.simplePrice({
        ids: 'ethereum',
        vs_currencies: 'USD'
    });
    const ethPrice = new decimal_js_1.default(ethPriceRes.ethereum.usd);
    Logger_1.default.log();
    Logger_1.default.log('Looking for disabled tokens...');
    const unknownTokens = {};
    const tokens = {};
    let symbol;
    let decimals;
    for (let i = 0; i < TOKEN_ADDRESSES.length; i++) {
        const token = TOKEN_ADDRESSES[i];
        if (token === TokenData_1.NATIVE_TOKEN_ADDRESS) {
            symbol = TokenData_1.TokenSymbol.ETH;
            decimals = TokenData_1.DEFAULT_DECIMALS;
        }
        else {
            const tokenOverride = TOKEN_OVERRIDES.find((t) => t.address.toLowerCase() === token.toLowerCase());
            const tokenContract = await Contracts_1.default.ERC20.attach(token, deployer);
            symbol = tokenOverride?.symbol ?? (await tokenContract.symbol());
            decimals = tokenOverride?.decimals ?? (await tokenContract.decimals());
        }
        Logger_1.default.log();
        Logger_1.default.log(`Checking ${symbol} status [${token}]...`);
        if (await carbonPOL.tradingEnabled(token)) {
            Logger_1.default.error('  Skipping already enabled token...');
            continue;
        }
        const tokenPriceData = tokenPrices[token.toLowerCase()];
        if (!tokenPriceData) {
            unknownTokens[symbol] = token;
            Logger_1.default.error('  Skipping unknown token');
            continue;
        }
        const tokenPrice = new decimal_js_1.default(tokenPriceData.usd);
        const rate = ethPrice.div(tokenPrice);
        Logger_1.default.log(`  ${TokenData_1.TokenSymbol.ETH} price: $${ethPrice.toFixed()}`);
        Logger_1.default.log(`  ${symbol} price: $${tokenPrice.toFixed()}`);
        Logger_1.default.log(`  ${symbol} to ${TokenData_1.TokenSymbol.ETH} rate: ${rate.toFixed(MAX_PRECISION)}`);
        const tokenPriceNormalizationFactor = new decimal_js_1.default(10).pow(TokenData_1.DEFAULT_DECIMALS - decimals);
        if (decimals !== TokenData_1.DEFAULT_DECIMALS) {
            Logger_1.default.log(`  ${symbol} decimals: ${decimals}`);
            Logger_1.default.log(`  ${symbol} to ${TokenData_1.TokenSymbol.ETH} rate normalized: ${rate
                .div(tokenPriceNormalizationFactor)
                .toFixed(MAX_PRECISION)}`);
        }
        const decimalsFactor = new decimal_js_1.default(10).pow(decimals);
        Logger_1.default.log(`  Found pending token ${symbol} [${token}]...`);
        const normalizedTokenPrice = tokenPrice.div(decimalsFactor);
        const normalizedETHPrice = ethPrice.div(new decimal_js_1.default(10).pow(TokenData_1.DEFAULT_DECIMALS));
        const maxDecimals = Math.max(normalizedETHPrice.decimalPlaces(), normalizedTokenPrice.decimalPlaces());
        const maxDecimalsFactor = new decimal_js_1.default(10).pow(maxDecimals);
        const buffer = new decimal_js_1.default(10).pow(6); // buffer for increasing precision
        const ethVirtualBalance = normalizedTokenPrice.mul(maxDecimalsFactor).mul(buffer);
        const tokenVirtualBalance = normalizedETHPrice.mul(maxDecimalsFactor).mul(buffer);
        Logger_1.default.log(`  Suggested ${TokenData_1.TokenSymbol.ETH} virtual balance: ${ethVirtualBalance.toFixed()}`);
        Logger_1.default.log(`  Suggested ${symbol} virtual balance: ${tokenVirtualBalance.toFixed()}`);
        if (enableTrading) {
            await (0, Deploy_1.execute)({
                name: Deploy_1.InstanceName.CarbonPOL,
                methodName: 'enableTrading',
                args: [
                    token,
                    {
                        sourceAmount: ethVirtualBalance.toFixed().toString(),
                        targetAmount: tokenVirtualBalance.toFixed().toString()
                    }
                ],
                from: deployer.address
            });
        }
        tokens[symbol] = {
            address: token,
            ethVirtualBalance,
            tokenVirtualBalance
        };
    }
    Logger_1.default.log('');
    Logger_1.default.log('********************************************************************************');
    Logger_1.default.log('');
    const entries = Object.entries(tokens);
    if (entries.length === 0) {
        Logger_1.default.log('Did not find any pending tokens...');
        Logger_1.default.log();
        return;
    }
    Logger_1.default.log(`Found ${entries.length} pending tokens:`);
    Logger_1.default.log();
    for (const [symbol, poolData] of entries) {
        Logger_1.default.log(`${symbol}:`);
        Logger_1.default.log(`  Token: ${poolData.address}`);
        Logger_1.default.log(`  Suggested ${TokenData_1.TokenSymbol.ETH} virtual balance: ${poolData.ethVirtualBalance.toFixed()}`);
        Logger_1.default.log(`  Suggested ${symbol} virtual balance: ${poolData.tokenVirtualBalance.toFixed()}`);
        Logger_1.default.log('');
    }
    Logger_1.default.log('********************************************************************************');
    Logger_1.default.log('');
    if (Object.keys(unknownTokens).length !== 0) {
        Logger_1.default.log('Unknown tokens:');
        for (const [symbol, address] of Object.entries(unknownTokens)) {
            Logger_1.default.log(`${symbol} - ${address}`);
        }
        Logger_1.default.log('');
    }
};
main()
    .then(() => process.exit(0))
    .catch((error) => {
    Logger_1.default.error(error);
    process.exit(1);
});
//# sourceMappingURL=enableTrading.js.map