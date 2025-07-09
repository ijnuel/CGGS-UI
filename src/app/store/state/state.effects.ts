import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as StateAction from './state.actions';
import { environment } from '../../../environments/environment';
import {
  StateListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  StateFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class StateEffect {
  // Get All (non-paginated)
  $stateAll = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.getStateAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<StateListInterface[]>>(
            `${environment.baseUrl}/State/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.getStateAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.getStateAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $stateList = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.getStateList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<StateListInterface[]>>>(
            `${environment.baseUrl}/State/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<StateListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return StateAction.getStateListSuccess({ 
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
              return of(StateAction.getStateListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $stateById = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.getStateById),
      switchMap(({ stateId }) =>
        this.http
          .get<GenericResponseInterface<StateListInterface>>(
            `${environment.baseUrl}/State/GetById`,
            {
              params: { id: stateId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              StateAction.getStateByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.getStateByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $stateByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.getStateByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<StateListInterface[]>>(
            `${environment.baseUrl}/State/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.getStateByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.getStateByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $stateExists = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.stateExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/State/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.stateExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.stateExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $stateCount = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.stateCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/State/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.stateCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.stateCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createState = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.createState),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StateListInterface>>(
            `${environment.baseUrl}/State/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.createStateSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.createStateFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateState = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.updateState),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<StateListInterface>>(
            `${environment.baseUrl}/State/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.updateStateSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.updateStateFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteState = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.deleteState),
      switchMap(({ stateId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/State/Delete`,
            {
              params: { id: stateId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              StateAction.deleteStateSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.deleteStateFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyStates = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.createManyStates),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StateListInterface[]>>(
            `${environment.baseUrl}/State/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.createManyStatesSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.createManyStatesFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyStates = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.updateManyStates),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StateListInterface[]>>(
            `${environment.baseUrl}/State/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.updateManyStatesSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.updateManyStatesFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyStates = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.deleteManyStates),
      switchMap(({ stateIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/State/DeleteMany`,
            {
              params: { ids: stateIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              StateAction.deleteManyStatesSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.deleteManyStatesFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $stateLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StateAction.createState,
          StateAction.updateState,
          StateAction.deleteState,
          StateAction.createManyStates,
          StateAction.updateManyStates,
          StateAction.deleteManyStates
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $stateLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StateAction.createStateSuccess,
          StateAction.createStateFail,
          StateAction.updateStateSuccess,
          StateAction.updateStateFail,
          StateAction.deleteStateSuccess,
          StateAction.deleteStateFail,
          StateAction.createManyStatesSuccess,
          StateAction.createManyStatesFail,
          StateAction.updateManyStatesSuccess,
          StateAction.updateManyStatesFail,
          StateAction.deleteManyStatesSuccess,
          StateAction.deleteManyStatesFail
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
