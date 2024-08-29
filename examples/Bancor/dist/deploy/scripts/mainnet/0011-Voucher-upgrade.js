"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
/**
 * @dev voucher immutability upgrade - replace minter role with controller role
 */
const func = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    await (0, Deploy_1.upgradeProxy)({
        name: Deploy_1.InstanceName.Voucher,
        from: deployer,
        args: []
    });
    const controller = await Deploy_1.DeployedContracts.CarbonController.deployed();
    // Set the carbon controller address in the voucher contract
    await (0, Deploy_1.execute)({
        name: Deploy_1.InstanceName.Voucher,
        methodName: 'setController',
        args: [controller.address],
        from: deployer
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0011-Voucher-upgrade.js.map