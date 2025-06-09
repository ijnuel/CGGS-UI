import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AdministratorAction from './administrator.actions';
import { environment } from '../../../environments/environment';
import {
  AdministratorListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';
import { Router } from '@angular/router';
import { ToastNotificationService, NotificationTypeEnums } from '../../services/toast-notification.service';

@Injectable()
export class AdministratorEffect {
  $administratorList = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<AdministratorListInterface[]>>>(
            `${environment.baseUrl}/Administrator/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.getAdministratorListSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.getAdministratorListFail({ error }));
            })
          );
      })
    )
  );

  $administratorById = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorById),
      switchMap(({ administratorId }) =>
        this.http
          .get<GenericResponseInterface<AdministratorListInterface>>(
            `${environment.baseUrl}/Administrator/GetById`,
            {
              params: { id: administratorId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.getAdministratorByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(AdministratorAction.getAdministratorByIdFail({ error }));
            })
          )
      )
    )
  );

  $createAdministrator = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.createAdministrator),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<AdministratorListInterface>>(
            `${environment.baseUrl}/Administrator/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.createAdministratorSuccess({
                message: 'Administrator created successfully',
                administrator: payload.entity,
              })
            ),
            catchError((error) => {
              return of(AdministratorAction.createAdministratorFail({ error }));
            })
          )
      )
    )
  );

  $updateAdministrator = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.editAdministrator),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<AdministratorListInterface>>(
            `${environment.baseUrl}/Administrator/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.editAdministratorSuccess({
                message: 'Administrator updated successfully',
                administrator: payload.entity,
              })
            ),
            catchError((error) => {
              return of(AdministratorAction.editAdministratorFail({ error }));
            })
          )
      )
    )
  );

  $deleteAdministrator = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.deleteAdministrator),
      switchMap(({ administratorId }) =>
        this.http
          .delete<GenericResponseInterface<any>>(
            `${environment.baseUrl}/Administrator/Delete`,
            {
              params: { id: administratorId },
              withCredentials: true,
            }
          )
          .pipe(
            map(() =>
              AdministratorAction.deleteAdministratorSuccess({
                message: 'Administrator deleted successfully',
              })
            ),
            catchError((error) => {
              return of(AdministratorAction.deleteAdministratorFail({ error }));
            })
          )
      )
    )
  );

  $administratorLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdministratorAction.createAdministrator, AdministratorAction.editAdministrator),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $administratorLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AdministratorAction.createAdministratorSuccess,
          AdministratorAction.createAdministratorFail,
          AdministratorAction.editAdministratorSuccess,
          AdministratorAction.editAdministratorFail
        ),
        tap(() => {
          this.errorLoadingFacade.globalLoadingHide();
        })
      ),
    { dispatch: false }
  );

  $getAdministratorAll = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorAll),
      switchMap(() =>
        this.http.get<any>(`${environment.baseUrl}/Administrator/GetAll`, { withCredentials: true })
          .pipe(
            map((payload) => AdministratorAction.getAdministratorAllSuccess({ payload })),
            catchError((error) => of(AdministratorAction.getAdministratorAllFail({ error })))
          )
      )
    )
  );

  $getAdministratorByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorByProperties),
      switchMap(({ queryProperties }) =>
        this.http.get<any>(`${environment.baseUrl}/Administrator/GetByProperties`, {
          params: { queryProperties: JSON.stringify(queryProperties) },
          withCredentials: true
        })
        .pipe(
          map((payload) => AdministratorAction.getAdministratorByPropertiesSuccess({ payload })),
          catchError((error) => of(AdministratorAction.getAdministratorByPropertiesFail({ error })))
        )
      )
    )
  );

  $administratorExists = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.administratorExists),
      switchMap(({ id }) =>
        this.http.get<any>(`${environment.baseUrl}/Administrator/Exists`, {
          params: { id },
          withCredentials: true
        })
        .pipe(
          map((payload) => AdministratorAction.administratorExistsSuccess({ payload })),
          catchError((error) => of(AdministratorAction.administratorExistsFail({ error })))
        )
      )
    )
  );

  $administratorCount = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.administratorCount),
      switchMap(() =>
        this.http.get<any>(`${environment.baseUrl}/Administrator/Count`, { withCredentials: true })
          .pipe(
            map((payload) => AdministratorAction.administratorCountSuccess({ payload })),
            catchError((error) => of(AdministratorAction.administratorCountFail({ error })))
          )
      )
    )
  );

  $createManyAdministrators = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.createManyAdministrators),
      switchMap(({ payload }) =>
        this.http.post<any>(`${environment.baseUrl}/Administrator/CreateMany`, payload, { withCredentials: true })
          .pipe(
            map((payload) => AdministratorAction.createManyAdministratorsSuccess({ payload })),
            catchError((error) => of(AdministratorAction.createManyAdministratorsFail({ error })))
          )
      )
    )
  );

  $createAdministratorSuccessToast = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdministratorAction.createAdministratorSuccess),
        tap(() => {
          this.toastService.openToast('Administrator created successfully', NotificationTypeEnums.SUCCESS);
          this.router.navigate(['/app/administrator']);
        })
      ),
    { dispatch: false }
  );

  $editAdministratorSuccessToast = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdministratorAction.editAdministratorSuccess),
        tap(() => {
          this.toastService.openToast('Administrator updated successfully', NotificationTypeEnums.SUCCESS);
          this.router.navigate(['/app/administrator']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade,
    private toastService: ToastNotificationService,
    private router: Router
  ) {}
}
