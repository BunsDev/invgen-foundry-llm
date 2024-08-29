"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
(0, Deploy_1.describeDeployment)(__filename, () => {
    let proxyAdmin;
    let carbonController;
    beforeEach(async () => {
        proxyAdmin = await Deploy_1.DeployedContracts.ProxyAdmin.deployed();
        carbonController = await Deploy_1.DeployedContracts.CarbonController.deployed();
    });
    it('should deploy and configure the carbon controller contract', async () => {
        (0, chai_1.expect)(await proxyAdmin.getProxyAdmin(carbonController.address)).to.equal(proxyAdmin.address);
        (0, chai_1.expect)(await carbonController.version()).to.equal(2);
    });
    it('carbon controller implementation should be initialized', async () => {
        const implementationAddress = await proxyAdmin.getProxyImplementation(carbonController.address);
        const carbonControllerImpl = await hardhat_1.ethers.getContractAt('CarbonController', implementationAddress);
        // hardcoding gas limit to avoid gas estimation attempts (which get rejected instead of reverted)
        const tx = await carbonControllerImpl.initialize({ gasLimit: 6000000 });
        await (0, chai_1.expect)(tx.wait()).to.be.reverted;
    });
});
//# sourceMappingURL=0003-carbon-controller.js.map