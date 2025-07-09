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
  StaffFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class StaffEffect {
  // Get All (non-paginated)
  $staffAll = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.getStaffAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<StaffListInterface[]>>(
            `${environment.baseUrl}/Staff/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.getStaffAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.getStaffAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $staffList = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.getStaffList),
      switchMap(({ pageQuery }) => {
        const params: { [key: string]: string | number } = {
          start: pageQuery.start,
          recordsPerPage: pageQuery.recordsPerPage,
          pageIndex: pageQuery.pageIndex || 0
        };

        if (pageQuery.searchText) {
          params['searchText'] = pageQuery.searchText;
        }

        if (pageQuery.queryProperties && pageQuery.queryProperties.length > 0) {
          params['queryProperties'] = JSON.stringify(pageQuery.queryProperties);
        }

        return this.http
          .get<GenericResponseInterface<PaginatedResponseInterface<StaffListInterface[]>>>(
            `${environment.baseUrl}/Staff/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<StaffListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return StaffAction.getStaffListSuccess({ 
                payload: { 
                  entity: paginatedResponse,
                  error: response.error,
                  exceptionError: response.exceptionError,
                  message: response.message,
                  messages: response.messages,
                  succeeded: response.succeeded
                } 
              });
            }),
            catchError((error) => {
              return of(StaffAction.getStaffListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $staffById = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.getStaffById),
      switchMap(({ staffId }) =>
        this.http
          .get<GenericResponseInterface<StaffListInterface>>(
            `${environment.baseUrl}/Staff/GetById`,
            {
              params: { id: staffId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              StaffAction.getStaffByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.getStaffByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $staffByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.getStaffByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<StaffListInterface[]>>(
            `${environment.baseUrl}/Staff/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.getStaffByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.getStaffByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $staffExists = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.staffExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Staff/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.staffExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.staffExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $staffCount = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.staffCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Staff/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.staffCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.staffCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createStaff = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.createStaff),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StaffListInterface>>(
            `${environment.baseUrl}/Staff/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.createStaffSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.createStaffFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateStaff = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.updateStaff),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<StaffListInterface>>(
            `${environment.baseUrl}/Staff/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.updateStaffSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.updateStaffFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteStaff = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.deleteStaff),
      switchMap(({ staffId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Staff/Delete`,
            {
              params: { id: staffId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              StaffAction.deleteStaffSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.deleteStaffFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyStaffs = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.createManyStaffs),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StaffListInterface[]>>(
            `${environment.baseUrl}/Staff/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.createManyStaffsSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.createManyStaffsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyStaffs = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.updateManyStaffs),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StaffListInterface[]>>(
            `${environment.baseUrl}/Staff/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StaffAction.updateManyStaffsSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.updateManyStaffsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyStaffs = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffAction.deleteManyStaffs),
      switchMap(({ staffIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Staff/DeleteMany`,
            {
              params: { ids: staffIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              StaffAction.deleteManyStaffsSuccess({ payload })
            ),
            catchError((error) => {
              return of(StaffAction.deleteManyStaffsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $staffLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StaffAction.createStaff,
          StaffAction.updateStaff,
          StaffAction.deleteStaff,
          StaffAction.createManyStaffs,
          StaffAction.updateManyStaffs,
          StaffAction.deleteManyStaffs
        ),
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
          StaffAction.updateStaffSuccess,
          StaffAction.updateStaffFail,
          StaffAction.deleteStaffSuccess,
          StaffAction.deleteStaffFail,
          StaffAction.createManyStaffsSuccess,
          StaffAction.createManyStaffsFail,
          StaffAction.updateManyStaffsSuccess,
          StaffAction.updateManyStaffsFail,
          StaffAction.deleteManyStaffsSuccess,
          StaffAction.deleteManyStaffsFail
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
