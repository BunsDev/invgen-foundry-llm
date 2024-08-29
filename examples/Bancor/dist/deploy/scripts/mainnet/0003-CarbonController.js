"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../../../utils/Constants");
const Deploy_1 = require("../../../utils/Deploy");
const Roles_1 = require("../../../utils/Roles");
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
    await (0, Deploy_1.grantRole)({
        name: Deploy_1.InstanceName.Voucher,
        id: Roles_1.Roles.Voucher.ROLE_MINTER,
        member: carbonController.address,
        from: deployer
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0003-CarbonController.js.map