import type { IERC20Burnable, IERC20BurnableInterface } from "../../../../contracts/token/interfaces/IERC20Burnable";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class IERC20Burnable__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "burn";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "burnFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IERC20BurnableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20Burnable;
}
//# sourceMappingURL=IERC20Burnable__factory.d.ts.map