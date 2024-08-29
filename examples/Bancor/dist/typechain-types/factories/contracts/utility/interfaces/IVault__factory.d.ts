import type { IVault, IVaultInterface } from "../../../../contracts/utility/interfaces/IVault";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class IVault__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "address payable";
            readonly name: "target";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "withdrawFunds";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IVaultInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVault;
}
//# sourceMappingURL=IVault__factory.d.ts.map