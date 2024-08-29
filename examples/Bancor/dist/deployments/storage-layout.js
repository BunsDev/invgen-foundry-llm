"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../utils/Logger"));
const hardhat_1 = require("hardhat");
const main = async () => {
    await hardhat_1.storageLayout.export();
};
main()
    .then(() => process.exit(0))
    .catch((error) => {
    Logger_1.default.error(error);
    process.exit(1);
});
//# sourceMappingURL=storage-layout.js.map