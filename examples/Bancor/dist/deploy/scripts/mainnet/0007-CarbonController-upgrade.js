"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
/**
 * @dev custom trading fees upgrade
 */
const func = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const voucher = await Deploy_1.DeployedContracts.Voucher.deployed();
    const carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
    await (0, Deploy_1.upgradeProxy)({
        name: Deploy_1.InstanceName.CarbonController,
        from: deployer,
        args: [voucher.address, carbonController.address]
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0007-CarbonController-upgrade.js.map