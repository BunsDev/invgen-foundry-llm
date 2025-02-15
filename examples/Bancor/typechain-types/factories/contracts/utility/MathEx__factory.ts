/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  MathEx,
  MathExInterface,
} from "../../../contracts/utility/MathEx";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "Overflow",
    type: "error",
  },
] as const;

const _bytecode =
  "0x602d6037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea164736f6c6343000813000a";

type MathExConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MathExConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MathEx__factory extends ContractFactory {
  constructor(...args: MathExConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: string }): Promise<MathEx> {
    return super.deploy(overrides || {}) as Promise<MathEx>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MathEx {
    return super.attach(address) as MathEx;
  }
  override connect(signer: Signer): MathEx__factory {
    return super.connect(signer) as MathEx__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MathExInterface {
    return new utils.Interface(_abi) as MathExInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MathEx {
    return new Contract(address, _abi, signerOrProvider) as MathEx;
  }
}
