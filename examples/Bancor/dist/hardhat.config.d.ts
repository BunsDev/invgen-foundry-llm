import './test/Setup';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-solhint';
import '@nomiclabs/hardhat-waffle';
import '@nomicfoundation/hardhat-verify';
import '@typechain/hardhat';
import 'dotenv/config';
import 'hardhat-contract-sizer';
import 'hardhat-dependency-compiler';
import 'hardhat-deploy';
import 'hardhat-storage-layout';
import 'hardhat-watcher';
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage';
declare const config: HardhatUserConfig;
export default config;
//# sourceMappingURL=hardhat.config.d.ts.map