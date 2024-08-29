"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = __importDefault(require("../components/Contracts"));
const Deploy_1 = require("../utils/Deploy");
const Logger_1 = __importDefault(require("../utils/Logger"));
require("@nomiclabs/hardhat-ethers");
require("@typechain/hardhat");
const hardhat_1 = require("hardhat");
require("hardhat-deploy");
const main = async () => {
    if (!(0, Deploy_1.isTenderly)()) {
        throw new Error('Invalid network');
    }
    const { usdcWhale } = await (0, Deploy_1.getNamedSigners)();
    const { usdc } = await (0, hardhat_1.getNamedAccounts)();
    const carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
    const usdcToken = await Contracts_1.default.ERC20.attach(usdc);
    const amount = 5000;
    Logger_1.default.log('Previous USDC balance', (await usdcToken.balanceOf(usdcWhale.address)).toString());
    Logger_1.default.log();
    const res = await usdcToken.connect(usdcWhale).approve(carbonController.address, amount);
    Logger_1.default.log('Transaction Hash', res.hash);
    Logger_1.default.log();
    Logger_1.default.log('Current USDC balance', (await usdcToken.balanceOf(usdcWhale.address)).toString());
    Logger_1.default.log();
};
main()
    .then(() => process.exit(0))
    .catch((error) => {
    Logger_1.default.error(error);
    process.exit(1);
});
//# sourceMappingURL=example.js.map