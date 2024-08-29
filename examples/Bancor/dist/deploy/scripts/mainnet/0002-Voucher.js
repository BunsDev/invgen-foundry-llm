"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const Constants_1 = require("../../../utils/Constants");
const func = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    await (0, Deploy_1.deployProxy)({
        name: Deploy_1.InstanceName.Voucher,
        from: deployer
    }, {
        args: [true, Constants_1.VOUCHER_URI, '']
    });
    return true;
};
exports.default = (0, Deploy_1.setDeploymentMetadata)(__filename, func);
//# sourceMappingURL=0002-Voucher.js.map