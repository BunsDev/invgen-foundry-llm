import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
export type FractionStruct = {
    n: BigNumberish;
    d: BigNumberish;
};
export type FractionStructOutput = [BigNumber, BigNumber] & {
    n: BigNumber;
    d: BigNumber;
};
export interface TestMathExInterface extends utils.Interface {
    functions: {
        "exp2((uint256,uint256))": FunctionFragment;
        "minFactor(uint256,uint256)": FunctionFragment;
        "mulDivC(uint256,uint256,uint256)": FunctionFragment;
        "mulDivF(uint256,uint256,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "exp2" | "minFactor" | "mulDivC" | "mulDivF"): FunctionFragment;
    encodeFunctionData(functionFragment: "exp2", values: [FractionStruct]): string;
    encodeFunctionData(functionFragment: "minFactor", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mulDivC", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mulDivF", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "exp2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "minFactor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mulDivC", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mulDivF", data: BytesLike): Result;
    events: {};
}
export interface TestMathEx extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestMathExInterface;
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
        exp2(f: FractionStruct, overrides?: CallOverrides): Promise<[FractionStructOutput]>;
        minFactor(x: BigNumberish, y: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        mulDivC(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        mulDivF(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    exp2(f: FractionStruct, overrides?: CallOverrides): Promise<FractionStructOutput>;
    minFactor(x: BigNumberish, y: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    mulDivC(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    mulDivF(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        exp2(f: FractionStruct, overrides?: CallOverrides): Promise<FractionStructOutput>;
        minFactor(x: BigNumberish, y: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        mulDivC(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        mulDivF(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        exp2(f: FractionStruct, overrides?: CallOverrides): Promise<BigNumber>;
        minFactor(x: BigNumberish, y: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        mulDivC(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        mulDivF(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        exp2(f: FractionStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        minFactor(x: BigNumberish, y: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mulDivC(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mulDivF(x: BigNumberish, y: BigNumberish, z: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TestMathEx.d.ts.map