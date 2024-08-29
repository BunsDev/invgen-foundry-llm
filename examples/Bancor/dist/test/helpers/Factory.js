"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBNT = exports.createTestToken = exports.createBurnableToken = exports.createFeeOnTransferToken = exports.createToken = exports.createSystem = exports.createCarbonVortex = exports.createCarbonController = exports.upgradeProxy = exports.createProxy = exports.proxyAdmin = void 0;
const Contracts_1 = __importDefault(require("../../components/Contracts"));
const Constants_1 = require("../../utils/Constants");
const TokenData_1 = require("../../utils/TokenData");
const Types_1 = require("../../utils/Types");
const AccessControl_1 = require("./AccessControl");
const Utils_1 = require("./Utils");
const hardhat_1 = require("hardhat");
let admin;
const proxyAdmin = async () => {
    if (!admin) {
        admin = await Contracts_1.default.ProxyAdmin.deploy();
    }
    return admin;
};
exports.proxyAdmin = proxyAdmin;
const createLogic = async (factory, ctorArgs = []) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return factory.deploy(...(ctorArgs ?? []));
};
const createTransparentProxy = async (logicContract, skipInitialization = false, initArgs = []) => {
    const admin = await (0, exports.proxyAdmin)();
    const data = skipInitialization ? [] : logicContract.interface.encodeFunctionData('initialize', initArgs);
    return Contracts_1.default.OptimizedTransparentUpgradeableProxy.deploy(logicContract.address, admin.address, data);
};
const createProxy = async (factory, args) => {
    const logicContract = await createLogic(factory, args?.ctorArgs);
    const proxy = await createTransparentProxy(logicContract, args?.skipInitialization, args?.initArgs);
    return factory.attach(proxy.address);
};
exports.createProxy = createProxy;
const upgradeProxy = async (proxy, factory, args) => {
    const logicContract = await createLogic(factory, args?.ctorArgs);
    const admin = await (0, exports.proxyAdmin)();
    await admin.upgradeAndCall(proxy.address, logicContract.address, logicContract.interface.encodeFunctionData('postUpgrade', [args?.upgradeCallData ?? []]));
    return factory.attach(proxy.address);
};
exports.upgradeProxy = upgradeProxy;
const createCarbonController = async (voucher) => {
    const carbonController = await (0, exports.createProxy)(Contracts_1.default.TestCarbonController, {
        ctorArgs: [(0, Utils_1.toAddress)(voucher), Constants_1.ZERO_ADDRESS]
    });
    const upgradedCarbonController = await (0, exports.upgradeProxy)(carbonController, Contracts_1.default.TestCarbonController, {
        ctorArgs: [(0, Utils_1.toAddress)(voucher), carbonController.address]
    });
    return upgradedCarbonController;
};
exports.createCarbonController = createCarbonController;
const createCarbonVortex = async (bnt, carbonController, bancorNetworkV3) => {
    const carbonVortex = await (0, exports.createProxy)(Contracts_1.default.CarbonVortex, {
        ctorArgs: [(0, Utils_1.toAddress)(bnt), (0, Utils_1.toAddress)(carbonController), (0, Utils_1.toAddress)(bancorNetworkV3)]
    });
    return carbonVortex;
};
exports.createCarbonVortex = createCarbonVortex;
const createSystemFixture = async () => {
    const voucher = await (0, exports.createProxy)(Contracts_1.default.TestVoucher, {
        initArgs: [true, 'ipfs://xxx', '']
    });
    const carbonController = await (0, exports.createCarbonController)(voucher);
    await voucher.grantRole(AccessControl_1.Roles.Voucher.ROLE_MINTER, carbonController.address);
    return {
        carbonController,
        voucher
    };
};
const createSystem = async () => hardhat_1.waffle.loadFixture(createSystemFixture);
exports.createSystem = createSystem;
const createToken = async (tokenData, totalSupply = (0, Types_1.toWei)(1_000_000_000_000), burnable = false, feeOnTransfer = false) => {
    const symbol = tokenData.symbol();
    switch (symbol) {
        case TokenData_1.TokenSymbol.ETH:
            return { address: TokenData_1.NATIVE_TOKEN_ADDRESS };
        case TokenData_1.TokenSymbol.USDC:
        case TokenData_1.TokenSymbol.TKN:
        case TokenData_1.TokenSymbol.TKN0:
        case TokenData_1.TokenSymbol.TKN1:
        case TokenData_1.TokenSymbol.TKN2: {
            let token;
            if (burnable) {
                token = await Contracts_1.default.TestERC20Burnable.deploy(tokenData.name(), tokenData.symbol(), totalSupply);
            }
            else if (feeOnTransfer) {
                token = await Contracts_1.default.TestERC20FeeOnTransfer.deploy(tokenData.name(), tokenData.symbol(), totalSupply);
            }
            else {
                token = await Contracts_1.default.TestERC20Token.deploy(tokenData.name(), tokenData.symbol(), totalSupply);
            }
            if (!tokenData.isDefaultDecimals()) {
                await token.updateDecimals(tokenData.decimals());
            }
            return token;
        }
        case TokenData_1.TokenSymbol.BNT: {
            const token = await Contracts_1.default.TestBNT.deploy('Bancor Network Token', 'BNT', totalSupply);
            return token;
        }
        default:
            throw new Error(`Unsupported type ${symbol}`);
    }
};
exports.createToken = createToken;
const createFeeOnTransferToken = async (tokenData, totalSupply = (0, Types_1.toWei)(1_000_000_000)) => (0, exports.createToken)(new TokenData_1.TokenData(TokenData_1.TokenSymbol.TKN), totalSupply, false, true);
exports.createFeeOnTransferToken = createFeeOnTransferToken;
const createBurnableToken = async (tokenData, totalSupply = (0, Types_1.toWei)(1_000_000_000)) => (0, exports.createToken)(tokenData, totalSupply, true);
exports.createBurnableToken = createBurnableToken;
const createTestToken = async (totalSupply = (0, Types_1.toWei)(1_000_000_000)) => (0, exports.createToken)(new TokenData_1.TokenData(TokenData_1.TokenSymbol.TKN), totalSupply);
exports.createTestToken = createTestToken;
const createBNT = async (totalSupply = (0, Types_1.toWei)(1_000_000_000)) => (0, exports.createToken)(new TokenData_1.TokenData(TokenData_1.TokenSymbol.BNT), totalSupply);
exports.createBNT = createBNT;
//# sourceMappingURL=Factory.js.map