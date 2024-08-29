import type { TestLogic, TestLogicInterface } from "../../../contracts/helpers/TestLogic";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, ContractFactory, BigNumberish, Overrides } from "ethers";
type TestLogicConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestLogic__factory extends ContractFactory {
    constructor(...args: TestLogicConstructorParams);
    deploy(initVersion: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<TestLogic>;
    getDeployTransaction(initVersion: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): TestLogic;
    connect(signer: Signer): TestLogic__factory;
    static readonly bytecode = "0x60a060405234801561001057600080fd5b5060405161111838038061111883398101604081905261002f9161003b565b61ffff16608052610066565b60006020828403121561004d57600080fd5b815161ffff8116811461005f57600080fd5b9392505050565b60805161109061008860003960008181610199015261050501526110906000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80638cd2403d11610097578063a217fddf11610066578063a217fddf14610270578063ca15c87314610278578063d547741f1461028b578063f48a24bb1461029e57600080fd5b80638cd2403d146101d35780639010d07c146101e657806391d148541461021157806393867fb51461024a57600080fd5b806336568abe116100d357806336568abe1461017e57806354fd4d501461019157806373d4a13a146101c35780638129fc1c146101cb57600080fd5b806301ffc9a714610105578063158ef93e1461012d578063248a9ca3146101385780632f2ff15d14610169575b600080fd5b610118610113366004610d77565b6102b5565b60405190151581526020015b60405180910390f35b60fb5460ff16610118565b61015b610146366004610db9565b60009081526065602052604090206001015490565b604051908152602001610124565b61017c610177366004610dd2565b610311565b005b61017c61018c366004610dd2565b61033b565b60405161ffff7f0000000000000000000000000000000000000000000000000000000000000000168152602001610124565b60fc5461015b565b61017c6103cc565b61017c6101e1366004610e0e565b6104ec565b6101f96101f4366004610e80565b610597565b6040516001600160a01b039091168152602001610124565b61011861021f366004610dd2565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b7f2172861495e7b85edac73e3cd5fbb42dd675baadf627720e687bcfdaca02509661015b565b61015b600081565b61015b610286366004610db9565b6105b6565b61017c610299366004610dd2565b6105cd565b61017c6102ac366004610ea2565b61ffff1660fc55565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f5a05180f00000000000000000000000000000000000000000000000000000000148061030b575061030b826105f2565b92915050565b60008281526065602052604090206001015461032c81610689565b6103368383610693565b505050565b6001600160a01b03811633146103be5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b6103c882826106b5565b5050565b600054610100900460ff16158080156103ec5750600054600160ff909116105b806104065750303b158015610406575060005460ff166001145b6104785760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016103b5565b6000805460ff19166001179055801561049b576000805461ff0019166101001790555b6104a36106d7565b80156104e9576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b60c9546000906105019061ffff166001610edc565b90507f000000000000000000000000000000000000000000000000000000000000000061ffff168161ffff1614610564576040517f0dc149f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60c980547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00001661ffff8316179055505050565b60008281526097602052604081206105af908361075e565b9392505050565b600081815260976020526040812061030b9061076a565b6000828152606560205260409020600101546105e881610689565b61033683836106b5565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061030b57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000083161461030b565b6104e98133610774565b61069d82826107e9565b6000828152609760205260409020610336908261088b565b6106bf82826108a0565b60008281526097602052604090206103369082610923565b600054610100900460ff166107545760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e6700000000000000000000000000000000000000000060648201526084016103b5565b61075c610938565b565b60006105af83836109c9565b600061030b825490565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff166103c8576107a7816109f3565b6107b2836020610a05565b6040516020016107c3929190610f1b565b60408051601f198184030181529082905262461bcd60e51b82526103b591600401610f9c565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff166103c85760008281526065602090815260408083206001600160a01b03851684529091529020805460ff191660011790556108473390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006105af836001600160a01b038416610c2e565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff16156103c85760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60006105af836001600160a01b038416610c7d565b600054610100900460ff166109b55760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e6700000000000000000000000000000000000000000060648201526084016103b5565b60fb805460ff19166001179055606460fc55565b60008260000182815481106109e0576109e0610fcf565b9060005260206000200154905092915050565b606061030b6001600160a01b03831660145b60606000610a14836002610fe5565b610a1f906002610ffc565b67ffffffffffffffff811115610a3757610a3761100f565b6040519080825280601f01601f191660200182016040528015610a61576020820181803683370190505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110610a9857610a98610fcf565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110610afb57610afb610fcf565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000610b37846002610fe5565b610b42906001610ffc565b90505b6001811115610bdf577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110610b8357610b83610fcf565b1a60f81b828281518110610b9957610b99610fcf565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c93610bd881611025565b9050610b45565b5083156105af5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016103b5565b6000818152600183016020526040812054610c755750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561030b565b50600061030b565b60008181526001830160205260408120548015610d66576000610ca160018361105a565b8554909150600090610cb59060019061105a565b9050818114610d1a576000866000018281548110610cd557610cd5610fcf565b9060005260206000200154905080876000018481548110610cf857610cf8610fcf565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610d2b57610d2b61106d565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061030b565b600091505061030b565b5092915050565b600060208284031215610d8957600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146105af57600080fd5b600060208284031215610dcb57600080fd5b5035919050565b60008060408385031215610de557600080fd5b8235915060208301356001600160a01b0381168114610e0357600080fd5b809150509250929050565b60008060208385031215610e2157600080fd5b823567ffffffffffffffff80821115610e3957600080fd5b818501915085601f830112610e4d57600080fd5b813581811115610e5c57600080fd5b866020828501011115610e6e57600080fd5b60209290920196919550909350505050565b60008060408385031215610e9357600080fd5b50508035926020909101359150565b600060208284031215610eb457600080fd5b813561ffff811681146105af57600080fd5b634e487b7160e01b600052601160045260246000fd5b61ffff818116838216019080821115610d7057610d70610ec6565b60005b83811015610f12578181015183820152602001610efa565b50506000910152565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351610f53816017850160208801610ef7565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351610f90816028840160208801610ef7565b01602801949350505050565b6020815260008251806020840152610fbb816040850160208701610ef7565b601f01601f19169190910160400192915050565b634e487b7160e01b600052603260045260246000fd5b808202811582820484141761030b5761030b610ec6565b8082018082111561030b5761030b610ec6565b634e487b7160e01b600052604160045260246000fd5b60008161103457611034610ec6565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b8181038181111561030b5761030b610ec6565b634e487b7160e01b600052603160045260246000fdfea164736f6c6343000813000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "initVersion";
            readonly type: "uint16";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "AlreadyInitialized";
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
            readonly internalType: "uint16";
            readonly name: "newVersion";
            readonly type: "uint16";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "arg1";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "arg2";
            readonly type: "bool";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "arg3";
            readonly type: "string";
        }];
        readonly name: "Upgraded";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "data";
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
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "initialized";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "postUpgrade";
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
        readonly name: "roleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint16";
            readonly name: "newData";
            readonly type: "uint16";
        }];
        readonly name: "setData";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
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
    static createInterface(): TestLogicInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestLogic;
}
export {};
//# sourceMappingURL=TestLogic__factory.d.ts.map