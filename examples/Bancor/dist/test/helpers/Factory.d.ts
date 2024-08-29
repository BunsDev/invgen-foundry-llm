import { ContractBuilder } from '../../components/ContractBuilder';
import { MockBancorNetworkV3, ProxyAdmin, TestBNT, TestCarbonController, TestERC20Burnable, TestERC20FeeOnTransfer, TestERC20Token, Voucher } from '../../components/Contracts';
import { TokenData } from '../../utils/TokenData';
import { Addressable } from '../../utils/Types';
import { BaseContract, BigNumberish, BytesLike, ContractFactory } from 'ethers';
type CtorArgs = Parameters<any>;
type InitArgs = Parameters<any>;
interface ProxyArguments {
    skipInitialization?: boolean;
    initArgs?: InitArgs;
    ctorArgs?: CtorArgs;
}
export interface Tokens {
    [symbol: string]: TestERC20Burnable;
}
export type TokenWithAddress = TestERC20Token | Addressable;
export declare const proxyAdmin: () => Promise<ProxyAdmin>;
export declare const createProxy: <F extends ContractFactory>(factory: ContractBuilder<F>, args?: ProxyArguments) => Promise<import("../../components/ContractBuilder").AsyncReturnType<F["deploy"]>>;
interface ProxyUpgradeArgs extends ProxyArguments {
    upgradeCallData?: BytesLike;
}
export declare const upgradeProxy: <F extends ContractFactory>(proxy: BaseContract, factory: ContractBuilder<F>, args?: ProxyUpgradeArgs) => Promise<import("../../components/ContractBuilder").AsyncReturnType<F["deploy"]>>;
export declare const createCarbonController: (voucher: string | Voucher) => Promise<TestCarbonController>;
export declare const createCarbonVortex: (bnt: string | TestBNT, carbonController: string | TestCarbonController, bancorNetworkV3: string | MockBancorNetworkV3) => Promise<import("../../components/Contracts").CarbonVortex>;
export declare const createSystem: () => Promise<{
    carbonController: TestCarbonController;
    voucher: import("../../components/Contracts").TestVoucher;
}>;
export declare const createToken: (tokenData: TokenData, totalSupply?: BigNumberish, burnable?: boolean, feeOnTransfer?: boolean) => Promise<TokenWithAddress>;
export declare const createFeeOnTransferToken: (tokenData: TokenData, totalSupply?: BigNumberish) => Promise<TestERC20FeeOnTransfer>;
export declare const createBurnableToken: (tokenData: TokenData, totalSupply?: BigNumberish) => Promise<TestERC20Burnable>;
export declare const createTestToken: (totalSupply?: BigNumberish) => Promise<TestERC20Burnable>;
export declare const createBNT: (totalSupply?: BigNumberish) => Promise<TestBNT>;
export {};
//# sourceMappingURL=Factory.d.ts.map