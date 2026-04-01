import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  RoleWithPermissionsInterface,
  RoleCreateInterface,
  RoleUpdateInterface,
  PermissionInterface,
  RolePermissionAssignInterface,
  UserRoleInterface,
} from '../../types';

// Get All Roles
export const getRoleAll = createAction('[Role] Get All');

export const getRoleAllSuccess = createAction(
  '[Role/API] Get All Success',
  props<{
    payload: GenericResponseInterface<RoleWithPermissionsInterface[]>;
  }>()
);

export const getRoleAllFail = createAction(
  '[Role/API] Get All Fail',
  props<{ error: string }>()
);

// Get By Id
export const getRoleById = createAction(
  '[Role] Get By Id',
  props<{ roleId: string }>()
);

export const getRoleByIdSuccess = createAction(
  '[Role/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<RoleWithPermissionsInterface>;
  }>()
);

export const getRoleByIdFail = createAction(
  '[Role/API] Get By Id Fail',
  props<{ error: string }>()
);

// Create
export const createRole = createAction(
  '[Role] Create',
  props<{ payload: RoleCreateInterface }>()
);

export const createRoleSuccess = createAction(
  '[Role/API] Create Success',
  props<{
    payload: GenericResponseInterface<string>;
  }>()
);

export const createRoleFail = createAction(
  '[Role/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateRole = createAction(
  '[Role] Update',
  props<{ payload: RoleUpdateInterface }>()
);

export const updateRoleSuccess = createAction(
  '[Role/API] Update Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const updateRoleFail = createAction(
  '[Role/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteRole = createAction(
  '[Role] Delete',
  props<{ roleId: string }>()
);

export const deleteRoleSuccess = createAction(
  '[Role/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteRoleFail = createAction(
  '[Role/API] Delete Fail',
  props<{ error: string }>()
);

// Get Permissions
export const getPermissions = createAction('[Role] Get Permissions');

export const getPermissionsSuccess = createAction(
  '[Role/API] Get Permissions Success',
  props<{
    payload: GenericResponseInterface<PermissionInterface[]>;
  }>()
);

export const getPermissionsFail = createAction(
  '[Role/API] Get Permissions Fail',
  props<{ error: string }>()
);

// Assign Permissions
export const assignPermissions = createAction(
  '[Role] Assign Permissions',
  props<{ payload: RolePermissionAssignInterface }>()
);

export const assignPermissionsSuccess = createAction(
  '[Role/API] Assign Permissions Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const assignPermissionsFail = createAction(
  '[Role/API] Assign Permissions Fail',
  props<{ error: string }>()
);

// Remove Permissions
export const removePermissions = createAction(
  '[Role] Remove Permissions',
  props<{ payload: RolePermissionAssignInterface }>()
);

export const removePermissionsSuccess = createAction(
  '[Role/API] Remove Permissions Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const removePermissionsFail = createAction(
  '[Role/API] Remove Permissions Fail',
  props<{ error: string }>()
);

// Get User Roles
export const getUserRoles = createAction(
  '[Role] Get User Roles',
  props<{ userId: string }>()
);

export const getUserRolesSuccess = createAction(
  '[Role/API] Get User Roles Success',
  props<{ payload: GenericResponseInterface<string[]> }>()
);

export const getUserRolesFail = createAction(
  '[Role/API] Get User Roles Fail',
  props<{ error: string }>()
);

// Assign Role to User
export const assignRole = createAction(
  '[Role] Assign Role',
  props<{ payload: UserRoleInterface }>()
);

export const assignRoleSuccess = createAction(
  '[Role/API] Assign Role Success',
  props<{ payload: GenericResponseInterface<boolean> }>()
);

export const assignRoleFail = createAction(
  '[Role/API] Assign Role Fail',
  props<{ error: string }>()
);

// Remove Role from User
export const removeRole = createAction(
  '[Role] Remove Role',
  props<{ payload: UserRoleInterface }>()
);

export const removeRoleSuccess = createAction(
  '[Role/API] Remove Role Success',
  props<{ payload: GenericResponseInterface<boolean> }>()
);

export const removeRoleFail = createAction(
  '[Role/API] Remove Role Fail',
  props<{ error: string }>()
);
