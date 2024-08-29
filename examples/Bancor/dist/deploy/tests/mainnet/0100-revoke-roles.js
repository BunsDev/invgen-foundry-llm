"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const Roles_1 = require("../../../utils/Roles");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
(0, Deploy_1.describeDeployment)(__filename, () => {
    let deployer;
    let daoMultisig;
    beforeEach(async () => {
        ({ deployer, daoMultisig } = await (0, hardhat_1.getNamedAccounts)());
    });
    it('should revoke deployer roles', async () => {
        // get contracts
        const carbon = (await Deploy_1.DeployedContracts.CarbonController.deployed());
        const voucher = (await Deploy_1.DeployedContracts.Voucher.deployed());
        const carbonVortex = (await Deploy_1.DeployedContracts.CarbonVortex.deployed());
        // expect dao multisig to have the admin role for all contracts
        (0, chai_1.expect)(await carbon.hasRole(Roles_1.Roles.Upgradeable.ROLE_ADMIN, daoMultisig)).to.be.true;
        (0, chai_1.expect)(await voucher.hasRole(Roles_1.Roles.Upgradeable.ROLE_ADMIN, daoMultisig)).to.be.true;
        (0, chai_1.expect)(await carbonVortex.hasRole(Roles_1.Roles.Upgradeable.ROLE_ADMIN, daoMultisig)).to.be.true;
        // expect deployer not to have the admin role for any contracts
        (0, chai_1.expect)(await carbon.hasRole(Roles_1.Roles.Upgradeable.ROLE_ADMIN, deployer)).to.be.false;
        (0, chai_1.expect)(await voucher.hasRole(Roles_1.Roles.Upgradeable.ROLE_ADMIN, deployer)).to.be.false;
        (0, chai_1.expect)(await carbonVortex.hasRole(Roles_1.Roles.Upgradeable.ROLE_ADMIN, deployer)).to.be.false;
        // expect deployer not to have the fee manager role
        (0, chai_1.expect)(await carbon.hasRole(Roles_1.Roles.CarbonController.ROLE_FEES_MANAGER, deployer)).to.be.false;
    });
}, { skip: Deploy_1.isLive });
//# sourceMappingURL=0100-revoke-roles.js.map