import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ProgramTypeAction from './program-type.actions';
import { environment } from '../../../environments/environment';
import {
  ProgramTypeListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';
import { Router } from '@angular/router';

@Injectable()
export class ProgramTypeEffect {
  $programTypeList = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.getProgramTypeList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<ProgramTypeListInterface[]>>>(
            `${environment.baseUrl}/ProgramType/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.getProgramTypeListSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.getProgramTypeListFail({ error }));
            })
          );
      })
    )
  );

  $programTypeById = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.getProgramTypeById),
      switchMap(({ programTypeId }) =>
        this.http
          .get<GenericResponseInterface<ProgramTypeListInterface>>(
            `${environment.baseUrl}/ProgramType/GetById`,
            {
              params: { programTypeId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.getProgramTypeByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.getProgramTypeByIdFail({ error }));
            })
          )
      )
    )
  );

  $createProgramType = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.createProgramType),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ProgramTypeListInterface>>(
            `${environment.baseUrl}/ProgramType/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.createProgramTypeSuccess({
                message: 'ProgramType created successfully',
                programType: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.createProgramTypeFail({ error }));
            })
          )
      )
    )
  );

  $updateProgramType = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.editProgramType),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ProgramTypeListInterface>>(
            `${environment.baseUrl}/ProgramType/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.editProgramTypeSuccess({
                message: 'ProgramType updated successfully',
                programType: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.editProgramTypeFail({ error }));
            })
          )
      )
    )
  );

  $programTypeLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramTypeAction.createProgramType, ProgramTypeAction.editProgramType),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $programTypeLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProgramTypeAction.createProgramTypeSuccess,
          ProgramTypeAction.createProgramTypeFail,
          ProgramTypeAction.editProgramTypeSuccess,
          ProgramTypeAction.editProgramTypeFail
        ),
        tap(() => {
          this.errorLoadingFacade.globalLoadingHide();
        })
      ),
    { dispatch: false }
  );

  $createProgramTypeSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramTypeAction.createProgramTypeSuccess),
        tap(() => {
          this.router.navigate(['/app/program-type']);
        })
      ),
    { dispatch: false }
  );

  $editProgramTypeSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramTypeAction.editProgramTypeSuccess),
        tap(() => {
          this.router.navigate(['/app/program-type']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade,
    private router: Router
  ) {}
}
