import type { ICarbonController, ICarbonControllerInterface } from "../../../../contracts/carbon/interfaces/ICarbonController";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class ICarbonController__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "newAdminRole";
            readonly type: "bytes32";
        }];
        readonly name: "RoleAdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleGranted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleRevoked";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "accumulatedFees";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "sourceToken";
            readonly type: "address";
        }, {
            readonly internalType: "Token";
            readonly name: "targetToken";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "strategyId";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint128";
                readonly name: "amount";
                readonly type: "uint128";
            }];
            readonly internalType: "struct TradeAction[]";
            readonly name: "tradeActions";
            readonly type: "tuple[]";
        }];
        readonly name: "calculateTradeSourceAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "sourceToken";
            readonly type: "address";
        }, {
            readonly internalType: "Token";
            readonly name: "targetToken";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "strategyId";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint128";
                readonly name: "amount";
                readonly type: "uint128";
            }];
            readonly internalType: "struct TradeAction[]";
            readonly name: "tradeActions";
            readonly type: "tuple[]";
        }];
        readonly name: "calculateTradeTargetAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "controllerType";
        readonly outputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
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
        readonly name: "createPair";
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
            readonly internalType: "Token";
            readonly name: "token0";
            readonly type: "address";
        }, {
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
            readonly internalType: "struct Order[2]";
            readonly name: "orders";
            readonly type: "tuple[2]";
        }];
        readonly name: "createStrategy";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "strategyId";
            readonly type: "uint256";
        }];
        readonly name: "deleteStrategy";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "index";
            readonly type: "uint256";
        }];
        readonly name: "getRoleMember";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleMemberCount";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "grantRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "hasRole";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
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
        readonly name: "pair";
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
        readonly name: "pairTradingFeePPM";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "pairs";
        readonly outputs: readonly [{
            readonly internalType: "Token[2][]";
            readonly name: "";
            readonly type: "address[2][]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "revokeRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token0";
            readonly type: "address";
        }, {
            readonly internalType: "Token";
            readonly name: "token1";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "startIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "endIndex";
            readonly type: "uint256";
        }];
        readonly name: "strategiesByPair";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "id";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "owner";
                readonly type: "address";
            }, {
                readonly internalType: "Token[2]";
                readonly name: "tokens";
                readonly type: "address[2]";
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
                readonly internalType: "struct Order[2]";
                readonly name: "orders";
                readonly type: "tuple[2]";
            }];
            readonly internalType: "struct Strategy[]";
            readonly name: "";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
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
        readonly name: "strategiesByPairCount";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly name: "strategy";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "id";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "owner";
                readonly type: "address";
            }, {
                readonly internalType: "Token[2]";
                readonly name: "tokens";
                readonly type: "address[2]";
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
                readonly internalType: "struct Order[2]";
                readonly name: "orders";
                readonly type: "tuple[2]";
            }];
            readonly internalType: "struct Strategy";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "sourceToken";
            readonly type: "address";
        }, {
            readonly internalType: "Token";
            readonly name: "targetToken";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "strategyId";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint128";
                readonly name: "amount";
                readonly type: "uint128";
            }];
            readonly internalType: "struct TradeAction[]";
            readonly name: "tradeActions";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint128";
            readonly name: "minReturn";
            readonly type: "uint128";
        }];
        readonly name: "tradeBySourceAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "sourceToken";
            readonly type: "address";
        }, {
            readonly internalType: "Token";
            readonly name: "targetToken";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "strategyId";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint128";
                readonly name: "amount";
                readonly type: "uint128";
            }];
            readonly internalType: "struct TradeAction[]";
            readonly name: "tradeActions";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint128";
            readonly name: "maxInput";
            readonly type: "uint128";
        }];
        readonly name: "tradeByTargetAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "tradingFeePPM";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "strategyId";
            readonly type: "uint256";
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
            readonly internalType: "struct Order[2]";
            readonly name: "currentOrders";
            readonly type: "tuple[2]";
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
            readonly internalType: "struct Order[2]";
            readonly name: "newOrders";
            readonly type: "tuple[2]";
        }];
        readonly name: "updateStrategy";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "version";
        readonly outputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "";
            readonly type: "uint16";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }];
        readonly name: "withdrawFees";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ICarbonControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICarbonController;
}
//# sourceMappingURL=ICarbonController__factory.d.ts.map