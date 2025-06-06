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

@Injectable()
export class ProgramTypeEffect {
  $programTypeList = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.getProgramTypeList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<ProgramTypeListInterface[]>
            >
          >(`${environment.baseUrl}/ProgramType/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              ProgramTypeAction.getProgramTypeListSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.getProgramTypeListFail({ error }));
            })
          )
      )
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
            {
              ...payload,
              withCredentials: true,
            },
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
            {
              ...payload,
            }
            // { withCredentials: true }
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

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade
  ) {}
}
