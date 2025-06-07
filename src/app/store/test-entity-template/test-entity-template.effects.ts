import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as TestEntityTemplateAction from './test-entity-template.actions';
import { environment } from '../../../environments/environment';
import {
  TestEntityTemplateListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  TestEntityTemplateFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class TestEntityTemplateEffect {
  // Get All (non-paginated)
  $testEntityTemplateAll = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.getTestEntityTemplateAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<TestEntityTemplateListInterface[]>>(
            `${environment.baseUrl}/TestEntityTemplate/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.getTestEntityTemplateAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.getTestEntityTemplateAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $testEntityTemplateList = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.getTestEntityTemplateList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<TestEntityTemplateListInterface[]>>>(
            `${environment.baseUrl}/TestEntityTemplate/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<TestEntityTemplateListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return TestEntityTemplateAction.getTestEntityTemplateListSuccess({ 
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
              return of(TestEntityTemplateAction.getTestEntityTemplateListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $testEntityTemplateById = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.getTestEntityTemplateById),
      switchMap(({ testEntityTemplateId }) =>
        this.http
          .get<GenericResponseInterface<TestEntityTemplateListInterface>>(
            `${environment.baseUrl}/TestEntityTemplate/GetById`,
            {
              params: { testEntityTemplateId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.getTestEntityTemplateByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.getTestEntityTemplateByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $testEntityTemplateByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.getTestEntityTemplateByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<TestEntityTemplateListInterface[]>>(
            `${environment.baseUrl}/TestEntityTemplate/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.getTestEntityTemplateByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.getTestEntityTemplateByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $testEntityTemplateExists = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.testEntityTemplateExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/TestEntityTemplate/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.testEntityTemplateExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.testEntityTemplateExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $testEntityTemplateCount = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.testEntityTemplateCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/TestEntityTemplate/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.testEntityTemplateCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.testEntityTemplateCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createTestEntityTemplate = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.createTestEntityTemplate),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<TestEntityTemplateListInterface>>(
            `${environment.baseUrl}/TestEntityTemplate/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.createTestEntityTemplateSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.createTestEntityTemplateFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateTestEntityTemplate = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.updateTestEntityTemplate),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<TestEntityTemplateListInterface>>(
            `${environment.baseUrl}/TestEntityTemplate/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.updateTestEntityTemplateSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.updateTestEntityTemplateFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteTestEntityTemplate = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.deleteTestEntityTemplate),
      switchMap(({ testEntityTemplateId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/TestEntityTemplate/Delete`,
            {
              params: { testEntityTemplateId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.deleteTestEntityTemplateSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.deleteTestEntityTemplateFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyTestEntityTemplates = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.createManyTestEntityTemplates),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<TestEntityTemplateListInterface[]>>(
            `${environment.baseUrl}/TestEntityTemplate/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.createManyTestEntityTemplatesSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.createManyTestEntityTemplatesFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyTestEntityTemplates = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.updateManyTestEntityTemplates),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<TestEntityTemplateListInterface[]>>(
            `${environment.baseUrl}/TestEntityTemplate/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.updateManyTestEntityTemplatesSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.updateManyTestEntityTemplatesFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyTestEntityTemplates = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.deleteManyTestEntityTemplates),
      switchMap(({ testEntityTemplateIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/TestEntityTemplate/DeleteMany`,
            {
              params: { ids: testEntityTemplateIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.deleteManyTestEntityTemplatesSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.deleteManyTestEntityTemplatesFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $testEntityTemplateLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TestEntityTemplateAction.createTestEntityTemplate,
          TestEntityTemplateAction.updateTestEntityTemplate,
          TestEntityTemplateAction.deleteTestEntityTemplate,
          TestEntityTemplateAction.createManyTestEntityTemplates,
          TestEntityTemplateAction.updateManyTestEntityTemplates,
          TestEntityTemplateAction.deleteManyTestEntityTemplates
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $testEntityTemplateLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TestEntityTemplateAction.createTestEntityTemplateSuccess,
          TestEntityTemplateAction.createTestEntityTemplateFail,
          TestEntityTemplateAction.updateTestEntityTemplateSuccess,
          TestEntityTemplateAction.updateTestEntityTemplateFail,
          TestEntityTemplateAction.deleteTestEntityTemplateSuccess,
          TestEntityTemplateAction.deleteTestEntityTemplateFail,
          TestEntityTemplateAction.createManyTestEntityTemplatesSuccess,
          TestEntityTemplateAction.createManyTestEntityTemplatesFail,
          TestEntityTemplateAction.updateManyTestEntityTemplatesSuccess,
          TestEntityTemplateAction.updateManyTestEntityTemplatesFail,
          TestEntityTemplateAction.deleteManyTestEntityTemplatesSuccess,
          TestEntityTemplateAction.deleteManyTestEntityTemplatesFail
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
