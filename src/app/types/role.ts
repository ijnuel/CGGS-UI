export interface PermissionInterface {
  controller: string;
  action: string;
  permission: string;
}

export interface RoleWithPermissionsInterface {
  id: string;
  name: string;
  permissions: string[];
}

export interface RoleCreateInterface {
  name: string;
}

export interface RoleUpdateInterface {
  id: string;
  name: string;
}

export interface RolePermissionAssignInterface {
  roleId: string;
  permissions: string[];
}

export interface UserRoleInterface {
  userId: string;
  roleId: string;
}
