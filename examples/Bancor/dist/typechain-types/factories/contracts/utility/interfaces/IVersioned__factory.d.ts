import type { IVersioned, IVersionedInterface } from "../../../../contracts/utility/interfaces/IVersioned";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class IVersioned__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "version";
        readonly outputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IVersionedInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVersioned;
}
//# sourceMappingURL=IVersioned__factory.d.ts.map