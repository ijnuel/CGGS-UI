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
  CompanyFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class CompanyEffect {
  // Get All (non-paginated)
  $companyAll = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.getCompanyAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<CompanyListInterface[]>>(
            `${environment.baseUrl}/Company/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.getCompanyAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.getCompanyAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $companyList = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.getCompanyList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<CompanyListInterface[]>>>(
            `${environment.baseUrl}/Company/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<CompanyListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return CompanyAction.getCompanyListSuccess({ 
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
              return of(CompanyAction.getCompanyListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $companyById = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.getCompanyById),
      switchMap(({ companyId }) =>
        this.http
          .get<GenericResponseInterface<CompanyListInterface>>(
            `${environment.baseUrl}/Company/GetById`,
            {
              params: { id: companyId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              CompanyAction.getCompanyByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.getCompanyByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $companyByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.getCompanyByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<CompanyListInterface[]>>(
            `${environment.baseUrl}/Company/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.getCompanyByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.getCompanyByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $companyExists = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.companyExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Company/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.companyExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.companyExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $companyCount = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.companyCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Company/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.companyCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.companyCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.createCompany),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CompanyListInterface>>(
            `${environment.baseUrl}/Company/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.createCompanySuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.createCompanyFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.updateCompany),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<CompanyListInterface>>(
            `${environment.baseUrl}/Company/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.updateCompanySuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.updateCompanyFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteCompany = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.deleteCompany),
      switchMap(({ companyId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Company/Delete`,
            {
              params: { id: companyId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              CompanyAction.deleteCompanySuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.deleteCompanyFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyCompanys = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.createManyCompanys),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CompanyListInterface[]>>(
            `${environment.baseUrl}/Company/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.createManyCompanysSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.createManyCompanysFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyCompanys = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.updateManyCompanys),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<CompanyListInterface[]>>(
            `${environment.baseUrl}/Company/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              CompanyAction.updateManyCompanysSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.updateManyCompanysFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyCompanys = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAction.deleteManyCompanys),
      switchMap(({ companyIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Company/DeleteMany`,
            {
              params: { ids: companyIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              CompanyAction.deleteManyCompanysSuccess({ payload })
            ),
            catchError((error) => {
              return of(CompanyAction.deleteManyCompanysFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $companyLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CompanyAction.createCompany,
          CompanyAction.updateCompany,
          CompanyAction.deleteCompany,
          CompanyAction.createManyCompanys,
          CompanyAction.updateManyCompanys,
          CompanyAction.deleteManyCompanys
        ),
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
          CompanyAction.updateCompanySuccess,
          CompanyAction.updateCompanyFail,
          CompanyAction.deleteCompanySuccess,
          CompanyAction.deleteCompanyFail,
          CompanyAction.createManyCompanysSuccess,
          CompanyAction.createManyCompanysFail,
          CompanyAction.updateManyCompanysSuccess,
          CompanyAction.updateManyCompanysFail,
          CompanyAction.deleteManyCompanysSuccess,
          CompanyAction.deleteManyCompanysFail
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
