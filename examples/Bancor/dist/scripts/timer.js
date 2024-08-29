"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../utils/Deploy");
const Logger_1 = __importDefault(require("../utils/Logger"));
const Types_1 = require("../utils/Types");
require("@nomiclabs/hardhat-ethers");
require("@typechain/hardhat");
const hardhat_1 = require("hardhat");
require("hardhat-deploy");
const promises_1 = require("timers/promises");
const TIMEOUT = 30 * 1000; // 30 seconds
const main = async () => {
    if (!(0, Deploy_1.isTenderly)()) {
        throw new Error('Invalid network');
    }
    const { ethWhale } = await (0, Deploy_1.getNamedSigners)();
    while (true) {
        try {
            const { timestamp, number } = await hardhat_1.ethers.provider.getBlock('latest');
            Logger_1.default.log(`Current block=${number}, timestamp=${timestamp}`);
            Logger_1.default.log(`Waiting for ${TIMEOUT / 1000} seconds...`);
            Logger_1.default.log('');
            await (0, promises_1.setTimeout)(TIMEOUT);
            await ethWhale.sendTransaction({
                value: (0, Types_1.toWei)(1),
                to: ethWhale.address
            });
        }
        catch (e) {
            Logger_1.default.error(`Failed with: ${e}. Resuming in ${TIMEOUT / 1000} seconds...`);
            Logger_1.default.error('');
            await (0, promises_1.setTimeout)(TIMEOUT);
        }
    }
};
main()
    .then(() => process.exit(0))
    .catch((error) => {
    Logger_1.default.error(error);
    process.exit(1);
});
//# sourceMappingURL=timer.js.map