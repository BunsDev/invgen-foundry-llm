"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldHaveGap = void 0;
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const lodash_1 = require("lodash");
const GAP_LABEL = '__gap';
const MAX_GAP_SIZE = 50;
const GAP_SIZE_REGEXP = /\(t_uint256\)(.*?)_storage/i;
// verifies that an upgradeable contract has properly defined its forward-compatibility storage gap and that its whole
// contract-level specific storage equals exactly to the MAX_GAP_SIZE slots
const shouldHaveGap = (contractName, firstStateVariable) => {
    it(`${contractName} should have only ${MAX_GAP_SIZE} contract-level specific storage slots`, async () => {
        const extendedArtifact = await hardhat_1.deployments.getExtendedArtifact(contractName);
        const { storageLayout: { storage } } = extendedArtifact;
        const indexOfLast = storage.length - 1;
        const lastStorage = storage[indexOfLast];
        (0, chai_1.expect)(lastStorage.label).to.equal(GAP_LABEL);
        // extract the length of the gap from the spec. For example, for the type "t_array(t_uint256)49_storage", the
        // size of the gap is 49
        const gapSize = Number(lastStorage.type.match(GAP_SIZE_REGEXP)[1]);
        if (firstStateVariable) {
            // if the contract defines any contract-level specific storage - calculate the total number of
            // used slots and make sure that it equals exactly to the MAX_GAP_SIZE slots
            const firstStorage = (0, lodash_1.findLast)(storage, (data) => data.label === firstStateVariable);
            (0, chai_1.expect)(lastStorage.slot - firstStorage.slot + gapSize).to.equal(MAX_GAP_SIZE);
        }
        else {
            // if the contract doesn't define any contract-level specific storage variables (while can still inherit the
            // state of other contracts) - we should only expect the __gap state variable and that's it
            (0, chai_1.expect)(gapSize).to.be.equal(MAX_GAP_SIZE);
        }
    });
};
exports.shouldHaveGap = shouldHaveGap;
//# sourceMappingURL=Proxy.js.map