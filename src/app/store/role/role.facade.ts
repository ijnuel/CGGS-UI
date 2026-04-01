import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  RoleWithPermissionsInterface,
  RoleCreateInterface,
  RoleUpdateInterface,
  PermissionInterface,
  RolePermissionAssignInterface,
  UserRoleInterface,
} from '../../types';
import * as RoleAction from './role.actions';
import {
  selectRoleAll,
  selectRoleById,
  selectPermissions,
  selectRoleLoading,
  selectRoleError,
  selectRoleCreateSuccess,
  selectRoleUpdateSuccess,
  selectAssignPermissionsSuccess,
  selectUserRoles,
} from './role.selector';
import { RoleState } from './role.reducer';

@Injectable({
  providedIn: 'root',
})
export class RoleFacade {
  roleAll$: Observable<RoleWithPermissionsInterface[] | null>;
  roleById$: Observable<RoleWithPermissionsInterface | null>;
  permissions$: Observable<PermissionInterface[] | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  assignPermissionsSuccess$: Observable<boolean>;
  userRoles$: Observable<string[] | null>;

  constructor(private store: Store<{ role: RoleState }>) {
    this.roleAll$ = this.store.select(selectRoleAll);
    this.roleById$ = this.store.select(selectRoleById);
    this.permissions$ = this.store.select(selectPermissions);
    this.loading$ = this.store.select(selectRoleLoading);
    this.error$ = this.store.select(selectRoleError);
    this.createSuccess$ = this.store.select(selectRoleCreateSuccess);
    this.updateSuccess$ = this.store.select(selectRoleUpdateSuccess);
    this.assignPermissionsSuccess$ = this.store.select(selectAssignPermissionsSuccess);
    this.userRoles$ = this.store.select(selectUserRoles);
  }

  getRoleAll(): void {
    this.store.dispatch(RoleAction.getRoleAll());
  }

  getRoleById(roleId: string): void {
    this.store.dispatch(RoleAction.getRoleById({ roleId }));
  }

  createRole(role: RoleCreateInterface): void {
    this.store.dispatch(RoleAction.createRole({ payload: role }));
  }

  updateRole(role: RoleUpdateInterface): void {
    this.store.dispatch(RoleAction.updateRole({ payload: role }));
  }

  deleteRole(roleId: string): void {
    this.store.dispatch(RoleAction.deleteRole({ roleId }));
  }

  getPermissions(): void {
    this.store.dispatch(RoleAction.getPermissions());
  }

  assignPermissions(payload: RolePermissionAssignInterface): void {
    this.store.dispatch(RoleAction.assignPermissions({ payload }));
  }

  removePermissions(payload: RolePermissionAssignInterface): void {
    this.store.dispatch(RoleAction.removePermissions({ payload }));
  }

  getUserRoles(userId: string): void {
    this.store.dispatch(RoleAction.getUserRoles({ userId }));
  }

  assignRole(payload: UserRoleInterface): void {
    this.store.dispatch(RoleAction.assignRole({ payload }));
  }

  removeRole(payload: UserRoleInterface): void {
    this.store.dispatch(RoleAction.removeRole({ payload }));
  }
}
