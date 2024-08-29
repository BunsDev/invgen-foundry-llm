"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.describeDeployment = exports.getInstanceNameByAddress = exports.getNetworkNameById = exports.runPendingDeployments = exports.setDeploymentMetadata = exports.deploymentMetadata = exports.getLatestDeploymentTag = exports.getPreviousDeploymentTag = exports.deploymentTagExists = exports.save = exports.renounceRole = exports.revokeRole = exports.grantRole = exports.initializeProxy = exports.execute = exports.upgradeProxy = exports.deployProxy = exports.deploy = exports.fundAccount = exports.getNamedSigners = exports.isLive = exports.isTenderly = exports.DeployedContracts = exports.InstanceName = exports.LegacyInstanceName = void 0;
const Logger_1 = __importDefault(require("../utils/Logger"));
const Constants_1 = require("./Constants");
const ethers_1 = require("ethers");
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const hardhat_1 = require("hardhat");
const path_1 = __importDefault(require("path"));
const Types_1 = require("./Types");
const chainIds_json_1 = __importDefault(require("./chainIds.json"));
const { deploy: deployContract, execute: executeTransaction, getNetworkName, save: saveContract, getExtendedArtifact, getArtifact, run } = hardhat_1.deployments;
const { AbiCoder } = ethers_1.utils;
const { TENDERLY_NETWORK_NAME = 'mainnet' } = process.env;
const networkId = chainIds_json_1.default[TENDERLY_NETWORK_NAME];
var NewInstanceName;
(function (NewInstanceName) {
    NewInstanceName["CarbonController"] = "CarbonController";
    NewInstanceName["ProxyAdmin"] = "ProxyAdmin";
    NewInstanceName["Voucher"] = "Voucher";
    NewInstanceName["CarbonVortex"] = "CarbonVortex";
    NewInstanceName["CarbonPOL"] = "CarbonPOL";
})(NewInstanceName || (NewInstanceName = {}));
exports.LegacyInstanceName = {};
exports.InstanceName = {
    ...exports.LegacyInstanceName,
    ...NewInstanceName
};
const deployed = (name) => ({
    deployed: async () => hardhat_1.ethers.getContract(name)
});
const DeployedNewContracts = {
    CarbonController: deployed(exports.InstanceName.CarbonController),
    ProxyAdmin: deployed(exports.InstanceName.ProxyAdmin),
    Voucher: deployed(exports.InstanceName.Voucher),
    CarbonVortex: deployed(exports.InstanceName.CarbonVortex),
    CarbonPOL: deployed(exports.InstanceName.CarbonPOL)
};
exports.DeployedContracts = {
    ...DeployedNewContracts
};
const isTenderly = () => getNetworkName() === Constants_1.DeploymentNetwork.Tenderly;
exports.isTenderly = isTenderly;
const isLive = () => !(0, exports.isTenderly)();
exports.isLive = isLive;
const TEST_MINIMUM_BALANCE = (0, Types_1.toWei)(10);
const TEST_FUNDING = (0, Types_1.toWei)(10);
const getNamedSigners = async () => {
    const signers = {};
    for (const [name, address] of Object.entries(await (0, hardhat_1.getNamedAccounts)())) {
        signers[name] = await hardhat_1.ethers.getSigner(address);
    }
    return signers;
};
exports.getNamedSigners = getNamedSigners;
const fundAccount = async (account, amount) => {
    if (!(0, exports.isTenderly)()) {
        return;
    }
    const address = typeof account === 'string' ? account : account.address;
    const balance = await hardhat_1.ethers.provider.getBalance(address);
    if (!amount && balance.gte(TEST_MINIMUM_BALANCE)) {
        return;
    }
    const { ethWhale } = await (0, exports.getNamedSigners)();
    return ethWhale.sendTransaction({
        value: amount ?? TEST_FUNDING,
        to: address
    });
};
exports.fundAccount = fundAccount;
const saveTypes = async (options) => {
    const { name, contract } = options;
    // don't attempt to save the types for legacy contracts
    if (Object.keys(exports.LegacyInstanceName).includes(name)) {
        return;
    }
    const { sourceName } = await getArtifact(contract);
    const contractSrcDir = path_1.default.dirname(sourceName);
    const typechainDir = path_1.default.resolve('./', hardhat_1.config.typechain.outDir);
    // for some reason, the types of some contracts are stored in a "Contract.sol" dir, in which case we'd have to use
    // it as the root source dir
    let srcDir;
    let factoriesSrcDir;
    if (fs_1.default.existsSync(path_1.default.join(typechainDir, sourceName))) {
        srcDir = path_1.default.join(typechainDir, sourceName);
        factoriesSrcDir = path_1.default.join(typechainDir, 'factories', sourceName);
    }
    else {
        srcDir = path_1.default.join(typechainDir, contractSrcDir);
        factoriesSrcDir = path_1.default.join(typechainDir, 'factories', contractSrcDir);
    }
    const typesDir = path_1.default.join(hardhat_1.config.paths.deployments, getNetworkName(), 'types');
    const destDir = path_1.default.join(typesDir, contractSrcDir);
    const factoriesDestDir = path_1.default.join(typesDir, 'factories', contractSrcDir);
    if (!fs_1.default.existsSync(destDir)) {
        fs_1.default.mkdirSync(destDir, { recursive: true });
    }
    if (!fs_1.default.existsSync(factoriesDestDir)) {
        fs_1.default.mkdirSync(factoriesDestDir, { recursive: true });
    }
    // save the factory typechain
    fs_1.default.copyFileSync(path_1.default.join(factoriesSrcDir, `${contract}__factory.ts`), path_1.default.join(factoriesDestDir, `${name}__factory.ts`));
    // save the typechain of the contract itself
    fs_1.default.copyFileSync(path_1.default.join(srcDir, `${contract}.ts`), path_1.default.join(destDir, `${name}.ts`));
};
const PROXY_CONTRACT = 'OptimizedTransparentUpgradeableProxy';
const INITIALIZE = 'initialize';
const POST_UPGRADE = 'postUpgrade';
const WAIT_CONFIRMATIONS = (0, exports.isLive)() ? 2 : 1;
const logParams = async (params) => {
    const { name, contractName, contractArtifactData, methodName, args = [] } = params;
    if (!name && !contractArtifactData && !contractName) {
        throw new Error('Either name, contractArtifactData, or contractName must be provided!');
    }
    let contractInterface;
    if (name) {
        ({ interface: contractInterface } = await hardhat_1.ethers.getContract(name));
    }
    else if (contractArtifactData) {
        contractInterface = new ethers_1.utils.Interface(contractArtifactData.abi);
    }
    else {
        ({ interface: contractInterface } = await hardhat_1.ethers.getContractFactory(contractName));
    }
    const fragment = methodName ? contractInterface.getFunction(methodName) : contractInterface.deploy;
    Logger_1.default.log(`  ${methodName ?? 'constructor'} params: ${args.length === 0 ? '[]' : ''}`);
    if (args.length === 0) {
        return;
    }
    for (const [i, arg] of args.entries()) {
        const input = fragment.inputs[i];
        if (!input) {
            continue;
        }
        Logger_1.default.log(`    ${input.name} (${input.type}): ${arg?.toString()}`);
    }
};
const logTypedParams = async (methodName, params = []) => {
    Logger_1.default.log(`  ${methodName} params: ${params.length === 0 ? '[]' : ''}`);
    if (params.length === 0) {
        return;
    }
    for (const { name, type, value } of params) {
        Logger_1.default.log(`    ${name} (${type}): ${value.toString()}`);
    }
};
const deploy = async (options) => {
    const { name, contract, from, value, args, contractArtifactData, proxy } = options;
    const isProxy = !!proxy;
    const contractName = contract ?? name;
    await (0, exports.fundAccount)(from);
    let proxyOptions = {};
    const customAlias = contractName === name ? '' : ` as ${name};`;
    if (isProxy) {
        const proxyAdmin = await exports.DeployedContracts.ProxyAdmin.deployed();
        proxyOptions = {
            proxyContract: PROXY_CONTRACT,
            owner: await proxyAdmin.owner(),
            viaAdminContract: exports.InstanceName.ProxyAdmin,
            execute: proxy.skipInitialization
                ? undefined
                : { init: { methodName: INITIALIZE, args: proxy.args ? proxy.args : [] } }
        };
        Logger_1.default.log(`  deploying proxy ${contractName}${customAlias}`);
    }
    else {
        Logger_1.default.log(`  deploying ${contractName}${customAlias}`);
    }
    await logParams({ contractName, contractArtifactData, args });
    const res = await deployContract(name, {
        contract: contractArtifactData ?? contractName,
        from,
        value,
        args,
        proxy: isProxy ? proxyOptions : undefined,
        waitConfirmations: WAIT_CONFIRMATIONS,
        log: true
    });
    if (!(isProxy && (0, exports.isLive)())) {
        const data = { name, contract: contractName };
        await saveTypes(data);
        await verifyTenderly({
            address: res.address,
            proxy: isProxy,
            implementation: isProxy ? res.implementation : undefined,
            ...data
        });
    }
    return res.address;
};
exports.deploy = deploy;
const deployProxy = async (options, proxy = {}) => (0, exports.deploy)({
    ...options,
    proxy
});
exports.deployProxy = deployProxy;
const upgradeProxy = async (options) => {
    const { name, contract, from, value, args, postUpgradeArgs, contractArtifactData } = options;
    const contractName = contract ?? name;
    await (0, exports.fundAccount)(from);
    const deployed = await exports.DeployedContracts[name].deployed();
    if (!deployed) {
        throw new Error(`Proxy ${name} can't be found!`);
    }
    const proxyAdmin = await exports.DeployedContracts.ProxyAdmin.deployed();
    const prevVersion = await deployed.version();
    let upgradeCallData;
    if (postUpgradeArgs && postUpgradeArgs.length) {
        const types = postUpgradeArgs.map(({ type }) => type);
        const values = postUpgradeArgs.map(({ value }) => value);
        const abiCoder = new AbiCoder();
        upgradeCallData = [abiCoder.encode(types, values)];
    }
    else {
        upgradeCallData = [Constants_1.ZERO_BYTES];
    }
    const proxyOptions = {
        proxyContract: PROXY_CONTRACT,
        owner: await proxyAdmin.owner(),
        viaAdminContract: exports.InstanceName.ProxyAdmin,
        execute: { onUpgrade: { methodName: POST_UPGRADE, args: upgradeCallData } }
    };
    Logger_1.default.log(`  upgrading proxy ${contractName} V${prevVersion}`);
    await logTypedParams(POST_UPGRADE, postUpgradeArgs);
    await logParams({ contractName, args });
    const res = await deployContract(name, {
        contract: contractArtifactData ?? contractName,
        from,
        value,
        args,
        proxy: proxyOptions,
        waitConfirmations: WAIT_CONFIRMATIONS,
        log: true
    });
    const newVersion = await deployed.version();
    Logger_1.default.log(`  upgraded proxy ${contractName} V${prevVersion} to V${newVersion}`);
    await verifyTenderly({
        name,
        contract: contractName,
        address: res.address,
        proxy: true,
        implementation: res.implementation
    });
    return res.address;
};
exports.upgradeProxy = upgradeProxy;
const execute = async (options) => {
    const { name, methodName, from, value, args } = options;
    const contract = await hardhat_1.ethers.getContract(name);
    Logger_1.default.info(`  executing ${name}.${methodName} (${contract.address})`);
    await (0, exports.fundAccount)(from);
    await logParams({ name, args, methodName });
    return executeTransaction(name, { from, value, waitConfirmations: WAIT_CONFIRMATIONS, log: true }, methodName, ...(args ?? []));
};
exports.execute = execute;
const initializeProxy = async (options) => {
    const { name, proxyName, args, from } = options;
    Logger_1.default.log(`  initializing proxy ${name}`);
    await (0, exports.execute)({
        name: proxyName,
        methodName: INITIALIZE,
        args,
        from
    });
    const { address } = await hardhat_1.ethers.getContract(proxyName);
    await (0, exports.save)({
        name,
        address,
        proxy: true,
        skipVerification: true
    });
    return address;
};
exports.initializeProxy = initializeProxy;
const setRole = async (options, methodName) => {
    const { name, id, from, member } = options;
    return (0, exports.execute)({
        name,
        methodName,
        args: [id, member],
        from
    });
};
const grantRole = async (options) => setRole(options, 'grantRole');
exports.grantRole = grantRole;
const revokeRole = async (options) => setRole(options, 'revokeRole');
exports.revokeRole = revokeRole;
const renounceRole = async (options) => setRole({ member: options.from, ...options }, 'renounceRole');
exports.renounceRole = renounceRole;
const save = async (deployment) => {
    const { name, contract, address, proxy, skipVerification } = deployment;
    const contractName = contract ?? name;
    const { abi } = await getExtendedArtifact(contractName);
    // save the deployment json data in the deployments folder
    await saveContract(name, { abi, address });
    if (proxy) {
        const { abi } = await getExtendedArtifact(PROXY_CONTRACT);
        await saveContract(`${name}_Proxy`, { abi, address });
    }
    // publish the contract to a tenderly fork / testnet
    if (!skipVerification) {
        await verifyTenderly(deployment);
    }
};
exports.save = save;
const verifyTenderly = async (deployment) => {
    // verify contracts only on tenderly
    if (!(0, exports.isTenderly)()) {
        return;
    }
    const { name, contract, address, proxy, implementation } = deployment;
    let contractAddress = address;
    const contracts = [];
    if (proxy) {
        contracts.push({
            name: PROXY_CONTRACT,
            address
        });
        contractAddress = implementation;
    }
    contracts.push({
        name: contract ?? name,
        address: contractAddress
    });
    for (const contract of contracts) {
        Logger_1.default.log('  verifying on tenderly', contract.name, 'at', contract.address);
        await hardhat_1.tenderly.verify(contract);
    }
};
const deploymentTagExists = (tag) => {
    const externalDeployments = hardhat_1.config.external?.deployments[getNetworkName()];
    const migrationsPath = path_1.default.resolve(__dirname, '../', externalDeployments ? externalDeployments[0] : path_1.default.join('deployments', getNetworkName()), '.migrations.json');
    if (!fs_1.default.existsSync(migrationsPath)) {
        return false;
    }
    const migrations = JSON.parse(fs_1.default.readFileSync(migrationsPath, 'utf-8'));
    const tags = Object.keys(migrations).map((tag) => deploymentFileNameToTag(tag));
    return tags.includes(tag);
};
exports.deploymentTagExists = deploymentTagExists;
const deploymentFileNameToTag = (filename) => Number(path_1.default.basename(filename).split('-')[0]).toString();
const getPreviousDeploymentTag = (tag) => {
    const dir = path_1.default.join(hardhat_1.config.paths.deploy[0], (0, exports.getNetworkNameById)(networkId));
    const files = fs_1.default.readdirSync(dir).sort();
    const index = files.map((f) => deploymentFileNameToTag(f)).lastIndexOf(tag);
    if (index === -1) {
        throw new Error(`Unable to find deployment with tag ${tag}`);
    }
    return index === 0 ? undefined : deploymentFileNameToTag(files[index - 1]);
};
exports.getPreviousDeploymentTag = getPreviousDeploymentTag;
const getLatestDeploymentTag = () => {
    const dir = path_1.default.join(hardhat_1.config.paths.deploy[0], (0, exports.getNetworkNameById)(networkId));
    const files = fs_1.default.readdirSync(dir).sort();
    return Number(files[files.length - 1].split('-')[0]).toString();
};
exports.getLatestDeploymentTag = getLatestDeploymentTag;
const deploymentMetadata = (filename) => {
    const id = path_1.default.basename(filename).split('.')[0];
    const tag = deploymentFileNameToTag(filename);
    const prevTag = (0, exports.getPreviousDeploymentTag)(tag);
    return {
        id,
        tag,
        dependency: prevTag
    };
};
exports.deploymentMetadata = deploymentMetadata;
const setDeploymentMetadata = (filename, func) => {
    const { id, tag, dependency } = (0, exports.deploymentMetadata)(filename);
    func.id = id;
    func.tags = [tag];
    func.dependencies = dependency ? [dependency] : undefined;
    return func;
};
exports.setDeploymentMetadata = setDeploymentMetadata;
const runPendingDeployments = async () => {
    const { tag } = (0, exports.deploymentMetadata)((0, exports.getLatestDeploymentTag)());
    return run(tag, {
        resetMemory: false,
        deletePreviousDeployments: false,
        writeDeploymentsToFiles: true
    });
};
exports.runPendingDeployments = runPendingDeployments;
const getNetworkNameById = (networkId) => {
    if (networkId === undefined) {
        return Constants_1.DeploymentNetwork.Mainnet;
    }
    // Find the network name by its ID
    const networkName = Object.keys(chainIds_json_1.default).find((key) => chainIds_json_1.default[key] === networkId);
    if (!networkName) {
        throw new Error(`Cannot find network with id: ${networkId}`);
    }
    return networkName;
};
exports.getNetworkNameById = getNetworkNameById;
const getInstanceNameByAddress = (address) => {
    const externalDeployments = hardhat_1.config.external?.deployments[getNetworkName()];
    const deploymentsPath = externalDeployments ? externalDeployments[0] : path_1.default.join('deployments', getNetworkName());
    const deploymentPaths = glob_1.default.sync(`${deploymentsPath}/**/*.json`);
    for (const deploymentPath of deploymentPaths) {
        const name = path_1.default.basename(deploymentPath).split('.')[0];
        if (name.endsWith('_Proxy')) {
            continue;
        }
        const deployment = JSON.parse(fs_1.default.readFileSync(deploymentPath, 'utf-8'));
        if (deployment.address.toLowerCase() === address.toLowerCase()) {
            return name;
        }
    }
    throw new Error(`Unable to find deployment for ${address}`);
};
exports.getInstanceNameByAddress = getInstanceNameByAddress;
const describeDeployment = (filename, fn, options = {}) => {
    const { id, tag } = (0, exports.deploymentMetadata)(filename);
    const { skip = () => false, beforeDeployments = () => Promise.resolve() } = options;
    // if we're running against a mainnet fork, ensure to skip tests for already existing deployments
    if (skip() || (0, exports.deploymentTagExists)(tag)) {
        return describe.skip(id, fn);
    }
    return describe(id, async function () {
        before(async () => {
            if ((0, exports.isLive)()) {
                throw new Error('Unsupported network');
            }
            await beforeDeployments();
        });
        beforeEach(async () => {
            if ((0, exports.isLive)()) {
                throw new Error('Unsupported network');
            }
            return run(tag, {
                resetMemory: false,
                deletePreviousDeployments: false,
                writeDeploymentsToFiles: true
            });
        });
        fn.apply(this);
    });
};
exports.describeDeployment = describeDeployment;
//# sourceMappingURL=Deploy.js.map