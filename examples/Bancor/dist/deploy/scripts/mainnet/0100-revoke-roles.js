"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const Roles_1 = require("../../../utils/Roles");
const func = async ({ getNamedAccounts }) => {
    const { deployer, daoMultisig } = await getNamedAccounts();
    // Grant CarbonController admin roles to dao multisig
    await (0, Deploy_1.grantRole)({
        name: Deploy_1.InstanceName.CarbonController,
        id: Roles_1.Roles.Upgradeable.ROLE_ADMIN,
        member: daoMultisig,
        from: deployer
    });
    await (0, Deploy_1.renounceRole)({
        name: Deploy_1.InstanceName.CarbonController,
        id: Roles_1.Roles.Upgradeable.ROLE_ADMIN,
        from: deployer
    });
    // Grant Voucher admin roles to dao multisig
    await (0, Deploy_1.grantRole)({
        name: Deploy_1.InstanceName.Voucher,
        id: Roles_1.Roles.Upgradeable.ROLE_ADMIN,
        member: daoMultisig,
        from: deployer
    });
    await (0, Deploy_1.renounceRole)({
        name: Deploy_1.InstanceName.Voucher,
        id: Roles_1.Roles.Upgradeable.ROLE_ADMIN,
        from: deployer
    });
    // Grant CarbonVortex admin roles to dao multisig
    await (0, Deploy_1.grantRole)({
        name: Deploy_1.InstanceName.CarbonVortex,
        id: Roles_1.Roles.Upgradeable.ROLE_ADMIN,
        member: daoMultisig,
        from: deployer
    });
    await (0, Deploy_1.renounceRole)({
        name: Deploy_1.InstanceName.CarbonVortex,
        id: Roles_1.Roles.Upgradeable.ROLE_ADMIN,
        from: deployer
    });
    // renounce CarbonController's ROLE_FEES_MANAGER role from the deployer
    await (0, Deploy_1.renounceRole)({
        name: Deploy_1.InstanceName.CarbonController,
        id: Roles_1.Roles.CarbonController.ROLE_FEES_MANAGER,
        from: deployer
    });
    return true;
};
// postpone the execution of this script to the end of the beta
func.skip = async () => (0, Deploy_1.isLive)();
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0100-revoke-roles.js.map