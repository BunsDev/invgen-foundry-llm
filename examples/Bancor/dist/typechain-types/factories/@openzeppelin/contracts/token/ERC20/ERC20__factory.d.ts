import type { ERC20, ERC20Interface } from "../../../../../@openzeppelin/contracts/token/ERC20/ERC20";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, ContractFactory, Overrides } from "ethers";
type ERC20ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC20__factory extends ContractFactory {
    constructor(...args: ERC20ConstructorParams);
    deploy(name_: string, symbol_: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ERC20>;
    getDeployTransaction(name_: string, symbol_: string, overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): ERC20;
    connect(signer: Signer): ERC20__factory;
    static readonly bytecode = "0x60806040523480156200001157600080fd5b5060405162000c8738038062000c8783398101604081905262000034916200011f565b600362000042838262000218565b50600462000051828262000218565b505050620002e4565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008257600080fd5b81516001600160401b03808211156200009f576200009f6200005a565b604051601f8301601f19908116603f01168101908282118183101715620000ca57620000ca6200005a565b81604052838152602092508683858801011115620000e757600080fd5b600091505b838210156200010b5785820183015181830184015290820190620000ec565b600093810190920192909252949350505050565b600080604083850312156200013357600080fd5b82516001600160401b03808211156200014b57600080fd5b620001598683870162000070565b935060208501519150808211156200017057600080fd5b506200017f8582860162000070565b9150509250929050565b600181811c908216806200019e57607f821691505b602082108103620001bf57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021357600081815260208120601f850160051c81016020861015620001ee5750805b601f850160051c820191505b818110156200020f57828155600101620001fa565b5050505b505050565b81516001600160401b038111156200023457620002346200005a565b6200024c8162000245845462000189565b84620001c5565b602080601f8311600181146200028457600084156200026b5750858301515b600019600386901b1c1916600185901b1785556200020f565b600085815260208120601f198616915b82811015620002b55788860151825594840194600190910190840162000294565b5085821015620002d45787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61099380620002f46000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80633950935111610081578063a457c2d71161005b578063a457c2d714610187578063a9059cbb1461019a578063dd62ed3e146101ad57600080fd5b8063395093511461014357806370a082311461015657806395d89b411461017f57600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610121578063313ce5671461013457600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d66101e6565b6040516100e391906107b6565b60405180910390f35b6100ff6100fa36600461083e565b610278565b60405190151581526020016100e3565b6002545b6040519081526020016100e3565b6100ff61012f366004610868565b610292565b604051601281526020016100e3565b6100ff61015136600461083e565b6102b6565b6101136101643660046108a4565b6001600160a01b031660009081526020819052604090205490565b6100d66102f5565b6100ff61019536600461083e565b610304565b6100ff6101a836600461083e565b6103b3565b6101136101bb3660046108c6565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101f5906108f9565b80601f0160208091040260200160405190810160405280929190818152602001828054610221906108f9565b801561026e5780601f106102435761010080835404028352916020019161026e565b820191906000526020600020905b81548152906001019060200180831161025157829003601f168201915b5050505050905090565b6000336102868185856103c1565b60019150505b92915050565b6000336102a0858285610519565b6102ab8585856105c9565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061028690829086906102f090879061094c565b6103c1565b6060600480546101f5906108f9565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156103a65760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6102ab82868684036103c1565b6000336102868185856105c9565b6001600160a01b03831661043c5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b0382166104b85760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146105c357818110156105b65760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161039d565b6105c384848484036103c1565b50505050565b6001600160a01b0383166106455760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b0382166106c15760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b038316600090815260208190526040902054818110156107505760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36105c3565b600060208083528351808285015260005b818110156107e3578581018301518582016040015282016107c7565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b80356001600160a01b038116811461083957600080fd5b919050565b6000806040838503121561085157600080fd5b61085a83610822565b946020939093013593505050565b60008060006060848603121561087d57600080fd5b61088684610822565b925061089460208501610822565b9150604084013590509250925092565b6000602082840312156108b657600080fd5b6108bf82610822565b9392505050565b600080604083850312156108d957600080fd5b6108e283610822565b91506108f060208401610822565b90509250929050565b600181811c9082168061090d57607f821691505b602082108103610946577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b8082018082111561028c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea164736f6c6343000813000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "name_";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "symbol_";
            readonly type: "string";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "subtractedValue";
            readonly type: "uint256";
        }];
        readonly name: "decreaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "addedValue";
            readonly type: "uint256";
        }];
        readonly name: "increaseAllowance";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalSupply";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): ERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20;
}
export {};
//# sourceMappingURL=ERC20__factory.d.ts.map