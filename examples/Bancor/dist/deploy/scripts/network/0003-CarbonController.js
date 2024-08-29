"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../../../utils/Constants");
const Deploy_1 = require("../../../utils/Deploy");
const func = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const voucher = await Deploy_1.DeployedContracts.Voucher.deployed();
    await (0, Deploy_1.deployProxy)({
        name: Deploy_1.InstanceName.CarbonController,
        from: deployer,
        args: [voucher.address, Constants_1.ZERO_ADDRESS]
    });
    // immediate upgrade is required to set the proxy address in OnlyProxyDelegate
    const carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
    await (0, Deploy_1.upgradeProxy)({
        name: Deploy_1.InstanceName.CarbonController,
        from: deployer,
        args: [voucher.address, carbonController.address]
    });
    // Set the carbon controller address in the voucher contract
    await (0, Deploy_1.execute)({
        name: Deploy_1.InstanceName.Voucher,
        methodName: 'setController',
        args: [carbonController.address],
        from: deployer
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0003-CarbonController.js.map