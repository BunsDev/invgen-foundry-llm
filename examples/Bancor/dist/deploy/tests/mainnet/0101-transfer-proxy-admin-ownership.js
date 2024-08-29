"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
(0, Deploy_1.describeDeployment)(__filename, () => {
    let daoMultisig;
    let proxyAdmin;
    before(async () => {
        ({ daoMultisig } = await (0, hardhat_1.getNamedAccounts)());
    });
    beforeEach(async () => {
        proxyAdmin = await Deploy_1.DeployedContracts.ProxyAdmin.deployed();
    });
    it('should transfer the ownership of the proxy admin contract', async () => {
        (0, chai_1.expect)(await proxyAdmin.owner()).to.equal(daoMultisig);
    });
}, { skip: Deploy_1.isLive });
//# sourceMappingURL=0101-transfer-proxy-admin-ownership.js.map