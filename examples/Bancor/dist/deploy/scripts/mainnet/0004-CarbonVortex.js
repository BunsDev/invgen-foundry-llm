"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const Roles_1 = require("../../../utils/Roles");
const func = async ({ getNamedAccounts }) => {
    const { deployer, bnt, bancorNetworkV3 } = await getNamedAccounts();
    const carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
    await (0, Deploy_1.deployProxy)({
        name: Deploy_1.InstanceName.CarbonVortex,
        from: deployer,
        args: [bnt, carbonController.address, bancorNetworkV3]
    });
    const carbonVortex = await Deploy_1.DeployedContracts.CarbonVortex.deployed();
    await (0, Deploy_1.grantRole)({
        name: Deploy_1.InstanceName.CarbonController,
        id: Roles_1.Roles.CarbonController.ROLE_FEES_MANAGER,
        member: carbonVortex.address,
        from: deployer
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0004-CarbonVortex.js.map