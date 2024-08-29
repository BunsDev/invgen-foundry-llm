import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
export interface TestExpDecayMathInterface extends utils.Interface {
    functions: {
        "calcExpDecay(uint256,uint32,uint32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "calcExpDecay"): FunctionFragment;
    encodeFunctionData(functionFragment: "calcExpDecay", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "calcExpDecay", data: BytesLike): Result;
    events: {};
}
export interface TestExpDecayMath extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestExpDecayMathInterface;
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
        calcExpDecay(amount: BigNumberish, timeElapsed: BigNumberish, halfLife: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    calcExpDecay(amount: BigNumberish, timeElapsed: BigNumberish, halfLife: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        calcExpDecay(amount: BigNumberish, timeElapsed: BigNumberish, halfLife: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        calcExpDecay(amount: BigNumberish, timeElapsed: BigNumberish, halfLife: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        calcExpDecay(amount: BigNumberish, timeElapsed: BigNumberish, halfLife: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TestExpDecayMath.d.ts.map