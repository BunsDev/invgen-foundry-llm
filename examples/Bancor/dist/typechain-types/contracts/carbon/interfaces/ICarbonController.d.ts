import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../../common";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export interface ICarbonControllerInterface extends utils.Interface {
    functions: {
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
        "pair(address,address)": FunctionFragment;
        "pairTradingFeePPM(address,address)": FunctionFragment;
        "pairs()": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "strategiesByPair(address,address,uint256,uint256)": FunctionFragment;
        "strategiesByPairCount(address,address)": FunctionFragment;
        "strategy(uint256)": FunctionFragment;
        "tradeBySourceAmount(address,address,(uint256,uint128)[],uint256,uint128)": FunctionFragment;
        "tradeByTargetAmount(address,address,(uint256,uint128)[],uint256,uint128)": FunctionFragment;
        "tradingFeePPM()": FunctionFragment;
        "updateStrategy(uint256,(uint128,uint128,uint64,uint64)[2],(uint128,uint128,uint64,uint64)[2])": FunctionFragment;
        "version()": FunctionFragment;
        "withdrawFees(address,uint256,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "accumulatedFees" | "calculateTradeSourceAmount" | "calculateTradeTargetAmount" | "controllerType" | "createPair" | "createStrategy" | "deleteStrategy" | "getRoleAdmin" | "getRoleMember" | "getRoleMemberCount" | "grantRole" | "hasRole" | "pair" | "pairTradingFeePPM" | "pairs" | "renounceRole" | "revokeRole" | "strategiesByPair" | "strategiesByPairCount" | "strategy" | "tradeBySourceAmount" | "tradeByTargetAmount" | "tradingFeePPM" | "updateStrategy" | "version" | "withdrawFees"): FunctionFragment;
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
    encodeFunctionData(functionFragment: "pair", values: [string, string]): string;
    encodeFunctionData(functionFragment: "pairTradingFeePPM", values: [string, string]): string;
    encodeFunctionData(functionFragment: "pairs", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "strategiesByPair", values: [string, string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "strategiesByPairCount", values: [string, string]): string;
    encodeFunctionData(functionFragment: "strategy", values: [BigNumberish]): string;
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
    decodeFunctionResult(functionFragment: "pair", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pairTradingFeePPM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pairs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "strategiesByPair", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "strategiesByPairCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "strategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradeBySourceAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradeByTargetAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradingFeePPM", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateStrategy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFees", data: BytesLike): Result;
    events: {
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}
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
export interface ICarbonController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ICarbonControllerInterface;
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
        pair(token0: string, token1: string, overrides?: CallOverrides): Promise<[PairStructOutput]>;
        pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<[number]>;
        pairs(overrides?: CallOverrides): Promise<[[string, string][]]>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<[StrategyStructOutput[]]>;
        strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        strategy(id: BigNumberish, overrides?: CallOverrides): Promise<[StrategyStructOutput]>;
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
    pair(token0: string, token1: string, overrides?: CallOverrides): Promise<PairStructOutput>;
    pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<number>;
    pairs(overrides?: CallOverrides): Promise<[string, string][]>;
    renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<StrategyStructOutput[]>;
    strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
    strategy(id: BigNumberish, overrides?: CallOverrides): Promise<StrategyStructOutput>;
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
        pair(token0: string, token1: string, overrides?: CallOverrides): Promise<PairStructOutput>;
        pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<number>;
        pairs(overrides?: CallOverrides): Promise<[string, string][]>;
        renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<StrategyStructOutput[]>;
        strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
        strategy(id: BigNumberish, overrides?: CallOverrides): Promise<StrategyStructOutput>;
        tradeBySourceAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, minReturn: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        tradeByTargetAmount(sourceToken: string, targetToken: string, tradeActions: TradeActionStruct[], deadline: BigNumberish, maxInput: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        tradingFeePPM(overrides?: CallOverrides): Promise<number>;
        updateStrategy(strategyId: BigNumberish, currentOrders: [OrderStruct, OrderStruct], newOrders: [OrderStruct, OrderStruct], overrides?: CallOverrides): Promise<void>;
        version(overrides?: CallOverrides): Promise<number>;
        withdrawFees(token: string, amount: BigNumberish, recipient: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        RoleGranted(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        RoleRevoked(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
    };
    estimateGas: {
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
        pair(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
        pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
        pairs(overrides?: CallOverrides): Promise<BigNumber>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<BigNumber>;
        strategy(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
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
        pair(token0: string, token1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pairTradingFeePPM(token0: string, token1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pairs(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        strategiesByPair(token0: string, token1: string, startIndex: BigNumberish, endIndex: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        strategiesByPairCount(token0: string, token1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        strategy(id: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
//# sourceMappingURL=ICarbonController.d.ts.map