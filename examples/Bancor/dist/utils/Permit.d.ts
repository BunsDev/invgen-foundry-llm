import { Addressable } from './Types';
import { BigNumber, BigNumberish, Wallet } from 'ethers';
export declare const domainSeparator: (name: string, verifyingContract: string) => string;
export declare const permitData: (name: string, verifyingContract: string, owner: string, spender: string, amount: BigNumber, nonce: number, deadline?: BigNumberish) => {
    primaryType: "Permit";
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Permit: {
            name: string;
            type: string;
        }[];
    };
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    };
    message: {
        owner: string;
        spender: string;
        value: string;
        nonce: string;
        deadline: string;
    };
};
export interface Signature {
    v: number;
    r: Buffer | string;
    s: Buffer | string;
}
export declare const permitCustomSignature: (wallet: Wallet, name: string, verifyingContract: string, spender: string, amount: BigNumber, nonce: number, deadline: BigNumberish) => Promise<Signature>;
export declare const permitSignature: (owner: Wallet, tokenAddress: string, spender: Addressable, amount: BigNumberish, deadline: BigNumberish) => Promise<Signature>;
//# sourceMappingURL=Permit.d.ts.map