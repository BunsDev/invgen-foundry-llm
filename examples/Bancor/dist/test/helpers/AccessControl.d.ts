import { AccessControlEnumerableUpgradeable } from '../../components/Contracts';
import { RoleIds } from '../../utils/Roles';
export * from '../../utils/Roles';
export declare const expectRole: (contract: AccessControlEnumerableUpgradeable, roleId: (typeof RoleIds)[number], adminRole: string, members?: string[]) => Promise<void>;
export declare const expectRoleMembers: (contract: AccessControlEnumerableUpgradeable, roleId: (typeof RoleIds)[number], members?: string[]) => Promise<void>;
export declare const expectRoles: (contract: AccessControlEnumerableUpgradeable, roles: Record<string, (typeof RoleIds)[number]>) => Promise<void>;
//# sourceMappingURL=AccessControl.d.ts.map