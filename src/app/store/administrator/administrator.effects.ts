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
  AdministratorFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class AdministratorEffect {
  // Get All (non-paginated)
  $administratorAll = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorAll),
      switchMap(() =>
        this.http
          .post<GenericResponseInterface<AdministratorListInterface[]>>(
            `${environment.baseUrl}/Administrator/GetAll`,
            [],
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.getAdministratorAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.getAdministratorAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $administratorList = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorList),
      switchMap(({ pageQuery }) => {
        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<AdministratorListInterface[]>>>(
            `${environment.baseUrl}/Administrator/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<AdministratorListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return AdministratorAction.getAdministratorListSuccess({ 
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
              return of(AdministratorAction.getAdministratorListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
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
              AdministratorAction.getAdministratorByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.getAdministratorByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $administratorByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<AdministratorListInterface[]>>(
            `${environment.baseUrl}/Administrator/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.getAdministratorByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.getAdministratorByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $administratorExists = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.administratorExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Administrator/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.administratorExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.administratorExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $administratorCount = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.administratorCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Administrator/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.administratorCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.administratorCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
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
              AdministratorAction.createAdministratorSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.createAdministratorFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateAdministrator = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.updateAdministrator),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<AdministratorListInterface>>(
            `${environment.baseUrl}/Administrator/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.updateAdministratorSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.updateAdministratorFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteAdministrator = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.deleteAdministrator),
      switchMap(({ administratorId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Administrator/Delete`,
            {
              params: { id: administratorId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.deleteAdministratorSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.deleteAdministratorFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyAdministrators = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.createManyAdministrators),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<AdministratorListInterface[]>>(
            `${environment.baseUrl}/Administrator/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.createManyAdministratorsSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.createManyAdministratorsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyAdministrators = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.updateManyAdministrators),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<AdministratorListInterface[]>>(
            `${environment.baseUrl}/Administrator/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.updateManyAdministratorsSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.updateManyAdministratorsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyAdministrators = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.deleteManyAdministrators),
      switchMap(({ administratorIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Administrator/DeleteMany`,
            {
              params: { ids: administratorIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.deleteManyAdministratorsSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.deleteManyAdministratorsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $administratorLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AdministratorAction.createAdministrator,
          AdministratorAction.updateAdministrator,
          AdministratorAction.deleteAdministrator,
          AdministratorAction.createManyAdministrators,
          AdministratorAction.updateManyAdministrators,
          AdministratorAction.deleteManyAdministrators
        ),
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
          AdministratorAction.updateAdministratorSuccess,
          AdministratorAction.updateAdministratorFail,
          AdministratorAction.deleteAdministratorSuccess,
          AdministratorAction.deleteAdministratorFail,
          AdministratorAction.createManyAdministratorsSuccess,
          AdministratorAction.createManyAdministratorsFail,
          AdministratorAction.updateManyAdministratorsSuccess,
          AdministratorAction.updateManyAdministratorsFail,
          AdministratorAction.deleteManyAdministratorsSuccess,
          AdministratorAction.deleteManyAdministratorsFail
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
