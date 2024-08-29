import type { TestStrategies, TestStrategiesInterface } from "../../../contracts/helpers/TestStrategies";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, ContractFactory, Overrides } from "ethers";
type TestStrategiesConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestStrategies__factory extends ContractFactory {
    constructor(...args: TestStrategiesConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string;
    }): Promise<TestStrategies>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): TestStrategies;
    connect(signer: Signer): TestStrategies__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061098f806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806361c8b5571461005157806392fd04ca14610077578063ab770e74146100ab578063b28087b6146100be575b600080fd5b61006461005f3660046107f5565b6100e1565b6040519081526020015b60405180910390f35b61008a61008536600461084b565b6100fe565b6040516fffffffffffffffffffffffffffffffff909116815260200161006e565b61008a6100b936600461084b565b610116565b6100d16100cc3660046107f5565b61012e565b604051901515815260200161006e565b600065ffffffffffff8216660100000000000083041b5b92915050565b60008061010d84846000610143565b95945050505050565b60008061012584846001610143565b50949350505050565b600066010000000000008083041c15156100f8565b600080600085600001516fffffffffffffffffffffffffffffffff169050600086602001516fffffffffffffffffffffffffffffffff16905060006101a8886040015167ffffffffffffffff1665ffffffffffff811666010000000000009091041b90565b905060006101d6896060015167ffffffffffffffff1665ffffffffffff811666010000000000009091041b90565b9050861561020f57610205610200896fffffffffffffffffffffffffffffffff1686868686610243565b610340565b9550879450610237565b879550610234610200896fffffffffffffffffffffffffffffffff16868686866103ea565b94505b50505050935093915050565b6000826000036102b25781600003610287576040517f4e305c4b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6102ab8661029c660100000000000080610923565b6102a68580610923565b610529565b905061010d565b660100000000000084028584028386020160006102cf868a610923565b6102d9908361093a565b905060006102e7848561059b565b905060006102f5848461059b565b9050600061030383836105ca565b90506000610312878884610529565b905060006103218787856105e0565b905061032e8e8383610529565b9e9d5050505050505050505050505050565b60006fffffffffffffffffffffffffffffffff8211156103e6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203160448201527f3238206269747300000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b5090565b600082600003610452578160000361042e576040517f4e305c4b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6102ab8661043c8480610923565b61044d660100000000000080610923565b6105e0565b6601000000000000840285840283860201600061046f8983610923565b9050600061047d848561059b565b9050600061048b838961059b565b9050600061049983836105ca565b905060006104a8878884610529565b905060006104b7868c85610529565b90506000806104c684846106d4565b9150915081156104f5576104e4896104de878b61094d565b836105e0565b9a505050505050505050505061010d565b6105008a8b8a610529565b61050a908e61096f565b610514908a61094d565b9a505050505050505050505095945050505050565b6000806105378585856105e0565b905060006105468686866106fd565b1115610591576000198110610587576040517f35278d1200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001019050610594565b90505b9392505050565b60008060006105aa8585610718565b91509150801982116105bf578160010161010d565b506002019392505050565b60008183116105d95781610594565b5090919050565b60008060006105ef8686610718565b91509150816000036106145783818161060a5761060a6108f7565b0492505050610594565b83821061064d576040517f35278d1200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600061065a8787876106fd565b905060008061066a858585610751565b915091508160000361069257868181610685576106856108f7565b0495505050505050610594565b60008781038816906106a5848484610781565b905060006106c1838b816106bb576106bb6108f7565b046107be565b919091029b9a5050505050505050505050565b600080838301848110156106ef5760008092509250506106f6565b6001925090505b9250929050565b6000818061070d5761070d6108f7565b838509949350505050565b600080600061072785856107e6565b90508484028082106107405790819003925090506106f6565b600181830303969095509350505050565b6000808284106107675750839050818303610779565b61077260018661093a565b9150508183035b935093915050565b60008061079f8380830381610798576107986108f7565b0460010190565b90508284816107b0576107b06108f7565b048186021795945050505050565b60006001815b60088110156107df57838202600203820291506001016107c4565b5092915050565b60006000198284099392505050565b60006020828403121561080757600080fd5b5035919050565b80356fffffffffffffffffffffffffffffffff8116811461082e57600080fd5b919050565b803567ffffffffffffffff8116811461082e57600080fd5b60008082840360a081121561085f57600080fd5b608081121561086d57600080fd5b506040516080810181811067ffffffffffffffff8211171561089f57634e487b7160e01b600052604160045260246000fd5b6040526108ab8461080e565b81526108b96020850161080e565b60208201526108ca60408501610833565b60408201526108db60608501610833565b606082015291506108ee6080840161080e565b90509250929050565b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176100f8576100f861090d565b818103818111156100f8576100f861090d565b60008261096a57634e487b7160e01b600052601260045260246000fd5b500490565b808201808211156100f8576100f861090d56fea164736f6c6343000813000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "BalanceMismatch";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "GreaterThanMaxInput";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InsufficientCapacity";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InsufficientLiquidity";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidRate";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTradeActionAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTradeActionStrategyId";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "LowerThanMinReturn";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NativeAmountMismatch";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderDisabled";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OutDated";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "Overflow";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "FeesWithdrawn";
        readonly type: "event";
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
            readonly internalType: "Token";
            readonly name: "token0";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token1";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "prevFeePPM";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "newFeePPM";
            readonly type: "uint32";
        }];
        readonly name: "PairTradingFeePPMUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
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
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "y";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "z";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint64";
                readonly name: "A";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "B";
                readonly type: "uint64";
            }];
            readonly indexed: false;
            readonly internalType: "struct Order";
            readonly name: "order0";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "y";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "z";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint64";
                readonly name: "A";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "B";
                readonly type: "uint64";
            }];
            readonly indexed: false;
            readonly internalType: "struct Order";
            readonly name: "order1";
            readonly type: "tuple";
        }];
        readonly name: "StrategyCreated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
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
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "y";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "z";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint64";
                readonly name: "A";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "B";
                readonly type: "uint64";
            }];
            readonly indexed: false;
            readonly internalType: "struct Order";
            readonly name: "order0";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "y";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "z";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint64";
                readonly name: "A";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "B";
                readonly type: "uint64";
            }];
            readonly indexed: false;
            readonly internalType: "struct Order";
            readonly name: "order1";
            readonly type: "tuple";
        }];
        readonly name: "StrategyDeleted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
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
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "y";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "z";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint64";
                readonly name: "A";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "B";
                readonly type: "uint64";
            }];
            readonly indexed: false;
            readonly internalType: "struct Order";
            readonly name: "order0";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "y";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "z";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint64";
                readonly name: "A";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "B";
                readonly type: "uint64";
            }];
            readonly indexed: false;
            readonly internalType: "struct Order";
            readonly name: "order1";
            readonly type: "tuple";
        }, {
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "reason";
            readonly type: "uint8";
        }];
        readonly name: "StrategyUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "trader";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "sourceToken";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "targetToken";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "sourceAmount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "targetAmount";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "tradingFeeAmount";
            readonly type: "uint128";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "byTargetAmount";
            readonly type: "bool";
        }];
        readonly name: "TokensTraded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "prevFeePPM";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "newFeePPM";
            readonly type: "uint32";
        }];
        readonly name: "TradingFeePPMUpdated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "rate";
            readonly type: "uint256";
        }];
        readonly name: "expandedRate";
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
            readonly name: "rate";
            readonly type: "uint256";
        }];
        readonly name: "isValidRate";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "y";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "z";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint64";
                readonly name: "A";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "B";
                readonly type: "uint64";
            }];
            readonly internalType: "struct Order";
            readonly name: "order";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint128";
            readonly name: "amount";
            readonly type: "uint128";
        }];
        readonly name: "tradeBySourceAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "y";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "z";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint64";
                readonly name: "A";
                readonly type: "uint64";
            }, {
                readonly internalType: "uint64";
                readonly name: "B";
                readonly type: "uint64";
            }];
            readonly internalType: "struct Order";
            readonly name: "order";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint128";
            readonly name: "amount";
            readonly type: "uint128";
        }];
        readonly name: "tradeByTargetAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): TestStrategiesInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestStrategies;
}
export {};
//# sourceMappingURL=TestStrategies__factory.d.ts.map