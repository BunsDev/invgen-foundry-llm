import type { IERC1967, IERC1967Interface } from "../../../../@openzeppelin/contracts/interfaces/IERC1967";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class IERC1967__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "previousAdmin";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "newAdmin";
            readonly type: "address";
        }];
        readonly name: "AdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "beacon";
            readonly type: "address";
        }];
        readonly name: "BeaconUpgraded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "implementation";
            readonly type: "address";
        }];
        readonly name: "Upgraded";
        readonly type: "event";
    }];
    static createInterface(): IERC1967Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC1967;
}
//# sourceMappingURL=IERC1967__factory.d.ts.map