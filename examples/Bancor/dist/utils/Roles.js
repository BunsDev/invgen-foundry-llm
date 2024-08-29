"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleIds = exports.Roles = void 0;
const ethers_1 = require("ethers");
const { id } = ethers_1.utils;
exports.Roles = {
    Upgradeable: {
        ROLE_ADMIN: id('ROLE_ADMIN')
    },
    CarbonController: {
        ROLE_FEES_MANAGER: id('ROLE_FEES_MANAGER')
    },
    Voucher: {
        ROLE_MINTER: id('ROLE_MINTER')
    }
};
exports.RoleIds = Object.values(exports.Roles)
    .map((contractRoles) => Object.values(contractRoles))
    .flat(1);
//# sourceMappingURL=Roles.js.map