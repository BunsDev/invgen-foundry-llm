import type { TestMathEx, TestMathExInterface } from "../../../contracts/helpers/TestMathEx";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, ContractFactory, Overrides } from "ethers";
type TestMathExConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestMathEx__factory extends ContractFactory {
    constructor(...args: TestMathExConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string;
    }): Promise<TestMathEx>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): TestMathEx;
    connect(signer: Signer): TestMathEx__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610850806100206000396000f3fe608060405234801561001057600080fd5b506004361061004b5760003560e01c80629593f314610050578063a0175ab314610076578063f2dad25014610089578063f8f219271461009c575b600080fd5b61006361005e366004610761565b6100ca565b6040519081526020015b60405180910390f35b610063610084366004610761565b6100e1565b61006361009736600461078d565b6100ee565b6100af6100aa3660046107af565b610103565b6040805182518152602092830151928101929092520161006d565b60006100d7848484610120565b90505b9392505050565b60006100d784848461016f565b60006100fa838361024a565b90505b92915050565b60408051808201909152600080825260208201526100fd8261027c565b60008061012e85858561016f565b9050600061013d868686610667565b11156100d757600019811061016557604051631a93c68960e11b815260040160405180910390fd5b60010190506100da565b600080600061017e8686610682565b91509150816000036101a3578381816101995761019961080c565b04925050506100da565b8382106101c357604051631a93c68960e11b815260040160405180910390fd5b60006101d0878787610667565b90506000806101e08585856106bd565b9150915081600003610208578681816101fb576101fb61080c565b04955050505050506100da565b600087810388169061021b8484846106ed565b90506000610237838b816102315761023161080c565b0461072a565b919091029b9a5050505050505050505050565b60008060006102598585610682565b915091508019821161026e5781600101610273565b816002015b95945050505050565b604080518082019091526000808252602082015260006102b56f58b90bfbe8e7bcd5e4f1d9cc01f97b578460000151856020015161016f565b90506000808070080000000000000000000000000000000084106102ec57604051631a93c68960e11b815260040160405180910390fd5b6f10000000000000000000000000000000840692508291506001607f1b8280020491506710e1b3be415a00008202016001607f1b8383020491506705a0913f6b1e00008202016001607f1b838302049150670168244fdac780008202016001607f1b838302049150664807432bc180008202016001607f1b838302049150660c0135dca040008202016001607f1b8383020491506601b707b1cdc0008202016001607f1b8383020491506536e0f639b8008202016001607f1b838302049150650618fee9f8008202016001607f1b838302049150649c197dcc008202016001607f1b838302049150640e30dce4008202016001607f1b83830204915064012ebd13008202016001607f1b8383020491506317499f008202016001607f1b8383020491506301a9d4808202016001607f1b838302049150621c63808202016001607f1b8383020491506201c6388202016001607f1b838302049150611ab88202016001607f1b83830204915061017c8202016001607f1b83830204915060148202016001607f1b83830204915081016001607f1b836721c3677c82b400008304010190506f100000000000000000000000000000008416156104d15770018ebef9eac820ae8682b9793ac6d1e7767001c3d6a24ed82218787d624d3e5eba95f982020490505b6f20000000000000000000000000000000841615610513577001368b2fc6f9609fe7aceb46aa619baed470018ebef9eac820ae8682b9793ac6d1e77882020490505b6f40000000000000000000000000000000841615610554576fbc5ab1b16779be3575bd8f0520a9f21f7001368b2fc6f9609fe7aceb46aa619baed582020490505b6001607f1b841615610588576f454aaa8efe072e7f6ddbab84b40a55c96fbc5ab1b16779be3575bd8f0520a9f21e82020490505b7001000000000000000000000000000000008416156105c9576f0960aadc109e7a3bf4578099615711ea6f454aaa8efe072e7f6ddbab84b40a55c582020490505b700200000000000000000000000000000000841615610609576e2bf84208204f5977f9a8cf01fdce3d6f0960aadc109e7a3bf4578099615711d782020490505b700400000000000000000000000000000000841615610647576d03c6ab775dd0b95b4cbee7e65d116e2bf84208204f5977f9a8cf01fdc30782020490505b604080518082019091529081526001607f1b602082015295945050505050565b600081806106775761067761080c565b838509949350505050565b60008060006106918585610752565b90508484028082106106aa5790819003925090506106b6565b60018183030393509150505b9250929050565b6000808284106106d357508390508183036106e5565b6106de600186610822565b9150508183035b935093915050565b60008061070b83808303816107045761070461080c565b0460010190565b905082848161071c5761071c61080c565b048186021795945050505050565b60006001815b600881101561074b5783820260020382029150600101610730565b5092915050565b60006000198284099392505050565b60008060006060848603121561077657600080fd5b505081359360208301359350604090920135919050565b600080604083850312156107a057600080fd5b50508035926020909101359150565b6000604082840312156107c157600080fd5b6040516040810181811067ffffffffffffffff821117156107f257634e487b7160e01b600052604160045260246000fd5b604052823581526020928301359281019290925250919050565b634e487b7160e01b600052601260045260246000fd5b818103818111156100fd57634e487b7160e01b600052601160045260246000fdfea164736f6c6343000813000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "Overflow";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "n";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "d";
                readonly type: "uint256";
            }];
            readonly internalType: "struct Fraction";
            readonly name: "f";
            readonly type: "tuple";
        }];
        readonly name: "exp2";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "n";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "d";
                readonly type: "uint256";
            }];
            readonly internalType: "struct Fraction";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "x";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "y";
            readonly type: "uint256";
        }];
        readonly name: "minFactor";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "x";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "y";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "z";
            readonly type: "uint256";
        }];
        readonly name: "mulDivC";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "x";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "y";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "z";
            readonly type: "uint256";
        }];
        readonly name: "mulDivF";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): TestMathExInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestMathEx;
}
export {};
//# sourceMappingURL=TestMathEx__factory.d.ts.map