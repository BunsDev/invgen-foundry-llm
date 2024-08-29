"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = __importDefault(require("../components/Contracts"));
const Deploy_1 = require("../utils/Deploy");
const Logger_1 = __importDefault(require("../utils/Logger"));
const Constants_1 = require("../utils/Constants");
const Types_1 = require("../utils/Types");
require("@nomiclabs/hardhat-ethers");
require("@tenderly/hardhat-tenderly");
require("@typechain/hardhat");
const adm_zip_1 = __importDefault(require("adm-zip"));
const hardhat_1 = require("hardhat");
require("hardhat-deploy");
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const { DEV_ADDRESSES, TESTNET_NAME, TENDERLY_PROJECT, TENDERLY_USERNAME, TENDERLY_TESTNET_ID: testnetId = '', TENDERLY_NETWORK_NAME = 'mainnet', TENDERLY_TESTNET_PROVIDER_URL: testnetRpcUrl } = process.env;
const fundAccount = async (account, fundingRequests) => {
    Logger_1.default.log(`Funding ${account}...`);
    for (const fundingRequest of fundingRequests) {
        // for tokens which are missing on a network skip funding request (BNT is not on Base, Arbitrum, etc.)
        if (fundingRequest.token === Constants_1.ZERO_ADDRESS) {
            continue;
        }
        const { whale } = fundingRequest;
        if (!whale) {
            continue;
        }
        if (fundingRequest.token === Constants_1.NATIVE_TOKEN_ADDRESS) {
            await fundingRequest.whale.sendTransaction({
                value: fundingRequest.amount,
                to: account
            });
            continue;
        }
        const tokenContract = await Contracts_1.default.ERC20.attach(fundingRequest.token);
        // check if whale has enough balance
        const whaleBalance = await tokenContract.balanceOf(whale.address);
        if (whaleBalance.lt(fundingRequest.amount)) {
            Logger_1.default.error(`Whale ${whale.address} has insufficient balance for ${fundingRequest.tokenName}`);
            continue;
        }
        await tokenContract.connect(whale).transfer(account, fundingRequest.amount);
    }
};
const fundAccounts = async () => {
    Logger_1.default.log('Funding test accounts...');
    Logger_1.default.log();
    const { dai, link, usdc, wbtc, bnt } = await (0, hardhat_1.getNamedAccounts)();
    const { ethWhale, bntWhale, daiWhale, linkWhale, usdcWhale, wbtcWhale } = await (0, Deploy_1.getNamedSigners)();
    const fundingRequests = [
        {
            token: Constants_1.NATIVE_TOKEN_ADDRESS,
            tokenName: 'eth',
            amount: (0, Types_1.toWei)(1000),
            whale: ethWhale
        },
        {
            token: bnt,
            tokenName: 'bnt',
            amount: (0, Types_1.toWei)(10_000),
            whale: bntWhale
        },
        {
            token: dai,
            tokenName: 'dai',
            amount: (0, Types_1.toWei)(20_000),
            whale: daiWhale
        },
        {
            token: link,
            tokenName: 'link',
            amount: (0, Types_1.toWei)(10_000),
            whale: linkWhale
        },
        {
            token: usdc,
            tokenName: 'usdc',
            amount: (0, Types_1.toWei)(100_000, 6),
            whale: usdcWhale
        },
        {
            token: wbtc,
            tokenName: 'wbtc',
            amount: (0, Types_1.toWei)(100, 8),
            whale: wbtcWhale
        }
    ];
    const devAddresses = DEV_ADDRESSES.split(',');
    for (const fundingRequest of fundingRequests) {
        if (fundingRequest.token == Constants_1.ZERO_ADDRESS) {
            Logger_1.default.log(`Skipping funding for ${fundingRequest.tokenName}`);
        }
        const { whale } = fundingRequest;
        if (!whale) {
            continue;
        }
        const whaleBalance = await whale.getBalance();
        // transfer ETH to the funding account if it doesn't have ETH
        if (whaleBalance.lt((0, Types_1.toWei)(1))) {
            await fundingRequests[0].whale.sendTransaction({
                value: (0, Types_1.toWei)(1),
                to: whale.address
            });
        }
    }
    for (const account of devAddresses) {
        await fundAccount(account, fundingRequests);
    }
    Logger_1.default.log();
};
const runDeployments = async () => {
    Logger_1.default.log('Running pending deployments...');
    Logger_1.default.log();
    await (0, Deploy_1.runPendingDeployments)();
    Logger_1.default.log();
};
const archiveArtifacts = async () => {
    const zip = new adm_zip_1.default();
    const srcDir = path_1.default.resolve(path_1.default.join(__dirname, './tenderly'));
    const dest = path_1.default.resolve(path_1.default.join(__dirname, '..', 'testnets', `testnet-${testnetId}.zip`));
    zip.addLocalFolder(srcDir);
    zip.writeZip(dest);
    Logger_1.default.log(`Archived ${srcDir} to ${dest}...`);
    Logger_1.default.log();
};
const main = async () => {
    if (!(0, Deploy_1.isTenderly)()) {
        throw new Error('Invalid network');
    }
    Logger_1.default.log();
    await runDeployments();
    await fundAccounts();
    await archiveArtifacts();
    const networkName = (0, lodash_1.capitalize)(TENDERLY_NETWORK_NAME);
    const description = `${networkName} ${TESTNET_NAME ? TESTNET_NAME : ""} Tenderly Testnet`;
    Logger_1.default.log('********************************************************************************');
    Logger_1.default.log();
    Logger_1.default.log(description);
    Logger_1.default.log('‾'.repeat(description.length));
    Logger_1.default.log(`   RPC: ${testnetRpcUrl}`);
    Logger_1.default.log(`   Dashboard: https://dashboard.tenderly.co/${TENDERLY_USERNAME}/${TENDERLY_PROJECT}/testnet/${testnetId}`);
    Logger_1.default.log();
    Logger_1.default.log('********************************************************************************');
};
main()
    .then(() => process.exit(0))
    .catch((error) => {
    Logger_1.default.error(error);
    process.exit(1);
});
//# sourceMappingURL=setup-testnet.js.map