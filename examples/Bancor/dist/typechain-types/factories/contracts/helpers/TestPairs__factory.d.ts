import type { TestPairs, TestPairsInterface } from "../../../contracts/helpers/TestPairs";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, ContractFactory, Overrides } from "ethers";
type TestPairsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestPairs__factory extends ContractFactory {
    constructor(...args: TestPairsConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string;
    }): Promise<TestPairs>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): TestPairs;
    connect(signer: Signer): TestPairs__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610654806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632b005d331461003b578063e566bb9b14610064575b600080fd5b61004e6100493660046104e8565b610077565b60405161005b919061051a565b60405180910390f35b61004e61007236600461058e565b61008e565b61007f610414565b610088826100a7565b92915050565b610096610414565b6100a08383610192565b9392505050565b6100af610414565b6fffffffffffffffffffffffffffffffff8216600090815260026020819052604080832081518083019283905292909182845b81546001600160a01b031681526001909101906020018083116100e2575050505050905060006001600160a01b031681600060028110610124576101246105c1565b60200201516001600160a01b031603610169576040517fc5fc4bf400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b604080518082019091526fffffffffffffffffffffffffffffffff909316835260208301525090565b61019a610414565b6101a48383610342565b156101db576040517fc9bb25eb00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006101e784846103ae565b6000805491925090610212906201000090046fffffffffffffffffffffffffffffffff1660016105f0565b600080547fffffffffffffffffffffffffffff00000000000000000000000000000000ffff16620100006fffffffffffffffffffffffffffffffff8416908102919091178255815260026020819052604090912091925061027591908490610445565b5081516001600160a01b039081166000908152600160209081526040808320828701805186168552925280832080547fffffffffffffffffffffffffffffffff00000000000000000000000000000000166fffffffffffffffffffffffffffffffff87169081179091559151865191519085169491909116927f6365c594f5448f79c1cc1e6f661bdbf1d16f2e8f85747e13f8e80f1fd168b7c391a46040518060400160405280826fffffffffffffffffffffffffffffffff168152602001838152509250505092915050565b60008061034f84846103ae565b80516001600160a01b039081166000908152600160209081526040808320828601519094168352929052908120549192506fffffffffffffffffffffffffffffffff90911690036103a4576000915050610088565b5060019392505050565b6103b66104b5565b816001600160a01b0316836001600160a01b0316106103f257604080518082019091526001600160a01b038084168252841660208201526100a0565b50604080518082019091526001600160a01b0392831681529116602082015290565b604051806040016040528060006fffffffffffffffffffffffffffffffff1681526020016104406104b5565b905290565b82600281019282156104a5579160200282015b828111156104a557825182547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03909116178255602090920191600190910190610458565b506104b19291506104d3565b5090565b60405180604001604052806002906020820280368337509192915050565b5b808211156104b157600081556001016104d4565b6000602082840312156104fa57600080fd5b81356fffffffffffffffffffffffffffffffff811681146100a057600080fd5b81516fffffffffffffffffffffffffffffffff16815260208083015160608301919081840160005b60028110156105685782516001600160a01b031682529183019190830190600101610542565b5050505092915050565b80356001600160a01b038116811461058957600080fd5b919050565b600080604083850312156105a157600080fd5b6105aa83610572565b91506105b860208401610572565b90509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6fffffffffffffffffffffffffffffffff818116838216019080821115610640577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b509291505056fea164736f6c6343000813000a";
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
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token0";
            readonly type: "address";
        }, {
            readonly internalType: "Token";
            readonly name: "token1";
            readonly type: "address";
        }];
        readonly name: "createPairTest";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "id";
                readonly type: "uint128";
            }, {
                readonly internalType: "Token[2]";
                readonly name: "tokens";
                readonly type: "address[2]";
            }];
            readonly internalType: "struct Pair";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "pairId";
            readonly type: "uint128";
        }];
        readonly name: "pairByIdTest";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "id";
                readonly type: "uint128";
            }, {
                readonly internalType: "Token[2]";
                readonly name: "tokens";
                readonly type: "address[2]";
            }];
            readonly internalType: "struct Pair";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): TestPairsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestPairs;
}
export {};
//# sourceMappingURL=TestPairs__factory.d.ts.map