"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typechain_types_1 = require("../typechain-types");
const ContractBuilder_1 = require("./ContractBuilder");
__exportStar(require("../typechain-types"), exports);
const getContracts = (signer) => ({
    connect: (signer) => getContracts(signer),
    ERC20: (0, ContractBuilder_1.deployOrAttach)('ERC20', typechain_types_1.ERC20__factory, signer),
    CarbonController: (0, ContractBuilder_1.deployOrAttach)('CarbonController', typechain_types_1.CarbonController__factory, signer),
    CarbonVortex: (0, ContractBuilder_1.deployOrAttach)('CarbonVortex', typechain_types_1.CarbonVortex__factory, signer),
    CarbonPOL: (0, ContractBuilder_1.deployOrAttach)('CarbonPOL', typechain_types_1.CarbonPOL__factory, signer),
    MockBancorNetworkV3: (0, ContractBuilder_1.deployOrAttach)('MockBancorNetworkV3', typechain_types_1.MockBancorNetworkV3__factory, signer),
    ProxyAdmin: (0, ContractBuilder_1.deployOrAttach)('ProxyAdmin', typechain_types_1.ProxyAdmin__factory, signer),
    Voucher: (0, ContractBuilder_1.deployOrAttach)('Voucher', typechain_types_1.Voucher__factory, signer),
    TestERC20FeeOnTransfer: (0, ContractBuilder_1.deployOrAttach)('TestERC20FeeOnTransfer', typechain_types_1.TestERC20FeeOnTransfer__factory, signer),
    TestERC20Burnable: (0, ContractBuilder_1.deployOrAttach)('TestERC20Burnable', typechain_types_1.TestERC20Burnable__factory, signer),
    TestERC20Token: (0, ContractBuilder_1.deployOrAttach)('TestERC20Token', typechain_types_1.TestERC20Token__factory, signer),
    TestExpDecayMath: (0, ContractBuilder_1.deployOrAttach)('TestExpDecayMath', typechain_types_1.TestExpDecayMath__factory, signer),
    TestBNT: (0, ContractBuilder_1.deployOrAttach)('TestBNT', typechain_types_1.TestBNT__factory, signer),
    TestLogic: (0, ContractBuilder_1.deployOrAttach)('TestLogic', typechain_types_1.TestLogic__factory, signer),
    TestMathEx: (0, ContractBuilder_1.deployOrAttach)('TestMathEx', typechain_types_1.TestMathEx__factory, signer),
    TestStrategies: (0, ContractBuilder_1.deployOrAttach)('TestStrategies', typechain_types_1.TestStrategies__factory, signer),
    TestPairs: (0, ContractBuilder_1.deployOrAttach)('TestPairs', typechain_types_1.TestPairs__factory, signer),
    TestTokenType: (0, ContractBuilder_1.deployOrAttach)('TestTokenType', typechain_types_1.TestTokenType__factory, signer),
    TestUpgradeable: (0, ContractBuilder_1.deployOrAttach)('TestUpgradeable', typechain_types_1.TestUpgradeable__factory, signer),
    TestOnlyProxyDelegate: (0, ContractBuilder_1.deployOrAttach)('TestOnlyProxyDelegate', typechain_types_1.TestOnlyProxyDelegate__factory, signer),
    TestVoucher: (0, ContractBuilder_1.deployOrAttach)('TestVoucher', typechain_types_1.TestVoucher__factory, signer),
    TestCarbonController: (0, ContractBuilder_1.deployOrAttach)('TestCarbonController', typechain_types_1.TestCarbonController__factory, signer),
    OptimizedTransparentUpgradeableProxy: (0, ContractBuilder_1.deployOrAttach)('OptimizedTransparentUpgradeableProxy', typechain_types_1.OptimizedTransparentUpgradeableProxy__factory, signer)
});
exports.default = getContracts();
//# sourceMappingURL=Contracts.js.map