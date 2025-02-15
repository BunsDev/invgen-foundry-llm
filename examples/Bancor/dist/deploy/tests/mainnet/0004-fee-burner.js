"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
(0, Deploy_1.describeDeployment)(__filename, () => {
    let proxyAdmin;
    let carbonController;
    let carbonVortex;
    beforeEach(async () => {
        proxyAdmin = await Deploy_1.DeployedContracts.ProxyAdmin.deployed();
        carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
        carbonVortex = await Deploy_1.DeployedContracts.CarbonVortex.deployed();
    });
    it('should deploy and configure the fee burner contract', async () => {
        (0, chai_1.expect)(await proxyAdmin.getProxyAdmin(carbonVortex.address)).to.equal(proxyAdmin.address);
        (0, chai_1.expect)(await carbonVortex.version()).to.equal(1);
        // check that the fee burner is the fee manager
        const role = await carbonController.roleFeesManager();
        const roleMembers = await carbonController.getRoleMemberCount(role);
        const feeManagers = [];
        for (let i = 0; i < roleMembers.toNumber(); ++i) {
            const feeManagerAddress = await carbonController.getRoleMember(role, i);
            feeManagers.push(feeManagerAddress);
        }
        (0, chai_1.expect)(feeManagers.includes(carbonVortex.address)).to.be.true;
    });
    it('fee burner implementation should be initialized', async () => {
        const implementationAddress = await proxyAdmin.getProxyImplementation(carbonVortex.address);
        const carbonVortexImpl = await hardhat_1.ethers.getContractAt('CarbonVortex', implementationAddress);
        // hardcoding gas limit to avoid gas estimation attempts (which get rejected instead of reverted)
        const tx = await carbonVortexImpl.initialize({ gasLimit: 6000000 });
        await (0, chai_1.expect)(tx.wait()).to.be.reverted;
    });
});
//# sourceMappingURL=0004-fee-burner.js.map