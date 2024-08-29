import type { ICarbonVortex, ICarbonVortexInterface } from "../../../../contracts/vortex/interfaces/ICarbonVortex";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class ICarbonVortex__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "DuplicateToken";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InsufficientAmountForTrading";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InsufficientNativeTokenSent";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidAmountLength";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidPrice";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidToken";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTokenLength";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTrade";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "PairDisabled";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TradingDisabled";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "Token[]";
            readonly name: "tokens";
            readonly type: "address[]";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "caller";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "target";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256[]";
            readonly name: "amounts";
            readonly type: "uint256[]";
        }];
        readonly name: "FundsWithdrawn";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "prevTargetTokenSaleAmount";
            readonly type: "uint128";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "newTargetTokenSaleAmount";
            readonly type: "uint128";
        }];
        readonly name: "MaxTargetTokenSaleAmountUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "prevMinTokenSaleAmountMultiplier";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "newMinTokenSaleAmountMultiplier";
            readonly type: "uint32";
        }];
        readonly name: "MinTokenSaleAmountMultiplierUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "prevMinTokenSaleAmount";
            readonly type: "uint128";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "newMinTokenSaleAmount";
            readonly type: "uint128";
        }];
        readonly name: "MinTokenSaleAmountUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "prevStatus";
            readonly type: "bool";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "newStatus";
            readonly type: "bool";
        }];
        readonly name: "PairDisabledStatusUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "prevPriceDecayHalfLife";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "newPriceDecayHalfLife";
            readonly type: "uint32";
        }];
        readonly name: "PriceDecayHalfLifeUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "prevPriceResetMultiplier";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "newPriceResetMultiplier";
            readonly type: "uint32";
        }];
        readonly name: "PriceResetMultiplierUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "sourceAmount";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "targetAmount";
                readonly type: "uint128";
            }];
            readonly indexed: false;
            readonly internalType: "struct ICarbonVortex.Price";
            readonly name: "price";
            readonly type: "tuple";
        }];
        readonly name: "PriceUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "prevRewardsPPM";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "newRewardsPPM";
            readonly type: "uint32";
        }];
        readonly name: "RewardsUpdated";
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
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "prevPriceDecayHalfLife";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "newPriceDecayHalfLife";
            readonly type: "uint32";
        }];
        readonly name: "TargetTokenPriceDecayHalfLifeOnResetUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "prevPriceDecayHalfLife";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "newPriceDecayHalfLife";
            readonly type: "uint32";
        }];
        readonly name: "TargetTokenPriceDecayHalfLifeUpdated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "caller";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "sourceAmount";
            readonly type: "uint128";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "targetAmount";
            readonly type: "uint128";
        }];
        readonly name: "TokenTraded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "sourceAmount";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "targetAmount";
                readonly type: "uint128";
            }];
            readonly indexed: false;
            readonly internalType: "struct ICarbonVortex.Price";
            readonly name: "price";
            readonly type: "tuple";
        }];
        readonly name: "TradingReset";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "amountAvailableForTrading";
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
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "availableTokens";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token[]";
            readonly name: "tokens";
            readonly type: "address[]";
        }];
        readonly name: "execute";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint128";
            readonly name: "targetAmount";
            readonly type: "uint128";
        }];
        readonly name: "expectedTradeInput";
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
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint128";
            readonly name: "sourceAmount";
            readonly type: "uint128";
        }];
        readonly name: "expectedTradeReturn";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "finalTargetToken";
        readonly outputs: readonly [{
            readonly internalType: "Token";
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
        readonly inputs: readonly [];
        readonly name: "minTargetTokenSaleAmount";
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
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "minTokenSaleAmount";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "minTokenSaleAmountMultiplier";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "pairDisabled";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "priceDecayHalfLife";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "priceResetMultiplier";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
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
        readonly inputs: readonly [];
        readonly name: "rewardsPPM";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "targetToken";
        readonly outputs: readonly [{
            readonly internalType: "Token";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "targetTokenPriceDecayHalfLife";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "targetTokenPriceDecayHalfLifeOnReset";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "targetTokenSaleAmount";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "initial";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "current";
                readonly type: "uint128";
            }];
            readonly internalType: "struct ICarbonVortex.SaleAmount";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "tokenPrice";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint128";
                readonly name: "sourceAmount";
                readonly type: "uint128";
            }, {
                readonly internalType: "uint128";
                readonly name: "targetAmount";
                readonly type: "uint128";
            }];
            readonly internalType: "struct ICarbonVortex.Price";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalCollected";
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
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint128";
            readonly name: "targetAmount";
            readonly type: "uint128";
        }];
        readonly name: "trade";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "Token";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "tradingEnabled";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
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
    }];
    static createInterface(): ICarbonVortexInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICarbonVortex;
}
//# sourceMappingURL=ICarbonVortex__factory.d.ts.map