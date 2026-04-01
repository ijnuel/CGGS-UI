import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as RoleAction from './role.actions';
import {
  RoleWithPermissionsInterface,
  PermissionInterface,
} from '../../types';

export const roleFeatureKey = 'role';

export interface RoleState {
  roleAll: RoleWithPermissionsInterface[] | null;
  roleById: RoleWithPermissionsInterface | null;
  permissions: PermissionInterface[] | null;
  userRoles: string[] | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
  assignPermissionsSuccess: boolean;
}

export const initialState: RoleState = {
  roleAll: null,
  roleById: null,
  permissions: null,
  userRoles: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  assignPermissionsSuccess: false,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(RoleAction.getRoleAll, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
    assignPermissionsSuccess: false,
  })),
  on(RoleAction.getRoleAllSuccess, (state, { payload }) => ({
    ...state,
    roleAll: payload.entity,
    loading: false,
  })),
  on(RoleAction.getRoleAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(RoleAction.getRoleById, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
    assignPermissionsSuccess: false,
  })),
  on(RoleAction.getRoleByIdSuccess, (state, { payload }) => ({
    ...state,
    roleById: payload.entity,
    loading: false,
  })),
  on(RoleAction.getRoleByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(RoleAction.createRole, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(RoleAction.createRoleSuccess, (state) => ({
    ...state,
    loading: false,
    createSuccess: true,
  })),
  on(RoleAction.createRoleFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(RoleAction.updateRole, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(RoleAction.updateRoleSuccess, (state) => ({
    ...state,
    loading: false,
    updateSuccess: true,
  })),
  on(RoleAction.updateRoleFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(RoleAction.deleteRole, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RoleAction.deleteRoleSuccess, (state) => ({
    ...state,
    roleById: null,
    loading: false,
  })),
  on(RoleAction.deleteRoleFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Permissions
  on(RoleAction.getPermissions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RoleAction.getPermissionsSuccess, (state, { payload }) => ({
    ...state,
    permissions: payload.entity,
    loading: false,
  })),
  on(RoleAction.getPermissionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Assign Permissions
  on(RoleAction.assignPermissions, (state) => ({
    ...state,
    loading: true,
    error: null,
    assignPermissionsSuccess: false,
  })),
  on(RoleAction.assignPermissionsSuccess, (state) => ({
    ...state,
    loading: false,
    assignPermissionsSuccess: true,
  })),
  on(RoleAction.assignPermissionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    assignPermissionsSuccess: false,
  })),

  // Remove Permissions
  on(RoleAction.removePermissions, (state) => ({
    ...state,
    loading: true,
    error: null,
    assignPermissionsSuccess: false,
  })),
  on(RoleAction.removePermissionsSuccess, (state) => ({
    ...state,
    loading: false,
    assignPermissionsSuccess: true,
  })),
  on(RoleAction.removePermissionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    assignPermissionsSuccess: false,
  })),

  // Get User Roles
  on(RoleAction.getUserRoles, (state) => ({
    ...state,
    userRoles: null,
    error: null,
  })),
  on(RoleAction.getUserRolesSuccess, (state, { payload }) => ({
    ...state,
    userRoles: payload.entity,
  })),
  on(RoleAction.getUserRolesFail, (state, { error }) => ({
    ...state,
    error,
  })),

  // Assign Role
  on(RoleAction.assignRole, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RoleAction.assignRoleSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(RoleAction.assignRoleFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Remove Role
  on(RoleAction.removeRole, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RoleAction.removeRoleSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(RoleAction.removeRoleFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectRoleState = createFeatureSelector<RoleState>(roleFeatureKey);

export const getRoleAll = (state: RoleState) => state.roleAll;
export const getRoleById = (state: RoleState) => state.roleById;
export const getPermissions = (state: RoleState) => state.permissions;
export const getLoading = (state: RoleState) => state.loading;
export const getError = (state: RoleState) => state.error;
export const getCreateSuccess = (state: RoleState) => state.createSuccess;
export const getUpdateSuccess = (state: RoleState) => state.updateSuccess;
export const getUserRoles = (state: RoleState) => state.userRoles;
export const getAssignPermissionsSuccess = (state: RoleState) => state.assignPermissionsSuccess;
