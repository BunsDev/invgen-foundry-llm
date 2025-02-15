import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, Signer, utils } from "ethers";
export interface PairsInterface extends utils.Interface {
    functions: {};
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
export interface Pairs extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: PairsInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {};
    callStatic: {};
    filters: {
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "PairCreated(uint128,address,address)"(pairId?: BigNumberish | null, token0?: string | null, token1?: string | null): PairCreatedEventFilter;
        PairCreated(pairId?: BigNumberish | null, token0?: string | null, token1?: string | null): PairCreatedEventFilter;
    };
    estimateGas: {};
    populateTransaction: {};
}
//# sourceMappingURL=Pairs.d.ts.map