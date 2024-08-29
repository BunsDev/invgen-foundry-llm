import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, Signer, utils } from "ethers";
export type OrderStruct = {
    y: BigNumberish;
    z: BigNumberish;
    A: BigNumberish;
    B: BigNumberish;
};
export type OrderStructOutput = [BigNumber, BigNumber, BigNumber, BigNumber] & {
    y: BigNumber;
    z: BigNumber;
    A: BigNumber;
    B: BigNumber;
};
export interface StrategiesInterface extends utils.Interface {
    functions: {};
    events: {
        "FeesWithdrawn(address,address,uint256,address)": EventFragment;
        "Initialized(uint8)": EventFragment;
        "PairTradingFeePPMUpdated(address,address,uint32,uint32)": EventFragment;
        "StrategyCreated(uint256,address,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64))": EventFragment;
        "StrategyDeleted(uint256,address,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64))": EventFragment;
        "StrategyUpdated(uint256,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64),uint8)": EventFragment;
        "TokensTraded(address,address,address,uint256,uint256,uint128,bool)": EventFragment;
        "TradingFeePPMUpdated(uint32,uint32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "FeesWithdrawn"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PairTradingFeePPMUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "StrategyCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "StrategyDeleted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "StrategyUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokensTraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TradingFeePPMUpdated"): EventFragment;
}
export interface FeesWithdrawnEventObject {
    token: string;
    recipient: string;
    amount: BigNumber;
    sender: string;
}
export type FeesWithdrawnEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    string
], FeesWithdrawnEventObject>;
export type FeesWithdrawnEventFilter = TypedEventFilter<FeesWithdrawnEvent>;
export interface InitializedEventObject {
    version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;
export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface PairTradingFeePPMUpdatedEventObject {
    token0: string;
    token1: string;
    prevFeePPM: number;
    newFeePPM: number;
}
export type PairTradingFeePPMUpdatedEvent = TypedEvent<[
    string,
    string,
    number,
    number
], PairTradingFeePPMUpdatedEventObject>;
export type PairTradingFeePPMUpdatedEventFilter = TypedEventFilter<PairTradingFeePPMUpdatedEvent>;
export interface StrategyCreatedEventObject {
    id: BigNumber;
    owner: string;
    token0: string;
    token1: string;
    order0: OrderStructOutput;
    order1: OrderStructOutput;
}
export type StrategyCreatedEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    string,
    OrderStructOutput,
    OrderStructOutput
], StrategyCreatedEventObject>;
export type StrategyCreatedEventFilter = TypedEventFilter<StrategyCreatedEvent>;
export interface StrategyDeletedEventObject {
    id: BigNumber;
    owner: string;
    token0: string;
    token1: string;
    order0: OrderStructOutput;
    order1: OrderStructOutput;
}
export type StrategyDeletedEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    string,
    OrderStructOutput,
    OrderStructOutput
], StrategyDeletedEventObject>;
export type StrategyDeletedEventFilter = TypedEventFilter<StrategyDeletedEvent>;
export interface StrategyUpdatedEventObject {
    id: BigNumber;
    token0: string;
    token1: string;
    order0: OrderStructOutput;
    order1: OrderStructOutput;
    reason: number;
}
export type StrategyUpdatedEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    OrderStructOutput,
    OrderStructOutput,
    number
], StrategyUpdatedEventObject>;
export type StrategyUpdatedEventFilter = TypedEventFilter<StrategyUpdatedEvent>;
export interface TokensTradedEventObject {
    trader: string;
    sourceToken: string;
    targetToken: string;
    sourceAmount: BigNumber;
    targetAmount: BigNumber;
    tradingFeeAmount: BigNumber;
    byTargetAmount: boolean;
}
export type TokensTradedEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
], TokensTradedEventObject>;
export type TokensTradedEventFilter = TypedEventFilter<TokensTradedEvent>;
export interface TradingFeePPMUpdatedEventObject {
    prevFeePPM: number;
    newFeePPM: number;
}
export type TradingFeePPMUpdatedEvent = TypedEvent<[
    number,
    number
], TradingFeePPMUpdatedEventObject>;
export type TradingFeePPMUpdatedEventFilter = TypedEventFilter<TradingFeePPMUpdatedEvent>;
export interface Strategies extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: StrategiesInterface;
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
        "FeesWithdrawn(address,address,uint256,address)"(token?: string | null, recipient?: string | null, amount?: BigNumberish | null, sender?: null): FeesWithdrawnEventFilter;
        FeesWithdrawn(token?: string | null, recipient?: string | null, amount?: BigNumberish | null, sender?: null): FeesWithdrawnEventFilter;
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "PairTradingFeePPMUpdated(address,address,uint32,uint32)"(token0?: string | null, token1?: string | null, prevFeePPM?: null, newFeePPM?: null): PairTradingFeePPMUpdatedEventFilter;
        PairTradingFeePPMUpdated(token0?: string | null, token1?: string | null, prevFeePPM?: null, newFeePPM?: null): PairTradingFeePPMUpdatedEventFilter;
        "StrategyCreated(uint256,address,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64))"(id?: null, owner?: string | null, token0?: string | null, token1?: string | null, order0?: null, order1?: null): StrategyCreatedEventFilter;
        StrategyCreated(id?: null, owner?: string | null, token0?: string | null, token1?: string | null, order0?: null, order1?: null): StrategyCreatedEventFilter;
        "StrategyDeleted(uint256,address,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64))"(id?: null, owner?: string | null, token0?: string | null, token1?: string | null, order0?: null, order1?: null): StrategyDeletedEventFilter;
        StrategyDeleted(id?: null, owner?: string | null, token0?: string | null, token1?: string | null, order0?: null, order1?: null): StrategyDeletedEventFilter;
        "StrategyUpdated(uint256,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64),uint8)"(id?: BigNumberish | null, token0?: string | null, token1?: string | null, order0?: null, order1?: null, reason?: null): StrategyUpdatedEventFilter;
        StrategyUpdated(id?: BigNumberish | null, token0?: string | null, token1?: string | null, order0?: null, order1?: null, reason?: null): StrategyUpdatedEventFilter;
        "TokensTraded(address,address,address,uint256,uint256,uint128,bool)"(trader?: string | null, sourceToken?: string | null, targetToken?: string | null, sourceAmount?: null, targetAmount?: null, tradingFeeAmount?: null, byTargetAmount?: null): TokensTradedEventFilter;
        TokensTraded(trader?: string | null, sourceToken?: string | null, targetToken?: string | null, sourceAmount?: null, targetAmount?: null, tradingFeeAmount?: null, byTargetAmount?: null): TokensTradedEventFilter;
        "TradingFeePPMUpdated(uint32,uint32)"(prevFeePPM?: null, newFeePPM?: null): TradingFeePPMUpdatedEventFilter;
        TradingFeePPMUpdated(prevFeePPM?: null, newFeePPM?: null): TradingFeePPMUpdatedEventFilter;
    };
    estimateGas: {};
    populateTransaction: {};
}
//# sourceMappingURL=Strategies.d.ts.map