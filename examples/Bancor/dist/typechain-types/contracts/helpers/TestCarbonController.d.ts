import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export type TradeActionStruct = {
    strategyId: BigNumberish;
    amount: BigNumberish;
};
export type TradeActionStructOutput = [BigNumber, BigNumber] & {
    strategyId: BigNumber;
    amount: BigNumber;
};
export type PairStruct = {
    id: BigNumberish;
    tokens: [string, string];
};
export type PairStructOutput = [BigNumber, [string, string]] & {
    id: BigNumber;
    tokens: [string, string];
};
export type StrategyStruct = {
    id: BigNumberish;
    owner: string;
    tokens: [string, string];
    orders: [OrderStruct, OrderStruct];
};
export type StrategyStructOutput = [
    BigNumber,
    string,
    [
        string,
        string
    ],
    [
        OrderStructOutput,
        OrderStructOutput
    ]
] & {
    id: BigNumber;
    owner: string;
    tokens: [string, string];
    orders: [OrderStructOutput, OrderStructOutput];
};
export interface TestCarbonControllerInterface extends utils.Interface {
    functions: {
        "DEFAULT_ADMIN_ROLE()": FunctionFragment;
        "accumulatedFees(address)": FunctionFragment;
        "calculateTradeSourceAmount(address,address,(uint256,uint128)[])": FunctionFragment;
        "calculateTradeTargetAmount(address,address,(uint256,uint128)[])": FunctionFragment;
        "controllerType()": FunctionFragment;
        "createPair(address,address)": FunctionFragment;
        "createStrategy(address,address,(uint128,uint128,uint64,uint64)[2])": FunctionFragment;
        "deleteStrategy(uint256)": FunctionFragment;
        "getRoleAdmin(bytes32)": FunctionFragment;
        "getRoleMember(bytes32,uint256)": FunctionFragment;
        "getRoleMemberCount(bytes32)": FunctionFragment;
        "grantRole(bytes32,address)": FunctionFragment;
        "hasRole(bytes32,address)": FunctionFragment;
        "initialize()": FunctionFragment;
        "pair(address,address)": FunctionFragment;
        "pairTradingFeePPM(address,address)": FunctionFragment;
        "pairs()": FunctionFragment;
        "postUpgrade(bytes)": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "roleAdmin()": FunctionFragment;
        "roleFeesManager()": FunctionFragment;
        "setPairTradingFeePPM(address,address,uint32)": FunctionFragment;
        "setTradingFeePPM(uint32)": FunctionFragment;
        "strategiesByPair(address,address,uint256,uint256)": FunctionFragment;
        "strategiesByPairCount(address,address)": FunctionFragment;
        "strategy(uint256)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "testAccumulatedFees(address)": FunctionFragment;
        "testSetAccumulatedFees(address,uint256)": FunctionFragment;
        "tradeBySourceAmount(address,address,(uint256,uint128)[],uint256,uint128)": FunctionFragment;
        "tradeByTargetAmount(address,address,(uint256,uint128)[],uint256,uint128)": FunctionFragment;
        "tradingFeePPM()": FunctionFragment;
        "updateStrategy(uint256,(uint128,uint128,uint64,uint64)[2],(uint128,uint128,uint64,uint64)[2])": FunctionFragment;
        "version()": FunctionFragment;
        "withdrawFees(address,uint256,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "DEFAULT_ADMIN_ROLE" | "accumulatedFees" | "calculateTradeSourceAmount" | "calculateTradeTargetAmount" | "controllerType" | "createPair" | "createStrategy" | "deleteStrategy" | "getRoleAdmin" | "getRoleMember" | "getRoleMemberCount" | "grantRole" | "hasRole" | "initialize" | "pair" | "pairTradingFeePPM" | "pairs" | "postUpgrade" | "renounceRole" | "revokeRole" | "roleAdmin" | "roleFeesManager" | "setPairTradingFeePPM" | "setTradingFeePPM" | "strategiesByPair" | "strategiesByPairCount" | "strategy" | "supportsInterface" | "testAccumulatedFees" | "testSetAccumulatedFees" | "tradeBySourceAmount" | "tradeByTargetAmount" | "tradingFeePPM" | "updateStrategy" | "version" | "withdrawFees"): FunctionFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "accumulatedFees", values: [string]): string;
    encodeFunctionData(functionFragment: "calculateTradeSourceAmount", values: [string, string, TradeActionStruct[]]): string;
    encodeFunctionData(functionFragment: "calculateTradeTargetAmount", values: [string, string, TradeActionStruct[]]): string;
    encodeFunctionData(functionFragment: "controllerType", values?: undefined): string;
    encodeFunctionData(functionFragment: "createPair", values: [string, string]): string;
    encodeFunctionData(functionFragment: "createStrategy", values: [string, string, [OrderStruct, OrderStruct]]): string;
    encodeFunctionData(functionFragment: "deleteStrategy", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getRoleMember", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleMemberCount", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "initialize", values?: undefined): string;
    encodeFunctionData(functionFragment: "pair", values: [string, string]): string;
    encodeFunctionData(functionFragment: "pairTradingFeePPM", values: [string, string]): string;
    encodeFunctionData(functionFragment: "pairs", values?: undefined): string;
    encodeFunctionData(functionFragment: "postUpgrade", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "roleAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "roleFeesManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "setPairTradingFeePPM", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setTradingFeePPM", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "strategiesByPair", values: [string, string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "strategiesByPairCount", values: [string, string]): string;
    encodeFunctionData(functionFragment: "strategy", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "testAccumulatedFees", values: [string]): string;
    encodeFunctionData(functionFragment: "testSetAccumulatedFees", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "tradeBySourceAmount", values: [string, string, TradeActionStruct[], BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "tradeByTargetAmount", values: [string, string, TradeActionStruct[], BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "tradingFeePPM", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateStrategy", values: [
        BigNumberish,
        [
            OrderStruct,
            OrderStruct
        ],
        [
            OrderStruct,
            OrderStruct
        ]
    ]): string;
    encodeFunctionData(functionFragment: "version", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawFees", values: [string, BigNumberish, string]): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accumulatedFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateTradeSourceAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateTradeTargetAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "controllerType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createPair", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMember", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMemberCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pair", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pairTradingFeePPM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pairs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "postUpgrade", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "roleFeesManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPairTradingFeePPM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTradingFeePPM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "strategiesByPair", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "strategiesByPairCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "strategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "testAccumulatedFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "testSetAccumulatedFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradeBySourceAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradeByTargetAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradingFeePPM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFees", data: BytesLike): Result;
    events: {
        "FeesWithdrawn(address,address,uint256,address)": EventFragment;
        "Initialized(uint8)": EventFragment;
        "PairCreated(uint128,address,address)": EventFragment;
        "PairTradingFeePPMUpdated(address,address,uint32,uint32)": EventFragment;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
        "StrategyCreated(uint256,address,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64))": EventFragment;
        "StrategyDeleted(uint256,address,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64))": EventFragment;
        "StrategyUpdated(uint256,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64),uint8)": EventFragment;
        "TokensTraded(address,address,address,uint256,uint256,uint128,bool)": EventFragment;
        "TradingFeePPMUpdated(uint32,uint32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "FeesWithdrawn"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PairCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PairTradingFeePPMUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
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
export interface TestCarbonController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestCarbonControllerInterface;
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
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        accumulatedFees(token: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        calculateTradeSourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<[BigNumber]>;
        calculateTradeTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<[BigNumber]>;
        controllerType(overrides?: CallOverrides): Promise<[number]>;
        createPair(token0: string, token1: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createStrategy(token0: string, token1: string, orders: [OrderStruct, OrderStruct], overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        deleteStrategy(strategyId: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        pair(token0: string, token1: string, overrides?: CallOverrides): Promise<[PairStructOutput]>;
        pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<[number]>;
        pairs(overrides?: CallOverrides): Promise<[[string, string][]]>;
        postUpgrade(data: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        roleAdmin(overrides?: CallOverrides): Promise<[string]>;
        roleFeesManager(overrides?: CallOverrides): Promise<[string]>;
        setPairTradingFeePPM(token0: string, token1: string, newPairTradingFeePPM: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setTradingFeePPM(newTradingFeePPM: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<[StrategyStructOutput[]]>;
        strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        strategy(id: BigNumberish, overrides?: CallOverrides): Promise<[StrategyStructOutput]>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        testAccumulatedFees(token: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        testSetAccumulatedFees(token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        tradeBySourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, minReturn: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        tradeByTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, maxInput: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        tradingFeePPM(overrides?: CallOverrides): Promise<[number]>;
        updateStrategy(strategyId: BigNumberish, currentOrders: [OrderStruct, OrderStruct], newOrders: [OrderStruct, OrderStruct], overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        version(overrides?: CallOverrides): Promise<[number]>;
        withdrawFees(token: string, amount: BigNumberish, recipient: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
    };
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    accumulatedFees(token: string, overrides?: CallOverrides): Promise<BigNumber>;
    calculateTradeSourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<BigNumber>;
    calculateTradeTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<BigNumber>;
    controllerType(overrides?: CallOverrides): Promise<number>;
    createPair(token0: string, token1: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createStrategy(token0: string, token1: string, orders: [OrderStruct, OrderStruct], overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    deleteStrategy(strategyId: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
    getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>;
    getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    grantRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
    initialize(overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    pair(token0: string, token1: string, overrides?: CallOverrides): Promise<PairStructOutput>;
    pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<number>;
    pairs(overrides?: CallOverrides): Promise<[string, string][]>;
    postUpgrade(data: BytesLike, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    roleAdmin(overrides?: CallOverrides): Promise<string>;
    roleFeesManager(overrides?: CallOverrides): Promise<string>;
    setPairTradingFeePPM(token0: string, token1: string, newPairTradingFeePPM: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setTradingFeePPM(newTradingFeePPM: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<StrategyStructOutput[]>;
    strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
    strategy(id: BigNumberish, overrides?: CallOverrides): Promise<StrategyStructOutput>;
    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    testAccumulatedFees(token: string, overrides?: CallOverrides): Promise<BigNumber>;
    testSetAccumulatedFees(token: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    tradeBySourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, minReturn: BigNumberish, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    tradeByTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, maxInput: BigNumberish, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    tradingFeePPM(overrides?: CallOverrides): Promise<number>;
    updateStrategy(strategyId: BigNumberish, currentOrders: [OrderStruct, OrderStruct], newOrders: [OrderStruct, OrderStruct], overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    version(overrides?: CallOverrides): Promise<number>;
    withdrawFees(token: string, amount: BigNumberish, recipient: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    callStatic: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        accumulatedFees(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        calculateTradeSourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        calculateTradeTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        controllerType(overrides?: CallOverrides): Promise<number>;
        createPair(token0: string, token1: string, overrides?: CallOverrides): Promise<PairStructOutput>;
        createStrategy(token0: string, token1: string, orders: [OrderStruct, OrderStruct], overrides?: CallOverrides): Promise<BigNumber>;
        deleteStrategy(strategyId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
        initialize(overrides?: CallOverrides): Promise<void>;
        pair(token0: string, token1: string, overrides?: CallOverrides): Promise<PairStructOutput>;
        pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<number>;
        pairs(overrides?: CallOverrides): Promise<[string, string][]>;
        postUpgrade(data: BytesLike, overrides?: CallOverrides): Promise<void>;
        renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        roleAdmin(overrides?: CallOverrides): Promise<string>;
        roleFeesManager(overrides?: CallOverrides): Promise<string>;
        setPairTradingFeePPM(token0: string, token1: string, newPairTradingFeePPM: BigNumberish, overrides?: CallOverrides): Promise<void>;
        setTradingFeePPM(newTradingFeePPM: BigNumberish, overrides?: CallOverrides): Promise<void>;
        strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<StrategyStructOutput[]>;
        strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
        strategy(id: BigNumberish, overrides?: CallOverrides): Promise<StrategyStructOutput>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        testAccumulatedFees(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        testSetAccumulatedFees(token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        tradeBySourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, minReturn: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        tradeByTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, maxInput: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        tradingFeePPM(overrides?: CallOverrides): Promise<number>;
        updateStrategy(strategyId: BigNumberish, currentOrders: [OrderStruct, OrderStruct], newOrders: [OrderStruct, OrderStruct], overrides?: CallOverrides): Promise<void>;
        version(overrides?: CallOverrides): Promise<number>;
        withdrawFees(token: string, amount: BigNumberish, recipient: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "FeesWithdrawn(address,address,uint256,address)"(token?: string | null, recipient?: string | null, amount?: BigNumberish | null, sender?: null): FeesWithdrawnEventFilter;
        FeesWithdrawn(token?: string | null, recipient?: string | null, amount?: BigNumberish | null, sender?: null): FeesWithdrawnEventFilter;
        "Initialized(uint8)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "PairCreated(uint128,address,address)"(pairId?: BigNumberish | null, token0?: string | null, token1?: string | null): PairCreatedEventFilter;
        PairCreated(pairId?: BigNumberish | null, token0?: string | null, token1?: string | null): PairCreatedEventFilter;
        "PairTradingFeePPMUpdated(address,address,uint32,uint32)"(token0?: string | null, token1?: string | null, prevFeePPM?: null, newFeePPM?: null): PairTradingFeePPMUpdatedEventFilter;
        PairTradingFeePPMUpdated(token0?: string | null, token1?: string | null, prevFeePPM?: null, newFeePPM?: null): PairTradingFeePPMUpdatedEventFilter;
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        RoleGranted(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        RoleRevoked(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
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
    estimateGas: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        accumulatedFees(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        calculateTradeSourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        calculateTradeTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<BigNumber>;
        controllerType(overrides?: CallOverrides): Promise<BigNumber>;
        createPair(token0: string, token1: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createStrategy(token0: string, token1: string, orders: [OrderStruct, OrderStruct], overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
        deleteStrategy(strategyId: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        pair(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
        pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
        pairs(overrides?: CallOverrides): Promise<BigNumber>;
        postUpgrade(data: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        roleAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        roleFeesManager(overrides?: CallOverrides): Promise<BigNumber>;
        setPairTradingFeePPM(token0: string, token1: string, newPairTradingFeePPM: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setTradingFeePPM(newTradingFeePPM: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
        strategy(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        testAccumulatedFees(token: string, overrides?: CallOverrides): Promise<BigNumber>;
        testSetAccumulatedFees(token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        tradeBySourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, minReturn: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
        tradeByTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, maxInput: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
        tradingFeePPM(overrides?: CallOverrides): Promise<BigNumber>;
        updateStrategy(strategyId: BigNumberish, currentOrders: [OrderStruct, OrderStruct], newOrders: [OrderStruct, OrderStruct], overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
        version(overrides?: CallOverrides): Promise<BigNumber>;
        withdrawFees(token: string, amount: BigNumberish, recipient: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        accumulatedFees(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateTradeSourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateTradeTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        controllerType(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createPair(token0: string, token1: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createStrategy(token0: string, token1: string, orders: [OrderStruct, OrderStruct], overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        deleteStrategy(strategyId: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        pair(token0: string, token1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pairs(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        postUpgrade(data: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        roleAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        roleFeesManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setPairTradingFeePPM(token0: string, token1: string, newPairTradingFeePPM: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setTradingFeePPM(newTradingFeePPM: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        strategy(id: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        testAccumulatedFees(token: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        testSetAccumulatedFees(token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        tradeBySourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, minReturn: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        tradeByTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, maxInput: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        tradingFeePPM(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        updateStrategy(strategyId: BigNumberish, currentOrders: [OrderStruct, OrderStruct], newOrders: [OrderStruct, OrderStruct], overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        withdrawFees(token: string, amount: BigNumberish, recipient: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TestCarbonController.d.ts.map