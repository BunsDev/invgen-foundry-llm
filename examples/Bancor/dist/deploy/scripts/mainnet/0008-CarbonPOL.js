"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const func = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    await (0, Deploy_1.deployProxy)({
        name: Deploy_1.InstanceName.CarbonPOL,
        from: deployer,
        args: []
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0008-CarbonPOL.js.map