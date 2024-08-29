"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deploy_1 = require("../../../utils/Deploy");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
/**
 * @dev Voucher immutability upgrade - replace minter role with controller
 */
(0, Deploy_1.describeDeployment)(__filename, () => {
    let proxyAdmin;
    let voucher;
    let deployer;
    beforeEach(async () => {
        ({ deployer } = await (0, Deploy_1.getNamedSigners)());
        proxyAdmin = await Deploy_1.DeployedContracts.ProxyAdmin.deployed();
        voucher = await Deploy_1.DeployedContracts.Voucher.deployed();
    });
    it('should deploy and configure the voucher contract', async () => {
        (0, chai_1.expect)(await proxyAdmin.getProxyAdmin(voucher.address)).to.equal(proxyAdmin.address);
        (0, chai_1.expect)(await voucher.version()).to.equal(2);
    });
    it('voucher implementation should be initialized', async () => {
        const implementationAddress = await proxyAdmin.getProxyImplementation(voucher.address);
        const voucherImpl = await hardhat_1.ethers.getContractAt('Voucher', implementationAddress);
        // hardcoding gas limit to avoid gas estimation attempts (which get rejected instead of reverted)
        const tx = await voucherImpl.initialize(true, '1', '1', { gasLimit: 6000000 });
        await (0, chai_1.expect)(tx.wait()).to.be.reverted;
    });
    it("admin shouldn't be able to change controller address", async () => {
        // hardcoding gas limit to avoid gas estimation attempts (which get rejected instead of reverted)
        const tx = await voucher.connect(deployer).setController(deployer.address, { gasLimit: 6000000 });
        await (0, chai_1.expect)(tx.wait()).to.be.reverted;
    });
});
//# sourceMappingURL=0011-voucher-upgrade.js.map