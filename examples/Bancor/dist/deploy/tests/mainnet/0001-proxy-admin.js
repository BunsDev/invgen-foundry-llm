"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
(0, Deploy_1.describeDeployment)(__filename, () => {
    let deployer;
    let proxyAdmin;
    before(async () => {
        ({ deployer } = await (0, hardhat_1.getNamedAccounts)());
    });
    beforeEach(async () => {
        proxyAdmin = await Deploy_1.DeployedContracts.ProxyAdmin.deployed();
    });
    it('should deploy and configure the proxy admin contract', async () => {
        await (0, chai_1.expect)(await proxyAdmin.owner()).to.equal(deployer);
    });
});
//# sourceMappingURL=0001-proxy-admin.js.map