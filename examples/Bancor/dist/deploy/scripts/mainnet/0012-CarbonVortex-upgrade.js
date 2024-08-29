"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
// carbon vortex withdraw funds upgrade
const func = async ({ getNamedAccounts }) => {
    const { deployer, bnt, bancorNetworkV3 } = await getNamedAccounts();
    const carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
    await (0, Deploy_1.upgradeProxy)({
        name: Deploy_1.InstanceName.CarbonVortex,
        from: deployer,
        args: [bnt, carbonController.address, bancorNetworkV3]
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0012-CarbonVortex-upgrade.js.map