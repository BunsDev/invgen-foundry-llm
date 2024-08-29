import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
export interface TestReenterCarbonVortexInterface extends utils.Interface {
    functions: {
        "tryReenterCarbonVortexExecute(address[])": FunctionFragment;
        "tryReenterCarbonVortexTrade(address,uint128)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "tryReenterCarbonVortexExecute" | "tryReenterCarbonVortexTrade"): FunctionFragment;
    encodeFunctionData(functionFragment: "tryReenterCarbonVortexExecute", values: [string[]]): string;
    encodeFunctionData(functionFragment: "tryReenterCarbonVortexTrade", values: [string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "tryReenterCarbonVortexExecute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tryReenterCarbonVortexTrade", data: BytesLike): Result;
    events: {};
}
export interface TestReenterCarbonVortex extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestReenterCarbonVortexInterface;
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
        tryReenterCarbonVortexExecute(tokens: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        tryReenterCarbonVortexTrade(token: string, targetAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
    };
    tryReenterCarbonVortexExecute(tokens: string[], overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    tryReenterCarbonVortexTrade(token: string, targetAmount: BigNumberish, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    callStatic: {
        tryReenterCarbonVortexExecute(tokens: string[], overrides?: CallOverrides): Promise<void>;
        tryReenterCarbonVortexTrade(token: string, targetAmount: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        tryReenterCarbonVortexExecute(tokens: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        tryReenterCarbonVortexTrade(token: string, targetAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        tryReenterCarbonVortexExecute(tokens: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        tryReenterCarbonVortexTrade(token: string, targetAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TestReenterCarbonVortex.d.ts.map