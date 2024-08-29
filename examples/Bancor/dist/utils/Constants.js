"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerType = exports.STRATEGY_UPDATE_REASON_TRADE = exports.STRATEGY_UPDATE_REASON_EDIT = exports.DEFAULT_TRADING_FEE_PPM = exports.VOUCHER_URI = exports.PPM_RESOLUTION = exports.ZERO_FRACTION = exports.NATIVE_TOKEN_ADDRESS = exports.ZERO_ADDRESS = exports.ZERO_BYTES32 = exports.ZERO_BYTES = exports.MAX_UINT128 = exports.MAX_UINT256 = exports.EXP2_INPUT_TOO_HIGH = exports.DeploymentNetwork = exports.TestnetNetwork = exports.MainnetNetwork = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const Types_1 = require("./Types");
const ethers_1 = require("ethers");
const { constants: { AddressZero, MaxUint256 } } = ethers_1.ethers;
var MainnetNetwork;
(function (MainnetNetwork) {
    MainnetNetwork["Arbitrum"] = "arbitrum";
    MainnetNetwork["Astar"] = "astar";
    MainnetNetwork["Aurora"] = "aurora";
    MainnetNetwork["Avalanche"] = "avalanche";
    MainnetNetwork["Base"] = "base";
    MainnetNetwork["BSC"] = "bsc";
    MainnetNetwork["Canto"] = "canto";
    MainnetNetwork["Celo"] = "celo";
    MainnetNetwork["Cronos"] = "cronos";
    MainnetNetwork["Fantom"] = "fantom";
    MainnetNetwork["Fusion"] = "fusion";
    MainnetNetwork["Gnosis"] = "gnosis";
    MainnetNetwork["Hedera"] = "hedera";
    MainnetNetwork["Kava"] = "kava";
    MainnetNetwork["Klaytn"] = "klaytn";
    MainnetNetwork["Linea"] = "linea";
    MainnetNetwork["Mainnet"] = "mainnet";
    MainnetNetwork["Manta"] = "manta";
    MainnetNetwork["Mantle"] = "mantle";
    MainnetNetwork["Metis"] = "metis";
    MainnetNetwork["Mode"] = "mode";
    MainnetNetwork["Moonbeam"] = "moonbeam";
    MainnetNetwork["Optimism"] = "optimism";
    MainnetNetwork["Polygon"] = "polygon";
    MainnetNetwork["PulseChain"] = "pulsechain";
    MainnetNetwork["Rootstock"] = "rootstock";
    MainnetNetwork["Scroll"] = "scroll";
    MainnetNetwork["Telos"] = "telos";
    MainnetNetwork["ZkSync"] = "zksync";
    MainnetNetwork["Sei"] = "sei";
})(MainnetNetwork || (exports.MainnetNetwork = MainnetNetwork = {}));
var TestnetNetwork;
(function (TestnetNetwork) {
    TestnetNetwork["Hardhat"] = "hardhat";
    TestnetNetwork["Sepolia"] = "sepolia";
    TestnetNetwork["Tenderly"] = "tenderly";
    TestnetNetwork["TenderlyTestnet"] = "tenderly-testnet";
})(TestnetNetwork || (exports.TestnetNetwork = TestnetNetwork = {}));
exports.DeploymentNetwork = {
    ...MainnetNetwork,
    ...TestnetNetwork
};
exports.EXP2_INPUT_TOO_HIGH = new decimal_js_1.default(16).div(new decimal_js_1.default(2).ln());
exports.MAX_UINT256 = MaxUint256;
exports.MAX_UINT128 = '340282366920938463463374607431768211455';
exports.ZERO_BYTES = '0x';
exports.ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
exports.ZERO_ADDRESS = AddressZero;
exports.NATIVE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
exports.ZERO_FRACTION = { n: 0, d: 1 };
exports.PPM_RESOLUTION = 1_000_000;
exports.VOUCHER_URI = 'ipfs://QmUyDUzQtwAhMB1hrYaQAqmRTbgt9sUnwq11GeqyzzSuqn';
exports.DEFAULT_TRADING_FEE_PPM = (0, Types_1.toPPM)(0.2);
// strategy update reasons
exports.STRATEGY_UPDATE_REASON_EDIT = 0;
exports.STRATEGY_UPDATE_REASON_TRADE = 1;
var ControllerType;
(function (ControllerType) {
    ControllerType[ControllerType["Standard"] = 1] = "Standard";
})(ControllerType || (exports.ControllerType = ControllerType = {}));
//# sourceMappingURL=Constants.js.map