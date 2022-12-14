/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface ITokenBridgeInterface extends utils.Interface {
  functions: {
    "attestToken(address,uint32)": FunctionFragment;
    "bridgeContracts(uint16)": FunctionFragment;
    "chainId()": FunctionFragment;
    "completeTransfer(bytes)": FunctionFragment;
    "completeTransferAndUnwrapETH(bytes)": FunctionFragment;
    "completeTransferAndUnwrapETHWithPayload(bytes)": FunctionFragment;
    "completeTransferWithPayload(bytes)": FunctionFragment;
    "createWrapped(bytes)": FunctionFragment;
    "governanceActionIsConsumed(bytes32)": FunctionFragment;
    "governanceChainId()": FunctionFragment;
    "governanceContract()": FunctionFragment;
    "isInitialized(address)": FunctionFragment;
    "isTransferCompleted(bytes32)": FunctionFragment;
    "isWrappedAsset(address)": FunctionFragment;
    "outstandingBridged(address)": FunctionFragment;
    "tokenImplementation()": FunctionFragment;
    "transferTokens(address,uint256,uint16,bytes32,uint256,uint32)": FunctionFragment;
    "transferTokensWithPayload(address,uint256,uint16,bytes32,uint32,bytes)": FunctionFragment;
    "updateWrapped(bytes)": FunctionFragment;
    "wrapAndTransferETH(uint16,bytes32,uint256,uint32)": FunctionFragment;
    "wrapAndTransferETHWithPayload(uint16,bytes32,uint32,bytes)": FunctionFragment;
    "wrappedAsset(uint16,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "attestToken"
      | "bridgeContracts"
      | "chainId"
      | "completeTransfer"
      | "completeTransferAndUnwrapETH"
      | "completeTransferAndUnwrapETHWithPayload"
      | "completeTransferWithPayload"
      | "createWrapped"
      | "governanceActionIsConsumed"
      | "governanceChainId"
      | "governanceContract"
      | "isInitialized"
      | "isTransferCompleted"
      | "isWrappedAsset"
      | "outstandingBridged"
      | "tokenImplementation"
      | "transferTokens"
      | "transferTokensWithPayload"
      | "updateWrapped"
      | "wrapAndTransferETH"
      | "wrapAndTransferETHWithPayload"
      | "wrappedAsset"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "attestToken",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "bridgeContracts",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "chainId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "completeTransfer",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "completeTransferAndUnwrapETH",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "completeTransferAndUnwrapETHWithPayload",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "completeTransferWithPayload",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "createWrapped",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "governanceActionIsConsumed",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "governanceChainId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governanceContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isInitialized",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isTransferCompleted",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isWrappedAsset",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "outstandingBridged",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferTokens",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferTokensWithPayload",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateWrapped",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "wrapAndTransferETH",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "wrapAndTransferETHWithPayload",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "wrappedAsset",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "attestToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bridgeContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "chainId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "completeTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "completeTransferAndUnwrapETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "completeTransferAndUnwrapETHWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "completeTransferWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createWrapped",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceActionIsConsumed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceChainId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTransferCompleted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isWrappedAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "outstandingBridged",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferTokensWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateWrapped",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wrapAndTransferETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wrapAndTransferETHWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wrappedAsset",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ITokenBridge extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ITokenBridgeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    attestToken(
      tokenAddress: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    bridgeContracts(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    chainId(overrides?: CallOverrides): Promise<[number]>;

    completeTransfer(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    completeTransferAndUnwrapETH(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    completeTransferAndUnwrapETHWithPayload(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    completeTransferWithPayload(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createWrapped(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    governanceActionIsConsumed(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    governanceChainId(overrides?: CallOverrides): Promise<[number]>;

    governanceContract(overrides?: CallOverrides): Promise<[string]>;

    isInitialized(
      impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isTransferCompleted(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isWrappedAsset(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    outstandingBridged(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenImplementation(overrides?: CallOverrides): Promise<[string]>;

    transferTokens(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferTokensWithPayload(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateWrapped(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    wrapAndTransferETH(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    wrapAndTransferETHWithPayload(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    wrappedAsset(
      tokenChainId: PromiseOrValue<BigNumberish>,
      tokenAddress: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  attestToken(
    tokenAddress: PromiseOrValue<string>,
    nonce: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  bridgeContracts(
    chainId_: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  chainId(overrides?: CallOverrides): Promise<number>;

  completeTransfer(
    encodedVm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  completeTransferAndUnwrapETH(
    encodedVm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  completeTransferAndUnwrapETHWithPayload(
    encodedVm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  completeTransferWithPayload(
    encodedVm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createWrapped(
    encodedVm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  governanceActionIsConsumed(
    hash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  governanceChainId(overrides?: CallOverrides): Promise<number>;

  governanceContract(overrides?: CallOverrides): Promise<string>;

  isInitialized(
    impl: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isTransferCompleted(
    hash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isWrappedAsset(
    token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  outstandingBridged(
    token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenImplementation(overrides?: CallOverrides): Promise<string>;

  transferTokens(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    recipientChain: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<BytesLike>,
    arbiterFee: PromiseOrValue<BigNumberish>,
    nonce: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferTokensWithPayload(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    recipientChain: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<BytesLike>,
    nonce: PromiseOrValue<BigNumberish>,
    payload: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateWrapped(
    encodedVm: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  wrapAndTransferETH(
    recipientChain: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<BytesLike>,
    arbiterFee: PromiseOrValue<BigNumberish>,
    nonce: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  wrapAndTransferETHWithPayload(
    recipientChain: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<BytesLike>,
    nonce: PromiseOrValue<BigNumberish>,
    payload: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  wrappedAsset(
    tokenChainId: PromiseOrValue<BigNumberish>,
    tokenAddress: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    attestToken(
      tokenAddress: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bridgeContracts(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    chainId(overrides?: CallOverrides): Promise<number>;

    completeTransfer(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    completeTransferAndUnwrapETH(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    completeTransferAndUnwrapETHWithPayload(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    completeTransferWithPayload(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    createWrapped(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    governanceActionIsConsumed(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    governanceChainId(overrides?: CallOverrides): Promise<number>;

    governanceContract(overrides?: CallOverrides): Promise<string>;

    isInitialized(
      impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isTransferCompleted(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isWrappedAsset(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    outstandingBridged(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenImplementation(overrides?: CallOverrides): Promise<string>;

    transferTokens(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferTokensWithPayload(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateWrapped(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    wrapAndTransferETH(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wrapAndTransferETHWithPayload(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wrappedAsset(
      tokenChainId: PromiseOrValue<BigNumberish>,
      tokenAddress: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    attestToken(
      tokenAddress: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    bridgeContracts(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    chainId(overrides?: CallOverrides): Promise<BigNumber>;

    completeTransfer(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    completeTransferAndUnwrapETH(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    completeTransferAndUnwrapETHWithPayload(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    completeTransferWithPayload(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createWrapped(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    governanceActionIsConsumed(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    governanceChainId(overrides?: CallOverrides): Promise<BigNumber>;

    governanceContract(overrides?: CallOverrides): Promise<BigNumber>;

    isInitialized(
      impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isTransferCompleted(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isWrappedAsset(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    outstandingBridged(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    transferTokens(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferTokensWithPayload(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateWrapped(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    wrapAndTransferETH(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    wrapAndTransferETHWithPayload(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    wrappedAsset(
      tokenChainId: PromiseOrValue<BigNumberish>,
      tokenAddress: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    attestToken(
      tokenAddress: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    bridgeContracts(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    completeTransfer(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    completeTransferAndUnwrapETH(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    completeTransferAndUnwrapETHWithPayload(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    completeTransferWithPayload(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createWrapped(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    governanceActionIsConsumed(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    governanceChainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governanceContract(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isInitialized(
      impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isTransferCompleted(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isWrappedAsset(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    outstandingBridged(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferTokens(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferTokensWithPayload(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateWrapped(
      encodedVm: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    wrapAndTransferETH(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      arbiterFee: PromiseOrValue<BigNumberish>,
      nonce: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    wrapAndTransferETHWithPayload(
      recipientChain: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    wrappedAsset(
      tokenChainId: PromiseOrValue<BigNumberish>,
      tokenAddress: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
