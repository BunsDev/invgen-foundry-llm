"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contracts_1 = __importDefault(require("../../components/Contracts"));
const AccessControl_1 = require("../helpers/AccessControl");
const Proxy_1 = require("../helpers/Proxy");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe('Upgradeable', () => {
    let admin;
    let nonAdmin;
    let upgradeable;
    (0, Proxy_1.shouldHaveGap)('Upgradeable', '_initializations');
    before(async () => {
        [admin, nonAdmin] = await hardhat_1.ethers.getSigners();
    });
    beforeEach(async () => {
        upgradeable = await Contracts_1.default.TestUpgradeable.deploy();
        await upgradeable.initialize();
    });
    describe('construction', () => {
        it('should revert when attempting to reinitialize', async () => {
            await (0, chai_1.expect)(upgradeable.initialize()).to.be.revertedWithError('Initializable: contract is already initialized');
        });
        it('should be properly initialized', async () => {
            (0, chai_1.expect)(await upgradeable.version()).to.equal(1);
            (0, chai_1.expect)(await upgradeable.initializations()).to.equal(1);
            await (0, AccessControl_1.expectRoles)(upgradeable, AccessControl_1.Roles.Upgradeable);
            await (0, AccessControl_1.expectRole)(upgradeable, AccessControl_1.Roles.Upgradeable.ROLE_ADMIN, AccessControl_1.Roles.Upgradeable.ROLE_ADMIN, [admin.address]);
        });
        it('should revert when a non-admin is attempting to call a restricted function', async () => {
            await (0, chai_1.expect)(upgradeable.connect(nonAdmin).restricted()).to.be.revertedWithError('AccessDenied');
        });
    });
    describe('upgrade callbacks', () => {
        context('incremented version', () => {
            beforeEach(async () => {
                await upgradeable.setVersion((await upgradeable.version()) + 1);
            });
            it('should allow executing the post-upgrade callback', async () => {
                await (0, chai_1.expect)(upgradeable.postUpgrade([])).not.to.be.reverted;
                await upgradeable.setVersion((await upgradeable.version()) + 1);
                await (0, chai_1.expect)(upgradeable.postUpgrade([])).not.to.be.reverted;
            });
            it('should not allow executing the post-upgrade callback twice per-version', async () => {
                await (0, chai_1.expect)(upgradeable.postUpgrade([])).not.to.be.reverted;
                await (0, chai_1.expect)(upgradeable.postUpgrade([])).to.be.revertedWithError('AlreadyInitialized');
            });
        });
        context('wrong version', () => {
            for (const diff of [0, 10]) {
                context(`diff ${diff}`, () => {
                    beforeEach(async () => {
                        await upgradeable.setVersion((await upgradeable.version()) + diff);
                    });
                });
                it('should revert when attempting to execute the post-upgrade callback', async () => {
                    await (0, chai_1.expect)(upgradeable.postUpgrade([])).to.be.revertedWithError('AlreadyInitialized');
                });
            }
        });
    });
});
//# sourceMappingURL=Upgradeable.js.map