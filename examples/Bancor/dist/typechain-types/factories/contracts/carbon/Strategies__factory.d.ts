import type { Strategies, StrategiesInterface } from "../../../contracts/carbon/Strategies";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class Strategies__factory {
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
    }];
    static createInterface(): StrategiesInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Strategies;
}
//# sourceMappingURL=Strategies__factory.d.ts.map