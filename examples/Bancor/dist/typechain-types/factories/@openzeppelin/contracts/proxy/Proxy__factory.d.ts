import type { Proxy, ProxyInterface } from "../../../../@openzeppelin/contracts/proxy/Proxy";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class Proxy__factory {
    static readonly abi: readonly [{
        readonly stateMutability: "payable";
        readonly type: "fallback";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): ProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Proxy;
}
//# sourceMappingURL=Proxy__factory.d.ts.map