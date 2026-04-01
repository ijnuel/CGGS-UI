import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as RoleAction from './role.actions';
import { environment } from '../../../environments/environment';
import {
  RoleWithPermissionsInterface,
  PermissionInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class RoleEffect {
  // Get All
  $roleAll = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.getRoleAll),
      switchMap(() =>
        this.http
          .post<GenericResponseInterface<RoleWithPermissionsInterface[]>>(
            `${environment.baseUrl}/Role/GetAll`,
            {},
            { withCredentials: true }
          )
          .pipe(
            map((payload) => RoleAction.getRoleAllSuccess({ payload })),
            catchError((error) => of(RoleAction.getRoleAllFail({ error })))
          )
      )
    )
  );

  // Get By Id
  $roleById = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.getRoleById),
      switchMap(({ roleId }) =>
        this.http
          .get<GenericResponseInterface<any>>(
            `${environment.baseUrl}/Role/GetById/${roleId}`,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const entity = Array.isArray(response.entity)
                ? response.entity[0]
                : response.entity;
              return RoleAction.getRoleByIdSuccess({
                payload: { ...response, entity }
              });
            }),
            catchError((error) => of(RoleAction.getRoleByIdFail({ error })))
          )
      )
    )
  );

  // Create
  $createRole = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.createRole),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<string>>(
            `${environment.baseUrl}/Role/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => RoleAction.createRoleSuccess({ payload: response })),
            catchError((error) => of(RoleAction.createRoleFail({ error })))
          )
      )
    )
  );

  // Update
  $updateRole = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.updateRole),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Role/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => RoleAction.updateRoleSuccess({ payload: response })),
            catchError((error) => of(RoleAction.updateRoleFail({ error })))
          )
      )
    )
  );

  // Delete
  $deleteRole = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.deleteRole),
      switchMap(({ roleId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Role/Delete/${roleId}`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => RoleAction.deleteRoleSuccess({ payload })),
            catchError((error) => of(RoleAction.deleteRoleFail({ error })))
          )
      )
    )
  );

  // Get Permissions
  $permissions = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.getPermissions),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<PermissionInterface[]>>(
            `${environment.baseUrl}/Role/Permissions`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => RoleAction.getPermissionsSuccess({ payload })),
            catchError((error) => of(RoleAction.getPermissionsFail({ error })))
          )
      )
    )
  );

  // Assign Permissions
  $assignPermissions = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.assignPermissions),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Role/AssignPermissions`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => RoleAction.assignPermissionsSuccess({ payload: response })),
            catchError((error) => of(RoleAction.assignPermissionsFail({ error })))
          )
      )
    )
  );

  // Remove Permissions
  $removePermissions = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.removePermissions),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Role/RemovePermissions`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => RoleAction.removePermissionsSuccess({ payload: response })),
            catchError((error) => of(RoleAction.removePermissionsFail({ error })))
          )
      )
    )
  );

  // Get User Roles
  $getUserRoles = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.getUserRoles),
      switchMap(({ userId }) =>
        this.http
          .get<GenericResponseInterface<string[]>>(
            `${environment.baseUrl}/Role/UserRoles/${userId}`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => RoleAction.getUserRolesSuccess({ payload })),
            catchError((error) => of(RoleAction.getUserRolesFail({ error })))
          )
      )
    )
  );

  // Assign Role to User
  $assignRole = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.assignRole),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Role/AssignRole`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => RoleAction.assignRoleSuccess({ payload: response })),
            catchError((error) => of(RoleAction.assignRoleFail({ error })))
          )
      )
    )
  );

  // Remove Role from User
  $removeRole = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleAction.removeRole),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Role/RemoveRole`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => RoleAction.removeRoleSuccess({ payload: response })),
            catchError((error) => of(RoleAction.removeRoleFail({ error })))
          )
      )
    )
  );

  // Loading Effects
  $roleLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          RoleAction.createRole,
          RoleAction.updateRole,
          RoleAction.deleteRole,
          RoleAction.assignPermissions,
          RoleAction.removePermissions,
          RoleAction.assignRole,
          RoleAction.removeRole
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $roleLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          RoleAction.createRoleSuccess,
          RoleAction.createRoleFail,
          RoleAction.updateRoleSuccess,
          RoleAction.updateRoleFail,
          RoleAction.deleteRoleSuccess,
          RoleAction.deleteRoleFail,
          RoleAction.assignPermissionsSuccess,
          RoleAction.assignPermissionsFail,
          RoleAction.removePermissionsSuccess,
          RoleAction.removePermissionsFail,
          RoleAction.assignRoleSuccess,
          RoleAction.assignRoleFail,
          RoleAction.removeRoleSuccess,
          RoleAction.removeRoleFail
        ),
        tap(() => {
          this.errorLoadingFacade.globalLoadingHide();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade
  ) {}
}
