import { ContractFactory, Signer } from 'ethers';
import { ABI } from 'hardhat-deploy/types';
export type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer U> ? U : T extends (...args: any) => infer U ? U : any;
export type Contract<F extends ContractFactory> = AsyncReturnType<F['deploy']>;
export interface ContractBuilder<F extends ContractFactory> {
    metadata: {
        contractName: string;
        abi: ABI;
        bytecode: string;
    };
    deploy(...args: Parameters<F['deploy']>): Promise<Contract<F>>;
    attach(address: string, signer?: Signer): Promise<Contract<F>>;
}
export type FactoryConstructor<F extends ContractFactory> = {
    new (signer?: Signer): F;
    abi: unknown;
    bytecode: string;
};
export declare const deployOrAttach: <F extends ContractFactory>(contractName: string, FactoryConstructor: FactoryConstructor<F>, initialSigner?: Signer) => ContractBuilder<F>;
export declare const attachOnly: <F extends ContractFactory>(FactoryConstructor: FactoryConstructor<F>, initialSigner?: Signer) => {
    attach: (address: string, signer?: Signer) => Promise<Contract<F>>;
};
export interface ArtifactData {
    abi: ABI;
    bytecode: string;
}
//# sourceMappingURL=ContractBuilder.d.ts.map