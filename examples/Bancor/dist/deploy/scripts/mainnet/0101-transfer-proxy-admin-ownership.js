"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const func = async ({ getNamedAccounts }) => {
    const { deployer, daoMultisig } = await getNamedAccounts();
    await (0, Deploy_1.execute)({
        name: Deploy_1.InstanceName.ProxyAdmin,
        methodName: 'transferOwnership',
        args: [daoMultisig],
        from: deployer
    });
    return true;
};
// postpone the execution of this script to the end of the beta
func.skip = async () => (0, Deploy_1.isLive)();
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0101-transfer-proxy-admin-ownership.js.map