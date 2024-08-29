"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachOnly = exports.deployOrAttach = void 0;
const hardhat_1 = require("hardhat");
const deployOrAttach = (contractName, FactoryConstructor, initialSigner) => {
    return {
        metadata: {
            contractName,
            abi: FactoryConstructor.abi,
            bytecode: FactoryConstructor.bytecode
        },
        deploy: async (...args) => {
            const defaultSigner = initialSigner ?? (await hardhat_1.ethers.getSigners())[0];
            return new FactoryConstructor(defaultSigner).deploy(...(args || []));
        },
        attach: (0, exports.attachOnly)(FactoryConstructor, initialSigner).attach
    };
};
exports.deployOrAttach = deployOrAttach;
const attachOnly = (FactoryConstructor, initialSigner) => {
    return {
        attach: async (address, signer) => {
            const defaultSigner = initialSigner ?? (await hardhat_1.ethers.getSigners())[0];
            return new FactoryConstructor(signer ?? defaultSigner).attach(address);
        }
    };
};
exports.attachOnly = attachOnly;
//# sourceMappingURL=ContractBuilder.js.map