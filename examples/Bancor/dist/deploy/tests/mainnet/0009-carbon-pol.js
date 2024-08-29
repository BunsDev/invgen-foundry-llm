"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../../utils/Types");
const Deploy_1 = require("../../../utils/Deploy");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
(0, Deploy_1.describeDeployment)(__filename, () => {
    let proxyAdmin;
    let carbonPOL;
    beforeEach(async () => {
        proxyAdmin = await Deploy_1.DeployedContracts.ProxyAdmin.deployed();
        carbonPOL = await Deploy_1.DeployedContracts.CarbonPOL.deployed();
    });
    it('should deploy and configure the carbon pol contract', async () => {
        (0, chai_1.expect)(await proxyAdmin.getProxyAdmin(carbonPOL.address)).to.equal(proxyAdmin.address);
        (0, chai_1.expect)(await carbonPOL.version()).to.equal(2);
        // check market price multiply is configured correctly
        (0, chai_1.expect)(await carbonPOL.marketPriceMultiply()).to.equal(2);
        // check price decay half-life is configured correctly
        (0, chai_1.expect)(await carbonPOL.priceDecayHalfLife()).to.equal(864000);
        // check eth sale amount is configured correctly
        (0, chai_1.expect)((await carbonPOL.ethSaleAmount()).initial).to.equal((0, Types_1.toWei)(100));
        // check min eth sale amount is configured correctly
        (0, chai_1.expect)(await carbonPOL.minEthSaleAmount()).to.equal((0, Types_1.toWei)(10));
    });
    it('carbon pol implementation should be initialized', async () => {
        const implementationAddress = await proxyAdmin.getProxyImplementation(carbonPOL.address);
        const carbonPOLImpl = await hardhat_1.ethers.getContractAt('CarbonPOL', implementationAddress);
        // hardcoding gas limit to avoid gas estimation attempts (which get rejected instead of reverted)
        const tx = await carbonPOLImpl.initialize({ gasLimit: 6000000 });
        await (0, chai_1.expect)(tx.wait()).to.be.reverted;
    });
});
//# sourceMappingURL=0009-carbon-pol.js.map