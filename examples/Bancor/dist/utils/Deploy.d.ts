import { ArtifactData } from '../components/ContractBuilder';
import { CarbonController, CarbonPOL, CarbonVortex, ProxyAdmin, Voucher } from '../components/Contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, BigNumberish } from 'ethers';
import { Address, DeployFunction } from 'hardhat-deploy/types';
import { Suite } from 'mocha';
import { RoleIds } from './Roles';
interface Options {
    skip?: () => boolean;
    beforeDeployments?: () => Promise<void>;
}
declare enum NewInstanceName {
    CarbonController = "CarbonController",
    ProxyAdmin = "ProxyAdmin",
    Voucher = "Voucher",
    CarbonVortex = "CarbonVortex",
    CarbonPOL = "CarbonPOL"
}
export declare const LegacyInstanceName: {};
export declare const InstanceName: {
    CarbonController: NewInstanceName.CarbonController;
    ProxyAdmin: NewInstanceName.ProxyAdmin;
    Voucher: NewInstanceName.Voucher;
    CarbonVortex: NewInstanceName.CarbonVortex;
    CarbonPOL: NewInstanceName.CarbonPOL;
};
export type InstanceName = NewInstanceName;
export declare const DeployedContracts: {
    CarbonController: {
        deployed: () => Promise<CarbonController>;
    };
    ProxyAdmin: {
        deployed: () => Promise<ProxyAdmin>;
    };
    Voucher: {
        deployed: () => Promise<Voucher>;
    };
    CarbonVortex: {
        deployed: () => Promise<CarbonVortex>;
    };
    CarbonPOL: {
        deployed: () => Promise<CarbonPOL>;
    };
};
export declare const isTenderly: () => boolean;
export declare const isLive: () => boolean;
export declare const getNamedSigners: () => Promise<Record<string, SignerWithAddress>>;
export declare const fundAccount: (account: string | SignerWithAddress, amount?: BigNumberish) => Promise<import("@ethersproject/abstract-provider").TransactionResponse | undefined>;
interface ProxyOptions {
    skipInitialization?: boolean;
    args?: any[];
}
interface BaseDeployOptions {
    name: InstanceName;
    contract?: string;
    args?: any[];
    from: string;
    value?: BigNumber;
    contractArtifactData?: ArtifactData;
    legacy?: boolean;
}
interface DeployOptions extends BaseDeployOptions {
    proxy?: ProxyOptions;
}
interface TypedParam {
    name: string;
    type: string;
    value: any;
}
export declare const deploy: (options: DeployOptions) => Promise<string>;
export declare const deployProxy: (options: DeployOptions, proxy?: ProxyOptions) => Promise<string>;
interface UpgradeProxyOptions extends DeployOptions {
    postUpgradeArgs?: TypedParam[];
}
export declare const upgradeProxy: (options: UpgradeProxyOptions) => Promise<string>;
interface ExecuteOptions {
    name: InstanceName;
    methodName: string;
    args?: any[];
    from: string;
    value?: BigNumber;
}
export declare const execute: (options: ExecuteOptions) => Promise<import("hardhat-deploy/dist/types").Receipt>;
interface InitializeProxyOptions {
    name: InstanceName;
    proxyName: InstanceName;
    args?: any[];
    from: string;
}
export declare const initializeProxy: (options: InitializeProxyOptions) => Promise<string>;
interface RolesOptions {
    name: InstanceName;
    id: (typeof RoleIds)[number];
    member: string;
    from: string;
}
interface RenounceRoleOptions {
    name: InstanceName;
    id: (typeof RoleIds)[number];
    from: string;
}
export declare const grantRole: (options: RolesOptions) => Promise<import("hardhat-deploy/dist/types").Receipt>;
export declare const revokeRole: (options: RolesOptions) => Promise<import("hardhat-deploy/dist/types").Receipt>;
export declare const renounceRole: (options: RenounceRoleOptions) => Promise<import("hardhat-deploy/dist/types").Receipt>;
interface Deployment {
    name: InstanceName;
    contract?: string;
    address: Address;
    proxy?: boolean;
    implementation?: Address;
    skipVerification?: boolean;
}
export declare const save: (deployment: Deployment) => Promise<void>;
export declare const deploymentTagExists: (tag: string) => boolean;
export declare const getPreviousDeploymentTag: (tag: string) => string | undefined;
export declare const getLatestDeploymentTag: () => string;
export declare const deploymentMetadata: (filename: string) => {
    id: string;
    tag: string;
    dependency: string | undefined;
};
export declare const setDeploymentMetadata: (filename: string, func: DeployFunction) => DeployFunction;
export declare const runPendingDeployments: () => Promise<{
    [name: string]: import("hardhat-deploy/dist/types").Deployment;
}>;
export declare const getNetworkNameById: (networkId: number | undefined) => string;
export declare const getInstanceNameByAddress: (address: string) => InstanceName;
export declare const describeDeployment: (filename: string, fn: (this: Suite) => void, options?: Options) => Suite | void;
export {};
//# sourceMappingURL=Deploy.d.ts.map