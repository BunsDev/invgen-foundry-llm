"use strict";
/* Autogenerated file. Do not edit manually. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextUpgradeable__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
];
class ContextUpgradeable__factory {
    static abi = _abi;
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ContextUpgradeable__factory = ContextUpgradeable__factory;
//# sourceMappingURL=ContextUpgradeable__factory.js.map