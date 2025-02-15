import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../../../common";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
export interface ProxyAdminInterface extends utils.Interface {
    functions: {
        "changeProxyAdmin(address,address)": FunctionFragment;
        "getProxyAdmin(address)": FunctionFragment;
        "getProxyImplementation(address)": FunctionFragment;
        "owner()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "upgrade(address,address)": FunctionFragment;
        "upgradeAndCall(address,address,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "changeProxyAdmin" | "getProxyAdmin" | "getProxyImplementation" | "owner" | "renounceOwnership" | "transferOwnership" | "upgrade" | "upgradeAndCall"): FunctionFragment;
    encodeFunctionData(functionFragment: "changeProxyAdmin", values: [string, string]): string;
    encodeFunctionData(functionFragment: "getProxyAdmin", values: [string]): string;
    encodeFunctionData(functionFragment: "getProxyImplementation", values: [string]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    encodeFunctionData(functionFragment: "upgrade", values: [string, string]): string;
    encodeFunctionData(functionFragment: "upgradeAndCall", values: [string, string, BytesLike]): string;
    decodeFunctionResult(functionFragment: "changeProxyAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProxyAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProxyImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgrade", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeAndCall", data: BytesLike): Result;
    events: {
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface ProxyAdmin extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ProxyAdminInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        changeProxyAdmin(proxy: string, newAdmin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        getProxyAdmin(proxy: string, overrides?: CallOverrides): Promise<[string]>;
        getProxyImplementation(proxy: string, overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        upgrade(proxy: string, implementation: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        upgradeAndCall(proxy: string, implementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
    };
    changeProxyAdmin(proxy: string, newAdmin: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    getProxyAdmin(proxy: string, overrides?: CallOverrides): Promise<string>;
    getProxyImplementation(proxy: string, overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    upgrade(proxy: string, implementation: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    upgradeAndCall(proxy: string, implementation: string, data: BytesLike, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    callStatic: {
        changeProxyAdmin(proxy: string, newAdmin: string, overrides?: CallOverrides): Promise<void>;
        getProxyAdmin(proxy: string, overrides?: CallOverrides): Promise<string>;
        getProxyImplementation(proxy: string, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
        upgrade(proxy: string, implementation: string, overrides?: CallOverrides): Promise<void>;
        upgradeAndCall(proxy: string, implementation: string, data: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        changeProxyAdmin(proxy: string, newAdmin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        getProxyAdmin(proxy: string, overrides?: CallOverrides): Promise<BigNumber>;
        getProxyImplementation(proxy: string, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        upgrade(proxy: string, implementation: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        upgradeAndCall(proxy: string, implementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        changeProxyAdmin(proxy: string, newAdmin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        getProxyAdmin(proxy: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getProxyImplementation(proxy: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        upgrade(proxy: string, implementation: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        upgradeAndCall(proxy: string, implementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ProxyAdmin.d.ts.map