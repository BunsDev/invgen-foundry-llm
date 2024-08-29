import { Addressable } from '../../utils/Types';
import { TokenWithAddress } from './Factory';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
export declare const toAddress: (account: string | Addressable) => string;
export declare const getTransactionGas: (res: ContractTransaction) => Promise<BigNumber>;
export declare const getTransactionCost: (res: ContractTransaction) => Promise<BigNumber>;
export declare const getBalance: (token: TokenWithAddress, account: string | Addressable) => Promise<BigNumber>;
/**
 * Get all events with the event name from a transaction
 * @returns array of events
 */
export declare const getEvents: (tx: ContractTransaction, eventName: string) => Promise<import("ethers").Event[]>;
export declare const getBalances: (tokens: TokenWithAddress[], account: string | Addressable) => Promise<{
    [balance: string]: BigNumber;
}>;
export declare const setBalance: (account: string | Addressable, amount: BigNumber) => Promise<void>;
export declare const transfer: (sourceAccount: SignerWithAddress, token: TokenWithAddress, target: string | Addressable, amount: BigNumberish) => Promise<import("@ethersproject/abstract-provider").TransactionResponse>;
//# sourceMappingURL=Utils.d.ts.map