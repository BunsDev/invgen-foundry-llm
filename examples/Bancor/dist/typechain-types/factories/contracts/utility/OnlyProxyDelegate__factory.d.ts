import type { OnlyProxyDelegate, OnlyProxyDelegateInterface } from "../../../contracts/utility/OnlyProxyDelegate";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class OnlyProxyDelegate__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "UnknownDelegator";
        readonly type: "error";
    }];
    static createInterface(): OnlyProxyDelegateInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): OnlyProxyDelegate;
}
//# sourceMappingURL=OnlyProxyDelegate__factory.d.ts.map