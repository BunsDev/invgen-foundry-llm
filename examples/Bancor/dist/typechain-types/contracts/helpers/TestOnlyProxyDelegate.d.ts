import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
export interface TestOnlyProxyDelegateInterface extends utils.Interface {
    functions: {
        "testOnlyProxyDelegate()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "testOnlyProxyDelegate"): FunctionFragment;
    encodeFunctionData(functionFragment: "testOnlyProxyDelegate", values?: undefined): string;
    decodeFunctionResult(functionFragment: "testOnlyProxyDelegate", data: BytesLike): Result;
    events: {};
}
export interface TestOnlyProxyDelegate extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestOnlyProxyDelegateInterface;
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
        testOnlyProxyDelegate(overrides?: CallOverrides): Promise<[boolean]>;
    };
    testOnlyProxyDelegate(overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        testOnlyProxyDelegate(overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        testOnlyProxyDelegate(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        testOnlyProxyDelegate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TestOnlyProxyDelegate.d.ts.map