import type { Pairs, PairsInterface } from "../../../contracts/carbon/Pairs";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class Pairs__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "PairAlreadyExists";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "PairDoesNotExist";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint128";
            readonly name: "pairId";
            readonly type: "uint128";
        }, {
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token0";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token1";
            readonly type: "address";
        }];
        readonly name: "PairCreated";
        readonly type: "event";
    }];
    static createInterface(): PairsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Pairs;
}
//# sourceMappingURL=Pairs__factory.d.ts.map