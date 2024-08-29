import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
export interface IVersionedInterface extends utils.Interface {
    functions: {
        "version()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "version"): FunctionFragment;
    encodeFunctionData(functionFragment: "version", values?: undefined): string;
    decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
    events: {};
}
export interface IVersioned extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IVersionedInterface;
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
        version(overrides?: CallOverrides): Promise<[number]>;
    };
    version(overrides?: CallOverrides): Promise<number>;
    callStatic: {
        version(overrides?: CallOverrides): Promise<number>;
    };
    filters: {};
    estimateGas: {
        version(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IVersioned.d.ts.map