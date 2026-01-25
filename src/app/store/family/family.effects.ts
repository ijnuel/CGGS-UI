import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as FamilyAction from './family.actions';
import { environment } from '../../../environments/environment';
import {
  FamilyListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  FamilyFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class FamilyEffect {
  // Get All (non-paginated)
  $familyAll = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.getFamilyAll),
      switchMap(({ query }) =>
        this.http
          .post<GenericResponseInterface<FamilyListInterface[]>>(
            `${environment.baseUrl}/Family/GetAll`,
            query ?? {},
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.getFamilyAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.getFamilyAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $familyList = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.getFamilyList),
      switchMap(({ pageQuery }) => {
        

        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<FamilyListInterface[]>>>(
            `${environment.baseUrl}/Family/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<FamilyListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return FamilyAction.getFamilyListSuccess({ 
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
              return of(FamilyAction.getFamilyListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $familyById = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.getFamilyById),
      switchMap(({ familyId }) =>
        this.http
          .get<GenericResponseInterface<FamilyListInterface>>(
            `${environment.baseUrl}/Family/GetById`,
            {
              params: { id: familyId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              FamilyAction.getFamilyByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.getFamilyByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $familyByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.getFamilyByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<FamilyListInterface[]>>(
            `${environment.baseUrl}/Family/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.getFamilyByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.getFamilyByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $familyExists = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.familyExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Family/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.familyExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.familyExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $familyCount = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.familyCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Family/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.familyCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.familyCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createFamily = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.createFamily),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<FamilyListInterface>>(
            `${environment.baseUrl}/Family/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.createFamilySuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.createFamilyFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateFamily = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.updateFamily),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<FamilyListInterface>>(
            `${environment.baseUrl}/Family/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.updateFamilySuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.updateFamilyFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteFamily = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.deleteFamily),
      switchMap(({ familyId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Family/Delete`,
            {
              params: { id: familyId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              FamilyAction.deleteFamilySuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.deleteFamilyFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyFamilys = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.createManyFamilys),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<FamilyListInterface[]>>(
            `${environment.baseUrl}/Family/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.createManyFamilysSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.createManyFamilysFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyFamilys = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.updateManyFamilys),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<FamilyListInterface[]>>(
            `${environment.baseUrl}/Family/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.updateManyFamilysSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.updateManyFamilysFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyFamilys = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.deleteManyFamilys),
      switchMap(({ familyIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Family/DeleteMany`,
            {
              params: { ids: familyIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              FamilyAction.deleteManyFamilysSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.deleteManyFamilysFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $familyLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          FamilyAction.createFamily,
          FamilyAction.updateFamily,
          FamilyAction.deleteFamily,
          FamilyAction.createManyFamilys,
          FamilyAction.updateManyFamilys,
          FamilyAction.deleteManyFamilys
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $familyLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          FamilyAction.createFamilySuccess,
          FamilyAction.createFamilyFail,
          FamilyAction.updateFamilySuccess,
          FamilyAction.updateFamilyFail,
          FamilyAction.deleteFamilySuccess,
          FamilyAction.deleteFamilyFail,
          FamilyAction.createManyFamilysSuccess,
          FamilyAction.createManyFamilysFail,
          FamilyAction.updateManyFamilysSuccess,
          FamilyAction.updateManyFamilysFail,
          FamilyAction.deleteManyFamilysSuccess,
          FamilyAction.deleteManyFamilysFail
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
