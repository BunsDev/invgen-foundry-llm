import type { ShortStrings, ShortStringsInterface } from "../../../../@openzeppelin/contracts/utils/ShortStrings";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, ContractFactory, Overrides } from "ethers";
type ShortStringsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ShortStrings__factory extends ContractFactory {
    constructor(...args: ShortStringsConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string;
    }): Promise<ShortStrings>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): ShortStrings;
    connect(signer: Signer): ShortStrings__factory;
    static readonly bytecode = "0x602d6037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea164736f6c6343000813000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InvalidShortString";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "str";
            readonly type: "string";
        }];
        readonly name: "StringTooLong";
        readonly type: "error";
    }];
    static createInterface(): ShortStringsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ShortStrings;
}
export {};
//# sourceMappingURL=ShortStrings__factory.d.ts.map