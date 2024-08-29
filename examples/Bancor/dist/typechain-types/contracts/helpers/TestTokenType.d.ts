import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
export interface TestTokenTypeInterface extends utils.Interface {
    functions: {
        "balanceOf(address,address)": FunctionFragment;
        "decimals(address)": FunctionFragment;
        "isEqual(address,address)": FunctionFragment;
        "isNative(address)": FunctionFragment;
        "safeApprove(address,address,uint256)": FunctionFragment;
        "safeTransfer(address,address,uint256)": FunctionFragment;
        "safeTransferFrom(address,address,address,uint256)": FunctionFragment;
        "symbol(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "balanceOf" | "decimals" | "isEqual" | "isNative" | "safeApprove" | "safeTransfer" | "safeTransferFrom" | "symbol"): FunctionFragment;
    encodeFunctionData(functionFragment: "balanceOf", values: [string, string]): string;
    encodeFunctionData(functionFragment: "decimals", values: [string]): string;
    encodeFunctionData(functionFragment: "isEqual", values: [string, string]): string;
    encodeFunctionData(functionFragment: "isNative", values: [string]): string;
    encodeFunctionData(functionFragment: "safeApprove", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransfer", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom", values: [string, string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "symbol", values: [string]): string;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isEqual", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isNative", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeApprove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    events: {};
}
export interface TestTokenType extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestTokenTypeInterface;
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
        balanceOf(token: string, account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        decimals(token: string, overrides?: CallOverrides): Promise<[number]>;
        isEqual(token1: string, token2: string, overrides?: CallOverrides): Promise<[boolean]>;
        isNative(token: string, overrides?: CallOverrides): Promise<[boolean]>;
        safeApprove(token: string, spender: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        safeTransfer(token: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        safeTransferFrom(token: string, from: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        symbol(token: string, overrides?: CallOverrides): Promise<[string]>;
    };
    balanceOf(token: string, account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(token: string, overrides?: CallOverrides): Promise<number>;
    isEqual(token1: string, token2: string, overrides?: CallOverrides): Promise<boolean>;
    isNative(token: string, overrides?: CallOverrides): Promise<boolean>;
    safeApprove(token: string, spender: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    safeTransfer(token: string, to: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    safeTransferFrom(token: string, from: string, to: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    symbol(token: string, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        balanceOf(token: string, account: string, overrides?: CallOverrides): Promise<BigNumber>;
        decimals(token: string, overrides?: CallOverrides): Promise<number>;
        isEqual(token1: string, token2: string, overrides?: CallOverrides): Promise<boolean>;
        isNative(token: string, overrides?: CallOverrides): Promise<boolean>;
        safeApprove(token: string, spender: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        safeTransfer(token: string, to: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        safeTransferFrom(token: string, from: string, to: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        symbol(token: string, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        balanceOf(token: string, account: string, overrides?: CallOverrides): Promise<BigNumber>;
        decimals(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        isEqual(token1: string, token2: string, overrides?: CallOverrides): Promise<BigNumber>;
        isNative(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        safeApprove(token: string, spender: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        safeTransfer(token: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        safeTransferFrom(token: string, from: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        symbol(token: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        balanceOf(token: string, account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        decimals(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isEqual(token1: string, token2: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isNative(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        safeApprove(token: string, spender: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        safeTransfer(token: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        safeTransferFrom(token: string, from: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        symbol(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TestTokenType.d.ts.map