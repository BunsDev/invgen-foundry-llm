import type { TestOnlyProxyDelegate, TestOnlyProxyDelegateInterface } from "../../../contracts/helpers/TestOnlyProxyDelegate";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, ContractFactory, Overrides } from "ethers";
type TestOnlyProxyDelegateConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestOnlyProxyDelegate__factory extends ContractFactory {
    constructor(...args: TestOnlyProxyDelegateConstructorParams);
    deploy(delegator: string, overrides?: Overrides & {
        from?: string;
    }): Promise<TestOnlyProxyDelegate>;
    getDeployTransaction(delegator: string, overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): TestOnlyProxyDelegate;
    connect(signer: Signer): TestOnlyProxyDelegate__factory;
    static readonly bytecode = "0x60a060405234801561001057600080fd5b5060405161015a38038061015a83398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b60805160d26100886000396000606d015260d26000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063c4cb3d0c14602d575b600080fd5b60336047565b604051901515815260200160405180910390f35b6000604f6055565b50600190565b3073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161460c3576040517fd0c8bfe500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b56fea164736f6c6343000813000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "delegator";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnknownDelegator";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "testOnlyProxyDelegate";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): TestOnlyProxyDelegateInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestOnlyProxyDelegate;
}
export {};
//# sourceMappingURL=TestOnlyProxyDelegate__factory.d.ts.map