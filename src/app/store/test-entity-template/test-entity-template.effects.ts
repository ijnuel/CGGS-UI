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
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class TestEntityTemplateEffect {
  $testEntityTemplateList = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.getTestEntityTemplateList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<TestEntityTemplateListInterface[]>
            >
          >(`${environment.baseUrl}/TestEntityTemplate/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.getTestEntityTemplateListSuccess({ payload })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.getTestEntityTemplateListFail({ error }));
            })
          )
      )
    )
  );

  $testEntityTemplateById = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.getTestEntityTemplateById),
      switchMap(({ testEntityTemplateId }) =>
        this.http
          .get<GenericResponseInterface<TestEntityTemplateListInterface>>(
            `${environment.baseUrl}/TestEntityTemplate/GetById`,
            {
              params: { testEntityTemplateId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.getTestEntityTemplateByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.getTestEntityTemplateByIdFail({ error }));
            })
          )
      )
    )
  );

  $createTestEntityTemplate = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.createTestEntityTemplate),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<TestEntityTemplateListInterface>>(
            `${environment.baseUrl}/TestEntityTemplate/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.createTestEntityTemplateSuccess({
                message: 'TestEntityTemplate created successfully',
                testEntityTemplate: payload.entity,
              })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.createTestEntityTemplateFail({ error }));
            })
          )
      )
    )
  );

  $updateTestEntityTemplate = createEffect(() =>
    this.actions$.pipe(
      ofType(TestEntityTemplateAction.editTestEntityTemplate),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<TestEntityTemplateListInterface>>(
            `${environment.baseUrl}/TestEntityTemplate/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TestEntityTemplateAction.editTestEntityTemplateSuccess({
                message: 'TestEntityTemplate updated successfully',
                testEntityTemplate: payload.entity,
              })
            ),
            catchError((error) => {
              return of(TestEntityTemplateAction.editTestEntityTemplateFail({ error }));
            })
          )
      )
    )
  );

  $testEntityTemplateLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TestEntityTemplateAction.createTestEntityTemplate, TestEntityTemplateAction.editTestEntityTemplate),
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
          TestEntityTemplateAction.editTestEntityTemplateSuccess,
          TestEntityTemplateAction.editTestEntityTemplateFail
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
