import { createSelector } from '@ngrx/store';
import {
  getRoleAll,
  getRoleById,
  getPermissions,
  getLoading,
  getError,
  RoleState,
} from './role.reducer';

export const selectRoleState = (state: { role: RoleState }) => state.role;

export const selectRoleAll = createSelector(selectRoleState, getRoleAll);

export const selectRoleById = createSelector(selectRoleState, getRoleById);

export const selectPermissions = createSelector(selectRoleState, getPermissions);

export const selectRoleLoading = createSelector(selectRoleState, getLoading);

export const selectRoleError = createSelector(selectRoleState, getError);

export const selectRoleCreateSuccess = createSelector(
  selectRoleState,
  (state) => state.createSuccess
);

export const selectRoleUpdateSuccess = createSelector(
  selectRoleState,
  (state) => state.updateSuccess
);

export const selectAssignPermissionsSuccess = createSelector(
  selectRoleState,
  (state) => state.assignPermissionsSuccess
);
