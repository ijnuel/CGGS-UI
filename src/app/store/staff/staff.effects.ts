import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as StaffAction from './staff.actions';
import { environment } from '../../../environments/environment';
import {
  StaffListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class StaffEffect {
  $staffList = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.getStaffList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<StaffListInterface[]>
            >
          >(`${environment.baseUrl}/Staff/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              StaffAction.getStaffListSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.getStaffListFail({ error }));
            })
          )
      )
    )
  );

  $staffById = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.getStaffById),
      switchMap(({ staffId }) =>
        this.http
          .get<GenericResponseInterface<StaffListInterface>>(
            `${environment.baseUrl}/Staff/GetById`,
            {
              params: { staffId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              StaffAction.getStaffByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(StaffAction.getStaffByIdFail({ error }));
            })
          )
      )
    )
  );

  $createStaff = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.createStaff),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StaffListInterface>>(
            `${environment.baseUrl}/Staff/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.createStaffSuccess({
                message: 'Staff created successfully',
                staff: payload.entity,
              })
            ),
            catchError((error) => {
              return of(StaffAction.createStaffFail({ error }));
            })
          )
      )
    )
  );

  $updateStaff = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.editStaff),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StaffListInterface>>(
            `${environment.baseUrl}/Staff/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.editStaffSuccess({
                message: 'Staff updated successfully',
                staff: payload.entity,
              })
            ),
            catchError((error) => {
              return of(StaffAction.editStaffFail({ error }));
            })
          )
      )
    )
  );

  $staffLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StaffAction.createStaff, StaffAction.editStaff),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $staffLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StaffAction.createStaffSuccess,
          StaffAction.createStaffFail,
          StaffAction.editStaffSuccess,
          StaffAction.editStaffFail
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
