import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as CompanyAction from './company.actions';
import { environment } from '../../../environments/environment';
import {
  CompanyListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class CompanyEffect {
  $companyList = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.getCompanyList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<CompanyListInterface[]>
            >
          >(`${environment.baseUrl}/Company/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              CompanyAction.getCompanyListSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.getCompanyListFail({ error }));
            })
          )
      )
    )
  );

  $companyById = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.getCompanyById),
      switchMap(({ companyId }) =>
        this.http
          .get<GenericResponseInterface<CompanyListInterface>>(
            `${environment.baseUrl}/Company/GetById`,
            {
              params: { companyId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              CompanyAction.getCompanyByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(CompanyAction.getCompanyByIdFail({ error }));
            })
          )
      )
    )
  );

  $createCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.createCompany),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CompanyListInterface>>(
            `${environment.baseUrl}/Company/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.createCompanySuccess({
                message: 'Company created successfully',
                company: payload.entity,
              })
            ),
            catchError((error) => {
              return of(CompanyAction.createCompanyFail({ error }));
            })
          )
      )
    )
  );

  $updateCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.editCompany),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CompanyListInterface>>(
            `${environment.baseUrl}/Company/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.editCompanySuccess({
                message: 'Company updated successfully',
                company: payload.entity,
              })
            ),
            catchError((error) => {
              return of(CompanyAction.editCompanyFail({ error }));
            })
          )
      )
    )
  );

  $companyLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CompanyAction.createCompany, CompanyAction.editCompany),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $companyLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CompanyAction.createCompanySuccess,
          CompanyAction.createCompanyFail,
          CompanyAction.editCompanySuccess,
          CompanyAction.editCompanyFail
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
