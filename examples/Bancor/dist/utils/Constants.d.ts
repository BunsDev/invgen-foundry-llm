import Decimal from 'decimal.js';
import { ethers } from 'ethers';
export declare enum MainnetNetwork {
    Arbitrum = "arbitrum",
    Astar = "astar",
    Aurora = "aurora",
    Avalanche = "avalanche",
    Base = "base",
    BSC = "bsc",
    Canto = "canto",
    Celo = "celo",
    Cronos = "cronos",
    Fantom = "fantom",
    Fusion = "fusion",
    Gnosis = "gnosis",
    Hedera = "hedera",
    Kava = "kava",
    Klaytn = "klaytn",
    Linea = "linea",
    Mainnet = "mainnet",
    Manta = "manta",
    Mantle = "mantle",
    Metis = "metis",
    Mode = "mode",
    Moonbeam = "moonbeam",
    Optimism = "optimism",
    Polygon = "polygon",
    PulseChain = "pulsechain",
    Rootstock = "rootstock",
    Scroll = "scroll",
    Telos = "telos",
    ZkSync = "zksync",
    Sei = "sei"
}
export declare enum TestnetNetwork {
    Hardhat = "hardhat",
    Sepolia = "sepolia",
    Tenderly = "tenderly",
    TenderlyTestnet = "tenderly-testnet"
}
export declare const DeploymentNetwork: {
    Hardhat: TestnetNetwork.Hardhat;
    Sepolia: TestnetNetwork.Sepolia;
    Tenderly: TestnetNetwork.Tenderly;
    TenderlyTestnet: TestnetNetwork.TenderlyTestnet;
    Arbitrum: MainnetNetwork.Arbitrum;
    Astar: MainnetNetwork.Astar;
    Aurora: MainnetNetwork.Aurora;
    Avalanche: MainnetNetwork.Avalanche;
    Base: MainnetNetwork.Base;
    BSC: MainnetNetwork.BSC;
    Canto: MainnetNetwork.Canto;
    Celo: MainnetNetwork.Celo;
    Cronos: MainnetNetwork.Cronos;
    Fantom: MainnetNetwork.Fantom;
    Fusion: MainnetNetwork.Fusion;
    Gnosis: MainnetNetwork.Gnosis;
    Hedera: MainnetNetwork.Hedera;
    Kava: MainnetNetwork.Kava;
    Klaytn: MainnetNetwork.Klaytn;
    Linea: MainnetNetwork.Linea;
    Mainnet: MainnetNetwork.Mainnet;
    Manta: MainnetNetwork.Manta;
    Mantle: MainnetNetwork.Mantle;
    Metis: MainnetNetwork.Metis;
    Mode: MainnetNetwork.Mode;
    Moonbeam: MainnetNetwork.Moonbeam;
    Optimism: MainnetNetwork.Optimism;
    Polygon: MainnetNetwork.Polygon;
    PulseChain: MainnetNetwork.PulseChain;
    Rootstock: MainnetNetwork.Rootstock;
    Scroll: MainnetNetwork.Scroll;
    Telos: MainnetNetwork.Telos;
    ZkSync: MainnetNetwork.ZkSync;
    Sei: MainnetNetwork.Sei;
};
export declare const EXP2_INPUT_TOO_HIGH: Decimal;
export declare const MAX_UINT256: ethers.BigNumber;
export declare const MAX_UINT128 = "340282366920938463463374607431768211455";
export declare const ZERO_BYTES = "0x";
export declare const ZERO_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";
export declare const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export declare const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export declare const ZERO_FRACTION: {
    n: number;
    d: number;
};
export declare const PPM_RESOLUTION = 1000000;
export declare const VOUCHER_URI = "ipfs://QmUyDUzQtwAhMB1hrYaQAqmRTbgt9sUnwq11GeqyzzSuqn";
export declare const DEFAULT_TRADING_FEE_PPM: number;
export declare const STRATEGY_UPDATE_REASON_EDIT = 0;
export declare const STRATEGY_UPDATE_REASON_TRADE = 1;
export declare enum ControllerType {
    Standard = 1
}
//# sourceMappingURL=Constants.d.ts.map