"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenData_1 = require("../../../utils/TokenData");
const Deploy_1 = require("../../../utils/Deploy");
const Roles_1 = require("../../../utils/Roles");
/**
 * deploy a new instance of carbon vortex v2.0 with the following configuration:
 *
 * 1. target token is ETH
 * 2. final target token is BNT
 * 3. transferAddress is BNT (will burn BNT tokens on ETH -> BNT trades)
 * 4. CarbonController and Vortex 1.0 are set as withdraw addresses (on execute, tokens will be withdrawn from both)
 */
const func = async ({ getNamedAccounts }) => {
    const { deployer, bnt, vault, oldVortex } = await getNamedAccounts();
    const carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
    await (0, Deploy_1.deployProxy)({
        name: Deploy_1.InstanceName.CarbonVortex,
        from: deployer,
        args: [carbonController.address, vault, oldVortex, bnt, TokenData_1.NATIVE_TOKEN_ADDRESS, bnt]
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
//# sourceMappingURL=0015-CarbonVortex.js.map