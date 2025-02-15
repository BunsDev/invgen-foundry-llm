import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
export type PairStruct = {
    id: BigNumberish;
    tokens: [string, string];
};
export type PairStructOutput = [BigNumber, [string, string]] & {
    id: BigNumber;
    tokens: [string, string];
};
export interface TestPairsInterface extends utils.Interface {
    functions: {
        "createPairTest(address,address)": FunctionFragment;
        "pairByIdTest(uint128)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "createPairTest" | "pairByIdTest"): FunctionFragment;
    encodeFunctionData(functionFragment: "createPairTest", values: [string, string]): string;
    encodeFunctionData(functionFragment: "pairByIdTest", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "createPairTest", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pairByIdTest", data: BytesLike): Result;
    events: {
        "Initialized(uint8)": EventFragment;
        "PairCreated(uint128,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PairCreated"): EventFragment;
}
export interface InitializedEventObject {
    version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface PairCreatedEventObject {
    pairId: BigNumber;
    token0: string;
    token1: string;
}
export type PairCreatedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], PairCreatedEventObject>;
export type PairCreatedEventFilter = TypedEventFilter<PairCreatedEvent>;
export interface TestPairs extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestPairsInterface;
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
        createPairTest(token0: string, token1: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        pairByIdTest(pairId: BigNumberish, overrides?: CallOverrides): Promise<[PairStructOutput]>;
    };
    createPairTest(token0: string, token1: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    pairByIdTest(pairId: BigNumberish, overrides?: CallOverrides): Promise<PairStructOutput>;
    callStatic: {
        createPairTest(token0: string, token1: string, overrides?: CallOverrides): Promise<PairStructOutput>;
        pairByIdTest(pairId: BigNumberish, overrides?: CallOverrides): Promise<PairStructOutput>;
    };
    filters: {
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "PairCreated(uint128,address,address)"(pairId?: BigNumberish | null, token0?: string | null, token1?: string | null): PairCreatedEventFilter;
        PairCreated(pairId?: BigNumberish | null, token0?: string | null, token1?: string | null): PairCreatedEventFilter;
    };
    estimateGas: {
        createPairTest(token0: string, token1: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        pairByIdTest(pairId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        createPairTest(token0: string, token1: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        pairByIdTest(pairId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TestPairs.d.ts.map