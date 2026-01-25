import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as PrincipalRemarkAction from './principal-remark.actions';
import { environment } from '../../../environments/environment';
import {
  PrincipalRemarkListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  PrincipalRemarkFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class PrincipalRemarkEffect {
  // Get All (non-paginated)
  $principalRemarkAll = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.getPrincipalRemarkAll),
      switchMap(({ query }) =>
        this.http
          .post<GenericResponseInterface<PrincipalRemarkListInterface[]>>(
            `${environment.baseUrl}/PrincipalRemark/GetAll`,
            query ?? {},
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.getPrincipalRemarkAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.getPrincipalRemarkAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $principalRemarkList = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.getPrincipalRemarkList),
      switchMap(({ pageQuery }) => {
        

        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<PrincipalRemarkListInterface[]>>>(
            `${environment.baseUrl}/PrincipalRemark/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<PrincipalRemarkListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return PrincipalRemarkAction.getPrincipalRemarkListSuccess({ 
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
              return of(PrincipalRemarkAction.getPrincipalRemarkListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $principalRemarkById = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.getPrincipalRemarkById),
      switchMap(({ principalRemarkId }) =>
        this.http
          .get<GenericResponseInterface<PrincipalRemarkListInterface>>(
            `${environment.baseUrl}/PrincipalRemark/GetById`,
            {
              params: { id: principalRemarkId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.getPrincipalRemarkByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.getPrincipalRemarkByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $principalRemarkByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.getPrincipalRemarkByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<PrincipalRemarkListInterface[]>>(
            `${environment.baseUrl}/PrincipalRemark/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.getPrincipalRemarkByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.getPrincipalRemarkByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $principalRemarkExists = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.principalRemarkExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/PrincipalRemark/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.principalRemarkExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.principalRemarkExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $principalRemarkCount = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.principalRemarkCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/PrincipalRemark/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.principalRemarkCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.principalRemarkCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createPrincipalRemark = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.createPrincipalRemark),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<PrincipalRemarkListInterface>>(
            `${environment.baseUrl}/PrincipalRemark/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.createPrincipalRemarkSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.createPrincipalRemarkFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updatePrincipalRemark = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.updatePrincipalRemark),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<PrincipalRemarkListInterface>>(
            `${environment.baseUrl}/PrincipalRemark/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.updatePrincipalRemarkSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.updatePrincipalRemarkFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deletePrincipalRemark = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.deletePrincipalRemark),
      switchMap(({ principalRemarkId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/PrincipalRemark/Delete`,
            {
              params: { id: principalRemarkId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.deletePrincipalRemarkSuccess({ payload, principalRemarkId })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.deletePrincipalRemarkFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyPrincipalRemarks = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.createManyPrincipalRemarks),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<PrincipalRemarkListInterface[]>>(
            `${environment.baseUrl}/PrincipalRemark/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.createManyPrincipalRemarksSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.createManyPrincipalRemarksFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyPrincipalRemarks = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.updateManyPrincipalRemarks),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<PrincipalRemarkListInterface[]>>(
            `${environment.baseUrl}/PrincipalRemark/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.updateManyPrincipalRemarksSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.updateManyPrincipalRemarksFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyPrincipalRemarks = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalRemarkAction.deleteManyPrincipalRemarks),
      switchMap(({ principalRemarkIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/PrincipalRemark/DeleteMany`,
            {
              params: { ids: principalRemarkIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              PrincipalRemarkAction.deleteManyPrincipalRemarksSuccess({ payload })
            ),
            catchError((error) => {
              return of(PrincipalRemarkAction.deleteManyPrincipalRemarksFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $principalRemarkLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PrincipalRemarkAction.createPrincipalRemark,
          PrincipalRemarkAction.updatePrincipalRemark,
          PrincipalRemarkAction.deletePrincipalRemark,
          PrincipalRemarkAction.createManyPrincipalRemarks,
          PrincipalRemarkAction.updateManyPrincipalRemarks,
          PrincipalRemarkAction.deleteManyPrincipalRemarks
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $principalRemarkLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PrincipalRemarkAction.createPrincipalRemarkSuccess,
          PrincipalRemarkAction.createPrincipalRemarkFail,
          PrincipalRemarkAction.updatePrincipalRemarkSuccess,
          PrincipalRemarkAction.updatePrincipalRemarkFail,
          PrincipalRemarkAction.deletePrincipalRemarkSuccess,
          PrincipalRemarkAction.deletePrincipalRemarkFail,
          PrincipalRemarkAction.createManyPrincipalRemarksSuccess,
          PrincipalRemarkAction.createManyPrincipalRemarksFail,
          PrincipalRemarkAction.updateManyPrincipalRemarksSuccess,
          PrincipalRemarkAction.updateManyPrincipalRemarksFail,
          PrincipalRemarkAction.deleteManyPrincipalRemarksSuccess,
          PrincipalRemarkAction.deleteManyPrincipalRemarksFail
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
