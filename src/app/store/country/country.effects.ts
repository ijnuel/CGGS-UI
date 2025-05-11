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
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class CountryEffect {
  $countryList = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.getCountryList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<CountryListInterface[]>
            >
          >(`${environment.baseUrl}/Country/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              CountryAction.getCountryListSuccess({ payload })
            ),
            catchError((error) => {
              return of(CountryAction.getCountryListFail({ error }));
            })
          )
      )
    )
  );

  $countryById = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.getCountryById),
      switchMap(({ countryId }) =>
        this.http
          .get<GenericResponseInterface<CountryListInterface>>(
            `${environment.baseUrl}/Country/GetById`,
            {
              params: { countryId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              CountryAction.getCountryByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(CountryAction.getCountryByIdFail({ error }));
            })
          )
      )
    )
  );

  $createCountry = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.createCountry),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CountryListInterface>>(
            `${environment.baseUrl}/Country/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.createCountrySuccess({
                message: 'Country created successfully',
                country: payload.entity,
              })
            ),
            catchError((error) => {
              return of(CountryAction.createCountryFail({ error }));
            })
          )
      )
    )
  );

  $updateCountry = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryAction.editCountry),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CountryListInterface>>(
            `${environment.baseUrl}/Country/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CountryAction.editCountrySuccess({
                message: 'Country updated successfully',
                country: payload.entity,
              })
            ),
            catchError((error) => {
              return of(CountryAction.editCountryFail({ error }));
            })
          )
      )
    )
  );

  $countryLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountryAction.createCountry, CountryAction.editCountry),
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
          CountryAction.editCountrySuccess,
          CountryAction.editCountryFail
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
