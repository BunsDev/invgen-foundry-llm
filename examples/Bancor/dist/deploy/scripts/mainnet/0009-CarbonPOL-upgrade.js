"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const Types_1 = require("../../../utils/Types");
const func = async ({ getNamedAccounts }) => {
    const { deployer, bnt } = await getNamedAccounts();
    await (0, Deploy_1.upgradeProxy)({
        name: Deploy_1.InstanceName.CarbonPOL,
        from: deployer,
        args: [bnt]
    });
    // Set ETH sale amount to 100 ether
    await (0, Deploy_1.execute)({
        name: Deploy_1.InstanceName.CarbonPOL,
        methodName: 'setEthSaleAmount',
        args: [(0, Types_1.toWei)(100)],
        from: deployer
    });
    // Set min ETH sale amount to 10 ether
    await (0, Deploy_1.execute)({
        name: Deploy_1.InstanceName.CarbonPOL,
        methodName: 'setMinEthSaleAmount',
        args: [(0, Types_1.toWei)(10)],
        from: deployer
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0009-CarbonPOL-upgrade.js.map