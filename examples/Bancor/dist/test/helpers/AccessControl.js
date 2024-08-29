"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectRoles = exports.expectRoleMembers = exports.expectRole = void 0;
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const lodash_1 = require("lodash");
const { id } = ethers_1.utils;
__exportStar(require("../../utils/Roles"), exports);
const expectRole = async (contract, roleId, adminRole, members = []) => {
    (0, chai_1.expect)(await contract.getRoleAdmin(roleId)).to.equal(adminRole);
    await (0, exports.expectRoleMembers)(contract, roleId, members);
};
exports.expectRole = expectRole;
const expectRoleMembers = async (contract, roleId, members = []) => {
    const actualMembers = [];
    const memberCount = (await contract.getRoleMemberCount(roleId)).toNumber();
    for (let i = 0; i < memberCount; i++) {
        actualMembers.push(await contract.getRoleMember(roleId, i));
    }
    (0, chai_1.expect)(actualMembers).to.have.lengthOf(members.length);
    (0, chai_1.expect)(actualMembers).to.have.members(members);
};
exports.expectRoleMembers = expectRoleMembers;
const expectRoles = async (contract, roles) => {
    const expectedRoles = Object.keys(roles).map((name) => ({
        methodName: (0, lodash_1.camelCase)(name),
        id: id(name)
    }));
    for (const { methodName, id } of expectedRoles) {
        const method = contract[methodName];
        (0, chai_1.expect)(await method()).to.equal(id);
    }
};
exports.expectRoles = expectRoles;
//# sourceMappingURL=AccessControl.js.map