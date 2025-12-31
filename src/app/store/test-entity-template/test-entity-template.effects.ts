import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as TestEntityTemplateAction from './test-entity-template.actions';
import { TestEntityTemplateListInterface, PaginatedResponseInterface, GenericResponseInterface, TestEntityTemplateFormInterface } from '../../types';

// Add new actions for import/export endpoints
import { createAction, props } from '@ngrx/store';

export const getTestEntityTemplateDataImportTemplate = createAction(
  '[TestEntityTemplate] Get Data Import Template'
);
export const getTestEntityTemplateDataImportTemplateSuccess = createAction(
  '[TestEntityTemplate/API] Get Data Import Template Success',
  props<{ payload: any }>()
);
export const getTestEntityTemplateDataImportTemplateFail = createAction(
  '[TestEntityTemplate/API] Get Data Import Template Fail',
  props<{ error: string }>()
);

export const importTestEntityTemplateData = createAction(
  '[TestEntityTemplate] Import Data',
  props<{ file: File }>()
);
export const importTestEntityTemplateDataSuccess = createAction(
  '[TestEntityTemplate/API] Import Data Success',
  props<{ payload: any }>()
);
export const importTestEntityTemplateDataFail = createAction(
  '[TestEntityTemplate/API] Import Data Fail',
  props<{ error: string }>()
);
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class TestEntityTemplateEffect {
  // Get All (non-paginated)
  $testEntityTemplateAll = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.getTestEntityTemplateAll),
      switchMap(({ queryProperties }) => {
        const params: any = {};
        if (queryProperties) {
          params['queryProperties'] = queryProperties;
        }
        return this.http
          .get<GenericResponseInterface<TestEntityTemplateListInterface[]>>(
            `${environment.baseUrl}/TestEntityTemplate/GetAll`,
            { params, withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.getTestEntityTemplateAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.getTestEntityTemplateAllFail({ error }));
            })
          );
      })
    )
  );

  // Get All Paginated
  $testEntityTemplateList = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.getTestEntityTemplateList),
      switchMap(({ start, recordsPerPage, searchText, queryProperties }) => {
        const params: any = {};
        if (start !== undefined) params['start'] = start;
        if (recordsPerPage !== undefined) params['recordsPerPage'] = recordsPerPage;
        if (searchText) params['searchText'] = searchText;
        if (queryProperties) params['queryProperties'] = queryProperties;
        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<TestEntityTemplateListInterface[]>>>(
            `${environment.baseUrl}/TestEntityTemplate/GetAllPaginated`,
            { params, withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.getTestEntityTemplateListSuccess({ payload })
            ),
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
              params: { id: testEntityTemplateId },
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
      switchMap(({ queryPropertiesString }) =>
        this.http
          .post<GenericResponseInterface<TestEntityTemplateListInterface[]>>(
            `${environment.baseUrl}/TestEntityTemplate/GetByProperties`,
            queryPropertiesString,
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
      switchMap(({ id }) =>
        this.http
          .get<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/TestEntityTemplate/Exists`,
            { params: { id }, withCredentials: true }
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
          .put<GenericResponseInterface<TestEntityTemplateListInterface>>(
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
      switchMap(({ id }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/TestEntityTemplate/Delete`,
            { params: { id }, withCredentials: true }
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
      switchMap(({ ids }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/TestEntityTemplate/DeleteMany`,
            { params: { ids }, withCredentials: true }
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

  // Get Data Import Template
  $getDataImportTemplate = createEffect(() =>
    this.actions$.pipe(
      ofType(getTestEntityTemplateDataImportTemplate),
      switchMap(() =>
        this.http
          .get<any>(`${environment.baseUrl}/TestEntityTemplate/GetDataImportTemplate`, { withCredentials: true })
          .pipe(
            map((payload) => getTestEntityTemplateDataImportTemplateSuccess({ payload })),
            catchError((error) => of(getTestEntityTemplateDataImportTemplateFail({ error })))
          )
      )
    )
  );

  // Import Data
  $importData = createEffect(() =>
    this.actions$.pipe(
      ofType(importTestEntityTemplateData),
      switchMap(({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return this.http
          .post<any>(`${environment.baseUrl}/TestEntityTemplate/ImportData`, formData, { withCredentials: true })
          .pipe(
            map((payload) => importTestEntityTemplateDataSuccess({ payload })),
            catchError((error) => of(importTestEntityTemplateDataFail({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade
  ) {}
}
