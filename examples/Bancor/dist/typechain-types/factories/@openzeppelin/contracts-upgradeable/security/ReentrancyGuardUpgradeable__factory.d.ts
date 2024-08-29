import type { ReentrancyGuardUpgradeable, ReentrancyGuardUpgradeableInterface } from "../../../../@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class ReentrancyGuardUpgradeable__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }];
    static createInterface(): ReentrancyGuardUpgradeableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ReentrancyGuardUpgradeable;
}
//# sourceMappingURL=ReentrancyGuardUpgradeable__factory.d.ts.map