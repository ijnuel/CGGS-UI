import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as CountryAction from './country.actions';
import { environment } from '../../../environments/environment';
import {
  CountryListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  CountryFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class CountryEffect {
  // Get All (non-paginated)
  $countryAll = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.getCountryAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<CountryListInterface[]>>(
            `${environment.baseUrl}/Country/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.getCountryAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.getCountryAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $countryList = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.getCountryList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<CountryListInterface[]>>>(
            `${environment.baseUrl}/Country/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<CountryListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return CountryAction.getCountryListSuccess({ 
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
              return of(CountryAction.getCountryListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $countryById = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.getCountryById),
      switchMap(({ countryId }) =>
        this.http
          .get<GenericResponseInterface<CountryListInterface>>(
            `${environment.baseUrl}/Country/GetById`,
            {
              params: { id: countryId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              CountryAction.getCountryByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.getCountryByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $countryByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.getCountryByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<CountryListInterface[]>>(
            `${environment.baseUrl}/Country/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.getCountryByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.getCountryByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $countryExists = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.countryExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Country/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.countryExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.countryExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $countryCount = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.countryCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Country/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.countryCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.countryCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createCountry = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.createCountry),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CountryListInterface>>(
            `${environment.baseUrl}/Country/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.createCountrySuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.createCountryFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateCountry = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.updateCountry),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<CountryListInterface>>(
            `${environment.baseUrl}/Country/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.updateCountrySuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.updateCountryFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteCountry = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.deleteCountry),
      switchMap(({ countryId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Country/Delete`,
            {
              params: { id: countryId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              CountryAction.deleteCountrySuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.deleteCountryFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyCountrys = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.createManyCountrys),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CountryListInterface[]>>(
            `${environment.baseUrl}/Country/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.createManyCountrysSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.createManyCountrysFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyCountrys = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.updateManyCountrys),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CountryListInterface[]>>(
            `${environment.baseUrl}/Country/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.updateManyCountrysSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.updateManyCountrysFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyCountrys = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.deleteManyCountrys),
      switchMap(({ countryIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Country/DeleteMany`,
            {
              params: { ids: countryIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              CountryAction.deleteManyCountrysSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.deleteManyCountrysFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $countryLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CountryAction.createCountry,
          CountryAction.updateCountry,
          CountryAction.deleteCountry,
          CountryAction.createManyCountrys,
          CountryAction.updateManyCountrys,
          CountryAction.deleteManyCountrys
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $countryLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CountryAction.createCountrySuccess,
          CountryAction.createCountryFail,
          CountryAction.updateCountrySuccess,
          CountryAction.updateCountryFail,
          CountryAction.deleteCountrySuccess,
          CountryAction.deleteCountryFail,
          CountryAction.createManyCountrysSuccess,
          CountryAction.createManyCountrysFail,
          CountryAction.updateManyCountrysSuccess,
          CountryAction.updateManyCountrysFail,
          CountryAction.deleteManyCountrysSuccess,
          CountryAction.deleteManyCountrysFail
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
