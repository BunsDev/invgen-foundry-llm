import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../../common";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
export declare namespace ICarbonVortex {
    type PriceStruct = {
        sourceAmount: BigNumberish;
        targetAmount: BigNumberish;
    };
    type PriceStructOutput = [BigNumber, BigNumber] & {
        sourceAmount: BigNumber;
        targetAmount: BigNumber;
    };
    type SaleAmountStruct = {
        initial: BigNumberish;
        current: BigNumberish;
    };
    type SaleAmountStructOutput = [BigNumber, BigNumber] & {
        initial: BigNumber;
        current: BigNumber;
    };
}
export interface ICarbonVortexInterface extends utils.Interface {
    functions: {
        "amountAvailableForTrading(address)": FunctionFragment;
        "availableTokens(address)": FunctionFragment;
        "execute(address[])": FunctionFragment;
        "expectedTradeInput(address,uint128)": FunctionFragment;
        "expectedTradeReturn(address,uint128)": FunctionFragment;
        "finalTargetToken()": FunctionFragment;
        "getRoleAdmin(bytes32)": FunctionFragment;
        "getRoleMember(bytes32,uint256)": FunctionFragment;
        "getRoleMemberCount(bytes32)": FunctionFragment;
        "grantRole(bytes32,address)": FunctionFragment;
        "hasRole(bytes32,address)": FunctionFragment;
        "minTargetTokenSaleAmount()": FunctionFragment;
        "minTokenSaleAmount(address)": FunctionFragment;
        "minTokenSaleAmountMultiplier()": FunctionFragment;
        "pairDisabled(address)": FunctionFragment;
        "priceDecayHalfLife()": FunctionFragment;
        "priceResetMultiplier()": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "rewardsPPM()": FunctionFragment;
        "targetToken()": FunctionFragment;
        "targetTokenPriceDecayHalfLife()": FunctionFragment;
        "targetTokenPriceDecayHalfLifeOnReset()": FunctionFragment;
        "targetTokenSaleAmount()": FunctionFragment;
        "tokenPrice(address)": FunctionFragment;
        "totalCollected()": FunctionFragment;
        "trade(address,uint128)": FunctionFragment;
        "tradingEnabled(address)": FunctionFragment;
        "version()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "amountAvailableForTrading" | "availableTokens" | "execute" | "expectedTradeInput" | "expectedTradeReturn" | "finalTargetToken" | "getRoleAdmin" | "getRoleMember" | "getRoleMemberCount" | "grantRole" | "hasRole" | "minTargetTokenSaleAmount" | "minTokenSaleAmount" | "minTokenSaleAmountMultiplier" | "pairDisabled" | "priceDecayHalfLife" | "priceResetMultiplier" | "renounceRole" | "revokeRole" | "rewardsPPM" | "targetToken" | "targetTokenPriceDecayHalfLife" | "targetTokenPriceDecayHalfLifeOnReset" | "targetTokenSaleAmount" | "tokenPrice" | "totalCollected" | "trade" | "tradingEnabled" | "version"): FunctionFragment;
    encodeFunctionData(functionFragment: "amountAvailableForTrading", values: [string]): string;
    encodeFunctionData(functionFragment: "availableTokens", values: [string]): string;
    encodeFunctionData(functionFragment: "execute", values: [string[]]): string;
    encodeFunctionData(functionFragment: "expectedTradeInput", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "expectedTradeReturn", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "finalTargetToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getRoleMember", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleMemberCount", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "minTargetTokenSaleAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "minTokenSaleAmount", values: [string]): string;
    encodeFunctionData(functionFragment: "minTokenSaleAmountMultiplier", values?: undefined): string;
    encodeFunctionData(functionFragment: "pairDisabled", values: [string]): string;
    encodeFunctionData(functionFragment: "priceDecayHalfLife", values?: undefined): string;
    encodeFunctionData(functionFragment: "priceResetMultiplier", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "rewardsPPM", values?: undefined): string;
    encodeFunctionData(functionFragment: "targetToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "targetTokenPriceDecayHalfLife", values?: undefined): string;
    encodeFunctionData(functionFragment: "targetTokenPriceDecayHalfLifeOnReset", values?: undefined): string;
    encodeFunctionData(functionFragment: "targetTokenSaleAmount", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenPrice", values: [string]): string;
    encodeFunctionData(functionFragment: "totalCollected", values?: undefined): string;
    encodeFunctionData(functionFragment: "trade", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "tradingEnabled", values: [string]): string;
    encodeFunctionData(functionFragment: "version", values?: undefined): string;
    decodeFunctionResult(functionFragment: "amountAvailableForTrading", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "availableTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "expectedTradeInput", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "expectedTradeReturn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalTargetToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMember", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMemberCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minTargetTokenSaleAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minTokenSaleAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minTokenSaleAmountMultiplier", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pairDisabled", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceDecayHalfLife", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceResetMultiplier", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rewardsPPM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "targetToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "targetTokenPriceDecayHalfLife", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "targetTokenPriceDecayHalfLifeOnReset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "targetTokenSaleAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalCollected", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "trade", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradingEnabled", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
    events: {
        "FundsWithdrawn(address[],address,address,uint256[])": EventFragment;
        "MaxTargetTokenSaleAmountUpdated(uint128,uint128)": EventFragment;
        "MinTokenSaleAmountMultiplierUpdated(uint32,uint32)": EventFragment;
        "MinTokenSaleAmountUpdated(address,uint128,uint128)": EventFragment;
        "PairDisabledStatusUpdated(address,bool,bool)": EventFragment;
        "PriceDecayHalfLifeUpdated(uint32,uint32)": EventFragment;
        "PriceResetMultiplierUpdated(uint32,uint32)": EventFragment;
        "PriceUpdated(address,(uint128,uint128))": EventFragment;
        "RewardsUpdated(uint32,uint32)": EventFragment;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
        "TargetTokenPriceDecayHalfLifeOnResetUpdated(uint32,uint32)": EventFragment;
        "TargetTokenPriceDecayHalfLifeUpdated(uint32,uint32)": EventFragment;
        "TokenTraded(address,address,uint128,uint128)": EventFragment;
        "TradingReset(address,(uint128,uint128))": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "FundsWithdrawn"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MaxTargetTokenSaleAmountUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MinTokenSaleAmountMultiplierUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MinTokenSaleAmountUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PairDisabledStatusUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PriceDecayHalfLifeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PriceResetMultiplierUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PriceUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RewardsUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TargetTokenPriceDecayHalfLifeOnResetUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TargetTokenPriceDecayHalfLifeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenTraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TradingReset"): EventFragment;
}
export interface FundsWithdrawnEventObject {
    tokens: string[];
    caller: string;
    target: string;
    amounts: BigNumber[];
}
export type FundsWithdrawnEvent = TypedEvent<[
    string[],
    string,
    string,
    BigNumber[]
], FundsWithdrawnEventObject>;
export type FundsWithdrawnEventFilter = TypedEventFilter<FundsWithdrawnEvent>;
export interface MaxTargetTokenSaleAmountUpdatedEventObject {
    prevTargetTokenSaleAmount: BigNumber;
    newTargetTokenSaleAmount: BigNumber;
}
export type MaxTargetTokenSaleAmountUpdatedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], MaxTargetTokenSaleAmountUpdatedEventObject>;
export type MaxTargetTokenSaleAmountUpdatedEventFilter = TypedEventFilter<MaxTargetTokenSaleAmountUpdatedEvent>;
export interface MinTokenSaleAmountMultiplierUpdatedEventObject {
    prevMinTokenSaleAmountMultiplier: number;
    newMinTokenSaleAmountMultiplier: number;
}
export type MinTokenSaleAmountMultiplierUpdatedEvent = TypedEvent<[
    number,
    number
], MinTokenSaleAmountMultiplierUpdatedEventObject>;
export type MinTokenSaleAmountMultiplierUpdatedEventFilter = TypedEventFilter<MinTokenSaleAmountMultiplierUpdatedEvent>;
export interface MinTokenSaleAmountUpdatedEventObject {
    token: string;
    prevMinTokenSaleAmount: BigNumber;
    newMinTokenSaleAmount: BigNumber;
}
export type MinTokenSaleAmountUpdatedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber
], MinTokenSaleAmountUpdatedEventObject>;
export type MinTokenSaleAmountUpdatedEventFilter = TypedEventFilter<MinTokenSaleAmountUpdatedEvent>;
export interface PairDisabledStatusUpdatedEventObject {
    token: string;
    prevStatus: boolean;
    newStatus: boolean;
}
export type PairDisabledStatusUpdatedEvent = TypedEvent<[
    string,
    boolean,
    boolean
], PairDisabledStatusUpdatedEventObject>;
export type PairDisabledStatusUpdatedEventFilter = TypedEventFilter<PairDisabledStatusUpdatedEvent>;
export interface PriceDecayHalfLifeUpdatedEventObject {
    prevPriceDecayHalfLife: number;
    newPriceDecayHalfLife: number;
}
export type PriceDecayHalfLifeUpdatedEvent = TypedEvent<[
    number,
    number
], PriceDecayHalfLifeUpdatedEventObject>;
export type PriceDecayHalfLifeUpdatedEventFilter = TypedEventFilter<PriceDecayHalfLifeUpdatedEvent>;
export interface PriceResetMultiplierUpdatedEventObject {
    prevPriceResetMultiplier: number;
    newPriceResetMultiplier: number;
}
export type PriceResetMultiplierUpdatedEvent = TypedEvent<[
    number,
    number
], PriceResetMultiplierUpdatedEventObject>;
export type PriceResetMultiplierUpdatedEventFilter = TypedEventFilter<PriceResetMultiplierUpdatedEvent>;
export interface PriceUpdatedEventObject {
    token: string;
    price: ICarbonVortex.PriceStructOutput;
}
export type PriceUpdatedEvent = TypedEvent<[
    string,
    ICarbonVortex.PriceStructOutput
], PriceUpdatedEventObject>;
export type PriceUpdatedEventFilter = TypedEventFilter<PriceUpdatedEvent>;
export interface RewardsUpdatedEventObject {
    prevRewardsPPM: number;
    newRewardsPPM: number;
}
export type RewardsUpdatedEvent = TypedEvent<[
    number,
    number
], RewardsUpdatedEventObject>;
export type RewardsUpdatedEventFilter = TypedEventFilter<RewardsUpdatedEvent>;
export interface RoleAdminChangedEventObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], RoleAdminChangedEventObject>;
export type RoleAdminChangedEventFilter = TypedEventFilter<RoleAdminChangedEvent>;
export interface RoleGrantedEventObject {
    role: string;
    account: string;
    sender: string;
}
export type RoleGrantedEvent = TypedEvent<[
    string,
    string,
    string
], RoleGrantedEventObject>;
export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;
export interface RoleRevokedEventObject {
    role: string;
    account: string;
    sender: string;
}
export type RoleRevokedEvent = TypedEvent<[
    string,
    string,
    string
], RoleRevokedEventObject>;
export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;
export interface TargetTokenPriceDecayHalfLifeOnResetUpdatedEventObject {
    prevPriceDecayHalfLife: number;
    newPriceDecayHalfLife: number;
}
export type TargetTokenPriceDecayHalfLifeOnResetUpdatedEvent = TypedEvent<[
    number,
    number
], TargetTokenPriceDecayHalfLifeOnResetUpdatedEventObject>;
export type TargetTokenPriceDecayHalfLifeOnResetUpdatedEventFilter = TypedEventFilter<TargetTokenPriceDecayHalfLifeOnResetUpdatedEvent>;
export interface TargetTokenPriceDecayHalfLifeUpdatedEventObject {
    prevPriceDecayHalfLife: number;
    newPriceDecayHalfLife: number;
}
export type TargetTokenPriceDecayHalfLifeUpdatedEvent = TypedEvent<[
    number,
    number
], TargetTokenPriceDecayHalfLifeUpdatedEventObject>;
export type TargetTokenPriceDecayHalfLifeUpdatedEventFilter = TypedEventFilter<TargetTokenPriceDecayHalfLifeUpdatedEvent>;
export interface TokenTradedEventObject {
    caller: string;
    token: string;
    sourceAmount: BigNumber;
    targetAmount: BigNumber;
}
export type TokenTradedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber
], TokenTradedEventObject>;
export type TokenTradedEventFilter = TypedEventFilter<TokenTradedEvent>;
export interface TradingResetEventObject {
    token: string;
    price: ICarbonVortex.PriceStructOutput;
}
export type TradingResetEvent = TypedEvent<[
    string,
    ICarbonVortex.PriceStructOutput
], TradingResetEventObject>;
export type TradingResetEventFilter = TypedEventFilter<TradingResetEvent>;
export interface ICarbonVortex extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ICarbonVortexInterface;
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
        amountAvailableForTrading(token: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        availableTokens(token: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        execute(tokens: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        expectedTradeInput(token: string, targetAmount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        expectedTradeReturn(token: string, sourceAmount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        finalTargetToken(overrides?: CallOverrides): Promise<[string]>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<[boolean]>;
        minTargetTokenSaleAmount(overrides?: CallOverrides): Promise<[BigNumber]>;
        minTokenSaleAmount(token: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        minTokenSaleAmountMultiplier(overrides?: CallOverrides): Promise<[number]>;
        pairDisabled(token: string, overrides?: CallOverrides): Promise<[boolean]>;
        priceDecayHalfLife(overrides?: CallOverrides): Promise<[number]>;
        priceResetMultiplier(overrides?: CallOverrides): Promise<[number]>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        rewardsPPM(overrides?: CallOverrides): Promise<[number]>;
        targetToken(overrides?: CallOverrides): Promise<[string]>;
        targetTokenPriceDecayHalfLife(overrides?: CallOverrides): Promise<[number]>;
        targetTokenPriceDecayHalfLifeOnReset(overrides?: CallOverrides): Promise<[number]>;
        targetTokenSaleAmount(overrides?: CallOverrides): Promise<[ICarbonVortex.SaleAmountStructOutput]>;
        tokenPrice(token: string, overrides?: CallOverrides): Promise<[ICarbonVortex.PriceStructOutput]>;
        totalCollected(overrides?: CallOverrides): Promise<[BigNumber]>;
        trade(token: string, targetAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        tradingEnabled(token: string, overrides?: CallOverrides): Promise<[boolean]>;
        version(overrides?: CallOverrides): Promise<[number]>;
    };
    amountAvailableForTrading(token: string, overrides?: CallOverrides): Promise<BigNumber>;
    availableTokens(token: string, overrides?: CallOverrides): Promise<BigNumber>;
    execute(tokens: string[], overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    expectedTradeInput(token: string, targetAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    expectedTradeReturn(token: string, sourceAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    finalTargetToken(overrides?: CallOverrides): Promise<string>;
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
    getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>;
    getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    grantRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
    minTargetTokenSaleAmount(overrides?: CallOverrides): Promise<BigNumber>;
    minTokenSaleAmount(token: string, overrides?: CallOverrides): Promise<BigNumber>;
    minTokenSaleAmountMultiplier(overrides?: CallOverrides): Promise<number>;
    pairDisabled(token: string, overrides?: CallOverrides): Promise<boolean>;
    priceDecayHalfLife(overrides?: CallOverrides): Promise<number>;
    priceResetMultiplier(overrides?: CallOverrides): Promise<number>;
    renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    rewardsPPM(overrides?: CallOverrides): Promise<number>;
    targetToken(overrides?: CallOverrides): Promise<string>;
    targetTokenPriceDecayHalfLife(overrides?: CallOverrides): Promise<number>;
    targetTokenPriceDecayHalfLifeOnReset(overrides?: CallOverrides): Promise<number>;
    targetTokenSaleAmount(overrides?: CallOverrides): Promise<ICarbonVortex.SaleAmountStructOutput>;
    tokenPrice(token: string, overrides?: CallOverrides): Promise<ICarbonVortex.PriceStructOutput>;
    totalCollected(overrides?: CallOverrides): Promise<BigNumber>;
    trade(token: string, targetAmount: BigNumberish, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    tradingEnabled(token: string, overrides?: CallOverrides): Promise<boolean>;
    version(overrides?: CallOverrides): Promise<number>;
    callStatic: {
        amountAvailableForTrading(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        availableTokens(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        execute(tokens: string[], overrides?: CallOverrides): Promise<void>;
        expectedTradeInput(token: string, targetAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        expectedTradeReturn(token: string, sourceAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        finalTargetToken(overrides?: CallOverrides): Promise<string>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
        minTargetTokenSaleAmount(overrides?: CallOverrides): Promise<BigNumber>;
        minTokenSaleAmount(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        minTokenSaleAmountMultiplier(overrides?: CallOverrides): Promise<number>;
        pairDisabled(token: string, overrides?: CallOverrides): Promise<boolean>;
        priceDecayHalfLife(overrides?: CallOverrides): Promise<number>;
        priceResetMultiplier(overrides?: CallOverrides): Promise<number>;
        renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        rewardsPPM(overrides?: CallOverrides): Promise<number>;
        targetToken(overrides?: CallOverrides): Promise<string>;
        targetTokenPriceDecayHalfLife(overrides?: CallOverrides): Promise<number>;
        targetTokenPriceDecayHalfLifeOnReset(overrides?: CallOverrides): Promise<number>;
        targetTokenSaleAmount(overrides?: CallOverrides): Promise<ICarbonVortex.SaleAmountStructOutput>;
        tokenPrice(token: string, overrides?: CallOverrides): Promise<ICarbonVortex.PriceStructOutput>;
        totalCollected(overrides?: CallOverrides): Promise<BigNumber>;
        trade(token: string, targetAmount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        tradingEnabled(token: string, overrides?: CallOverrides): Promise<boolean>;
        version(overrides?: CallOverrides): Promise<number>;
    };
    filters: {
        "FundsWithdrawn(address[],address,address,uint256[])"(tokens?: string[] | null, caller?: string | null, target?: string | null, amounts?: null): FundsWithdrawnEventFilter;
        FundsWithdrawn(tokens?: string[] | null, caller?: string | null, target?: string | null, amounts?: null): FundsWithdrawnEventFilter;
        "MaxTargetTokenSaleAmountUpdated(uint128,uint128)"(prevTargetTokenSaleAmount?: null, newTargetTokenSaleAmount?: null): MaxTargetTokenSaleAmountUpdatedEventFilter;
        MaxTargetTokenSaleAmountUpdated(prevTargetTokenSaleAmount?: null, newTargetTokenSaleAmount?: null): MaxTargetTokenSaleAmountUpdatedEventFilter;
        "MinTokenSaleAmountMultiplierUpdated(uint32,uint32)"(prevMinTokenSaleAmountMultiplier?: null, newMinTokenSaleAmountMultiplier?: null): MinTokenSaleAmountMultiplierUpdatedEventFilter;
        MinTokenSaleAmountMultiplierUpdated(prevMinTokenSaleAmountMultiplier?: null, newMinTokenSaleAmountMultiplier?: null): MinTokenSaleAmountMultiplierUpdatedEventFilter;
        "MinTokenSaleAmountUpdated(address,uint128,uint128)"(token?: string | null, prevMinTokenSaleAmount?: null, newMinTokenSaleAmount?: null): MinTokenSaleAmountUpdatedEventFilter;
        MinTokenSaleAmountUpdated(token?: string | null, prevMinTokenSaleAmount?: null, newMinTokenSaleAmount?: null): MinTokenSaleAmountUpdatedEventFilter;
        "PairDisabledStatusUpdated(address,bool,bool)"(token?: string | null, prevStatus?: null, newStatus?: null): PairDisabledStatusUpdatedEventFilter;
        PairDisabledStatusUpdated(token?: string | null, prevStatus?: null, newStatus?: null): PairDisabledStatusUpdatedEventFilter;
        "PriceDecayHalfLifeUpdated(uint32,uint32)"(prevPriceDecayHalfLife?: null, newPriceDecayHalfLife?: null): PriceDecayHalfLifeUpdatedEventFilter;
        PriceDecayHalfLifeUpdated(prevPriceDecayHalfLife?: null, newPriceDecayHalfLife?: null): PriceDecayHalfLifeUpdatedEventFilter;
        "PriceResetMultiplierUpdated(uint32,uint32)"(prevPriceResetMultiplier?: null, newPriceResetMultiplier?: null): PriceResetMultiplierUpdatedEventFilter;
        PriceResetMultiplierUpdated(prevPriceResetMultiplier?: null, newPriceResetMultiplier?: null): PriceResetMultiplierUpdatedEventFilter;
        "PriceUpdated(address,(uint128,uint128))"(token?: string | null, price?: null): PriceUpdatedEventFilter;
        PriceUpdated(token?: string | null, price?: null): PriceUpdatedEventFilter;
        "RewardsUpdated(uint32,uint32)"(prevRewardsPPM?: null, newRewardsPPM?: null): RewardsUpdatedEventFilter;
        RewardsUpdated(prevRewardsPPM?: null, newRewardsPPM?: null): RewardsUpdatedEventFilter;
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        RoleGranted(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        RoleRevoked(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        "TargetTokenPriceDecayHalfLifeOnResetUpdated(uint32,uint32)"(prevPriceDecayHalfLife?: null, newPriceDecayHalfLife?: null): TargetTokenPriceDecayHalfLifeOnResetUpdatedEventFilter;
        TargetTokenPriceDecayHalfLifeOnResetUpdated(prevPriceDecayHalfLife?: null, newPriceDecayHalfLife?: null): TargetTokenPriceDecayHalfLifeOnResetUpdatedEventFilter;
        "TargetTokenPriceDecayHalfLifeUpdated(uint32,uint32)"(prevPriceDecayHalfLife?: null, newPriceDecayHalfLife?: null): TargetTokenPriceDecayHalfLifeUpdatedEventFilter;
        TargetTokenPriceDecayHalfLifeUpdated(prevPriceDecayHalfLife?: null, newPriceDecayHalfLife?: null): TargetTokenPriceDecayHalfLifeUpdatedEventFilter;
        "TokenTraded(address,address,uint128,uint128)"(caller?: string | null, token?: string | null, sourceAmount?: null, targetAmount?: null): TokenTradedEventFilter;
        TokenTraded(caller?: string | null, token?: string | null, sourceAmount?: null, targetAmount?: null): TokenTradedEventFilter;
        "TradingReset(address,(uint128,uint128))"(token?: string | null, price?: null): TradingResetEventFilter;
        TradingReset(token?: string | null, price?: null): TradingResetEventFilter;
    };
    estimateGas: {
        amountAvailableForTrading(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        availableTokens(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        execute(tokens: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        expectedTradeInput(token: string, targetAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        expectedTradeReturn(token: string, sourceAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        finalTargetToken(overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<BigNumber>;
        minTargetTokenSaleAmount(overrides?: CallOverrides): Promise<BigNumber>;
        minTokenSaleAmount(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        minTokenSaleAmountMultiplier(overrides?: CallOverrides): Promise<BigNumber>;
        pairDisabled(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        priceDecayHalfLife(overrides?: CallOverrides): Promise<BigNumber>;
        priceResetMultiplier(overrides?: CallOverrides): Promise<BigNumber>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        rewardsPPM(overrides?: CallOverrides): Promise<BigNumber>;
        targetToken(overrides?: CallOverrides): Promise<BigNumber>;
        targetTokenPriceDecayHalfLife(overrides?: CallOverrides): Promise<BigNumber>;
        targetTokenPriceDecayHalfLifeOnReset(overrides?: CallOverrides): Promise<BigNumber>;
        targetTokenSaleAmount(overrides?: CallOverrides): Promise<BigNumber>;
        tokenPrice(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        totalCollected(overrides?: CallOverrides): Promise<BigNumber>;
        trade(token: string, targetAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
        tradingEnabled(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        version(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        amountAvailableForTrading(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        availableTokens(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        execute(tokens: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        expectedTradeInput(token: string, targetAmount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        expectedTradeReturn(token: string, sourceAmount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        finalTargetToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        minTargetTokenSaleAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        minTokenSaleAmount(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        minTokenSaleAmountMultiplier(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pairDisabled(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        priceDecayHalfLife(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        priceResetMultiplier(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        rewardsPPM(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        targetToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        targetTokenPriceDecayHalfLife(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        targetTokenPriceDecayHalfLifeOnReset(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        targetTokenSaleAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenPrice(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalCollected(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        trade(token: string, targetAmount: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        tradingEnabled(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ICarbonVortex.d.ts.map