import type { MathEx, MathExInterface } from "../../../contracts/utility/MathEx";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, ContractFactory, Overrides } from "ethers";
type MathExConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MathEx__factory extends ContractFactory {
    constructor(...args: MathExConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string;
    }): Promise<MathEx>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): MathEx;
    connect(signer: Signer): MathEx__factory;
    static readonly bytecode = "0x602d6037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea164736f6c6343000813000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "Overflow";
        readonly type: "error";
    }];
    static createInterface(): MathExInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MathEx;
}
export {};
//# sourceMappingURL=MathEx__factory.d.ts.map